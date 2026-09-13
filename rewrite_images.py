#!/usr/bin/env python3
"""Rewrite campground image URLs from /manus-storage/* to local /camping-guide/images/*.

Reads photo-replacements/<id>.json manifests (skips ids without a manifest),
rewrites client/src/data/photos.ts, campgrounds.ts, activityPhotos.ts,
and regenerates IMAGE_CREDITS.md.
"""
import json, re, os, sys

ROOT = os.path.expanduser("~/workspace/camping-guide")
DATA = os.path.join(ROOT, "client/src/data")
REPL = os.path.join(ROOT, "photo-replacements")
BASE = "/camping-guide"  # matches vite.config.ts base

def load_manifest(cid):
    p = os.path.join(REPL, f"{cid}.json")
    if not os.path.exists(p):
        return None
    return json.load(open(p, encoding="utf-8"))

def url(rel):
    # rel like "images/camp-1/01.jpg"
    return f"{BASE}/{rel}"

# ---------------- photos.ts ----------------
def rewrite_photos(done_ids):
    p = os.path.join(DATA, "photos.ts")
    src = open(p, encoding="utf-8").read()

    def block_repl(m):
        comment = m.group("comment") or ""
        cid = int(m.group("id"))
        man = load_manifest(cid)
        if man is None:
            return m.group(0)  # leave untouched
        gallery = man["gallery"]
        # sanity: files exist
        for g in gallery:
            fp = os.path.join(ROOT, "client/public", g["file"])
            assert os.path.exists(fp), f"missing file {fp}"
        photos = ",\n      ".join(f'"{url(g["file"])}"' for g in gallery)
        captions = ", ".join(json.dumps(g["caption"], ensure_ascii=False) for g in gallery)
        return (f"{comment}  {cid}: {{\n"
                f"    photos: [\n      {photos}\n    ],\n"
                f"    captions: [{captions}],\n"
                f"  }},")

    pattern = re.compile(
        r'(?P<comment>^[ \t]*//[^\n]*\n)?^[ \t]*(?P<id>\d+): \{(?:[^{}]|\{[^{}]*\})*?^\s*\},',
        re.M,
    )
    new_src, n = pattern.subn(block_repl, src)
    open(p, "w", encoding="utf-8").write(new_src)
    # verify no map: fields remain for done ids
    leftover_maps = re.findall(r'map:\s*"/manus-storage', new_src)
    print(f"photos.ts: rewrote blocks, leftover map fields: {len(leftover_maps)}")
    return new_src

# ---------------- campgrounds.ts ----------------
def rewrite_campgrounds(done_ids):
    p = os.path.join(DATA, "campgrounds.ts")
    src = open(p, encoding="utf-8").read()

    # split into top-level entries by 4-space-indented id:
    out = []
    # find all top-level `    id: N,` positions
    id_marks = [(m.start(), int(m.group(1))) for m in re.finditer(r'^    id: (\d+),$', src, re.M)]
    id_marks.append((len(src), -1))
    replaced = 0
    out = [src[:id_marks[0][0]]]  # file header before first entry
    for (start, cid), (end, _) in zip(id_marks, id_marks[1:]):
        chunk = src[start:end]
        if cid in done_ids:
            man = load_manifest(cid)
            card_url = url(man["card"])
            fp = os.path.join(ROOT, "client/public", man["card"])
            assert os.path.exists(fp), f"missing card {fp}"
            chunk2, n = re.subn(r'^    image: "/manus-storage/[^"]+",?$',
                                f'    image: "{card_url}",', chunk, flags=re.M)
            if n == 0:
                # already replaced in a previous run: skip instead of failing
                chunk2 = chunk
            else:
                replaced += n
            chunk = chunk2
        out.append(chunk)
    new_src = "".join(out)
    # NOTE: chunks were split at id marks; rejoin keeps everything else intact
    open(p, "w", encoding="utf-8").write(new_src)
    print(f"campgrounds.ts: replaced {replaced} card images")

# ---------------- activityPhotos.ts ----------------
def rewrite_activity():
    mp = os.path.join(REPL, "activity-1.json")
    if not os.path.exists(mp):
        print("activity-1.json missing, skip")
        return
    man = json.load(open(mp, encoding="utf-8"))
    p = os.path.join(DATA, "activityPhotos.ts")
    src = open(p, encoding="utf-8").read()
    new_url = url(man["file"])
    fp = os.path.join(ROOT, "client/public", man["file"])
    assert os.path.exists(fp), f"missing activity file {fp}"
    new_src, n = re.subn(r'"/manus-storage/[^"]+"', f'"{new_url}"', src, count=1)
    if n == 0:
        print("activityPhotos.ts: already replaced, skip")
        return
    open(p, "w", encoding="utf-8").write(new_src)
    print(f"activityPhotos.ts: replaced 1 ({man['key']})")

# ---------------- IMAGE_CREDITS.md ----------------
def write_credits(done_ids):
    lines = ["# 图片来源署名（Image Credits）", "",
             "本站营地图片来自以下公开来源，按 CC / 公有领域等许可使用，特此署名。", ""]
    for cid in sorted(done_ids):
        man = load_manifest(cid)
        lines.append(f"## {cid}. {man['name']}")
        lines.append(f"- 代表图 `{man['card']}` — {man.get('card_author','')} ({man.get('card_license','')}) — {man.get('card_source','')}")
        for g in man["gallery"]:
            lines.append(f"- `{g['file']}` — {g.get('author','')} ({g.get('license','')}) — {g.get('source','')}")
        lines.append("")
    open(os.path.join(ROOT, "IMAGE_CREDITS.md"), "w", encoding="utf-8").write("\n".join(lines))
    print("IMAGE_CREDITS.md written")

if __name__ == "__main__":
    done_ids = {int(f[:-5]) for f in os.listdir(REPL) if re.fullmatch(r"\d+\.json", f)}
    print("manifests available:", sorted(done_ids))
    rewrite_photos(done_ids)
    rewrite_campgrounds(done_ids)
    rewrite_activity()
    write_credits(done_ids)
    # final check
    for f in ["photos.ts", "campgrounds.ts", "activityPhotos.ts"]:
        s = open(os.path.join(DATA, f), encoding="utf-8").read()
        left = re.findall(r"/manus-storage/[^\"]*", s)
        print(f"{f}: leftover /manus-storage/ refs: {len(left)}")
        for u in left[:5]:
            print("   ", u[:80])

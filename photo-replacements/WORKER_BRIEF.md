# 图片替换工作简报（Worker Brief）

## 目标
为露营网站 `~/workspace/camping-guide` 的营地图片找到**精确匹配**的替代实拍图，下载到仓库本地，并写出 JSON 清单。

## 参考文件
- `~/workspace/camping-guide/photo-replacements/_reference.json`：每个营地 id → `count`（需要找的 gallery 图片数量，必须完全一致；**已按"至少 5 张"规则更新**）+ `captions`（原中文图注，用于指导搜索关键词）。
- 原数据文件（只读，不要改）：`client/src/data/photos.ts`、`client/src/data/campgrounds.ts`。

## 硬性要求一：数量
每个营地 gallery 图片数 = max(原 photos[] 数量, 5)，另加 1 张 card 代表图。`_reference.json` 中的 count 已是最终数量，直接按它执行。

## 硬性要求二：来源（优先官网实拍，不许靠猜）
1. **优先从各营地的官方网站找实拍图**：用 `browser.open` 实际打开官网的公园页面/图库，找到该营地的实拍照片后下载。
   - Washington State Parks：parks.wa.gov（每个州立公园有官方页面和图库）
   - Oregon State Parks：stateparks.oregon.gov
   - 美国国家公园 NPS：nps.gov（Cougar Rock、Mora、Sol Duc、Colonial Creek、Kalaloch、Hoh Rain Forest、Crater Lake 等）
   - BC Parks：bcparks.ca（Rathtrevor、Lightning Lake、Cultus Lake、Golden Ears）
   - KOA 官网（Astoria/Warrenton/Seaside KOA）
   - 私营营地找其自有官网（如 Pacific Shores Motorcoach Resort 官网）；国家森林营地可找 fs.usda.gov 对应页面。
2. `image-search` 只作为发现线索。**每张最终采用的图片必须有可验证的真实出处**：官网页面，或来源页标题明确标注是该地点（如 Wikimedia Commons 文件页标题即为该地点）。
3. 任何"看起来像但无法确认是该营地"的图一律弃用。
4. 清单汇报时增加一项：每个营地注明图片主要来源（官网 / Commons / 其他）。

## 硬性要求：精确匹配
每一张选用的图片必须是**该具体地点**的真实照片，通过 `page_url`（来源页面）验证：
- 首选 Wikimedia Commons（`upload.wikimedia.org`）：文件页面标题必须对应具体地点，例如 "Deception Pass Bridge"、`"Hall of Mosses, Hoh Rainforest"`。图片真实、授权自由（CC-BY/CC-BY-SA/公有领域）、外链稳定。
- 允许 `images.unsplash.com`，但必须确认照片内容确实是该地点（看来源页描述）。
- **拒绝**通用图库"看起来像"的森林/湖/海滩照片。地点错了就是错了。
- 如果某个超具体图注（如"某营位号"）全网没有真实照片：用**同一营地**的真实照片代替，并写一个与照片实际内容相符的新图注。**绝不保留与照片内容不符的图注**。

## 每张图的交付物（per campground id）
1. `client/public/images/camp-<id>/card.jpg`：1 张，最具代表性的营地标志性实拍（用于卡片）。
2. `client/public/images/camp-<id>/01.jpg`、`02.jpg`…：gallery，数量 = `_reference.json` 中该 id 的 `count`。
3. `photo-replacements/<id>.json`：
```json
{"id": 1, "name": "Deception Pass State Park",
 "card": "images/camp-1/card.jpg",
 "gallery": [{"file": "images/camp-1/01.jpg", "caption": "准确的中文图注，描述照片实际内容",
              "source": "<来源页面URL>", "author": "作者名（Commons页面可见）", "license": "CC-BY-SA 4.0等"}]}
```
`gallery` 长度必须等于 `count`，每个 caption 描述对应照片的真实内容。

## 操作流程（per image）
1. 搜索：`/opt/hatch/bin/image-search "<营地名> <具体景点>" --max-results 8`。查询词用英文，例如 `"Deception Pass Bridge Washington"`、`"Cranberry Lake Deception Pass State Park"`、`"Hoh Rain Forest Hall of Mosses"`、`"Silver Falls State Park South Falls"`。结合图注逐张定制查询；一个查询可覆盖多张图。
2. 验证：打开候选的 `page_url`（`browser.open` 读页面文本即可），确认照片确实是该地点。记录 author/license（Commons 文件页有）。
3. 预检：`curl -fsSL -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' -H 'Accept: image/avif,image/webp,image/png,image/jpeg,image/*;q=0.8' -H 'Referer: https://www.google.com' --connect-timeout 15 --max-time 90 -o /tmp/dl.jpg '<media_url>'`，然后用 PIL 验证：`python3 -c "from PIL import Image; im=Image.open('/tmp/dl.jpg'); im.verify()"`。失败就换下一个候选。
4. 礼貌下载：同一 host 之间 sleep 1-2 秒，不要并发轰炸。
5. 压缩（PIL 10.2 可用）：转 RGB、JPEG、最长边 ≤1600px、quality=82；若仍 >400KB 降到 quality=70。保存为最终路径。跳过 AVIF/HEIC 源（PIL 打不开就换图）。
6. 图注：中文，准确描述**这张照片实际拍到的内容**。原图注只有在其准确描述新照片时才可沿用。

## 禁止事项
- 不要编辑 `photos.ts` / `campgrounds.ts` / `activityPhotos.ts`。
- 不要 hotlink 外链：所有图片必须下载进仓库。
- 不要用 `map:` 字段（与你无关）。

## 汇报
完成后向我报告：每个 id 的状态（完成/缺图及替代方案）、总图片数、有无版权存疑的图片。

import { useEffect, useMemo, useState } from "react";
import { campgrounds } from "@/data/campgrounds";
import {
  BOOKING_WEEKENDS,
  WATCHING_PARKS,
  CHECKED_WA_CAMP_IDS,
  BOOKING_CHECKED_AT,
  BOOKING_RESERVATION_FEE,
  type BookingSite,
  type BookingWeekend,
} from "@/data/booking2027";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { useAuth } from "@/_core/hooks/useAuth";
import { Calendar, Bell, CheckCircle2, MapPin } from "lucide-react";

type LocalRequest = {
  campId: number;
  campName: string;
  arrival: string;
  site: string;
  hookup: string;
  fee: number;
  createdAt: string;
};

const LOCAL_KEY = "booking_requests_local";
const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

function campName(campId: number): { cn: string; en: string } {
  const c = campgrounds.find((x) => x.id === campId);
  return { cn: c?.nameCn ?? `营地 ${campId}`, en: c?.name ?? "" };
}

function weekendLabel(arrival: string): string {
  return BOOKING_WEEKENDS.find((w) => w.arrival === arrival)?.label ?? arrival;
}

function MonthGrid({
  year,
  month,
  selected,
  onSelect,
}: {
  year: number;
  month: number; // 0-based
  selected: string;
  onSelect: (arrival: string) => void;
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const byDay = useMemo(() => {
    const m = new Map<number, BookingWeekend>();
    for (const w of BOOKING_WEEKENDS) {
      const d = new Date(`${w.arrival}T00:00:00`);
      if (d.getFullYear() === year && d.getMonth() === month) m.set(d.getDate(), w);
    }
    return m;
  }, [year, month]);

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="rounded-xl border border-border bg-white p-3">
      <div className="text-sm font-semibold mb-2">
        {year}年{month + 1}月
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground mb-1">
        {WEEKDAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (d === null) return <div key={`b${i}`} />;
          const w = byDay.get(d);
          if (!w) {
            return (
              <div
                key={d}
                className="h-11 rounded-lg flex items-center justify-center text-sm text-muted-foreground/50"
              >
                {d}
              </div>
            );
          }
          const isSel = selected === w.arrival;
          return (
            <button
              key={d}
              onClick={() => onSelect(w.arrival)}
              className={`h-11 rounded-lg flex flex-col items-center justify-center text-sm font-medium transition-colors ${
                isSel
                  ? "bg-pine text-white"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
              }`}
              title={`${w.label} · ${w.parks.length}个营地可订`}
            >
              <span>{d}</span>
              <span className={`text-[10px] leading-none ${isSel ? "text-white/80" : "text-emerald-600"}`}>
                {w.parks.length}营地
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BookingCalendar({ onOpenDetail }: { onOpenDetail: (id: number) => void }) {
  const { user, isAuthenticated } = useAuth();
  const [selected, setSelected] = useState<string>(BOOKING_WEEKENDS[0].arrival);
  const [notice, setNotice] = useState<string>("");
  const [localReqs, setLocalReqs] = useState<LocalRequest[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_KEY) ?? "[]");
    } catch {
      return [];
    }
  });
  const [cloudReqs, setCloudReqs] = useState<any[]>([]);

  const cloudEnabled = supabaseConfigured && !!supabase && isAuthenticated && !!user;

  const loadCloud = async () => {
    if (!supabase || !user) return;
    const { data, error } = await supabase
      .from("booking_requests")
      .select("id, campground_id, campground_name, arrival, nights, site, hookup, nightly_fee, status, created_at")
      .order("created_at", { ascending: false })
      .limit(20);
    if (!error && data) setCloudReqs(data);
  };

  useEffect(() => {
    loadCloud();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const weekend = BOOKING_WEEKENDS.find((w) => w.arrival === selected) ?? BOOKING_WEEKENDS[0];
  const noSiteCampIds = CHECKED_WA_CAMP_IDS.filter(
    (id) => !weekend.parks.some((p) => p.campId === id),
  );

  const book = async (campId: number, site: BookingSite) => {
    const { cn, en } = campName(campId);
    const text =
      `请帮我订营地：${cn}${en ? `（${en}）` : ""}，入住 ${weekend.label}（${weekend.arrival}，周六住1晚），` +
      `营位 ${site.site}（${site.hookup}），房费 $${site.fee}/晚 + $${BOOKING_RESERVATION_FEE} 订位费。`;
    const local: LocalRequest = {
      campId,
      campName: cn,
      arrival: weekend.arrival,
      site: site.site,
      hookup: site.hookup,
      fee: site.fee,
      createdAt: new Date().toISOString(),
    };
    const next = [local, ...localReqs];
    setLocalReqs(next);
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
    } catch {}

    if (cloudEnabled && supabase && user) {
      const { error } = await supabase.from("booking_requests").insert({
        user_id: user.id,
        campground_id: campId,
        campground_name: cn,
        arrival: weekend.arrival,
        nights: 1,
        site: site.site,
        hookup: site.hookup,
        nightly_fee: site.fee,
        status: "pending",
      });
      if (error) {
        setNotice(`云端记录失败（${error.message}），已只存本机。请把这段发给小美：${text}`);
        return;
      }
      await loadCloud();
      setNotice(`已记录：${cn} ${weekend.label} ${site.site}。小美看到后会来找你确认登录和付款，然后下单。`);
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setNotice(`已复制订位请求（未登录，仅存本机）。粘贴发给小美，她就会来帮你订：${text}`);
    } catch {
      setNotice(`订位请求（未登录，仅存本机）。请把这段发给小美：${text}`);
    }
  };

  return (
    <div className="container py-5 space-y-6">
      {/* 说明 */}
      <section className="rounded-xl border border-border bg-white p-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Calendar size={18} /> 2027 夏天 · 周末营位日历
        </h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          周六去、周日回、住 1 晚；Truck camper 不筛接驳，能停车即可。数据为 {BOOKING_CHECKED_AT}{" "}
          现查，空位会随订退变化，下单前会复核。华盛顿州每单另加 ${BOOKING_RESERVATION_FEE}{" "}
          订位费；取消时 $8 不退，再按持有时长扣当晚房费的 5–50%。
        </p>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          点 <span className="font-medium text-foreground">“帮我订”</span> 就是把订位请求发给小美：
          登录状态下请求会直接存到云端，小美看到后找你确认登录和付款再下单；未登录时请求只存本机并复制好发给你，粘贴发给小美同样有效。下单前每单费用会再跟你确认一遍。
        </p>
        {notice && (
          <div className="mt-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm p-3">
            {notice}
          </div>
        )}
      </section>

      {/* 日历 */}
      <section className="grid gap-3 md:grid-cols-2">
        <MonthGrid year={2027} month={5} selected={selected} onSelect={setSelected} />
        <MonthGrid year={2027} month={6} selected={selected} onSelect={setSelected} />
      </section>

      {/* 选中周末的可订营地 */}
      <section>
        <h3 className="text-base font-semibold mb-3">
          {weekend.label} → 周日 · 可订营地 {weekend.parks.length} 个
        </h3>
        <div className="space-y-3">
          {weekend.parks.map((p) => {
            const { cn, en } = campName(p.campId);
            return (
              <div key={p.campId} className="rounded-xl border border-border bg-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="font-medium">{cn}</div>
                    {en && <div className="text-xs text-muted-foreground">{en}</div>}
                  </div>
                  <button
                    onClick={() => onOpenDetail(p.campId)}
                    className="shrink-0 px-3 py-1.5 rounded-lg border border-border text-sm hover:border-pine/40 hover:text-pine transition-colors"
                  >
                    看详情
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  {p.sites.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2"
                    >
                      <div className="text-sm">
                        <span className="font-medium">{s.site}</span>
                        <span className="text-muted-foreground"> · {s.hookup}</span>
                        {s.pad && <span className="text-muted-foreground"> · {s.pad}</span>}
                        <span className="text-muted-foreground"> · ${s.fee}/晚</span>
                      </div>
                      <button
                        onClick={() => book(p.campId, s)}
                        className="shrink-0 px-3 py-1.5 rounded-lg bg-pine text-white text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        帮我订
                      </button>
                    </div>
                  ))}
                </div>
                {p.more && <div className="text-xs text-muted-foreground mt-2">{p.more}</div>}
              </div>
            );
          })}
        </div>
        {noSiteCampIds.length > 0 && (
          <p className="text-sm text-muted-foreground mt-3">
            这周没位：{noSiteCampIds.map((id) => campName(id).cn).join("、")}
          </p>
        )}
      </section>

      {/* 盯盘中 */}
      <section className="rounded-xl border border-border bg-white p-4">
        <h3 className="flex items-center gap-2 text-base font-semibold mb-3">
          <Bell size={16} /> 还在盯着 · 有位了会告诉你
        </h3>
        <div className="space-y-2">
          {WATCHING_PARKS.map((w) => {
            const { cn, en } = campName(w.campId);
            return (
              <div key={w.campId} className="flex items-start justify-between gap-2 text-sm">
                <div>
                  <span className="font-medium">{cn}</span>
                  {en && <span className="text-muted-foreground"> {en}</span>}
                  <span className="text-muted-foreground"> · {w.reason}</span>
                  {w.soldOutWeekends && (
                    <span className="text-muted-foreground">
                      {" "}
                     （{w.soldOutWeekends.map(weekendLabel).join("、")}）
                    </span>
                  )}
                  <div className="text-xs text-muted-foreground mt-0.5">{w.checkNote}</div>
                </div>
                <button
                  onClick={() => onOpenDetail(w.campId)}
                  className="shrink-0 px-2.5 py-1 rounded-lg border border-border text-xs hover:border-pine/40 hover:text-pine transition-colors"
                >
                  看详情
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 我的预订请求 */}
      <section className="rounded-xl border border-border bg-white p-4">
        <h3 className="flex items-center gap-2 text-base font-semibold mb-3">
          <CheckCircle2 size={16} /> 我的预订请求
        </h3>
        {cloudReqs.length === 0 && localReqs.length === 0 && (
          <p className="text-sm text-muted-foreground">
            还没有请求。点上面任意营位的“帮我订”，请求就会出现在这里。
          </p>
        )}
        <div className="space-y-2">
          {cloudReqs.map((r: any) => (
            <div key={`c${r.id}`} className="flex items-start gap-2 text-sm">
              <MapPin size={14} className="mt-0.5 shrink-0 text-muted-foreground" />
              <div>
                <span className="font-medium">{r.campground_name}</span> ·{" "}
                {weekendLabel(r.arrival)} · {r.site}（{r.hookup ?? "—"}）· ${r.nightly_fee}/晚
                <span className="text-muted-foreground">
                  {" "}
                  · {r.status === "pending" ? "已记录，等小美确认" : r.status}
                </span>
              </div>
            </div>
          ))}
          {localReqs.map((r, i) => (
            <div key={`l${i}`} className="flex items-start gap-2 text-sm">
              <MapPin size={14} className="mt-0.5 shrink-0 text-muted-foreground" />
              <div>
                <span className="font-medium">{r.campName}</span> · {weekendLabel(r.arrival)} · {r.site}
                （{r.hookup}）· ${r.fee}/晚
                <span className="text-muted-foreground"> · 仅存本机（未登录云端）</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

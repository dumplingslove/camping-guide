import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useVisited } from "@/hooks/useVisited";
import { useAuth } from "@/_core/hooks/useAuth";
import { campgrounds } from "@/data/campgrounds";
import {
  ArrowLeft,
  Tent,
  Calendar,
  Moon,
  MapPin,
  TrendingUp,
  Star,
  TreePine,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";

const STATE_COLORS = {
  WA: "oklch(0.30 0.08 160)",
  OR: "oklch(0.55 0.18 25)",
};

const TIER_COLORS: Record<string, string> = {
  "顶级热门": "#dc2626",
  "明显热门": "#ea580c",
  "区域家庭优选": "#059669",
  "商业度假型": "#7c3aed",
  "2026受限": "#d97706",
  "不适配": "#6b7280",
};

const MONTH_LABELS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

export default function Stats() {
  const { visits, loading, isAuthenticated } = useVisited();
  const { user } = useAuth();

  // Compute statistics
  const stats = useMemo(() => {
    if (visits.length === 0) return null;

    // Unique campgrounds visited
    const uniqueCampIds = new Set(visits.map((v) => v.campgroundId));
    const uniqueCount = uniqueCampIds.size;

    // Total nights
    let totalNights = 0;
    for (const v of visits) {
      if (v.endDate) {
        const nights = Math.ceil(
          (new Date(v.endDate).getTime() - new Date(v.startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        totalNights += Math.max(nights, 1);
      } else {
        totalNights += 1; // Assume 1 night if no end date
      }
    }

    // Total trips
    const totalTrips = visits.length;

    // Average nights per trip
    const avgNights = totalTrips > 0 ? (totalNights / totalTrips).toFixed(1) : "0";

    // By state
    const byState: Record<string, number> = { WA: 0, OR: 0 };
    for (const campId of Array.from(uniqueCampIds)) {
      const camp = campgrounds.find((c) => c.id === campId);
      if (camp) byState[camp.state] = (byState[camp.state] || 0) + 1;
    }

    // By month (when did trips happen)
    const byMonth: number[] = Array(12).fill(0);
    for (const v of visits) {
      const month = new Date(v.startDate).getMonth();
      byMonth[month] += 1;
    }

    // By tier
    const byTier: Record<string, number> = {};
    for (const campId of Array.from(uniqueCampIds)) {
      const camp = campgrounds.find((c) => c.id === campId);
      if (camp && camp.tier) {
        byTier[camp.tier] = (byTier[camp.tier] || 0) + 1;
      }
    }

    // By year
    const byYear: Record<string, { trips: number; nights: number }> = {};
    for (const v of visits) {
      const year = v.startDate.substring(0, 4);
      if (!byYear[year]) byYear[year] = { trips: 0, nights: 0 };
      byYear[year].trips += 1;
      if (v.endDate) {
        const nights = Math.ceil(
          (new Date(v.endDate).getTime() - new Date(v.startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        byYear[year].nights += Math.max(nights, 1);
      } else {
        byYear[year].nights += 1;
      }
    }

    // Favorite campground (most visits)
    const campVisitCount: Record<number, number> = {};
    for (const v of visits) {
      campVisitCount[v.campgroundId] = (campVisitCount[v.campgroundId] || 0) + 1;
    }
    const favCampId = Object.entries(campVisitCount).sort(
      ([, a], [, b]) => b - a
    )[0]?.[0];
    const favCamp = favCampId
      ? campgrounds.find((c) => c.id === Number(favCampId))
      : null;
    const favCampCount = favCampId ? campVisitCount[Number(favCampId)] : 0;

    // Drive time stats
    let totalDriveMinutes = 0;
    for (const v of visits) {
      const camp = campgrounds.find((c) => c.id === v.campgroundId);
      if (camp) totalDriveMinutes += camp.driveTime;
    }
    const totalDriveHours = (totalDriveMinutes / 60).toFixed(0);

    // Coverage percentage
    const coverage = ((uniqueCount / campgrounds.length) * 100).toFixed(0);

    return {
      uniqueCount,
      totalTrips,
      totalNights,
      avgNights,
      byState,
      byMonth,
      byTier,
      byYear,
      favCamp,
      favCampCount,
      totalDriveHours,
      coverage,
    };
  }, [visits]);

  // Chart data
  const monthChartData = useMemo(() => {
    if (!stats) return [];
    return stats.byMonth.map((count, i) => ({
      month: MONTH_LABELS[i],
      trips: count,
    }));
  }, [stats]);

  const stateChartData = useMemo(() => {
    if (!stats) return [];
    return Object.entries(stats.byState)
      .filter(([, count]) => count > 0)
      .map(([state, count]) => ({
        name: state === "WA" ? "华盛顿" : "俄勒冈",
        value: count,
        state,
      }));
  }, [stats]);

  const tierChartData = useMemo(() => {
    if (!stats) return [];
    return Object.entries(stats.byTier)
      .sort(([, a], [, b]) => b - a)
      .map(([tier, count]) => ({
        name: tier,
        value: count,
      }));
  }, [stats]);

  const yearChartData = useMemo(() => {
    if (!stats) return [];
    return Object.entries(stats.byYear)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([year, data]) => ({
        year,
        trips: data.trips,
        nights: data.nights,
      }));
  }, [stats]);

  return (
    <div className="min-h-screen topo-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center h-14 gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-pine transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">返回</span>
          </Link>
          <h1 className="font-display font-bold text-lg text-pine">
            露营统计
          </h1>
          {isAuthenticated && (
            <span className="text-[10px] font-mono text-lake bg-lake/10 px-1.5 py-0.5 rounded">
              云同步
            </span>
          )}
        </div>
      </header>

      <main className="container py-8 max-w-5xl">
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-pine border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">加载统计数据...</p>
          </div>
        )}

        {!loading && (!stats || visits.length === 0) && (
          <div className="text-center py-20">
            <Tent size={64} className="mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              还没有露营记录
            </h2>
            <p className="text-muted-foreground mb-6">
              在营地详情页添加"去过记录"后，这里会展示你的露营统计数据
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-pine text-white rounded-lg text-sm hover:bg-pine-light transition-colors"
            >
              <TreePine size={16} />
              浏览营地
            </Link>
          </div>
        )}

        {!loading && stats && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-border p-4 text-center">
                <Tent size={24} className="mx-auto text-pine mb-2" />
                <div className="text-2xl font-bold text-foreground font-mono">
                  {stats.uniqueCount}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  去过的营地
                </div>
                <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                  覆盖 {stats.coverage}%
                </div>
              </div>
              <div className="bg-white rounded-xl border border-border p-4 text-center">
                <Calendar size={24} className="mx-auto text-lake mb-2" />
                <div className="text-2xl font-bold text-foreground font-mono">
                  {stats.totalTrips}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  总出行次数
                </div>
              </div>
              <div className="bg-white rounded-xl border border-border p-4 text-center">
                <Moon size={24} className="mx-auto text-sunset mb-2" />
                <div className="text-2xl font-bold text-foreground font-mono">
                  {stats.totalNights}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  总露营晚数
                </div>
                <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                  平均 {stats.avgNights} 晚/次
                </div>
              </div>
              <div className="bg-white rounded-xl border border-border p-4 text-center">
                <MapPin size={24} className="mx-auto text-sand mb-2" />
                <div className="text-2xl font-bold text-foreground font-mono">
                  {stats.totalDriveHours}h
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  总驾驶时间
                </div>
              </div>
            </div>

            {/* Favorite campground */}
            {stats.favCamp && (
              <div className="bg-white rounded-xl border border-border p-5 mb-6">
                <div className="flex items-center gap-3">
                  <Star size={20} className="text-sand fill-sand" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      最常去的营地
                    </div>
                    <Link
                      href={`/campground/${stats.favCamp.id}`}
                      className="font-display font-bold text-foreground hover:text-pine transition-colors"
                    >
                      {stats.favCamp.nameCn}
                    </Link>
                    <span className="text-xs text-muted-foreground ml-2 font-mono">
                      去过 {stats.favCampCount} 次
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Monthly Distribution */}
              <div className="bg-white rounded-xl border border-border p-5">
                <h3 className="font-display font-bold text-foreground flex items-center gap-2 mb-4">
                  <BarChart3 size={16} className="text-pine" />
                  月份分布
                </h3>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 8,
                          border: "1px solid #e5e5e5",
                          fontSize: 12,
                        }}
                        formatter={(value: number) => [`${value} 次`, "出行"]}
                      />
                      <Bar
                        dataKey="trips"
                        fill="oklch(0.30 0.08 160)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* State Distribution */}
              <div className="bg-white rounded-xl border border-border p-5">
                <h3 className="font-display font-bold text-foreground flex items-center gap-2 mb-4">
                  <PieChartIcon size={16} className="text-lake" />
                  州分布
                </h3>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stateChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name} ${value}`}
                      >
                        {stateChartData.map((entry) => (
                          <Cell
                            key={entry.state}
                            fill={
                              STATE_COLORS[
                                entry.state as keyof typeof STATE_COLORS
                              ]
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: 8,
                          border: "1px solid #e5e5e5",
                          fontSize: 12,
                        }}
                        formatter={(value: number) => [
                          `${value} 个营地`,
                          "已去过",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Tier Distribution */}
              <div className="bg-white rounded-xl border border-border p-5">
                <h3 className="font-display font-bold text-foreground flex items-center gap-2 mb-4">
                  <TrendingUp size={16} className="text-sunset" />
                  营地分类分布
                </h3>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tierChartData} layout="vertical">
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e5e5"
                        horizontal={false}
                      />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                        allowDecimals={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                        width={80}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 8,
                          border: "1px solid #e5e5e5",
                          fontSize: 12,
                        }}
                        formatter={(value: number) => [
                          `${value} 个营地`,
                          "已去过",
                        ]}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {tierChartData.map((entry) => (
                          <Cell
                            key={entry.name}
                            fill={TIER_COLORS[entry.name] || "#6b7280"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Yearly Trend */}
              {yearChartData.length > 1 && (
                <div className="bg-white rounded-xl border border-border p-5">
                  <h3 className="font-display font-bold text-foreground flex items-center gap-2 mb-4">
                    <TrendingUp size={16} className="text-sand" />
                    年度趋势
                  </h3>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={yearChartData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#e5e5e5"
                        />
                        <XAxis
                          dataKey="year"
                          tick={{ fontSize: 11 }}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 11 }}
                          tickLine={false}
                          allowDecimals={false}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: 8,
                            border: "1px solid #e5e5e5",
                            fontSize: 12,
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="trips"
                          name="出行次数"
                          stroke="oklch(0.30 0.08 160)"
                          fill="oklch(0.30 0.08 160)"
                          fillOpacity={0.2}
                        />
                        <Area
                          type="monotone"
                          dataKey="nights"
                          name="露营晚数"
                          stroke="oklch(0.55 0.18 25)"
                          fill="oklch(0.55 0.18 25)"
                          fillOpacity={0.1}
                        />
                        <Legend />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>

            {/* Visited Campgrounds List */}
            <div className="bg-white rounded-xl border border-border p-5">
              <h3 className="font-display font-bold text-foreground flex items-center gap-2 mb-4">
                <TreePine size={16} className="text-pine" />
                去过的营地一览
              </h3>
              <div className="space-y-2">
                {(() => {
                  // Group visits by campground
                  const grouped: Record<
                    number,
                    { camp: (typeof campgrounds)[0]; count: number; lastDate: string }
                  > = {};
                  for (const v of visits) {
                    const camp = campgrounds.find(
                      (c) => c.id === v.campgroundId
                    );
                    if (!camp) continue;
                    if (!grouped[camp.id]) {
                      grouped[camp.id] = {
                        camp,
                        count: 0,
                        lastDate: v.startDate,
                      };
                    }
                    grouped[camp.id].count += 1;
                    if (v.startDate > grouped[camp.id].lastDate) {
                      grouped[camp.id].lastDate = v.startDate;
                    }
                  }
                  return Object.values(grouped)
                    .sort((a, b) => b.lastDate.localeCompare(a.lastDate))
                    .map(({ camp, count, lastDate }) => (
                      <Link
                        key={camp.id}
                        href={`/campground/${camp.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                      >
                        <img
                          src={camp.image}
                          alt={camp.nameCn}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-foreground truncate">
                            {camp.nameCn}
                          </div>
                          <div className="text-xs text-muted-foreground font-mono">
                            {camp.state} · {camp.driveTimeLabel}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-mono text-pine font-medium">
                            {count}次
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {lastDate}
                          </div>
                        </div>
                      </Link>
                    ));
                })()}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

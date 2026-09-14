import { useMemo, useState, useEffect } from "react";
import { getReviewsForCampground, CampgroundReviews } from "@/data/reviewsData";
import { TrendingUp } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";

interface ReviewTrendChartProps {
  campgroundId: number;
}

interface MonthlyData {
  month: string;
  label: string;
  count: number;
  avgRating: number;
  cumulative: number;
}

export function ReviewTrendChart({ campgroundId }: ReviewTrendChartProps) {
  const [view, setView] = useState<"rating" | "volume">("rating");
  const [reviewData, setReviewData] = useState<CampgroundReviews | null>(null);

  useEffect(() => {
    getReviewsForCampground(campgroundId).then(setReviewData);
  }, [campgroundId]);

  const monthlyData = useMemo(() => {
    if (!reviewData || reviewData.reviews.length === 0) return [];

    // Group reviews by month
    const byMonth = new Map<string, { count: number; totalRating: number; ratedCount: number }>();

    for (const review of reviewData.reviews) {
      if (!review.date) continue;
      // Normalize date to YYYY-MM
      const month = review.date.substring(0, 7);
      if (!/^\d{4}-\d{2}$/.test(month)) continue;

      const existing = byMonth.get(month) || { count: 0, totalRating: 0, ratedCount: 0 };
      existing.count += 1;
      if (typeof review.rating === "number" && review.rating >= 1 && review.rating <= 5) {
        existing.totalRating += review.rating;
        existing.ratedCount += 1;
      }
      byMonth.set(month, existing);
    }

    // Sort by month and compute cumulative
    const sorted = Array.from(byMonth.entries())
      .sort(([a], [b]) => a.localeCompare(b));

    let cumulative = 0;
    const data: MonthlyData[] = sorted.map(([month, { count, totalRating, ratedCount }]) => {
      cumulative += count;
      const [year, m] = month.split("-");
      const label = `${year.slice(2)}'${m}`;
      return {
        month,
        label,
        count,
        avgRating: ratedCount > 0 ? Math.round((totalRating / ratedCount) * 10) / 10 : 0,
        cumulative,
      };
    });

    // Only show last 24 months for readability
    return data.slice(-24);
  }, [reviewData]);

  if (!reviewData || monthlyData.length < 3) {
    return null; // Don't show chart if insufficient data
  }

  const ratedForAvg = reviewData.reviews.filter(
    (r) => typeof r.rating === "number" && r.rating >= 1 && r.rating <= 5
  );
  const overallAvg =
    ratedForAvg.length > 0
      ? (
          ratedForAvg.reduce((sum, r) => sum + (r.rating as number), 0) /
          ratedForAvg.length
        ).toFixed(1)
      : "—";

  const recentAvg = monthlyData.length >= 3
    ? (monthlyData.slice(-3).reduce((sum, d) => sum + d.avgRating * d.count, 0) /
       monthlyData.slice(-3).reduce((sum, d) => sum + d.count, 0)).toFixed(1)
    : overallAvg;

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg flex items-center gap-2">
          <TrendingUp size={20} className="text-pine" />
          评论趋势
        </h3>
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-0.5">
          <button
            onClick={() => setView("rating")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              view === "rating" ? "bg-white shadow-sm text-pine" : "text-muted-foreground"
            }`}
          >
            评分趋势
          </button>
          <button
            onClick={() => setView("volume")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              view === "volume" ? "bg-white shadow-sm text-pine" : "text-muted-foreground"
            }`}
          >
            评论量
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-secondary/50 rounded-lg px-3 py-2 text-center">
          <div className="text-lg font-bold font-mono text-pine">{overallAvg}</div>
          <div className="text-[10px] text-muted-foreground">总体评分</div>
        </div>
        <div className="bg-secondary/50 rounded-lg px-3 py-2 text-center">
          <div className="text-lg font-bold font-mono text-lake">{recentAvg}</div>
          <div className="text-[10px] text-muted-foreground">近3月评分</div>
        </div>
        <div className="bg-secondary/50 rounded-lg px-3 py-2 text-center">
          <div className="text-lg font-bold font-mono text-sunset">{reviewData.reviews.length}</div>
          <div className="text-[10px] text-muted-foreground">总评论数</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          {view === "rating" ? (
            <AreaChart data={monthlyData} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
              <defs>
                <linearGradient id={`ratingGradient-${campgroundId}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d5016" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2d5016" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[1, 5]}
                tick={{ fontSize: 10 }}
                ticks={[1, 2, 3, 4, 5]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload as MonthlyData;
                  return (
                    <div className="bg-white border border-border rounded-lg shadow-lg px-3 py-2 text-xs">
                      <div className="font-medium">{d.month}</div>
                      <div className="text-pine">平均评分: {d.avgRating}</div>
                      <div className="text-muted-foreground">评论数: {d.count}</div>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="avgRating"
                stroke="#2d5016"
                strokeWidth={2}
                fill={`url(#ratingGradient-${campgroundId})`}
                dot={false}
                activeDot={{ r: 4, fill: "#2d5016" }}
              />
            </AreaChart>
          ) : (
            <BarChart data={monthlyData} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload as MonthlyData;
                  return (
                    <div className="bg-white border border-border rounded-lg shadow-lg px-3 py-2 text-xs">
                      <div className="font-medium">{d.month}</div>
                      <div className="text-lake">新增评论: {d.count}</div>
                      <div className="text-muted-foreground">累计: {d.cumulative}</div>
                    </div>
                  );
                }}
              />
              <Bar
                dataKey="count"
                fill="#4a90a4"
                radius={[3, 3, 0, 0]}
                maxBarSize={24}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <p className="text-[10px] text-muted-foreground text-center mt-2">
        数据来源: {reviewData.source} · 显示最近24个月
      </p>
    </div>
  );
}

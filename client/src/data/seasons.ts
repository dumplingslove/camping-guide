/**
 * Best camping season data for each campground.
 * months: 1-12, rating: 0=closed, 1=open but not ideal, 2=good, 3=peak/best
 */
export interface SeasonData {
  campgroundId: number;
  months: number[]; // 12 values for Jan-Dec, 0-3 rating
  peakMonths: string; // human-readable peak season
  notes: string;
}

export const seasonData: SeasonData[] = [
  { campgroundId: 1, months: [1, 1, 1, 2, 2, 3, 3, 3, 3, 2, 1, 1], peakMonths: "6月-9月", notes: "全年开放，夏季最佳。冬季可能有积雪" },
  { campgroundId: 2, months: [1, 1, 2, 2, 3, 3, 3, 3, 3, 2, 1, 1], peakMonths: "5月-9月", notes: "全年开放，春秋也不错。Deep Lake夏季最适合游泳" },
  { campgroundId: 3, months: [0, 0, 0, 0, 2, 3, 3, 3, 2, 0, 0, 0], peakMonths: "6月-8月", notes: "5月-9月开放。湖水7-8月最暖适合游泳" },
  { campgroundId: 4, months: [0, 0, 0, 0, 1, 2, 3, 3, 3, 2, 0, 0], peakMonths: "7月-9月", notes: "5月底-10月。7-8月野花盛开，Paradise最美" },
  { campgroundId: 5, months: [1, 1, 1, 2, 2, 3, 3, 3, 3, 2, 1, 1], peakMonths: "6月-9月", notes: "全年开放。夏季湖水温暖，冬季可越野滑雪" },
  { campgroundId: 6, months: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], peakMonths: "⚠️ 关闭中", notes: "2025-2026年关闭施工，预计2027年重新开放" },
  { campgroundId: 7, months: [0, 0, 0, 0, 2, 3, 3, 3, 2, 0, 0, 0], peakMonths: "6月-8月", notes: "5月-9月开放。7-8月湖水最清澈" },
  { campgroundId: 8, months: [1, 1, 1, 2, 2, 3, 3, 3, 3, 2, 1, 1], peakMonths: "6月-9月", notes: "全年开放。夏季阳光充足，湖水温暖" },
  { campgroundId: 9, months: [1, 1, 2, 2, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "全年开放。夏季最佳，但冬季风暴也壮观" },
  { campgroundId: 10, months: [1, 1, 2, 2, 3, 3, 3, 3, 2, 2, 1, 1], peakMonths: "5月-8月", notes: "全年开放。春季潮池最佳（低潮多）" },
  { campgroundId: 11, months: [1, 1, 2, 2, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "全年开放。夏季天气最稳定，冬季风暴壮观" },
  { campgroundId: 12, months: [1, 1, 2, 2, 2, 3, 3, 3, 3, 2, 1, 1], peakMonths: "6月-9月", notes: "全年开放。夏季泳池开放，设施全部运营" },
  { campgroundId: 13, months: [0, 0, 0, 0, 2, 3, 3, 3, 2, 0, 0, 0], peakMonths: "6月-8月", notes: "5月-9月开放。夏季天气最好" },
  { campgroundId: 14, months: [1, 1, 2, 2, 3, 3, 3, 3, 3, 2, 1, 1], peakMonths: "5月-9月", notes: "全年开放。夏季最佳，秋季也很好" },
  { campgroundId: 15, months: [1, 1, 2, 2, 3, 3, 3, 3, 3, 2, 1, 1], peakMonths: "5月-9月", notes: "全年开放。夏季海滩最佳，冬季风暴观赏" },
  { campgroundId: 16, months: [1, 1, 2, 2, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "全年开放。夏季天气最稳定" },
  { campgroundId: 17, months: [0, 0, 0, 0, 1, 2, 3, 3, 3, 1, 0, 0], peakMonths: "7月-9月", notes: "5月底-9月底。7-8月Mt. Hood倒影最清晰" },
  { campgroundId: 18, months: [1, 1, 2, 2, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "⚠️ Mora Road 2026年7月8日-10月15日关闭" },
  { campgroundId: 19, months: [0, 0, 0, 0, 1, 2, 3, 3, 2, 0, 0, 0], peakMonths: "7月-8月", notes: "5月底-9月。高海拔，夏季短暂" },
  { campgroundId: 20, months: [1, 1, 2, 2, 3, 3, 3, 3, 3, 2, 1, 1], peakMonths: "5月-9月", notes: "全年开放。夏季Bend活动最多" },
  { campgroundId: 21, months: [1, 1, 2, 2, 3, 3, 3, 0, 0, 0, 0, 0], peakMonths: "5月-7月", notes: "⚠️ 2026年8月3日起关闭施工" },
  { campgroundId: 22, months: [0, 0, 0, 0, 2, 3, 3, 3, 2, 0, 0, 0], peakMonths: "6月-8月", notes: "5月-9月开放。7-8月河水温暖适合游泳" },
  { campgroundId: 23, months: [0, 0, 0, 0, 0, 0, 2, 3, 3, 2, 0, 0], peakMonths: "8月-9月", notes: "7月初-10月初。开放时间极短，需提前抢位" },
  { campgroundId: 24, months: [1, 1, 1, 2, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "⚠️ 不适合TC" },
];

export const monthLabels = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
export const monthLabelsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

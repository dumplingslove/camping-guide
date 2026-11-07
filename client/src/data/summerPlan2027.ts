/**
 * 2027 夏天露营总计划（网站主面：用户在这里看日程、选、查订了什么）。
 *
 * 来源：夏季规划（车程实测 + 稀缺度分级 + 带娃情况），报告见
 * ~/workspace/camping-2027-check/summer-2027-plan-2026-11-07.md，
 * 机器可读版 summer-2027-plan-2026-11-07.json。
 * ready=false 表示计划还在制定，站上只显示“制定中”；定稿后把 weekends 填满、ready 置 true 再部署。
 */

export type PlanWeekend = {
  /** 入住日（周六），如 "2027-06-19"；nights=2 时为周五出发、住两晚 */
  arrival: string;
  campId: number;
  campName: string;
  /** 推荐营位，如 "130号" */
  site: string;
  /** 当晚房费（美元，不含 $8 订位费） */
  fee: number;
  /** 从家里（Redmond）开车分钟数 */
  driveMinutes: number;
  /** 住几晚：1 = 周六去周日回；2 = 周五出发住两晚 */
  nights: 1 | 2;
  /** 抢手程度：hot = 开窗即秒光/几天订满；normal = 经常有空位 */
  scarcity: "hot" | "normal";
  quality: "star" | "good";
  qualityNote?: string;
  /** 为什么选这站（一句话） */
  reason: string;
  /** 结论：book_now = 立刻订；hold = 先放着等用户看；skip = 不去 */
  verdict: "book_now" | "hold" | "skip";
  /** 订位状态：booked = 已订（confirmation 为确认号）；不填 = 还没订 */
  status?: "booked";
  confirmation?: string;
};

export type SummerPlan2027 = {
  /** 计划是否定稿 */
  ready: boolean;
  /** 计划去几个周末 */
  trips: number;
  /** 立刻订几处 */
  bookNow: number;
  /** 先放着几处 */
  hold: number;
  /** 全订下来约多少钱（含每单 $8 订位费） */
  totalEstimate: number;
  /** 日程（按日期排） */
  weekends: PlanWeekend[];
  /** 给用户的备注，如不去的周末去哪了 */
  note: string;
};

/** 计划制定中：weekends 为空，站上只显示“制定中”卡片。 */
export const SUMMER_PLAN_2027: SummerPlan2027 = {
  ready: false,
  trips: 0,
  bookNow: 0,
  hold: 0,
  totalEstimate: 0,
  weekends: [],
  note: "正在按车程、难订程度、带娃情况排 7–9 个周末，好了这里会显示完整日程，聊天里只发一声提醒。",
};

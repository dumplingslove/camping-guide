/**
 * 2027 夏天露营总计划（网站主面：用户在这里看日程、选、查订了什么）。
 *
 * 来源：夏季规划（车程实测 + 稀缺度分级 + 带娃情况），报告见
 * ~/workspace/camping-2027-check/summer-2027-plan-2026-11-07.md，
 * 机器可读版 summer-2027-plan-2026-11-07.json。
 * 2026-11-07 复核纠正：营位复核报告（site-quality-reverification-2026-11-07.md）
 * 证实旧研究大面积是错的，本文件已按复核结论纠正——汇流 30–40 号与
 * 弗拉格勒堡 Upper 30–40 号的 ⭐ 已摘（接驳证伪），格雷兰 54 号没标
 * （环路待核对），⭐ 只剩韦纳奇湖北营地水电位 4 处。
 * 3 处待查行程（霍雨林/史蒂文斯堡/卡尔特斯湖）房费与营位待开窗现查，
 * 站上只显示“待查”，不编数字。
 */

export type PlanWeekend = {
  /** 入住日（周六），如 "2027-06-19"；nights=2 时为周五出发、住两晚 */
  arrival: string;
  campId: number;
  campName: string;
  /** 推荐营位，如 "130号"；待查时写 "待查" */
  site: string;
  /** 当晚房费（美元，不含 $8 订位费）；待查时为 null */
  fee: number | null;
  /** 从家里（Redmond）开车分钟数 */
  driveMinutes: number;
  /** 住几晚：1 = 周六去周日回；2 = 周五出发住两晚 */
  nights: 1 | 2;
  /** 抢手程度：hot = 开窗即秒光/几天订满；normal = 经常有空位 */
  scarcity: "hot" | "normal";
  /** 位置标：star = 复核证实的点名推荐；good = 复核确认方向的分区；不填 = 没标 */
  quality?: "star" | "good";
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
  /** 立刻订合计约多少钱（房费 + 每单 $8 订位费；仅 bookNow 的 2 处） */
  totalEstimate: number;
  /** 日程（按日期排，只含要去的周末） */
  weekends: PlanWeekend[];
  /** 给用户的备注，如不去的周末去哪了 */
  note: string;
};

export const SUMMER_PLAN_2027: SummerPlan2027 = {
  ready: true,
  trips: 9,
  bookNow: 2,
  hold: 7,
  totalEstimate: 113,
  weekends: [
    {
      arrival: "2027-06-19",
      campId: 5,
      campName: "韦纳奇湖",
      site: "130号",
      fee: 51,
      driveMinutes: 113,
      nights: 1,
      scarcity: "hot",
      quality: "star",
      qualityNote: "北营地水电位·部分接驳无排污",
      reason: "开季第一站：A 级秒光营地的北营地水电位（部分接驳无排污），1:53；不抢就没了",
      verdict: "book_now",
      status: "booked",
      confirmation: "IWWA27-3600548B1",
    },
    {
      arrival: "2027-06-26",
      campId: 28,
      campName: "弗拉格勒堡",
      site: "Upper 30、33、35、38号",
      fee: 37,
      driveMinutes: 130,
      nights: 1,
      scarcity: "normal",
      quality: "good",
      qualityNote: "Upper 林间区·无接驳树荫好",
      reason: "历史炮台+海滩，轮渡2小时；B 档几天内订满，站上看后点帮我订",
      verdict: "hold",
    },
    {
      arrival: "2027-07-03",
      campId: 27,
      campName: "韦纳奇汇流",
      site: "39号",
      fee: 37,
      driveMinutes: 142,
      nights: 1,
      scarcity: "normal",
      quality: "good",
      qualityNote: "Loop 2 河边区·接驳须逐号核对",
      reason: "独立日周末河边站；B 档，站上看后点帮我订",
      verdict: "hold",
    },
    {
      arrival: "2027-07-10",
      campId: 26,
      campName: "格雷兰海滩",
      site: "54号",
      fee: 56,
      driveMinutes: 145,
      nights: 1,
      scarcity: "normal",
      reason: "海岸沙滩周末，给娃玩沙看潮汐；B 档没标星，先放着等你看",
      verdict: "hold",
    },
    {
      arrival: "2027-07-17",
      campId: 5,
      campName: "韦纳奇湖",
      site: "106号",
      fee: 46,
      driveMinutes: 113,
      nights: 1,
      scarcity: "hot",
      quality: "star",
      qualityNote: "北营地水电位·部分接驳无排污",
      reason: "A 级秒光营地的北营地水电 pull-through 位，1:53；韦纳奇湖第二去，隔一个月",
      verdict: "book_now",
      status: "booked",
      confirmation: "IWWA27-3600662B1",
    },
    {
      arrival: "2027-07-24",
      campId: 28,
      campName: "弗拉格勒堡",
      site: "Upper 30、31、33、34号",
      fee: 37,
      driveMinutes: 130,
      nights: 1,
      scarcity: "normal",
      quality: "good",
      qualityNote: "Upper 林间区·无接驳树荫好",
      reason: "弗拉格勒堡第二去，隔一个月；B 档，站上看后点帮我订",
      verdict: "hold",
    },
    {
      arrival: "2027-08-13",
      campId: 29,
      campName: "霍雨林",
      site: "待查",
      fee: null,
      driveMinutes: 257,
      nights: 2,
      scarcity: "hot",
      quality: "good",
      qualityNote: "温带雨林·待现查",
      reason: "全家没去过的温带雨林，值得请一天假住两晚；等现查结果",
      verdict: "hold",
    },
    {
      arrival: "2027-08-28",
      campId: 14,
      campName: "史蒂文斯堡",
      site: "待查",
      fee: null,
      driveMinutes: 204,
      nights: 1,
      scarcity: "hot",
      quality: "good",
      qualityNote: "俄勒冈海岸·待开窗现查",
      reason: "俄勒冈海岸+历史炮台，娃友好；等开窗现查",
      verdict: "hold",
    },
    {
      arrival: "2027-09-11",
      campId: 52,
      campName: "卡尔特斯湖",
      site: "待查",
      fee: null,
      driveMinutes: 156,
      nights: 1,
      scarcity: "hot",
      quality: "good",
      qualityNote: "BC 家庭湖滩·待开窗现查",
      reason: "BC 家庭湖滩收官站，9 月人少；等开窗现查",
      verdict: "hold",
    },
  ],
  note: "9 个周末：6 处已有空位、3 处待开窗现查（霍雨林 08-13、史蒂文斯堡 08-28、卡尔特斯湖 09-11）。立刻订的只有韦纳奇湖两处（A 级秒光，合计约 $113）；其余先放着等你看。不去的周末：07-31（替补：骗子桥）、08-07、08-21、09-04、09-18、09-25。",
};

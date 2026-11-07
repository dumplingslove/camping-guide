// 2027 年夏季周末营位现查数据（2026-11-01 现查，华盛顿州 goingtocamp / 俄勒冈 ReserveAmerica）。
// 口径：周六去、周日回、住 1 晚；Truck camper（F-150 + 滑入式 camper，约 20 英尺），不筛接驳、能停车即可；ADA 专用位不计。
// 空位会随订退变化，下单前以订位系统实时结果为准。

export type BookingSite = {
  /** 营位号/范围，如 "39、40号"、"Quarry Pond 306号" */
  site: string;
  /** 接驳类型：全接驳 / 水电 / 无接驳 */
  hookup: string;
  /** 垫子/备注，如 "54×14英尺 pull-through"、"倒车难" */
  pad?: string;
  /** 当晚房费（美元，不含 $8 订位费） */
  fee: number;
  /** 位置好坏：star = 站内研究点名推荐；good = 所在分区评分 4–5 分；不填 = 一般或数据待核实 */
  quality?: "star" | "good";
  qualityNote?: string;
  /** 订位状态：booked = 已订（confirmation 为确认号）；held = 先放着等用户看；不填 = 可订 */
  status?: "booked" | "held";
  confirmation?: string;
};

export type WeekendParks = {
  campId: number;
  sites: BookingSite[];
  /** 补充说明，如 "另有多个 Quarry 位" */
  more?: string;
};

export type BookingWeekend = {
  /** 入住日，周六，YYYY-MM-DD */
  arrival: string;
  label: string;
  parks: WeekendParks[];
};

export const BOOKING_CHECKED_AT = "2026-11-01";
export const BOOKING_RESERVATION_FEE = 8;

export const BOOKING_WEEKENDS: BookingWeekend[] = [
  {
    arrival: "2027-06-19",
    label: "6月19日周六",
    parks: [
      { campId: 26, sites: [{ site: "1、2、11号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "全接驳环·4分推荐区" }] },
      { campId: 27, sites: [{ site: "39、40号", hookup: "无接驳", fee: 37, quality: "star", qualityNote: "30–40号河边推荐段" }, { site: "41–46号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "全接驳环·5分强烈推荐区" }] },
      { campId: 1, sites: [{ site: "Quarry Pond 306号", hookup: "水电", fee: 46 }] },
      { campId: 5, sites: [{ site: "130号", hookup: "水电", pad: "54×14英尺 pull-through", fee: 51, quality: "star", qualityNote: "北营地水电位·站内推荐" }] },
      { campId: 8, sites: [{ site: "West Loop 77、78号", hookup: "无接驳", fee: 37 }] },
      {
        campId: 28,
        sites: [
          { site: "Lower 65号", hookup: "全接驳 pull-through", fee: 56, quality: "good", qualityNote: "下环·4分推荐区" },
          { site: "Upper 4号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "上环·4分推荐区" },
          { site: "Upper 16号 / Lower 69号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "上环·4分推荐区" },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 31、33号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Midway·5分强烈推荐区" },
          { site: "Northend 77号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "North End·4分推荐区" },
        ],
      },
    ],
  },
  {
    arrival: "2027-06-26",
    label: "6月26日周六",
    parks: [
      {
        campId: 26,
        sites: [
          { site: "47号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "全接驳环·4分推荐区" },
          { site: "Left Beach 81、92号", hookup: "水电", fee: 51 },
        ],
      },
      { campId: 1, sites: [{ site: "Quarry Pond 302号", hookup: "水电", fee: 46 }] },
      { campId: 25, sites: [{ site: "Upper Forest 59号", hookup: "水电", fee: 46, quality: "good", qualityNote: "上环·5分强烈推荐区" }] },
      { campId: 5, sites: [{ site: "18个无接驳位（含181号）", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "北营地五星区（含181号）" }] },
      { campId: 8, sites: [{ site: "West Loop 77号", hookup: "无接驳", fee: 37 }] },
      {
        campId: 28,
        sites: [
          { site: "Upper 30、33、35、38号", hookup: "无接驳", fee: 37, quality: "star", qualityNote: "Upper 30–40号推荐段" },
          { site: "Upper 39号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "上环·4分推荐区" },
          { site: "Lower 95号", hookup: "全接驳 pull-through", fee: 51, quality: "good", qualityNote: "下环·4分推荐区" },
        ],
      },
      {
        campId: 44,
        sites: [
          { site: "Dune Loop 98号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "Dune环·4分推荐区" },
          { site: "Cove Loop 64号", hookup: "全接驳", pad: "70×12英尺", fee: 56, quality: "good", qualityNote: "Cove环·4分推荐区" },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 33号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Midway·5分强烈推荐区" },
          { site: "Northend 83号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "North End·4分推荐区" },
        ],
      },
    ],
  },
  {
    arrival: "2027-07-03",
    label: "7月3日周六",
    parks: [
      { campId: 27, sites: [{ site: "39号", hookup: "无接驳", fee: 37, quality: "star", qualityNote: "30–40号河边推荐段" }, { site: "44号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "全接驳环·5分强烈推荐区" }] },
      { campId: 1, sites: [{ site: "Quarry Pond 312、315、323号", hookup: "水电", fee: 46 }] },
      { campId: 5, sites: [{ site: "9个无接驳位", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "南北营地均为4–5分推荐区" }] },
      {
        campId: 28,
        sites: [
          { site: "Upper 31、34、38号", hookup: "无接驳", fee: 37, quality: "star", qualityNote: "Upper 30–40号推荐段" },
          { site: "Upper 41号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "上环·4分推荐区" },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 36号", hookup: "无接驳", pad: "49×11英尺", fee: 37, quality: "good", qualityNote: "Midway·5分强烈推荐区" },
          { site: "Midway 63号", hookup: "无接驳 pull-through", fee: 43, quality: "good", qualityNote: "Midway·5分强烈推荐区" },
        ],
      },
    ],
  },
  {
    arrival: "2027-07-10",
    label: "7月10日周六",
    parks: [
      { campId: 26, sites: [{ site: "54号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "全接驳环·4分推荐区" }] },
      { campId: 8, sites: [{ site: "West Loop 77号", hookup: "无接驳", fee: 37 }] },
      {
        campId: 27,
        sites: [
          { site: "39号", hookup: "无接驳", fee: 37, quality: "star", qualityNote: "30–40号河边推荐段" },
          { site: "2号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "全接驳环·5分强烈推荐区" },
          { site: "4、6、22号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "全接驳环·5分强烈推荐区" }, { site: "59号", hookup: "全接驳", fee: 51 },
          { site: "41–46号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "全接驳环·5分强烈推荐区" },
        ],
      },
      {
        campId: 1,
        sites: [{ site: "Quarry Pond 305号", hookup: "水电 pull-through", fee: 46 }],
        more: "另有多个 Quarry 位",
      },
      {
        campId: 5,
        sites: [
          { site: "178、180号", hookup: "水电 pull-through", fee: 51, quality: "star", qualityNote: "北营地水电位·站内推荐" },
          { site: "40多个位（含181号）", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "北营地五星区（含181号）" },
        ],
      },
      {
        campId: 28,
        sites: [
          { site: "Upper 31、34、38号", hookup: "无接驳", fee: 37, quality: "star", qualityNote: "Upper 30–40号推荐段" },
          { site: "Upper 39号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "上环·4分推荐区" },
          { site: "Upper 41号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "上环·4分推荐区" },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 32、64号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Midway·5分强烈推荐区" },
          { site: "Northend 86号", hookup: "无接驳 pull-through", pad: "进出很陡，订前请与公园确认", fee: 37, quality: "good", qualityNote: "North End·4分推荐区" },
        ],
      },
    ],
  },
  {
    arrival: "2027-07-17",
    label: "7月17日周六",
    parks: [
      { campId: 26, sites: [{ site: "24号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "全接驳环·4分推荐区" }] },
      {
        campId: 27,
        sites: [
          { site: "34号", hookup: "全接驳", fee: 51, quality: "star", qualityNote: "30–40号河边推荐段" },
          { site: "39号", hookup: "无接驳", fee: 37, quality: "star", qualityNote: "30–40号河边推荐段" }, { site: "41、43、45、46号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "全接驳环·5分强烈推荐区" },
        ],
      },
      {
        campId: 1,
        sites: [
          { site: "Forest Loop 70号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Forest Loop·5分强烈推荐区" },
          { site: "Quarry Pond 302号", hookup: "水电", fee: 46 },
        ],
      },
      {
        campId: 5,
        sites: [
          { site: "106、109号", hookup: "水电 pull-through", fee: 46, quality: "star", qualityNote: "北营地水电位·站内推荐" },
          { site: "139、184、196号", hookup: "水电", fee: 46, quality: "star", qualityNote: "北营地水电位·站内推荐" },
          { site: "20多个位", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "南北营地均为4–5分推荐区" },
        ],
      },
      {
        campId: 28,
        sites: [
          { site: "Upper 31、38号", hookup: "无接驳", fee: 37, quality: "star", qualityNote: "Upper 30–40号推荐段" },
          { site: "Upper 43号", hookup: "无接驳 pull-through", fee: 43, quality: "good", qualityNote: "上环·4分推荐区" },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 32、33号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Midway·5分强烈推荐区" },
          { site: "Northend 86号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "North End·4分推荐区" },
        ],
      },
    ],
  },
  {
    arrival: "2027-07-24",
    label: "7月24日周六",
    parks: [
      {
        campId: 26,
        sites: [
          { site: "4、6号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "全接驳环·4分推荐区" },
          { site: "Left Beach 106号", hookup: "无接驳", fee: 43 },
        ],
      },
      {
        campId: 27,
        sites: [
          { site: "39、40号", hookup: "无接驳", fee: 37, quality: "star", qualityNote: "30–40号河边推荐段" }, { site: "41–46号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "全接驳环·5分强烈推荐区" },
          { site: "59号", hookup: "全接驳", fee: 51 },
        ],
      },
      {
        campId: 1,
        sites: [
          { site: "Forest Loop 58号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Forest Loop·5分强烈推荐区" },
          { site: "Quarry Pond 308号", hookup: "水电", fee: 46 },
        ],
      },
      { campId: 5, sites: [{ site: "10多个无接驳位", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "南北营地均为4–5分推荐区" }] },
      {
        campId: 28,
        sites: [
          { site: "Upper 30、31、33、34号", hookup: "无接驳", fee: 37, quality: "star", qualityNote: "Upper 30–40号推荐段" },
          { site: "Upper 39号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "上环·4分推荐区" },
          { site: "Upper 41号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "上环·4分推荐区" },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 32、33号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Midway·5分强烈推荐区" },
          { site: "Midway 44号", hookup: "无接驳", pad: "26×11英尺，刚够", fee: 31, quality: "good", qualityNote: "Midway·5分强烈推荐区" },
          { site: "Northend 83号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "North End·4分推荐区" },
        ],
      },
    ],
  },
];

/** 华盛顿州立公园八九月周末：270 天窗口还没开，标开放日，到日子现查 */
export type UpcomingWeekend = {
  /** 入住日，周六，YYYY-MM-DD */
  arrival: string;
  label: string;
  /** 放号窗口开放日 YYYY-MM-DD */
  opensOn: string;
  opensLabel: string;
};

export const UPCOMING_WEEKENDS: UpcomingWeekend[] = [
  { arrival: "2027-08-07", label: "8月7日周六", opensOn: "2026-11-10", opensLabel: "11月10日" },
  { arrival: "2027-08-14", label: "8月14日周六", opensOn: "2026-11-17", opensLabel: "11月17日" },
  { arrival: "2027-08-21", label: "8月21日周六", opensOn: "2026-11-24", opensLabel: "11月24日" },
  { arrival: "2027-08-28", label: "8月28日周六", opensOn: "2026-12-01", opensLabel: "12月1日" },
  { arrival: "2027-09-04", label: "9月4日周六", opensOn: "2026-12-08", opensLabel: "12月8日" },
  { arrival: "2027-09-11", label: "9月11日周六", opensOn: "2026-12-15", opensLabel: "12月15日" },
  { arrival: "2027-09-18", label: "9月18日周六", opensOn: "2026-12-22", opensLabel: "12月22日" },
  { arrival: "2027-09-25", label: "9月25日周六", opensOn: "2026-12-29", opensLabel: "12月29日" },
];

/** 还在盯着的营地：窗口未开，或该周末订满等退订 */
export type WatchingPark = {
  campId: number;
  reason: string;
  checkNote: string;
  /** 订满的周末（空 = 整个窗口未开） */
  soldOutWeekends?: string[];
};

export const WATCHING_PARKS: WatchingPark[] = [
  {
    campId: 14,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 月档期 2026-12-01 起滚动开放，7 月档期约 2027-01-01 起",
  },
  {
    campId: 31,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 月档期 2026-12-01 起滚动开放，7 月档期约 2027-01-01 起",
  },
  {
    campId: 32,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 月档期 2026-12-01 起滚动开放，7 月档期约 2027-01-01 起",
  },
  {
    campId: 33,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 月档期 2026-12-01 起滚动开放，7 月档期约 2027-01-01 起",
  },
  {
    campId: 34,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 月档期 2026-12-01 起滚动开放，7 月档期约 2027-01-01 起",
  },
  {
    campId: 38,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 月档期 2026-12-01 起滚动开放，7 月档期约 2027-01-01 起",
  },
  {
    campId: 46,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 月档期 2026-12-01 起滚动开放，7 月档期约 2027-01-01 起",
  },
  {
    campId: 29,
    reason: "Recreation.gov 270 天窗口已开，待现查",
    checkNote: "6 月 19 日档期 2026-09-22 已开，7 月 24 日档期 2026-10-27 已开；8 月 7 日档期 11 月 10 日开",
  },
  {
    campId: 4,
    reason: "Recreation.gov 180 天窗口未开",
    checkNote: "6 月档期 2026-12-21 起、7 月 2027-01-04 起、8 月 2027-02-08 起、9 月 2027-03-08 起滚动开放，每天太平洋时间早 7 点放票",
  },
  {
    campId: 11,
    reason: "Recreation.gov 180 天窗口未开",
    checkNote: "A/B Loop 180 天窗口未开（C/D 提前 2 周、E/F 提前 4 天）；6 月档期 2026-12-21 起滚动开放",
  },
  {
    campId: 17,
    reason: "Recreation.gov 180 天窗口未开",
    checkNote: "6 月档期 2026-12-21 起、7 月 2027-01-04 起、8 月 2027-02-08 起、9 月 2027-03-08 起滚动开放，每天太平洋时间早 7 点放票",
  },
  {
    campId: 18,
    reason: "Recreation.gov 180 天窗口未开",
    checkNote: "6 月档期 2026-12-21 起、7 月 2027-01-04 起、8 月 2027-02-08 起、9 月 2027-03-08 起滚动开放，每天太平洋时间早 7 点放票",
  },
  {
    campId: 23,
    reason: "Recreation.gov 180 天窗口未开",
    checkNote: "6 月档期 2026-12-21 起、7 月 2027-01-04 起、8 月 2027-02-08 起、9 月 2027-03-08 起滚动开放，每天太平洋时间早 7 点放票",
  },
  {
    campId: 37,
    reason: "Recreation.gov 180 天窗口未开",
    checkNote: "6 月档期 2026-12-21 起、7 月 2027-01-04 起、8 月 2027-02-08 起、9 月 2027-03-08 起滚动开放，每天太平洋时间早 7 点放票",
  },
  {
    campId: 39,
    reason: "Recreation.gov 180 天窗口未开",
    checkNote: "6 月档期 2026-12-21 起、7 月 2027-01-04 起、8 月 2027-02-08 起、9 月 2027-03-08 起滚动开放，每天太平洋时间早 7 点放票",
  },
  {
    campId: 7,
    reason: "Recreation.gov 180 天窗口未开",
    checkNote: "Loop B 180 天窗口未开（Loop A 提前 4 天、Loop C 提前 14 天）；6 月档期 2026-12-21 起滚动开放",
  },
  {
    campId: 50,
    reason: "BC Parks 60 天窗口未开",
    checkNote: "6 月档期 2027-04-20 起、7 月 2027-05-04 起、8 月 2027-06-08 起、9 月 2027-07-06 起滚动开放",
  },
  {
    campId: 51,
    reason: "BC Parks 60 天窗口未开",
    checkNote: "6 月档期 2027-04-20 起、7 月 2027-05-04 起、8 月 2027-06-08 起、9 月 2027-07-06 起滚动开放",
  },
  {
    campId: 52,
    reason: "BC Parks 60 天窗口未开",
    checkNote: "6 月档期 2027-04-20 起、7 月 2027-05-04 起、8 月 2027-06-08 起、9 月 2027-07-06 起滚动开放",
  },
  {
    campId: 53,
    reason: "BC Parks 60 天窗口未开",
    checkNote: "6 月档期 2027-04-20 起、7 月 2027-05-04 起、8 月 2027-06-08 起、9 月 2027-07-06 起滚动开放",
  },
  {
    campId: 10,
    reason: "14 天滚动窗口，临行才放号",
    checkNote: "提前 14 天滚动放号，夏季周末临行前两周再查",
  },
  {
    campId: 26,
    reason: "该周末订满，盯退订",
    checkNote: "有退订会报",
    soldOutWeekends: ["2027-07-03"],
  },
  {
    campId: 25,
    reason: "多数周末无普通位，盯退订",
    checkNote: "6月26日有位；其余周末仅剩 ADA 位或订满",
    soldOutWeekends: ["2027-06-19", "2027-07-03", "2027-07-10", "2027-07-17", "2027-07-24"],
  },
  {
    campId: 8,
    reason: "该周末订满，盯退订",
    checkNote: "有退订会报",
    soldOutWeekends: ["2027-07-03", "2027-07-17", "2027-07-24"],
  },
  {
    campId: 44,
    reason: "多数周末仅剩 ADA 位，盯退订",
    checkNote: "6月26日有位；其余周末无普通位",
    soldOutWeekends: ["2027-06-19", "2027-07-03", "2027-07-10", "2027-07-17", "2027-07-24"],
  },
  {
    campId: 27,
    reason: "该周末无普通位，盯退订",
    checkNote: "有退订会报",
    soldOutWeekends: ["2027-06-26"],
  },
];

/** 本次现查覆盖过的华盛顿州营地 id（用于算“这周没位”） */
export const CHECKED_WA_CAMP_IDS = [26, 27, 1, 5, 8, 28, 30, 44, 25];

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
      { campId: 26, sites: [{ site: "1、2、11号", hookup: "全接驳", fee: 56 }] },
      { campId: 27, sites: [{ site: "39、40、41–46号", hookup: "无接驳", fee: 37 }] },
      { campId: 1, sites: [{ site: "Quarry Pond 306号", hookup: "水电", fee: 46 }] },
      { campId: 5, sites: [{ site: "130号", hookup: "水电", pad: "54×14英尺 pull-through", fee: 51 }] },
      { campId: 8, sites: [{ site: "West Loop 77、78号", hookup: "无接驳", fee: 37 }] },
      {
        campId: 28,
        sites: [
          { site: "Lower 65号", hookup: "全接驳 pull-through", fee: 56 },
          { site: "Upper 4号", hookup: "无接驳", fee: 43 },
          { site: "Upper 16号 / Lower 69号", hookup: "无接驳", fee: 31 },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 31、33号", hookup: "无接驳", fee: 37 },
          { site: "Northend 77号", hookup: "无接驳", fee: 43 },
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
          { site: "47号", hookup: "全接驳", fee: 56 },
          { site: "Left Beach 81、92号", hookup: "水电", fee: 51 },
        ],
      },
      { campId: 1, sites: [{ site: "Quarry Pond 302号", hookup: "水电", fee: 46 }] },
      { campId: 25, sites: [{ site: "Upper Forest 59号", hookup: "水电", fee: 46 }] },
      { campId: 5, sites: [{ site: "18个无接驳位（含181号）", hookup: "无接驳", fee: 37 }] },
      { campId: 8, sites: [{ site: "West Loop 77号", hookup: "无接驳", fee: 37 }] },
      {
        campId: 28,
        sites: [
          { site: "Upper 30、33、35、38号", hookup: "无接驳", fee: 37 },
          { site: "Upper 39号", hookup: "无接驳", fee: 31 },
          { site: "Lower 95号", hookup: "全接驳 pull-through", fee: 51 },
        ],
      },
      {
        campId: 44,
        sites: [
          { site: "Dune Loop 98号", hookup: "全接驳", fee: 56 },
          { site: "Cove Loop 64号", hookup: "全接驳", pad: "70×12英尺", fee: 56 },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 33号", hookup: "无接驳", fee: 37 },
          { site: "Northend 83号", hookup: "无接驳", fee: 31 },
        ],
      },
    ],
  },
  {
    arrival: "2027-07-03",
    label: "7月3日周六",
    parks: [
      { campId: 27, sites: [{ site: "39、44号", hookup: "无接驳", fee: 37 }] },
      { campId: 1, sites: [{ site: "Quarry Pond 312、315、323号", hookup: "水电", fee: 46 }] },
      { campId: 5, sites: [{ site: "9个无接驳位", hookup: "无接驳", fee: 37 }] },
      {
        campId: 28,
        sites: [
          { site: "Upper 31、34、38号", hookup: "无接驳", fee: 37 },
          { site: "Upper 41号", hookup: "无接驳", fee: 37 },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 36号", hookup: "无接驳", pad: "49×11英尺", fee: 37 },
          { site: "Midway 63号", hookup: "无接驳 pull-through", fee: 43 },
        ],
      },
    ],
  },
  {
    arrival: "2027-07-10",
    label: "7月10日周六",
    parks: [
      { campId: 26, sites: [{ site: "54号", hookup: "全接驳", fee: 56 }] },
      { campId: 8, sites: [{ site: "West Loop 77号", hookup: "无接驳", fee: 37 }] },
      {
        campId: 27,
        sites: [
          { site: "39号", hookup: "无接驳", fee: 37 },
          { site: "2号", hookup: "全接驳", fee: 56 },
          { site: "4、6、22、59号", hookup: "全接驳", fee: 51 },
          { site: "41–46号", hookup: "无接驳", fee: 37 },
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
          { site: "178、180号", hookup: "水电 pull-through", fee: 51 },
          { site: "40多个位（含181号）", hookup: "无接驳", fee: 37 },
        ],
      },
      {
        campId: 28,
        sites: [
          { site: "Upper 31、34、38号", hookup: "无接驳", fee: 37 },
          { site: "Upper 39号", hookup: "无接驳", fee: 31 },
          { site: "Upper 41号", hookup: "无接驳", fee: 37 },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 32、64号", hookup: "无接驳", fee: 37 },
          { site: "Northend 86号", hookup: "无接驳 pull-through", pad: "进出很陡，订前请与公园确认", fee: 37 },
        ],
      },
    ],
  },
  {
    arrival: "2027-07-17",
    label: "7月17日周六",
    parks: [
      { campId: 26, sites: [{ site: "24号", hookup: "全接驳", fee: 56 }] },
      {
        campId: 27,
        sites: [
          { site: "34号", hookup: "全接驳", fee: 51 },
          { site: "39、41、43、45、46号", hookup: "无接驳", fee: 37 },
        ],
      },
      {
        campId: 1,
        sites: [
          { site: "Forest Loop 70号", hookup: "水电", fee: 51 },
          { site: "Quarry Pond 302号", hookup: "水电", fee: 46 },
        ],
      },
      {
        campId: 5,
        sites: [
          { site: "106、109号", hookup: "水电 pull-through", fee: 46 },
          { site: "139、184、196号", hookup: "水电", fee: 46 },
          { site: "20多个位", hookup: "无接驳", fee: 37 },
        ],
      },
      {
        campId: 28,
        sites: [
          { site: "Upper 31、38号", hookup: "无接驳", fee: 37 },
          { site: "Upper 43号", hookup: "无接驳 pull-through", fee: 43 },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 32、33号", hookup: "无接驳", fee: 37 },
          { site: "Northend 86号", hookup: "无接驳", fee: 37 },
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
          { site: "4、6号", hookup: "全接驳", fee: 56 },
          { site: "Left Beach 106号", hookup: "无接驳", fee: 43 },
        ],
      },
      {
        campId: 27,
        sites: [
          { site: "39、40、41–46号", hookup: "无接驳", fee: 37 },
          { site: "59号", hookup: "全接驳", fee: 51 },
        ],
      },
      {
        campId: 1,
        sites: [
          { site: "Forest Loop 58号", hookup: "水电", fee: 51 },
          { site: "Quarry Pond 308号", hookup: "水电", fee: 46 },
        ],
      },
      { campId: 5, sites: [{ site: "10多个无接驳位", hookup: "无接驳", fee: 37 }] },
      {
        campId: 28,
        sites: [
          { site: "Upper 30、31、33、34号", hookup: "无接驳", fee: 37 },
          { site: "Upper 39号", hookup: "无接驳", fee: 31 },
          { site: "Upper 41号", hookup: "无接驳", fee: 37 },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 32、33号", hookup: "无接驳", fee: 37 },
          { site: "Midway 44号", hookup: "无接驳", pad: "26×11英尺，刚够", fee: 31 },
          { site: "Northend 83号", hookup: "无接驳", fee: 31 },
        ],
      },
    ],
  },
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

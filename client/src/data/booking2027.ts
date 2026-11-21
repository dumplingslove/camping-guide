// 2027 年夏季周末营位现查数据（2026-11-01 现查，华盛顿州 goingtocamp / 俄勒冈 ReserveAmerica；2026-11-07 现查霍雨林 Recreation.gov；2026-11-10 现查华盛顿州 8/7 周六 goingtocamp；2026-11-17 现查华盛顿州 8/14 周六 goingtocamp；2026-11-20 复查华盛顿州 6/26、7/3、7/10、7/24、8/14 周六 goingtocamp；2026-11-21 复查华盛顿州 6/19–8/14 全部周六 goingtocamp 与 Hoh Recreation.gov）。
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

export const BOOKING_CHECKED_AT = "2026-11-21";
export const BOOKING_RESERVATION_FEE = 8;

export const BOOKING_WEEKENDS: BookingWeekend[] = [
  {
    arrival: "2027-06-19",
    label: "6月19日周六",
    parks: [
      { campId: 26, sites: [{ site: "2、24、51号", hookup: "全接驳", fee: 56 }, { site: "106号", hookup: "无接驳", fee: 43 }] },
      { campId: 27, sites: [{ site: "39、40、41号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Loop 2 河边区·接驳须逐号核对" }] },
      { campId: 1, sites: [{ site: "Quarry Pond 306、308、310、312、359号", hookup: "水电", fee: 46 }, { site: "Quarry Pond 343号", hookup: "无接驳", fee: 37 }] },
      { campId: 5, sites: [{ site: "130号", hookup: "水电", pad: "54×14英尺 pull-through", fee: 51, quality: "star", qualityNote: "北营地水电位·部分接驳无排污", status: "booked", confirmation: "IWWA27-3600548B1" }] },
      {
        campId: 28,
        sites: [
          { site: "Lower 65号", hookup: "全接驳 pull-through", fee: 56, quality: "good", qualityNote: "下环·全接驳临海区" },
          { site: "Lower 94号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "下环·全接驳临海区" },
          { site: "Upper 34号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "上环·林间无接驳区" },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 31、36、64号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
          { site: "Midway 47、54B号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
          { site: "Midway 51号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
          { site: "Northend 96号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Northend·林间私密区" },
        ],
      },
    ],
  },
  {
    arrival: "2027-06-26",
    label: "6月26日周六",
    parks: [
      { campId: 26, sites: [{ site: "47号", hookup: "全接驳", fee: 56 }] },
      { campId: 1, sites: [{ site: "Quarry Pond 302、303、304、305、306、308、310、312、314、317、319、321、325、336、339、349、350、358、359、360号", hookup: "水电", fee: 46 }, { site: "Quarry Pond 316号", hookup: "水电", fee: 51 }, { site: "Quarry Pond 343号", hookup: "无接驳", fee: 37 }] },
      { campId: 25, sites: [{ site: "Beach Campground 18、19、34、38、39、41号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "Beach Campground·全接驳多数有海景" }, { site: "Beach Campground 20、21、22、24、25、26、27、28、30、31、32、33、35、40、43、48、49号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "Beach Campground·全接驳多数有海景" }] },
      { campId: 5, sites: [{ site: "108、110、112、114、115、136、138、188号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "北营地五星区" }] },
      { campId: 28, sites: [{ site: "Upper 30号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Upper 林间区·无接驳树荫好" }] },
      { campId: 44, sites: [{ site: "Dune Loop 98号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "Dune环·近游乐场家庭区" }] },
      {
        campId: 30,
        sites: [
          { site: "Midway 38、53、59、60、65号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
          { site: "Midway 47、54B号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
          { site: "Northend 89号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Northend·林间私密区" },
          { site: "Northend 92号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Northend·林间私密区" },
        ],
      },
    ],
  },
  {
    arrival: "2027-07-03",
    label: "7月3日周六",
    parks: [
      { campId: 5, sites: [{ site: "188号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "南北营地均为4–5分推荐区" }] },
      {
        campId: 30,
        sites: [
          { site: "Midway 54B号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
          { site: "Northend 87号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Northend·林间私密区" },
        ],
      },
      {
        campId: 25,
        sites: [
          { site: "Beach Campground 23、26、28、30、33、35、40、45号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "Beach Campground·全接驳多数有海景" },
        ],
      },
    ],
  },
  {
    arrival: "2027-07-10",
    label: "7月10日周六",
    parks: [
      {
        campId: 1,
        sites: [{ site: "Quarry Pond 305、306、310、312、319、321、325、331、335号", hookup: "水电", fee: 46 }],
      },
      {
        campId: 28,
        sites: [
          { site: "Lower 81号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "下环·全接驳临海区" },
          { site: "Upper 34号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Upper 林间区·无接驳树荫好" },
          { site: "Upper 42号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Upper 林间区·无接驳树荫好" },
          { site: "Upper 44号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Upper 林间区·无接驳树荫好" },
        ],
      },
    ],
  },
  {
    arrival: "2027-07-17",
    label: "7月17日周六",
    parks: [
      { campId: 26, sites: [{ site: "50号", hookup: "全接驳", fee: 56 }] },
      {
        campId: 27,
        sites: [
          { site: "39、41、43、45、46号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Loop 2 河边区·接驳须逐号核对" },
        ],
      },
      {
        campId: 1,
        sites: [
          { site: "Quarry Pond 302、303、304、306、307、310、312、321号", hookup: "水电", fee: 46 },
        ],
      },
      {
        campId: 5,
        sites: [
          { site: "106号", hookup: "水电 pull-through", fee: 46, quality: "star", qualityNote: "北营地水电位·部分接驳无排污", status: "booked", confirmation: "IWWA27-3600662B1" },
          { site: "109号", hookup: "水电 pull-through", fee: 46, quality: "star", qualityNote: "北营地水电位·部分接驳无排污" },
          { site: "139、184号", hookup: "水电", fee: 46, quality: "star", qualityNote: "北营地水电位·部分接驳无排污" },
          { site: "172、196号", hookup: "水电 pull-through", fee: 51, quality: "star", qualityNote: "北营地水电位·部分接驳无排污" },
          { site: "115、117、119、121、127、134、136、138、140、151、175、181号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "南北营地均为4–5分推荐区" },
          { site: "171、173号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "南北营地均为4–5分推荐区" },
        ],
      },
      {
        campId: 28,
        sites: [
          { site: "Lower 87号", hookup: "全接驳 pull-through", fee: 56, quality: "good", qualityNote: "下环·全接驳临海区" },
          { site: "Upper 43号", hookup: "无接驳 pull-through", fee: 43, quality: "good", qualityNote: "上环·林间无接驳区" },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 20、21号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
          { site: "Northend 106、107号", hookup: "无接驳", fee: 43, pad: "双营位，需同订（106号$43、107号$37）", quality: "good", qualityNote: "Northend·林间私密区" },
        ],
      },
      { campId: 29, sites: [{ site: "团体营位 2/3号（16人/8帐）", hookup: "无接驳", pad: "平行入位·限20英尺", fee: 48 }] },
    ],
  },
  {
    arrival: "2027-07-24",
    label: "7月24日周六",
    parks: [
      { campId: 26, sites: [{ site: "6、33、49号", hookup: "全接驳", fee: 56 }] },
      { campId: 27, sites: [{ site: "39、40、41、42、43、44、45、46号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Loop 2 河边区·接驳须逐号核对" }] },
      {
        campId: 1,
        sites: [
          { site: "Forest Loop 58号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Forest Loop·5分环（水电部分接驳）" },
          { site: "Quarry Pond 308、310、354、357、361号", hookup: "水电", fee: 46 },
          { site: "Quarry Pond 343号", hookup: "无接驳", fee: 37 },
        ],
      },
      {
        campId: 5,
        sites: [
          { site: "105、107、108、114、115、119、121、122、131、132、136、138、142、148、153、155、157、159、162、163、164、166、167、175、177、179、183、185、186、190、191、193、195号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "南北营地均为4–5分推荐区" },
          { site: "143、145、147、171、173号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "南北营地均为4–5分推荐区" },
        ],
      },
      { campId: 30, sites: [{ site: "Midway 64号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" }] },
      { campId: 29, sites: [{ site: "团体营位 2/3号（16人/8帐）", hookup: "无接驳", pad: "平行入位·限20英尺", fee: 48 }] },
    ],
  },
  {
    arrival: "2027-08-07",
    label: "8月7日周六",
    parks: [
      {
        campId: 26,
        sites: [
          { site: "Left Beach 88号", hookup: "水电", fee: 51 },
          { site: "24号", hookup: "全接驳", fee: 56 },
        ],
      },
      {
        campId: 27,
        sites: [
          { site: "2、11号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "近河边·接驳须逐号核对" },
          { site: "4、10、12、14、27、29号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "近河边·接驳须逐号核对" },
          { site: "33、50、53、57、59号", hookup: "全接驳", fee: 51 },
          { site: "39、40、41、42、43、44号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Loop 2 河边区·接驳须逐号核对" },
        ],
      },
      {
        campId: 1,
        sites: [
          { site: "Forest Loop 41号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Forest Loop·5分环（水电部分接驳）" },
          { site: "Quarry Pond 302、303、304、305、306、307、308、310、312、314、317、318、319、321、322、324、325、331、333、336、339、349、350、353、354、357、359号", hookup: "水电", fee: 46 },
          { site: "Quarry Pond 316号", hookup: "水电", fee: 51 },
        ],
      },
      {
        campId: 5,
        sites: [
          { site: "116、189号", hookup: "水电", fee: 51, quality: "star", qualityNote: "北营地水电位·部分接驳无排污" },
          { site: "143、145、147、173号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "北营地五星区·经济型" },
          { site: "108、112、114、115、117、119、121、122、123、125、127、132、134、136、138、140、142、148、175、179、181、183、185、186、188、190、191、193、195、197号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "北营地五星区（含181号）" },
        ],
      },
      {
        campId: 28,
        sites: [
          { site: "Upper 34号", hookup: "无接驳", pad: "场地 42×33英尺；仅列帐篷/Van-Camper，订前请与公园确认", fee: 37, quality: "good", qualityNote: "上环·林间无接驳区" },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 47号", hookup: "无接驳", pad: "45×10英尺；仅列帐篷/Van-Camper，订前请与公园确认", fee: 31 },
        ],
      },
      {
        campId: 44,
        sites: [
          { site: "Sage Loop 312号", hookup: "无接驳", pad: "30×20英尺", fee: 43 },
        ],
      },
    ],
  },
  {
    arrival: "2027-08-14",
    label: "8月14日周六",
    parks: [
      { campId: 26, sites: [{ site: "11、12、13、14、15号", hookup: "全接驳", fee: 56 }] },
      {
        campId: 27,
        sites: [
          { site: "2号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "近河边·接驳须逐号核对" },
          { site: "4、10、12号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "近河边·接驳须逐号核对" },
          { site: "5、8、33号", hookup: "全接驳", fee: 56 },
          { site: "6、9、16、21、57、59号", hookup: "全接驳", fee: 51 },
          { site: "39、40、41、42、43、44、45、46号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Loop 2 河边区·接驳须逐号核对" },
        ],
      },
      {
        campId: 1,
        sites: [
          { site: "Forest Loop 1、21号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Forest Loop·5分环（水电部分接驳）" },
          { site: "Quarry Pond 303、304、305、306、310、312、313、314、317、318、319、321、322、324、325、326、327、331、333、336、339、354、358、359号", hookup: "水电", fee: 46, pad: "326、327号双营位，需同订" },
          { site: "Quarry Pond 316号", hookup: "水电", fee: 51 },
        ],
      },
      {
        campId: 5,
        sites: [
          { site: "101、141、184、187号", hookup: "水电", fee: 46, quality: "star", qualityNote: "北营地水电位·部分接驳无排污" },
          { site: "104、130、154、182、189、192号", hookup: "水电", fee: 51, quality: "star", qualityNote: "北营地水电位·部分接驳无排污" },
          { site: "105、107、108、110、112、114、115、117、119、121、122、123、125、127、129、131、132、134、136、138、140、142、148、151、153、155、157、159、160、162、163、164、166、167、175、179、181、185、186、188、190、193、195、197号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "北营地五星区（含181号）" },
          { site: "143、145、147、171、173号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "北营地五星区·经济型" },
        ],
      },
      {
        campId: 28,
        sites: [
          { site: "Upper 19、22、24、30、33、34、35号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "上环·林间无接驳区" },
          { site: "Upper 29、40、42、44号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "上环·林间无接驳区" },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 54B号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
          { site: "Northend 76号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Northend·林间私密区" },
        ],
      },
      {
        campId: 44,
        sites: [
          { site: "Sage Loop 304、305、306、307号", hookup: "无接驳", fee: 43 },
          { site: "Dune Loop 322号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Dune环·近游乐场家庭区" },
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
    reason: "Recreation.gov 分批放票，标准位未开",
    checkNote: "2026-11-07 已查：2027 预订季 6月26日–9月7日；A 环提前 6 个月、C 环 2 周、B 环 4 天放票（非 270 天）。6/19 不在预订季内、先到先得不可网订；7/3、7/10、7/17、7/24 标准位全部未开放，团体营位 2/3 号（$48/晚）2026-11-21 现查：7/3、7/10 已订满，7/17、7/24 可订。A 环放票日：7/3→2027-01-03、7/10→01-10、7/17→01-17、7/24→01-24（07:00 PST）；计划 08-13 两晚行程 A 环约 2027-02-13 开",
    soldOutWeekends: ["2027-07-03", "2027-07-10"],
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
    reason: "BC Parks 3 个月滚动窗口未开",
    checkNote: "6 月档期 2027-03-19 起、7 月 2027-04-03 起、8 月 2027-05-07 起、9 月 2027-06-04 起滚动开放，每天太平洋时间早 7 点放票",
  },
  {
    campId: 51,
    reason: "BC Parks 3 个月滚动窗口未开",
    checkNote: "6 月档期 2027-03-19 起、7 月 2027-04-03 起、8 月 2027-05-07 起、9 月 2027-06-04 起滚动开放，每天太平洋时间早 7 点放票",
  },
  {
    campId: 52,
    reason: "BC Parks 3 个月滚动窗口未开",
    checkNote: "6 月档期 2027-03-19 起、7 月 2027-04-03 起、8 月 2027-05-07 起、9 月 2027-06-04 起滚动开放，每天太平洋时间早 7 点放票",
  },
  {
    campId: 53,
    reason: "BC Parks 3 个月滚动窗口未开",
    checkNote: "6 月档期 2027-03-19 起、7 月 2027-04-03 起、8 月 2027-05-07 起、9 月 2027-06-04 起滚动开放，每天太平洋时间早 7 点放票",
  },
  {
    campId: 10,
    reason: "每年 1 月 1 日开放当年预订",
    checkNote: "CampLife 每年 1 月 1 日开放当年 2 月 1 日–10 月 31 日预订；可订位 16–39、50–68、71–73 号，其余先到先得",
  },
  {
    campId: 26,
    reason: "该周末订满，盯退订",
    checkNote: "有退订会报",
    soldOutWeekends: ["2027-07-03", "2027-07-10"],
  },
  {
    campId: 25,
    reason: "多数周末无普通位，盯退订",
    checkNote: "6月26日 Beach Campground 23 个全接驳位；7月3日 Beach Campground 8 个全接驳位；其余周末仅剩 ADA 位或订满",
    soldOutWeekends: ["2027-06-19", "2027-07-10", "2027-07-17", "2027-07-24", "2027-08-07", "2027-08-14"],
  },
  {
    campId: 8,
    reason: "该周末订满，盯退订",
    checkNote: "有退订会报",
    soldOutWeekends: ["2027-06-19", "2027-06-26", "2027-07-03", "2027-07-10", "2027-07-17", "2027-07-24", "2027-08-07", "2027-08-14"],
  },
  {
    campId: 44,
    reason: "多数周末仅剩 ADA 位，盯退订",
    checkNote: "6月26日有位；8月14日 Sage Loop 4 个位、Dune Loop 1 个位；其余周末无普通位",
    soldOutWeekends: ["2027-06-19", "2027-07-03", "2027-07-10", "2027-07-17", "2027-07-24"],
  },
  {
    campId: 27,
    reason: "该周末无普通位，盯退订",
    checkNote: "有退订会报",
    soldOutWeekends: ["2027-06-26", "2027-07-03", "2027-07-10"],
  },
  {
    campId: 28,
    reason: "该周末订满，盯退订",
    checkNote: "有退订会报",
    soldOutWeekends: ["2027-07-03", "2027-07-24"],
  },
  {
    campId: 30,
    reason: "该周末订满，盯退订",
    checkNote: "有退订会报",
    soldOutWeekends: ["2027-07-10"],
  },
  {
    campId: 1,
    reason: "该周末订满，盯退订",
    checkNote: "有退订会报",
    soldOutWeekends: ["2027-07-03"],
  },
  {
    campId: 5,
    reason: "该周末订满，盯退订",
    checkNote: "有退订会报",
    soldOutWeekends: ["2027-07-10"],
  },
];

/** 本次现查覆盖过的华盛顿州营地 id（用于算“这周没位”） */
export const CHECKED_WA_CAMP_IDS = [26, 27, 1, 5, 8, 28, 30, 44, 25];

// 2027 年夏季周末营位现查数据（2026-11-01 现查，华盛顿州 goingtocamp / 俄勒冈 ReserveAmerica；2026-11-07 现查霍雨林 Recreation.gov；2026-11-10 现查华盛顿州 8/7 周六 goingtocamp；2026-11-17 现查华盛顿州 8/14 周六 goingtocamp；2026-11-20 复查华盛顿州 6/26、7/3、7/10、7/24、8/14 周六 goingtocamp；2026-11-21 复查华盛顿州 6/19–8/14 全部周六 goingtocamp 与 Hoh Recreation.gov；同日补查 8/21 周六（16 园）与新园首查（2/9/16/40/41/42/43、桤木湖 3、KOA 12））。2026-11-21 扩围：每日扫描覆盖从 30 个营地扩至 54 个（新增华盛顿州立公园 2/9/16/40/41/42/43、联邦 6/19/22/54/55/56、俄勒冈 15/20/21/35/36/45/47/48/49、Tacoma Power 3、KOA 12；南海滩 13 先到先得与太平洋海岸房车度假村 24 不适配不进扫描）。2026-11-21 删 6 个（19 Little Crater Lake、22 Farewell Bend、35 瓦洛厄湖、45 布拉兹海滩、47 日落湾、49 拉派恩），扫描覆盖 54→48 个。窗口口径二次核实（2026-11-21）：华盛顿州立公园 9 个自然月、联邦 6 个自然月、俄勒冈 6 个自然月滚动，均按自然月到日（旧 270 天/180 天/按月整批口径已纠正）。2026-11-22 复查：华盛顿州 16 园 9 周末、Mazama 7/3–9/25 首查、Kachess 5/22 新放、Hoh 团体位、KOA；Alder Lake 本轮未查。
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

export const BOOKING_CHECKED_AT = "2026-11-22";
export const BOOKING_RESERVATION_FEE = 8;

export const BOOKING_WEEKENDS: BookingWeekend[] = [
  {
    arrival: "2027-06-19",
    label: "6月19日周六",
    parks: [
      {
        campId: 26,
        sites: [
          { site: "2、24、51号", hookup: "全接驳", fee: 56 },
          { site: "Left Beach 106号", hookup: "无接驳", fee: 43 },
        ],
      },
      { campId: 27, sites: [{ site: "39–41号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Loop 2 河边区·接驳须逐号核对" }] },
      {
        campId: 1,
        sites: [
          { site: "Quarry Pond 306、308–310、312、315、320、323、328、329、334、337、340、342、347、359号", hookup: "水电", fee: 46 },
          { site: "Quarry Pond 343号", hookup: "无接驳", fee: 37 },
        ],
      },
      {
        campId: 5,
        sites: [
          { site: "130号", hookup: "水电", pad: "54×14英尺 pull-through", fee: 51, quality: "star", qualityNote: "北营地水电位·部分接驳无排污", status: "booked", confirmation: "IWWA27-3600548B1" },
          { site: "138、150、175、188、197号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "南北营地均为4–5分推荐区" },
          { site: "139号", hookup: "水电", fee: 46, qualityNote: "北营地水电位·部分接驳无排污" },
          { site: "173号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "北营地五星区·经济型" },
          { site: "南营地 2–7、24、49–51、58、59、61、62、66、69–72、81、85、88、89、91、93、97、98、100号", hookup: "无接驳", fee: 37, qualityNote: "南营地·无接驳标准位" },
        ],
      },
      {
        campId: 28,
        sites: [
          { site: "Upper 4、18、20、21、23、26、28、31、39号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "上环·林间无接驳区" },
          { site: "Lower 65号", hookup: "全接驳 pull-through", fee: 56, quality: "good", qualityNote: "下环·全接驳临海区" },
          { site: "Lower 69、94号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "下环·全接驳临海区" },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Northend 81–83、86、90、91、96–98、105、115、116号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Northend·林间私密区" },
          { site: "Midway 31、33、36、43、45、46、61、64、54A号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
          { site: "Midway 51号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
          { site: "Midway 54B号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
        ],
      },
      {
        campId: 9,
        sites: [
          { site: "Loop A 10、11、14–16号", hookup: "水电", pad: "房费以系统实时价为准", fee: 51, quality: "good", qualityNote: "临海水电位" },
          { site: "Loop B 38、42、43、62号", hookup: "水电", pad: "房费以系统实时价为准", fee: 46 },
          { site: "Loop B 44–50号", hookup: "水电", fee: 51 },
          { site: "Loop B 58号", hookup: "无接驳", fee: 37 },
        ],
      },
      {
        campId: 16,
        sites: [
          { site: "Loop B 95号", hookup: "水电", pad: "房费以系统实时价为准", fee: 51, quality: "good", qualityNote: "B区·部分接驳" },
          { site: "Loop C 133、153号", hookup: "无接驳", pad: "房费以系统实时价为准", fee: 43 },
        ],
      },
      {
        campId: 25,
        sites: [
          { site: "Beach Campground 19、34号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "Beach Campground·全接驳多数有海景" },
          { site: "Beach Campground 20、26、36、37、43–46、49号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "Beach Campground·全接驳多数有海景" },
          { site: "Upper Forest 68号", hookup: "水电", fee: 46, qualityNote: "Upper Forest·水电位" },
        ],
      },
      { campId: 42, sites: [{ site: "20、27号", hookup: "无接驳", pad: "房费以系统实时价为准", fee: 37, quality: "good", qualityNote: "主环" }] },
      {
        campId: 43,
        sites: [
          { site: "1–16、18、20–23、25–28、31–34、36、38、39、41、43、44、46–48、51号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "标准位" },
          { site: "49号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "标准位" },
          { site: "53–62号", hookup: "全接驳", fee: 46 },
          { site: "64号", hookup: "全接驳", fee: 51 },
          { site: "68、69号", hookup: "全接驳", fee: 56 },
        ],
      },
      {
        campId: 3,
        sites: [
          { site: "3、8、13、14、15、36、38、40号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "东营地" },
          { site: "19、21、22、24、26号", hookup: "水电", fee: 51, quality: "good", qualityNote: "东营地" },
          { site: "42、43、44、75、78号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "西营地" },
          { site: "45、46、47、49、50、51、70、72号", hookup: "水电", fee: 51, quality: "good", qualityNote: "西营地" },
          { site: "301、302、303、304、311、312、313、314、315、316、317、319、320、322、323、324、325号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Elk Plain" },
          { site: "401、404、408、409、410、411、412、413、417、418、420、421、422、423、424号", hookup: "水电", fee: 51 },
        ],
      },
      {
        campId: 12,
        sites: [
          { site: "Back In 30A（400环）", hookup: "全接驳", fee: 96, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 30A 铺装（100区）", hookup: "全接驳", fee: 100, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A（300区）", hookup: "全接驳", fee: 102, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A 铺装（100区）", hookup: "全接驳", fee: 104, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 50/30A 铺装（100区）", hookup: "全接驳", pad: "仅剩3席", fee: 108, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 50/30A 铺装（100区）", hookup: "全接驳", fee: 111, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 30A 高级（200区）", hookup: "全接驳", pad: "仅剩3席", fee: 124, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Back In 50/30A（400环）", hookup: "全接驳", pad: "仅剩1席", fee: 103, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 50/30A 高级（200区）", hookup: "全接驳", fee: 131, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 30A 豪华庭院", hookup: "全接驳", fee: 150, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 50/30A 豪华庭院", hookup: "全接驳", fee: 157, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Back In 50/30A 豪华庭院", hookup: "全接驳", pad: "仅剩1席", fee: 144, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 30A 狗围栏", hookup: "全接驳", pad: "仅剩1席", fee: 121, quality: "good", qualityNote: "标准全接驳位" },
        ],
      },
    ],
  },
  {
    arrival: "2027-06-26",
    label: "6月26日周六",
    parks: [
      { campId: 26, sites: [{ site: "47号", hookup: "全接驳", fee: 56 }] },
      {
        campId: 1,
        sites: [
          { site: "Quarry Pond 302–306、308–312、314、315、317、319–321、323、325、328、330、336、339、341、342、346、347、349、350、358–360号", hookup: "水电", fee: 46 },
          { site: "Quarry Pond 316号", hookup: "水电", fee: 51 },
          { site: "Quarry Pond 343号", hookup: "无接驳", fee: 37 },
        ],
      },
      { campId: 8, sites: [{ site: "West Loop 77号", hookup: "无接驳", fee: 37 }] },
      {
        campId: 25,
        sites: [
          { site: "Beach Campground 18、19、34、38、39、41号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "Beach Campground·全接驳多数有海景" },
          { site: "Beach Campground 20–22、24–28、30–33、35、40、43、48、49号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "Beach Campground·全接驳多数有海景" },
          { site: "Upper Forest 59号", hookup: "水电", fee: 46, qualityNote: "Upper Forest·水电位" },
        ],
      },
      { campId: 5, sites: [{ site: "108、110、112、114、115、136、138、188号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "北营地五星区" }] },
      {
        campId: 28,
        sites: [
          { site: "Upper 13、16–18、20、21、25、26、28、38、39、41、45、46号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Upper 林间区·无接驳树荫好" },
          { site: "Lower 85号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "下环·全接驳临海区" },
        ],
      },
      { campId: 44, sites: [{ site: "Dune Loop 98号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "Dune环·近游乐场家庭区" }] },
      {
        campId: 30,
        sites: [
          { site: "Northend 83、86、90、92、97号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Northend·林间私密区" },
          { site: "Northend 89号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Northend·林间私密区" },
          { site: "Midway 38、43、44、46、53、55、58–61、65号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
          { site: "Midway 47、54B号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
        ],
      },
      { campId: 2, sites: [{ site: "220、226号", hookup: "水电", fee: 46, quality: "good", qualityNote: "RV环·水电位" }] },
      {
        campId: 9,
        sites: [
          { site: "Loop A 5、14、15号", hookup: "水电", pad: "房费以系统实时价为准", fee: 51, quality: "good", qualityNote: "临海水电位" },
          { site: "Loop B 35、61、62号", hookup: "水电", pad: "房费以系统实时价为准", fee: 46 },
          { site: "Loop B 44–50号", hookup: "水电", fee: 51 },
          { site: "Loop B 58号", hookup: "无接驳", fee: 37 },
        ],
      },
      {
        campId: 16,
        sites: [
          { site: "Loop B 74–76号", hookup: "水电", pad: "房费以系统实时价为准", fee: 51, quality: "good", qualityNote: "B区·部分接驳" },
          { site: "Loop C 142号", hookup: "无接驳", pad: "房费以系统实时价为准", fee: 43 },
        ],
      },
      { campId: 40, sites: [{ site: "Loop C 92号", hookup: "水电", pad: "房费以系统实时价为准", fee: 51, quality: "good", qualityNote: "C环·水电位" }] },
      { campId: 42, sites: [{ site: "5、25、31、32、37、47号", hookup: "无接驳", pad: "房费以系统实时价为准", fee: 37, quality: "good", qualityNote: "主环" }] },
      {
        campId: 43,
        sites: [
          { site: "1–12、14–16、18–28、43、44、46–48、51号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "标准位" },
          { site: "42号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "标准位" },
          { site: "53–62号", hookup: "全接驳", fee: 46 },
          { site: "64号", hookup: "全接驳", fee: 51 },
          { site: "67号", hookup: "全接驳", fee: 56 },
        ],
      },
      {
        campId: 3,
        sites: [
          { site: "5、9、12、36号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "东营地" },
          { site: "19、21、22、23、24、25、26、28、29号", hookup: "水电", fee: 51, quality: "good", qualityNote: "东营地" },
          { site: "42、43、44、78号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "西营地" },
          { site: "45、46、49、50、70、72号", hookup: "水电", fee: 51, quality: "good", qualityNote: "西营地" },
          { site: "301、302、303、304、305、306、307、311、312、313、314、315、316、317、319、320、322、323、324、325号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Elk Plain" },
          { site: "401、404、408、409、410、411、412、413、417、418、420、421、422、423、424、425号", hookup: "水电", fee: 51 },
        ],
      },
      {
        campId: 12,
        sites: [
          { site: "Back In 30A（400环）", hookup: "全接驳", fee: 96, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 30A 铺装（100区）", hookup: "全接驳", pad: "仅剩3席", fee: 100, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A（300区）", hookup: "全接驳", fee: 102, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 50/30A（300区）", hookup: "全接驳", pad: "仅剩1席", fee: 109, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A 铺装（100区）", hookup: "全接驳", fee: 104, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 50/30A 铺装（100区）", hookup: "全接驳", pad: "仅剩1席", fee: 113, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 50/30A 铺装（100区）", hookup: "全接驳", fee: 111, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 30A 高级（200区）", hookup: "全接驳", fee: 124, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Back In 50/30A（400环）", hookup: "全接驳", pad: "仅剩1席", fee: 103, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 50/30A 高级（200区）", hookup: "全接驳", fee: 131, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 30A 豪华庭院", hookup: "全接驳", pad: "仅剩1席", fee: 153, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 50/30A 豪华庭院", hookup: "全接驳", fee: 157, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 30A 豪华庭院狗围栏", hookup: "全接驳", pad: "仅剩1席", fee: 167, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 50/30A 豪华庭院狗围栏", hookup: "全接驳", pad: "仅剩1席", fee: 174, quality: "good", qualityNote: "高级位·带庭院" },
        ],
      },
    ],
  },
  {
    arrival: "2027-07-03",
    label: "7月3日周六",
    parks: [
      { campId: 5, sites: [{ site: "188号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "南北营地均为4–5分推荐区" }] },
      { campId: 28, sites: [{ site: "Upper 1、6、9、13、18、20、21、26、28、41号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "上环·林间无接驳区" }] },
      {
        campId: 30,
        sites: [
          { site: "Northend 87号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Northend·林间私密区" },
          { site: "Northend 90号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Northend·林间私密区" },
        ],
      },
      { campId: 9, sites: [{ site: "Loop B 44–47号", hookup: "水电", fee: 51 }] },
      { campId: 25, sites: [{ site: "Beach Campground 23、26、28、30、33、40、45号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "Beach Campground·全接驳多数有海景" }] },
      { campId: 42, sites: [{ site: "22号", hookup: "无接驳", pad: "房费以系统实时价为准", fee: 37, quality: "good", qualityNote: "主环" }] },
      {
        campId: 43,
        sites: [
          { site: "1–16、18–20、22、24–26、28、31、34–38、40、41、43、44、46–48、51号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "标准位" },
          { site: "42、49号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "标准位" },
          { site: "53–61号", hookup: "全接驳", fee: 46 },
        ],
      },
      {
        campId: 3,
        sites: [
          { site: "301、302、303、304、305、306、307、312、313、314、315、319、320、322、323、324、325号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Elk Plain" },
          { site: "401、404、410、411、412、413、417、418、420、421、422、423、424号", hookup: "水电", fee: 51 },
        ],
      },
      { campId: 23, sites: [{ site: "RV 位 59 个可订", hookup: "无接驳", pad: "电位已满", fee: 40 }], more: "RV 位总数 94，另有帐篷位；6/19–7/1 先到先得" },
      {
        campId: 12,
        sites: [
          { site: "Back In 30A（400环）", hookup: "全接驳", fee: 99, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 50/30A（400环）", hookup: "全接驳", pad: "仅剩1席", fee: 103, quality: "good", qualityNote: "标准全接驳位" },
        ],
      },
    ],
  },
  {
    arrival: "2027-07-10",
    label: "7月10日周六",
    parks: [
      { campId: 26, sites: [{ site: "54号", hookup: "全接驳", fee: 56 }] },
      { campId: 27, sites: [{ site: "2号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "近河边·接驳须逐号核对" }] },
      { campId: 1, sites: [{ site: "Quarry Pond 305、309–312、315、319–321、323、325、329–331、334、335、337、338、342号", hookup: "水电", fee: 46 }] },
      {
        campId: 5,
        sites: [
          { site: "102、105、107、108、110、112、114、115、117、123、125、127、129、132、134、136、140、148、149、151、153、155、159、162–164、166、167、169、175、177–179、181、183、185、186、188、190、191、193、195、197号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "南北营地均为4–5分推荐区" },
          { site: "143、145、147、173号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "北营地五星区·经济型" },
          { site: "南营地 3、5、7、51、52、66、70、89、90、92、97号", hookup: "无接驳", fee: 37, qualityNote: "南营地·无接驳标准位" },
        ],
      },
      { campId: 8, sites: [{ site: "West Loop 77号", hookup: "无接驳", fee: 37 }] },
      {
        campId: 28,
        sites: [
          { site: "Upper 1、6、20、21、23、26、28、31、34、39、41、45号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Upper 林间区·无接驳树荫好" },
          { site: "Upper 42、44号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Upper 林间区·无接驳树荫好" },
          { site: "Lower 81号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "下环·全接驳临海区" },
        ],
      },
      { campId: 44, sites: [{ site: "Dune Loop 110号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "Dune环·近游乐场家庭区" }] },
      {
        campId: 2,
        sites: [
          { site: "220、226、237、248号", hookup: "水电", pad: "房费以系统实时价为准", fee: 46, quality: "good", qualityNote: "RV环·水电位" },
          { site: "223号", hookup: "水电", fee: 41, quality: "good", qualityNote: "RV环·水电位" },
          { site: "231、232号", hookup: "水电", fee: 51, quality: "good", qualityNote: "RV环·水电位" },
          { site: "230号", hookup: "水电", pad: "Pull-thru", fee: 51, quality: "good", qualityNote: "RV环·水电位" },
        ],
      },
      {
        campId: 9,
        sites: [
          { site: "Loop A 10、13–16号", hookup: "水电", pad: "房费以系统实时价为准", fee: 51, quality: "good", qualityNote: "临海水电位" },
          { site: "Loop B 38、39号", hookup: "水电", pad: "房费以系统实时价为准", fee: 46 },
          { site: "Loop B 44–50号", hookup: "水电", fee: 51 },
        ],
      },
      { campId: 16, sites: [{ site: "Loop B 69、93、94号", hookup: "水电", pad: "房费以系统实时价为准", fee: 51, quality: "good", qualityNote: "B区·部分接驳" }] },
      {
        campId: 25,
        sites: [
          { site: "Beach Campground 4、24–26、28、30–32、37、40、43、45、46、48、49号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "Beach Campground·全接驳多数有海景" },
          { site: "Beach Campground 19、34、39号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "Beach Campground·全接驳多数有海景" },
        ],
      },
      {
        campId: 40,
        sites: [
          { site: "Loop A 8、21、25、26号", hookup: "无接驳", pad: "房费以系统实时价为准", fee: 43 },
          { site: "Loop B 42号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "B环·全接驳" },
          { site: "Loop C 70、79–81、86号", hookup: "水电", pad: "房费以系统实时价为准", fee: 51, quality: "good", qualityNote: "C环·水电位" },
        ],
      },
      { campId: 42, sites: [{ site: "5、47号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "主环" }] },
      { campId: 43, sites: [{ site: "1–6、8、10–12、29、44、46–48号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "标准位" }] },
      {
        campId: 3,
        sites: [
          { site: "5、6、7、12、33、35、36、37号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "东营地" },
          { site: "21、22、23、24、25、27号", hookup: "水电", fee: 51, quality: "good", qualityNote: "东营地" },
          { site: "42、43、44、69、74、78号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "西营地" },
          { site: "45、46、51、70、72号", hookup: "水电", fee: 51, quality: "good", qualityNote: "西营地" },
          { site: "303、304、306、316、322、323、324号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Elk Plain" },
          { site: "401、404、408、410、411、412、413、417、418、420、421、422、423、424、425号", hookup: "水电", fee: 51 },
        ],
      },
      { campId: 23, sites: [{ site: "RV 位 83 个可订", hookup: "无接驳", pad: "电位可订：B10、C27、F18、F20、F21、F24、F25、F26、F27", fee: 40 }], more: "RV 位总数 94，另有帐篷位；6/19–7/1 先到先得" },
      {
        campId: 12,
        sites: [
          { site: "Back In 30A（400环）", hookup: "全接驳", fee: 96, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 30A 铺装（100区）", hookup: "全接驳", fee: 100, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A（300区）", hookup: "全接驳", fee: 102, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A 铺装（100区）", hookup: "全接驳", fee: 104, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 50/30A 铺装（100区）", hookup: "全接驳", fee: 108, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 50/30A 铺装（100区）", hookup: "全接驳", fee: 111, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 30A 高级（200区）", hookup: "全接驳", pad: "仅剩2席", fee: 124, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Back In 50/30A（400环）", hookup: "全接驳", pad: "仅剩1席", fee: 103, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A 豪华庭院", hookup: "全接驳", fee: 150, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 50/30A 豪华庭院", hookup: "全接驳", fee: 157, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Back In 50/30A 豪华庭院", hookup: "全接驳", pad: "仅剩1席", fee: 144, quality: "good", qualityNote: "高级位·带庭院" },
        ],
      },
    ],
  },
  {
    arrival: "2027-07-17",
    label: "7月17日周六",
    parks: [
      { campId: 26, sites: [{ site: "50号", hookup: "全接驳", fee: 56 }] },
      { campId: 27, sites: [{ site: "39、45号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Loop 2 河边区·接驳须逐号核对" }] },
      { campId: 1, sites: [{ site: "Quarry Pond 302–304、306、307、309–312、315、320、321、323、329、330、337号", hookup: "水电", fee: 46 }] },
      {
        campId: 5,
        sites: [
          { site: "106号", hookup: "水电 pull-through", fee: 46, quality: "star", qualityNote: "北营地水电位·部分接驳无排污", status: "booked", confirmation: "IWWA27-3600662B1" },
          { site: "109、139、184号", hookup: "水电", fee: 46, quality: "star", qualityNote: "北营地水电位·部分接驳无排污" },
          { site: "115、117、119、121、127、134、136、138、140、151、169、175、181号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "南北营地均为4–5分推荐区" },
          { site: "171、173号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "南北营地均为4–5分推荐区" },
          { site: "196号", hookup: "水电", fee: 51, quality: "star", qualityNote: "北营地水电位·部分接驳无排污" },
          { site: "南营地 36、56、63、66、68、75、76、86、87号", hookup: "无接驳", fee: 37, qualityNote: "南营地·无接驳标准位" },
        ],
      },
      {
        campId: 28,
        sites: [
          { site: "Upper 31、39号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "上环·林间无接驳区" },
          { site: "Upper 43号", hookup: "无接驳 pull-through", fee: 43, quality: "good", qualityNote: "上环·林间无接驳区" },
          { site: "Lower 87号", hookup: "全接驳 pull-through", fee: 56, quality: "good", qualityNote: "下环·全接驳临海区" },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Northend 106、107号", hookup: "无接驳", pad: "双营位，需同订（106号$43、107号$37）", fee: 43, quality: "good", qualityNote: "Northend·林间私密区" },
          { site: "Mountain Lake 127、136号", hookup: "无接驳", fee: 43 },
        ],
      },
      {
        campId: 44,
        sites: [
          { site: "Sage Loop 3、6、304号", hookup: "无接驳", fee: 43 },
          { site: "Bay Loop 143号", hookup: "全接驳", fee: 56 },
        ],
      },
      { campId: 29, sites: [{ site: "团体营位 2/3号（16人/8帐）", hookup: "无接驳", pad: "平行入位·限20英尺", fee: 48 }] },
      { campId: 2, sites: [{ site: "232号", hookup: "水电", fee: 51, quality: "good", qualityNote: "RV环·水电位" }] },
      {
        campId: 9,
        sites: [
          { site: "Loop A 15号", hookup: "水电", fee: 51, quality: "good", qualityNote: "临海水电位" },
          { site: "Loop B 46–48号", hookup: "水电", fee: 51 },
        ],
      },
      { campId: 16, sites: [{ site: "Loop C 161号", hookup: "无接驳", pad: "房费以系统实时价为准", fee: 43 }] },
      {
        campId: 25,
        sites: [
          { site: "Beach Campground 19、34号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "Beach Campground·全接驳多数有海景" },
          { site: "Beach Campground 20–30、32、35、37、40、42–46、49号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "Beach Campground·全接驳多数有海景" },
        ],
      },
      {
        campId: 40,
        sites: [
          { site: "Loop A 8、10、21号", hookup: "无接驳", pad: "房费以系统实时价为准", fee: 43 },
          { site: "Loop C 70、71、73号", hookup: "水电", pad: "房费以系统实时价为准", fee: 51, quality: "good", qualityNote: "C环·水电位" },
        ],
      },
      { campId: 42, sites: [{ site: "5、20、21、23、31、50号", hookup: "无接驳", pad: "房费以系统实时价为准", fee: 37, quality: "good", qualityNote: "主环" }] },
      {
        campId: 43,
        sites: [
          { site: "1–16、18、20–27、30–33、36–38、40、41、43、44、46–48、51号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "标准位" },
          { site: "42号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "标准位" },
          { site: "54、56–59号", hookup: "全接驳", fee: 46 },
          { site: "68、72、73号", hookup: "全接驳", fee: 56 },
          { site: "76号", hookup: "全接驳", fee: 51 },
        ],
      },
      {
        campId: 3,
        sites: [
          { site: "7、40号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "东营地" },
          { site: "21、22、24、28号", hookup: "水电", fee: 51, quality: "good", qualityNote: "东营地" },
          { site: "42、44号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "西营地" },
          { site: "46、50号", hookup: "水电", fee: 51, quality: "good", qualityNote: "西营地" },
          { site: "317号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Elk Plain" },
          { site: "401、404、408、409、410、411、412、413、417、418、420、421、422、423、424号", hookup: "水电", fee: 51 },
        ],
      },
      { campId: 23, sites: [{ site: "RV 位 88 个可订", hookup: "无接驳", pad: "电位可订：C27、C28、F15、F16、F17、F18、F20、F21、F24、F25、F26、F27、F29", fee: 40 }], more: "RV 位总数 94，另有帐篷位；6/19–7/1 先到先得" },
      {
        campId: 12,
        sites: [
          { site: "Back In 30A（400环）", hookup: "全接驳", fee: 96, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 30A 铺装（100区）", hookup: "全接驳", pad: "仅剩3席", fee: 100, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A（300区）", hookup: "全接驳", fee: 102, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A 铺装（100区）", hookup: "全接驳", fee: 104, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 50/30A 铺装（100区）", hookup: "全接驳", fee: 108, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 50/30A 铺装（100区）", hookup: "全接驳", fee: 111, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 30A 高级（200区）", hookup: "全接驳", fee: 124, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Back In 50/30A（400环）", hookup: "全接驳", pad: "仅剩1席", fee: 103, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 50/30A 高级（200区）", hookup: "全接驳", fee: 131, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 30A 豪华庭院", hookup: "全接驳", fee: 150, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 50/30A 豪华庭院", hookup: "全接驳", fee: 157, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Back In 50/30A 豪华庭院", hookup: "全接驳", pad: "仅剩1席", fee: 144, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 30A 狗围栏", hookup: "全接驳", pad: "仅剩1席", fee: 121, quality: "good", qualityNote: "标准全接驳位" },
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
          { site: "6、33、49号", hookup: "全接驳", fee: 56 },
          { site: "Left Beach 106号", hookup: "无接驳", fee: 43 },
        ],
      },
      { campId: 27, sites: [{ site: "39–46号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Loop 2 河边区·接驳须逐号核对" }] },
      {
        campId: 1,
        sites: [
          { site: "Forest Loop 58号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Forest Loop·5分环（水电部分接驳）" },
          { site: "Quarry Pond 308–311、315、320、329、330、332、338、340、342、345、354、357、361号", hookup: "水电", fee: 46 },
          { site: "Quarry Pond 343号", hookup: "无接驳", fee: 37 },
        ],
      },
      {
        campId: 5,
        sites: [
          { site: "102、105、107、108、114、115、119、121、122、131、132、136、138、142、148、149、153、155、157、159、162–164、166、167、175、177、179、183、185、186、190、191、193、195号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "南北营地均为4–5分推荐区" },
          { site: "143、145、147、171、173号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "南北营地均为4–5分推荐区" },
          { site: "南营地 2、4–7、35、45号", hookup: "无接驳", fee: 37, qualityNote: "南营地·无接驳标准位" },
        ],
      },
      { campId: 28, sites: [{ site: "Upper 1、13、15–18、23、25–28、39、46号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "上环·林间无接驳区" }] },
      {
        campId: 30,
        sites: [
          { site: "Northend 83号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Northend·林间私密区" },
          { site: "Midway 25、33、64号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
        ],
      },
      { campId: 29, sites: [{ site: "团体营位 2/3号（16人/8帐）", hookup: "无接驳", pad: "平行入位·限20英尺", fee: 48 }] },
      {
        campId: 2,
        sites: [
          { site: "216、221号", hookup: "水电", fee: 46, quality: "good", qualityNote: "RV环·水电位" },
          { site: "223号", hookup: "水电", fee: 41, quality: "good", qualityNote: "RV环·水电位" },
          { site: "224号", hookup: "水电", fee: 51, quality: "good", qualityNote: "RV环·水电位" },
        ],
      },
      {
        campId: 9,
        sites: [
          { site: "Loop A 14、15号", hookup: "水电", pad: "房费以系统实时价为准", fee: 51, quality: "good", qualityNote: "临海水电位" },
          { site: "Loop B 38、43号", hookup: "水电", pad: "房费以系统实时价为准", fee: 46 },
          { site: "Loop B 44–50、59、60号", hookup: "水电", fee: 51 },
          { site: "Loop B 58号", hookup: "无接驳", fee: 37 },
        ],
      },
      { campId: 16, sites: [{ site: "Loop C 124、126、127、159、161、177、179、180号", hookup: "无接驳", pad: "房费以系统实时价为准", fee: 43 }] },
      {
        campId: 25,
        sites: [
          { site: "Beach Campground 19、34号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "Beach Campground·全接驳多数有海景" },
          { site: "Beach Campground 27、31、33、37、45、49号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "Beach Campground·全接驳多数有海景" },
        ],
      },
      { campId: 40, sites: [{ site: "Loop A 18号", hookup: "无接驳", pad: "房费以系统实时价为准", fee: 43 }] },
      { campId: 42, sites: [{ site: "5、21、22号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "主环" }] },
      {
        campId: 43,
        sites: [
          { site: "1–16、18、21、22、25–28、34–36、39、43、44、46–48、51号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "标准位" },
          { site: "42、49号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "标准位" },
          { site: "53–60、62号", hookup: "全接驳", fee: 46 },
          { site: "67、69号", hookup: "全接驳", fee: 56 },
          { site: "74、76、77号", hookup: "全接驳", pad: "房费以系统实时价为准", fee: 51 },
        ],
      },
      {
        campId: 3,
        sites: [
          { site: "10、13、14、36、38、39、40号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "东营地" },
          { site: "24、26号", hookup: "水电", fee: 51, quality: "good", qualityNote: "东营地" },
          { site: "71、75号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "西营地" },
          { site: "301、302、303、304、305、306、307、312、313、314、315、316、317、319、320、322、323、324、325号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Elk Plain" },
          { site: "401、404、408、409、410、411、412、413、417、418、420、421、422、423号", hookup: "水电", fee: 51 },
        ],
      },
      { campId: 23, sites: [{ site: "RV 位 77 个可订", hookup: "无接驳", pad: "电位可订：F16、F17、F18、F20、F21、F24、F26、F27、F29", fee: 40 }], more: "RV 位总数 94，另有帐篷位；6/19–7/1 先到先得" },
      {
        campId: 12,
        sites: [
          { site: "Back In 30A（400环）", hookup: "全接驳", fee: 96, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 30A 铺装（100区）", hookup: "全接驳", fee: 100, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A（300区）", hookup: "全接驳", fee: 102, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A 铺装（100区）", hookup: "全接驳", fee: 104, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 50/30A 铺装（100区）", hookup: "全接驳", fee: 108, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 50/30A 铺装（100区）", hookup: "全接驳", fee: 111, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 30A 高级（200区）", hookup: "全接驳", fee: 124, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Back In 50/30A（400环）", hookup: "全接驳", pad: "仅剩1席", fee: 103, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 50/30A 高级（200区）", hookup: "全接驳", fee: 131, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 30A 豪华庭院", hookup: "全接驳", fee: 150, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 50/30A 豪华庭院", hookup: "全接驳", fee: 157, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Back In 50/30A 豪华庭院", hookup: "全接驳", pad: "仅剩1席", fee: 144, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 30A 豪华庭院狗围栏", hookup: "全接驳", pad: "仅剩1席", fee: 167, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 50/30A 豪华庭院狗围栏", hookup: "全接驳", pad: "仅剩1席", fee: 174, quality: "good", qualityNote: "高级位·带庭院" },
        ],
      },
    ],
  },
  {
    arrival: "2027-08-07",
    label: "8月7日周六",
    parks: [
      {
        campId: 26,
        sites: [
          { site: "24号", hookup: "全接驳", fee: 56 },
          { site: "Left Beach 88号", hookup: "水电", fee: 51 },
        ],
      },
      {
        campId: 27,
        sites: [
          { site: "2、11号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "近河边·接驳须逐号核对" },
          { site: "4、10、12、14、27、29号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "近河边·接驳须逐号核对" },
          { site: "33、50、53、57、59号", hookup: "全接驳", fee: 51 },
          { site: "39–44号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Loop 2 河边区·接驳须逐号核对" },
        ],
      },
      {
        campId: 1,
        sites: [
          { site: "Forest Loop 41号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Forest Loop·5分环（水电部分接驳）" },
          { site: "Quarry Pond 302–312、314、315、317–325、328–334、336–339、345–347、349、350、353、354、357、359号", hookup: "水电", fee: 46 },
          { site: "Quarry Pond 316号", hookup: "水电", fee: 51 },
        ],
      },
      {
        campId: 5,
        sites: [
          { site: "102、108、112、114、115、117、119、121–123、125、127、132、134、136、138、140、142、148、149、175、179、181、183、185、186、188、190、191、193、195、197号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "北营地五星区（含181号）" },
          { site: "116、189号", hookup: "水电", fee: 51, quality: "star", qualityNote: "北营地水电位·部分接驳无排污" },
          { site: "143、145、147、173号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "北营地五星区·经济型" },
          { site: "南营地 1–5、7–11、15、16、18、30、32、38、42、47、48、51、52、60、61、63、78、81–85、87、89、90、92、95、98、99号", hookup: "无接驳", fee: 37, qualityNote: "南营地·无接驳标准位" },
        ],
      },
      {
        campId: 28,
        sites: [
          { site: "Upper 6、11–13、15–18、20、21、23、26–28、39、41、46号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "上环·林间无接驳区" },
          { site: "Upper 34号", hookup: "无接驳", pad: "场地 42×33英尺；仅列帐篷/Van-Camper，订前请与公园确认", fee: 37, quality: "good", qualityNote: "上环·林间无接驳区" },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Northend 83、86、90号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Northend·林间私密区" },
          { site: "Midway 45、46、55、61号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
          { site: "Midway 47号", hookup: "无接驳", pad: "45×10英尺；仅列帐篷/Van-Camper，订前请与公园确认", fee: 31 },
        ],
      },
      { campId: 44, sites: [{ site: "Sage Loop 312号", hookup: "无接驳", pad: "30×20英尺", fee: 43 }] },
      {
        campId: 2,
        sites: [
          { site: "220、225、241、242号", hookup: "水电", pad: "房费以系统实时价为准", fee: 46, quality: "good", qualityNote: "RV环·水电位" },
          { site: "222号", hookup: "水电", fee: 41, quality: "good", qualityNote: "RV环·水电位" },
          { site: "230、231、233号", hookup: "水电", fee: 51, quality: "good", qualityNote: "RV环·水电位" },
        ],
      },
      { campId: 9, sites: [{ site: "Loop A 14号", hookup: "水电", pad: "房费以系统实时价为准", fee: 51, quality: "good", qualityNote: "临海水电位" }] },
      {
        campId: 40,
        sites: [
          { site: "Loop A 1、7号", hookup: "无接驳", fee: 37 },
          { site: "Loop A 14、26号", hookup: "无接驳", pad: "房费以系统实时价为准", fee: 43 },
          { site: "Loop B 37、46号", hookup: "全接驳", pad: "房费以系统实时价为准", fee: 56, quality: "good", qualityNote: "B环·全接驳" },
          { site: "Loop B 42号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "B环·全接驳" },
          { site: "Loop C 75号", hookup: "水电", pad: "房费以系统实时价为准", fee: 51, quality: "good", qualityNote: "C环·水电位" },
        ],
      },
      { campId: 41, sites: [{ site: "6、30号", hookup: "水电", pad: "房费以系统实时价为准", fee: 46, quality: "good", qualityNote: "主营地" }] },
      {
        campId: 42,
        sites: [
          { site: "5、19、20、23、25、27、31、32、35、37、41、50号", hookup: "无接驳", pad: "房费以系统实时价为准", fee: 37, quality: "good", qualityNote: "主环" },
          { site: "8号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "主环" },
        ],
      },
      {
        campId: 43,
        sites: [
          { site: "1–16、18、19、22–28、31–33、35–41、43、44、46–48、51号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "标准位" },
          { site: "42、49号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "标准位" },
          { site: "52–61号", hookup: "全接驳", fee: 46 },
          { site: "64、66、71、76、77号", hookup: "全接驳", pad: "房费以系统实时价为准", fee: 51 },
          { site: "72号", hookup: "全接驳", fee: 56 },
        ],
      },
      {
        campId: 3,
        sites: [
          { site: "1、35号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "东营地" },
          { site: "21、22号", hookup: "水电", fee: 51, quality: "good", qualityNote: "东营地" },
          { site: "74号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "西营地" },
          { site: "70号", hookup: "水电", fee: 51, quality: "good", qualityNote: "西营地" },
          { site: "301、302、303、304、305、306、307、311、312、313、314、315、316、317、319、320、322、323、324、325号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Elk Plain" },
          { site: "401、404、408、409、410、411、412、413、417、418、420、421、422、423、424、425号", hookup: "水电", fee: 51 },
        ],
      },
      { campId: 23, sites: [{ site: "RV 位 85 个可订", hookup: "无接驳", pad: "电位可订：C5、F15、F16、F17、F18、F20、F21、F26、F27、F29", fee: 40 }], more: "RV 位总数 94，另有帐篷位；6/19–7/1 先到先得" },
      {
        campId: 12,
        sites: [
          { site: "Back In 30A（400环）", hookup: "全接驳", fee: 96, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 30A 铺装（100区）", hookup: "全接驳", pad: "仅剩2席", fee: 103, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A（300区）", hookup: "全接驳", fee: 102, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A 铺装（100区）", hookup: "全接驳", fee: 104, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 50/30A 铺装（100区）", hookup: "全接驳", pad: "仅剩3席", fee: 108, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 50/30A 铺装（100区）", hookup: "全接驳", fee: 111, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 50/30A（400环）", hookup: "全接驳", pad: "仅剩1席", fee: 103, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 50/30A 高级（200区）", hookup: "全接驳", pad: "仅剩2席", fee: 131, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 30A 豪华庭院", hookup: "全接驳", fee: 150, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 50/30A 豪华庭院", hookup: "全接驳", fee: 157, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 50/30A 狗围栏", hookup: "全接驳", pad: "仅剩1席", fee: 128, quality: "good", qualityNote: "标准全接驳位" },
        ],
      },
    ],
  },
  {
    arrival: "2027-08-14",
    label: "8月14日周六",
    parks: [
      { campId: 26, sites: [{ site: "12–15号", hookup: "全接驳", fee: 56 }] },
      {
        campId: 27,
        sites: [
          { site: "2号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "近河边·接驳须逐号核对" },
          { site: "4、10、12号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "近河边·接驳须逐号核对" },
          { site: "5、8、33号", hookup: "全接驳", fee: 56 },
          { site: "6、9、16、21、57、59号", hookup: "全接驳", fee: 51 },
          { site: "39–46号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Loop 2 河边区·接驳须逐号核对" },
        ],
      },
      {
        campId: 1,
        sites: [
          { site: "Forest Loop 1、21号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Forest Loop·5分环（水电部分接驳）" },
          { site: "Quarry Pond 303–306、309–315、317–333、336–339、341、354、358、359号", hookup: "水电", pad: "326、327号双营位，需同订", fee: 46 },
          { site: "Quarry Pond 316号", hookup: "水电", fee: 51 },
        ],
      },
      {
        campId: 5,
        sites: [
          { site: "101、141、184、187号", hookup: "水电", fee: 46, quality: "star", qualityNote: "北营地水电位·部分接驳无排污" },
          { site: "102、105、107、108、110、112、114、115、117、119、121–123、125、127、129、131、132、134、136、138、140、142、148、149、151、153、155、157、159、160、162–164、166、167、169、175、179、181、185、186、188、190、193、195、197号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "北营地五星区（含181号）" },
          { site: "104、130、154、182、192号", hookup: "水电", fee: 51, quality: "star", qualityNote: "北营地水电位·部分接驳无排污" },
          { site: "143、145、147、171、173号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "北营地五星区·经济型" },
          { site: "南营地 1–3、36、45、47、49–52、58、59、65、66、68、73–79、81–84、86–92、94–99号", hookup: "无接驳", fee: 37, qualityNote: "南营地·无接驳标准位" },
        ],
      },
      { campId: 8, sites: [{ site: "West Loop 72–75、77、108–110号", hookup: "无接驳", fee: 37 }] },
      {
        campId: 28,
        sites: [
          { site: "Upper 1、13、16–28、30、31、33–35、38、39、41号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "上环·林间无接驳区" },
          { site: "Upper 29、40、42、44号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "上环·林间无接驳区" },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Midway 43号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
          { site: "Midway 54B号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
        ],
      },
      {
        campId: 44,
        sites: [
          { site: "Dune Loop 322号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Dune环·近游乐场家庭区" },
          { site: "Sage Loop 304–307号", hookup: "无接驳", fee: 43 },
        ],
      },
      {
        campId: 9,
        sites: [
          { site: "Loop A 4、6、9、10、13、15号", hookup: "水电", pad: "房费以系统实时价为准", fee: 51, quality: "good", qualityNote: "临海水电位" },
          { site: "Loop B 44–50号", hookup: "水电", fee: 51 },
        ],
      },
      {
        campId: 40,
        sites: [
          { site: "Loop A 20、21、24号", hookup: "无接驳", pad: "房费以系统实时价为准", fee: 43 },
          { site: "Loop B 29、30号", hookup: "全接驳", pad: "房费以系统实时价为准", fee: 56, quality: "good", qualityNote: "B环·全接驳" },
          { site: "Loop C 61、62、64、67、68、70、72、74、77、80、82–86、92–94号", hookup: "水电", pad: "房费以系统实时价为准", fee: 51, quality: "good", qualityNote: "C环·水电位" },
        ],
      },
      { campId: 41, sites: [{ site: "2号", hookup: "水电", pad: "房费以系统实时价为准", fee: 46, quality: "good", qualityNote: "主营地" }] },
      {
        campId: 42,
        sites: [
          { site: "5、19、20、23、35、37、47、48、50号", hookup: "无接驳", pad: "房费以系统实时价为准", fee: 37, quality: "good", qualityNote: "主环" },
          { site: "8、15、17号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "主环" },
        ],
      },
      {
        campId: 43,
        sites: [
          { site: "1–16、18–28、30、31、34–41、43、44、46–48、51号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "标准位" },
          { site: "42、49号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "标准位" },
          { site: "52–62号", hookup: "全接驳", fee: 46 },
          { site: "64、76、77号", hookup: "全接驳", pad: "房费以系统实时价为准", fee: 51 },
        ],
      },
      {
        campId: 3,
        sites: [
          { site: "301、302、303、304、305、306、307、311、312、313、314、315、316、317、319、320、324、325号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Elk Plain" },
          { site: "401、404、408、409、410、411、412、413、417、418、420、421、422、423、424、425号", hookup: "水电", fee: 51 },
        ],
      },
      { campId: 23, sites: [{ site: "RV 位 66 个可订", hookup: "无接驳", pad: "电位可订：C5、F15、F16、F17、F18、F20、F21、F24、F25、F27", fee: 40 }], more: "RV 位总数 94，另有帐篷位；6/19–7/1 先到先得" },
      {
        campId: 12,
        sites: [
          { site: "Back In 30A（400环）", hookup: "全接驳", fee: 96, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 30A 铺装（100区）", hookup: "全接驳", pad: "仅剩3席", fee: 100, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A 铺装（100区）", hookup: "全接驳", fee: 104, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 50/30A 铺装（100区）", hookup: "全接驳", pad: "仅剩1席", fee: 113, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 50/30A 铺装（100区）", hookup: "全接驳", fee: 111, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 30A 高级（200区）", hookup: "全接驳", fee: 124, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Back In 50/30A（400环）", hookup: "全接驳", pad: "仅剩1席", fee: 103, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 50/30A 高级（200区）", hookup: "全接驳", pad: "仅剩1席", fee: 136, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 30A 豪华庭院", hookup: "全接驳", fee: 150, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 50/30A 豪华庭院", hookup: "全接驳", fee: 157, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 30A 狗围栏", hookup: "全接驳", pad: "仅剩1席", fee: 121, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A 豪华庭院狗围栏", hookup: "全接驳", pad: "仅剩1席", fee: 167, quality: "good", qualityNote: "高级位·带庭院" },
        ],
      },
    ],
  },
  {
    arrival: "2027-08-21",
    label: "8月21日周六",
    parks: [
      {
        campId: 26,
        sites: [
          { site: "1、2、6、29、39、41、45、47号", hookup: "全接驳", fee: 56 },
          { site: "Left Beach 102号", hookup: "水电", fee: 51 },
          { site: "Left Beach 106号", hookup: "无接驳", fee: 43 },
        ],
      },
      {
        campId: 27,
        sites: [
          { site: "2、3、23、25、33、35、37、51、52、58号", hookup: "全接驳", fee: 56 },
          { site: "4、6、9、10、18、21、22、24、27、29、36、38、50、53、57、59号", hookup: "全接驳", fee: 51 },
          { site: "39–46号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Loop 2 河边区·接驳须逐号核对" },
        ],
      },
      {
        campId: 1,
        sites: [
          { site: "Forest Loop 24、71号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Forest Loop·5分环（水电部分接驳）" },
          { site: "Forest Loop 35、36号", hookup: "水电", pad: "双营位，需同订", fee: 51, quality: "good", qualityNote: "Forest Loop·5分环（水电部分接驳）" },
          { site: "Lower Loop B 221号", hookup: "无接驳", fee: 37 },
          { site: "Quarry Pond 302–315、317–332、334、336–338、340–342、345–347、354、358、359号", hookup: "水电", pad: "305号 pull-through；326、327号双营位，需同订", fee: 46 },
          { site: "Quarry Pond 316号", hookup: "水电", fee: 51 },
          { site: "Quarry Pond 343号", hookup: "无接驳", fee: 37 },
        ],
      },
      {
        campId: 5,
        sites: [
          { site: "101、106、109、113、139、141、144、194号", hookup: "水电", fee: 46, quality: "star", qualityNote: "北营地水电位·部分接驳无排污" },
          { site: "102、105、107、108、110、112、114、115、117、119、121–123、125、127、129、131、132、134、136、138、140、142、148、149、151、153、155、157、159、160、162–164、166、167、169、175、177、179、181、188、190、191、193、195、197号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "北营地五星区（含181号）" },
          { site: "111、120、189、192、196号", hookup: "水电", fee: 51, quality: "star", qualityNote: "北营地水电位·部分接驳无排污" },
          { site: "143、145、147、171、173号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "北营地五星区·经济型" },
          { site: "南营地 1–12、15、16、19、21、25–27、29–42、44、45、47–50、53–79、81–97、100号", hookup: "无接驳", fee: 37, qualityNote: "南营地·无接驳标准位" },
        ],
      },
      {
        campId: 8,
        sites: [
          { site: "Trailer Loop 33号", hookup: "水电", fee: 51 },
          { site: "West Loop 77、86、102、132号", hookup: "无接驳", fee: 37 },
        ],
      },
      {
        campId: 28,
        sites: [
          { site: "Upper 1、6、9、13、15–21、23、26、28、31、34、35、38、39、41、45–47号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "上环·林间无接驳区" },
          { site: "Upper 29、42–44号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "上环·林间无接驳区" },
          { site: "Lower 74号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "下环·临海区" },
        ],
      },
      {
        campId: 30,
        sites: [
          { site: "Northend 86、97、105、108、112–116号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Northend·林间私密区" },
          { site: "Northend 94号", hookup: "无接驳", pad: "仅列帐篷/Van-Camper，订前请与公园确认", fee: 43, quality: "good", qualityNote: "Northend·林间私密区" },
          { site: "Northend 118号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Northend·林间私密区" },
          { site: "Midway 39、44、48、55、62、64、49A号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
          { site: "Midway 36号", hookup: "无接驳", pad: "仅列帐篷/Van-Camper，订前请与公园确认", fee: 37, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
          { site: "Midway 54B号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "Midway·近 Cascade Lake 游泳区" },
        ],
      },
      {
        campId: 44,
        sites: [
          { site: "Dune Loop 318、319、326号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "Dune环·近游乐场家庭区" },
          { site: "Sage Loop 305–310号", hookup: "无接驳", fee: 43 },
        ],
      },
      {
        campId: 2,
        sites: [
          { site: "207、213、214、216、218、220、221、225–227号", hookup: "水电", fee: 46, quality: "good", qualityNote: "RV环·水电位" },
          { site: "212、222、223号", hookup: "水电", fee: 41, quality: "good", qualityNote: "RV环·水电位" },
          { site: "224、231–234、245号", hookup: "水电", fee: 51, quality: "good", qualityNote: "RV环·水电位" },
        ],
      },
      {
        campId: 9,
        sites: [
          { site: "Loop A 15、16号", hookup: "水电", fee: 51, quality: "good", qualityNote: "临海水电位" },
          { site: "Loop B 28、44–50、59、60、63号", hookup: "水电", fee: 51 },
          { site: "Loop B 35、36、40–43、62号", hookup: "水电", fee: 46 },
          { site: "Loop B 58号", hookup: "无接驳", fee: 37 },
        ],
      },
      { campId: 16, sites: [{ site: "Loop C 154号", hookup: "无接驳", fee: 43 }] },
      {
        campId: 40,
        sites: [
          { site: "Loop A 1、7号", hookup: "无接驳", fee: 37 },
          { site: "Loop A 6、9–11、13、16号", hookup: "无接驳", fee: 43 },
          { site: "Loop B 34、42号", hookup: "全接驳", fee: 51, quality: "good", qualityNote: "B环·全接驳" },
          { site: "Loop B 41、43、47、49号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "B环·全接驳" },
          { site: "Loop C 88、90号", hookup: "水电", fee: 51, quality: "good", qualityNote: "C环·水电位" },
        ],
      },
      {
        campId: 42,
        sites: [
          { site: "5、19、20、32、34、35、37、41、47、48号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "主环" },
          { site: "6、8、15–17、33、36、38–40、43号", hookup: "无接驳", fee: 43, quality: "good", qualityNote: "主环" },
        ],
      },
      {
        campId: 43,
        sites: [
          { site: "1–16、18–27、35–39、41、43、44、46–48、51号", hookup: "无接驳", fee: 37, quality: "good", qualityNote: "标准位" },
          { site: "42、49号", hookup: "无接驳", fee: 31, quality: "good", qualityNote: "标准位" },
          { site: "52–60号", hookup: "全接驳", fee: 46 },
          { site: "64、66、70、74、76号", hookup: "全接驳", fee: 51 },
          { site: "67–69、72、73号", hookup: "全接驳", fee: 56 },
        ],
      },
      {
        campId: 3,
        sites: [
          { site: "5、6、7、8、9、10、11、12、13、15号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "东营地" },
          { site: "21、22号", hookup: "水电", fee: 51, quality: "good", qualityNote: "东营地" },
          { site: "43、44、71、73、74、75、77、78号", hookup: "全接驳", fee: 56, quality: "good", qualityNote: "西营地" },
          { site: "46、47、49、50、52、70、72号", hookup: "水电", fee: 51, quality: "good", qualityNote: "西营地" },
          { site: "301、302、303、304、305、306、307、311、312、313、314、315、316、317、319、320、322、323、324、325号", hookup: "水电", fee: 51, quality: "good", qualityNote: "Elk Plain" },
          { site: "401、404、408、409、410、411、412、413、417、418、420、421、422、423、424、425号", hookup: "水电", fee: 51 },
        ],
      },
      { campId: 23, sites: [{ site: "RV 位 90 个可订", hookup: "无接驳", pad: "电位可订：C5、C28、F15、F16、F17、F18、F20、F21、F23、F24、F25、F26、F27、F29", fee: 40 }], more: "RV 位总数 94，另有帐篷位；6/19–7/1 先到先得" },
      {
        campId: 12,
        sites: [
          { site: "Back In 30A（400环）", hookup: "全接驳", fee: 96, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A（300区）", hookup: "全接驳", pad: "仅剩2席", fee: 105, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 30A 铺装（100区）", hookup: "全接驳", fee: 104, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Pull Thru 50/30A 铺装（100区）", hookup: "全接驳", fee: 111, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 30A 高级（200区）", hookup: "全接驳", pad: "仅剩2席", fee: 124, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Back In 50/30A（400环）", hookup: "全接驳", pad: "仅剩1席", fee: 103, quality: "good", qualityNote: "标准全接驳位" },
          { site: "Back In 50/30A 高级（200区）", hookup: "全接驳", pad: "仅剩3席", fee: 131, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 30A 豪华庭院", hookup: "全接驳", pad: "仅剩2席", fee: 153, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Pull Thru 50/30A 豪华庭院", hookup: "全接驳", fee: 157, quality: "good", qualityNote: "高级位·带庭院" },
          { site: "Back In 50/30A 豪华庭院", hookup: "全接驳", pad: "仅剩1席", fee: 144, quality: "good", qualityNote: "高级位·带庭院" },
        ],
      },
    ],
  },
];

/** 华盛顿州立公园八九月周末：9 个月窗口还没开，标开放日，到日子现查 */
export type UpcomingWeekend = {
  /** 入住日，周六，YYYY-MM-DD */
  arrival: string;
  label: string;
  /** 放号窗口开放日 YYYY-MM-DD */
  opensOn: string;
  opensLabel: string;
};

export const UPCOMING_WEEKENDS: UpcomingWeekend[] = [
  { arrival: "2027-08-28", label: "8月28日周六", opensOn: "2026-11-28", opensLabel: "11月28日" },
  { arrival: "2027-09-04", label: "9月4日周六", opensOn: "2026-12-04", opensLabel: "12月4日" },
  { arrival: "2027-09-11", label: "9月11日周六", opensOn: "2026-12-11", opensLabel: "12月11日" },
  { arrival: "2027-09-18", label: "9月18日周六", opensOn: "2026-12-18", opensLabel: "12月18日" },
  { arrival: "2027-09-25", label: "9月25日周六", opensOn: "2026-12-25", opensLabel: "12月25日" },
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
    checkNote: "6 个月滚动（自然月到日，每日早 6 点上线）：6/19→2026-12-19、7/3→2027-01-03、8/7→2027-02-07、9/4→2027-03-04 起滚动开放",
  },
  {
    campId: 31,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 个月滚动（自然月到日，每日早 6 点上线）：6/19→2026-12-19、7/3→2027-01-03、8/7→2027-02-07、9/4→2027-03-04 起滚动开放",
  },
  {
    campId: 32,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 个月滚动（自然月到日，每日早 6 点上线）：6/19→2026-12-19、7/3→2027-01-03、8/7→2027-02-07、9/4→2027-03-04 起滚动开放",
  },
  {
    campId: 33,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 个月滚动（自然月到日，每日早 6 点上线）：6/19→2026-12-19、7/3→2027-01-03、8/7→2027-02-07、9/4→2027-03-04 起滚动开放",
  },
  {
    campId: 34,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 个月滚动（自然月到日，每日早 6 点上线）：6/19→2026-12-19、7/3→2027-01-03、8/7→2027-02-07、9/4→2027-03-04 起滚动开放",
  },
  {
    campId: 38,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 个月滚动（自然月到日，每日早 6 点上线）：6/19→2026-12-19、7/3→2027-01-03、8/7→2027-02-07、9/4→2027-03-04 起滚动开放",
  },
  {
    campId: 46,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 个月滚动（自然月到日，每日早 6 点上线）：6/19→2026-12-19、7/3→2027-01-03、8/7→2027-02-07、9/4→2027-03-04 起滚动开放",
  },
  {
    campId: 15,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 个月滚动（自然月到日，每日早 6 点上线）：6/19→2026-12-19、7/3→2027-01-03、8/7→2027-02-07、9/4→2027-03-04 起滚动开放",
  },
  {
    campId: 20,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 个月滚动（自然月到日，每日早 6 点上线）：6/19→2026-12-19、7/3→2027-01-03、8/7→2027-02-07、9/4→2027-03-04 起滚动开放",
  },
  {
    campId: 21,
    reason: "全园关闭至 2027 年春",
    checkNote: "闭园至 2027 年春、无重开日，2027 年春复核重开日后再查，不按 12-19 抢",
  },
  {
    campId: 36,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 个月滚动（自然月到日，每日早 6 点上线）：6/19→2026-12-19、7/3→2027-01-03、8/7→2027-02-07、9/4→2027-03-04 起滚动开放",
  },
  {
    campId: 48,
    reason: "俄勒冈 6 个月窗口未开",
    checkNote: "6 个月滚动（自然月到日，每日早 6 点上线）：6/19→2026-12-19、7/3→2027-01-03、8/7→2027-02-07、9/4→2027-03-04 起滚动开放",
  },
  {
    campId: 29,
    reason: "Recreation.gov 分批放票，标准位未开",
    checkNote: "2026-11-22 复查：2027 预订季 6月26日–9月7日；A 环提前 6 个月、C 环 2 周、B 环 4 天放票（非 270 天）。6/19 不在预订季内、先到先得不可网订；标准位首次放号 2026-12-26 07:00 起（至 2027-06-26）；团体营位 2/3 号（$48/晚）2026-11-22 现查：7/3、7/10 已订满，7/17、7/24 可订。A 环放票日：7/3→2027-01-03、7/10→01-10、7/17→01-17、7/24→01-24（07:00 PST）；计划 08-13 两晚行程 A 环约 2027-02-13 开",
    soldOutWeekends: ["2027-07-03", "2027-07-10"],
  },
  {
    campId: 4,
    reason: "Recreation.gov 6 个月窗口未开",
    checkNote: "6 个月滚动（自然月到日，非 180 天）：6 月档期 2026-12-19 起、7 月 2027-01-03 起、8 月 2027-02-07 起、9 月 2027-03-04 起滚动开放，每天太平洋时间早 7 点放票",
  },
  {
    campId: 11,
    reason: "Recreation.gov 6 个月窗口未开",
    checkNote: "A/B Loop 6 个月滚动未开（C/D 提前 2 周、E/F 提前 4 天）；6 月档期 2026-12-19 起滚动开放",
  },
  {
    campId: 17,
    reason: "Recreation.gov 6 个月窗口未开",
    checkNote: "6 个月滚动（自然月到日，非 180 天）：6 月档期 2026-12-19 起、7 月 2027-01-03 起、8 月 2027-02-07 起、9 月 2027-03-04 起滚动开放，每天太平洋时间早 7 点放票",
  },
  {
    campId: 18,
    reason: "Recreation.gov 6 个月窗口未开",
    checkNote: "分批放票：A/B/E 环提前 6 个月、C 环 2 周、D 环 4 天（自然月到日）；6 月档期 2026-12-19 起滚动开放，每天太平洋时间早 7 点放票；9/25 季外先到先得",
  },
  {
    campId: 23,
    reason: "Recreation.gov 12 个月滚动已开，7/1–9/27 可订",
    checkNote: "12 个月滚动（Recreation.gov Seasons and Fees 页，2026-11-22 核实；原“6 个月滚动”有误）；2027-07-01–09-27 已放出、现查 RV 可订 59–94 位/周六（8/28 88、9/4 82、9/11 76、9/18 87、9/25 94）；6/1–7/1 先到先得；季末 9/27；电位 17 个（B10、C5、C27、C28、F15–F18、F20、F21、F23–F29），水电全接驳 4 个（B10、C5、C27、C28）；费率 RV 无接驳 $40、电位 $55/$65",
  },
  {
    campId: 37,
    reason: "Recreation.gov 6 个月窗口未开",
    checkNote: "6 个月滚动（自然月到日，非 180 天）：6 月档期 2026-12-19 起、7 月 2027-01-03 起、8 月 2027-02-07 起、9 月 2027-03-04 起滚动开放，每天太平洋时间早 7 点放票",
  },
  {
    campId: 39,
    reason: "Recreation.gov 6 个月窗口未开",
    checkNote: "分批放票：#64–95 与 #116–164 提前 6 个月、#96–113 只提前 7 天（自然月到日）；6 月档期 2026-12-19 起滚动开放，每天太平洋时间早 7 点放票；旺季 5 月底–9 月初，9/18、9/25 很可能已闭园",
  },
  {
    campId: 7,
    reason: "Recreation.gov 6 个月窗口未开",
    checkNote: "分批放票：6 个月/2 周/4 天三档；2027 年环对应关系待官方公布，首次现查以 Seasons and Fees 页为准；6 月档期 2026-12-19 起滚动开放",
  },
  {
    campId: 6,
    reason: "Recreation.gov 6 个月窗口未开",
    checkNote: "6 个月滚动（自然月到日，非 180 天）：6 月档期 2026-12-19 起、7 月 2027-01-03 起、8 月 2027-02-07 起、9 月 2027-03-04 起滚动开放，每天太平洋时间早 7 点放票；2026 年受限、据地方指南关闭至 2027 年 2 月，首次现查在 Recreation.gov 页面核对 2027 夏季是否正常放号",
  },
  {
    campId: 54,
    reason: "Recreation.gov 6 个月滚动放票中，5 月档期已开",
    checkNote: "季 2027-05-21–09-18；5/21、5/22 已放出（各 102 个可订位、11 个已订），5/23 将于 11/23 07:00 放出；6 月档期仍 2026-12-19 起滚动；9/25 季外",
  },
  {
    campId: 55,
    reason: "Recreation.gov 6 个月窗口未开",
    checkNote: "6 个月滚动（自然月到日，非 180 天）：6 月档期 2026-12-19 起、7 月 2027-01-03 起、8 月 2027-02-07 起、9 月 2027-03-04 起滚动开放，每天太平洋时间早 7 点放票",
  },
  {
    campId: 56,
    reason: "Recreation.gov 6 个月窗口未开",
    checkNote: "6 个月滚动（自然月到日，非 180 天）：6 月档期 2026-12-19 起、7 月 2027-01-03 起、8 月 2027-02-07 起、9 月 2027-03-04 起滚动开放，每天太平洋时间早 7 点放票",
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
    campId: 2,
    reason: "华盛顿州立公园 9 个月窗口已开，在盯盘范围",
    checkNote: "2026-11-22 复查：6/26、7/10、7/17、7/24、8/7、8/21 有位；6/19、7/3、8/14 订满",
    soldOutWeekends: ["2027-06-19", "2027-07-03", "2027-08-14"],
  },
  {
    campId: 9,
    reason: "华盛顿州立公园 9 个月窗口已开，在盯盘范围",
    checkNote: "2026-11-22 复查：9 个周末均有位（7/3 Loop B 44–47 号为新增）；8/7 仅 Loop A 14 号",
    soldOutWeekends: [],
  },
  {
    campId: 16,
    reason: "华盛顿州立公园 9 个月窗口已开，在盯盘范围",
    checkNote: "2026-11-22 复查：6/19、6/26、7/10、7/17、7/24、8/21 有位；7/3、8/7、8/14 订满；A 区 7–10、21–25、101–110 号 2027 春夏须 2027-04-01 7:00 起订，D 区不可订；北防波堤 2027-01-01–2029-11-30 关闭",
    soldOutWeekends: ["2027-07-03", "2027-08-07", "2027-08-14"],
  },
  {
    campId: 40,
    reason: "华盛顿州立公园 9 个月窗口已开，在盯盘范围",
    checkNote: "2026-11-22 复查：6/26、7/10、7/17、7/24、8/7、8/14、8/21 有位；6/19、7/3 订满",
    soldOutWeekends: ["2027-06-19", "2027-07-03"],
  },
  {
    campId: 41,
    reason: "华盛顿州立公园 9 个月窗口已开，在盯盘范围",
    checkNote: "2026-11-22 复查：仅 8/7、8/14 有位；其余 7 个周末 Non-Reservable（按订满处理）",
    soldOutWeekends: ["2027-06-19", "2027-06-26", "2027-07-03", "2027-07-10", "2027-07-17", "2027-07-24", "2027-08-21"],
  },
  {
    campId: 42,
    reason: "华盛顿州立公园 9 个月窗口已开，在盯盘范围",
    checkNote: "2026-11-22 复查：9 个周末均有位（7/10 5、47 号、7/24 5、21、22 号为新增）",
    soldOutWeekends: [],
  },
  {
    campId: 43,
    reason: "华盛顿州立公园 9 个月窗口已开，在盯盘范围",
    checkNote: "2026-11-22 复查：9 个周末均有位（7/10 15 个为新增）",
    soldOutWeekends: [],
  },
  {
    campId: 3,
    reason: "Tacoma Power 9 个月窗口已开，在盯盘范围",
    checkNote: "2026-11-21 首查：9 个周末均有位（东/西营地、Elk Plain、Rocky Point）；7/3、8/14 东/西营地无位但 Elk Plain 与 Rocky Point 有位；旺季全接驳 $56、水电 $51，另收 $8 网上订位费",
  },
  {
    campId: 12,
    reason: "KOA 年度放号已开，在盯盘范围",
    checkNote: "2026-11-21 首查：9 个周末均有全接驳 RV 位（10–14 类可选，$96 起；7/3 仅剩 2 类）；KOA 按类型分位，具体营位号须 +$30 选位；KOA Rewards 结账 9 折另计；2026-11-22 复查：8/14 高级位 $136（基线 $131），其余与基线一致；8/21 完全一致",
  },
  {
    campId: 26,
    reason: "该周末订满，盯退订",
    checkNote: "2026-11-22 复查：7/10 54 号有位（基线记订满，已补）；7/3 订满；其余周末有位",
    soldOutWeekends: ["2027-07-03"],
  },
  {
    campId: 25,
    reason: "多数周末无普通位，盯退订",
    checkNote: "2026-11-22 复查：Beach Campground 6/19 11 个、6/26 23 个、7/3 7 个、7/10 18 个、7/17 23 个、7/24 8 个有位；8/7、8/14、8/21 订满；其余周末仅剩 ADA 位或订满",
    soldOutWeekends: ["2027-08-07", "2027-08-14", "2027-08-21"],
  },
  {
    campId: 8,
    reason: "该周末订满，盯退订",
    checkNote: "2026-11-22 复查：West Loop 6/26、7/10 各 77 号，8/14 8 个、8/21 4 个；Trailer 8/21 33 号；Beach Loop 9 周全满；其余周末订满",
    soldOutWeekends: ["2027-06-19", "2027-07-03", "2027-07-17", "2027-07-24", "2027-08-07"],
  },
  {
    campId: 44,
    reason: "多数周末仅剩 ADA 位，盯退订",
    checkNote: "2026-11-22 复查：6/26 Dune 98 号；7/10 Dune 110 号；7/17 Sage 3、6、304 号 + Bay 143 号；8/7 Sage 312 号；8/14 Dune 322 号 + Sage 4 个；8/21 Dune 3 个 + Sage 6 个；6/19、7/3、7/24 无普通位",
    soldOutWeekends: ["2027-06-19", "2027-07-03", "2027-07-24"],
  },
  {
    campId: 27,
    reason: "该周末无普通位，盯退订",
    checkNote: "2026-11-22 复查：7/10 2 号有位（基线记订满，已补）；6/26 仅剩 ADA 位、7/3 订满",
    soldOutWeekends: ["2027-06-26", "2027-07-03"],
  },
  {
    campId: 28,
    reason: "华盛顿州立公园 9 个月窗口已开，在盯盘范围",
    checkNote: "2026-11-22 复查：Upper 9 个周末均有位（7/3 10 个、7/24 13 个为新增）；Lower 7/3、7/24、8/7、8/14 订满",
    soldOutWeekends: [],
  },
  {
    campId: 30,
    reason: "该周末订满，盯退订",
    checkNote: "2026-11-22 复查：7/10 订满；8/14 Northend 无位、Midway 补 43 号",
    soldOutWeekends: ["2027-07-10"],
  },
  {
    campId: 1,
    reason: "该周末订满，盯退订",
    checkNote: "2026-11-22 复查：除 7/3 外 8 个周末均有位；7/3 订满",
    soldOutWeekends: ["2027-07-03"],
  },
  {
    campId: 5,
    reason: "华盛顿州立公园 9 个月窗口已开，在盯盘范围",
    checkNote: "2026-11-22 复查：9 个周末均有位；7/10 北营地 47 个、南营地 11 个（基线记订满，已补）；6/19 130 号、7/17 106 号已订",
    soldOutWeekends: [],
  },
];

/** 本次现查覆盖过的华盛顿州营地 id（用于算“这周没位”） */
export const CHECKED_WA_CAMP_IDS = [26, 27, 1, 5, 8, 28, 30, 44, 25, 2, 9, 16, 40, 41, 42, 43];

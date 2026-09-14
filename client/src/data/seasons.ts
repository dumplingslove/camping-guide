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

export const monthLabels = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
export const monthLabelsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const seasonData: SeasonData[] = [
  { campgroundId: 1, months: [1, 1, 1, 2, 2, 3, 3, 3, 3, 2, 1, 1], peakMonths: "6月-9月", notes: "全年开放，夏季最佳。冬季Quarry Pond仍开放，其他区域可能关闭" },
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
  { campgroundId: 25, months: [1, 1, 1, 2, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "官方费率季核验：旺季5/15–9/15（Peak），4月/9月下半月及10月为平季，11月–3月为冬季淡季（Upper Forest环10/31–3/15关闭、营地断水）。来源：parks.wa.gov" },
  { campgroundId: 26, months: [1, 1, 1, 2, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "官方核验：Peak季5/15–9/15；9/16–5/14为Shoulder季；11/1–4/15低洼营位先到先得。冬季为观风暴淡季。来源：parks.wa.gov" },
  { campgroundId: 27, months: [1, 1, 1, 2, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "官方核验：可预订季5/15–9/15为旺季，9/16–5/14先到先得；冬季费率最低，属淡季。来源：parks.wa.gov" },
  { campgroundId: 28, months: [1, 1, 1, 1, 2, 3, 3, 3, 2, 1, 1, 1], peakMonths: "6月-8月", notes: "官方核验：Upper营地10/1–4/30关闭；Lower营地2026年起全年可预订，11月中–3月断水。4月/10月仅Lower开放，属淡季。来源：parks.wa.gov" },
  { campgroundId: 29, months: [1, 1, 1, 2, 2, 3, 3, 3, 2, 1, 1, 1], peakMonths: "6月-8月", notes: "NPS核验：营地全年开放（天气允许），2026年预订季6/12–9/6，季外先到先得；冬季游客中心关闭、部分道路可能封闭，属淡季。来源：nps.gov" },
  { campgroundId: 30, months: [1, 1, 1, 2, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "官方核验：Southend营地10/31–4/1关闭；Midway全年开放（11/1–5/15部分营位先到先得）；Peak季5/15–9/15。来源：parks.wa.gov" },
  { campgroundId: 31, months: [1, 1, 1, 1, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "官方核验：全年开放，但冬季仅A/B/C环开放（E–I环10/1起关闭、D环11/1关闭），属淡季；6–8月为旺季。来源：俄勒冈海岸官方旅游页" },
  { campgroundId: 32, months: [1, 1, 1, 1, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "官方核验：全年开放，E/F环11/1–4/30先到先得；冬季服务缩减。2024年底–2025年中曾因施工关闭，现已恢复。来源：reserveamerica官方预订页" },
  { campgroundId: 33, months: [1, 1, 1, 1, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "OPRD官方宣传册：全年可露营；6–8月为旺季（夏季日照最佳），5月/9–10月为平季，11–4月为淡季。来源：stateparks.oregon.gov" },
  { campgroundId: 34, months: [1, 1, 1, 1, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "核验：水电营位与小木屋全年开放，帐篷营位仅5–10月；冬季为淡季，6–8月为旺季。来源：stateparks.oregon.gov（经官方渠道引证）" },
  { campgroundId: 35, months: [1, 1, 1, 1, 2, 3, 3, 3, 2, 1, 1, 1], peakMonths: "6月-8月", notes: "官方核验：全年开放（高海拔4403英尺），但10月–5月中旬营位停水（仅加热卫生间可用）；6–8月为旺季（7月常售罄）。来源：reserveamerica官方预订页" },
  { campgroundId: 36, months: [1, 1, 1, 1, 2, 3, 3, 3, 2, 1, 1, 1], peakMonths: "6月-8月", notes: "OPRD官方核验：冬季仅保留一个营环开放（淡季）；6–8月为湖上活动旺季；10月湖水位下降。来源：stateparks.oregon.gov" },
  { campgroundId: 37, months: [0, 0, 2, 2, 3, 3, 3, 3, 3, 2, 0, 0], peakMonths: "5月-9月", notes: "NPS核验修正：度假村3月下旬–10月中旬开放（2026年营地运营季3/20–11/1）；原4月中开放、度假村全年开放的说法有误。来源：nps.gov" },
  { campgroundId: 38, months: [1, 1, 1, 1, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "官方核验：全年开放（Brookings小气候温和）；冬季为观风暴淡季；6–8月为旺季（常满房，需提前数月预订）。来源：俄勒冈海岸官方旅游页" },
  { campgroundId: 39, months: [1, 1, 1, 1, 2, 3, 3, 3, 2, 1, 1, 1], peakMonths: "6月-8月", notes: "NPS核验修正：运营季为阵亡将士纪念日周末前周一至9月中；另有10个步行帐篷营位全年开放（无水无服务），故冬季为淡季而非关闭。来源：nps.gov" },
  { campgroundId: 40, months: [0, 0, 1, 2, 2, 3, 3, 3, 3, 2, 0, 0], peakMonths: "6月-9月", notes: "官方核验：营地开放季3/1–10/31（5/15后进入预订季），11–2月营地关闭；日间使用与船艇发射台全年开放。来源：parks.wa.gov" },
  { campgroundId: 41, months: [1, 1, 1, 2, 2, 3, 3, 3, 3, 2, 1, 1], peakMonths: "6月-9月", notes: "官方核验：营地全年可预订（11–3月营地断水，洗手间旁有冬季供水）；6–9月为旺季，冬季为淡季。来源：parks.wa.gov" },
  { campgroundId: 42, months: [0, 0, 0, 1, 2, 3, 3, 3, 2, 2, 0, 0], peakMonths: "6月-8月", notes: "官方宣传册核验：营地4/1–10/31开放（5/15–9/15需预订），11–3月关闭。来源：parks.wa.gov" },
  { campgroundId: 43, months: [1, 1, 1, 2, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "官方核验：5/15–9/15可预订（旺季），9/16–5/14先到先得；11月底–3月底冬季化，冬季为淡季。来源：parks.wa.gov" },
  { campgroundId: 44, months: [1, 1, 1, 2, 2, 3, 3, 3, 3, 2, 1, 1], peakMonths: "6月-9月", notes: "官方冬季排班核验：Sage/Dune/Cove环11/1–3/31关闭；Bay环冬季先到先得；供水10月中–4/1关闭；可预订季4/1–10/31。来源：parks.wa.gov" },
  { campgroundId: 45, months: [1, 1, 1, 2, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "OPRD官方核验：全年可露营；Discovery淡季价格季为10/1–4/30；6–8月为旺季。来源：stateparks.oregon.gov" },
  { campgroundId: 46, months: [1, 1, 1, 2, 2, 3, 3, 3, 2, 2, 1, 1], peakMonths: "6月-8月", notes: "OPRD官方核验：B环、yurt、小木屋全年开放；A环季节性关闭（具体月份官方未明确）。6–8月为旺季。来源：stateparks.oregon.gov" },
  { campgroundId: 47, months: [1, 1, 2, 2, 2, 3, 3, 3, 3, 2, 1, 1], peakMonths: "6月-9月", notes: "OPRD官方核验：全年可露营；冬季游客稀少为淡季；6–9月为旺季。来源：stateparks.oregon.gov" },
  { campgroundId: 48, months: [1, 1, 2, 2, 3, 3, 3, 3, 3, 2, 1, 1], peakMonths: "5月-9月", notes: "官方核验：Crooked River北环全年开放、中/南环仅3–10月；Deschutes River营地仅5/9–9月中旬；冬季为淡季。来源：stateparks.oregon.gov" },
  { campgroundId: 49, months: [1, 1, 2, 2, 2, 3, 3, 3, 3, 2, 1, 1], peakMonths: "6月-9月", notes: "OPRD官方宣传册核验：全年可露营（冬季道路维护）；高海拔冬季环境严酷为淡季；6–9月为旺季。来源：stateparks.oregon.gov" },
  { campgroundId: 50, months: [1, 1, 1, 2, 2, 3, 3, 3, 3, 2, 1, 1], peakMonths: "6月-9月", notes: "bcparks.ca核验修正：全年允许露营（冬季为winter camping，服务缩减需自给自足）；原1–5月、10–12月标关闭有误。6–9月为旺季。来源：bcparks.ca" },
  { campgroundId: 51, months: [0, 0, 0, 0, 1, 2, 3, 3, 2, 1, 0, 0], peakMonths: "7月-8月", notes: "bcparks.ca核验：季节性营地，开放窗口约5月中旬–10月中旬（积雪大年可能延迟）；7–8月为旺季。来源：bcparks.ca" },
  { campgroundId: 52, months: [1, 1, 2, 2, 3, 3, 3, 3, 3, 2, 1, 1], peakMonths: "5月-9月", notes: "bcparks.ca核验修正：Delta Grove全年开放（冬季服务有限），其余营地多为5–10月；3–4月为平季。注：条目为公园整体判断。来源：bcparks.ca" },
  { campgroundId: 53, months: [1, 1, 2, 2, 3, 3, 3, 3, 3, 2, 1, 1], peakMonths: "5月-9月", notes: "bcparks.ca及BC省政府官方新闻稿核验修正：全年可露营（2024–25冬季曾因洪水临时关闭）；6–9月为旺季。来源：bcparks.ca" },
  { campgroundId: 54, months: [0, 0, 0, 0, 0, 2, 3, 3, 3, 1, 0, 0], peakMonths: "7月-8月", notes: "6月初–9月中旬开放。7-8月湖水最暖，适合游泳划船；8月后水位下降船坡道可能关闭" },
  { campgroundId: 55, months: [0, 0, 0, 0, 1, 2, 3, 3, 3, 1, 0, 0], peakMonths: "7月-8月", notes: "约5月下旬–9月中旬开放。夏季河边戏水最佳；干燥季节可能有禁火令" },
  { campgroundId: 56, months: [0, 0, 0, 0, 2, 2, 3, 3, 3, 2, 0, 0], peakMonths: "7月-8月", notes: "5月中旬–10月初开放。夏季湖水温暖；蒙古包和周末营位需提前抢订" },
];

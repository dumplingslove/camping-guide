// Campground photos and maps - all uploaded to webdev storage

export interface CampgroundPhotos {
  photos: string[];
  map?: string;
  captions?: string[];
}

export const campgroundPhotos: Record<number, CampgroundPhotos> = {
  // 1. Deception Pass
  1: {
    photos: [
      "/camping-guide/images/camp-1/01.jpg",
      "/camping-guide/images/camp-1/02.jpg",
      "/camping-guide/images/camp-1/03.jpg",
      "/camping-guide/images/camp-1/04.jpg",
      "/camping-guide/images/camp-1/05.jpg",
      "/camping-guide/images/camp-1/06.jpg",
      "/camping-guide/images/camp-1/07.jpg",
      "/camping-guide/images/camp-1/08.jpg",
      "/camping-guide/images/camp-1/09.jpg",
      "/camping-guide/images/camp-1/10.jpg",
      "/camping-guide/images/camp-1/11.jpg",
      "/camping-guide/images/camp-1/site-01.jpg",
      "/camping-guide/images/camp-1/site-02.jpg",
      "/camping-guide/images/camp-1/site-03.jpg"
    ],
    captions: ["鸟瞰 Deception Pass 大桥，桥下碧蓝海水涌动，群岛与针叶林环绕", "从桥上南端向北眺望，绿色栏杆旁车辆驶过，海峡两侧峭壁森林", "从桥上俯瞰海峡中的 Strawberry Island，海水碧蓝", "Bowman Bay 碧绿海水与砾石滩，岸边森林与停车场", "从 Rosario Head 俯瞰 Bowman Bay，海湾静谧，远山连绵", "North Beach 步道，穿行于高大的针叶林与苔藓岩石间", "Rosario Beach 附近的岩石海岸，日落余晖下的礁石与黑沙滩", "林间苔藓覆盖的岩石山脊，周围是茂密的针叶林（徒步道旁景）", "Cranberry Lake 附近约 850 年树龄的古道格拉斯冷杉，虬曲的枝干", "露营者在黄色帐篷门口抱着狗狗合影", "有人在 Cranberry Lake 上划黄色皮划艇，岸边是茂密针叶林", "林间碎石营位，火圈与野餐桌俱全，老杉树环抱", "密林中的帐篷营位，野餐桌与树桩座椅，地面为草地加碎石", "开阔草地帐篷营位，带野餐桌，营位间距宽敞"],
  },
  // 2. Millersylvania
  2: {
    photos: [
      "/camping-guide/images/camp-2/01.jpg",
      "/camping-guide/images/camp-2/02.jpg",
      "/camping-guide/images/camp-2/03.jpg",
      "/camping-guide/images/camp-2/04.jpg",
      "/camping-guide/images/camp-2/05.jpg",
      "/camping-guide/images/camp-2/06.jpg",
      "/camping-guide/images/camp-2/07.jpg",
      "/camping-guide/images/camp-2/08.jpg",
      "/camping-guide/images/camp-2/site-01.jpg",
      "/camping-guide/images/camp-2/site-02.jpg",
      "/camping-guide/images/camp-2/site-03.jpg"
    ],
    captions: ["巨木环绕的野餐区，石质小屋与野餐桌", "林间木栅栏小径，两侧高大针叶林", "高大雪松林下的湖畔野餐区，野餐桌散落林间草地", "两棵树干交缠合生的苔藓古树", "冬季薄雾中的湖面，两只白鸟掠过，背景是密林", "一群人走在冬季的木板步道上（First Day 徒步）", "刻着公园名字的原木入口牌（Millersylvania State Park）", "高大的雪松仰视，晨光穿过枝叶", "RV营位实拍：野餐桌、火圈、铺装车道，草地宽敞（营地用户上传）", "林间帐篷营位实拍：帆布帐篷、野餐桌、火圈，松针地面", "营位吊床露营实拍：巨杉林下吊床与天幕，营位间距疏朗"],
  },
  // 3. Alder Lake
  3: {
    photos: [
      "/camping-guide/images/camp-3/01.jpg",
      "/camping-guide/images/camp-3/02.jpg",
      "/camping-guide/images/camp-3/03.jpg",
      "/camping-guide/images/camp-3/04.jpg",
      "/camping-guide/images/camp-3/05.jpg",
      "/camping-guide/images/camp-3/06.jpg",
      "/camping-guide/images/camp-3/07.jpg",
      "/camping-guide/images/camp-3/site-01.jpg",
      "/camping-guide/images/camp-3/site-02.jpg",
      "/camping-guide/images/camp-3/site-03.jpg"
    ],
    captions: ["营地全景，宽阔的房车位、铺装环路、树木环绕", "从公路看低水位的 Alder Lake 上游盆地，湖中露出大量树桩", "Rocky Point 船艇下水处的公告牌，标注船员规则与安全事项", "营地环路入口，柏油路穿过针叶林，路边有营地标识牌", "秋季低水位时的湖盆全景，泥滩上散布树桩，远山环绕", "沙滩区，人们在湖边草地休憩，碧绿湖水与对岸森林", "道格拉斯冷杉枝条特写，针叶浓绿", "RV营位实拍：房车与皮卡停靠林间铺装营位", "碎石营位，野餐桌与火圈俱全，针叶林环绕", "整排铺装RV营位，每张野餐桌间距宽敞，草地分隔"],
  },
  // 4. Cougar Rock
  4: {
    photos: [
      "/camping-guide/images/camp-4/01.jpg",
      "/camping-guide/images/camp-4/02.jpg",
      "/camping-guide/images/camp-4/03.jpg",
      "/camping-guide/images/camp-4/04.jpg",
      "/camping-guide/images/camp-4/05.jpg",
      "/camping-guide/images/camp-4/06.jpg",
      "/camping-guide/images/camp-4/07.jpg",
      "/camping-guide/images/camp-4/08.jpg",
      "/camping-guide/images/camp-4/09.jpg",
      "/camping-guide/images/camp-4/10.jpg",
      "/camping-guide/images/camp-4/11.jpg",
      "/camping-guide/images/camp-4/site-01.jpg",
      "/camping-guide/images/camp-4/site-02.jpg",
      "/camping-guide/images/camp-4/site-03.jpg"
    ],
    captions: ["C-20 营位高出地面的帐篷平台，林间空地", "C-2 营位的无障碍标识牌，下方挂着预订单", "A 环的男女厕所小屋，水泥步道通往洗手间", "B 环的洗手间小屋，门前有石砌饮水台和取水设施", "露天剧场，原木座位面向木质表演台，周围是密林", "木质无障碍栈桥穿过古老的针叶林", "D 环的男女洗手间，背后是悬崖山峰与密林", "无障碍停车场，标有轮椅车位，旁边是林间野餐区", "林间碎石空地上的两张野餐桌，背后是茂密针叶林", "营地入口的橙色警示牌：露营自担风险，提示山洪、泥石流等地质灾害", "NPS 志愿者与两名小朋友击掌互动，小朋友手里拿着 Junior Ranger 活动手册", "林间整洁营位，野餐桌配火圈，松针地面被巨杉环抱", "林间开阔营位，野餐桌与碎石停车位，原始森林环绕", "正在使用的营位：汽车、野餐桌、火圈齐备，实拍露营场景"],
  },
  // 5. Lake Wenatchee
  5: {
    photos: [
      "/camping-guide/images/camp-5/01.jpg",
      "/camping-guide/images/camp-5/02.jpg",
      "/camping-guide/images/camp-5/03.jpg",
      "/camping-guide/images/camp-5/04.jpg",
      "/camping-guide/images/camp-5/05.jpg",
      "/camping-guide/images/camp-5/06.jpg",
      "/camping-guide/images/camp-5/07.jpg",
      "/camping-guide/images/camp-5/08.jpg",
      "/camping-guide/images/camp-5/09.jpg",
      "/camping-guide/images/camp-5/site-01.jpg",
      "/camping-guide/images/camp-5/site-02.jpg",
      "/camping-guide/images/camp-5/site-03.jpg"
    ],
    captions: ["公园入口欢迎牌（Lake Wenatchee State Park Welcome）", "山峰在平静湖面上倒影，前景是水中灌木", "一艘游艇停在平静如镜的湖面，山与森林倒影清晰", "湖水中一截枯木根，倒影如画，背后是茂密针叶林", "一只金黄色的黄松花栗鼠站在湖畔石块上", "夏季南岸沙滩，游人嬉水，碧蓝湖水与远山森林", "清晨湖岸，薄雾中的山峦倒影，岸边岩石嶙峋", "云朵与山峰倒影在平静湖中（HDR 风格）", "冬季雪后的湖岸，暖阳映照在冰雪覆盖的岩石与湖面上", "碎石RV营位，高大雪松环绕，带野餐桌与火圈", "长条形贯穿式RV营位，碎石车道，松林密布", "水电桩RV营位，配电箱与野餐桌，火坑近在咫尺"],
  },
  // 6. Ohanapecosh
  6: {
    photos: [
      "/camping-guide/images/camp-6/01.jpg",
      "/camping-guide/images/camp-6/02.jpg",
      "/camping-guide/images/camp-6/03.jpg",
      "/camping-guide/images/camp-6/04.jpg",
      "/camping-guide/images/camp-6/05.jpg",
      "/camping-guide/images/camp-6/site-01.jpg",
      "/camping-guide/images/camp-6/site-02.jpg",
      "/camping-guide/images/camp-6/site-03.jpg"
    ],
    captions: ["湍急的 Ohanapecosh River，碧绿河水穿过密林，两岸山峦", "林间营地，帐篷与露营者，巨树遮荫", "Grove of the Patriarchs 的苔藓木质步道，穿行在巨型针叶林中", "沿柏油环路的营位，野餐桌与原木座位", "D 环的无障碍洗手间，水泥步道通向门口", "帐篷营位实拍：黄色帐篷、汽车、野餐桌，古木参天", "林间营位，木桩界限清晰，野餐桌隐于高大云杉之间", "林下营位，帐篷与野餐桌，地面为松针碎石"],
  },
  // 7. Fairholme
  7: {
    photos: [
      "/camping-guide/images/camp-7/01.jpg",
      "/camping-guide/images/camp-7/02.jpg",
      "/camping-guide/images/camp-7/03.jpg",
      "/camping-guide/images/camp-7/04.jpg",
      "/camping-guide/images/camp-7/05.jpg",
      "/camping-guide/images/camp-7/06.jpg",
      "/camping-guide/images/camp-7/07.jpg",
      "/camping-guide/images/camp-7/08.jpg",
      "/camping-guide/images/camp-7/09.jpg",
      "/camping-guide/images/camp-7/site-01.jpg",
      "/camping-guide/images/camp-7/site-02.jpg",
      "/camping-guide/images/camp-7/site-03.jpg"
    ],
    captions: ["黑白历史照片：1950 年代 Lake Crescent 的帆船与码头", "Fairholm 的木质码头，游人站在码头尽头，湖对岸是陡峭山林", "从岸边看 Lake Crescent 的木质码头与远山林", "清澈见底的湖水，浅水处可见砾石", "日落时分的湖面，两岸山峦剪影", "Spruce Railroad Trail 旁的枯木桩，湖水碧蓝", "Lake Crescent Lodge 的码头与皮艇，远山连绵", "木质步道桥伸向湖心，对岸是陡峭山林", "全景：碧蓝清澈的湖水，群山环绕，岸边小路", "原始森林中的营位，野餐桌与烧烤架，被苔藓巨杉环绕", "林间碎石营位，野餐桌配石砌火圈，蕨类植物茂盛", "湖畔营位：野餐桌、火圈，透过林木可见 Crescent 湖面"],
  },
  // 8. Lake Chelan
  8: {
    photos: [
      "/camping-guide/images/camp-8/01.jpg",
      "/camping-guide/images/camp-8/02.jpg",
      "/camping-guide/images/camp-8/03.jpg",
      "/camping-guide/images/camp-8/04.jpg",
      "/camping-guide/images/camp-8/05.jpg",
      "/camping-guide/images/camp-8/06.jpg",
      "/camping-guide/images/camp-8/07.jpg",
      "/camping-guide/images/camp-8/08.jpg",
      "/camping-guide/images/camp-8/09.jpg",
      "/camping-guide/images/camp-8/10.jpg",
      "/camping-guide/images/camp-8/site-01.jpg",
      "/camping-guide/images/camp-8/site-02.jpg",
      "/camping-guide/images/camp-8/site-03.jpg"
    ],
    captions: ["草地上栖息的几匹马，背后是森林", "雪山湖泊全景，碧绿湖水与森林雪山", "沼泽草甸上的小木屋，湖水倒影，远山环绕", "蓝天下的冷杉枝与球果特写", "远眺 Lake Chelan，湖对岸山地、湖上漂木", "车窗前公路边的 Lake Chelan，湖畔社区与远山（日落时分）", "悬崖边的跳水者，湖上小船与峭壁", "从步道俯瞰 Lake Chelan，深蓝湖水与山峦", "冬季的 Manson 果园山坡，积雪覆盖的湖畔果园与房屋", "阳光洒在湖面，码头剪影与远山倒影", "铺装RV营位，带编号桩与野餐桌，场地平整开阔", "正在使用的帐篷营位：帐篷、遮阳棚、野餐桌齐备", "碎石贯穿式营位，绿荫下多张野餐桌，间距宽敞"],
  },
  // 9. Pacific Beach
  9: {
    photos: [
      "/camping-guide/images/camp-9/01.jpg",
      "/camping-guide/images/camp-9/02.jpg",
      "/camping-guide/images/camp-9/03.jpg",
      "/camping-guide/images/camp-9/04.jpg",
      "/camping-guide/images/camp-9/05.jpg",
      "/camping-guide/images/camp-9/06.jpg",
      "/camping-guide/images/camp-9/07.jpg",
      "/camping-guide/images/camp-9/08.jpg",
      "/camping-guide/images/camp-9/09.jpg",
      "/camping-guide/images/camp-9/10.jpg",
      "/camping-guide/images/camp-9/site-01.jpg",
      "/camping-guide/images/camp-9/site-02.jpg",
      "/camping-guide/images/camp-9/site-03.jpg"
    ],
    captions: ["Pacific Beach 宽阔沙滩全景，海天一色", "Pacific Beach 小镇的海滨街区，两旁是度假小屋", "沙丘后的湿地草甸与水洼", "薄雾中的海滩，游人在远处漫步", "沙滩上的漂流木堆，远处是海岸松林", "一条小溪蜿蜒穿过沙滩汇入大海", "沙滩与沙丘草甸，远处松林绵延", "退潮后的宽阔沙滩，游人在海边休憩", "沙滩上潮汐留下的细腻纹路", "沙滩上的一枚海饼干（sand dollar）", "海滨营位实拍：帐篷、野餐桌，背后即太平洋", "海景营位，铺装车道与野餐桌，面向海滩", "海景营位，草地铺装结合，野餐桌面朝大海"],
  },
  // 10. Salt Creek
  10: {
    photos: [
      "/camping-guide/images/camp-10/01.jpg",
      "/camping-guide/images/camp-10/02.jpg",
      "/camping-guide/images/camp-10/03.jpg",
      "/camping-guide/images/camp-10/04.jpg",
      "/camping-guide/images/camp-10/05.jpg",
      "/camping-guide/images/camp-10/06.jpg",
      "/camping-guide/images/camp-10/site-01.jpg",
      "/camping-guide/images/camp-10/site-02.jpg",
      "/camping-guide/images/camp-10/site-03.jpg"
    ],
    captions: ["二战时期海岸炮台内部，炮座遗迹犹存", "从碉堡射击口向外望，远处是森林", "从岸边眺望海中的礁石小岛，松树林立", "透过林间看礁石岛，海水碧绿", "暮色中的胡安·德富卡海峡，对岸山影朦胧", "礁石小岛全景，顶部松树茂密", "林间营位实拍：复古拖挂房车、野餐桌、营椅，针叶林环绕（营地用户上传）", "临海RV营位排，火圈、野餐桌、水电桩一应俱全", "林间碎石帐篷营位，野餐桌与营位号桩，巨杉环抱"],
  },
  // 11. Kalaloch
  11: {
    photos: [
      "/camping-guide/images/camp-11/01.jpg",
      "/camping-guide/images/camp-11/02.jpg",
      "/camping-guide/images/camp-11/03.jpg",
      "/camping-guide/images/camp-11/04.jpg",
      "/camping-guide/images/camp-11/05.jpg",
      "/camping-guide/images/camp-11/06.jpg",
      "/camping-guide/images/camp-11/07.jpg",
      "/camping-guide/images/camp-11/08.jpg",
      "/camping-guide/images/camp-11/09.jpg",
      "/camping-guide/images/camp-11/site-01.jpg",
      "/camping-guide/images/camp-11/site-02.jpg",
      "/camping-guide/images/camp-11/site-03.jpg"
    ],
    captions: ["林间的营位，参天古木环绕", "营地环路，车辆停在林间营位旁", "面朝大海的房车营位，海风吹拂的松树", "营地野餐桌旁的露营者与小狗", "海滩观景步道，游人眺望太平洋", "布满漂流木的 Kalaloch 海滩", "峭壁下的漂流木滩，远处海岸线绵延", "日落时分的海面，远方隐约可见灯塔", "沙滩上巨大的漂流木树根", "林间营位，野餐桌配烧烤架，碎石车位被温带雨林环绕", "林间营位，野餐桌与火圈，森林植被茂密幽深", "云杉下营位，野餐桌，草地与铺装车道"],
  },
  // 12. Astoria KOA
  12: {
    photos: [
      "/camping-guide/images/camp-12/01.jpg",
      "/camping-guide/images/camp-12/02.jpg",
      "/camping-guide/images/camp-12/03.jpg",
      "/camping-guide/images/camp-12/04.jpg",
      "/camping-guide/images/camp-12/05.jpg",
      "/camping-guide/images/camp-12/site-01.jpg",
      "/camping-guide/images/camp-12/site-02.jpg",
      "/camping-guide/images/camp-12/site-03.jpg"
    ],
    captions: ["小木屋前，一家人在烧烤聚餐", "主楼与 KOA 标识，门前停着房车", "林间的小木屋住宿区", "原木主楼入口，门前摆着摇椅", "营地里的蹦蹦枕和迷你高尔夫，孩子们在玩耍", "高级铺装房车营位：石砌火坑、烤架、座椅与水电桩", "帐篷营位区：野餐桌、火圈，草地林间，小木屋在后", "小木屋营位：露台、火坑、烤架，一家人在烧烤聚会"],
  },
  // 13. South Beach
  13: {
    photos: [
      "/camping-guide/images/camp-13/01.jpg",
      "/camping-guide/images/camp-13/02.jpg",
      "/camping-guide/images/camp-13/03.jpg",
      "/camping-guide/images/camp-13/04.jpg",
      "/camping-guide/images/camp-13/05.jpg",
      "/camping-guide/images/camp-13/06.jpg",
      "/camping-guide/images/camp-13/07.jpg",
      "/camping-guide/images/camp-13/08.jpg",
      "/camping-guide/images/camp-13/09.jpg",
      "/camping-guide/images/camp-13/site-01.jpg",
      "/camping-guide/images/camp-13/site-02.jpg",
      "/camping-guide/images/camp-13/site-03.jpg"
    ],
    captions: ["晨雾中的海滨野餐区，远处松林朦胧", "沿着海边步道散步的游人", "面朝大海的野餐桌，一只乌鸦飞过", "警示牌：注意离岸流，漂流木危险", "从观景点俯瞰 South Beach 海滩", "沙滩上堆积的漂流木", "观鲸解说牌，介绍灰鲸迁徙", "被海水漂白的漂流木特写", "鹅卵石滩与漂流木，远处是岬角", "A环房车营位：车辆停靠、野餐桌，海岸松林间铺装车位", "A20营位：铺装车位、双野餐桌、火圈，草地松林", "A环蒙古包营位：车辆、野餐桌、木栅栏，草地林间"],
  },
  // 14. Fort Stevens
  14: {
    photos: [
      "/camping-guide/images/camp-14/01.jpg",
      "/camping-guide/images/camp-14/02.jpg",
      "/camping-guide/images/camp-14/03.jpg",
      "/camping-guide/images/camp-14/04.jpg",
      "/camping-guide/images/camp-14/05.jpg",
      "/camping-guide/images/camp-14/06.jpg",
      "/camping-guide/images/camp-14/07.jpg",
      "/camping-guide/images/camp-14/08.jpg",
      "/camping-guide/images/camp-14/09.jpg",
      "/camping-guide/images/camp-14/site-01.jpg",
      "/camping-guide/images/camp-14/site-02.jpg",
      "/camping-guide/images/camp-14/site-03.jpg"
    ],
    captions: ["游人在 Peter Iredale 沉船旁看日落", "Peter Iredale 沉船残骸特写", "晚霞中的沉船与海滩", "林间的房车营位", "房车营位，遮阳篷下放着露营椅", "历史军事炮台遗址", "二战时期的混凝土营房建筑", "Coffenbury Lake 湖畔的野餐桌", "Coffenbury Lake 湖面倒映着松林", "C环营位C050：铺装车位、野餐桌、火圈与水电桩，草地林间", "D环营位D105：铺装环路、野餐桌、火圈，草地开阔", "D环营位D120：铺装拉通车位、野餐桌、火圈与水电桩"],
  },
  // 15. Beverly Beach
  15: {
    photos: [
      "/camping-guide/images/camp-15/01.jpg",
      "/camping-guide/images/camp-15/02.jpg",
      "/camping-guide/images/camp-15/03.jpg",
      "/camping-guide/images/camp-15/04.jpg",
      "/camping-guide/images/camp-15/05.jpg",
      "/camping-guide/images/camp-15/site-01.jpg",
      "/camping-guide/images/camp-15/site-02.jpg",
      "/camping-guide/images/camp-15/site-03.jpg"
    ],
    captions: ["幽静的林间营位", "Spencer Creek 上的小桥，桥后是房车营区", "Beverly Beach 海滩与远处的岬角", "穿行于蕨类与古木间的林间步道", "从山坡俯瞰大海，野花盛开", "H环林间营位H014：铺装车位、野餐桌、火圈与电桩", "F环林间营位F019：铺装车位、野餐桌、火圈，草地边缘", "B环房车营位B001：全水电桩、房车停靠、野餐桌与火圈"],
  },
  // 16. Cape Disappointment
  16: {
    photos: [
      "/camping-guide/images/camp-16/01.jpg",
      "/camping-guide/images/camp-16/02.jpg",
      "/camping-guide/images/camp-16/03.jpg",
      "/camping-guide/images/camp-16/04.jpg",
      "/camping-guide/images/camp-16/05.jpg",
      "/camping-guide/images/camp-16/06.jpg",
      "/camping-guide/images/camp-16/07.jpg",
      "/camping-guide/images/camp-16/08.jpg",
      "/camping-guide/images/camp-16/09.jpg",
      "/camping-guide/images/camp-16/10.jpg",
      "/camping-guide/images/camp-16/site-01.jpg",
      "/camping-guide/images/camp-16/site-02.jpg",
      "/camping-guide/images/camp-16/site-03.jpg"
    ],
    captions: ["海岬峭壁与汹涌的海浪", "Cape Disappointment 灯塔特写，黑色条纹塔身", "日落时分的 North Head 灯塔", "通往海边的林间小径", "North Head 灯塔，红顶白塔", "仰视 Cape Disappointment 灯塔", "灯塔侧面，塔身斑驳", "礁石海岸与远处的海岬", "Cape Disappointment 灯塔塔身特写", "俯瞰公园内的森林山谷", "房车营位：皮卡拖挂房车停靠，野餐桌、火圈，松林环绕", "40号营位：铺装车位、野餐桌、火圈，雨后湿润草地", "碎石营位：野餐桌、铺装通道，草甸与松林"],
  },
  // 17. Trillium Lake
  17: {
    photos: [
      "/camping-guide/images/camp-17/01.jpg",
      "/camping-guide/images/camp-17/02.jpg",
      "/camping-guide/images/camp-17/03.jpg",
      "/camping-guide/images/camp-17/04.jpg",
      "/camping-guide/images/camp-17/05.jpg",
      "/camping-guide/images/camp-17/06.jpg",
      "/camping-guide/images/camp-17/07.jpg",
      "/camping-guide/images/camp-17/site-01.jpg",
      "/camping-guide/images/camp-17/site-02.jpg",
      "/camping-guide/images/camp-17/site-03.jpg"
    ],
    captions: ["清晨薄雾中 Mt. Hood 倒映在平静湖面，湖畔岩石点缀", "湖畔针叶林环绕，远眺 Mt. Hood，游客在岸边休憩", "日落时 Mt. Hood 染上晚霞，湖面波光粼粼", "环湖步道木栈道鸟瞰，穿过湿地通往湖畔", "湖上泛舟垂钓，背景是茂密的针叶林", "冬季冰封的湖面与远方的 Mt. Hood", "Mt. Hood 完美倒映在平静湖面，皮划艇点缀其中", "针叶林营位4号：野餐桌、带烤架火圈、碎石地面", "针叶林营位7号：野餐桌、火圈，林间开阔扎营面", "针叶林营位10号：野餐桌、火圈，近房车停车道"],
  },
  // 18. Mora
  18: {
    photos: [
      "/camping-guide/images/camp-18/01.jpg",
      "/camping-guide/images/camp-18/02.jpg",
      "/camping-guide/images/camp-18/03.jpg",
      "/camping-guide/images/camp-18/04.jpg",
      "/camping-guide/images/camp-18/05.jpg",
      "/camping-guide/images/camp-18/06.jpg",
      "/camping-guide/images/camp-18/07.jpg",
      "/camping-guide/images/camp-18/08.jpg",
      "/camping-guide/images/camp-18/09.jpg",
      "/camping-guide/images/camp-18/site-01.jpg",
      "/camping-guide/images/camp-18/site-02.jpg",
      "/camping-guide/images/camp-18/site-03.jpg"
    ],
    captions: ["清晨的 Rialto Beach：阳光洒在 James Island 海蚀柱上", "Rialto Beach 沙滩上的漂流木与远方海蚀柱", "Rialto Beach 沙滩与拍岸海浪", "布满青苔的礁石与漂流木", "雾气笼罩的 Rialto Beach 海滩与岬角", "Rialto Beach 日落，海蚀柱剪影", "仰望海蚀柱峭壁，顶部孤树迎风", "Dahdayla Rock 海蚀柱近景", "Quillayute River 平静河面倒映森林", "B环35号营位：野餐桌、火圈，雨林苔藓草地", "C环53号营位：野餐桌、火圈，古老大树环绕", "E环82号营位：野餐桌、火圈，雨林深处碎石营面"],
  },
  // 19. Little Crater Lake
  19: {
    photos: [
      "/camping-guide/images/camp-19/01.jpg",
      "/camping-guide/images/camp-19/02.jpg",
      "/camping-guide/images/camp-19/03.jpg",
      "/camping-guide/images/camp-19/04.jpg",
      "/camping-guide/images/camp-19/05.jpg",
      "/camping-guide/images/camp-19/06.jpg",
      "/camping-guide/images/camp-19/site-01.jpg",
      "/camping-guide/images/camp-19/site-02.jpg",
      "/camping-guide/images/camp-19/site-03.jpg"
    ],
    captions: ["水晶般清澈的碧蓝泉水倒映针叶林，枯木横卧水面", "清澈见底的泉水中，沉没的枯木清晰可见", "高大针叶林倒映在碧绿的湖面上", "湖畔枯树与碧蓝泉水，岸边绿草丛生", "深邃蓝色泉水下，沉木根系清晰可见", "湖面倒映云杉林，水下枯木影影绰绰", "3号营位：野餐桌、带烤架火圈，松针地面针叶林", "7号营位：野餐桌、火圈，林下开阔扎营面", "11号营位：野餐桌、火圈，大树环绕的松针营面"],
  },
  // 20. Tumalo
  20: {
    photos: [
      "/camping-guide/images/camp-20/01.jpg",
      "/camping-guide/images/camp-20/02.jpg",
      "/camping-guide/images/camp-20/03.jpg",
      "/camping-guide/images/camp-20/04.jpg",
      "/camping-guide/images/camp-20/05.jpg",
      "/camping-guide/images/camp-20/06.jpg",
      "/camping-guide/images/camp-20/07.jpg",
      "/camping-guide/images/camp-20/site-01.jpg",
      "/camping-guide/images/camp-20/site-02.jpg",
      "/camping-guide/images/camp-20/site-03.jpg"
    ],
    captions: ["Tumalo State Park 营地入口", "日用区：Deschutes River 河畔草坪与野餐桌", "Deschutes River 流经公园，玄武岩峭壁与松树", "指向 Tumalo 的州立公园路标", "Deschutes River 蜿蜒穿过草甸（Bend 以北）", "Deschutes River 河畔，松树与波光", "Bend 市区段的 Deschutes River 激流", "帐篷营位：橙色帐篷已搭好，野餐桌、火圈，松林沙土地面", "铺装拉通帐篷营位：帐篷、野餐桌、火圈与营位桩", "60号房车营位：房车停靠、野餐桌，碎石地面针叶松林"],
  },
  // 21. Cape Lookout
  21: {
    photos: [
      "/camping-guide/images/camp-21/01.jpg",
      "/camping-guide/images/camp-21/02.jpg",
      "/camping-guide/images/camp-21/03.jpg",
      "/camping-guide/images/camp-21/04.jpg",
      "/camping-guide/images/camp-21/05.jpg",
      "/camping-guide/images/camp-21/06.jpg",
      "/camping-guide/images/camp-21/07.jpg",
      "/camping-guide/images/camp-21/site-01.jpg",
      "/camping-guide/images/camp-21/site-02.jpg",
      "/camping-guide/images/camp-21/site-03.jpg"
    ],
    captions: ["Cape Lookout State Park 日用区海滩", "流经日用区的小溪", "日用区小溪上的木桥", "Cape Lookout 岬角峭壁", "Cape Lookout 岬角与海滩", "悬崖边的 Cape Lookout 岬角", "从岬角俯瞰蜿蜒的海滩与太平洋", "A45营位：野餐桌、火圈，碎石车位，高大针叶林", "B环营位B15：铺装车位、野餐桌、烤架，沙丘草丛环绕", "B20营位：野餐桌、火圈，铺装车位，开阔林地草地"],
  },
  // 22. Farewell Bend
  22: {
    photos: [
      "/camping-guide/images/camp-22/01.jpg",
      "/camping-guide/images/camp-22/02.jpg",
      "/camping-guide/images/camp-22/03.jpg",
      "/camping-guide/images/camp-22/04.jpg",
      "/camping-guide/images/camp-22/05.jpg",
      "/camping-guide/images/camp-22/06.jpg",
      "/camping-guide/images/camp-22/07.jpg",
      "/camping-guide/images/camp-22/site-01.jpg",
      "/camping-guide/images/camp-22/site-02.jpg",
      "/camping-guide/images/camp-22/site-03.jpg"
    ],
    captions: ["Union Creek 附近的 Rogue River 上游激流", "Rogue River Gorge 上游，白水奔腾", "Rogue River 河谷，皮划艇顺流而下", "Rogue River 峡谷俯瞰", "Natural Bridge 步道旁，Rogue River 白水穿过熔岩峡谷", "National Creek 瀑布", "Rogue 国家野生与风景河流标识牌", "10号房车营位：两辆房车停靠，铺装车位，针叶林", "25号营位：铺装通道、野餐桌，林间碎石地面", "40号营位：铺装车位、野餐桌、火圈，高大针叶林"],
  },
  // 23. Crater Lake Mazama
  23: {
    photos: [
      "/camping-guide/images/camp-23/01.jpg",
      "/camping-guide/images/camp-23/02.jpg",
      "/camping-guide/images/camp-23/03.jpg",
      "/camping-guide/images/camp-23/04.jpg",
      "/camping-guide/images/camp-23/05.jpg",
      "/camping-guide/images/camp-23/06.jpg",
      "/camping-guide/images/camp-23/07.jpg",
      "/camping-guide/images/camp-23/08.jpg",
      "/camping-guide/images/camp-23/09.jpg",
      "/camping-guide/images/camp-23/site-01.jpg",
      "/camping-guide/images/camp-23/site-02.jpg",
      "/camping-guide/images/camp-23/site-03.jpg"
    ],
    captions: ["火山口湖历史黑白全景，远眺巫师岛", "火山口湖全景：深蓝湖水环绕巫师岛", "巫师岛倒映在平静的湖面上", "湖畔步道俯瞰巫师岛与深蓝湖水", "从湖畔高处俯瞰巫师岛", "松树间眺望巫师岛与火山口湖", "针叶林间眺望巫师岛", "巫师岛近景，前景是残雪覆盖的岩石", "湖畔游客静坐欣赏火山口湖（历史照片）", "Mazama 村营地 A5 营位：野餐桌、火圈与碎石地面", "Mazama 村营地 A11 营位：野餐桌、火圈与林地营位", "Mazama 村营地 B7 营位：房车位与野餐设施"],
  },
  // 24. Pacific Shores (not recommended for TC)
  24: {
    photos: [
      "/camping-guide/images/camp-24/01.jpg",
      "/camping-guide/images/camp-24/02.jpg",
      "/camping-guide/images/camp-24/03.jpg",
      "/camping-guide/images/camp-24/04.jpg",
      "/camping-guide/images/camp-24/05.jpg",
      "/camping-guide/images/camp-24/site-01.jpg",
      "/camping-guide/images/camp-24/site-02.jpg",
      "/camping-guide/images/camp-24/site-03.jpg"
    ],
    captions: ["度假村接待中心，门前绣球花盛开", "度假村会所与入口门禁", "阳光洒落的林间步道与野餐桌", "房车停靠在园林环绕的营位（164 号营位）", "透过松林远眺亚奎纳角灯塔与蔚蓝太平洋", "滨海房车营位：铺装车位停靠大型房车，面朝太平洋", "铺装营位与水电桩，背景为会所建筑", "164 号铺装营位：水电桩与景观绿化"],
  },
  // 25. Fort Worden
  25: {
    photos: [
      "/camping-guide/images/camp-25/01.jpg",
      "/camping-guide/images/camp-25/02.jpg",
      "/camping-guide/images/camp-25/03.jpg",
      "/camping-guide/images/camp-25/04.jpg",
      "/camping-guide/images/camp-25/05.jpg",
      "/camping-guide/images/camp-25/site-01.jpg",
      "/camping-guide/images/camp-25/site-02.jpg",
      "/camping-guide/images/camp-25/site-03.jpg"
    ],
    captions: ["指挥官官邸博物馆（历史建筑）", "修复后的斯托达德炮台（Amos Stoddard 炮台）", "东门附近观景台俯瞰阿德默勒尔蒂湾，海面帆船点点", "苦樱桃林中的林间步道", "红砖亚历山大城堡与马德罗纳树，海湾为背景", "海滩营地房车营位：碎石垫层、水电桩与野餐桌", "海滩营地房车区，远处为历史要塞建筑", "海滩营地开阔草地上的房车营位"],
  },
  // 26. Grayland Beach
  26: {
    photos: [
      "/camping-guide/images/camp-26/01.jpg",
      "/camping-guide/images/camp-26/02.jpg",
      "/camping-guide/images/camp-26/03.jpg",
      "/camping-guide/images/camp-26/04.jpg",
      "/camping-guide/images/camp-26/05.jpg",
      "/camping-guide/images/camp-26/site-01.jpg",
      "/camping-guide/images/camp-26/site-02.jpg",
      "/camping-guide/images/camp-26/site-03.jpg"
    ],
    captions: ["林间蒙古包营位，配野餐桌与篝火圈", "蒙古包内部：双层木床、绿色沙发床与圆形天窗", "皮卡拖着 Airstream 房车停靠在林间营位", "海滩步道上的长椅面朝大海，云隙透出彩虹", "黄昏时分四人在海滩上挖蛤蜊，海鸥飞过", "营地房车停靠区与水电设施", "113 号林地帐篷营位：野餐桌、火圈与帐篷垫层", "营地圆顶帐篷（yurt）与门前野餐桌"],
  },
  // 27. Wenatchee Confluence
  27: {
    photos: [
      "/camping-guide/images/camp-27/01.jpg",
      "/camping-guide/images/camp-27/02.jpg",
      "/camping-guide/images/camp-27/03.jpg",
      "/camping-guide/images/camp-27/04.jpg",
      "/camping-guide/images/camp-27/05.jpg",
      "/camping-guide/images/camp-27/site-01.jpg",
      "/camping-guide/images/camp-27/site-02.jpg",
      "/camping-guide/images/camp-27/site-03.jpg"
    ],
    captions: ["宽阔草坪上的房车营位，远处是干旱山丘", "湖畔沙滩与长椅，绿草坪向水边延伸", "河畔野餐桌，远眺河流与对岸山丘", "骑行者在园内铺装步道上骑行", "女孩在文纳奇河步行桥上滑滑板，铁桥与山丘为背景", "营地房车营位", "草地上的折叠房车营位", "河畔房车营位：野餐桌、草坪与河景"],
  },
  // 28. Fort Flagler
  28: {
    photos: [
      "/camping-guide/images/camp-28/01.jpg",
      "/camping-guide/images/camp-28/02.jpg",
      "/camping-guide/images/camp-28/03.jpg",
      "/camping-guide/images/camp-28/04.jpg",
      "/camping-guide/images/camp-28/05.jpg",
      "/camping-guide/images/camp-28/site-01.jpg",
      "/camping-guide/images/camp-28/site-02.jpg"
    ],
    captions: ["沙滩与漂流木，房车营地近在咫尺", "参天古木环绕的林间营位与野餐桌", "炮台走廊：Battery Row 沿线的混凝土工事与旧炮架", "幽深的林间步道，两侧蕨类与苔藓", "滑翔伞在海崖上空飞舞，历史建筑与海湾为背景", "营地 C 型房车营位：碎石地面与木栅栏", "营地内的白色露营车与营位标桩"],
  },
  // 29. Hoh Rain Forest
  29: {
    photos: [
      "/camping-guide/images/camp-29/01.jpg",
      "/camping-guide/images/camp-29/02.jpg",
      "/camping-guide/images/camp-29/03.jpg",
      "/camping-guide/images/camp-29/04.jpg",
      "/camping-guide/images/camp-29/05.jpg",
      "/camping-guide/images/camp-29/site-01.jpg",
      "/camping-guide/images/camp-29/site-02.jpg",
      "/camping-guide/images/camp-29/site-03.jpg"
    ],
    captions: ["霍河雨林营地内的房车营位，配野餐桌与露营椅", "营地林间空地的露营椅休憩区", "游客牵着狗狗漫步在营地步道上", "雨林中高大的西部铁杉与盘根错节的树根", "霍河雨林枫树林（Maple Grove）的参天大叶枫", "雨林营地营位（照片编号 054）：苔藓林地与营位空地", "雨林营地营位（照片编号 053）", "雨林营地营位（照片编号 077）"],
  },
  // 30. Moran State Park
  30: {
    photos: [
      "/camping-guide/images/camp-30/01.jpg",
      "/camping-guide/images/camp-30/02.jpg",
      "/camping-guide/images/camp-30/03.jpg",
      "/camping-guide/images/camp-30/04.jpg",
      "/camping-guide/images/camp-30/05.jpg",
      "/camping-guide/images/camp-30/site-01.jpg",
      "/camping-guide/images/camp-30/site-02.jpg",
      "/camping-guide/images/camp-30/site-03.jpg"
    ],
    captions: ["中途营地（Midway Campground）紧邻下水坡道的滨水营位", "南端营地（Southend Campground）8号湖畔营位", "两人在卡斯卡德湖上划皮划艇", "宪法山观景塔远眺克拉克岛与卢米岛", "宪法山观景塔俯瞰卢米岛及周边水道", "Midway 营地湖畔营位：野餐桌、火圈与 Cascade 湖景", "Midway 营地林地帐篷营位", "Midway 营地 46 号营位：帐篷、野餐桌与火圈"],
  },
  // 31. South Beach OR
  31: {
    photos: [
      "/camping-guide/images/camp-31/01.jpg",
      "/camping-guide/images/camp-31/02.jpg",
      "/camping-guide/images/camp-31/03.jpg",
      "/camping-guide/images/camp-31/04.jpg",
      "/camping-guide/images/camp-31/05.jpg",
      "/camping-guide/images/camp-31/site-01.jpg",
      "/camping-guide/images/camp-31/site-02.jpg",
      "/camping-guide/images/camp-31/site-03.jpg"
    ],
    captions: ["穿过海岸林地的库珀岭自然步道", "营地入口处的登记办公室", "园内宁静的池塘", "园内“哥伦比亚”蒙古包住宿", "停在营地林间的露营厢式车", "I013 营位", "松林中的帐篷与房车营位", "林地营位：帐篷、野餐桌与营位标牌"],
  },
  // 32. Nehalem Bay
  32: {
    photos: [
      "/camping-guide/images/camp-32/01.jpg",
      "/camping-guide/images/camp-32/02.jpg",
      "/camping-guide/images/camp-32/03.jpg",
      "/camping-guide/images/camp-32/04.jpg",
      "/camping-guide/images/camp-32/05.jpg",
      "/camping-guide/images/camp-32/site-01.jpg",
      "/camping-guide/images/camp-32/site-02.jpg",
      "/camping-guide/images/camp-32/site-03.jpg"
    ],
    captions: ["Nehalem湾与内哈勒姆河入海口全景", "面向太平洋的沙丘海滩", "退潮时宽阔的海滩与远山", "两名游客在海滩上骑马", "园内的蒙古包住宿", "F019 营位：铺装车道与野餐桌", "C009 营位：松林中的营位", "D030 营位：松林中的铺装营位"],
  },
  // 33. Honeyman
  33: {
    photos: [
      "/camping-guide/images/camp-33/01.jpg",
      "/camping-guide/images/camp-33/02.jpg",
      "/camping-guide/images/camp-33/03.jpg",
      "/camping-guide/images/camp-33/04.jpg",
      "/camping-guide/images/camp-33/05.jpg",
      "/camping-guide/images/camp-33/site-01.jpg",
      "/camping-guide/images/camp-33/site-02.jpg",
      "/camping-guide/images/camp-33/site-03.jpg"
    ],
    captions: ["Cleawox 湖上的钓鱼码头，远眺湖畔沙丘", "林间露营营位", "林中蒙古包（yurt）", "Cleawox 湖与 Honeyman 公园全景", "营地内的林间道路", "194 营位：林地中的铺装贯通车道与水电桩", "林地营位：火圈、野餐桌与停车位", "405 号营位：野餐桌与火圈"],
  },
  // 34. Silver Falls
  34: {
    photos: [
      "/camping-guide/images/camp-34/01.jpg",
      "/camping-guide/images/camp-34/02.jpg",
      "/camping-guide/images/camp-34/03.jpg",
      "/camping-guide/images/camp-34/04.jpg",
      "/camping-guide/images/camp-34/05.jpg",
      "/camping-guide/images/camp-34/site-01.jpg",
      "/camping-guide/images/camp-34/site-02.jpg"
    ],
    captions: ["南瀑布（South Falls），公园最受欢迎的瀑布", "南瀑布（South Falls）的另一视角", "十瀑步道（Trail of Ten Falls）沿线的 Silver Creek 溪流", "营地内的林间徒步道", "流经营地的 Silver Creek 溪流", "林间营位实拍：SUV旁搭起帐篷，有野餐桌和火圈，地面为碎石土", "铺装营位通道，远处可见野餐桌和火圈，营位间距开阔、植被茂密"],
  },
  // 35. Wallowa Lake
  35: {
    photos: [
      "/camping-guide/images/camp-35/01.jpg",
      "/camping-guide/images/camp-35/02.jpg",
      "/camping-guide/images/camp-35/03.jpg",
      "/camping-guide/images/camp-35/04.jpg",
      "/camping-guide/images/camp-35/05.jpg",
      "/camping-guide/images/camp-35/site-01.jpg",
      "/camping-guide/images/camp-35/site-02.jpg"
    ],
    captions: ["瓦洛厄湖湖景，远眺群山", "瓦洛厄湖畔风光", "瓦洛厄湖码头停靠的船只", "公园日间游憩区", "木屋（yurt）旁漫步的鹿", "B20营位：地面漆有营位编号，野餐桌+火圈，草地铺装车位", "E04营位：铺装垫位，野餐桌+火圈，旁有垃圾桶，松林环绕"],
  },
  // 36. Detroit Lake
  36: {
    photos: [
      "/camping-guide/images/camp-36/01.jpg",
      "/camping-guide/images/camp-36/02.jpg",
      "/camping-guide/images/camp-36/03.jpg",
      "/camping-guide/images/camp-36/04.jpg",
      "/camping-guide/images/camp-36/05.jpg",
      "/camping-guide/images/camp-36/site-01.jpg",
      "/camping-guide/images/camp-36/site-02.jpg"
    ],
    captions: ["底特律湖鸟瞰（2015 年 8 月）", "底特律湖码头", "底特律湖宁静的湖面", "冬日雪中的底特律湖", "Blowout Arm 湖湾的瀑布（仅乘船可达）", "林间房车营位：皮卡拖挂着房车，原始森林环绕", "林间营位：野餐桌+帐篷垫+火圈，碎石地面"],
  },
  // 37. Sol Duc
  37: {
    photos: [
      "/camping-guide/images/camp-37/01.jpg",
      "/camping-guide/images/camp-37/02.jpg",
      "/camping-guide/images/camp-37/03.jpg",
      "/camping-guide/images/camp-37/04.jpg",
      "/camping-guide/images/camp-37/05.jpg",
      "/camping-guide/images/camp-37/site-01.jpg",
      "/camping-guide/images/camp-37/site-02.jpg",
      "/camping-guide/images/camp-37/site-03.jpg"
    ],
    captions: ["索尔达克瀑布（Sol Duc Falls）的另一视角", "原始森林中的露营营地（NPS 实拍）", "森林中的 Sol Duc 营地", "温泉度假村的木屋与秋千", "索尔达克温泉（Sol Duc Springs）", "57号营位：野餐桌+火圈+营位桩，右侧可停房车", "16号营位：野餐桌+带烤架的火圈，雨林巨木环绕", "71号营位：帐篷+折叠椅+野餐桌，原始森林环绕"],
  },
  // 38. Harris Beach
  38: {
    photos: [
      "/camping-guide/images/camp-38/01.jpg",
      "/camping-guide/images/camp-38/02.jpg",
      "/camping-guide/images/camp-38/03.jpg",
      "/camping-guide/images/camp-38/04.jpg",
      "/camping-guide/images/camp-38/05.jpg",
      "/camping-guide/images/camp-38/site-01.jpg",
      "/camping-guide/images/camp-38/site-02.jpg",
      "/camping-guide/images/camp-38/site-03.jpg"
    ],
    captions: ["哈里斯海滩的日出", "海蚀柱与山羊岛（Goat Island）", "海滩上的海蚀柱群", "在 Rogue 蒙古包（yurt）露营", "清晨的哈里斯海滩", "A35营位：地面漆有营位编号，铺装贯通式车位，野餐桌+火圈", "碎石房车营位：拖挂房车+皮卡，野餐桌+火圈", "官网A27营位：野餐桌+火圈，草地铺装车位"],
  },
  // 39. Colonial Creek
  39: {
    photos: [
      "/camping-guide/images/camp-39/01.jpg",
      "/camping-guide/images/camp-39/02.jpg",
      "/camping-guide/images/camp-39/03.jpg",
      "/camping-guide/images/camp-39/04.jpg",
      "/camping-guide/images/camp-39/05.jpg",
      "/camping-guide/images/camp-39/site-01.jpg",
      "/camping-guide/images/camp-39/site-02.jpg"
    ],
    captions: ["Diablo Lake 观景点远眺湖泊与群山", "从 20 号州道旁的 Diablo Lake 观景点看湖泊", "Diablo 湖与群山", "Diablo 湖湖面", "Colonial Peak 与 Diablo 湖的 Thunder Arm", "100号营位：营位桩+野餐桌+火圈+帐篷垫，针叶林中", "111号营位：野餐桌+带烤架的火圈+防熊储物箱"],
  },
  // 40. Lincoln Rock
  40: {
    photos: [
      "/camping-guide/images/camp-40/01.jpg",
      "/camping-guide/images/camp-40/02.jpg",
      "/camping-guide/images/camp-40/03.jpg",
      "/camping-guide/images/camp-40/04.jpg",
      "/camping-guide/images/camp-40/05.jpg",
      "/camping-guide/images/camp-40/site-01.jpg",
      "/camping-guide/images/camp-40/site-02.jpg"
    ],
    captions: ["隔着哥伦比亚河眺望林肯岩", "冬日的公园与哥伦比亚河，远处可见 Turtle Rock", "冬日雪中的林肯岩州立公园", "Entiat 湖（哥伦比亚河水库）全景", "Entiat 湖中的 Turtle Rock 岛（公园附近）", "40号铺装房车贯通位：水电桩+野餐桌+火圈，草坪营地", "营地环路旁房车位：野餐桌+火圈，草地开阔、营位间距大"],
  },
  // 41. Fort Casey
  41: {
    photos: [
      "/camping-guide/images/camp-41/01.jpg",
      "/camping-guide/images/camp-41/02.jpg",
      "/camping-guide/images/camp-41/03.jpg",
      "/camping-guide/images/camp-41/04.jpg",
      "/camping-guide/images/camp-41/05.jpg",
      "/camping-guide/images/camp-41/site-01.jpg",
      "/camping-guide/images/camp-41/site-02.jpg"
    ],
    captions: ["沃思炮台（Battery Worth）升起的左侧火炮（10 英寸隐显炮）", "Trevor 炮台（Battery Trevor）", "海军角灯塔（Admiralty Head Light）", "从海崖眺望奥林匹克山脉的日落", "沃思炮台 10 英寸隐显炮特写", "营地俯瞰：滨水房车环，碎石营位一字排开，间距清晰", "滨水营位：房车+野餐桌+折叠椅+火圈，远眺渡轮码头"],
  },
  // 42. Fort Ebey
  42: {
    photos: [
      "/camping-guide/images/camp-42/01.jpg",
      "/camping-guide/images/camp-42/02.jpg",
      "/camping-guide/images/camp-42/03.jpg",
      "/camping-guide/images/camp-42/04.jpg",
      "/camping-guide/images/camp-42/05.jpg",
      "/camping-guide/images/camp-42/site-01.jpg",
      "/camping-guide/images/camp-42/site-02.jpg"
    ],
    captions: ["被常春藤覆盖的1942年混凝土炮台遗址", "林间小径穿过茂密的针叶林，倒木上长满青苔", "布满睡莲的池塘（庞迪拉湖），四周森林环绕", "身穿潜水衣的冲浪者在海浪上驰骋", "海崖草坪上看日落，阳光洒在海峡上", "林间帐篷营位：两顶帐篷+野餐桌+折叠椅+火圈，针叶土质地面", "林间房车营位：拖挂房车展开遮阳篷，碎石地面，植被隔离"],
  },
  // 43. Larrabee
  43: {
    photos: [
      "/camping-guide/images/camp-43/01.jpg",
      "/camping-guide/images/camp-43/02.jpg",
      "/camping-guide/images/camp-43/03.jpg",
      "/camping-guide/images/camp-43/04.jpg",
      "/camping-guide/images/camp-43/05.jpg",
      "/camping-guide/images/camp-43/site-01.jpg",
      "/camping-guide/images/camp-43/site-02.jpg",
      "/camping-guide/images/camp-43/site-03.jpg"
    ],
    captions: ["林间原始营位，野餐桌掩映在绿树之中", "海浪拍打着雕刻般的礁石与漂流木", "从观景点眺望普吉特湾与圣胡安群岛的日落（1970年代档案照片）", "林间草坪上的历史露天剧场（乐队壳）", "岩石海岸线与萨米什湾风景", "林间营位：水电桩+野餐桌+火圈，巨木环绕", "林间营位：野餐桌+巨石+火圈，碎石地面", "7号营位：营位桩+草地贯通车位，两侧植被茂密"],
  },
  // 44. Steamboat Rock
  44: {
    photos: [
      "/camping-guide/images/camp-44/01.jpg",
      "/camping-guide/images/camp-44/02.jpg",
      "/camping-guide/images/camp-44/03.jpg",
      "/camping-guide/images/camp-44/04.jpg",
      "/camping-guide/images/camp-44/05.jpg",
      "/camping-guide/images/camp-44/site-01.jpg",
      "/camping-guide/images/camp-44/site-02.jpg"
    ],
    captions: ["湖畔营地全景，峡谷峭壁为背景", "班克斯湖与远处的汽船岩", "湖畔沙滩游泳区", "船下水坡道与玄武岩峭壁", "湖边垂钓", "Sage环31号营位，铺装房车位带水电桩与野餐桌，高大杨树环绕", "Dune环325号营位，帐篷位带火圈、野餐桌与水龙头，草地开阔"],
  },
  // 45. Bullards Beach
  45: {
    photos: [
      "/camping-guide/images/camp-45/01.jpg",
      "/camping-guide/images/camp-45/02.jpg",
      "/camping-guide/images/camp-45/03.jpg",
      "/camping-guide/images/camp-45/04.jpg",
      "/camping-guide/images/camp-45/05.jpg",
      "/camping-guide/images/camp-45/site-01.jpg",
      "/camping-guide/images/camp-45/site-02.jpg",
      "/camping-guide/images/camp-45/site-03.jpg"
    ],
    captions: ["海岸沙滩风景，海浪与沙丘", "库基尔河灯塔（1896年）与解说牌", "松林中的营地入口", "防波堤上的灯塔与漂流木", "灯塔与海岸风光，沙丘草丛前景", "B环45号营位，铺装房车位带野餐桌与火圈，高大针叶林环绕", "B环51号营位，铺装房车位带水电桩、野餐桌，树木环绕", "B环47号营位，铺装车位带火圈、野餐桌与水电桩，林木茂密"],
  },
  // 46. Champoeg
  46: {
    photos: [
      "/camping-guide/images/camp-46/01.jpg",
      "/camping-guide/images/camp-46/02.jpg",
      "/camping-guide/images/camp-46/03.jpg",
      "/camping-guide/images/camp-46/04.jpg",
      "/camping-guide/images/camp-46/05.jpg",
      "/camping-guide/images/camp-46/site-01.jpg",
      "/camping-guide/images/camp-46/site-02.jpg",
      "/camping-guide/images/camp-46/site-03.jpg"
    ],
    captions: ["林间小木屋住宿区", "十九世纪木谷仓历史建筑", "高大的雪松林", "林间小径", "1901年纪念碑与先锋纪念馆", "林间营位，水滴拖挂房车驻扎，带野餐桌与火圈，草地开阔", "林间营位带水电桩、火圈与野餐桌，地面为草地加碎石", "35号营位，水滴拖挂房车驻扎，营位带野餐桌，林间草地"],
  },
  // 47. Sunset Bay
  47: {
    photos: [
      "/camping-guide/images/camp-47/01.jpg",
      "/camping-guide/images/camp-47/02.jpg",
      "/camping-guide/images/camp-47/03.jpg",
      "/camping-guide/images/camp-47/04.jpg",
      "/camping-guide/images/camp-47/05.jpg",
      "/camping-guide/images/camp-47/site-01.jpg",
      "/camping-guide/images/camp-47/site-02.jpg",
      "/camping-guide/images/camp-47/site-03.jpg"
    ],
    captions: ["海滩边悬崖下的皮划艇与海湾", "退潮后的沙滩与森林覆盖的悬崖", "海湾沙滩、漂流木与悬崖倒影", "潮池礁石与背后的森林悬崖", "潮池奇石与海岸悬崖群", "B环25号帐篷营位，高大云杉林中，带野餐桌与营位桩，地面沙土碎石", "C环1号帐篷营位，帐篷已搭起，带野餐桌、火圈与停车位，蕨类灌木环绕", "D环28号营位，铺装停车位带野餐桌、火圈，临近洗手间建筑"],
  },
  // 48. Cove Palisades
  48: {
    photos: [
      "/camping-guide/images/camp-48/01.jpg",
      "/camping-guide/images/camp-48/02.jpg",
      "/camping-guide/images/camp-48/03.jpg",
      "/camping-guide/images/camp-48/04.jpg",
      "/camping-guide/images/camp-48/05.jpg",
      "/camping-guide/images/camp-48/site-01.jpg",
      "/camping-guide/images/camp-48/site-02.jpg",
      "/camping-guide/images/camp-48/site-03.jpg"
    ],
    captions: ["公园峡谷与毕利奇诺克湖全景", "毕利奇诺克湖峡谷鸟瞰", "Crooked River 日间使用区湖面码头", "湖景与远处的喀斯喀特雪山", "悬崖湖湾边的野花与湖景", "Deschutes营地B环48号营位，铺装车位带野餐桌、火圈，松树与玄武岩", "Deschutes营地C环10号营位，铺装贯通车位带水电桩、双野餐桌，峡谷崖壁为背景", "Deschutes营地B环60号营位，松树林中野餐桌与火圈，沙土地面带巨石"],
  },
  // 49. La Pine
  49: {
    photos: [
      "/camping-guide/images/camp-49/01.jpg",
      "/camping-guide/images/camp-49/02.jpg",
      "/camping-guide/images/camp-49/03.jpg",
      "/camping-guide/images/camp-49/04.jpg",
      "/camping-guide/images/camp-49/05.jpg",
      "/camping-guide/images/camp-49/site-01.jpg",
      "/camping-guide/images/camp-49/site-02.jpg",
      "/camping-guide/images/camp-49/site-03.jpg"
    ],
    captions: ["松林间蜿蜒的得舒特河", "松林环绕的河湾", "平静的河面与松林倒影", "河弯与白色断崖", "阴天里的松林与河景", "林间房车营位，五轮拖挂驻扎，带野餐桌与露营椅，高大黄松环绕", "铺装营位带野餐桌、火圈与水电桩，黄松林立，沙土地面", "黄昏松林营位，带野餐桌、火圈与水电桩，地面为沙土针叶"],
  },
  // 50. Rathtrevor Beach
  50: {
    photos: [
      "/camping-guide/images/camp-50/01.jpg",
      "/camping-guide/images/camp-50/02.jpg",
      "/camping-guide/images/camp-50/03.jpg",
      "/camping-guide/images/camp-50/04.jpg",
      "/camping-guide/images/camp-50/05.jpg",
      "/camping-guide/images/camp-50/site-01.jpg",
      "/camping-guide/images/camp-50/site-02.jpg"
    ],
    captions: ["退潮时绵延一公里的沙滩，潮水退去露出广阔滩涂", "退潮全景与远山，海峡对岸山峦起伏", "高大冷杉林间的帐篷营位", "海滩与树木，海岸线旁的冷杉林与漂流木", "森林中的RV营位，冷杉林中的房车与野餐桌", "步入式草地帐篷区，帐篷林立，公共火圈与折叠椅，高大针叶林环绕", "步入式帐篷营位近景，MSR帐篷与野餐桌，地面为草地加沙土"],
  },
  // 51. Lightning Lake (Manning Park)
  51: {
    photos: [
      "/camping-guide/images/camp-51/01.jpg",
      "/camping-guide/images/camp-51/02.jpg",
      "/camping-guide/images/camp-51/03.jpg",
      "/camping-guide/images/camp-51/04.jpg",
      "/camping-guide/images/camp-51/05.jpg",
      "/camping-guide/images/camp-51/site-01.jpg",
      "/camping-guide/images/camp-51/site-02.jpg"
    ],
    captions: ["闪电湖与群山倒影，湖面如镜倒映云雾山峦", "湖上泛舟，远处是闪电湖彩虹桥", "林间房车营位", "湖畔独木舟，群山与冷杉林环绕", "曼宁公园群山全景", "房车营位，拖挂房车展开遮阳篷，带野餐桌、露营椅与烤架，地面为沙土", "营位火圈燃起篝火，露营者站在一旁，碎石营位地面，针叶林环绕"],
  },
  // 52. Cultus Lake
  52: {
    photos: [
      "/camping-guide/images/camp-52/01.jpg",
      "/camping-guide/images/camp-52/02.jpg",
      "/camping-guide/images/camp-52/03.jpg",
      "/camping-guide/images/camp-52/04.jpg",
      "/camping-guide/images/camp-52/05.jpg",
      "/camping-guide/images/camp-52/site-01.jpg",
      "/camping-guide/images/camp-52/site-02.jpg"
    ],
    captions: ["湖畔沙滩、泳场浮标与码头，雪山为背景", "夜晚的林间营地，帐篷灯火", "湖水与群山", "湖上皮划艇，水面波光粼粼", "湖畔休闲：沙滩与人群聚集的码头", "Clear Creek营地帐篷位，The North Face帐篷扎在苔藓古树林间，车辆停靠营位旁", "营位火圈燃起篝火，林间营位地面为沙土碎石"],
  },
  // 53. Golden Ears (Alouette)
  53: {
    photos: [
      "/camping-guide/images/camp-53/01.jpg",
      "/camping-guide/images/camp-53/02.jpg",
      "/camping-guide/images/camp-53/03.jpg",
      "/camping-guide/images/camp-53/04.jpg",
      "/camping-guide/images/camp-53/05.jpg",
      "/camping-guide/images/camp-53/site-01.jpg",
      "/camping-guide/images/camp-53/site-02.jpg"
    ],
    captions: ["日出时分的阿卢特湖与群山", "林间帐篷营位，苔藓森林环绕", "湖畔砾石沙滩与群山", "泛舟阿卢特湖", "金耳山雪峰全景", "帐篷营位全景，MSR帐篷、野餐桌与烤架，碎石营位地面，古树环绕", "碎石帐篷垫上的MSR帐篷近景，林间营位地面细节"],
  },
  // 54. Kachess Campground
  54: {
    photos: [
      "/camping-guide/images/camp-54/01.jpg",
      "/camping-guide/images/camp-54/02.jpg",
      "/camping-guide/images/camp-54/03.jpg",
      "/camping-guide/images/camp-54/04.jpg",
      "/camping-guide/images/camp-54/05.jpg",
      "/camping-guide/images/camp-54/06.jpg",
      "/camping-guide/images/camp-54/07.jpg",
      "/camping-guide/images/camp-54/08.jpg",
      "/camping-guide/images/camp-54/09.jpg",
      "/camping-guide/images/camp-54/10.jpg"
    ],
    captions: ["Beargrass 环区 37 号营位实拍：林间营位、野餐桌与篝火圈", "Gale Creek 环区 8 号营位实拍，可见 8 号营位牌", "Beargrass 环区 25 号双人营位实拍，可见 25 DOUBLE 营位牌", "Gale Creek 环区 20 号营位实拍，可见 20 号营位牌", "Beargrass 环区 41 号双人营位实拍", "Gale Creek 环区 9 号双人营位实拍", "Beargrass 环区 38 号营位实拍", "Beargrass 环区 34 号营位实拍（2023年实住营位）", "Beargrass 环区 29 号双人营位实拍", "Gale Creek 环区 6 号营位实拍"],
  },
  // 55. Middle Fork Campground
  55: {
    photos: [
      "/camping-guide/images/camp-55/01.jpg",
      "/camping-guide/images/camp-55/02.jpg",
      "/camping-guide/images/camp-55/03.jpg",
      "/camping-guide/images/camp-55/04.jpg",
      "/camping-guide/images/camp-55/05.jpg",
      "/camping-guide/images/camp-55/06.jpg",
      "/camping-guide/images/camp-55/07.jpg",
      "/camping-guide/images/camp-55/08.jpg",
      "/camping-guide/images/camp-55/09.jpg",
      "/camping-guide/images/camp-55/10.jpg"
    ],
    captions: ["30 号营位：野餐桌、烤架、篝火圈与食物储物柜", "23 号营位：野餐桌、篝火圈、储物柜，高大冷杉环绕", "4 号双人营位：两张野餐桌与储物柜", "16 号营位：野餐桌、烤架、储物柜、密林环抱", "10 号营位：野餐桌、篝火圈、食物储物柜", "3 号团体营位：多张野餐桌、篝火圈与巨石", "7 号营位：野餐桌、储物柜、高大针叶林", "21 号营位：林间帐篷垫", "11 号营位：林间帐篷垫", "34 号营位：野餐桌、烤架、篝火圈、储物柜"],
  },
  // 56. Coho Campground
  56: {
    photos: [
      "/camping-guide/images/camp-56/01.jpg",
      "/camping-guide/images/camp-56/02.jpg",
      "/camping-guide/images/camp-56/03.jpg",
      "/camping-guide/images/camp-56/04.jpg",
      "/camping-guide/images/camp-56/05.jpg",
      "/camping-guide/images/camp-56/06.jpg",
      "/camping-guide/images/camp-56/07.jpg",
      "/camping-guide/images/camp-56/08.jpg",
      "/camping-guide/images/camp-56/09.jpg",
      "/camping-guide/images/camp-56/10.jpg"
    ],
    captions: ["Yurt 57 蒙古包外观：绿色帆布圆顶、高架平台、观湖木甲板", "营地入口标识牌 Welcome to Coho Campground", "Wynoochee Lake 湖景", "Yurt 57 内部：沙发床、桌椅、木格栅墙", "Yurt 57 内部：双层床", "Yurt 57 观湖木甲板视角", "环湖步道口与 Working Forest 解说牌", "营地日用野餐区", "湖岸船坡道与停车区", "湖岸线景观"],
  },
};

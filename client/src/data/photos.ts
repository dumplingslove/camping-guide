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
      "/manus-storage/deception_pass_001_04780771.jpg",
      "/manus-storage/deception_pass_002_201b4616.jpg",
      "/manus-storage/deception_pass_003_2e64acf2.jpg",
      "/manus-storage/deception_pass_new1_b19320cd.jpg",
      "/manus-storage/deception_pass_new2_a93f8876.png",
      "/manus-storage/deception_pass_new3_6da1ea14.jpeg",
    ],
    map: "/manus-storage/map_deception_pass_map_2f779bca.jpg",
    captions: ["Loop A 湖畔全接驳位", "Loop A 大型TC停放", "Cranberry Lake 湖景", "Loop B 林间营位", "Quarry Pond 区域", "Loop A 全景"],
  },
  // 2. Millersylvania
  2: {
    photos: [
      "/manus-storage/millersylvania_campsite_tall_trees_5f77f118.jpg",
      "/manus-storage/millersylvania_forest_54e5a1e1.jpg",
      "/manus-storage/millersylvania_rv_site_f5331f87.jpg",
      "/manus-storage/millersylvania_map_1945a770.jpg",
    ],
    map: "/manus-storage/map_millersylvania_map_c811bbad.jpg",
    captions: ["古木环绕的营位", "参天道格拉斯冷杉", "RV营位（水电）", "营地全景"],
  },
  // 3. Alder Lake
  3: {
    photos: [
      "/manus-storage/alder_lake_campsite_114cace5.jpg",
      "/manus-storage/alder_lake_main_campground_af89afc3.jpg",
      "/manus-storage/alder_lake_mt_rainier_view_11c5d2bc.jpg",
    ],
    map: "/manus-storage/map_alder_lake_map_90c58ef8.jpg",
    captions: ["Sunny Beach 全接驳位", "主营地区域", "远眺Mt. Rainier"],
  },
  // 4. Cougar Rock
  4: {
    photos: [
      "/manus-storage/cougar_rock_a001_5d67216f.jpg",
      "/manus-storage/cougar_rock_b005_3e70caab.jpg",
      "/manus-storage/cougar_rock_b029_1b6d813c.jpg",
      "/manus-storage/cougar_rock_new1_768924aa.jpg",
      "/manus-storage/cougar_rock_new2_696bd6d7.jpg",
      "/manus-storage/cougar_rock_new3_366308b9.jpg",
      "/manus-storage/cougar_rock_new4_19a1d3cf.jpg",
      "/manus-storage/cougar_rock_new4_19a1d3cf.jpg",
      "/manus-storage/cougar_rock_new5_3f78b548.jpg",
    ],
    map: "/manus-storage/map_cougar_rock_map_c95cb11f.jpg",
    captions: ["A Loop 入口", "B Loop Site 005", "B Loop Site 029", "B Loop Site 033", "B Loop Site 035", "C Loop Site 001", "D Loop Site 001 河畔", "D Loop Site 006 推荐位", "E Loop Site 030"],
  },
  // 5. Lake Wenatchee
  5: {
    photos: [
      "/manus-storage/lake_wenatchee_001_098ac26b.jpg",
      "/manus-storage/lake_wenatchee_010_e88ee06e.jpg",
      "/manus-storage/lake_wenatchee_020_dba7ec26.jpg",
      "/manus-storage/lake_wenatchee_new1_e0dfbbc5.jpg",
      "/manus-storage/lake_wenatchee_new2_584f3cb3.jpg",
      "/manus-storage/lake_wenatchee_new1_e0dfbbc5.jpg",
    ],
    map: "/manus-storage/map_lake_wenatchee_map_4b8e1b13.jpg",
    captions: ["South Park 湖畔位", "South Park 水电位", "North Park 河畔", "South Park 全景", "营地道路", "North Park 深处"],
  },
  // 6. Ohanapecosh
  6: {
    photos: [
      "/manus-storage/ohanapecosh_photo1_20a0e8f5.jpg",
      "/manus-storage/ohanapecosh_photo2_b086375a.jpg",
      "/manus-storage/ohanapecosh_photo3_e8d122e5.jpg",
    ],
    map: "/manus-storage/map_ohanapecosh_map_f3d2a522.jpg",
    captions: ["A Loop 河畔古木营位", "溪流旁的营位", "Grove of the Patriarchs 步道"],
  },
  // 7. Fairholme
  7: {
    photos: [
      "/manus-storage/fairholme_001_7c353045.jpg",
      "/manus-storage/fairholme_010_da4b3a6f.jpg",
      "/manus-storage/fairholme_020_f9f58060.jpg",
      "/manus-storage/fairholme_new1_f27e20bf.jpeg",
      "/manus-storage/fairholme_new2_2ae8386e.jpg",
      "/manus-storage/fairholme_new3_dbc4f815.jpg",
    ],
    map: "/manus-storage/map_fairholme_map_7983f464.jpg",
    captions: ["湖畔第一排 Site 1", "Site 10 湖景", "Site 20 林间", "内侧 Site 60", "Site 70", "Site 80"],
  },
  // 8. Lake Chelan
  8: {
    photos: [
      "/manus-storage/lake_chelan_photo1_8c59d77c.jpg",
      "/manus-storage/lake_chelan_photo2_11c04ce7.jpg",
      "/manus-storage/lake_chelan_photo3_a7b11af1.jpg",
      "/manus-storage/lake_chelan_new1_9d984653.jpg",
      "/manus-storage/lake_chelan_new2_74f1aa47.jpg",
      "/manus-storage/lake_chelan_new3_7a01414e.jpg",
    ],
    map: "/manus-storage/map_lake_chelan_map_167913f8.jpg",
    captions: ["Lakeside 全接驳位", "湖畔营位全景", "Lake Chelan 湖景", "Upper Loop", "游泳区域", "日落湖景"],
  },
  // 9. Pacific Beach
  9: {
    photos: [
      "/manus-storage/pacific_beach_001_85c6dab4.jpg",
      "/manus-storage/pacific_beach_003_006d5fd9.jpg",
      "/manus-storage/pacific_beach_005_af31f326.jpg",
      "/manus-storage/pacific_beach_010_6a562b23.jpg",
      "/manus-storage/pacific_beach_020_1f50eab2.jpg",
      "/manus-storage/pacific_beach_036_956bed1e.jpg",
    ],
    map: "/manus-storage/map_pacific_beach_map_c2700ba8.jpg",
    captions: ["海景第一排 Site 1", "Site 3 全接驳", "Site 5 海景", "第二排营位", "Site 20", "Site 36 尾部"],
  },
  // 10. Salt Creek
  10: {
    photos: [
      "/manus-storage/salt_creek_bluff_overview_68f35c4c.jpg",
      "/manus-storage/salt_creek_bluff_rv_b32cb1ae.jpg",
      "/manus-storage/salt_creek_bluff_trailer_a89016ff.jpg",
      "/manus-storage/salt_creek_campsite_ca5b2a94.jpg",
      "/manus-storage/salt_creek_coastline_4b3343b0.jpg",
      "/manus-storage/salt_creek_site_with_rv_02577e39.jpg",
    ],
    map: "/manus-storage/map_salt_creek_map_2210fc6c.jpg",
    captions: ["Bluff Sites 海景全景", "Bluff 区RV营位", "Bluff 区Trailer", "Forest Sites 林间", "海岸线风光", "RV营位实景"],
  },
  // 11. Kalaloch
  11: {
    photos: [
      "/manus-storage/kalaloch_a001_03946db8.jpg",
      "/manus-storage/kalaloch_a010_358e4804.jpg",
      "/manus-storage/kalaloch_a029_f103811c.jpg",
      "/manus-storage/kalaloch_new1_492de482.webp",
      "/manus-storage/kalaloch_new1_492de482.webp",
      "/manus-storage/kalaloch_new2_4b75584f.webp",
      "/manus-storage/kalaloch_new1_492de482.webp",
      "/manus-storage/kalaloch_new1_492de482.webp",
      "/manus-storage/kalaloch_new1_492de482.webp",
      "/manus-storage/kalaloch_new3_58121902.jpg",
    ],
    map: "/manus-storage/map_kalaloch_map_70686c2d.png",
    captions: ["A Loop Site 1 海崖", "A Loop Site 10", "A Loop Site 29", "B Loop Site 1", "C Loop", "D Loop Site 13", "海崖全景", "漂流木海滩", "Bluff 步道", "日落海景"],
  },
  // 12. Astoria KOA
  12: {
    photos: [
      "/manus-storage/astoria_koa_photo1_34ccb609.jpg",
      "/manus-storage/astoria_koa_photo2_0b82a1dd.jpg",
      "/manus-storage/astoria_koa_photo3_55b2dc8a.jpg",
    ],
    map: "/manus-storage/map_astoria_koa_map_1b411579.jpg",
    captions: ["Deluxe Pull-through 位", "泳池和水滑梯", "营地设施全景"],
  },
  // 13. South Beach
  13: {
    photos: [
      "/manus-storage/south_beach_photo1_5038699d.jpg",
      "/manus-storage/south_beach_photo2_6a986de7.jpeg",
      "/manus-storage/south_beach_photo3_751265b5.jpg",
      "/manus-storage/south_beach_photo4_b801dae7.jpg",
    ],
    map: "/manus-storage/map_south_beach_map_3c2ccf2e.jpg",
    captions: ["海滩通道", "漂流木海岸", "营位实景", "太平洋全景"],
  },
  // 14. Fort Stevens
  14: {
    photos: [
      "/manus-storage/fort_stevens_photo1_1dc5e673.jpg",
      "/manus-storage/fort_stevens_photo2_2d936aca.jpg",
      "/manus-storage/fort_stevens_photo3_2663dc4d.jpg",
      "/manus-storage/fort_stevens_new1_ecd6a011.jpg",
      "/manus-storage/fort_stevens_new2_29f65367.jpg",
    ],
    map: "/manus-storage/map_fort_stevens_map_7d1acc9e.jpg",
    captions: ["Loop D 全接驳位", "Peter Iredale 沉船", "自行车道", "Loop E 营位", "Coffenbury Lake"],
  },
  // 15. Beverly Beach
  15: {
    photos: [
      "/manus-storage/beverly_beach_photo1_3c55533b.jpg",
      "/manus-storage/beverly_beach_photo2_544ede3b.jpg",
      "/manus-storage/beverly_beach_photo3_c0caf593.jpg",
      "/manus-storage/beverly_beach_photo4_7635b80a.jpg",
    ],
    map: "/manus-storage/map_beverly_beach_map_99a8d914.jpg",
    captions: ["Loop C 全接驳位", "海滩隧道入口", "Spencer Creek", "营地全景"],
  },
  // 16. Cape Disappointment
  16: {
    photos: [
      "/manus-storage/cape_disappointment_001_ef0193a8.jpg",
      "/manus-storage/cape_disappointment_010_9e1fd57c.jpg",
      "/manus-storage/cape_disappointment_050_ba47e0ff.jpg",
      "/manus-storage/cape_disappointment_100_1bb2dee3.jpg",
      "/manus-storage/cape_disappointment_150_66ebd2fd.jpg",
      "/manus-storage/cape_disappointment_193_e6d85af0.jpg",
    ],
    map: "/manus-storage/map_cape_disappointment_map_07f50279.jpg",
    captions: ["Loop A Site 1 全接驳", "Loop A Site 10", "Loop B 林间", "Loop C 海景", "Loop C 深处", "Loop D 帐篷区"],
  },
  // 17. Trillium Lake
  17: {
    photos: [
      "/manus-storage/trillium_lake_photo1_fe84e115.jpg",
      "/manus-storage/trillium_lake_photo2_ab54a9f8.jpg",
      "/manus-storage/trillium_lake_photo3_8c3706b2.jpg",
    ],
    map: "/manus-storage/map_trillium_lake_map_4f4062e7.jpg",
    captions: ["Mt. Hood 湖面倒影", "湖畔营位", "环湖步道"],
  },
  // 18. Mora
  18: {
    photos: [
      "/manus-storage/mora_photo1_fe57745a.webp",
      "/manus-storage/mora_photo2_ec0fc4f5.jpg",
      "/manus-storage/mora_photo3_a8324de5.jpg",
      "/manus-storage/mora_photo4_4667ef25.jpg",
      "/manus-storage/mora_photo5_e8991a45.jpg",
    ],
    map: "/manus-storage/map_mora_map_c4399de3.png",
    captions: ["A Loop 雨林营位", "Rialto Beach 漂流木", "海蚀柱", "雨林步道", "河畔营位"],
  },
  // 19. Little Crater Lake
  19: {
    photos: [
      "/manus-storage/little_crater_lake_photo1_f0fb7ec7.jpg",
      "/manus-storage/little_crater_lake_photo2_cb98da0d.jpg",
      "/manus-storage/little_crater_lake_photo3_1eb5b8ad.jpg",
    ],
    captions: ["水晶清澈的泉水池", "PCT步道入口", "原始森林营位"],
  },
  // 20. Tumalo
  20: {
    photos: [
      "/manus-storage/tumalo_photo1_ee06ae45.jpg",
      "/manus-storage/tumalo_photo2_f5833334.jpg",
      "/manus-storage/tumalo_photo3_81bc9e26.jpg",
    ],
    map: "/manus-storage/map_tumalo_map_25cb913f.jpg",
    captions: ["Loop C 全接驳位", "Deschutes River", "营地游乐场"],
  },
  // 21. Cape Lookout
  21: {
    photos: [
      "/manus-storage/cape_lookout_photo1_3176172c.jpg",
      "/manus-storage/cape_lookout_photo2_52f07080.jpg",
      "/manus-storage/cape_lookout_photo3_c97ec60f.jpg",
    ],
    map: "/manus-storage/map_cape_lookout_map_8a2cb24c.jpg",
    captions: ["C Loop 全接驳位", "海滩步道", "太平洋全景"],
  },
  // 22. Farewell Bend
  22: {
    photos: [
      "/manus-storage/farewell_bend_photo1_d506008e.jpg",
      "/manus-storage/farewell_bend_photo2_f3042605.jpeg",
      "/manus-storage/farewell_bend_photo3_4b568193.jpg",
    ],
    captions: ["Rogue River 河畔营位", "天然游泳区", "林间营位"],
  },
  // 23. Crater Lake Mazama
  23: {
    photos: [
      "/manus-storage/crater_lake_mazama_photo1_6acde40e.jpg",
      "/manus-storage/crater_lake_mazama_photo2_08b8d224.jpg",
      "/manus-storage/crater_lake_mazama_photo3_735f9df4.jpg",
      "/manus-storage/crater_lake_mazama_photo4_d851c33e.jpg",
      "/manus-storage/crater_lake_mazama_photo5_6358eb61.jpg",
    ],
    map: "/manus-storage/map_crater_lake_mazama_map_1336e7b4.jpg",
    captions: ["Crater Lake 全景", "F Loop 有电营位", "Rim Drive 观景点", "Wizard Island", "Mazama Village 营地"],
  },
  // 24. Pacific Shores (not recommended for TC)
  24: {
    photos: [],
  },
};

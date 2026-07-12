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
      "/manus-storage/mObNwivbLDinKDGt_34427a30.jpg",
      "/manus-storage/BXymLsyYLhpCNLpp_b1d6f3b0.jpg",
      "/manus-storage/ZBOTAVUPinRxmiRE_4ca38a14.jpg",
      "/manus-storage/BlOZYifeYusBkaMk_e4f96d7a.jpg",
      "/manus-storage/xcjaYbtWvqWrgSjS_e4a7e4ff.jpg"
    ],
    map: "/manus-storage/map_deception_pass_map_2f779bca.jpg",
    captions: ["Loop A 湖畔全接驳位", "Loop A 大型TC停放", "Cranberry Lake 湖景", "Loop B 林间营位", "Quarry Pond 区域", "Loop A 全景", "Deception Pass 桥景", "Bowman Bay 海岸", "North Beach 沙滩", "森林步道", "日落全景"],
  },
  // 2. Millersylvania
  2: {
    photos: [
      "/manus-storage/millersylvania_campsite_tall_trees_5f77f118.jpg",
      "/manus-storage/millersylvania_forest_54e5a1e1.jpg",
      "/manus-storage/millersylvania_rv_site_f5331f87.jpg",
      "/manus-storage/millersylvania_map_1945a770.jpg",
      "/manus-storage/EnJpoftfMRTCONgv_cb371cc0.jpg",
      "/manus-storage/zhUwhDnIsQJaXBwM_6082910d.jpg",
      "/manus-storage/XABHyksoqOQnjjWh_ee914f9e.jpg",
      "/manus-storage/XRKYkthrFvCdzNqM_0d3256ba.jpg"
    ],
    map: "/manus-storage/map_millersylvania_map_c811bbad.jpg",
    captions: ["古木环绕的营位", "参天道格拉斯冷杉", "RV营位（水电）", "营地全景", "Deep Lake 湖畔", "林间步道", "RV Loop 入口", "古木林荫"],
  },
  // 3. Alder Lake
  3: {
    photos: [
      "/manus-storage/alder_lake_campsite_114cace5.jpg",
      "/manus-storage/alder_lake_main_campground_af89afc3.jpg",
      "/manus-storage/alder_lake_mt_rainier_view_11c5d2bc.jpg",
      "/manus-storage/bPIvqeqlUfkPdRxn_dab076ad.png",
      "/manus-storage/QbRDdZnjXgMEpRpL_9ef5bc8b.jpg",
      "/manus-storage/WMsrieeciCOdSzxz_b2da1aee.jpg",
      "/manus-storage/fZcyTjviIRfXiYDv_3a716200.jpg"
    ],
    map: "/manus-storage/map_alder_lake_map_90c58ef8.jpg",
    captions: ["Sunny Beach 全接驳位", "主营地区域", "远眺Mt. Rainier", "湖畔日落", "Rocky Point 区域", "Alder Lake 全景", "林间营位"],
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
      "/manus-storage/cougar_rock_new5_3f78b548.jpg",
      "/manus-storage/QOBgWqFANsVEzyll_bf990d4a.jpg",
      "/manus-storage/NHRJtxijNebGKEhE_5e5731e4.jpg",
      "/manus-storage/mzKgbyNEZWfKicMm_d9426df3.jpg"
    ],
    map: "/manus-storage/map_cougar_rock_map_c95cb11f.jpg",
    captions: ["A Loop 入口", "B Loop Site 005", "B Loop Site 029", "B Loop Site 033", "B Loop Site 035", "C Loop Site 001", "D Loop Site 001 河畔", "D Loop Site 006 推荐位", "E Loop Site 030", "Cougar Rock 全景", "Paradise 步道入口"],
  },
  // 5. Lake Wenatchee
  5: {
    photos: [
      "/manus-storage/lake_wenatchee_001_098ac26b.jpg",
      "/manus-storage/lake_wenatchee_010_e88ee06e.jpg",
      "/manus-storage/lake_wenatchee_020_dba7ec26.jpg",
      "/manus-storage/lake_wenatchee_new1_e0dfbbc5.jpg",
      "/manus-storage/lake_wenatchee_new2_584f3cb3.jpg",
      "/manus-storage/IcRjhRqDeZXrPFRm_84cf9318.jpg",
      "/manus-storage/mfbcrueRwKmWkGzS_901db1c7.jpg",
      "/manus-storage/AVDbJzulGmNjOxat_02b9e064.jpg",
      "/manus-storage/QdLhNXSvPaaTGaiZ_c6c0354e.jpg"
    ],
    map: "/manus-storage/map_lake_wenatchee_map_4b8e1b13.jpg",
    captions: ["South Park 湖畔位", "South Park 水电位", "North Park 河畔", "South Park 全景", "营地道路", "North Park 深处", "湖畔日落", "Wenatchee River", "山景全景"],
  },
  // 6. Ohanapecosh
  6: {
    photos: [
      "/manus-storage/ohanapecosh_photo1_20a0e8f5.jpg",
      "/manus-storage/ohanapecosh_photo2_b086375a.jpg",
      "/manus-storage/ohanapecosh_photo3_e8d122e5.jpg"
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
      "/manus-storage/UlNftVrbLQmYfmSI_f40511e1.jpg",
      "/manus-storage/itNkmWbKvDpieYBa_1faa3d88.jpg",
      "/manus-storage/nPsfsjVUQnwUXdNd_d9d849d0.jpeg"
    ],
    map: "/manus-storage/map_fairholme_map_7983f464.jpg",
    captions: ["湖畔第一排 Site 1", "Site 10 湖景", "Site 20 林间", "内侧 Site 60", "Site 70", "Site 80", "营地实景", "周边风光", "营位细节"],
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
      "/manus-storage/MBQKLLuqIkiQRsqp_bbf40e1f.jpg",
      "/manus-storage/UwzPtVpvRHhoyfyq_d06b902c.jpg",
      "/manus-storage/OcfBIzjluuUHdyzT_428af4e4.jpg",
      "/manus-storage/DnyNkamSTuyrMCZE_c29f1a45.jpeg"
    ],
    map: "/manus-storage/map_lake_chelan_map_167913f8.jpg",
    captions: ["Lakeside 全接驳位", "湖畔营位全景", "Lake Chelan 湖景", "Upper Loop", "游泳区域", "日落湖景", "营地实景", "周边风光", "营位细节", "步道入口"],
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
      "/manus-storage/klbUGbzsJFjUFpyH_3f328cf4.jpg",
      "/manus-storage/xOfqBxKtLRPoVqvP_80b8a286.jpg",
      "/manus-storage/hIyDXMXwmJMehEXw_8561ad86.jpg",
      "/manus-storage/LqWvLItBZZgZQVku_8a2584b8.jpg"
    ],
    map: "/manus-storage/map_pacific_beach_map_c2700ba8.jpg",
    captions: ["海景第一排 Site 1", "Site 3 全接驳", "Site 5 海景", "第二排营位", "Site 20", "Site 36 尾部", "营地实景", "周边风光", "营位细节", "步道入口"],
  },
  // 10. Salt Creek
  10: {
    photos: [
      "/manus-storage/salt_creek_bluff_overview_68f35c4c.jpg",
      "/manus-storage/salt_creek_bluff_rv_b32cb1ae.jpg",
      "/manus-storage/salt_creek_bluff_trailer_a89016ff.jpg",
      "/manus-storage/salt_creek_campsite_ca5b2a94.jpg",
      "/manus-storage/salt_creek_coastline_4b3343b0.jpg",
      "/manus-storage/salt_creek_site_with_rv_02577e39.jpg"
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
      "/manus-storage/kalaloch_new2_4b75584f.webp",
      "/manus-storage/kalaloch_new3_58121902.jpg",
      "/manus-storage/AWJUEQIZHhCswCJW_0e4b07aa.jpg",
      "/manus-storage/zpmrInySHqMeLFvP_b0a06656.jpg",
      "/manus-storage/JHSYxwsflXlRnzAK_96374144.jpg"
    ],
    map: "/manus-storage/map_kalaloch_map_70686c2d.png",
    captions: ["A Loop Site 1 海崖", "A Loop Site 10", "A Loop Site 29", "B Loop Site 1", "C Loop", "D Loop Site 13", "海崖全景", "漂流木海滩", "Bluff 步道"],
  },
  // 12. Astoria KOA
  12: {
    photos: [
      "/manus-storage/astoria_koa_photo1_34ccb609.jpg",
      "/manus-storage/astoria_koa_photo2_0b82a1dd.jpg",
      "/manus-storage/astoria_koa_photo3_55b2dc8a.jpg"
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
      "/manus-storage/VVvJztakIIvLncRs_e51331f6.jpg",
      "/manus-storage/lXkBontDZTzaDNFr_64b30279.jpg",
      "/manus-storage/qhclEOwlwUOqgMlp_7cbdc9af.jpg",
      "/manus-storage/UWKXBmzgvFPpDCJD_47336ab7.jpg",
      "/manus-storage/frEOBRFIzFhGaGBa_724b5b91.png"
    ],
    map: "/manus-storage/map_south_beach_map_3c2ccf2e.jpg",
    captions: ["海滩通道", "漂流木海岸", "营位实景", "太平洋全景", "营地实景", "周边风光", "营位细节", "步道入口", "设施全景"],
  },
  // 14. Fort Stevens
  14: {
    photos: [
      "/manus-storage/fort_stevens_photo1_1dc5e673.jpg",
      "/manus-storage/fort_stevens_photo2_2d936aca.jpg",
      "/manus-storage/fort_stevens_photo3_2663dc4d.jpg",
      "/manus-storage/fort_stevens_new1_ecd6a011.jpg",
      "/manus-storage/fort_stevens_new2_29f65367.jpg",
      "/manus-storage/VUQzskmggOKwojZQ_44678da2.jpg",
      "/manus-storage/YEbsWnrtKyeyOwuy_0def43a1.jpg",
      "/manus-storage/YFqtMKunpvrqIWdf_5d8af195.jpg",
      "/manus-storage/mqvyPBcTswepazIj_c6f09b9a.jpg"
    ],
    map: "/manus-storage/map_fort_stevens_map_7d1acc9e.jpg",
    captions: ["Loop D 全接驳位", "Peter Iredale 沉船", "自行车道", "Loop E 营位", "Coffenbury Lake", "营地实景", "周边风光", "营位细节", "步道入口"],
  },
  // 15. Beverly Beach
  15: {
    photos: [
      "/manus-storage/beverly_beach_photo1_3c55533b.jpg",
      "/manus-storage/beverly_beach_photo2_544ede3b.jpg",
      "/manus-storage/beverly_beach_photo3_c0caf593.jpg",
      "/manus-storage/beverly_beach_photo4_7635b80a.jpg"
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
      "/manus-storage/PbAymmqAHTNlEtAB_9dc69d3d.jpg",
      "/manus-storage/hweskIUgwchETGdi_1ab7c850.jpeg",
      "/manus-storage/lqzZtjMgCJfMWzJq_1e3e8e69.jpg",
      "/manus-storage/LnPPFoMxgfiksuVH_1daf55d1.jpg"
    ],
    map: "/manus-storage/map_cape_disappointment_map_07f50279.jpg",
    captions: ["Loop A Site 1 全接驳", "Loop A Site 10", "Loop B 林间", "Loop C 海景", "Loop C 深处", "Loop D 帐篷区", "营地实景", "周边风光", "营位细节", "步道入口"],
  },
  // 17. Trillium Lake
  17: {
    photos: [
      "/manus-storage/trillium_lake_photo1_fe84e115.jpg",
      "/manus-storage/trillium_lake_photo2_ab54a9f8.jpg",
      "/manus-storage/trillium_lake_photo3_8c3706b2.jpg",
      "/manus-storage/lPBhnXfPWYgZkHrM_21456f6e.jpg",
      "/manus-storage/SYqVrCYYykkairkW_eb6cbbbc.jpg",
      "/manus-storage/VmqTUxChLRDGktqw_c1bb6d76.jpeg",
      "/manus-storage/sCSzwFZqUbHTMObr_0f3a468d.jpg"
    ],
    map: "/manus-storage/map_trillium_lake_map_4f4062e7.jpg",
    captions: ["Mt. Hood 湖面倒影", "湖畔营位", "环湖步道", "营地实景", "周边风光", "营位细节", "步道入口"],
  },
  // 18. Mora
  18: {
    photos: [
      "/manus-storage/mora_photo1_fe57745a.webp",
      "/manus-storage/mora_photo2_ec0fc4f5.jpg",
      "/manus-storage/mora_photo3_a8324de5.jpg",
      "/manus-storage/mora_photo4_4667ef25.jpg",
      "/manus-storage/mora_photo5_e8991a45.jpg",
      "/manus-storage/KJneQHoHFtSbdCrk_0b7272cb.jpg",
      "/manus-storage/JIoyJsikGVFElPfl_b0f0b033.jpg",
      "/manus-storage/cOHdcxOKDKmjocXo_ab518a75.jpg",
      "/manus-storage/cnoswHSHPqdYQKhd_e98313c9.jpeg"
    ],
    map: "/manus-storage/map_mora_map_c4399de3.png",
    captions: ["A Loop 雨林营位", "Rialto Beach 漂流木", "海蚀柱", "雨林步道", "河畔营位", "营地实景", "周边风光", "营位细节", "步道入口"],
  },
  // 19. Little Crater Lake
  19: {
    map: "/manus-storage/map_little_crater_lake_aa40ef7e.jpg",
    photos: [
      "/manus-storage/little_crater_lake_photo1_f0fb7ec7.jpg",
      "/manus-storage/little_crater_lake_photo2_cb98da0d.jpg",
      "/manus-storage/little_crater_lake_photo3_1eb5b8ad.jpg",
      "/manus-storage/ACggXiKtVQsbKDbE_a519de53.jpg",
      "/manus-storage/LrOgvaHPiuLlBSuy_15cb765a.jpg",
      "/manus-storage/glwuubkyleUkzqMl_46486f47.jpg",
    ],
    captions: ["水晶清澈的泉水池", "PCT步道入口", "原始森林营位", "营地实景", "周边风光", "营位细节"],
  },
  // 20. Tumalo
  20: {
    photos: [
      "/manus-storage/tumalo_photo1_ee06ae45.jpg",
      "/manus-storage/tumalo_photo2_f5833334.jpg",
      "/manus-storage/tumalo_photo3_81bc9e26.jpg",
      "/manus-storage/OEiSoMLIaHStYPiZ_99aa0685.jpg",
      "/manus-storage/UyFTdJDgypMRlLWI_33bb136f.jpg",
      "/manus-storage/RPYaRzvIHZoCAnZT_9254dbfd.jpg",
      "/manus-storage/zyyUlZieZEkYZMSq_4d61dbaf.jpg"
    ],
    map: "/manus-storage/map_tumalo_map_25cb913f.jpg",
    captions: ["Loop C 全接驳位", "Deschutes River", "营地游乐场", "营地实景", "周边风光", "营位细节", "步道入口"],
  },
  // 21. Cape Lookout
  21: {
    photos: [
      "/manus-storage/cape_lookout_photo1_3176172c.jpg",
      "/manus-storage/cape_lookout_photo2_52f07080.jpg",
      "/manus-storage/cape_lookout_photo3_c97ec60f.jpg",
      "/manus-storage/tSSJhQFlSJjAlOqT_a65b7842.jpg",
      "/manus-storage/xXxBlsXggvgcIXmu_2620e228.jpg",
      "/manus-storage/vFqGNZPemMZNlVkU_d117c69b.jpg",
      "/manus-storage/uOHyrqSBiTRzvYNx_a2f4a6cc.jpg"
    ],
    map: "/manus-storage/map_cape_lookout_map_8a2cb24c.jpg",
    captions: ["C Loop 全接驳位", "海滩步道", "太平洋全景", "营地实景", "周边风光", "营位细节", "步道入口"],
  },
  // 22. Farewell Bend
  22: {
    map: "/manus-storage/farewell_bend_map_c4cd61a1.webp",
    photos: [
      "/manus-storage/farewell_bend_photo1_d506008e.jpg",
      "/manus-storage/farewell_bend_photo2_f3042605.jpeg",
      "/manus-storage/farewell_bend_photo3_4b568193.jpg",
      "/manus-storage/jPwdauThSqRNVKzL_f15f94b3.jpg",
      "/manus-storage/hlmbvJoRmBTuXkUD_d017d02d.jpeg",
      "/manus-storage/OFYfQSFbeLYWWaYW_41e8fd26.jpg",
      "/manus-storage/ZFsKjLJgEEDqziPZ_a7d7b81c.png",
    ],
    captions: ["Rogue River 河畔营位", "天然游泳区", "林间营位", "营地实景", "周边风光", "营位细节", "步道入口"],
  },
  // 23. Crater Lake Mazama
  23: {
    photos: [
      "/manus-storage/crater_lake_mazama_photo1_6acde40e.jpg",
      "/manus-storage/crater_lake_mazama_photo2_08b8d224.jpg",
      "/manus-storage/crater_lake_mazama_photo3_735f9df4.jpg",
      "/manus-storage/crater_lake_mazama_photo4_d851c33e.jpg",
      "/manus-storage/crater_lake_mazama_photo5_6358eb61.jpg",
      "/manus-storage/YZDPDsAYaJHRsMWv_09f4b6c6.jpg",
      "/manus-storage/OFYngRawgtOpeNvT_c4a19581.jpg",
      "/manus-storage/gqXFHZoKfECnemvV_2060d7c9.png",
      "/manus-storage/xAqQXiWwlnliCIPe_28ffe2c4.jpg"
    ],
    map: "/manus-storage/map_crater_lake_mazama_map_1336e7b4.jpg",
    captions: ["Crater Lake 全景", "F Loop 有电营位", "Rim Drive 观景点", "Wizard Island", "Mazama Village 营地", "营地实景", "周边风光", "营位细节", "步道入口"],
  },
  // 24. Pacific Shores (not recommended for TC)
  24: {
    map: "/manus-storage/map_pacific_shores_30bffc14.jpg",
    photos: ["/manus-storage/pacific_shores_resort_97b8255b.jpg"],
    captions: ["度假村海景全景"],
  },
  // 25. Fort Worden
  25: {
    photos: ["/manus-storage/fort-worden_18de7e21.jpg"],
    captions: ["沃登堡历史海防堡垒"],
  },
  // 26. Grayland Beach
  26: {
    photos: ["/manus-storage/grayland-beach_e162883c.jpg"],
    captions: ["格雷兰海滩沙丘"],
  },
  // 27. Wenatchee Confluence
  27: {
    photos: ["/manus-storage/wenatchee-confluence_a36ce9ab.jpg"],
    captions: ["两河交汇处"],
  },
  // 28. Fort Flagler
  28: {
    photos: ["/manus-storage/fort-flagler_f50ffadb.webp"],
    captions: ["弗拉格勒堡海岸"],
  },
  // 29. Hoh Rain Forest
  29: {
    photos: ["/manus-storage/hoh-rainforest_0bba0dcc.webp"],
    captions: ["霍雨林苔藓巨树"],
  },
  // 30. Moran State Park
  30: {
    photos: ["/manus-storage/moran-state-park_9f5fe54f.jpg"],
    captions: ["Mt. Constitution观景"],
  },
  // 31. South Beach OR
  31: {
    photos: ["/manus-storage/south-beach-or_9de9877e.jpg"],
    captions: ["南海滩海岸线"],
  },
  // 32. Nehalem Bay
  32: {
    photos: ["/manus-storage/nehalem-bay_256cfc1c.jpg"],
    captions: ["尼哈勒姆湾沙滩"],
  },
  // 33. Honeyman
  33: {
    photos: ["/manus-storage/honeyman_feef5391.jpg"],
    captions: ["沙丘与湖泊"],
  },
  // 34. Silver Falls
  34: {
    photos: ["/manus-storage/silver-falls_3932b390.jpg"],
    captions: ["South Falls瀑布"],
  },
  // 35. Wallowa Lake
  35: {
    photos: ["/manus-storage/wallowa-lake_f6d304c2.jpg"],
    captions: ["瓦洛厄湖与群山"],
  },
  // 36. Detroit Lake
  36: {
    photos: ["/manus-storage/detroit-lake_c1467c2b.jpg"],
    captions: ["底特律湖全景"],
  },
  // 37. Sol Duc
  37: {
    photos: ["/manus-storage/sol_duc_a6d30d29.jpg"],
    captions: ["索尔达克温泉"],
  },
  // 38. Harris Beach
  38: {
    photos: ["/manus-storage/harris_beach_8df381a3.jpg"],
    captions: ["哈里斯海滩海蚀柱"],
  },
  // 39. Colonial Creek
  39: {
    photos: ["/manus-storage/colonial_creek_bcd4d3a3.webp"],
    captions: ["Diablo Lake绿松石湖水"],
  },
  // 40. Lincoln Rock
  40: {
    photos: ["/manus-storage/lincoln_rock_c41605f0.jpg"],
    captions: ["哥伦比亚河畔"],
  },
  // 41. Fort Casey
  41: {
    photos: ["/manus-storage/fort_casey_fd3ad483.jpg"],
    captions: ["凯西堡历史炮台"],
  },
  // 42. Fort Ebey
  42: {
    photos: ["/manus-storage/fort_ebey_4cc204b5.jpg"],
    captions: ["伊贝堡海岸悬崖"],
  },
  // 43. Larrabee
  43: {
    photos: ["/manus-storage/larrabee_fa6480ad.jpg"],
    captions: ["拉腊比海湾"],
  },
  // 44. Steamboat Rock
  44: {
    photos: ["/manus-storage/steamboat_rock_52bb0aba.jpg"],
    captions: ["汽船岩与Banks Lake"],
  },
  // 45. Bullards Beach
  45: {
    photos: ["/manus-storage/bullards_beach_6f40c834.jpg"],
    captions: ["Coquille River灯塔"],
  },
  // 46. Champoeg
  46: {
    photos: ["/manus-storage/champoeg_scenic_68c7341b.jpg"],
    captions: ["Willamette River河畔"],
  },
  // 47. Sunset Bay
  47: {
    photos: ["/manus-storage/sunset_bay_63e00786.jpg"],
    captions: ["日落湾半月形海湾"],
  },
  // 48. Cove Palisades
  48: {
    photos: ["/manus-storage/cove_palisades_53e100ca.jpg"],
    captions: ["峡谷与Lake Billy Chinook"],
  },
  // 49. La Pine
  49: {
    photos: ["/manus-storage/la_pine_114112fe.jpg"],
    captions: ["Ponderosa Pine松林"],
  },
};

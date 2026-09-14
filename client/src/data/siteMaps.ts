// 营地编号营位地图数据（2026-09-14 搜集并逐张目检验证）
// kind: "static" = 站内托管的官方编号营位图PDF；"interactive" = 官方在线选位图（外链）
export interface SiteMapInfo {
  kind: "static" | "interactive";
  /** 站内PDF/图片路径（static）或官方选位图URL（interactive） */
  url: string;
  /** 缩略图（static only） */
  thumb?: string;
  /** 来源名称 */
  source: string;
  /** 官方来源页 */
  sourceUrl: string;
}

const base = import.meta.env.BASE_URL;
export const siteMaps: Record<number, SiteMapInfo> = {
  3: { kind: "static", url: `${base}maps/sites/camp-3.pdf`, thumb: `${base}maps/sites/thumbs/camp-3.jpg`, source: "Tacoma Power（官方手册）", sourceUrl: "https://www.mytpu.org/community-environment-parks/parks-recreation/alder-lake-park/" },
  4: { kind: "static", url: `${base}maps/sites/camp-4.pdf`, thumb: `${base}maps/sites/thumbs/camp-4.jpg`, source: "National Park Service", sourceUrl: "https://nps.gov/mora/planyourvisit/upload/CougarRock2006.pdf" },
  5: { kind: "static", url: `${base}maps/sites/camp-5.pdf`, thumb: `${base}maps/sites/thumbs/camp-5.jpg`, source: "Washington State Parks", sourceUrl: "https://parks.wa.gov/sites/default/files/2025-03/Lake%20Wenatchee%20Overview%20and%20Campground%20Maps.pdf" },
  6: { kind: "static", url: `${base}maps/sites/camp-6.pdf`, thumb: `${base}maps/sites/thumbs/camp-6.jpg`, source: "National Park Service", sourceUrl: "https://nps.gov/mora/planyourvisit/upload/Ohanapecosh7-2019_.pdf" },
  9: { kind: "static", url: `${base}maps/sites/camp-9.pdf`, thumb: `${base}maps/sites/thumbs/camp-9.jpg`, source: "Washington State Parks", sourceUrl: "https://parks.wa.gov/find-parks/state-parks/pacific-beach-state-park" },
  14: { kind: "static", url: `${base}maps/sites/camp-14.pdf`, thumb: `${base}maps/sites/thumbs/camp-14.jpg`, source: "Oregon State Library（官方文件馆藏）", sourceUrl: "https://digitalcollections.library.oregon.gov/assets/displaypdf/324556" },
  15: { kind: "static", url: `${base}maps/sites/camp-15.pdf`, thumb: `${base}maps/sites/thumbs/camp-15.jpg`, source: "Oregon State Parks", sourceUrl: "https://stateparks.oregon.gov/index.cfm?do=main.loadFile&load=_siteFiles%2Fpublications%2F%2Fbeverlybeach-map-cg-11x17.051600.pdf" },
  16: { kind: "static", url: `${base}maps/sites/camp-16.pdf`, thumb: `${base}maps/sites/thumbs/camp-16.jpg`, source: "Washington State Parks", sourceUrl: "https://parks.wa.gov/sites/default/files/2023-02/CapeDisappointmentStatePark_CampsiteMap_02152023.pdf" },
  20: { kind: "static", url: `${base}maps/sites/camp-20.pdf`, thumb: `${base}maps/sites/thumbs/camp-20.jpg`, source: "Oregon State Parks", sourceUrl: "https://stateparks.oregon.gov/index.cfm?do=main.loadFile&load=_siteFiles%2Fpublications%2F%2Ftumalo-campground-map-2022-web.015405.pdf" },
  21: { kind: "static", url: `${base}maps/sites/camp-21.pdf`, thumb: `${base}maps/sites/thumbs/camp-21.jpg`, source: "Oregon State Parks", sourceUrl: "https://stateparks.oregon.gov/index.cfm?do=main.loadFile&load=_siteFiles%2Fpublications%2F%2FCape_Lookout_2020_Map_B_W%28web%29044154.pdf" },
  25: { kind: "static", url: `${base}maps/sites/camp-25.pdf`, thumb: `${base}maps/sites/thumbs/camp-25.jpg`, source: "Washington State Parks", sourceUrl: "https://parks.wa.gov/sites/default/files/2023-10/Fort%20Worden%20Historical%20campground%20full%20color%20Map%206-5-23.pdf" },
  27: { kind: "static", url: `${base}maps/sites/camp-27.pdf`, thumb: `${base}maps/sites/thumbs/camp-27.jpg`, source: "Washington State Parks", sourceUrl: "https://parks.wa.gov/sites/default/files/2025-10/Wenatchee%20Confluence%20Combo%20Map%20Final%20Web%20Version_0.pdf" },
  28: { kind: "static", url: `${base}maps/sites/camp-28.pdf`, thumb: `${base}maps/sites/thumbs/camp-28.jpg`, source: "Washington State Parks", sourceUrl: "https://parks.wa.gov/sites/default/files/2023-05/Fort%20Flagler%20Campground%20Map%205-30-23.pdf" },
  29: { kind: "static", url: `${base}maps/sites/camp-29.png`, thumb: `${base}maps/sites/thumbs/camp-29.jpg`, source: "TheCampingView（第三方）", sourceUrl: "https://picmasa.com/explore/hoh-campground" },
  30: { kind: "static", url: `${base}maps/sites/camp-30.pdf`, thumb: `${base}maps/sites/thumbs/camp-30.jpg`, source: "Washington State Parks", sourceUrl: "https://parks.wa.gov/find-parks/state-parks/moran-state-park" },
  31: { kind: "static", url: `${base}maps/sites/camp-31.pdf`, thumb: `${base}maps/sites/thumbs/camp-31.jpg`, source: "Oregon State Parks", sourceUrl: "https://stateparks.oregon.gov/index.cfm?do=main.loadFile&load=_siteFiles%2Fpublications%2F%2Fsouth-beach-map-2022web.015230.pdf" },
  32: { kind: "static", url: `${base}maps/sites/camp-32.pdf`, thumb: `${base}maps/sites/thumbs/camp-32.jpg`, source: "Oregon State Parks", sourceUrl: "https://stateparks.oregon.gov/index.cfm?do=main.loadFile&load=_siteFiles/publications//nehalem-bay-campground-map-2022-web.014528.pdf" },
  33: { kind: "static", url: `${base}maps/sites/camp-33.pdf`, thumb: `${base}maps/sites/thumbs/camp-33.jpg`, source: "Oregon State Parks", sourceUrl: "https://stateparks.oregon.gov/index.cfm?do=main.loadFile&load=_siteFiles%2Fpublications%2F%2Fhoneyman-summer-map-2022web.013329.pdf" },
  34: { kind: "static", url: `${base}maps/sites/camp-34.pdf`, thumb: `${base}maps/sites/thumbs/camp-34.jpg`, source: "Oregon State Parks", sourceUrl: "https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=151" },
  35: { kind: "static", url: `${base}maps/sites/camp-35.pdf`, thumb: `${base}maps/sites/thumbs/camp-35.jpg`, source: "Oregon State Parks", sourceUrl: "https://stateparks.oregon.gov/index.cfm?do=v.publications" },
  36: { kind: "static", url: `${base}maps/sites/camp-36.pdf`, thumb: `${base}maps/sites/thumbs/camp-36.jpg`, source: "Oregon State Parks", sourceUrl: "https://stateparks.oregon.gov/index.cfm?do=v.publications" },
  38: { kind: "static", url: `${base}maps/sites/camp-38.pdf`, thumb: `${base}maps/sites/thumbs/camp-38.jpg`, source: "Oregon State Parks", sourceUrl: "https://stateparks.oregon.gov/index.cfm?do=v.publications" },
  40: { kind: "static", url: `${base}maps/sites/camp-40.pdf`, thumb: `${base}maps/sites/thumbs/camp-40.jpg`, source: "Washington State Parks", sourceUrl: "https://parks.wa.gov/find-parks/state-parks/lincoln-rock-state-park" },
  41: { kind: "static", url: `${base}maps/sites/camp-41.pdf`, thumb: `${base}maps/sites/thumbs/camp-41.jpg`, source: "Washington State Parks", sourceUrl: "https://parks.wa.gov/find-parks/state-parks/fort-casey-historical-state-park" },
  42: { kind: "static", url: `${base}maps/sites/camp-42.pdf`, thumb: `${base}maps/sites/thumbs/camp-42.jpg`, source: "Washington State Parks", sourceUrl: "https://parks.wa.gov/find-parks/state-parks/fort-ebey-state-park" },
  43: { kind: "static", url: `${base}maps/sites/camp-43.pdf`, thumb: `${base}maps/sites/thumbs/camp-43.jpg`, source: "Washington State Parks", sourceUrl: "https://parks.wa.gov/find-parks/state-parks/larrabee-state-park" },
  44: { kind: "static", url: `${base}maps/sites/camp-44.pdf`, thumb: `${base}maps/sites/thumbs/camp-44.jpg`, source: "Washington State Parks", sourceUrl: "https://parks.wa.gov/find-parks/state-parks/steamboat-rock-state-park" },
  45: { kind: "static", url: `${base}maps/sites/camp-45.pdf`, thumb: `${base}maps/sites/thumbs/camp-45.jpg`, source: "Oregon State Parks", sourceUrl: "https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=50" },
  46: { kind: "static", url: `${base}maps/sites/camp-46.pdf`, thumb: `${base}maps/sites/thumbs/camp-46.jpg`, source: "Oregon State Parks", sourceUrl: "https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=79" },
  47: { kind: "static", url: `${base}maps/sites/camp-47.pdf`, thumb: `${base}maps/sites/thumbs/camp-47.jpg`, source: "Oregon State Parks", sourceUrl: "https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=70" },
  48: { kind: "static", url: `${base}maps/sites/camp-48.pdf`, thumb: `${base}maps/sites/thumbs/camp-48.jpg`, source: "Oregon State Parks", sourceUrl: "https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=24" },
  49: { kind: "static", url: `${base}maps/sites/camp-49.pdf`, thumb: `${base}maps/sites/thumbs/camp-49.jpg`, source: "Oregon State Parks", sourceUrl: "https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=32" },
  50: { kind: "static", url: `${base}maps/sites/camp-50.pdf`, thumb: `${base}maps/sites/thumbs/camp-50.jpg`, source: "官方", sourceUrl: "https://bcparks.ca/explore/parkpgs/rathtrevor/" },
  51: { kind: "static", url: `${base}maps/sites/camp-51.pdf`, thumb: `${base}maps/sites/thumbs/camp-51.jpg`, source: "官方", sourceUrl: "https://bcparks.ca/explore/parkpgs/ecmanning/" },
  52: { kind: "static", url: `${base}maps/sites/camp-52.pdf`, thumb: `${base}maps/sites/thumbs/camp-52.jpg`, source: "Sea to Sky Parks", sourceUrl: "https://seatoskyparks.com/parks/cultus-lake-park/" },
  53: { kind: "static", url: `${base}maps/sites/camp-53.pdf`, thumb: `${base}maps/sites/thumbs/camp-53.jpg`, source: "官方", sourceUrl: "https://bcparks.ca/golden-ears-park/" },
  1: { kind: "interactive", url: "https://washington.goingtocamp.com", source: "WA State Parks 官方预订选位图", sourceUrl: "https://washington.goingtocamp.com" },
  2: { kind: "interactive", url: "https://washington.goingtocamp.com", source: "WA State Parks 官方预订选位图", sourceUrl: "https://washington.goingtocamp.com" },
  7: { kind: "interactive", url: "https://www.recreation.gov/camping/campgrounds/259084", source: "Recreation.gov 官方选位图", sourceUrl: "https://www.recreation.gov/camping/campgrounds/259084" },
  8: { kind: "interactive", url: "https://washington.goingtocamp.com", source: "WA State Parks 官方预订选位图", sourceUrl: "https://washington.goingtocamp.com" },
  10: { kind: "interactive", url: "https://www.clallamcountywa.gov/parks", source: "Clallam County 官方在线预订选位", sourceUrl: "https://www.clallamcountywa.gov/parks" },
  11: { kind: "interactive", url: "https://www.recreation.gov/camping/campgrounds/232464", source: "Recreation.gov 官方选位图", sourceUrl: "https://www.recreation.gov/camping/campgrounds/232464" },
  12: { kind: "interactive", url: "https://koa.com/campgrounds/astoria/", source: "KOA 官网预订选位图", sourceUrl: "https://koa.com/campgrounds/astoria/" },
  17: { kind: "interactive", url: "https://www.recreation.gov/camping/campgrounds/232831", source: "Recreation.gov 官方选位图", sourceUrl: "https://www.recreation.gov/camping/campgrounds/232831" },
  18: { kind: "interactive", url: "https://www.recreation.gov/camping/campgrounds/247591", source: "Recreation.gov 官方选位图", sourceUrl: "https://www.recreation.gov/camping/campgrounds/247591" },
  19: { kind: "interactive", url: "https://www.recreation.gov/camping/campgrounds/233261", source: "Recreation.gov 官方选位图", sourceUrl: "https://www.recreation.gov/camping/campgrounds/233261" },
  22: { kind: "interactive", url: "https://www.recreation.gov/camping/campgrounds/232447", source: "Recreation.gov 官方选位图", sourceUrl: "https://www.recreation.gov/camping/campgrounds/232447" },
  26: { kind: "interactive", url: "https://washington.goingtocamp.com", source: "WA State Parks 官方预订选位图", sourceUrl: "https://washington.goingtocamp.com" },
  39: { kind: "interactive", url: "https://www.recreation.gov/camping/campgrounds/255201", source: "Recreation.gov 官方选位图", sourceUrl: "https://www.recreation.gov/camping/campgrounds/255201" },
  54: { kind: "interactive", url: "https://www.recreation.gov/camping/campgrounds/232064", source: "Recreation.gov 官方选位图", sourceUrl: "https://www.recreation.gov/camping/campgrounds/232064" },
  55: { kind: "interactive", url: "https://www.recreation.gov/camping/campgrounds/234501", source: "Recreation.gov 官方选位图", sourceUrl: "https://www.recreation.gov/camping/campgrounds/234501" },
  56: { kind: "interactive", url: "https://www.recreation.gov/camping/campgrounds/233384", source: "Recreation.gov 官方选位图", sourceUrl: "https://www.recreation.gov/camping/campgrounds/233384" },
};

export function getSiteMap(campId: number): SiteMapInfo | undefined {
  return siteMaps[campId];
}

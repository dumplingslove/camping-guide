/**
 * Campground configuration for the scheduled review update system.
 * Maps each campground to its review data sources.
 * 
 * PRIORITY STRATEGY:
 * - Recreation.gov API is PRIMARY for 10 federal campgrounds (100+ reviews with site/loop data)
 * - KOA website is PRIMARY for 1 KOA campground (50+ reviews)
 * - Google Maps Places API is FALLBACK for the above, and ONLY source for 13 state/private campgrounds
 */

export interface CampgroundReviewConfig {
  id: number;
  name: string;
  /** Google Maps search query for Places API - used as FALLBACK or only source */
  googlePlacesQuery: string;
  /** Recreation.gov campground ID (from URL) - PRIMARY source when available */
  recGovCampgroundId?: string;
  /** KOA reviews page URL - PRIMARY source when available */
  koaReviewsUrl?: string;
}

export const campgroundReviewConfigs: CampgroundReviewConfig[] = [
  // ============================================================================
  // GROUP 1: Recreation.gov campgrounds (9) - PRIMARY: Recreation.gov API
  // These get 100+ reviews with site number, loop, dates, and helpful votes
  // ============================================================================
  { id: 4, name: "Cougar Rock Campground", googlePlacesQuery: "Cougar Rock Campground Mount Rainier", recGovCampgroundId: "232463" },
  { id: 6, name: "Ohanapecosh Campground", googlePlacesQuery: "Ohanapecosh Campground Mount Rainier", recGovCampgroundId: "232465" },
  { id: 7, name: "Fairholme Campground", googlePlacesQuery: "Fairholme Campground Olympic National Park", recGovCampgroundId: "251851" },
  { id: 11, name: "Kalaloch Campground", googlePlacesQuery: "Kalaloch Campground Olympic National Park", recGovCampgroundId: "232464" },
  { id: 17, name: "Trillium Lake Campground", googlePlacesQuery: "Trillium Lake Campground Oregon", recGovCampgroundId: "231957" },
  { id: 18, name: "Mora Campground", googlePlacesQuery: "Mora Campground Olympic National Park", recGovCampgroundId: "247591" },
  { id: 19, name: "Little Crater Lake Campground", googlePlacesQuery: "Little Crater Lake Campground Oregon", recGovCampgroundId: "231956" },
  { id: 22, name: "Farewell Bend Campground", googlePlacesQuery: "Farewell Bend Campground Deschutes Oregon", recGovCampgroundId: "231958" },
  { id: 23, name: "Crater Lake Mazama Village", googlePlacesQuery: "Mazama Village Campground Crater Lake Oregon", recGovCampgroundId: "10337002" },

  // ============================================================================
  // GROUP 2: KOA campground (1) - PRIMARY: KOA website scraping
  // Gets 50+ reviews with detailed text and ratings
  // ============================================================================
  { id: 12, name: "Astoria/Warrenton/Seaside KOA Resort", googlePlacesQuery: "Astoria Warrenton Seaside KOA Resort Oregon", koaReviewsUrl: "https://koa.com/campgrounds/astoria/reviews/?sortBy=DateUpdated" },

  // ============================================================================
  // GROUP 3: State Parks & Private (13) - ONLY source: Google Maps Places API
  // Gets max 5 most recent reviews per call
  // ============================================================================
  // WA State Parks (6)
  { id: 1, name: "Deception Pass State Park", googlePlacesQuery: "Deception Pass State Park Campground Washington" },
  { id: 2, name: "Millersylvania State Park", googlePlacesQuery: "Millersylvania State Park Campground Washington" },
  { id: 5, name: "Lake Wenatchee State Park", googlePlacesQuery: "Lake Wenatchee State Park Campground Washington" },
  { id: 8, name: "Lake Chelan State Park", googlePlacesQuery: "Lake Chelan State Park Campground Washington" },
  { id: 9, name: "Pacific Beach State Park", googlePlacesQuery: "Pacific Beach State Park Campground Washington" },
  { id: 16, name: "Cape Disappointment State Park", googlePlacesQuery: "Cape Disappointment State Park Campground Washington" },
  { id: 13, name: "South Beach Campground (Olympic NP)", googlePlacesQuery: "South Beach Campground Olympic National Park" },

  // Oregon State Parks (4)
  { id: 14, name: "Fort Stevens State Park", googlePlacesQuery: "Fort Stevens State Park Campground Oregon" },
  { id: 15, name: "Beverly Beach State Park", googlePlacesQuery: "Beverly Beach State Park Campground Oregon" },
  { id: 20, name: "Tumalo State Park", googlePlacesQuery: "Tumalo State Park Campground Oregon" },
  { id: 21, name: "Cape Lookout State Park", googlePlacesQuery: "Cape Lookout State Park Campground Oregon" },

  // Tacoma Power / County / Private (3)
  { id: 3, name: "Alder Lake Park", googlePlacesQuery: "Alder Lake Park Campground Eatonville Washington" },
  { id: 10, name: "Salt Creek Recreation Area", googlePlacesQuery: "Salt Creek Recreation Area Campground Port Angeles Washington" },
  { id: 24, name: "Pacific Shores Motorcoach Resort", googlePlacesQuery: "Pacific Shores Motorcoach Resort Newport Oregon" },

  // ============================================================================
  // GROUP 4: NEW CAMPGROUNDS (12) - Added from popularity checklist
  // ============================================================================
  // WA State Parks - New (5)
  { id: 25, name: "Fort Worden Historical State Park", googlePlacesQuery: "Fort Worden State Park Campground Port Townsend Washington" },
  { id: 26, name: "Grayland Beach State Park", googlePlacesQuery: "Grayland Beach State Park Campground Washington" },
  { id: 27, name: "Wenatchee Confluence State Park", googlePlacesQuery: "Wenatchee Confluence State Park Campground Washington" },
  { id: 28, name: "Fort Flagler Historical State Park", googlePlacesQuery: "Fort Flagler State Park Campground Washington" },
  { id: 30, name: "Moran State Park", googlePlacesQuery: "Moran State Park Campground Orcas Island Washington" },
  // NPS - New (1) - Recreation.gov PRIMARY
  { id: 29, name: "Hoh Rain Forest Campground", googlePlacesQuery: "Hoh Rain Forest Campground Olympic National Park", recGovCampgroundId: "247592" },
  // Oregon State Parks - New (5)
  { id: 31, name: "South Beach State Park (OR)", googlePlacesQuery: "South Beach State Park Campground Newport Oregon" },
  { id: 32, name: "Nehalem Bay State Park", googlePlacesQuery: "Nehalem Bay State Park Campground Oregon" },
  { id: 33, name: "Jessie M. Honeyman Memorial State Park", googlePlacesQuery: "Honeyman State Park Campground Florence Oregon" },
  { id: 34, name: "Silver Falls State Park", googlePlacesQuery: "Silver Falls State Park Campground Oregon" },
  { id: 35, name: "Wallowa Lake State Park", googlePlacesQuery: "Wallowa Lake State Park Campground Oregon" },
  { id: 36, name: "Detroit Lake State Recreation Area", googlePlacesQuery: "Detroit Lake State Recreation Area Campground Oregon" },

  // ============================================================================
  // GROUP 5: SECOND-PRIORITY CAMPGROUNDS (13) - Added from popularity checklist
  // ============================================================================
  // NPS / USFS - Recreation.gov PRIMARY (2)
  { id: 37, name: "Sol Duc Hot Springs Campground", googlePlacesQuery: "Sol Duc Hot Springs Campground Olympic National Park", recGovCampgroundId: "251906" },
  { id: 39, name: "Colonial Creek South Campground", googlePlacesQuery: "Colonial Creek South Campground North Cascades", recGovCampgroundId: "232266" },
  // WA State Parks - Google Maps only (5)
  { id: 40, name: "Lincoln Rock State Park", googlePlacesQuery: "Lincoln Rock State Park Campground Washington" },
  { id: 41, name: "Fort Casey Historical State Park", googlePlacesQuery: "Fort Casey State Park Campground Whidbey Island Washington" },
  { id: 42, name: "Fort Ebey State Park", googlePlacesQuery: "Fort Ebey State Park Campground Whidbey Island Washington" },
  { id: 43, name: "Larrabee State Park", googlePlacesQuery: "Larrabee State Park Campground Bellingham Washington" },
  { id: 44, name: "Steamboat Rock State Park", googlePlacesQuery: "Steamboat Rock State Park Campground Washington" },
  // Oregon State Parks - Google Maps only (5)
  { id: 38, name: "Harris Beach State Park", googlePlacesQuery: "Harris Beach State Park Campground Brookings Oregon" },
  { id: 45, name: "Bullards Beach State Park", googlePlacesQuery: "Bullards Beach State Park Campground Oregon" },
  { id: 46, name: "Champoeg State Heritage Area", googlePlacesQuery: "Champoeg State Heritage Area Campground Oregon" },
  { id: 47, name: "Sunset Bay State Park", googlePlacesQuery: "Sunset Bay State Park Campground Oregon" },
  { id: 48, name: "The Cove Palisades State Park", googlePlacesQuery: "The Cove Palisades State Park Campground Oregon" },
  { id: 49, name: "LaPine State Park", googlePlacesQuery: "La Pine State Park Campground Oregon" },
];

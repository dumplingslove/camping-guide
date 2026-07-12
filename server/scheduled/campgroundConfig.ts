/**
 * Campground configuration for the scheduled review update system.
 * Maps each campground to its review data sources.
 * 
 * Strategy:
 * - ALL campgrounds use Google Maps Places API as the primary review source
 * - Recreation.gov campgrounds additionally try the Recreation.gov API as a secondary source
 * - KOA campground additionally scrapes KOA website reviews
 */

export interface CampgroundReviewConfig {
  id: number;
  name: string;
  /** Google Maps search query for Places API - used for ALL campgrounds */
  googlePlacesQuery: string;
  /** Recreation.gov campground ID (from URL) - optional secondary source */
  recGovCampgroundId?: string;
  /** KOA reviews page URL - optional secondary source */
  koaReviewsUrl?: string;
}

export const campgroundReviewConfigs: CampgroundReviewConfig[] = [
  // WA State Parks
  { id: 1, name: "Deception Pass State Park", googlePlacesQuery: "Deception Pass State Park Campground Washington" },
  { id: 2, name: "Millersylvania State Park", googlePlacesQuery: "Millersylvania State Park Campground Washington" },
  { id: 5, name: "Lake Wenatchee State Park", googlePlacesQuery: "Lake Wenatchee State Park Campground Washington" },
  { id: 8, name: "Lake Chelan State Park", googlePlacesQuery: "Lake Chelan State Park Campground Washington" },
  { id: 9, name: "Pacific Beach State Park", googlePlacesQuery: "Pacific Beach State Park Campground Washington" },
  { id: 16, name: "Cape Disappointment State Park", googlePlacesQuery: "Cape Disappointment State Park Campground Washington" },

  // Tacoma Power / County / Private
  { id: 3, name: "Alder Lake Park", googlePlacesQuery: "Alder Lake Park Campground Eatonville Washington" },
  { id: 10, name: "Salt Creek Recreation Area", googlePlacesQuery: "Salt Creek Recreation Area Campground Port Angeles Washington" },
  { id: 24, name: "Pacific Shores Motorcoach Resort", googlePlacesQuery: "Pacific Shores Motorcoach Resort Newport Oregon" },

  // Recreation.gov (federal) - Google Maps primary + Recreation.gov secondary
  { id: 4, name: "Cougar Rock Campground", googlePlacesQuery: "Cougar Rock Campground Mount Rainier", recGovCampgroundId: "232463" },
  { id: 6, name: "Ohanapecosh Campground", googlePlacesQuery: "Ohanapecosh Campground Mount Rainier", recGovCampgroundId: "232464" },
  { id: 7, name: "Fairholme Campground", googlePlacesQuery: "Fairholme Campground Olympic National Park", recGovCampgroundId: "251851" },
  { id: 11, name: "Kalaloch Campground", googlePlacesQuery: "Kalaloch Campground Olympic National Park", recGovCampgroundId: "232464" },
  { id: 13, name: "South Beach Campground", googlePlacesQuery: "South Beach Campground Olympic National Park", recGovCampgroundId: "247591" },
  { id: 17, name: "Trillium Lake Campground", googlePlacesQuery: "Trillium Lake Campground Oregon", recGovCampgroundId: "231957" },
  { id: 18, name: "Mora Campground", googlePlacesQuery: "Mora Campground Olympic National Park", recGovCampgroundId: "232465" },
  { id: 19, name: "Little Crater Lake Campground", googlePlacesQuery: "Little Crater Lake Campground Oregon", recGovCampgroundId: "231956" },
  { id: 22, name: "Farewell Bend Campground", googlePlacesQuery: "Farewell Bend Campground Deschutes Oregon", recGovCampgroundId: "231958" },
  { id: 23, name: "Crater Lake Mazama Village", googlePlacesQuery: "Mazama Village Campground Crater Lake Oregon", recGovCampgroundId: "232463" },

  // Oregon State Parks
  { id: 14, name: "Fort Stevens State Park", googlePlacesQuery: "Fort Stevens State Park Campground Oregon" },
  { id: 15, name: "Beverly Beach State Park", googlePlacesQuery: "Beverly Beach State Park Campground Oregon" },
  { id: 20, name: "Tumalo State Park", googlePlacesQuery: "Tumalo State Park Campground Oregon" },
  { id: 21, name: "Cape Lookout State Park", googlePlacesQuery: "Cape Lookout State Park Campground Oregon" },

  // KOA - Google Maps primary + KOA website secondary
  { id: 12, name: "Astoria/Warrenton/Seaside KOA Resort", googlePlacesQuery: "Astoria Warrenton Seaside KOA Resort Oregon", koaReviewsUrl: "https://koa.com/campgrounds/astoria/reviews/?sortBy=DateUpdated" },
];

/**
 * Review fetcher module - handles fetching reviews from multiple sources:
 * 
 * PRIORITY STRATEGY:
 * - Recreation.gov API is PRIMARY for federal campgrounds (10 campgrounds) - returns 100+ reviews with site/loop data
 * - KOA website is PRIMARY for KOA campground (1 campground) - returns 50+ reviews with detailed text
 * - Google Maps Places API is FALLBACK for all others (13 campgrounds) or when primary fails
 * 
 * For campgrounds with a dedicated source (rec.gov / KOA), we ONLY use Google Maps
 * if the primary source returns 0 results (API down, etc.)
 */

import { ENV } from "../_core/env";
import { CampgroundReviewConfig } from "./campgroundConfig";

export interface FetchedReview {
  author: string;
  rating: number;
  date: string; // YYYY-MM format
  text: string;
  source: string;
  area: string;
  siteNumber: string;
  loop: string;
  siteType: string;
  stayStart: string;
  stayEnd: string;
  helpfulVotes: number;
}

// ============================================================================
// Google Maps Places API (via Manus Forge proxy) - FALLBACK source
// Returns max 5 most recent reviews per call
// ============================================================================

interface GooglePlaceReview {
  author_name?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
  time?: number;
}

interface GooglePlaceResult {
  place_id?: string;
  name?: string;
  rating?: number;
}

export async function fetchGoogleMapsReviews(
  config: CampgroundReviewConfig
): Promise<FetchedReview[]> {
  const forgeBaseUrl = (ENV.forgeApiUrl || "").replace(/\/+$/, "");
  const forgeKey = ENV.forgeApiKey;

  if (!forgeBaseUrl || !forgeKey) {
    console.warn("[ReviewFetcher] Forge API not configured for Google Maps");
    return [];
  }

  try {
    // Step 1: Text search to get place_id
    const searchUrl = `${forgeBaseUrl}/v1/maps/proxy/maps/api/place/textsearch/json?query=${encodeURIComponent(config.googlePlacesQuery)}&key=${forgeKey}`;
    const searchResp = await fetch(searchUrl);
    const searchData = await searchResp.json() as { results?: GooglePlaceResult[] };

    if (!searchData.results || searchData.results.length === 0) {
      console.warn(`[ReviewFetcher] No Google Maps results for: ${config.googlePlacesQuery}`);
      return [];
    }

    const placeId = searchData.results[0].place_id;
    if (!placeId) return [];

    // Step 2: Place details to get reviews (max 5 most recent)
    const detailsUrl = `${forgeBaseUrl}/v1/maps/proxy/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating&key=${forgeKey}`;
    const detailsResp = await fetch(detailsUrl);
    const detailsData = await detailsResp.json() as { result?: { reviews?: GooglePlaceReview[]; rating?: number } };

    const reviews = detailsData.result?.reviews || [];

    return reviews.map((r: GooglePlaceReview) => {
      // Convert Unix timestamp to YYYY-MM
      let dateStr = "";
      if (r.time) {
        const d = new Date(r.time * 1000);
        dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      }

      return {
        author: r.author_name || "Anonymous",
        rating: r.rating || 0,
        date: dateStr,
        text: r.text || "",
        source: "Google Maps",
        area: "",
        siteNumber: "",
        loop: "",
        siteType: "",
        stayStart: "",
        stayEnd: "",
        helpfulVotes: 0,
      };
    });
  } catch (error) {
    console.error(`[ReviewFetcher] Error fetching Google Maps reviews for campground ${config.id}:`, error);
    return [];
  }
}

// ============================================================================
// Recreation.gov API - PRIMARY source for federal campgrounds
// Returns up to 100 reviews per page with detailed site/loop/date metadata
// ============================================================================

interface RecGovReview {
  rating: number;
  title?: string;
  body?: string;
  createdDate?: string;
  siteNumber?: string;
  loop?: string;
  siteType?: string;
  stayStartDate?: string;
  stayEndDate?: string;
  helpfulVotes?: number;
  authorDisplayName?: string;
}

export async function fetchRecreationGovReviews(
  config: CampgroundReviewConfig
): Promise<FetchedReview[]> {
  if (!config.recGovCampgroundId) return [];

  // Try multiple API URL formats since Recreation.gov changes their API periodically
  const urls = [
    `https://www.recreation.gov/api/ratingreview/public?facilityId=${config.recGovCampgroundId}&page=0&size=100&sortBy=MOST_RECENT`,
    `https://www.recreation.gov/api/ratingreview/public?facility_id=${config.recGovCampgroundId}&page=0&size=100`,
    `https://www.recreation.gov/api/camps/campgrounds/${config.recGovCampgroundId}/reviews?page=1&size=100`,
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Referer": `https://www.recreation.gov/camping/campgrounds/${config.recGovCampgroundId}`,
          "Origin": "https://www.recreation.gov",
        },
      });

      if (!response.ok) continue;

      const data = await response.json() as { ratings?: RecGovReview[]; reviews?: RecGovReview[]; error?: string };
      if (data.error) continue;

      const reviews = data.ratings || data.reviews;
      if (!reviews || reviews.length === 0) continue;

      console.log(`[ReviewFetcher] Recreation.gov returned ${reviews.length} reviews for campground ${config.id}`);

      return reviews.map((r: RecGovReview) => {
        const dateStr = r.createdDate ? r.createdDate.substring(0, 7) : "";
        const text = [r.title, r.body].filter(Boolean).join(" - ");

        return {
          author: r.authorDisplayName || "Anonymous",
          rating: r.rating || 0,
          date: dateStr,
          text: text,
          source: "Recreation.gov",
          area: r.loop || "",
          siteNumber: r.siteNumber || "",
          loop: r.loop || "",
          siteType: r.siteType || "",
          stayStart: r.stayStartDate ? r.stayStartDate.substring(0, 10) : "",
          stayEnd: r.stayEndDate ? r.stayEndDate.substring(0, 10) : "",
          helpfulVotes: r.helpfulVotes || 0,
        };
      });
    } catch {
      // Try next URL format
      continue;
    }
  }

  console.warn(`[ReviewFetcher] Recreation.gov API unavailable for campground ${config.id} (${config.name})`);
  return [];
}

// ============================================================================
// KOA Website Scraping - PRIMARY source for KOA campground
// Returns up to 50 reviews per page with detailed text
// ============================================================================

export async function fetchKoaReviews(
  config: CampgroundReviewConfig
): Promise<FetchedReview[]> {
  if (!config.koaReviewsUrl) return [];

  try {
    const response = await fetch(config.koaReviewsUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "text/html",
      },
    });

    if (!response.ok) {
      console.warn(`[ReviewFetcher] KOA returned ${response.status} for campground ${config.id}`);
      return [];
    }

    const html = await response.text();
    const reviews: FetchedReview[] = [];

    // Parse KOA review HTML - reviews are in structured blocks
    const reviewBlocks = html.split(/class="[^"]*review-card[^"]*"/i);

    for (let i = 1; i < reviewBlocks.length && i <= 50; i++) {
      const block = reviewBlocks[i];

      // Extract rating
      let rating = 5;
      const ratingMatch = block.match(/(\d+)\s*(?:out of|\/)\s*5/i) ||
                          block.match(/rating[^>]*>(\d)/i);
      if (ratingMatch) rating = parseInt(ratingMatch[1]);

      // Extract author
      const authorMatch = block.match(/class="[^"]*(?:author|reviewer|name)[^"]*"[^>]*>([^<]+)/i);
      const author = authorMatch ? authorMatch[1].trim() : "KOA Camper";

      // Extract date
      const dateMatch = block.match(/(\w+\s+\d{1,2},?\s*\d{4})/i) ||
                        block.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
      let dateStr = "";
      if (dateMatch) {
        try {
          const d = new Date(dateMatch[1]);
          if (!isNaN(d.getTime())) {
            dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          }
        } catch { /* ignore */ }
      }

      // Extract review text
      const textMatch = block.match(/class="[^"]*(?:review-text|review-body|comment)[^"]*"[^>]*>([\s\S]*?)<\//i);
      const text = textMatch ? textMatch[1].replace(/<[^>]+>/g, "").trim() : "";

      if (text.length > 10) {
        reviews.push({
          author,
          rating,
          date: dateStr,
          text,
          source: "KOA",
          area: "",
          siteNumber: "",
          loop: "",
          siteType: "",
          stayStart: "",
          stayEnd: "",
          helpfulVotes: 0,
        });
      }
    }

    if (reviews.length > 0) {
      console.log(`[ReviewFetcher] KOA returned ${reviews.length} reviews for campground ${config.id}`);
    }

    return reviews;
  } catch (error) {
    console.error(`[ReviewFetcher] Error fetching KOA reviews for campground ${config.id}:`, error);
    return [];
  }
}

// ============================================================================
// Main fetch dispatcher - uses priority-based strategy
// 
// Priority logic:
// 1. If campground has recGovCampgroundId → try Recreation.gov FIRST (primary)
//    - If Rec.gov returns reviews → use those (skip Google Maps)
//    - If Rec.gov fails → fall back to Google Maps
// 2. If campground has koaReviewsUrl → try KOA FIRST (primary)
//    - If KOA returns reviews → use those (skip Google Maps)
//    - If KOA fails → fall back to Google Maps
// 3. All other campgrounds → use Google Maps directly (only source)
// ============================================================================

export async function fetchReviewsForCampground(
  config: CampgroundReviewConfig
): Promise<FetchedReview[]> {
  // Strategy 1: Recreation.gov campgrounds - try Rec.gov first
  if (config.recGovCampgroundId) {
    const recGovReviews = await fetchRecreationGovReviews(config);
    if (recGovReviews.length > 0) {
      // Primary source succeeded - use it exclusively
      console.log(`[ReviewFetcher] Using Recreation.gov as primary for campground ${config.id} (${recGovReviews.length} reviews)`);
      return recGovReviews;
    }
    // Primary failed - fall back to Google Maps
    console.log(`[ReviewFetcher] Recreation.gov failed for campground ${config.id}, falling back to Google Maps`);
    return await fetchGoogleMapsReviews(config);
  }

  // Strategy 2: KOA campground - try KOA first
  if (config.koaReviewsUrl) {
    const koaReviews = await fetchKoaReviews(config);
    if (koaReviews.length > 0) {
      // Primary source succeeded - use it exclusively
      console.log(`[ReviewFetcher] Using KOA as primary for campground ${config.id} (${koaReviews.length} reviews)`);
      return koaReviews;
    }
    // Primary failed - fall back to Google Maps
    console.log(`[ReviewFetcher] KOA failed for campground ${config.id}, falling back to Google Maps`);
    return await fetchGoogleMapsReviews(config);
  }

  // Strategy 3: All other campgrounds - Google Maps is the only source
  console.log(`[ReviewFetcher] Using Google Maps for campground ${config.id} (no dedicated source)`);
  return await fetchGoogleMapsReviews(config);
}

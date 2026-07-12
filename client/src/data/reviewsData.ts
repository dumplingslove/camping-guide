// Auto-generated from Recreation.gov and Google Maps reviews
// Total: 4674+ reviews across 36 campgrounds
// Reviews are lazy-loaded per campground to avoid loading 2.2MB upfront

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  siteNumber: string;
  loop: string;
  siteType: string;
  stayStart: string;
  stayEnd: string;
  helpfulVotes: number;
  source: string;
  area?: string;
}

export interface CampgroundReviews {
  campgroundName: string;
  totalReviewsOnPlatform: number;
  googleRating?: number;
  source: string;
  reviews: Review[];
}

export type ReviewsMap = Record<string, CampgroundReviews>;

// Cache for loaded reviews
const reviewsCache: Record<string, CampgroundReviews> = {};

/**
 * Lazy-load reviews for a specific campground.
 * Each campground's reviews are in a separate JSON file to avoid loading 2.2MB upfront.
 */
export async function getReviewsForCampground(campgroundId: number): Promise<CampgroundReviews | null> {
  const key = String(campgroundId);
  if (reviewsCache[key]) {
    return reviewsCache[key];
  }
  try {
    const module = await import(`./reviews/camp_${campgroundId}.json`);
    const data = module.default as CampgroundReviews;
    reviewsCache[key] = data;
    return data;
  } catch (e) {
    console.warn(`No reviews found for campground ${campgroundId}`, e);
    return null;
  }
}

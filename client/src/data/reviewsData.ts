// Auto-generated from Recreation.gov and Google Maps reviews
// Total: 4659 reviews across 24 campgrounds

import reviewsData from "./reviews.json";

export interface Review {
  id: string;
  rating: number;
  text: string;
  author: string;
  date: string;
  siteNumber: string;
  loop: string;
  siteType: string;
  stayStart: string;
  stayEnd: string;
  helpfulVotes: number;
  source: string;
}

export interface CampgroundReviews {
  campgroundName: string;
  totalReviewsOnPlatform: number;
  googleRating?: number;
  source: string;
  reviews: Review[];
}

export type ReviewsMap = Record<string, CampgroundReviews>;

export const reviews: ReviewsMap = reviewsData as unknown as ReviewsMap;

export function getReviewsForCampground(campgroundId: number): CampgroundReviews | null {
  return reviews[String(campgroundId)] || null;
}

// Auto-generated from review distillation of 4,659 real user reviews
// Sources: Recreation.gov (9 campgrounds), Google Maps (14 campgrounds)

import insightsData from "./reviewInsights.json";

export interface SiteRecommendation {
  site: string;
  reason: string;
}

export interface AreaInsight {
  area: string;
  insight: string;
}

export interface ReviewActivity {
  name: string;
  description: string;
}

export interface CampgroundInsights {
  tags: string[];
  areaInsights: AreaInsight[];
  recommendedSites: SiteRecommendation[];
  avoidSites: SiteRecommendation[];
  cellCoverage: string;
  wildlifeWarnings: string;
  facilitiesQuality: string;
  noiseIssues: string;
  activitiesFromReviews: ReviewActivity[];
  bestSeasonTips: string;
}

export type InsightsMap = Record<string, CampgroundInsights>;

export const reviewInsights: InsightsMap = insightsData as unknown as InsightsMap;

export function getInsightsForCampground(campgroundId: number): CampgroundInsights | null {
  return reviewInsights[String(campgroundId)] || null;
}

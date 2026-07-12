import { describe, it, expect } from "vitest";
import { campgroundReviewConfigs } from "./campgroundConfig";

describe("campgroundReviewConfigs", () => {
  it("should have 36 campground configurations", () => {
    expect(campgroundReviewConfigs).toHaveLength(36);
  });

  it("should have unique IDs", () => {
    const ids = campgroundReviewConfigs.map(c => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(36);
  });

  it("should have googlePlacesQuery for all campgrounds", () => {
    for (const config of campgroundReviewConfigs) {
      expect(config.googlePlacesQuery).toBeTruthy();
    }
  });

  it("should have recGovCampgroundId for federal campgrounds", () => {
    const recGov = campgroundReviewConfigs.filter(c => c.recGovCampgroundId);
    expect(recGov.length).toBe(11);
    for (const config of recGov) {
      expect(config.recGovCampgroundId).toMatch(/^\d+$/);
    }
  });

  it("should have koaReviewsUrl for KOA campground", () => {
    const koa = campgroundReviewConfigs.filter(c => c.koaReviewsUrl);
    expect(koa.length).toBe(1);
    expect(koa[0].koaReviewsUrl).toContain("koa.com");
  });
});

describe("mergeReviews logic", () => {
  function mergeReviews(existing: any[], newReviews: any[]) {
    const existingKeys = new Set(
      existing.map((r: any) => `${r.author}|${r.date}|${r.text.substring(0, 50)}`)
    );
    const uniqueNew = newReviews.filter((r: any) => {
      const key = `${r.author}|${r.date}|${r.text.substring(0, 50)}`;
      return !existingKeys.has(key);
    });
    return { merged: [...uniqueNew, ...existing], addedCount: uniqueNew.length };
  }

  it("should deduplicate reviews by author+date+text prefix", () => {
    const existing = [
      { author: "John", date: "2024-06", text: "Great campground with beautiful views and nice facilities." },
      { author: "Jane", date: "2024-07", text: "Loved the hiking trails nearby." },
    ];
    const newReviews = [
      { author: "John", date: "2024-06", text: "Great campground with beautiful views and nice facilities." },
      { author: "Bob", date: "2024-08", text: "Amazing sunset views from site 15." },
    ];

    const { merged, addedCount } = mergeReviews(existing, newReviews);
    expect(addedCount).toBe(1);
    expect(merged.length).toBe(3);
    expect(merged[0].author).toBe("Bob");
  });

  it("should handle empty existing reviews", () => {
    const existing: any[] = [];
    const newReviews = [
      { author: "Alice", date: "2024-05", text: "First time camping here, wonderful experience." },
    ];

    const { merged, addedCount } = mergeReviews(existing, newReviews);
    expect(addedCount).toBe(1);
    expect(merged.length).toBe(1);
  });

  it("should handle empty new reviews", () => {
    const existing = [
      { author: "John", date: "2024-06", text: "Great campground." },
    ];
    const newReviews: any[] = [];

    const { merged, addedCount } = mergeReviews(existing, newReviews);
    expect(addedCount).toBe(0);
    expect(merged.length).toBe(1);
  });
});

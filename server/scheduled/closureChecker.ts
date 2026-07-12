/**
 * Closure Status Checker
 * 
 * Periodically checks whether 2026-restricted campgrounds have reopened
 * by checking their booking URLs for availability signals.
 * 
 * This runs as part of the weekly scheduled update.
 */

import { storagePut, storageGetSignedUrl } from "../storage";

const CLOSURE_STATUS_KEY = "reviews/closure_status.json";

// Restricted campground configurations
interface RestrictedCampground {
  id: number;
  name: string;
  tier: "2026受限";
  closureInfo: {
    reason: string;
    closedSince: string;
    expectedReopen: string;
    source: string;
    lastChecked: string;
  };
  /** URLs to check for reopening signals */
  checkUrls: string[];
  /** Keywords that indicate the campground is open for booking */
  openSignals: string[];
}

const restrictedCampgrounds: RestrictedCampground[] = [
  {
    id: 6,
    name: "Ohanapecosh Campground",
    tier: "2026受限",
    closureInfo: {
      reason: "污水系统更换+营地全面整修（因长期过度使用）",
      closedSince: "2025-04",
      expectedReopen: "2026-11月后（施工预计持续至 2026年11月）",
      source: "NPS Mount Rainier Park Construction Page",
      lastChecked: "2026-07-12",
    },
    checkUrls: [
      "https://www.recreation.gov/camping/campgrounds/232464",
    ],
    openSignals: ["available", "book now", "reserve", "open for reservations"],
  },
  {
    id: 16,
    name: "Cape Disappointment State Park",
    tier: "2026受限",
    closureInfo: {
      reason: "营地全面翻新施工（步道、设施、排水系统升级）",
      closedSince: "2025-09-16",
      expectedReopen: "2026年夏季（预计晚春或初夏重新开放）",
      source: "WA State Parks 官网项目页 + Chinook Observer 2026年2月报道",
      lastChecked: "2026-07-12",
    },
    checkUrls: [
      "https://washington.goingtocamp.com/CapeDisappointmentStatePark",
    ],
    openSignals: ["available", "book", "reserve", "select date"],
  },
  {
    id: 21,
    name: "Cape Lookout State Park",
    tier: "2026受限",
    closureInfo: {
      reason: "营地施工整修（排水、步道、日用区域升级）",
      closedSince: "2025-10",
      expectedReopen: "2026年秋季（施工从夏季推迟至秋季，预计8月后开始关闭）",
      source: "Oregon State Parks 特别通知 + Tillamook Headlight Herald 2025年2月报道",
      lastChecked: "2026-07-12",
    },
    checkUrls: [
      "https://www.reserveamerica.com/explore/cape-lookout-state-park/OR/140006/overview",
    ],
    openSignals: ["available", "book", "reserve", "select date", "check availability"],
  },
];

export interface ClosureStatusResult {
  campgroundId: number;
  name: string;
  status: "still_closed" | "possibly_reopened" | "check_failed";
  details: string;
  checkedAt: string;
}

/**
 * Check if a restricted campground has reopened by fetching its booking page
 * and looking for availability signals.
 */
async function checkSingleCampground(camp: RestrictedCampground): Promise<ClosureStatusResult> {
  const checkedAt = new Date().toISOString();
  
  for (const url of camp.checkUrls) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; CampGuide/1.0; review-checker)",
        },
      });
      clearTimeout(timeout);
      
      if (!response.ok) {
        continue;
      }
      
      const html = await response.text();
      const lowerHtml = html.toLowerCase();
      
      // Check for closure/construction signals
      const closureSignals = ["closed", "construction", "temporarily closed", "closure", "under renovation"];
      const hasClosureSignal = closureSignals.some(s => lowerHtml.includes(s));
      
      // Check for open signals
      const hasOpenSignal = camp.openSignals.some(s => lowerHtml.includes(s.toLowerCase()));
      
      // If we find open signals AND no closure signals, it might be reopened
      if (hasOpenSignal && !hasClosureSignal) {
        return {
          campgroundId: camp.id,
          name: camp.name,
          status: "possibly_reopened",
          details: `Booking page shows availability signals. Manual verification recommended.`,
          checkedAt,
        };
      }
      
      return {
        campgroundId: camp.id,
        name: camp.name,
        status: "still_closed",
        details: hasClosureSignal 
          ? "Closure/construction signals still present on booking page." 
          : "No availability signals found on booking page.",
        checkedAt,
      };
    } catch (error) {
      // Continue to next URL if this one fails
      continue;
    }
  }
  
  return {
    campgroundId: camp.id,
    name: camp.name,
    status: "check_failed",
    details: "Could not reach any booking URLs for status check.",
    checkedAt,
  };
}

/**
 * Check all restricted campgrounds and save results to S3.
 * Called as part of the weekly scheduled update.
 */
export async function checkClosureStatus(): Promise<ClosureStatusResult[]> {
  console.log("[ClosureChecker] Checking status of restricted campgrounds...");
  
  const results: ClosureStatusResult[] = [];
  
  for (const camp of restrictedCampgrounds) {
    const result = await checkSingleCampground(camp);
    results.push(result);
    console.log(`[ClosureChecker] ${camp.name}: ${result.status} - ${result.details}`);
  }
  
  // Save results to S3
  const statusData = {
    lastChecked: new Date().toISOString(),
    results,
    restrictedCampgrounds: restrictedCampgrounds.map(c => ({
      id: c.id,
      name: c.name,
      closureInfo: c.closureInfo,
    })),
  };
  
  await storagePut(
    CLOSURE_STATUS_KEY,
    Buffer.from(JSON.stringify(statusData, null, 2)),
    "application/json"
  );
  
  // Log any that might have reopened
  const reopened = results.filter(r => r.status === "possibly_reopened");
  if (reopened.length > 0) {
    console.log(`[ClosureChecker] ⚠️ ${reopened.length} campground(s) may have reopened! Manual verification needed:`);
    reopened.forEach(r => console.log(`  - ${r.name}: ${r.details}`));
  }
  
  return results;
}

/**
 * Get the list of restricted campground IDs for reference
 */
export function getRestrictedCampgroundIds(): number[] {
  return restrictedCampgrounds.map(c => c.id);
}

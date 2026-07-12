import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock storage module
vi.mock("../storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ key: "test", url: "http://test" }),
  storageGetSignedUrl: vi.fn().mockResolvedValue("http://test-url"),
}));

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

import { checkClosureStatus, getRestrictedCampgroundIds } from "./closureChecker";

describe("closureChecker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns restricted campground IDs", () => {
    const ids = getRestrictedCampgroundIds();
    expect(ids).toContain(6);   // Ohanapecosh
    expect(ids).toContain(16);  // Cape Disappointment
    expect(ids).toHaveLength(2);
  });

  it("reports still_closed when closure signals found", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve("<html><body>This campground is temporarily closed for construction. Check back later.</body></html>"),
    });

    const results = await checkClosureStatus();
    expect(results).toHaveLength(2);
    
    const ohanapecosh = results.find(r => r.campgroundId === 6);
    expect(ohanapecosh).toBeDefined();
    expect(ohanapecosh!.status).toBe("still_closed");
    expect(ohanapecosh!.details).toContain("Closure");
  });

  it("reports possibly_reopened when open signals found without closure signals", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve("<html><body>Welcome! Sites are available for booking. Reserve your spot today!</body></html>"),
    });

    const results = await checkClosureStatus();
    expect(results).toHaveLength(2);
    
    // All should show possibly_reopened since the mock returns availability signals
    results.forEach(r => {
      expect(r.status).toBe("possibly_reopened");
    });
  });

  it("reports check_failed when fetch fails", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    const results = await checkClosureStatus();
    expect(results).toHaveLength(2);
    
    results.forEach(r => {
      expect(r.status).toBe("check_failed");
      expect(r.details).toContain("Could not reach");
    });
  });

  it("reports still_closed when no signals found at all", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve("<html><body>Page content with no relevant keywords</body></html>"),
    });

    const results = await checkClosureStatus();
    expect(results).toHaveLength(2);
    
    results.forEach(r => {
      expect(r.status).toBe("still_closed");
      expect(r.details).toContain("No availability signals");
    });
  });

  it("reports check_failed when HTTP response is not ok", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      text: () => Promise.resolve("Not found"),
    });

    const results = await checkClosureStatus();
    expect(results).toHaveLength(2);
    
    results.forEach(r => {
      expect(r.status).toBe("check_failed");
    });
  });
});

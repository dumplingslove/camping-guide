import { useState, useRef, useEffect, useCallback } from "react";
import { MapView } from "@/components/Map";
import { getInsightsForCampground } from "@/data/reviewInsightsData";
import { getReviewsForCampground, type Review } from "@/data/reviewsData";
import { MapPin, ThumbsUp, ThumbsDown, X, Star, ChevronDown, ChevronUp } from "lucide-react";

interface SiteMapSectionProps {
  campgroundId: number;
  campgroundName: string;
  lat?: number;
  lng?: number;
}

export function SiteMapSection({ campgroundId, campgroundName, lat, lng }: SiteMapSectionProps) {
  const insights = getInsightsForCampground(campgroundId);
  const [selectedSite, setSelectedSite] = useState<{ site: string; reason: string; type: "good" | "bad" } | null>(null);
  const [siteReviews, setSiteReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  if (!insights || !lat || !lng) return null;
  if (insights.recommendedSites.length === 0 && insights.avoidSites.length === 0) return null;

  const handleSiteClick = async (site: string, reason: string, type: "good" | "bad") => {
    setSelectedSite({ site, reason, type });
    setShowReviews(false);
    setLoadingReviews(true);
    
    // Load reviews for this site
    const data = await getReviewsForCampground(campgroundId);
    if (data) {
      const filtered = data.reviews.filter(r => 
        r.siteNumber?.toLowerCase().includes(site.toLowerCase()) ||
        r.text.toLowerCase().includes(site.toLowerCase())
      );
      setSiteReviews(filtered);
    }
    setLoadingReviews(false);
  };

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    
    // Add markers for recommended and avoid sites
    // Since we don't have exact GPS for each site, we'll place them around the campground center
    const allSites = [
      ...insights.recommendedSites.map(s => ({ ...s, type: "good" as const })),
      ...insights.avoidSites.map(s => ({ ...s, type: "bad" as const })),
    ];

    allSites.forEach((site, index) => {
      // Distribute markers in a circle around the center
      const angle = (index / allSites.length) * 2 * Math.PI;
      const radius = 0.002; // ~200m offset
      const markerLat = lat + radius * Math.cos(angle);
      const markerLng = lng + radius * Math.sin(angle);

      const pinElement = document.createElement("div");
      pinElement.className = `flex items-center justify-center w-8 h-8 rounded-full border-2 shadow-lg cursor-pointer transition-transform hover:scale-110 ${
        site.type === "good" 
          ? "bg-emerald-500 border-emerald-700 text-white" 
          : "bg-red-500 border-red-700 text-white"
      }`;
      pinElement.innerHTML = site.type === "good" 
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"/></svg>`;
      pinElement.title = `${site.site}: ${site.reason}`;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: markerLat, lng: markerLng },
        content: pinElement,
        title: site.site,
      });

      marker.addListener("click", () => {
        handleSiteClick(site.site, site.reason, site.type);
      });
    });
  };

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-emerald-600" />
        营位地图标注
        <span className="text-xs font-normal text-gray-500 ml-1">
          (点击标记查看该营位评论)
        </span>
      </h2>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-3 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-emerald-500 border border-emerald-700" />
          <span className="text-gray-600">推荐营位 ({insights.recommendedSites.length})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-red-500 border border-red-700" />
          <span className="text-gray-600">避坑营位 ({insights.avoidSites.length})</span>
        </div>
      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <MapView
          className="h-[350px]"
          initialCenter={{ lat, lng }}
          initialZoom={16}
          onMapReady={handleMapReady}
        />
      </div>

      {/* Site detail panel */}
      {selectedSite && (
        <div className={`mt-3 p-4 rounded-lg border ${
          selectedSite.type === "good" 
            ? "bg-emerald-50 border-emerald-200" 
            : "bg-red-50 border-red-200"
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {selectedSite.type === "good" ? (
                <ThumbsUp className="w-4 h-4 text-emerald-600" />
              ) : (
                <ThumbsDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`font-semibold text-sm ${
                selectedSite.type === "good" ? "text-emerald-800" : "text-red-800"
              }`}>
                营位 {selectedSite.site}
              </span>
            </div>
            <button
              onClick={() => setSelectedSite(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className={`text-xs mt-1 ${
            selectedSite.type === "good" ? "text-emerald-700" : "text-red-700"
          }`}>
            {selectedSite.reason}
          </p>

          {/* Reviews for this site */}
          {loadingReviews ? (
            <p className="text-xs text-gray-500 mt-2">加载评论中...</p>
          ) : siteReviews.length > 0 ? (
            <div className="mt-2">
              <button
                onClick={() => setShowReviews(!showReviews)}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
              >
                {showReviews ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                查看相关评论 ({siteReviews.length}条)
              </button>
              {showReviews && (
                <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                  {siteReviews.slice(0, 5).map((review, i) => (
                    <div key={i} className="p-2 bg-white rounded border border-gray-100 text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-800">{review.author}</span>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: review.rating }).map((_, j) => (
                            <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-gray-400">{review.date}</span>
                      </div>
                      <p className="text-gray-600 line-clamp-3">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-500 mt-2">暂无该营位的详细评论</p>
          )}
        </div>
      )}

      {/* Site list (clickable) */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <h4 className="text-xs font-semibold text-emerald-700 mb-1.5 flex items-center gap-1">
            <ThumbsUp className="w-3 h-3" /> 推荐营位
          </h4>
          <div className="space-y-1">
            {insights.recommendedSites.map((site, i) => (
              <button
                key={i}
                onClick={() => handleSiteClick(site.site, site.reason, "good")}
                className={`w-full text-left p-2 rounded text-xs transition-colors ${
                  selectedSite?.site === site.site 
                    ? "bg-emerald-100 border border-emerald-300" 
                    : "bg-white border border-gray-100 hover:bg-emerald-50"
                }`}
              >
                <span className="font-medium text-emerald-800">{site.site}</span>
                <span className="text-gray-500 ml-1">— {site.reason}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-red-700 mb-1.5 flex items-center gap-1">
            <ThumbsDown className="w-3 h-3" /> 避坑营位
          </h4>
          <div className="space-y-1">
            {insights.avoidSites.map((site, i) => (
              <button
                key={i}
                onClick={() => handleSiteClick(site.site, site.reason, "bad")}
                className={`w-full text-left p-2 rounded text-xs transition-colors ${
                  selectedSite?.site === site.site 
                    ? "bg-red-100 border border-red-300" 
                    : "bg-white border border-gray-100 hover:bg-red-50"
                }`}
              >
                <span className="font-medium text-red-800">{site.site}</span>
                <span className="text-gray-500 ml-1">— {site.reason}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

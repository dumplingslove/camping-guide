import { useState } from "react";
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

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-emerald-600" />
        营位推荐与避坑
        <span className="text-xs font-normal text-gray-500 ml-1">
          (基于真实评论整理)
        </span>
      </h2>

      {/* Map showing campground location */}
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <MapView
          className="h-[280px]"
          src={`/camping-guide/images/maps/camp-${campgroundId}-z15.png`}
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
          title={`${campgroundName} 营位位置地图（点击在地图 App 中打开）`}
        />
      </div>
      <p className="text-[10px] text-muted-foreground mt-1.5 italic">
        地图显示营地整体位置。具体营位号请参照营地官方地图或到达后查看。
      </p>

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
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <h4 className="text-xs font-semibold text-emerald-700 mb-2 flex items-center gap-1">
            <ThumbsUp className="w-3 h-3" /> 评论推荐营位 ({insights.recommendedSites.length})
          </h4>
          <div className="space-y-1.5">
            {insights.recommendedSites.map((site, i) => (
              <button
                key={i}
                onClick={() => handleSiteClick(site.site, site.reason, "good")}
                className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors ${
                  selectedSite?.site === site.site 
                    ? "bg-emerald-100 border border-emerald-300" 
                    : "bg-white border border-gray-100 hover:bg-emerald-50 hover:border-emerald-200"
                }`}
              >
                <span className="font-semibold text-emerald-800">{site.site}</span>
                <span className="text-gray-600 ml-1.5">— {site.reason}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1">
            <ThumbsDown className="w-3 h-3" /> 评论避坑营位 ({insights.avoidSites.length})
          </h4>
          <div className="space-y-1.5">
            {insights.avoidSites.map((site, i) => (
              <button
                key={i}
                onClick={() => handleSiteClick(site.site, site.reason, "bad")}
                className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors ${
                  selectedSite?.site === site.site 
                    ? "bg-red-100 border border-red-300" 
                    : "bg-white border border-gray-100 hover:bg-red-50 hover:border-red-200"
                }`}
              >
                <span className="font-semibold text-red-800">{site.site}</span>
                <span className="text-gray-600 ml-1.5">— {site.reason}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

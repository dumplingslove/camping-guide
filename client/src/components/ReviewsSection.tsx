import { useState, useMemo } from "react";
import { Star, ThumbsUp, MapPin, Calendar, Filter, ChevronDown, ChevronUp, ExternalLink, Search } from "lucide-react";
import { getReviewsForCampground, type Review } from "@/data/reviewsData";

interface ReviewsSectionProps {
  campgroundId: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 200;
  const displayText = isLong && !expanded ? review.text.slice(0, 200) + "..." : review.text;

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-semibold">
            {review.author[0]}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{review.author}</p>
            <p className="text-xs text-gray-500">{review.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StarRating rating={review.rating} />
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {review.source}
          </span>
        </div>
      </div>

      {/* Site info */}
      {(review.siteNumber || review.loop) && (
        <div className="flex flex-wrap gap-2 mb-2">
          {review.siteNumber && (
            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700">
              <MapPin className="w-3 h-3" />
              营位 {review.siteNumber}
            </span>
          )}
          {review.loop && (
            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-purple-50 text-purple-700">
              {review.loop}
            </span>
          )}
          {review.siteType && (
            <span className="text-xs px-2 py-0.5 rounded bg-gray-50 text-gray-600">
              {review.siteType}
            </span>
          )}
        </div>
      )}

      {/* Stay dates */}
      {review.stayStart && (
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <Calendar className="w-3 h-3" />
          入住: {review.stayStart} → {review.stayEnd}
        </div>
      )}

      {/* Review text */}
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{displayText}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-emerald-600 hover:text-emerald-700 mt-1 flex items-center gap-0.5"
        >
          {expanded ? (
            <>收起 <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>展开全文 <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
      )}

      {/* Helpful votes */}
      {review.helpfulVotes > 0 && (
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
          <ThumbsUp className="w-3 h-3" />
          {review.helpfulVotes} 人觉得有帮助
        </div>
      )}
    </div>
  );
}

export function ReviewsSection({ campgroundId }: ReviewsSectionProps) {
  const campReviews = getReviewsForCampground(campgroundId);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterLoop, setFilterLoop] = useState<string>("");
  const [filterSite, setFilterSite] = useState<string>("");
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">("helpful");
  const [showCount, setShowCount] = useState(10);

  if (!campReviews || campReviews.reviews.length === 0) {
    return null;
  }

  // Get unique loops for filter
  const loops = useMemo(() => {
    const loopSet = new Set<string>();
    campReviews.reviews.forEach((r) => {
      if (r.loop) loopSet.add(r.loop);
    });
    return Array.from(loopSet).sort();
  }, [campReviews]);

  // Filter and sort reviews
  const filteredReviews = useMemo(() => {
    let reviews = [...campReviews.reviews];

    if (filterRating) {
      reviews = reviews.filter((r) => r.rating === filterRating);
    }
    if (filterLoop) {
      reviews = reviews.filter((r) => r.loop === filterLoop);
    }
    if (filterSite) {
      reviews = reviews.filter((r) => r.siteNumber?.toLowerCase().includes(filterSite.toLowerCase()));
    }

    switch (sortBy) {
      case "recent":
        reviews.sort((a, b) => b.date.localeCompare(a.date));
        break;
      case "helpful":
        reviews.sort((a, b) => b.helpfulVotes - a.helpfulVotes);
        break;
      case "rating":
        reviews.sort((a, b) => b.rating - a.rating);
        break;
    }

    return reviews;
  }, [campReviews, filterRating, filterLoop, filterSite, sortBy]);

  // Rating distribution
  const ratingDist = useMemo(() => {
    const dist = [0, 0, 0, 0, 0];
    campReviews.reviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) dist[r.rating - 1]++;
    });
    return dist;
  }, [campReviews]);

  const avgRating = useMemo(() => {
    const sum = campReviews.reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / campReviews.reviews.length).toFixed(1);
  }, [campReviews]);

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Star className="w-5 h-5 text-amber-500" />
        真实用户评价
        <span className="text-sm font-normal text-gray-500">
          (来源: {campReviews.source}，平台共 {campReviews.totalReviewsOnPlatform.toLocaleString()} 条)
        </span>
      </h2>

      {/* Rating Summary */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4 flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col items-center justify-center min-w-[100px]">
          <span className="text-3xl font-bold text-gray-900">{avgRating}</span>
          <StarRating rating={Math.round(Number(avgRating))} />
          <span className="text-xs text-gray-500 mt-1">{campReviews.reviews.length} 条展示</span>
        </div>
        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingDist[star - 1];
            const pct = campReviews.reviews.length > 0 ? (count / campReviews.reviews.length) * 100 : 0;
            return (
              <button
                key={star}
                onClick={() => setFilterRating(filterRating === star ? null : star)}
                className={`flex items-center gap-2 w-full text-left rounded px-1 py-0.5 transition-colors ${
                  filterRating === star ? "bg-amber-100" : "hover:bg-gray-100"
                }`}
              >
                <span className="text-xs w-4 text-gray-600">{star}</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-8">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Filter className="w-3 h-3" />
          筛选:
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "recent" | "helpful" | "rating")}
          className="text-xs border border-gray-200 rounded px-2 py-1 bg-white"
        >
          <option value="helpful">最有帮助</option>
          <option value="recent">最新</option>
          <option value="rating">评分最高</option>
        </select>
        {loops.length > 1 && (
          <select
            value={filterLoop}
            onChange={(e) => setFilterLoop(e.target.value)}
            className="text-xs border border-gray-200 rounded px-2 py-1 bg-white"
          >
            <option value="">所有区域</option>
            {loops.map((loop) => (
              <option key={loop} value={loop}>
                {loop}
              </option>
            ))}
          </select>
        )}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            type="text"
            value={filterSite}
            onChange={(e) => setFilterSite(e.target.value)}
            placeholder="搜索营位号..."
            className="text-xs border border-gray-200 rounded pl-6 pr-2 py-1 bg-white w-28 focus:outline-none focus:ring-1 focus:ring-emerald-300"
          />
        </div>
        {(filterRating || filterLoop || filterSite) && (
          <button
            onClick={() => {
              setFilterRating(null);
              setFilterLoop("");
              setFilterSite("");
            }}
            className="text-xs text-red-500 hover:text-red-700"
          >
            清除筛选
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500 mb-3">
        显示 {Math.min(showCount, filteredReviews.length)} / {filteredReviews.length} 条评价
      </p>

      {/* Review list */}
      <div className="space-y-3">
        {filteredReviews.slice(0, showCount).map((review, idx) => (
          <ReviewCard key={review.id || idx} review={review} />
        ))}
      </div>

      {/* Load more */}
      {showCount < filteredReviews.length && (
        <button
          onClick={() => setShowCount((prev) => prev + 10)}
          className="mt-4 w-full py-2 text-sm text-emerald-600 hover:text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors"
        >
          加载更多评价 ({filteredReviews.length - showCount} 条剩余)
        </button>
      )}

      {/* Link to source */}
      {campReviews.source === "Recreation.gov" && (
        <a
          href={`https://www.recreation.gov/camping/campgrounds/${(campReviews as any).recgovId || ""}?tab=ratings`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-3 text-xs text-blue-600 hover:text-blue-800"
        >
          <ExternalLink className="w-3 h-3" />
          在 Recreation.gov 查看全部评价
        </a>
      )}
    </section>
  );
}

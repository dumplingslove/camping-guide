import { useState, useMemo, useEffect, useCallback } from "react";
import { Star, ThumbsUp, MapPin, Calendar, Filter, ChevronDown, ChevronUp, ExternalLink, Search, Loader2, Languages, Highlighter } from "lucide-react";
import { getReviewsForCampground, type Review, type CampgroundReviews } from "@/data/reviewsData";

interface ReviewsSectionProps {
  campgroundId: number;
}

function StarRating({ rating }: { rating: number | null | undefined }) {
  if (rating == null || !(rating >= 1 && rating <= 5)) {
    return (
      <span className="text-xs text-gray-400">平台未显示星级</span>
    );
  }
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

// Highlight matching keyword in text
function HighlightedText({ text, keyword }: { text: string; keyword: string }) {
  if (!keyword.trim()) return <>{text}</>;
  
  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-yellow-900 px-0.5 rounded">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// Translation cache to avoid re-translating the same text
const translationCache: Record<string, string> = {};

function ReviewCard({ review, keyword }: { review: Review; keyword: string }) {
  const [expanded, setExpanded] = useState(false);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const isLong = review.text.length > 200;
  const displayText = isLong && !expanded ? review.text.slice(0, 200) + "..." : review.text;

  // Check if text is already mostly Chinese (no need to translate)
  const isChinese = /[\u4e00-\u9fff]/.test(review.text) && (review.text.match(/[\u4e00-\u9fff]/g)?.length || 0) > review.text.length * 0.3;

  const handleTranslate = async () => {
    if (translatedText) {
      setShowTranslation(!showTranslation);
      return;
    }

    // Check cache first
    const cacheKey = review.text.slice(0, 100);
    if (translationCache[cacheKey]) {
      setTranslatedText(translationCache[cacheKey]);
      setShowTranslation(true);
      return;
    }

    setTranslating(true);
    try {
      const resp = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: review.text }),
      });
      const data = await resp.json();
      if (data.translation) {
        setTranslatedText(data.translation);
        translationCache[cacheKey] = data.translation;
        setShowTranslation(true);
      }
    } catch (e) {
      console.error("Translation failed", e);
    } finally {
      setTranslating(false);
    }
  };

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
            <p className="text-xs text-gray-500">{review.date || "日期不详"}</p>
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

      {/* Review text with keyword highlighting */}
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
        <HighlightedText text={displayText} keyword={keyword} />
      </p>
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

      {/* Translation */}
      {showTranslation && translatedText && (
        <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs font-medium text-blue-700 mb-1 flex items-center gap-1">
            <Languages className="w-3 h-3" />
            中文翻译
          </p>
          <p className="text-sm text-blue-900 leading-relaxed whitespace-pre-line">{translatedText}</p>
        </div>
      )}

      {/* Footer: helpful votes + translate button */}
      <div className="flex items-center justify-between mt-2">
        {review.helpfulVotes > 0 ? (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <ThumbsUp className="w-3 h-3" />
            {review.helpfulVotes} 人觉得有帮助
          </div>
        ) : <div />}
        {!isChinese && (
          <button
            onClick={handleTranslate}
            disabled={translating}
            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors disabled:opacity-50"
          >
            {translating ? (
              <><Loader2 className="w-3 h-3 animate-spin" /> 翻译中...</>
            ) : showTranslation ? (
              <><Languages className="w-3 h-3" /> 隐藏翻译</>
            ) : (
              <><Languages className="w-3 h-3" /> 翻译</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export function ReviewsSection({ campgroundId }: ReviewsSectionProps) {
  const [campReviews, setCampReviews] = useState<CampgroundReviews | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterLoop, setFilterLoop] = useState<string>("");
  const [filterSite, setFilterSite] = useState<string>("");
  const [filterKeyword, setFilterKeyword] = useState<string>("");
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">("helpful");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    setLoading(true);
    getReviewsForCampground(campgroundId).then((data) => {
      setCampReviews(data);
      setLoading(false);
    });
  }, [campgroundId]);

  if (loading) {
    return (
      <section className="mt-8">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">加载评论中...</span>
        </div>
      </section>
    );
  }

  if (!campReviews || campReviews.reviews.length === 0) {
    return null;
  }

  // Get unique loops for filter
  const loops = Array.from(
    new Set(campReviews.reviews.map((r) => r.loop).filter(Boolean))
  ).sort();

  // Filter and sort reviews
  const getFilteredReviews = () => {
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
    if (filterKeyword.trim()) {
      reviews = reviews.filter((r) => r.text.toLowerCase().includes(filterKeyword.toLowerCase()));
    }

    switch (sortBy) {
      case "recent":
        reviews.sort((a, b) => b.date.localeCompare(a.date));
        break;
      case "helpful":
        reviews.sort((a, b) => b.helpfulVotes - a.helpfulVotes);
        break;
      case "rating":
        reviews.sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1));
        break;
    }

    return reviews;
  };

  const filteredReviews = getFilteredReviews();

  // Rating distribution
  const ratingDist = [0, 0, 0, 0, 0];
  campReviews.reviews.forEach((r) => {
    if (typeof r.rating === "number" && r.rating >= 1 && r.rating <= 5)
      ratingDist[r.rating - 1]++;
  });

  const ratedReviews = campReviews.reviews.filter(
    (r) => typeof r.rating === "number" && r.rating >= 1 && r.rating <= 5
  );
  const avgRating =
    ratedReviews.length > 0
      ? (
          ratedReviews.reduce((acc, r) => acc + (r.rating as number), 0) /
          ratedReviews.length
        ).toFixed(1)
      : "—";

  // Common keyword suggestions based on review content
  const keywordSuggestions = ["noise", "shower", "clean", "quiet", "view", "shade", "privacy", "kids", "trail", "river", "lake"];

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
      <div className="flex flex-wrap gap-2 mb-2">
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
        <div className="relative">
          <Highlighter className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-amber-500" />
          <input
            type="text"
            value={filterKeyword}
            onChange={(e) => setFilterKeyword(e.target.value)}
            placeholder="关键词搜索..."
            className="text-xs border border-gray-200 rounded pl-6 pr-2 py-1 bg-white w-32 focus:outline-none focus:ring-1 focus:ring-amber-300"
          />
        </div>
        {(filterRating || filterLoop || filterSite || filterKeyword) && (
          <button
            onClick={() => {
              setFilterRating(null);
              setFilterLoop("");
              setFilterSite("");
              setFilterKeyword("");
            }}
            className="text-xs text-red-500 hover:text-red-700"
          >
            清除筛选
          </button>
        )}
      </div>

      {/* Keyword quick suggestions */}
      <div className="flex flex-wrap gap-1 mb-4">
        <span className="text-xs text-gray-400">快捷:</span>
        {keywordSuggestions.map((kw) => (
          <button
            key={kw}
            onClick={() => setFilterKeyword(kw)}
            className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
              filterKeyword === kw
                ? "bg-amber-200 text-amber-800"
                : "bg-gray-100 text-gray-500 hover:bg-amber-50 hover:text-amber-700"
            }`}
          >
            {kw}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500 mb-3">
        显示 {Math.min(showCount, filteredReviews.length)} / {filteredReviews.length} 条评价
        {filterKeyword && (
          <span className="ml-1 text-amber-600">
            (含 "{filterKeyword}" 的评论)
          </span>
        )}
      </p>

      {/* Review list */}
      <div className="space-y-3">
        {filteredReviews.slice(0, showCount).map((review, idx) => (
          <ReviewCard key={`${review.author}-${review.date}-${idx}`} review={review} keyword={filterKeyword} />
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
          href="https://www.recreation.gov"
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

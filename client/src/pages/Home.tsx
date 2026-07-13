import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link, useSearch } from "wouter";
import { campgrounds, driveTimeRanges, featureOptions, CampgroundTier } from "@/data/campgrounds";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useVisited } from "@/hooks/useVisited";
import { Search, MapPin, Clock, TreePine, Baby, Truck, Star, AlertTriangle, X, Filter, Heart, GitCompareArrows, FileText, CheckCircle2, Flame, Ban, Map, BarChart3, ChevronUp, ChevronDown } from "lucide-react";
import { CampgroundSummaryTable } from "@/components/CampgroundSummaryTable";
import { motion, AnimatePresence } from "framer-motion";

function RatingStars({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "fill-sand text-sand" : "text-border"}
        />
      ))}
    </span>
  );
}

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  // Scroll to summary table when returning from detail page
  const searchString = useSearch();
  useEffect(() => {
    if (searchString.includes("scrollTo=table")) {
      setTimeout(() => {
        const el = document.getElementById("summary-table");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      // Clean up the URL
      window.history.replaceState({}, "", "/");
    }
  }, [searchString]);

  const [search, setSearch] = useState("");
  const [selectedDriveTime, setSelectedDriveTime] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [minScenery, setMinScenery] = useState(0);
  const [minKid, setMinKid] = useState(0);
  const [minTc, setMinTc] = useState(0);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<CampgroundTier | "all">("all");
  const { favorites, compareList } = useFavorites();

  // Visited data - uses DB for logged-in users, localStorage fallback
  const { visits: allVisits } = useVisited();
  const visitedMap = useMemo(() => {
    const result: Record<string, { count: number; lastVisit: string; lastSites: string }> = {};
    // Group by campgroundId
    const grouped: Record<number, typeof allVisits> = {};
    for (const v of allVisits) {
      if (!grouped[v.campgroundId]) grouped[v.campgroundId] = [];
      grouped[v.campgroundId].push(v);
    }
    for (const campId of Object.keys(grouped)) {
      const entries = grouped[Number(campId)];
      const sorted = [...entries].sort((a, b) => b.startDate.localeCompare(a.startDate));
      const last = sorted[0];
      const dateDisplay = last.endDate ? `${last.startDate} ~ ${last.endDate}` : last.startDate;
      result[campId] = { count: sorted.length, lastVisit: dateDisplay, lastSites: last.sites || "" };
    }
    return result;
  }, [allVisits]);

  const filtered = useMemo(() => {
    return campgrounds.filter((c) => {
      if (search) {
        const q = search.toLowerCase();
        const match =
          c.name.toLowerCase().includes(q) ||
          c.nameCn.includes(q) ||
          c.tagline.includes(q) ||
          c.region.toLowerCase().includes(q) ||
          c.features.some((f) => f.includes(q));
        if (!match) return false;
      }
      if (selectedDriveTime) {
        const range = driveTimeRanges.find((r) => r.label === selectedDriveTime);
        if (range && (c.driveTime < range.min || c.driveTime >= range.max)) return false;
      }
      if (selectedFeatures.length > 0) {
        if (!selectedFeatures.every((f) => c.features.includes(f))) return false;
      }
      if (c.sceneryRating < minScenery) return false;
      if (c.kidRating < minKid) return false;
      if (c.tcRating < minTc) return false;
      if (selectedTier !== "all" && c.tier !== selectedTier) return false;
      if (selectedState && c.state !== selectedState) return false;
      return true;
    });
  }, [search, selectedDriveTime, selectedFeatures, minScenery, minKid, minTc, selectedTier, selectedState]);

  const toggleFeature = (f: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedDriveTime(null);
    setSelectedFeatures([]);
    setMinScenery(0);
    setMinKid(0);
    setMinTc(0);
    setSelectedTier("all");
    setSelectedState(null);
  };

  const hasActiveFilters = search || selectedDriveTime || selectedFeatures.length > 0 || minScenery > 0 || minKid > 0 || minTc > 0 || selectedTier !== "all" || selectedState !== null;

  const tierOptions: { value: CampgroundTier | "all"; label: string; color: string }[] = [
    { value: "all", label: "全部", color: "bg-white border-border" },
    { value: "顶级热门", label: "顶级热门", color: "bg-red-50 border-red-200 text-red-700" },
    { value: "明显热门", label: "明显热门", color: "bg-orange-50 border-orange-200 text-orange-700" },
    { value: "区域家庭优选", label: "区域优选", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
    { value: "商业度假型", label: "商业度假", color: "bg-purple-50 border-purple-200 text-purple-700" },
    { value: "2026受限", label: "2026受限", color: "bg-amber-50 border-amber-200 text-amber-700" },
    { value: "不适配", label: "不适配", color: "bg-gray-50 border-gray-200 text-gray-500" },
  ];

  return (
    <div className="min-h-screen topo-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663328359702/ih5KuobX6RNPFjbp9hkXB2/logo-icon-WrmXjRpLUoFPAVuBPxkQwH.webp"
              alt="Logo"
              className="w-9 h-9"
            />
            <span className="font-display font-bold text-pine text-lg hidden sm:block">
              营地指南
            </span>
          </Link>
          <div className="flex items-center gap-3">
            {/* Favorites link */}
            <Link href="/favorites" className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-sunset hover:bg-sunset/5 transition-colors">
              <Heart size={16} className={favorites.length > 0 ? "fill-sunset text-sunset" : ""} />
              <span className="hidden sm:inline">收藏</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sunset text-white text-[10px] flex items-center justify-center font-mono">
                  {favorites.length}
                </span>
              )}
            </Link>
            {/* Compare link */}
            <Link href="/compare" className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-lake hover:bg-lake/5 transition-colors">
              <GitCompareArrows size={16} className={compareList.length > 0 ? "text-lake" : ""} />
              <span className="hidden sm:inline">比较</span>
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-lake text-white text-[10px] flex items-center justify-center font-mono">
                  {compareList.length}
                </span>
              )}
            </Link>
            {/* Map link */}
            <Link href="/map" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-pine hover:bg-pine/5 transition-colors">
              <Map size={16} />
              <span className="hidden sm:inline">地图</span>
            </Link>
            {/* Itinerary link */}
            <Link href="/itinerary" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-pine hover:bg-pine/5 transition-colors">
              <FileText size={16} />
              <span className="hidden sm:inline">行程</span>
            </Link>
            {/* Stats link */}
            <Link href="/stats" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-pine hover:bg-pine/5 transition-colors">
              <BarChart3 size={16} />
              <span className="hidden sm:inline">统计</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground font-mono ml-2">
              <MapPin size={14} />
              <span>From Redmond, WA</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663328359702/ih5KuobX6RNPFjbp9hkXB2/hero-banner-VFVRSpzAaRZXVdqamqYTLs.webp"
            alt="Pacific Northwest Camping"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-pine/60 via-pine/40 to-pine/80" />
        </div>
        <div className="relative container py-20 md:py-32">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight"
          >
            找到你的下一个营火
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl font-body"
          >
            53个精选营地 · 专为带娃家庭与Truck Camper打造 · 从Redmond出发1.5-7.5小时
          </motion.p>
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="mt-8 max-w-xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="搜索营地名称、地区、特色..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/95 backdrop-blur-sm border-0 shadow-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sand font-body text-base"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="container py-6">
        {/* Primary filter bar - always visible */}
        <div className="bg-white rounded-xl border border-border p-4 space-y-3">
          {/* Row 1: State + Tier + Count */}
          <div className="flex flex-wrap items-center gap-2">
            {/* State filter */}
            <div className="flex items-center gap-1.5 mr-2">
              <MapPin size={14} className="text-muted-foreground" />
              {[{ value: null, label: "全部" }, { value: "WA", label: "WA" }, { value: "OR", label: "OR" }, { value: "BC", label: "BC" }].map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSelectedState(selectedState === s.value ? null : s.value)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                    selectedState === s.value
                      ? "bg-pine text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {/* Divider */}
            <div className="hidden sm:block w-px h-5 bg-border" />
            {/* Tier filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              {tierOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedTier(selectedTier === opt.value ? "all" : opt.value)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all border ${
                    selectedTier === opt.value
                      ? opt.value === "all" ? "bg-pine text-white border-pine" : opt.color + " ring-1 ring-current"
                      : "bg-white/80 border-border/50 text-muted-foreground hover:border-border"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {/* Count + Clear */}
            <div className="ml-auto flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={12} />
                  清除
                </button>
              )}
              <span className="text-xs text-muted-foreground font-mono">
                {filtered.length} / {campgrounds.length}
              </span>
            </div>
          </div>

          {/* Row 2: Drive time */}
          <div className="flex flex-wrap items-center gap-2">
            <Clock size={14} className="text-muted-foreground" />
            {driveTimeRanges.map((range) => (
              <button
                key={range.label}
                onClick={() =>
                  setSelectedDriveTime(
                    selectedDriveTime === range.label ? null : range.label
                  )
                }
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  selectedDriveTime === range.label
                    ? "bg-pine text-white"
                    : "bg-muted/50 border border-border/50 text-foreground hover:border-pine/30"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Row 3: Features (scrollable) */}
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-muted-foreground shrink-0" />
            <div className="flex flex-wrap gap-1.5">
              {featureOptions.map((f) => (
                <button
                  key={f}
                  onClick={() => toggleFeature(f)}
                  className={`px-2.5 py-1 rounded-full text-[11px] transition-all ${
                    selectedFeatures.includes(f)
                      ? "bg-lake text-white"
                      : "bg-muted/50 border border-border/50 text-foreground hover:border-lake/30"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Row 4: Rating sliders (collapsible) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {showFilters ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            评分筛选
            {(minScenery > 0 || minKid > 0 || minTc > 0) && (
              <span className="w-1.5 h-1.5 rounded-full bg-sunset" />
            )}
          </button>
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border/50">
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 flex items-center gap-1">
                      <TreePine size={12} /> 风景 {minScenery > 0 ? `≥ ${minScenery}` : "不限"}
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={5}
                      value={minScenery}
                      onChange={(e) => setMinScenery(Number(e.target.value))}
                      className="w-full accent-pine h-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 flex items-center gap-1">
                      <Baby size={12} /> 娃可玩 {minKid > 0 ? `≥ ${minKid}` : "不限"}
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={5}
                      value={minKid}
                      onChange={(e) => setMinKid(Number(e.target.value))}
                      className="w-full accent-pine h-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 flex items-center gap-1">
                      <Truck size={12} /> TC适配 {minTc > 0 ? `≥ ${minTc}` : "不限"}
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={5}
                      value={minTc}
                      onChange={(e) => setMinTc(Number(e.target.value))}
                      className="w-full accent-pine h-1.5"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Summary Table */}
      <CampgroundSummaryTable visitedMap={visitedMap} />

      {/* Campground Grid */}
      <section className="container pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((camp, index) => (
              <motion.div
                key={camp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.3), ease: [0.23, 1, 0.32, 1] }}
              >
                <Link href={`/campground/${camp.id}`}>
                  <article className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={camp.image}
                        alt={camp.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {/* Drive time badge */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                        <Clock size={12} className="text-pine" />
                        <span className="text-xs font-mono font-semibold text-pine">{camp.driveTimeLabel}</span>
                      </div>
                      {/* Warning / Closure badge */}
                      {camp.closureInfo ? (
                        <div className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1">
                          <Ban size={12} className="text-white" />
                          <span className="text-xs font-semibold text-white">暂时关闭</span>
                        </div>
                      ) : camp.warning ? (
                        <div className="absolute top-3 left-3 bg-sunset/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                          <AlertTriangle size={12} className="text-white" />
                          <span className="text-xs font-semibold text-white">注意</span>
                        </div>
                      ) : null}
                      {/* Closure reopen info overlay */}
                      {camp.closureInfo && (
                        <div className="absolute bottom-0 left-0 right-0 bg-red-900/80 backdrop-blur-sm px-3 py-2">
                          <p className="text-[11px] text-white font-medium leading-tight">
                            ⏳ 预计重开: {camp.closureInfo.expectedReopen}
                          </p>
                        </div>
                      )}
                      {/* State badge - hidden when closure overlay is shown */}
                      {!camp.closureInfo && (
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-pine/80 backdrop-blur-sm text-white text-xs font-mono px-2 py-0.5 rounded">
                            {camp.state}
                          </span>
                        </div>
                      )}
                      {/* Visited badge - hidden when closure overlay is shown */}
                      {!camp.closureInfo && visitedMap[camp.id] && (
                        <div className="absolute bottom-3 right-3 bg-emerald-500/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                          <CheckCircle2 size={12} className="text-white" />
                          <span className="text-xs font-semibold text-white">
                            去过{visitedMap[camp.id].count > 1 ? ` ${visitedMap[camp.id].count}次` : ""}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-display font-bold text-lg text-foreground leading-tight">
                        {camp.nameCn}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5 font-mono">
                        {camp.name}
                      </p>
                      <p className="text-sm text-foreground/80 mt-2 line-clamp-1">
                        {camp.tagline}
                      </p>
                      {/* Warning text */}
                      {camp.warning && !camp.closureInfo && (
                        <p className="mt-1.5 text-[11px] text-amber-700 bg-amber-50 rounded px-2 py-1 line-clamp-2 leading-tight">
                          <AlertTriangle size={10} className="inline mr-1 -mt-0.5" />
                          {camp.warning.length > 60 ? camp.warning.slice(0, 60) + "..." : camp.warning}
                        </p>
                      )}
                      {/* Tier & Popularity badges */}
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        {camp.tier && (
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            camp.tier === "顶级热门" ? "bg-red-50 text-red-700 border border-red-200" :
                            camp.tier === "明显热门" ? "bg-orange-50 text-orange-700 border border-orange-200" :
                            camp.tier === "区域家庭优选" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                            camp.tier === "商业度假型" ? "bg-purple-50 text-purple-700 border border-purple-200" :
                            camp.tier === "2026受限" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                            "bg-gray-50 text-gray-500 border border-gray-200"
                          }`}>
                            {camp.tier}
                          </span>
                        )}
                        {camp.popularityLevel && (
                          <span className="inline-flex items-center gap-0.5">
                            <Flame size={10} className={camp.popularityLevel.startsWith("极高") ? "text-red-500" : camp.popularityLevel.startsWith("高") ? "text-orange-500" : camp.popularityLevel.startsWith("中等") ? "text-amber-500" : "text-emerald-500"} />
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                              camp.popularityLevel.startsWith("极高") ? "bg-red-50 text-red-700" :
                              camp.popularityLevel.startsWith("高") ? "bg-orange-50 text-orange-700" :
                              camp.popularityLevel.startsWith("中等") ? "bg-amber-50 text-amber-700" :
                              "bg-emerald-50 text-emerald-700"
                            }`}>
                              {camp.popularityLevel.split(" (")[0]}
                            </span>
                          </span>
                        )}
                      </div>
                      {/* Ratings */}
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] text-muted-foreground mb-0.5">风景</span>
                          <RatingStars rating={camp.sceneryRating} />
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] text-muted-foreground mb-0.5">娃可玩</span>
                          <RatingStars rating={camp.kidRating} />
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] text-muted-foreground mb-0.5">TC适配</span>
                          <RatingStars rating={camp.tcRating} />
                        </div>
                      </div>
                      {/* Visited info */}
                      {visitedMap[camp.id] && (
                        <div className="mt-2 flex items-center gap-2 text-[10px] text-emerald-700 bg-emerald-50 rounded-lg px-2 py-1">
                          <CheckCircle2 size={10} />
                          <span>上次: {visitedMap[camp.id].lastVisit}</span>
                          {visitedMap[camp.id].lastSites && <span className="font-mono">Site {visitedMap[camp.id].lastSites}</span>}
                        </div>
                      )}
                      {/* Features */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {camp.features.slice(0, 4).map((f) => (
                          <span
                            key={f}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                          >
                            {f}
                          </span>
                        ))}
                        {camp.features.length > 4 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                            +{camp.features.length - 4}
                          </span>
                        )}
                      </div>
                      {/* Last updated */}
                      {camp.lastUpdated && (
                        <p className="mt-2 text-[10px] text-muted-foreground/60 font-mono">
                          数据更新: {camp.lastUpdated}
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <TreePine size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-lg text-muted-foreground">没有找到匹配的营地</p>
            <button
              onClick={clearFilters}
              className="mt-3 text-sm text-pine hover:underline"
            >
              清除所有筛选条件
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white/50 backdrop-blur-sm">
        <div className="container py-8 text-center">
          <p className="text-sm text-muted-foreground">
            专为带娃（2岁）与 F-150 Truck Camper 家庭打造 · 数据验证于 2026年7月
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            WA State Parks · Oregon State Parks · BC Parks · NPS · Recreation.gov
          </p>
        </div>
      </footer>
    </div>
  );
}

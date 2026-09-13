import { useState, useMemo } from "react";
import { Link } from "wouter";
import { campgrounds, driveTimeRanges, CampgroundTier } from "@/data/campgrounds";
import { campgroundCoords } from "@/data/coordinates";
import { MapView } from "@/components/Map";
import { Clock, MapPin, Filter, X, ArrowLeft, Ban, List, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

// Tier color mapping
const tierPinColors: Record<CampgroundTier, string> = {
  "顶级热门": "#dc2626",
  "明显热门": "#ea580c",
  "区域家庭优选": "#16a34a",
  "商业度假型": "#7c3aed",
  "2026受限": "#d97706",
  "不适配": "#6b7280",
};

const tierBadgeClasses: Record<CampgroundTier, string> = {
  "顶级热门": "bg-red-50 text-red-700 border-red-200",
  "明显热门": "bg-orange-50 text-orange-700 border-orange-200",
  "区域家庭优选": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "商业度假型": "bg-purple-50 text-purple-700 border-purple-200",
  "2026受限": "bg-amber-50 text-amber-700 border-amber-200",
  "不适配": "bg-gray-50 text-gray-500 border-gray-200",
};

function googleMapsUrl(lat: number, lng: number, label: string) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&q=${encodeURIComponent(label)}`;
}

export default function MapPage() {
  const [selectedTier, setSelectedTier] = useState<CampgroundTier | "all">("all");
  const [selectedDriveTime, setSelectedDriveTime] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<"all" | "WA" | "OR" | "BC">("all");
  const [hoveredCampground, setHoveredCampground] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const filteredCampgrounds = useMemo(() => {
    return campgrounds.filter((c) => {
      if (selectedTier !== "all" && c.tier !== selectedTier) return false;
      if (selectedState !== "all" && c.state !== selectedState) return false;
      if (selectedDriveTime) {
        const range = driveTimeRanges.find((r) => r.label === selectedDriveTime);
        if (range && (c.driveTime < range.min || c.driveTime >= range.max)) return false;
      }
      return true;
    });
  }, [selectedTier, selectedDriveTime, selectedState]);

  const tierOptions: { value: CampgroundTier | "all"; label: string; count: number }[] = useMemo(() => {
    const tiers: (CampgroundTier | "all")[] = ["all", "顶级热门", "明显热门", "区域家庭优选", "商业度假型", "2026受限"];
    return tiers.map(t => ({
      value: t,
      label: t === "all" ? "全部" : t,
      count: t === "all" ? campgrounds.length : campgrounds.filter(c => c.tier === t).length
    }));
  }, []);

  const clearFilters = () => {
    setSelectedTier("all");
    setSelectedDriveTime(null);
    setSelectedState("all");
  };

  const hasActiveFilters = selectedTier !== "all" || selectedDriveTime !== null || selectedState !== "all";

  // Shared filter/list content - extracted to avoid duplication
  const FilterContent = () => (
    <div className="space-y-5">
      {/* Legend */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">图例</h3>
        <div className="space-y-1.5">
          {tierOptions.filter(t => t.value !== "all").map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <div
                className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm"
                style={{ background: tierPinColors[opt.value as CampgroundTier] }}
              />
              <span className="text-xs text-foreground">{opt.label}</span>
              <span className="text-[10px] text-muted-foreground ml-auto font-mono">{opt.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tier filter */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">分类</h3>
        <div className="flex flex-wrap gap-1.5">
          {tierOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedTier(opt.value)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                selectedTier === opt.value
                  ? "bg-pine text-white"
                  : "bg-secondary border border-border text-foreground hover:border-pine/30"
              }`}
            >
              {opt.label} ({opt.count})
            </button>
          ))}
        </div>
      </div>

      {/* State filter */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">州</h3>
        <div className="flex gap-1.5">
          {(["all", "WA", "OR", "BC"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSelectedState(s)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                selectedState === s
                  ? "bg-pine text-white"
                  : "bg-secondary border border-border text-foreground hover:border-pine/30"
              }`}
            >
              {s === "all" ? "全部" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Drive time filter */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">车程</h3>
        <div className="flex flex-wrap gap-1.5">
          {driveTimeRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setSelectedDriveTime(selectedDriveTime === range.label ? null : range.label)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${
                selectedDriveTime === range.label
                  ? "bg-pine text-white"
                  : "bg-secondary border border-border text-foreground hover:border-pine/30"
              }`}
            >
              <Clock size={10} className="inline mr-0.5" />
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={12} />
          清除所有筛选
        </button>
      )}

      {/* Campground list */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          营地列表 ({filteredCampgrounds.length})
        </h3>
        <div className="space-y-1 max-h-[35vh] md:max-h-[calc(100vh-500px)] overflow-y-auto">
          {filteredCampgrounds.map((camp) => (
            <Link
              key={camp.id}
              href={`/campground/${camp.id}`}
              className={`block p-2 rounded-lg text-left hover:bg-secondary/80 transition-colors ${
                hoveredCampground === camp.id ? "bg-secondary" : ""
              }`}
              onMouseEnter={() => setHoveredCampground(camp.id)}
              onMouseLeave={() => setHoveredCampground(null)}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: camp.closureInfo ? "#991b1b" : tierPinColors[camp.tier || "不适配"] }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {camp.nameCn}
                    {camp.closureInfo && <Ban size={10} className="inline ml-1 text-red-600" />}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono truncate">
                    {camp.driveTimeLabel} · {camp.state} · ⭐{camp.sceneryRating}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-paper">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-pine transition-colors">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium hidden sm:inline">返回列表</span>
            </Link>
          </div>
          <h1 className="font-display font-bold text-pine text-lg flex items-center gap-2">
            <MapPin size={18} />
            营地地图
          </h1>
          <div className="flex items-center gap-2">
            {/* Desktop filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                showFilters ? "bg-pine text-white" : "bg-white border border-border hover:border-pine/30"
              }`}
            >
              <Filter size={14} />
              筛选
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-sunset" />}
            </button>
            <span className="text-xs font-mono text-muted-foreground">
              {filteredCampgrounds.length}/{campgrounds.length}
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Desktop Sidebar filters - hidden on mobile */}
        <AnimatePresence>
          {showFilters && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="hidden md:block border-r border-border bg-white overflow-y-auto flex-shrink-0"
            >
              <div className="p-4">
                <FilterContent />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Map + browse pane */}
        <div className="flex-1 relative overflow-y-auto">
          {/* Region overview map (bundled static image, tap to open interactive map) */}
          <div className="h-56 md:h-64 border-b border-border">
            <MapView
              src="/camping-guide/images/maps/region-z7.png"
              href="https://www.google.com/maps/@46.8,-122.2,7z"
              title="华盛顿州与俄勒冈州营地区域地图（点击在地图 App 中打开）"
              className="h-full"
            />
          </div>

          <div className="p-4 md:p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-foreground">
                筛选结果 <span className="text-sm font-mono text-muted-foreground">({filteredCampgrounds.length})</span>
              </h2>
              <p className="text-[11px] text-muted-foreground">点"导航"在地图 App 中打开该营地</p>
            </div>

            {filteredCampgrounds.length === 0 ? (
              <div className="bg-white rounded-xl p-8 shadow-sm text-center">
                <MapPin size={32} className="mx-auto text-muted-foreground/40 mb-2" />
                <p className="text-sm text-muted-foreground">没有匹配的营地</p>
                <button onClick={clearFilters} className="mt-2 text-xs text-pine hover:underline">清除筛选</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredCampgrounds.map((camp) => {
                  const coords = campgroundCoords[camp.id];
                  return (
                    <div key={camp.id} className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
                      <Link href={`/campground/${camp.id}`} className="block">
                        <div className="relative h-28">
                          <img src={camp.image} alt={camp.nameCn} className="w-full h-full object-cover" loading="lazy" />
                          <div className="absolute top-2 left-2">
                            {camp.tier && (
                              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${tierBadgeClasses[camp.tier]}`}>
                                {camp.tier}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                      <div className="p-3">
                        <Link href={`/campground/${camp.id}`}>
                          <h3 className="text-sm font-bold text-foreground truncate hover:text-pine">{camp.nameCn}</h3>
                        </Link>
                        <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                          {camp.driveTimeLabel} · {camp.state} · ⭐{camp.sceneryRating}/5
                        </p>
                        {camp.closureInfo && (
                          <p className="text-[11px] text-red-700 mt-1">⚠️ 关闭中 · 预计重开: {camp.closureInfo.expectedReopen}</p>
                        )}
                        <div className="flex gap-2 mt-2">
                          <Link
                            href={`/campground/${camp.id}`}
                            className="flex-1 text-center text-xs font-medium px-3 py-2.5 rounded-lg bg-pine text-white hover:bg-pine/90"
                          >
                            查看详情
                          </Link>
                          {coords && (
                            <a
                              href={googleMapsUrl(coords.lat, coords.lng, camp.nameCn)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-medium px-3 py-2.5 rounded-lg bg-pine/10 text-pine hover:bg-pine/20"
                            >
                              <Navigation size={12} />
                              导航
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mobile bottom bar - opens drawer */}
          <div className="md:hidden sticky bottom-0 safe-area-bottom">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="w-full bg-white/95 backdrop-blur-md border-t border-border px-4 py-3 flex items-center justify-between active:scale-[0.99] transition-transform"
            >
              <div className="flex items-center gap-2">
                <List size={16} className="text-pine" />
                <span className="text-sm font-medium text-foreground">
                  {filteredCampgrounds.length} 个营地
                </span>
                {hasActiveFilters && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-pine/10 text-pine font-medium">
                    已筛选
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">筛选 & 列表</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
        <DrawerContent className="max-h-[75vh]">
          <DrawerHeader className="pb-2">
            <DrawerTitle className="text-sm font-display text-pine flex items-center gap-2">
              <Filter size={14} />
              筛选 & 营地列表
              <span className="text-[10px] font-mono text-muted-foreground ml-auto">
                {filteredCampgrounds.length}/{campgrounds.length}
              </span>
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 overflow-y-auto">
            <FilterContent />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

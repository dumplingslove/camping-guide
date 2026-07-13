import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { Link } from "wouter";
import { campgrounds, driveTimeRanges, CampgroundTier } from "@/data/campgrounds";
import { campgroundCoords, REDMOND_COORDS } from "@/data/coordinates";
import { MapView } from "@/components/Map";
import { Clock, MapPin, Filter, X, ArrowLeft, Ban, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

// Tier color mapping for map pins
const tierPinColors: Record<CampgroundTier, string> = {
  "顶级热门": "#dc2626",    // red-600
  "明显热门": "#ea580c",    // orange-600
  "区域家庭优选": "#16a34a", // green-600
  "商业度假型": "#7c3aed",  // purple-600
  "2026受限": "#d97706",    // amber-600
  "不适配": "#6b7280",      // gray-500
};

const tierBadgeClasses: Record<CampgroundTier, string> = {
  "顶级热门": "bg-red-50 text-red-700 border-red-200",
  "明显热门": "bg-orange-50 text-orange-700 border-orange-200",
  "区域家庭优选": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "商业度假型": "bg-purple-50 text-purple-700 border-purple-200",
  "2026受限": "bg-amber-50 text-amber-700 border-amber-200",
  "不适配": "bg-gray-50 text-gray-500 border-gray-200",
};

function createPinElement(tier: CampgroundTier, isClosed: boolean): HTMLElement {
  const div = document.createElement("div");
  const color = isClosed ? "#991b1b" : tierPinColors[tier] || "#6b7280";
  div.innerHTML = `
    <div style="
      width: 28px; height: 28px; 
      background: ${color}; 
      border: 2px solid white; 
      border-radius: 50%; 
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      transition: transform 0.15s ease-out;
    " class="map-pin">
      ${isClosed ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>' : '<svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>'}
    </div>
  `;
  return div;
}

export default function MapPage() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
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

  const updateMarkers = useCallback((map: google.maps.Map) => {
    // Clear existing markers
    markersRef.current.forEach(m => m.map = null);
    markersRef.current = [];

    // Close any open info window
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }

    // Create info window if not exists
    if (!infoWindowRef.current) {
      infoWindowRef.current = new google.maps.InfoWindow();
    }

    // Add markers for filtered campgrounds
    filteredCampgrounds.forEach((camp) => {
      const coords = campgroundCoords[camp.id];
      if (!coords) return;

      const isClosed = !!camp.closureInfo;
      const tier = camp.tier || "不适配";
      const pinElement = createPinElement(tier, isClosed);

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: coords.lat, lng: coords.lng },
        title: camp.nameCn,
        content: pinElement,
      });

      marker.addListener("click", () => {
        const tierBadge = camp.tier ? `<span style="font-size:10px;padding:2px 6px;border-radius:9999px;background:${tierPinColors[camp.tier]}22;color:${tierPinColors[camp.tier]};font-weight:500;">${camp.tier}</span>` : "";
        const closureBanner = isClosed ? `<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:6px;padding:6px 8px;margin-top:6px;"><span style="font-size:11px;color:#991b1b;font-weight:500;">⚠️ 关闭中 · 预计重开: ${camp.closureInfo!.expectedReopen}</span></div>` : "";
        
        const content = `
          <div style="min-width:220px;max-width:280px;font-family:system-ui,-apple-system,sans-serif;">
            <div style="position:relative;height:100px;overflow:hidden;border-radius:8px 8px 0 0;margin:-8px -8px 8px -8px;">
              <img src="${camp.image}" style="width:100%;height:100%;object-fit:cover;" />
              <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.6));padding:8px;">
                <span style="color:white;font-size:11px;font-family:monospace;">${camp.driveTimeLabel} · ${camp.state}</span>
              </div>
            </div>
            <div style="padding:0 4px 4px;">
              <h3 style="font-size:15px;font-weight:700;margin:0 0 2px;">${camp.nameCn}</h3>
              <p style="font-size:11px;color:#666;margin:0 0 4px;font-family:monospace;">${camp.name}</p>
              <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px;">
                ${tierBadge}
                <span style="font-size:11px;color:#666;">⭐${camp.sceneryRating}/5 风景 · 👶${camp.kidRating}/5 娃可玩</span>
              </div>
              ${closureBanner}
              <a href="/campground/${camp.id}" style="display:block;margin-top:8px;text-align:center;background:#1a4d2e;color:white;padding:6px 12px;border-radius:6px;font-size:12px;text-decoration:none;font-weight:500;">查看详情 →</a>
            </div>
          </div>
        `;

        infoWindowRef.current!.setContent(content);
        infoWindowRef.current!.open(map, marker);
      });

      markersRef.current.push(marker);
    });

    // Add Redmond home marker
    const homePin = document.createElement("div");
    homePin.innerHTML = `
      <div style="
        width: 32px; height: 32px; 
        background: #1a4d2e; 
        border: 3px solid white; 
        border-radius: 50%; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        display: flex; align-items: center; justify-content: center;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
      </div>
    `;
    const homeMarker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: REDMOND_COORDS.lat, lng: REDMOND_COORDS.lng },
      title: "家 · Redmond, WA",
      content: homePin,
    });
    markersRef.current.push(homeMarker);
  }, [filteredCampgrounds]);

  const handleMapReady = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    updateMarkers(map);
  }, [updateMarkers]);

  // Update markers when filters change (via useEffect)
  useEffect(() => {
    if (mapRef.current) {
      updateMarkers(mapRef.current);
    }
  }, [updateMarkers]);

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
          <div className="flex items-center gap-2 mt-1 pt-1 border-t border-border/50">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm bg-pine" />
            <span className="text-xs text-foreground">家 (Redmond)</span>
          </div>
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

        {/* Map */}
        <div className="flex-1 relative">
          <MapView
            className="w-full h-full"
            initialCenter={{ lat: 46.5, lng: -122.5 }}
            initialZoom={7}
            onMapReady={handleMapReady}
          />
          {/* Empty state overlay */}
          {filteredCampgrounds.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center pointer-events-auto">
                <MapPin size={32} className="mx-auto text-muted-foreground/40 mb-2" />
                <p className="text-sm text-muted-foreground">没有匹配的营地</p>
                <button onClick={clearFilters} className="mt-2 text-xs text-pine hover:underline">清除筛选</button>
              </div>
            </div>
          )}

          {/* Mobile bottom bar - opens drawer */}
          <div className="md:hidden absolute bottom-0 left-0 right-0 safe-area-bottom">
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

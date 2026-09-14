import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "wouter";
import { campgrounds } from "@/data/campgrounds";
import { campgroundPhotos } from "@/data/photos";
import { campgroundCoords, REDMOND_COORDS } from "@/data/coordinates";
import { seasonData, monthLabels } from "@/data/seasons";
import { activityPhotos } from "@/data/activityPhotos";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useVisited, VisitedEntry } from "@/hooks/useVisited";
import { MapView } from "@/components/Map";
import { ActivityCard } from "@/components/ActivityCard";
import { ReviewsSection } from "@/components/ReviewsSection";
import { InsightsPanel } from "@/components/InsightsPanel";
import { SiteMapSection } from "@/components/SiteMapSection";
import { ReviewTrendChart } from "@/components/ReviewTrendChart";
import { ArrowLeft, Clock, MapPin, Star, TreePine, Baby, Truck, ExternalLink, AlertTriangle, ChevronLeft, ChevronRight, Camera, X, Heart, GitCompareArrows, Cloud, Thermometer, Wind, Droplets, Navigation, CalendarDays, StickyNote, Save, Trash2, CheckCircle2, Calendar, TrendingUp, TrendingDown, Info, Bookmark, Map as MapIcon, Flame, Users, MessageCircle, Ban, Share2, Link2, Link2Off } from "lucide-react";
import { toast } from "sonner";
import { useCampNotes } from "@/hooks/useCampNotes";
import { motion } from "framer-motion";

function RatingStars({ rating, max = 5, size = 16 }: { rating: number; max?: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "fill-sand text-sand" : "text-border"}
        />
      ))}
    </span>
  );
}

function PhotoGallery({ photos, captions, siteCount = 0 }: { photos: string[]; captions?: string[]; siteCount?: number }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = (i: number) => setCurrent(((i % photos.length) + photos.length) % photos.length);
  const isSitePhoto = (i: number) => i >= 1 && i <= siteCount;

  if (photos.length === 0) return null;

  return (
    <>
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
          <Camera size={18} className="text-pine" />
          营地实景照片
          <span className="text-sm font-mono font-normal text-muted-foreground">({photos.length}张)</span>
        </h2>
        <div
          className="relative rounded-lg overflow-hidden bg-muted aspect-[16/10] mb-3 cursor-pointer touch-pan-y"
          onClick={() => setLightbox(true)}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
            touchStartX.current = null;
          }}
        >
          <img
            src={photos[current]}
            alt={captions?.[current] || `营地照片 ${current + 1}`}
            className="w-full h-full object-cover"
          />
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + photos.length) % photos.length); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % photos.length); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
          {isSitePhoto(current) && (
            <div className="absolute top-3 left-3 bg-pine/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              营位实景
            </div>
          )}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white scale-125" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>
        {captions?.[current] && (
          <p className="text-sm text-muted-foreground text-center">{captions[current]}</p>
        )}
        {/* Thumbnails */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-3">
          {photos.map((p, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${i === current ? "border-pine" : "border-transparent opacity-70 hover:opacity-100"}`}
            >
              <img src={p} alt="" className="w-full h-full object-cover" />
              {isSitePhoto(i) && (
                <span className="absolute bottom-0.5 left-0.5 bg-pine/90 text-white text-[10px] leading-none px-1.5 py-0.5 rounded">
                  营位
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
            <X size={20} />
          </button>
          <img
            src={photos[current]}
            alt=""
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + photos.length) % photos.length); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % photos.length); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

function CampgroundMapImage({ mapUrl, name }: { mapUrl: string; name: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
          <MapIcon size={18} className="text-pine" />
          营地平面图
        </h2>
        <div className="rounded-lg overflow-hidden cursor-pointer border border-border" onClick={() => setExpanded(true)}>
          <img src={mapUrl} alt={`${name} 营地地图`} className="w-full h-auto" />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">点击放大查看</p>
      </div>
      {expanded && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setExpanded(false)}>
          <button className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
            <X size={20} />
          </button>
          <img src={mapUrl} alt={`${name} 营地地图`} className="max-w-[95vw] max-h-[90vh] object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}

function InteractiveMap({ campId, campName }: { campId: number; campName: string }) {
  const coords = campgroundCoords[campId];
  if (!coords) return null;

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
        <Navigation size={18} className="text-pine" />
        位置与路线
      </h2>
      <div className="rounded-lg overflow-hidden border border-border h-[300px]">
        <MapView
          src={`/camping-guide/images/maps/camp-${campId}-z11.png`}
          href={`https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`}
          title={`${campName} 位置地图（点击在地图 App 中打开）`}
          className="h-[300px]"
        />
      </div>
      <div className="mt-3 flex gap-2">
        <a
          href={`https://www.google.com/maps/dir/${REDMOND_COORDS.lat},${REDMOND_COORDS.lng}/${coords.lat},${coords.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pine/10 text-pine rounded-lg hover:bg-pine/20 transition-colors text-sm"
        >
          <Navigation size={14} />
          从 Redmond 出发导航
        </a>
      </div>
    </div>
  );
}

function WeatherWidget({ campId }: { campId: number }) {
  const coords = campgroundCoords[campId];
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coords) return;
    setLoading(true);
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode,windspeed_10m_max&timezone=America/Los_Angeles&forecast_days=7`)
      .then((r) => r.json())
      .then((data) => { setWeather(data.daily); setLoading(false); })
      .catch(() => setLoading(false));
  }, [coords?.lat, coords?.lng]);

  if (!coords) return null;

  const weatherIcons: Record<number, string> = {
    0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️", 48: "🌫️",
    51: "🌦️", 53: "🌦️", 55: "🌧️", 61: "🌧️", 63: "🌧️", 65: "🌧️",
    71: "🌨️", 73: "🌨️", 75: "❄️", 80: "🌦️", 81: "🌧️", 82: "⛈️",
    95: "⛈️", 96: "⛈️", 99: "⛈️",
  };

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
        <Cloud size={18} className="text-lake" />
        未来7天天气
      </h2>
      {loading ? (
        <div className="h-24 flex items-center justify-center text-muted-foreground text-sm">加载中...</div>
      ) : weather ? (
        <div className="overflow-x-auto -mx-1 px-1">
        <div className="grid grid-cols-7 gap-2 min-w-[350px]">
          {weather.time.map((date: string, i: number) => (
            <div key={date} className="text-center p-2 rounded-lg bg-muted/50">
              <div className="text-[10px] text-muted-foreground font-mono">
                {new Date(date + "T12:00:00").toLocaleDateString("zh-CN", { weekday: "short" })}
              </div>
              <div className="text-xl my-1">{weatherIcons[weather.weathercode[i]] || "🌤️"}</div>
              <div className="flex items-center justify-center gap-0.5 text-[10px]">
                <Thermometer size={8} className="text-sunset" />
                <span className="font-mono">{Math.round(weather.temperature_2m_max[i])}°</span>
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">{Math.round(weather.temperature_2m_min[i])}°</div>
              <div className="flex items-center justify-center gap-0.5 text-[10px] mt-0.5">
                <Droplets size={8} className="text-lake" />
                <span className="font-mono">{weather.precipitation_probability_max[i]}%</span>
              </div>
            </div>
          ))}
        </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">天气数据暂时不可用</p>
      )}
    </div>
  );
}

function SeasonCalendar({ campId }: { campId: number }) {
  const season = seasonData.find((s) => s.campgroundId === campId);
  if (!season) return null;

  const ratingColors = [
    "bg-muted text-muted-foreground",
    "bg-amber-100 text-amber-800",
    "bg-emerald-100 text-emerald-800",
    "bg-pine/20 text-pine",
  ];
  const ratingLabels = ["关闭", "可去", "推荐", "最佳"];

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-2">
        <CalendarDays size={18} className="text-pine" />
        最佳季节日历
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        最佳月份: <span className="font-medium text-pine">{season.peakMonths}</span>
        {season.notes && <span className="ml-2">· {season.notes}</span>}
      </p>
      <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
        {season.months.map((rating, i) => (
          <div key={i} className={`rounded-lg p-2 text-center ${ratingColors[rating]} transition-all hover:scale-105`}>
            <div className="text-[10px] font-medium opacity-70">{monthLabels[i]}</div>
            <div className="text-xs font-bold mt-0.5">{ratingLabels[rating]}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-muted"></span>关闭</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-100"></span>可去</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-100"></span>推荐</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-pine/20"></span>最佳</span>
      </div>
    </div>
  );
}

function UserNotes({ campId, campName }: { campId: number; campName: string }) {
  const { notes, loading, isAuthenticated, addNote, deleteNote, shareNote, unshareNote, sharedMap, noteKeyOf, copyToClipboard } = useCampNotes(campId, campName);
  const [newNote, setNewNote] = useState("");
  const [busyKey, setBusyKey] = useState<string | null>(null);

  const handleAdd = async () => {
    if (!newNote.trim()) return;
    try {
      await addNote(newNote);
      setNewNote("");
    } catch (e: any) {
      toast.error(e?.message || "保存失败");
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteNote(id);
    } catch (e: any) {
      toast.error(e?.message || "删除失败");
    }
  };

  const handleShare = async (note: { id: string | number; text: string; date: string }) => {
    if (!isAuthenticated) {
      toast.info("登录后才能分享笔记，分享链接会同步到云端");
      return;
    }
    const key = noteKeyOf(note);
    setBusyKey(key);
    try {
      await shareNote(note);
      toast.success("分享链接已复制");
    } catch (e: any) {
      toast.error(e?.message || "分享失败");
    } finally {
      setBusyKey(null);
    }
  };

  const handleCopyShared = async (note: { id: string | number; text: string; date: string }) => {
    const key = noteKeyOf(note);
    const token = sharedMap[key];
    if (!token) return;
    try {
      await copyToClipboard(`${window.location.origin}${import.meta.env.BASE_URL}shared/${token}`);
      toast.success("分享链接已复制");
    } catch {
      toast.error("复制失败");
    }
  };

  const handleUnshare = async (note: { id: string | number; text: string; date: string }) => {
    const key = noteKeyOf(note);
    setBusyKey(key);
    try {
      await unshareNote(note);
      toast.success("已取消分享");
    } catch (e: any) {
      toast.error(e?.message || "取消分享失败");
    } finally {
      setBusyKey(null);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
        <StickyNote size={18} className="text-sand" />
        家庭笔记
        <span className="text-sm font-normal text-muted-foreground">({notes.length}条)</span>
        {!isAuthenticated && (
          <span className="text-xs font-normal text-muted-foreground">· 仅保存在本机，登录后可云端同步</span>
        )}
      </h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="记录心得、下次要带的东西..."
          className="flex-1 px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-pine/30"
        />
        <button onClick={handleAdd} className="px-4 py-3 sm:px-3 sm:py-2 bg-pine text-white rounded-lg text-sm hover:bg-pine-light transition-colors">
          <Save size={14} />
        </button>
      </div>
      {loading ? (
        <p className="text-sm text-muted-foreground">加载中...</p>
      ) : notes.length > 0 && (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {notes.map((note) => {
            const key = noteKeyOf(note);
            const token = sharedMap[key];
            const busy = busyKey === key;
            return (
              <div key={key} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 text-sm">
                <div className="flex-1">
                  <p>{note.text}</p>
                  <span className="text-[10px] text-muted-foreground">{note.date}</span>
                  {note.ownerName && (
                    <span className="ml-2 text-[10px] font-mono text-lake bg-lake/10 px-1.5 py-0.5 rounded">{note.ownerName}</span>
                  )}
                  {token && (
                    <span className="ml-2 text-[10px] text-lake">已分享</span>
                  )}
                </div>
                {note.isMine !== false && (token ? (
                  <>
                    <button
                      onClick={() => handleCopyShared(note)}
                      disabled={busy}
                      title="复制分享链接"
                      className="flex items-center gap-1 text-[11px] text-lake hover:text-pine transition-colors disabled:opacity-50"
                    >
                      <Link2 size={12} />复制链接
                    </button>
                    <button
                      onClick={() => handleUnshare(note)}
                      disabled={busy}
                      title="取消分享"
                      className="text-muted-foreground hover:text-sunset transition-colors disabled:opacity-50"
                    >
                      <Link2Off size={12} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleShare(note)}
                    disabled={busy}
                    title={isAuthenticated ? "生成分享链接" : "登录后分享"}
                    className="text-muted-foreground hover:text-pine transition-colors disabled:opacity-50"
                  >
                    <Share2 size={12} />
                  </button>
                ))}
                {note.isMine !== false && (
                  <button onClick={() => handleDelete(note.id)} className="text-muted-foreground hover:text-sunset transition-colors">
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function VisitedMarker({ campId, campName }: { campId: number; campName: string }) {
  const { getVisitsForCampground, addVisit, deleteVisit, loading, isAuthenticated } = useVisited();
  const visits = getVisitsForCampground(campId);
  const [showForm, setShowForm] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newSites, setNewSites] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const handleAddVisit = async () => {
    if (!newDate) return;
    setSaving(true);
    try {
      await addVisit({
        campgroundId: campId,
        startDate: newDate,
        endDate: newEndDate || null,
        sites: newSites.trim(),
        notes: newNotes.trim() || null,
      });
      setNewDate(""); setNewEndDate(""); setNewSites(""); setNewNotes(""); setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveVisit = async (visit: typeof visits[0], index: number) => {
    await deleteVisit(visit, index);
  };

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
        <CheckCircle2 size={18} className={visits.length > 0 ? "text-emerald-600" : "text-muted-foreground"} />
        已去过记录
        {visits.length > 0 && (
          <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
            {visits.length}次
          </span>
        )}
        {isAuthenticated && (
          <span className="text-[10px] font-mono text-lake bg-lake/10 px-1.5 py-0.5 rounded ml-auto">云同步</span>
        )}
      </h2>

      {loading && (
        <div className="text-sm text-muted-foreground py-2">加载中...</div>
      )}

      {!loading && visits.length > 0 && (
        <div className="space-y-2 mb-4">
          {visits.map((v, i) => (
            <div key={v.id || i} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm font-medium flex-wrap">
                  <Calendar size={12} className="text-emerald-600" />
                  <span>{v.startDate}{v.endDate ? ` ~ ${v.endDate}` : ""}</span>
                  {v.endDate && (
                    <span className="text-[10px] font-mono text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">
                      {Math.ceil((new Date(v.endDate).getTime() - new Date(v.startDate).getTime()) / (1000 * 60 * 60 * 24))}晚
                    </span>
                  )}
                  {v.sites && <span className="text-xs font-mono bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">Site: {v.sites}</span>}
                  {v.ownerName && <span className="text-[10px] font-mono bg-lake/10 text-lake px-1.5 py-0.5 rounded">{v.ownerName}</span>}
                </div>
                {v.notes && <p className="text-xs text-muted-foreground mt-1">{v.notes}</p>}
              </div>
              {v.isMine !== false && (
                <button onClick={() => handleRemoveVisit(v, i)} className="text-muted-foreground hover:text-sunset text-xs">
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {showForm ? (
        <div className="space-y-2 p-3 rounded-lg bg-muted/50 border border-border">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-muted-foreground mb-0.5 block">入住日期</label>
              <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full px-3 py-1.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-pine/30" />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground mb-0.5 block">离开日期</label>
              <input type="date" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)} min={newDate || undefined} className="w-full px-3 py-1.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-pine/30" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input type="text" value={newSites} onChange={(e) => setNewSites(e.target.value)} placeholder="营位号 (如 135, B12)" className="px-3 py-1.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-pine/30" />
            <input type="text" value={newNotes} onChange={(e) => setNewNotes(e.target.value)} placeholder="记录心得、下次要带的东西..." className="px-3 py-1.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-pine/30" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddVisit} disabled={saving} className="px-3 py-1.5 bg-pine text-white rounded-lg text-sm hover:bg-pine-light transition-colors disabled:opacity-50">{saving ? "保存中..." : "保存"}</button>
            <button onClick={() => setShowForm(false)} className="px-3 py-1.5 bg-secondary text-muted-foreground rounded-lg text-sm hover:bg-muted transition-colors">取消</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} className="w-full py-3 sm:py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-pine hover:border-pine transition-colors">
          + 添加去过记录
        </button>
      )}
    </div>
  );
}

export default function CampgroundDetail() {
  const params = useParams<{ id: string }>();
  const campground = campgrounds.find((c) => c.id === Number(params.id));
  const photoData = campgroundPhotos[Number(params.id)];
  const { toggleFavorite, isFavorite, addToCompare, isInCompare, removeFromCompare } = useFavorites();

  // Scroll to top when entering detail page or switching campground
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  if (!campground) {
    return (
      <div className="min-h-screen topo-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">营地未找到</h1>
          <Link href="/" className="mt-4 inline-flex items-center gap-2 text-pine hover:underline">
            <ArrowLeft size={16} /> 返回首页
          </Link>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(campground.id);
  const inCompare = isInCompare(campground.id);

  return (
    <div className="min-h-screen topo-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <Link href="/?scrollTo=table" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
            <span>返回列表</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(campground.id)}
              className={`w-11 h-11 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${favorited ? "bg-sunset/10 text-sunset" : "bg-secondary text-muted-foreground hover:text-sunset hover:bg-sunset/10"}`}
              title={favorited ? "取消收藏" : "收藏"}
            >
              <Heart size={16} className={favorited ? "fill-current" : ""} />
            </button>
            <button
              onClick={() => inCompare ? removeFromCompare(campground.id) : addToCompare(campground.id)}
              className={`w-11 h-11 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${inCompare ? "bg-lake/10 text-lake" : "bg-secondary text-muted-foreground hover:text-lake hover:bg-lake/10"}`}
              title={inCompare ? "从比较中移除" : "加入比较"}
            >
              <GitCompareArrows size={16} />
            </button>
            <span className="drive-badge"><Clock size={12} />{campground.driveTimeLabel}</span>
            <span className="text-xs font-mono text-muted-foreground px-2 py-0.5 rounded bg-secondary">{campground.state}</span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <section className="relative h-56 md:h-72 overflow-hidden">
        <img src={campground.image} alt={campground.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container pb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {campground.warning && (
              <div className="inline-flex items-center gap-1.5 bg-sunset/90 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
                <AlertTriangle size={12} />{campground.warning}
              </div>
            )}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">{campground.nameCn}</h1>
            <p className="text-white/80 font-mono text-sm mt-1">{campground.name}</p>
            <p className="text-white/90 mt-2 text-lg">{campground.tagline}</p>
          </motion.div>
        </div>
      </section>

      <div className="container py-8 max-w-4xl mx-auto">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-10 relative z-10 mb-8"
        >
          <div className="bg-white rounded-xl p-4 shadow-md border border-border text-center">
            <TreePine size={20} className="mx-auto text-pine mb-1" />
            <div className="text-xs text-muted-foreground mb-1">风景</div>
            <RatingStars rating={campground.sceneryRating} size={14} />
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-border text-center">
            <Baby size={20} className="mx-auto text-lake mb-1" />
            <div className="text-xs text-muted-foreground mb-1">娃可玩</div>
            <RatingStars rating={campground.kidRating} size={14} />
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-border text-center">
            <Truck size={20} className="mx-auto text-sand mb-1" />
            <div className="text-xs text-muted-foreground mb-1">TC适配</div>
            <RatingStars rating={campground.tcRating} size={14} />
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-border text-center">
            <MapPin size={20} className="mx-auto text-sunset mb-1" />
            <div className="text-xs text-muted-foreground mb-1">地区</div>
            <div className="text-sm font-medium">{campground.region}</div>
          </div>
        </motion.div>

        {/* === CLOSURE ALERT BANNER === */}
        {campground.closureInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12 }}
            className="bg-red-50 border-2 border-red-300 rounded-xl p-5 mb-6"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Ban size={20} className="text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-bold text-red-800 flex items-center gap-2">
                  ⚠️ 营地当前关闭中
                </h3>
                <div className="mt-2 space-y-1.5">
                  <p className="text-sm text-red-700">
                    <span className="font-semibold">关闭原因:</span> {campground.closureInfo.reason}
                  </p>
                  <p className="text-sm text-red-700">
                    <span className="font-semibold">关闭时间:</span> {campground.closureInfo.closedSince} 起
                  </p>
                  <p className="text-sm text-red-700">
                    <span className="font-semibold">预计重开:</span> {campground.closureInfo.expectedReopen}
                  </p>
                  <p className="text-xs text-red-600/70 mt-2">
                    信息来源: {campground.closureInfo.source} · 最后检查: {campground.closureInfo.lastChecked}
                  </p>
                </div>
                <div className="mt-3 p-2 bg-red-100/50 rounded-lg">
                  <p className="text-xs text-red-800">
                    💡 建议关注官方网站获取最新施工进度。如营地已重新开放，本站将在下次定期更新时自动反映。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* === IMPORTANT INFO FIRST === */}
        <div className="space-y-6">

          {/* 0. Description & Popularity */}
          {campground.description && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.11 }}
              className="bg-white rounded-xl border border-border p-5"
            >
              <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-3">
                <Info size={18} className="text-lake" />
                营地简介
              </h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">{campground.description}</p>
              <div className="flex flex-wrap items-center gap-3">
                {campground.popularityLevel && (
                  <div className="inline-flex items-center gap-1.5">
                    <Flame size={14} className={campground.popularityLevel.startsWith("极高") ? "text-red-500" : campground.popularityLevel.startsWith("高") ? "text-orange-500" : campground.popularityLevel.startsWith("中等") ? "text-amber-500" : "text-emerald-500"} />
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      campground.popularityLevel.startsWith("极高") ? "bg-red-50 text-red-700 border border-red-200" :
                      campground.popularityLevel.startsWith("高") ? "bg-orange-50 text-orange-700 border border-orange-200" :
                      campground.popularityLevel.startsWith("中等") ? "bg-amber-50 text-amber-700 border border-amber-200" :
                      "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}>
                      热门度: {campground.popularityLevel.split("（")[0].split(" (")[0]}
                    </span>
                  </div>
                )}
                {campground.reviewCount && (
                  <div className="inline-flex items-center gap-1.5">
                    <MessageCircle size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{campground.reviewCount}</span>
                  </div>
                )}
              </div>
              {campground.popularityLevel && (campground.popularityLevel.includes("（") || campground.popularityLevel.includes("(")) && (
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed italic">
                  {campground.popularityLevel.includes("（") 
                    ? campground.popularityLevel.split("（").slice(1).join("（").replace(/）$/, "")
                    : campground.popularityLevel.split("(").slice(1).join("(").replace(/\)$/, "")}
                </p>
              )}
              {/* Quick action links */}
              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border">
                <a
                  href={campground.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-3 sm:py-2 bg-pine text-white rounded-lg hover:bg-pine-light transition-colors text-sm font-medium"
                >
                  <ExternalLink size={14} />
                  去预订
                </a>
                {campground.googleMapsUrl && (
                  <a
                    href={campground.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-3 sm:py-2 bg-white border border-border text-foreground rounded-lg hover:bg-muted/50 transition-colors text-sm font-medium"
                  >
                    <Navigation size={14} className="text-pine" />
                    导航到营地入口
                  </a>
                )}
              </div>
            </motion.div>
          )}

          {/* 1. Photo Gallery - right below intro */}
          {photoData && photoData.photos.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12 }}
              className="bg-white rounded-xl border border-border p-5"
            >
              <PhotoGallery
                photos={[campground.image, ...photoData.photos.filter((p) => p.includes("/site-")), ...photoData.photos.filter((p) => !p.includes("/site-"))]}
                captions={[
                  campground.nameCn + " 全景",
                  ...(photoData.captions || []).filter((_, i) => photoData.photos[i]?.includes("/site-")),
                  ...(photoData.captions || []).filter((_, i) => !photoData.photos[i]?.includes("/site-")),
                ]}
                siteCount={photoData.photos.filter((p) => p.includes("/site-")).length}
              />
            </motion.div>
          )}

          {/* 2. Area Ratings - MOST IMPORTANT */}
          {campground.areas.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12 }}
              className="bg-white rounded-xl border border-border p-5"
            >
              <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-sunset" />
                Area 评分与详解
                <span className="text-xs font-mono font-normal text-muted-foreground">({campground.areas.length}个区域)</span>
              </h2>
              {/* Desktop: table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Area/Loop</th>
                      <th className="text-center py-2 px-3 font-medium text-muted-foreground">综合</th>
                      <th className="text-center py-2 px-3 font-medium text-muted-foreground">风景</th>
                      <th className="text-center py-2 px-3 font-medium text-muted-foreground">娃可玩</th>
                      <th className="text-center py-2 px-3 font-medium text-muted-foreground">TC适配</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">水电</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">推荐度</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campground.areas.map((area, i) => (
                      <tr key={i} className={area.areaSummary ? "border-b-0" : "border-b border-border/50 last:border-0"}>
                        <td className="py-2.5 px-3 font-medium">{area.area}</td>
                        <td className="py-2.5 px-3 text-center"><RatingStars rating={area.overall} size={12} /></td>
                        <td className="py-2.5 px-3 text-center"><RatingStars rating={area.scenery} size={12} /></td>
                        <td className="py-2.5 px-3 text-center"><RatingStars rating={area.kidFriendly} size={12} /></td>
                        <td className="py-2.5 px-3 text-center"><RatingStars rating={area.tcCompat} size={12} /></td>
                        <td className="py-2.5 px-3 text-muted-foreground">{area.hookups}</td>
                        <td className="py-2.5 px-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            area.recommendation === "强烈推荐" ? "bg-pine/10 text-pine" :
                            area.recommendation === "推荐" ? "bg-lake/10 text-lake" :
                            area.recommendation === "避坑" || area.recommendation === "不推荐" ? "bg-sunset/10 text-sunset" :
                            "bg-secondary text-muted-foreground"
                          }`}>
                            {area.recommendation}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile: stacked cards, no horizontal scroll */}
              <div className="sm:hidden space-y-3">
                {campground.areas.map((area, i) => (
                  <div key={i} className="rounded-lg border border-border/60 p-3 bg-muted/20">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-medium text-sm">{area.area}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                        area.recommendation === "强烈推荐" ? "bg-pine/10 text-pine" :
                        area.recommendation === "推荐" ? "bg-lake/10 text-lake" :
                        area.recommendation === "避坑" || area.recommendation === "不推荐" ? "bg-sunset/10 text-sunset" :
                        "bg-secondary text-muted-foreground"
                      }`}>
                        {area.recommendation}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                      {[
                        { label: "综合", v: area.overall },
                        { label: "风景", v: area.scenery },
                        { label: "娃可玩", v: area.kidFriendly },
                        { label: "TC适配", v: area.tcCompat },
                      ].map((r) => (
                        <div key={r.label} className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{r.label}</span>
                          <RatingStars rating={r.v} size={12} />
                        </div>
                      ))}
                    </div>
                    {area.hookups && (
                      <div className="mt-2 pt-2 border-t border-border/40 text-xs text-muted-foreground">
                        水电：{area.hookups}
                      </div>
                    )}
                  </div>
                ))}
              </div>
                {/* Area Summaries below the table */}
                {campground.areas.some(a => a.areaSummary) && (
                  <div className="mt-4 space-y-2">
                    {campground.areas.filter(a => a.areaSummary).map((area, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/40 border border-border/30">
                        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                          <span className="text-xs font-mono font-medium text-pine bg-pine/10 px-2 py-0.5 rounded">{area.area}</span>
                          {area.entranceUrl && (
                            <a
                              href={area.entranceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-0.5 text-[10px] text-lake hover:text-pine transition-colors px-1.5 py-0.5 rounded bg-lake/5 hover:bg-lake/10"
                              title="导航到该区域入口"
                            >
                              <Navigation size={10} />
                              入口
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{area.areaSummary}</p>
                      </div>
                    ))}
                  </div>
                )}
            </motion.div>
          )}

          {/* 2. Recommendations & Tips */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.14 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="bg-pine/5 rounded-xl border border-pine/20 p-5">
              <h3 className="font-display font-bold text-pine mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pine/10 flex items-center justify-center text-xs">✓</span>
                推荐营位
              </h3>
              <p className="text-sm text-foreground leading-relaxed">{campground.recommendedSites}</p>
            </div>
            <div className="bg-sunset/5 rounded-xl border border-sunset/20 p-5">
              <h3 className="font-display font-bold text-sunset mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sunset/10 flex items-center justify-center text-xs">✗</span>
                避坑
              </h3>
              <p className="text-sm text-foreground leading-relaxed">{campground.avoid}</p>
            </div>
          </motion.div>

          {/* 3. TC Notes */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.16 }}
            className="bg-sand-light/30 rounded-xl border border-sand/30 p-5"
          >
            <h3 className="font-display font-bold text-foreground mb-2 flex items-center gap-2">
              <Truck size={18} className="text-sand" />
              Truck Camper 适配说明
            </h3>
            <p className="text-sm text-foreground leading-relaxed">{campground.tcNotes}</p>
            {campground.state === "BC" && (
              <div className="mt-4 p-3 bg-amber-50/80 border border-amber-200/60 rounded-lg">
                <p className="text-xs font-semibold text-amber-800 mb-1.5">🇨🇦 BC过境提示</p>
                <ul className="text-xs text-amber-900/80 space-y-1 list-disc list-inside">
                  <li>护照/NEXUS卡必带，儿童也需护照</li>
                  <li>禁止携带柴火过境（加拿大严格禁止外来木材，当地购买或用营地提供的）</li>
                  <li>食物限制：禁止携带鲜肉/水果/蔬菜过境，罐头和包装食品OK</li>
                  <li>建议周日-周四过境避开周末高峰，Peace Arch和Pacific Highway口岸最常用</li>
                  <li>加油：BC省油价显著高于WA，建议过境前加满</li>
                </ul>
              </div>
            )}
          </motion.div>

          {/* 4. Vacancy Analysis - NEW */}
          {campground.vacancyAnalysis && campground.vacancyAnalysis.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }}
              className="bg-white rounded-xl border border-border p-5"
            >
              <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-lake" />
                空位与秒光分析
              </h2>
              <div className="space-y-3">
                {campground.vacancyAnalysis.map((v, i) => (
                  <div key={i} className="rounded-lg border border-border/60 p-3">
                    <div className="font-medium text-sm mb-1.5 flex items-center gap-2">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted">{v.area}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      {v.whyHard && v.whyHard !== "—" && (
                        <div className="flex items-start gap-2">
                          <TrendingUp size={14} className="text-sunset mt-0.5 shrink-0" />
                          <div>
                            <span className="text-[10px] font-medium text-sunset uppercase">为什么秒光</span>
                            <p className="text-muted-foreground text-xs mt-0.5">{v.whyHard}</p>
                          </div>
                        </div>
                      )}
                      {v.whyVacant && v.whyVacant !== "—" && (
                        <div className="flex items-start gap-2">
                          <TrendingDown size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                          <div>
                            <span className="text-[10px] font-medium text-emerald-600 uppercase">为什么有空位</span>
                            <p className="text-muted-foreground text-xs mt-0.5">{v.whyVacant}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 5. Booking Windows - NEW */}
          {campground.bookingWindows && campground.bookingWindows.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-xl border border-border p-5"
            >
              <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
                <Calendar size={18} className="text-pine" />
                预订日历
              </h2>
              <div className="space-y-2">
                {campground.bookingWindows.map((bw, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-pine/5 border border-pine/10">
                    <div className="w-20 text-center">
                      <div className="text-lg font-bold text-pine">{bw.advanceLabel}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{bw.area}</div>
                      <div className="text-xs text-muted-foreground">{bw.notes}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <a
                  href={campground.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-3 sm:py-2 bg-pine text-white rounded-lg hover:bg-pine-light transition-colors text-sm font-medium"
                >
                  <ExternalLink size={14} />
                  去 {campground.bookingSystem} 预订
                </a>
              </div>
            </motion.div>
          )}

          {/* 6. Activities */}
          {campground.activities.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.22 }}
              className="bg-white rounded-xl border border-border p-5"
            >
              <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
                <Baby size={18} className="text-lake" />
                娃可玩项目清单
              </h2>
              <div className="space-y-4">
                {campground.activities.map((act, i) => (
                  <ActivityCard
                    key={i}
                    name={act.name}
                    ageRange={act.ageRange}
                    distance={act.distance}
                    details={act.details}
                    mapUrl={act.mapUrl}
                    googleRating={act.googleRating}
                    fallbackPhoto={activityPhotos[act.name]}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* 7. Review Insights */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.23 }}
            className="bg-white rounded-xl border border-border p-5"
          >
            <InsightsPanel campgroundId={campground.id} />
          </motion.div>

          {/* 8. Site Map Annotations */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
            className="bg-white rounded-xl border border-border p-5"
          >
            <SiteMapSection campgroundId={campground.id} campgroundName={campground.name} lat={campground.lat} lng={campground.lng} />
          </motion.div>

          {/* 9. Review Trend Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
            <ReviewTrendChart campgroundId={campground.id} />
          </motion.div>
          {/* 10. User Reviews */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.26 }}
            className="bg-white rounded-xl border border-border p-5"
          >
            <ReviewsSection campgroundId={campground.id} />
          </motion.div>

          {/* 9. Season Calendar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.26 }}>
            <SeasonCalendar campId={campground.id} />
          </motion.div>

          {/* 10. Campground Map Image */}
          {photoData?.map && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.28 }}>
              <CampgroundMapImage mapUrl={photoData.map} name={campground.nameCn} />
            </motion.div>
          )}

          {/* 10. Interactive Google Map */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
            <InteractiveMap campId={campground.id} campName={campground.name} />
          </motion.div>

          {/* 11. Weather */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.32 }}>
            <WeatherWidget campId={campground.id} />
          </motion.div>

          {/* 12. User Notes */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.34 }}>
            <UserNotes campId={campground.id} campName={campground.nameCn} />
          </motion.div>

          {/* 13. Visited Marker */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.36 }}>
            <VisitedMarker campId={campground.id} campName={campground.nameCn} />
          </motion.div>

          {/* Features Tags */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.38 }}
            className="flex flex-wrap gap-2"
          >
            {campground.features.map((f) => (
              <span key={f} className="px-3 py-1.5 rounded-full text-sm bg-white border border-border text-foreground">{f}</span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      {/* Last Updated */}
      {campground.lastUpdated && (
        <div className="container mt-6 text-center">
          <p className="text-xs text-muted-foreground/50 font-mono">
            数据最后验证: {campground.lastUpdated}
          </p>
        </div>
      )}

      <footer className="border-t border-border bg-white/50 backdrop-blur-sm mt-4">
        <div className="container py-6 flex items-center justify-between">
          <Link href="/?scrollTo=table" className="flex items-center gap-2 text-sm text-pine hover:underline">
            <ArrowLeft size={14} />
            返回所有营地
          </Link>
          <a
            href={campground.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-3 sm:py-2 bg-pine text-white rounded-lg hover:bg-pine-light transition-colors text-sm font-medium"
          >
            <ExternalLink size={14} />
            预订此营地
          </a>
        </div>
      </footer>
    </div>
  );
}

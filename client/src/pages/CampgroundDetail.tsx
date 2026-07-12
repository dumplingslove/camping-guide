import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "wouter";
import { campgrounds } from "@/data/campgrounds";
import { campgroundPhotos } from "@/data/photos";
import { campgroundCoords, REDMOND_COORDS } from "@/data/coordinates";
import { seasonData, monthLabels } from "@/data/seasons";
import { useFavorites } from "@/contexts/FavoritesContext";
import { MapView } from "@/components/Map";
import { ArrowLeft, Clock, MapPin, Star, TreePine, Baby, Truck, ExternalLink, AlertTriangle, Bookmark, ChevronLeft, ChevronRight, Map as MapIcon, Camera, X, Heart, GitCompareArrows, Cloud, Thermometer, Wind, Droplets, Navigation, CalendarDays, StickyNote, Save, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

function PhotoGallery({ photos, captions }: { photos: string[]; captions?: string[] }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (photos.length === 0) return null;

  return (
    <>
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
          <Camera size={18} className="text-pine" />
          营地实景照片
          <span className="text-sm font-mono font-normal text-muted-foreground">({photos.length}张)</span>
        </h2>
        <div className="relative rounded-lg overflow-hidden bg-muted aspect-[16/10] mb-3 cursor-pointer" onClick={() => setLightbox(true)}>
          <img
            src={photos[current]}
            alt={captions?.[current] || `营地照片 ${current + 1}`}
            className="w-full h-full object-cover"
          />
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + photos.length) % photos.length); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % photos.length); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
          {captions?.[current] && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-white text-sm">{captions[current]}</p>
            </div>
          )}
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-mono">
            {current + 1} / {photos.length}
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all ${
                i === current ? "border-pine ring-1 ring-pine/30" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <button className="absolute top-4 right-4 text-white/80 hover:text-white" onClick={() => setLightbox(false)}>
              <X size={28} />
            </button>
            <img
              src={photos[current]}
              alt={captions?.[current] || ""}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + photos.length) % photos.length); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % photos.length); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            {captions?.[current] && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
                {captions[current]}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CampgroundMapImage({ mapUrl, name }: { mapUrl: string; name: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
          <MapIcon size={18} className="text-lake" />
          营地平面图
        </h2>
        <div
          className="rounded-lg overflow-hidden bg-muted cursor-pointer border border-border"
          onClick={() => setExpanded(true)}
        >
          <img
            src={mapUrl}
            alt={`${name} 营地地图`}
            className="w-full h-auto max-h-96 object-contain"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">点击放大查看</p>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setExpanded(false)}
          >
            <button className="absolute top-4 right-4 text-white/80 hover:text-white" onClick={() => setExpanded(false)}>
              <X size={28} />
            </button>
            <img
              src={mapUrl}
              alt={`${name} 营地地图`}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Interactive Google Map with directions
function InteractiveMap({ campId, campName }: { campId: number; campName: string }) {
  const coords = campgroundCoords[campId];
  const mapRef = useRef<google.maps.Map | null>(null);
  const [showDirections, setShowDirections] = useState(false);
  const [driveInfo, setDriveInfo] = useState<{ duration: string; distance: string } | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  if (!coords) return null;

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    // Add campground marker
    new google.maps.marker.AdvancedMarkerElement({
      map,
      position: coords,
      title: campName,
    });
  };

  const toggleDirections = () => {
    if (!mapRef.current) return;

    if (showDirections) {
      // Remove directions
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
        directionsRendererRef.current = null;
      }
      setShowDirections(false);
      setDriveInfo(null);
      mapRef.current.setCenter(coords);
      mapRef.current.setZoom(11);
    } else {
      // Show directions from Redmond
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        map: mapRef.current,
        suppressMarkers: false,
      });
      directionsRendererRef.current = directionsRenderer;

      directionsService.route(
        {
          origin: REDMOND_COORDS,
          destination: coords,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            directionsRenderer.setDirections(result);
            const leg = result.routes[0]?.legs[0];
            if (leg) {
              setDriveInfo({
                duration: leg.duration?.text || "",
                distance: leg.distance?.text || "",
              });
            }
            setShowDirections(true);
          }
        }
      );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
          <Navigation size={18} className="text-pine" />
          位置与路线
        </h2>
        <button
          onClick={toggleDirections}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            showDirections
              ? "bg-pine text-white"
              : "bg-secondary text-foreground hover:bg-pine/10"
          }`}
        >
          <MapPin size={12} />
          {showDirections ? "隐藏路线" : "从 Redmond 出发"}
        </button>
      </div>
      {driveInfo && (
        <div className="mb-3 flex items-center gap-4 text-sm bg-pine/5 rounded-lg px-4 py-2">
          <span className="flex items-center gap-1 font-mono">
            <Clock size={14} className="text-pine" />
            {driveInfo.duration}
          </span>
          <span className="flex items-center gap-1 font-mono">
            <MapPin size={14} className="text-pine" />
            {driveInfo.distance}
          </span>
        </div>
      )}
      <MapView
        className="h-[350px] rounded-lg overflow-hidden"
        initialCenter={coords}
        initialZoom={11}
        onMapReady={handleMapReady}
      />
    </div>
  );
}

// Weather widget using Open-Meteo API (free, no key needed)
function WeatherWidget({ campId }: { campId: number }) {
  const coords = campgroundCoords[campId];
  const [weather, setWeather] = useState<{
    daily: {
      time: string[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      precipitation_probability_max: number[];
      weathercode: number[];
      windspeed_10m_max: number[];
    };
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!coords) return;
    setLoading(true);
    setError(false);

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode,windspeed_10m_max&timezone=America/Los_Angeles&forecast_days=7&temperature_unit=fahrenheit&windspeed_unit=mph`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.daily) {
          setWeather(data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [coords?.lat, coords?.lng]);

  if (!coords) return null;

  const getWeatherIcon = (code: number) => {
    if (code <= 3) return "☀️";
    if (code <= 48) return "☁️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "🌨️";
    if (code <= 82) return "🌧️";
    if (code <= 86) return "❄️";
    return "⛈️";
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr + "T12:00:00");
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "今天";
    if (date.toDateString() === tomorrow.toDateString()) return "明天";
    return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][date.getDay()];
  };

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
        <Cloud size={18} className="text-lake" />
        未来7天天气预报
      </h2>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-pine border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <p className="text-sm text-muted-foreground text-center py-4">天气数据暂时无法获取</p>
      )}

      {weather && (
        <div className="grid grid-cols-7 gap-2">
          {weather.daily.time.map((day, i) => (
            <div key={day} className="text-center p-2 rounded-lg bg-secondary/50">
              <div className="text-xs font-medium text-muted-foreground mb-1">{getDayName(day)}</div>
              <div className="text-xl mb-1">{getWeatherIcon(weather.daily.weathercode[i])}</div>
              <div className="text-xs font-mono">
                <span className="text-foreground font-semibold">{Math.round(weather.daily.temperature_2m_max[i])}°</span>
                <span className="text-muted-foreground"> / {Math.round(weather.daily.temperature_2m_min[i])}°</span>
              </div>
              <div className="mt-1 flex items-center justify-center gap-0.5 text-[10px] text-muted-foreground">
                <Droplets size={10} />
                {weather.daily.precipitation_probability_max[i]}%
              </div>
              <div className="flex items-center justify-center gap-0.5 text-[10px] text-muted-foreground">
                <Wind size={10} />
                {Math.round(weather.daily.windspeed_10m_max[i])}mph
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-[10px] text-muted-foreground mt-3 text-center">
        数据来源: Open-Meteo · 温度单位: °F
      </p>
    </div>
  );
}

function SeasonCalendar({ campId }: { campId: number }) {
  const season = seasonData.find((s) => s.campgroundId === campId);
  if (!season) return null;

  const ratingColors = [
    "bg-muted text-muted-foreground",     // 0 = closed
    "bg-amber-100 text-amber-800",         // 1 = open but not ideal
    "bg-emerald-100 text-emerald-800",     // 2 = good
    "bg-pine/20 text-pine",                // 3 = peak/best
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
          <div
            key={i}
            className={`rounded-lg p-2 text-center ${ratingColors[rating]} transition-all hover:scale-105`}
          >
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

interface NoteEntry {
  id: string;
  text: string;
  date: string;
}

function UserNotes({ campId, campName }: { campId: number; campName: string }) {
  const storageKey = `camp_notes_${campId}`;
  const [notes, setNotes] = useState<NoteEntry[]>([]);
  const [newNote, setNewNote] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setNotes(JSON.parse(stored));
    } catch {}
  }, [storageKey]);

  const saveNotes = (updated: NoteEntry[]) => {
    setNotes(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    const entry: NoteEntry = {
      id: Date.now().toString(),
      text: newNote.trim(),
      date: new Date().toLocaleDateString("zh-CN"),
    };
    saveNotes([entry, ...notes]);
    setNewNote("");
  };

  const deleteNote = (id: string) => {
    saveNotes(notes.filter((n) => n.id !== id));
  };

  const startEdit = (note: NoteEntry) => {
    setEditing(note.id);
    setEditText(note.text);
  };

  const saveEdit = (id: string) => {
    if (!editText.trim()) return;
    saveNotes(notes.map((n) => n.id === id ? { ...n, text: editText.trim() } : n));
    setEditing(null);
  };

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
        <StickyNote size={18} className="text-sand" />
        家庭笔记
        <span className="text-sm font-normal text-muted-foreground">({notes.length}条)</span>
      </h2>
      
      {/* Add new note */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
          placeholder={`记录关于${campName}的笔记...`}
          className="flex-1 px-3 py-2 rounded-lg border border-border bg-paper text-sm focus:outline-none focus:ring-2 focus:ring-pine/30"
        />
        <button
          onClick={addNote}
          disabled={!newNote.trim()}
          className="px-3 py-2 bg-pine text-white rounded-lg text-sm font-medium hover:bg-pine-light transition-colors disabled:opacity-40"
        >
          <Save size={14} />
        </button>
      </div>

      {/* Notes list */}
      {notes.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          还没有笔记。记录你对这个营地的想法、经验或计划吧！
        </p>
      ) : (
        <div className="space-y-2">
          {notes.map((note) => (
            <div key={note.id} className="flex items-start gap-2 p-3 rounded-lg bg-paper border border-border/50 group">
              {editing === note.id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit(note.id)}
                    className="flex-1 px-2 py-1 rounded border border-border text-sm focus:outline-none focus:ring-2 focus:ring-pine/30"
                    autoFocus
                  />
                  <button onClick={() => saveEdit(note.id)} className="text-pine text-xs hover:underline">保存</button>
                  <button onClick={() => setEditing(null)} className="text-muted-foreground text-xs hover:underline">取消</button>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{note.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{note.date}</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(note)} className="p-1 text-muted-foreground hover:text-foreground rounded">
                      <StickyNote size={12} />
                    </button>
                    <button onClick={() => deleteNote(note.id)} className="p-1 text-muted-foreground hover:text-destructive rounded">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CampgroundDetail() {
  const params = useParams<{ id: string }>();
  const campground = campgrounds.find((c) => c.id === Number(params.id));
  const photoData = campgroundPhotos[Number(params.id)];
  const { toggleFavorite, isFavorite, addToCompare, isInCompare, removeFromCompare } = useFavorites();

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
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
            <span>返回列表</span>
          </Link>
          <div className="flex items-center gap-2">
            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(campground.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                favorited
                  ? "bg-sunset/10 text-sunset"
                  : "bg-secondary text-muted-foreground hover:text-sunset hover:bg-sunset/10"
              }`}
              title={favorited ? "取消收藏" : "收藏"}
            >
              <Heart size={16} className={favorited ? "fill-current" : ""} />
            </button>
            {/* Compare button */}
            <button
              onClick={() => inCompare ? removeFromCompare(campground.id) : addToCompare(campground.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                inCompare
                  ? "bg-lake/10 text-lake"
                  : "bg-secondary text-muted-foreground hover:text-lake hover:bg-lake/10"
              }`}
              title={inCompare ? "从比较中移除" : "加入比较"}
            >
              <GitCompareArrows size={16} />
            </button>
            <span className="drive-badge">
              <Clock size={12} />
              {campground.driveTimeLabel}
            </span>
            <span className="text-xs font-mono text-muted-foreground px-2 py-0.5 rounded bg-secondary">
              {campground.state}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={campground.image}
          alt={campground.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {campground.warning && (
              <div className="inline-flex items-center gap-1.5 bg-sunset/90 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
                <AlertTriangle size={12} />
                {campground.warning}
              </div>
            )}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
              {campground.nameCn}
            </h1>
            <p className="text-white/80 font-mono text-sm mt-1">{campground.name}</p>
            <p className="text-white/90 mt-2 text-lg">{campground.tagline}</p>
          </motion.div>
        </div>
      </section>

      <div className="container py-8 max-w-4xl mx-auto">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-12 relative z-10 mb-8"
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

        {/* Info Cards */}
        <div className="space-y-6">
          {/* Photo Gallery */}
          {photoData && photoData.photos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
            >
              <PhotoGallery photos={photoData.photos} captions={photoData.captions} />
            </motion.div>
          )}

          {/* Campground Map Image */}
          {photoData?.map && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
            >
              <CampgroundMapImage mapUrl={photoData.map} name={campground.nameCn} />
            </motion.div>
          )}

          {/* Interactive Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16 }}
          >
            <InteractiveMap campId={campground.id} campName={campground.name} />
          </motion.div>

          {/* Weather */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
          >
            <WeatherWidget campId={campground.id} />
          </motion.div>

          {/* Season Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.19 }}
          >
            <SeasonCalendar campId={campground.id} />
          </motion.div>

          {/* User Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.195 }}
          >
            <UserNotes campId={campground.id} campName={campground.nameCn} />
          </motion.div>

          {/* Booking Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-xl border border-border p-5"
          >
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-3">
              <Bookmark size={18} className="text-pine" />
              预订信息
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">预订系统</span>
                <p className="font-medium">{campground.bookingSystem}</p>
              </div>
              <div>
                <span className="text-muted-foreground">开放季节</span>
                <p className="font-medium">{campground.season}</p>
              </div>
              <div>
                <a
                  href={campground.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-pine text-white rounded-lg hover:bg-pine-light transition-colors text-sm font-medium"
                >
                  <ExternalLink size={14} />
                  去预订
                </a>
              </div>
            </div>
          </motion.div>

          {/* Activities */}
          {campground.activities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.22 }}
              className="bg-white rounded-xl border border-border p-5"
            >
              <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
                <Baby size={18} className="text-lake" />
                娃可玩项目清单
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">项目</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">适合年龄</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">距营地</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground hidden md:table-cell">详情</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campground.activities.map((act, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="py-2.5 px-3 font-medium">{act.name}</td>
                        <td className="py-2.5 px-3 font-mono text-xs">{act.ageRange}</td>
                        <td className="py-2.5 px-3 text-muted-foreground">{act.distance}</td>
                        <td className="py-2.5 px-3 text-muted-foreground hidden md:table-cell">{act.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Area Ratings */}
          {campground.areas.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-white rounded-xl border border-border p-5"
            >
              <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-sunset" />
                Area 评分与详解
              </h2>
              <div className="overflow-x-auto">
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
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="py-2.5 px-3 font-medium">{area.area}</td>
                        <td className="py-2.5 px-3 text-center">
                          <RatingStars rating={area.overall} size={12} />
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <RatingStars rating={area.scenery} size={12} />
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <RatingStars rating={area.kidFriendly} size={12} />
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <RatingStars rating={area.tcCompat} size={12} />
                        </td>
                        <td className="py-2.5 px-3 text-muted-foreground">{area.hookups}</td>
                        <td className="py-2.5 px-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            area.recommendation === "强烈推荐" ? "bg-pine/10 text-pine" :
                            area.recommendation === "推荐" ? "bg-lake/10 text-lake" :
                            area.recommendation.includes("专用") ? "bg-muted text-muted-foreground" :
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
            </motion.div>
          )}

          {/* Recommendations & Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="bg-pine/5 rounded-xl border border-pine/20 p-5">
              <h3 className="font-display font-bold text-pine mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pine/10 flex items-center justify-center text-xs">✓</span>
                推荐营位
              </h3>
              <p className="text-sm text-foreground">{campground.recommendedSites}</p>
            </div>
            <div className="bg-sunset/5 rounded-xl border border-sunset/20 p-5">
              <h3 className="font-display font-bold text-sunset mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sunset/10 flex items-center justify-center text-xs">✗</span>
                避坑
              </h3>
              <p className="text-sm text-foreground">{campground.avoid}</p>
            </div>
          </motion.div>

          {/* TC Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="bg-sand-light/30 rounded-xl border border-sand/30 p-5"
          >
            <h3 className="font-display font-bold text-foreground mb-2 flex items-center gap-2">
              <Truck size={18} className="text-sand" />
              Truck Camper 适配说明
            </h3>
            <p className="text-sm text-foreground">{campground.tcNotes}</p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-wrap gap-2"
          >
            {campground.features.map((f) => (
              <span
                key={f}
                className="px-3 py-1.5 rounded-full text-sm bg-white border border-border text-foreground"
              >
                {f}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-white/50 backdrop-blur-sm mt-8">
        <div className="container py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-pine hover:underline">
            <ArrowLeft size={14} />
            返回所有营地
          </Link>
          <a
            href={campground.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-pine text-white rounded-lg hover:bg-pine-light transition-colors text-sm font-medium"
          >
            <ExternalLink size={14} />
            预订此营地
          </a>
        </div>
      </footer>
    </div>
  );
}

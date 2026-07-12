import { useState } from "react";
import { Link } from "wouter";
import { campgrounds } from "@/data/campgrounds";
import { useFavorites } from "@/contexts/FavoritesContext";
import { ArrowLeft, X, Star, TreePine, Baby, Truck, Clock, MapPin, ExternalLink, Plus } from "lucide-react";
import { motion } from "framer-motion";

function RatingStars({ rating, max = 5, size = 14 }: { rating: number; max?: number; size?: number }) {
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

export default function Compare() {
  const { compareList, removeFromCompare, clearCompare, addToCompare } = useFavorites();
  const [showPicker, setShowPicker] = useState(false);

  const compareItems = compareList
    .map((id) => campgrounds.find((c) => c.id === id))
    .filter(Boolean) as typeof campgrounds;

  const availableToAdd = campgrounds.filter((c) => !compareList.includes(c.id));

  if (compareItems.length === 0) {
    return (
      <div className="min-h-screen topo-bg">
        <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-border">
          <div className="container flex items-center h-14">
            <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} />
              <span>返回首页</span>
            </Link>
          </div>
        </header>
        <div className="container py-20 text-center">
          <TreePine size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">还没有添加比较营地</h1>
          <p className="text-muted-foreground mb-6">在营地详情页点击"加入比较"按钮，最多可同时比较4个营地</p>
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-pine text-white rounded-lg hover:bg-pine-light transition-colors text-sm font-medium">
            浏览营地
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen topo-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
            <span>返回首页</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground font-mono">{compareItems.length}/4 营地</span>
            <button
              onClick={clearCompare}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              清空
            </button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6"
        >
          营地对比
        </motion.h1>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl border border-border overflow-hidden">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground w-32">对比项</th>
                {compareItems.map((camp) => (
                  <th key={camp.id} className="p-4 min-w-[200px]">
                    <div className="relative">
                      <button
                        onClick={() => removeFromCompare(camp.id)}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors"
                      >
                        <X size={12} />
                      </button>
                      <Link href={`/campground/${camp.id}`} className="hover:text-pine transition-colors">
                        <img src={camp.image} alt={camp.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                        <div className="font-display font-bold text-sm">{camp.nameCn}</div>
                        <div className="text-xs text-muted-foreground font-mono">{camp.name}</div>
                      </Link>
                    </div>
                  </th>
                ))}
                {compareItems.length < 4 && (
                  <th className="p-4 min-w-[200px]">
                    <button
                      onClick={() => setShowPicker(true)}
                      className="w-full h-24 rounded-lg border-2 border-dashed border-border hover:border-pine/30 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-pine transition-colors"
                    >
                      <Plus size={20} />
                      <span className="text-xs">添加营地</span>
                    </button>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {/* Drive Time */}
              <tr className="border-b border-border/50">
                <td className="p-4 text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-1.5"><Clock size={14} /> 车程</div>
                </td>
                {compareItems.map((camp) => (
                  <td key={camp.id} className="p-4 text-center">
                    <span className="drive-badge">{camp.driveTimeLabel}</span>
                  </td>
                ))}
                {compareItems.length < 4 && <td />}
              </tr>
              {/* Region */}
              <tr className="border-b border-border/50">
                <td className="p-4 text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-1.5"><MapPin size={14} /> 地区</div>
                </td>
                {compareItems.map((camp) => (
                  <td key={camp.id} className="p-4 text-center text-sm">{camp.region}</td>
                ))}
                {compareItems.length < 4 && <td />}
              </tr>
              {/* Scenery */}
              <tr className="border-b border-border/50">
                <td className="p-4 text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-1.5"><TreePine size={14} /> 风景</div>
                </td>
                {compareItems.map((camp) => (
                  <td key={camp.id} className="p-4 text-center">
                    <RatingStars rating={camp.sceneryRating} />
                  </td>
                ))}
                {compareItems.length < 4 && <td />}
              </tr>
              {/* Kid Friendly */}
              <tr className="border-b border-border/50">
                <td className="p-4 text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-1.5"><Baby size={14} /> 娃可玩</div>
                </td>
                {compareItems.map((camp) => (
                  <td key={camp.id} className="p-4 text-center">
                    <RatingStars rating={camp.kidRating} />
                  </td>
                ))}
                {compareItems.length < 4 && <td />}
              </tr>
              {/* TC Compat */}
              <tr className="border-b border-border/50">
                <td className="p-4 text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-1.5"><Truck size={14} /> TC适配</div>
                </td>
                {compareItems.map((camp) => (
                  <td key={camp.id} className="p-4 text-center">
                    <RatingStars rating={camp.tcRating} />
                  </td>
                ))}
                {compareItems.length < 4 && <td />}
              </tr>
              {/* Season */}
              <tr className="border-b border-border/50">
                <td className="p-4 text-sm font-medium text-muted-foreground">开放季节</td>
                {compareItems.map((camp) => (
                  <td key={camp.id} className="p-4 text-center text-sm">{camp.season}</td>
                ))}
                {compareItems.length < 4 && <td />}
              </tr>
              {/* Hookups */}
              <tr className="border-b border-border/50">
                <td className="p-4 text-sm font-medium text-muted-foreground">最佳水电</td>
                {compareItems.map((camp) => (
                  <td key={camp.id} className="p-4 text-center text-sm">
                    {camp.areas.length > 0 ? camp.areas[0].hookups : "N/A"}
                  </td>
                ))}
                {compareItems.length < 4 && <td />}
              </tr>
              {/* Features */}
              <tr className="border-b border-border/50">
                <td className="p-4 text-sm font-medium text-muted-foreground">特色</td>
                {compareItems.map((camp) => (
                  <td key={camp.id} className="p-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {camp.features.map((f) => (
                        <span key={f} className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
                {compareItems.length < 4 && <td />}
              </tr>
              {/* Recommended Sites */}
              <tr className="border-b border-border/50">
                <td className="p-4 text-sm font-medium text-muted-foreground">推荐营位</td>
                {compareItems.map((camp) => (
                  <td key={camp.id} className="p-4 text-sm text-center">{camp.recommendedSites}</td>
                ))}
                {compareItems.length < 4 && <td />}
              </tr>
              {/* TC Notes */}
              <tr className="border-b border-border/50">
                <td className="p-4 text-sm font-medium text-muted-foreground">TC说明</td>
                {compareItems.map((camp) => (
                  <td key={camp.id} className="p-4 text-sm text-center text-muted-foreground">{camp.tcNotes}</td>
                ))}
                {compareItems.length < 4 && <td />}
              </tr>
              {/* Booking */}
              <tr>
                <td className="p-4 text-sm font-medium text-muted-foreground">预订</td>
                {compareItems.map((camp) => (
                  <td key={camp.id} className="p-4 text-center">
                    <a
                      href={camp.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-pine text-white rounded-lg text-xs font-medium hover:bg-pine-light transition-colors"
                    >
                      <ExternalLink size={12} />
                      预订
                    </a>
                  </td>
                ))}
                {compareItems.length < 4 && <td />}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Picker Modal */}
      {showPicker && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={() => setShowPicker(false)}>
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[70vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-display font-bold">选择营地加入比较</h3>
              <button onClick={() => setShowPicker(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[55vh] p-2">
              {availableToAdd.map((camp) => (
                <button
                  key={camp.id}
                  onClick={() => { addToCompare(camp.id); setShowPicker(false); }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left"
                >
                  <img src={camp.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate">{camp.nameCn}</div>
                    <div className="text-xs text-muted-foreground font-mono">{camp.driveTimeLabel} · {camp.region}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

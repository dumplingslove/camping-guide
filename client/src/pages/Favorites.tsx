import { Link } from "wouter";
import { campgrounds } from "@/data/campgrounds";
import { useFavorites } from "@/contexts/FavoritesContext";
import { ArrowLeft, Heart, Star, Clock, TreePine } from "lucide-react";
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

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteItems = favorites
    .map((id) => campgrounds.find((c) => c.id === id))
    .filter(Boolean) as typeof campgrounds;

  return (
    <div className="min-h-screen topo-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
            <span>返回首页</span>
          </Link>
          <span className="text-sm text-muted-foreground font-mono">
            {favoriteItems.length} 个收藏
          </span>
        </div>
      </header>

      <div className="container py-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3"
        >
          <Heart size={24} className="text-sunset fill-sunset" />
          我的收藏
        </motion.h1>

        {favoriteItems.length === 0 ? (
          <div className="text-center py-16">
            <TreePine size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-lg text-muted-foreground mb-2">还没有收藏任何营地</p>
            <p className="text-sm text-muted-foreground mb-6">在营地详情页点击心形按钮即可收藏</p>
            <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-pine text-white rounded-lg hover:bg-pine-light transition-colors text-sm font-medium">
              浏览营地
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {favoriteItems.map((camp, index) => (
                <motion.div
                  key={camp.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <article className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-200 relative">
                    {/* Remove favorite button */}
                    <button
                      onClick={(e) => { e.preventDefault(); toggleFavorite(camp.id); }}
                      className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Heart size={16} className="text-sunset fill-sunset" />
                    </button>
                    <Link href={`/campground/${camp.id}`}>
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={camp.image}
                          alt={camp.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                          <Clock size={12} className="text-pine" />
                          <span className="text-xs font-mono font-semibold text-pine">{camp.driveTimeLabel}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-bold text-lg text-foreground leading-tight">
                          {camp.nameCn}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5 font-mono">{camp.name}</p>
                        <p className="text-sm text-foreground/80 mt-2 line-clamp-1">{camp.tagline}</p>
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
                      </div>
                    </Link>
                  </article>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

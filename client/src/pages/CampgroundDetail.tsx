import { useParams, Link } from "wouter";
import { campgrounds } from "@/data/campgrounds";
import { ArrowLeft, Clock, MapPin, Star, TreePine, Baby, Truck, ExternalLink, AlertTriangle, Bookmark } from "lucide-react";
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

export default function CampgroundDetail() {
  const params = useParams<{ id: string }>();
  const campground = campgrounds.find((c) => c.id === Number(params.id));

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
          {/* Booking Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
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
              transition={{ duration: 0.4, delay: 0.2 }}
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
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">详情</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campground.activities.map((act, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="py-2.5 px-3 font-medium">{act.name}</td>
                        <td className="py-2.5 px-3 font-mono text-xs">{act.ageRange}</td>
                        <td className="py-2.5 px-3 text-muted-foreground">{act.distance}</td>
                        <td className="py-2.5 px-3 text-muted-foreground">{act.details}</td>
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
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Area</th>
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
            {/* Recommended */}
            <div className="bg-pine/5 rounded-xl border border-pine/20 p-5">
              <h3 className="font-display font-bold text-pine mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pine/10 flex items-center justify-center text-xs">✓</span>
                推荐营位
              </h3>
              <p className="text-sm text-foreground">{campground.recommendedSites}</p>
            </div>
            {/* Avoid */}
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
            className="bg-sand/10 rounded-xl border border-sand/30 p-5"
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

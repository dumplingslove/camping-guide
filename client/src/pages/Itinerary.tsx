import { useState, useRef } from "react";
import { Link } from "wouter";
import { campgrounds } from "@/data/campgrounds";
import { seasonData, monthLabels } from "@/data/seasons";
import { useFavorites } from "@/contexts/FavoritesContext";
import { ArrowLeft, Download, MapPin, Clock, Star, Truck, Baby, TreePine, CalendarDays, CheckCircle2, Printer } from "lucide-react";
import { motion } from "framer-motion";

interface ItineraryItem {
  campgroundId: number;
  plannedDate: string;
  nights: number;
  notes: string;
}

export default function Itinerary() {
  const { favorites } = useFavorites();
  const [items, setItems] = useState<ItineraryItem[]>(
    favorites.map((id) => ({
      campgroundId: id,
      plannedDate: "",
      nights: 2,
      notes: "",
    }))
  );
  const [tripName, setTripName] = useState("2026 家庭露营行程");
  const printRef = useRef<HTMLDivElement>(null);

  const favCampgrounds = favorites
    .map((id) => campgrounds.find((c) => c.id === id))
    .filter(Boolean) as typeof campgrounds;

  const updateItem = (idx: number, field: keyof ItineraryItem, value: string | number) => {
    setItems((prev) => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const handlePrint = () => {
    window.print();
  };

  const generateTextExport = () => {
    let text = `# ${tripName}\n\n`;
    text += `生成日期: ${new Date().toLocaleDateString("zh-CN")}\n`;
    text += `总营地数: ${favCampgrounds.length}\n\n`;
    text += "---\n\n";

    items.forEach((item, idx) => {
      const camp = campgrounds.find((c) => c.id === item.campgroundId);
      if (!camp) return;
      const season = seasonData.find((s) => s.campgroundId === camp.id);

      text += `## ${idx + 1}. ${camp.nameCn} (${camp.name})\n\n`;
      text += `- 车程: ${camp.driveTimeLabel} from Redmond\n`;
      text += `- 地区: ${camp.region}, ${camp.state}\n`;
      text += `- 评分: 风景${camp.sceneryRating}/5 | 娃可玩${camp.kidRating}/5 | TC适配${camp.tcRating}/5\n`;
      text += `- 最佳季节: ${season?.peakMonths || camp.season}\n`;
      text += `- 预订系统: ${camp.bookingSystem}\n`;
      text += `- 预订链接: ${camp.bookingUrl}\n`;
      if (item.plannedDate) text += `- 计划日期: ${item.plannedDate}\n`;
      if (item.nights) text += `- 住宿晚数: ${item.nights}晚\n`;
      text += `\n### 推荐营位\n${camp.recommendedSites}\n`;
      text += `\n### 避坑\n${camp.avoid}\n`;
      text += `\n### TC适配\n${camp.tcNotes}\n`;
      if (item.notes) text += `\n### 备注\n${item.notes}\n`;
      text += `\n### 娃可玩项目\n`;
      camp.activities.forEach((act) => {
        text += `- ${act.name} (${act.ageRange}, ${act.distance}): ${act.details}\n`;
      });
      text += `\n### Area评分\n`;
      text += `| Area | 综合 | 风景 | 娃可玩 | TC | 水电 | 推荐度 |\n`;
      text += `|------|------|------|--------|-----|------|--------|\n`;
      camp.areas.forEach((area) => {
        text += `| ${area.area} | ${area.overall}/5 | ${area.scenery}/5 | ${area.kidFriendly}/5 | ${area.tcCompat}/5 | ${area.hookups} | ${area.recommendation} |\n`;
      });
      text += "\n---\n\n";
    });

    text += `\n## 装备清单\n\n`;
    text += `- [ ] Truck Camper 检查（水箱/电池/轮胎）\n`;
    text += `- [ ] 食物和饮水\n`;
    text += `- [ ] 儿童用品（推车/背带/玩具）\n`;
    text += `- [ ] 防晒/防虫\n`;
    text += `- [ ] 急救包\n`;
    text += `- [ ] 营地预订确认截图\n`;
    text += `- [ ] 柴火/打火机\n`;
    text += `- [ ] 折叠椅/桌\n`;
    text += `- [ ] 望远镜/相机\n`;

    return text;
  };

  const handleDownload = () => {
    const text = generateTextExport();
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tripName.replace(/\s+/g, "_")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (favCampgrounds.length === 0) {
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
        <div className="container py-16 text-center">
          <CalendarDays size={48} className="mx-auto text-muted-foreground mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">还没有收藏营地</h1>
          <p className="text-muted-foreground mb-6">先收藏几个感兴趣的营地，然后回来生成行程单</p>
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-pine text-white rounded-lg text-sm font-medium hover:bg-pine-light transition-colors">
            <TreePine size={14} />
            浏览营地
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen topo-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-border print:hidden">
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
            <span>返回首页</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-secondary transition-colors"
            >
              <Printer size={14} />
              打印
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pine text-white rounded-lg text-sm font-medium hover:bg-pine-light transition-colors"
            >
              <Download size={14} />
              导出 Markdown
            </button>
          </div>
        </div>
      </header>

      <div className="container py-8" ref={printRef}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <input
            type="text"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            className="font-display text-3xl font-bold text-foreground bg-transparent border-none focus:outline-none focus:ring-0 w-full print:text-2xl"
          />
          <p className="text-muted-foreground mt-1">
            {favCampgrounds.length} 个营地 · 从 Redmond, WA 出发
          </p>
        </motion.div>

        {/* Itinerary Items */}
        <div className="space-y-6">
          {items.map((item, idx) => {
            const camp = campgrounds.find((c) => c.id === item.campgroundId);
            if (!camp) return null;
            const season = seasonData.find((s) => s.campgroundId === camp.id);

            return (
              <motion.div
                key={camp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-xl border border-border p-5 print:break-inside-avoid"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-7 h-7 rounded-full bg-pine text-white flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                      <h2 className="font-display text-lg font-bold text-foreground">{camp.nameCn}</h2>
                      {camp.warning && <span className="text-xs px-2 py-0.5 bg-sunset/10 text-sunset rounded-full">⚠️</span>}
                    </div>
                    <p className="text-sm text-muted-foreground">{camp.name} · {camp.region}, {camp.state}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
                    <Clock size={14} />
                    {camp.driveTimeLabel}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <TreePine size={14} className="text-pine" />
                    <span>风景 {camp.sceneryRating}/5</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Baby size={14} className="text-lake" />
                    <span>娃可玩 {camp.kidRating}/5</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck size={14} className="text-sand" />
                    <span>TC适配 {camp.tcRating}/5</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarDays size={14} className="text-pine" />
                    <span>{season?.peakMonths || camp.season}</span>
                  </div>
                </div>

                {/* Planning fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 print:hidden">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">计划日期</label>
                    <input
                      type="date"
                      value={item.plannedDate}
                      onChange={(e) => updateItem(idx, "plannedDate", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-border text-sm bg-paper focus:outline-none focus:ring-2 focus:ring-pine/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">住宿晚数</label>
                    <input
                      type="number"
                      min={1}
                      max={14}
                      value={item.nights}
                      onChange={(e) => updateItem(idx, "nights", Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg border border-border text-sm bg-paper focus:outline-none focus:ring-2 focus:ring-pine/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">备注</label>
                    <input
                      type="text"
                      value={item.notes}
                      onChange={(e) => updateItem(idx, "notes", e.target.value)}
                      placeholder="如：已预订Site 135"
                      className="w-full px-3 py-1.5 rounded-lg border border-border text-sm bg-paper focus:outline-none focus:ring-2 focus:ring-pine/30"
                    />
                  </div>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-pine/5 rounded-lg p-3">
                    <div className="font-medium text-pine mb-1 flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      推荐营位
                    </div>
                    <p className="text-foreground text-xs">{camp.recommendedSites}</p>
                  </div>
                  <div className="bg-sand-light/50 rounded-lg p-3">
                    <div className="font-medium text-sand mb-1 flex items-center gap-1">
                      <Truck size={12} />
                      TC适配
                    </div>
                    <p className="text-foreground text-xs">{camp.tcNotes}</p>
                  </div>
                </div>

                {/* Booking */}
                <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">预订: {camp.bookingSystem}</span>
                  <a
                    href={camp.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pine hover:underline text-xs"
                  >
                    去预订 →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Packing Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-xl border border-border p-5 print:break-inside-avoid"
        >
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
            <CheckCircle2 size={18} className="text-pine" />
            装备清单
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {[
              "Truck Camper 检查（水箱/电池/轮胎）",
              "食物和饮水",
              "儿童用品（推车/背带/玩具）",
              "防晒/防虫",
              "急救包",
              "营地预订确认截图",
              "柴火/打火机",
              "折叠椅/桌",
              "望远镜/相机",
              "垃圾袋",
              "手电筒/头灯",
              "保暖衣物（夜间降温）",
            ].map((item) => (
              <label key={item} className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary cursor-pointer">
                <input type="checkbox" className="rounded border-border text-pine focus:ring-pine" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { getInsightsForCampground } from "@/data/reviewInsightsData";
import {
  Signal,
  PawPrint,
  ShowerHead,
  Volume2,
  Compass,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  Sparkles,
  MapPin,
} from "lucide-react";

interface InsightsPanelProps {
  campgroundId: number;
}

export function InsightsPanel({ campgroundId }: InsightsPanelProps) {
  const insights = getInsightsForCampground(campgroundId);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!insights) return null;

  const toggle = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: "cell",
      icon: Signal,
      title: "手机信号",
      content: insights.cellCoverage,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "wildlife",
      icon: PawPrint,
      title: "野生动物",
      content: insights.wildlifeWarnings,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      id: "facilities",
      icon: ShowerHead,
      title: "设施状况",
      content: insights.facilitiesQuality,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: "noise",
      icon: Volume2,
      title: "噪音情况",
      content: insights.noiseIssues,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: "season",
      icon: Calendar,
      title: "最佳季节",
      content: insights.bestSeasonTips,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <section className="mt-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-500" />
        评论蒸馏洞察
        <span className="text-xs font-normal text-gray-500 ml-1">
          (基于真实用户评论提取)
        </span>
      </h2>

      {/* Summary Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {insights.tags.map((tag, i) => (
          <span
            key={i}
            className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Recommended Sites */}
      {insights.recommendedSites.length > 0 && (
        <div className="mb-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
          <button
            onClick={() => toggle("recommended")}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
              <ThumbsUp className="w-4 h-4" />
              评论推荐营位 ({insights.recommendedSites.length})
            </span>
            {expandedSection === "recommended" ? (
              <ChevronUp className="w-4 h-4 text-emerald-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-emerald-600" />
            )}
          </button>
          {expandedSection === "recommended" && (
            <div className="mt-2 space-y-1.5">
              {insights.recommendedSites.map((site, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-emerald-900">
                  <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>{site.site}</strong>: {site.reason}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Avoid Sites */}
      {insights.avoidSites.length > 0 && (
        <div className="mb-3 p-3 rounded-lg bg-red-50 border border-red-100">
          <button
            onClick={() => toggle("avoid")}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-red-800">
              <ThumbsDown className="w-4 h-4" />
              评论避坑营位 ({insights.avoidSites.length})
            </span>
            {expandedSection === "avoid" ? (
              <ChevronUp className="w-4 h-4 text-red-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-red-600" />
            )}
          </button>
          {expandedSection === "avoid" && (
            <div className="mt-2 space-y-1.5">
              {insights.avoidSites.map((site, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-red-900">
                  <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>{site.site}</strong>: {site.reason}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Info Sections */}
      <div className="space-y-2">
        {sections.map((section) => {
          if (!section.content || section.content.length < 5) return null;
          return (
            <div
              key={section.id}
              className={`p-3 rounded-lg ${section.bgColor} border border-opacity-30`}
            >
              <button
                onClick={() => toggle(section.id)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className={`flex items-center gap-2 text-sm font-semibold ${section.color}`}>
                  <section.icon className="w-4 h-4" />
                  {section.title}
                </span>
                {expandedSection === section.id ? (
                  <ChevronUp className={`w-4 h-4 ${section.color}`} />
                ) : (
                  <ChevronDown className={`w-4 h-4 ${section.color}`} />
                )}
              </button>
              {expandedSection === section.id && (
                <p className="mt-2 text-xs text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Activities from Reviews */}
      {insights.activitiesFromReviews.length > 0 && (
        <div className="mt-3 p-3 rounded-lg bg-sky-50 border border-sky-100">
          <button
            onClick={() => toggle("activities")}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-sky-800">
              <Compass className="w-4 h-4" />
              评论中提到的周边活动 ({insights.activitiesFromReviews.length})
            </span>
            {expandedSection === "activities" ? (
              <ChevronUp className="w-4 h-4 text-sky-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-sky-600" />
            )}
          </button>
          {expandedSection === "activities" && (
            <div className="mt-2 space-y-2">
              {insights.activitiesFromReviews.map((act, i) => (
                <div key={i} className="text-xs text-sky-900">
                  <strong>{act.name}</strong>: {act.description}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Area Insights */}
      {insights.areaInsights.length > 0 && (
        <div className="mt-3 p-3 rounded-lg bg-violet-50 border border-violet-100">
          <button
            onClick={() => toggle("areas")}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-violet-800">
              <MapPin className="w-4 h-4" />
              各区域评论洞察 ({insights.areaInsights.length})
            </span>
            {expandedSection === "areas" ? (
              <ChevronUp className="w-4 h-4 text-violet-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-violet-600" />
            )}
          </button>
          {expandedSection === "areas" && (
            <div className="mt-2 space-y-2">
              {insights.areaInsights.map((area, i) => (
                <div key={i} className="text-xs text-violet-900">
                  <strong>{area.area}</strong>: {area.insight}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

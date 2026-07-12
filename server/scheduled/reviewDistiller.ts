/**
 * Review Distiller - Uses LLM to extract structured insights from raw reviews.
 * Produces the same format as client/src/data/reviewInsights.json
 */

import { invokeLLM } from "../_core/llm";
import { FetchedReview } from "./reviewFetcher";

export interface AreaInsight {
  area: string;
  insight: string;
}

export interface SiteRecommendation {
  site: string;
  reason: string;
}

export interface ReviewActivity {
  name: string;
  description: string;
}

export interface CampgroundInsights {
  tags: string[];
  areaInsights: AreaInsight[];
  recommendedSites: SiteRecommendation[];
  avoidSites: SiteRecommendation[];
  cellCoverage: string;
  wildlifeWarnings: string;
  facilitiesQuality: string;
  noiseIssues: string;
  activitiesFromReviews: ReviewActivity[];
  bestSeasonTips: string;
}

const DISTILLATION_SYSTEM_PROMPT = `你是一个露营评论分析专家。根据提供的营地评论数据，提取结构化洞察信息。

要求：
1. tags: 提取8-12个关键标签（中文），描述营地的核心特征和常见评价
2. areaInsights: 按区域/Loop总结评论洞察，包含具体营位号推荐
3. recommendedSites: 推荐的具体营位及原因（基于评论中的正面体验）
4. avoidSites: 需避开的营位及原因（基于评论中的负面体验）
5. cellCoverage: 手机信号情况总结
6. wildlifeWarnings: 野生动物相关警告
7. facilitiesQuality: 设施质量评价（卫生间、淋浴、水源等）
8. noiseIssues: 噪音问题总结
9. activitiesFromReviews: 评论中提到的周边活动和游玩项目（必须是评论中实际提到的）
10. bestSeasonTips: 最佳季节建议

所有内容用中文输出。如果某个字段没有足够信息，返回空字符串或空数组。
activitiesFromReviews 必须基于评论内容，不要编造。每个活动需要name和description。`;

export async function distillReviews(
  campgroundName: string,
  reviews: FetchedReview[]
): Promise<CampgroundInsights | null> {
  if (reviews.length === 0) return null;

  // Prepare review text for LLM (limit to avoid token overflow)
  const reviewSummary = reviews
    .slice(0, 80) // Max 80 reviews to stay within token limits
    .map((r, i) => {
      const parts = [`[${i + 1}] Rating: ${r.rating}/5`];
      if (r.date) parts.push(`Date: ${r.date}`);
      if (r.loop) parts.push(`Loop: ${r.loop}`);
      if (r.siteNumber) parts.push(`Site: ${r.siteNumber}`);
      if (r.area) parts.push(`Area: ${r.area}`);
      parts.push(`Text: ${r.text.substring(0, 500)}`);
      return parts.join(" | ");
    })
    .join("\n");

  const userPrompt = `营地名称: ${campgroundName}
评论总数: ${reviews.length}
平均评分: ${(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}

评论数据:
${reviewSummary}

请提取结构化洞察，严格按JSON格式输出。`;

  try {
    const result = await invokeLLM({
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: DISTILLATION_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      maxTokens: 4000,
      responseFormat: {
        type: "json_schema",
        json_schema: {
          name: "campground_insights",
          strict: true,
          schema: {
            type: "object",
            properties: {
              tags: { type: "array", items: { type: "string" } },
              areaInsights: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    area: { type: "string" },
                    insight: { type: "string" },
                  },
                  required: ["area", "insight"],
                  additionalProperties: false,
                },
              },
              recommendedSites: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    site: { type: "string" },
                    reason: { type: "string" },
                  },
                  required: ["site", "reason"],
                  additionalProperties: false,
                },
              },
              avoidSites: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    site: { type: "string" },
                    reason: { type: "string" },
                  },
                  required: ["site", "reason"],
                  additionalProperties: false,
                },
              },
              cellCoverage: { type: "string" },
              wildlifeWarnings: { type: "string" },
              facilitiesQuality: { type: "string" },
              noiseIssues: { type: "string" },
              activitiesFromReviews: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                  },
                  required: ["name", "description"],
                  additionalProperties: false,
                },
              },
              bestSeasonTips: { type: "string" },
            },
            required: [
              "tags", "areaInsights", "recommendedSites", "avoidSites",
              "cellCoverage", "wildlifeWarnings", "facilitiesQuality",
              "noiseIssues", "activitiesFromReviews", "bestSeasonTips",
            ],
            additionalProperties: false,
          },
        },
      },
    });

    const content = result.choices?.[0]?.message?.content;
    if (!content || typeof content !== "string") return null;

    const parsed = JSON.parse(content) as CampgroundInsights;
    return parsed;
  } catch (error) {
    console.error(`[ReviewDistiller] Error distilling reviews for ${campgroundName}:`, error);
    return null;
  }
}

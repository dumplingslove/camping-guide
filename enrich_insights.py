"""
Enrich batch 2/3 campground insights using the LLM API.
Reads raw reviews, sends them to gpt-5-mini with structured output,
and updates reviewInsights.json with richer data.
"""
import json
import os
import concurrent.futures as cf
from openai import OpenAI

client = OpenAI()

SYSTEM_PROMPT = """你是一个露营评论分析专家。根据提供的营地评论数据，提取结构化洞察信息。

要求：
1. tags: 提取6-10个关键标签（中文），描述营地的核心特征和常见评价。例如：湖景、适合RV、安静、树荫浓密、信号弱
2. areaInsights: 按区域/Loop总结评论洞察，包含具体营位号推荐。如果评论中没有提到具体区域，用"综合"作为area
3. recommendedSites: 推荐的具体营位及原因（基于评论中的正面体验）。如果没有具体营位号，推荐类型（如"靠河营位"）
4. avoidSites: 需避开的营位及原因（基于评论中的负面体验）。如果没有具体营位号，描述应避开的类型
5. cellCoverage: 手机信号情况总结。如果评论未提及，写"评论未明确提及手机信号"
6. wildlifeWarnings: 野生动物相关警告（如有）
7. facilitiesQuality: 设施质量评价（卫生间、淋浴、水源等）
8. noiseIssues: 噪音问题总结（如有）
9. activitiesFromReviews: 评论中提到的周边活动和游玩项目（必须是评论中实际提到的）。每个活动需要name和description，description中注明来源评论者
10. bestSeasonTips: 最佳季节建议

所有内容用中文输出。如果某个字段没有足够信息，返回空字符串或空数组。
activitiesFromReviews 必须基于评论内容，不要编造。"""

SCHEMA = {
    "type": "json_schema",
    "json_schema": {
        "name": "campground_insights",
        "strict": True,
        "schema": {
            "type": "object",
            "properties": {
                "tags": {"type": "array", "items": {"type": "string"}},
                "areaInsights": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "area": {"type": "string"},
                            "insight": {"type": "string"},
                        },
                        "required": ["area", "insight"],
                        "additionalProperties": False,
                    },
                },
                "recommendedSites": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "site": {"type": "string"},
                            "reason": {"type": "string"},
                        },
                        "required": ["site", "reason"],
                        "additionalProperties": False,
                    },
                },
                "avoidSites": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "site": {"type": "string"},
                            "reason": {"type": "string"},
                        },
                        "required": ["site", "reason"],
                        "additionalProperties": False,
                    },
                },
                "cellCoverage": {"type": "string"},
                "wildlifeWarnings": {"type": "string"},
                "facilitiesQuality": {"type": "string"},
                "noiseIssues": {"type": "string"},
                "activitiesFromReviews": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "string"},
                            "description": {"type": "string"},
                        },
                        "required": ["name", "description"],
                        "additionalProperties": False,
                    },
                },
                "bestSeasonTips": {"type": "string"},
            },
            "required": [
                "tags", "areaInsights", "recommendedSites", "avoidSites",
                "cellCoverage", "wildlifeWarnings", "facilitiesQuality",
                "noiseIssues", "activitiesFromReviews", "bestSeasonTips",
            ],
            "additionalProperties": False,
        },
    },
}

# Get campground names from the data file
import re
with open("client/src/data/campgrounds.ts") as f:
    ts_content = f.read()

camp_names = {}
matches = re.findall(r'id:\s*(\d+),\s*\n\s*name:\s*"([^"]+)"', ts_content)
for id_str, name in matches:
    camp_names[int(id_str)] = name


def enrich_campground(camp_id: int) -> dict | None:
    """Enrich a single campground's insights using LLM."""
    review_path = f"client/src/data/reviews/camp_{camp_id}.json"
    if not os.path.exists(review_path):
        print(f"  Camp {camp_id}: No review file, skipping")
        return None

    with open(review_path) as f:
        review_data = json.load(f)

    reviews = review_data.get("reviews", [])
    if len(reviews) < 2:
        print(f"  Camp {camp_id}: Only {len(reviews)} reviews, skipping")
        return None

    camp_name = camp_names.get(camp_id, f"Campground {camp_id}")

    # Format reviews for LLM
    review_text = []
    for i, r in enumerate(reviews):
        text = r.get("text", r.get("content", ""))
        author = r.get("author", "Anonymous")
        rating = r.get("rating", "?")
        parts = [f"[{i+1}] Rating: {rating}/5, Author: {author}"]
        if r.get("date"):
            parts.append(f"Date: {r['date']}")
        parts.append(f"Text: {text}")
        review_text.append(" | ".join(parts))

    user_prompt = f"""营地名称: {camp_name}
评论总数: {len(reviews)}
平均评分: {sum(r.get('rating', 4) for r in reviews) / len(reviews):.1f}

评论数据:
{chr(10).join(review_text)}

请提取结构化洞察，严格按JSON格式输出。"""

    try:
        resp = client.chat.completions.create(
            model="gpt-5-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            max_completion_tokens=3000,
            response_format=SCHEMA,
        )
        content = resp.choices[0].message.content
        if content:
            result = json.loads(content)
            print(f"  Camp {camp_id} ({camp_name}): OK - {len(result.get('tags', []))} tags, {len(result.get('areaInsights', []))} areas, {len(result.get('activitiesFromReviews', []))} activities")
            return result
        else:
            print(f"  Camp {camp_id}: Empty LLM response")
            return None
    except Exception as e:
        print(f"  Camp {camp_id}: ERROR - {e}")
        return None


def main():
    # Load existing insights
    with open("client/src/data/reviewInsights.json") as f:
        insights = json.load(f)

    # Identify campgrounds that need enrichment (batch 2: 25-36, batch 3: 37-49)
    # Focus on those with sparse data (score < 15)
    to_enrich = []
    for camp_id in range(25, 50):
        camp = insights.get(str(camp_id), {})
        score = (
            len(camp.get("tags", [])) +
            len(camp.get("recommendedSites", [])) +
            len(camp.get("avoidSites", [])) +
            len(camp.get("activitiesFromReviews", [])) +
            len(camp.get("areaInsights", []))
        )
        if score < 15:  # Sparse data threshold
            to_enrich.append(camp_id)

    print(f"Enriching {len(to_enrich)} campgrounds: {to_enrich}")
    print()

    # Process in parallel (max 6 concurrent)
    results = {}
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        future_to_id = {ex.submit(enrich_campground, cid): cid for cid in to_enrich}
        for future in cf.as_completed(future_to_id):
            camp_id = future_to_id[future]
            try:
                result = future.result()
                if result:
                    results[camp_id] = result
            except Exception as e:
                print(f"  Camp {camp_id}: EXCEPTION - {e}")

    # Merge results into existing insights
    updated_count = 0
    for camp_id, new_data in results.items():
        key = str(camp_id)
        if key in insights:
            # Merge: keep existing non-empty fields, fill in empty ones
            existing = insights[key]
            for field in ["tags", "areaInsights", "recommendedSites", "avoidSites", "activitiesFromReviews"]:
                if not existing.get(field) or len(existing.get(field, [])) == 0:
                    existing[field] = new_data.get(field, [])
                elif len(existing.get(field, [])) < len(new_data.get(field, [])):
                    # New data is richer
                    existing[field] = new_data.get(field, [])
            for field in ["cellCoverage", "wildlifeWarnings", "facilitiesQuality", "noiseIssues", "bestSeasonTips"]:
                if not existing.get(field) or existing.get(field) == "未提及" or existing.get(field) == "":
                    existing[field] = new_data.get(field, "")
            insights[key] = existing
        else:
            insights[key] = new_data
        updated_count += 1

    # Write back
    with open("client/src/data/reviewInsights.json", "w") as f:
        json.dump(insights, f, ensure_ascii=False, indent=2)

    print(f"\nDone! Updated {updated_count} campgrounds.")


if __name__ == "__main__":
    main()

"""
Enrich the 4 campgrounds (3, 5, 10, 12) that have empty recommendedSites/avoidSites/areaInsights
in reviewInsights.json. Uses the campground's own structured data + stored reviews + LLM.
"""
import json
import re
import os
import requests

FORGE_URL = os.environ.get("BUILT_IN_FORGE_API_URL", "").rstrip("/")
FORGE_KEY = os.environ.get("BUILT_IN_FORGE_API_KEY", "")

def call_llm(prompt, system_prompt=""):
    resp = requests.post(
        f"{FORGE_URL}/v1/chat/completions",
        headers={"Authorization": f"Bearer {FORGE_KEY}", "Content-Type": "application/json"},
        json={
            "model": "claude-sonnet-4-20250514",
            "max_tokens": 2000,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            "response_format": {"type": "json_object"}
        },
        timeout=60
    )
    resp.raise_for_status()
    data = resp.json()
    content = data["choices"][0]["message"]["content"]
    return json.loads(content)

# Load existing data
with open("client/src/data/reviewInsights.json") as f:
    insights = json.load(f)

with open("client/src/data/campgrounds.ts") as f:
    campground_ts = f.read()

# For each sparse campground, extract its data and reviews, then call LLM
camp_ids = [2, 8, 9, 13, 15, 16, 21]

for camp_id in camp_ids:
    print(f"\n--- Enriching camp {camp_id} ---")
    
    # Extract campground info from TS
    pattern = rf'id: {camp_id},.*?lastUpdated'
    match = re.search(pattern, campground_ts, re.DOTALL)
    camp_text = match.group() if match else ""
    
    # Extract key fields
    name_match = re.search(r'name: "(.*?)"', camp_text)
    name = name_match.group(1) if name_match else f"Camp {camp_id}"
    
    rec_match = re.search(r'recommendedSites: "(.*?)"', camp_text)
    recommended = rec_match.group(1) if rec_match else ""
    
    avoid_match = re.search(r'avoid: "(.*?)"', camp_text)
    avoid = avoid_match.group(1) if avoid_match else ""
    
    tc_match = re.search(r'tcNotes: "(.*?)"', camp_text)
    tc_notes = tc_match.group(1) if tc_match else ""
    
    # Extract areas
    areas = re.findall(r'area: "(.*?)"', camp_text)
    
    # Load reviews
    try:
        with open(f"client/src/data/reviews/camp_{camp_id}.json") as f:
            review_data = json.load(f)
        reviews = review_data.get("reviews", [])
        review_texts = "\n".join([f"- {r.get('author','?')} ({r.get('rating','?')}★): {r.get('text','')[:300]}" for r in reviews])
    except:
        review_texts = "No reviews available"
    
    # Get existing insights to preserve
    existing = insights.get(str(camp_id), {})
    
    prompt = f"""Based on the following campground data and reviews, generate enriched insights.

CAMPGROUND: {name} (ID: {camp_id})
AREAS: {', '.join(areas)}
RECOMMENDED SITES: {recommended}
AVOID: {avoid}
TC NOTES: {tc_notes}

REVIEWS:
{review_texts}

Generate a JSON object with these fields:
- "recommendedSites": array of objects with "site" (string, specific site number or area name) and "reason" (string, why it's good, in Chinese)
- "avoidSites": array of objects with "site" (string) and "reason" (string, why to avoid, in Chinese)  
- "areaInsights": array of objects with "area" (string, area name) and "insight" (string, key insight about that area, in Chinese)

Rules:
- Use the RECOMMENDED SITES and AVOID fields to generate recommendedSites and avoidSites
- Parse specific site numbers/names from the data
- Generate 2-4 recommendedSites, 1-3 avoidSites, and 2-4 areaInsights
- All text should be in Chinese
- Be specific and actionable
- Base insights on the actual data provided, don't hallucinate

Return ONLY the JSON object."""

    system_prompt = "You are a camping expert helping organize campground data. Return only valid JSON."
    
    try:
        result = call_llm(prompt, system_prompt)
        
        # Merge with existing insights
        existing["recommendedSites"] = result.get("recommendedSites", [])
        existing["avoidSites"] = result.get("avoidSites", [])
        existing["areaInsights"] = result.get("areaInsights", [])
        
        insights[str(camp_id)] = existing
        print(f"  ✓ Added {len(result.get('recommendedSites',[]))} rec, {len(result.get('avoidSites',[]))} avoid, {len(result.get('areaInsights',[]))} area insights")
    except Exception as e:
        print(f"  ✗ Error: {e}")

# Save
with open("client/src/data/reviewInsights.json", "w") as f:
    json.dump(insights, f, ensure_ascii=False, indent=2)

print("\n✓ Done! Saved enriched insights.")

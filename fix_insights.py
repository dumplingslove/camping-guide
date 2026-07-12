"""
Fix reviewInsights.json:
1. Rename CG37-CG49 keys to 37-49
2. Convert string-type recommendedSites/avoidSites to array format
3. Convert string-type areaInsights to array format
4. Handle missing/null activitiesFromReviews
5. Map alternate field names (noiseLevel->noiseIssues, activities->activitiesFromReviews, etc.)
"""
import json

with open('client/src/data/reviewInsights.json') as f:
    data = json.load(f)

fixed = {}

for key, value in data.items():
    # Fix key names: CG37 -> 37
    new_key = key
    if key.startswith("CG"):
        new_key = key[2:]
    
    camp = dict(value)
    
    # Ensure tags exists (default to empty array)
    if 'tags' not in camp:
        camp['tags'] = []
    
    # Fix recommendedSites: string -> array of {site, reason}
    if isinstance(camp.get('recommendedSites'), str):
        text = camp['recommendedSites'].strip()
        if text:
            camp['recommendedSites'] = [{"site": "推荐", "reason": text}]
        else:
            camp['recommendedSites'] = []
    elif camp.get('recommendedSites') is None:
        camp['recommendedSites'] = []
    
    # Fix avoidSites: string -> array of {site, reason}
    if isinstance(camp.get('avoidSites'), str):
        text = camp['avoidSites'].strip()
        if text:
            camp['avoidSites'] = [{"site": "避坑", "reason": text}]
        else:
            camp['avoidSites'] = []
    elif camp.get('avoidSites') is None:
        camp['avoidSites'] = []
    
    # Fix areaInsights: string -> array of {area, insight}
    if isinstance(camp.get('areaInsights'), str):
        text = camp['areaInsights'].strip()
        if text:
            camp['areaInsights'] = [{"area": "综合", "insight": text}]
        else:
            camp['areaInsights'] = []
    elif camp.get('areaInsights') is None:
        camp['areaInsights'] = []
    
    # Fix activitiesFromReviews: map from 'activities' field if needed
    if camp.get('activitiesFromReviews') is None:
        activities_raw = camp.get('activities')
        if isinstance(activities_raw, str) and activities_raw.strip():
            camp['activitiesFromReviews'] = [{"name": "周边活动", "description": activities_raw.strip()}]
        elif isinstance(activities_raw, list):
            camp['activitiesFromReviews'] = activities_raw
        else:
            camp['activitiesFromReviews'] = []
    
    # Map alternate field names
    if 'noiseLevel' in camp and 'noiseIssues' not in camp:
        camp['noiseIssues'] = camp['noiseLevel']
    if 'noiseNotes' in camp and 'noiseIssues' not in camp:
        camp['noiseIssues'] = camp['noiseNotes']
    if 'signalNotes' in camp and 'cellCoverage' not in camp:
        camp['cellCoverage'] = camp['signalNotes']
    
    # Ensure all expected fields exist with defaults
    camp.setdefault('cellCoverage', '')
    camp.setdefault('wildlifeWarnings', '')
    camp.setdefault('facilitiesQuality', '')
    camp.setdefault('noiseIssues', '')
    camp.setdefault('bestSeasonTips', '')
    camp.setdefault('areaInsights', [])
    camp.setdefault('recommendedSites', [])
    camp.setdefault('avoidSites', [])
    camp.setdefault('activitiesFromReviews', [])
    
    # Clean up non-standard keys
    standard_keys = ['tags', 'cellCoverage', 'recommendedSites', 'avoidSites', 
                     'activitiesFromReviews', 'areaInsights', 'wildlifeWarnings',
                     'facilitiesQuality', 'noiseIssues', 'bestSeasonTips']
    cleaned = {k: camp[k] for k in standard_keys if k in camp}
    
    fixed[new_key] = cleaned

with open('client/src/data/reviewInsights.json', 'w') as f:
    json.dump(fixed, f, ensure_ascii=False, indent=2)

print(f"Fixed {len(fixed)} campground insights entries")
print(f"Keys: {sorted(fixed.keys(), key=lambda x: int(x))}")

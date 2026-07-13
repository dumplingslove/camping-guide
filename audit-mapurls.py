#!/usr/bin/env python3
"""Audit all activity mapUrls by testing them against the Places API.
Identifies which queries return incorrect or no results."""

import re
import json
import urllib.request
import urllib.parse
import time

# Read campgrounds.ts
with open('client/src/data/campgrounds.ts', 'rb') as f:
    content = f.read().decode('utf-8', errors='replace')

# Extract all activities with mapUrl
# Pattern: { name: "...", ... mapUrl: "https://www.google.com/maps/search/..." ... }
activity_pattern = re.compile(
    r'\{\s*name:\s*"([^"]+)"[^}]*mapUrl:\s*"https://www\.google\.com/maps/search/([^"]+)"',
    re.DOTALL
)

activities = activity_pattern.findall(content)
print(f"Found {len(activities)} activities with mapUrl")

# Test each one against Places API
problems = []
correct = []

for i, (name, query_encoded) in enumerate(activities):
    query = urllib.parse.unquote_plus(query_encoded.replace('+', ' '))
    
    try:
        url = f"http://localhost:3000/api/places/search?query={urllib.parse.quote(query)}"
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())
        
        results = data.get('results', [])
        if results:
            place_name = results[0].get('name', 'UNKNOWN')
            has_photos = len(results[0].get('photos', [])) > 0
            
            # Check if the result seems correct - simple heuristic:
            # The place name should share some words with the activity name or query
            query_words = set(query.lower().split())
            place_words = set(place_name.lower().split())
            
            # Check for obvious mismatches
            overlap = query_words & place_words
            is_likely_correct = len(overlap) >= 1 or place_name.lower() in query.lower() or any(w in place_name.lower() for w in query.lower().split()[:2])
            
            if not is_likely_correct:
                problems.append({
                    'name': name,
                    'query': query,
                    'got': place_name,
                    'has_photos': has_photos
                })
                print(f"  MISMATCH [{i+1}] {name}")
                print(f"    Query: {query}")
                print(f"    Got: {place_name}")
            else:
                correct.append({'name': name, 'query': query, 'got': place_name, 'has_photos': has_photos})
        else:
            problems.append({
                'name': name,
                'query': query,
                'got': 'NO RESULTS',
                'has_photos': False
            })
            print(f"  NO RESULTS [{i+1}] {name}")
            print(f"    Query: {query}")
    except Exception as e:
        problems.append({
            'name': name,
            'query': query,
            'got': f'ERROR: {e}',
            'has_photos': False
        })
        print(f"  ERROR [{i+1}] {name}: {e}")
    
    # Rate limit
    if (i + 1) % 10 == 0:
        print(f"  ... tested {i+1}/{len(activities)}")
        time.sleep(0.5)

print(f"\n=== SUMMARY ===")
print(f"Total activities: {len(activities)}")
print(f"Correct: {len(correct)}")
print(f"Problems: {len(problems)}")

if problems:
    print(f"\n=== PROBLEMS ({len(problems)}) ===")
    for p in problems:
        print(f"  {p['name']}")
        print(f"    Query: {p['query']}")
        print(f"    Got: {p['got']}")
        print()

# Save results
with open('audit-results.json', 'w') as f:
    json.dump({'problems': problems, 'correct_count': len(correct), 'total': len(activities)}, f, ensure_ascii=False, indent=2)

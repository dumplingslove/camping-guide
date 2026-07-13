#!/usr/bin/env python3
"""Strict audit: check if Places API returns a place that matches the ACTIVITY name,
not just the query. This catches cases like "Cranberry Lake" query returning "Deception Pass"."""

import re
import json
import urllib.request
import urllib.parse
import time

# Read campgrounds.ts
with open('client/src/data/campgrounds.ts', 'rb') as f:
    content = f.read().decode('utf-8', errors='replace')

# Extract all activities with mapUrl
activity_pattern = re.compile(
    r'\{\s*name:\s*"([^"]+)"[^}]*mapUrl:\s*"https://www\.google\.com/maps/search/([^"]+)"',
    re.DOTALL
)

activities = activity_pattern.findall(content)
print(f"Found {len(activities)} activities with mapUrl")

problems = []

for i, (name, query_encoded) in enumerate(activities):
    query = urllib.parse.unquote_plus(query_encoded.replace('+', ' '))
    
    try:
        url = f"http://localhost:3000/api/places/search?query={urllib.parse.quote(query)}"
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())
        
        results = data.get('results', [])
        if not results:
            problems.append({'name': name, 'query': query, 'got': 'NO RESULTS', 'fix': ''})
            continue
            
        place_name = results[0].get('name', 'UNKNOWN')
        
        # Extract the key subject from the activity name (before Chinese characters)
        # e.g., "Cranberry Lake 浅水区嬉水" -> "Cranberry Lake"
        # e.g., "森林巨木探索" -> use query's first words
        english_part = re.match(r'^([A-Za-z\s\'\-\.]+)', name)
        if english_part:
            activity_key = english_part.group(1).strip().lower()
        else:
            # Chinese-only name, use first 2 words of query
            activity_key = ' '.join(query.split()[:2]).lower()
        
        # Extract key words from activity name
        activity_words = set(activity_key.split())
        place_lower = place_name.lower()
        
        # Check: does the returned place contain the key activity subject?
        # For "Cranberry Lake" activity, "Deception Pass" result is WRONG
        # For "Paradise 野花步道" activity, "Paradise" result is CORRECT
        
        # Strategy: check if the first meaningful word(s) of the activity appear in the result
        key_word = activity_words - {'the', 'a', 'an', 'at', 'in', 'on', 'of', 'to', 'state', 'park', 'trail', 'loop', 'area'}
        
        if key_word:
            match_found = any(w in place_lower for w in key_word)
        else:
            match_found = True  # Can't determine, assume OK
        
        if not match_found:
            problems.append({
                'name': name,
                'query': query,
                'got': place_name,
                'activity_key': activity_key,
                'key_words': list(key_word)
            })
    except Exception as e:
        problems.append({'name': name, 'query': query, 'got': f'ERROR: {e}', 'fix': ''})
    
    if (i + 1) % 20 == 0:
        print(f"  ... tested {i+1}/{len(activities)}")
        time.sleep(0.3)

print(f"\n=== STRICT AUDIT RESULTS ===")
print(f"Total: {len(activities)}")
print(f"Problems: {len(problems)}")

if problems:
    print(f"\n=== MISMATCHES ===")
    for p in problems:
        print(f"  Activity: {p['name']}")
        print(f"  Query: {p['query']}")
        print(f"  Got: {p['got']}")
        print(f"  Key words: {p.get('key_words', [])}")
        print()

with open('audit-strict-results.json', 'w') as f:
    json.dump(problems, f, ensure_ascii=False, indent=2)

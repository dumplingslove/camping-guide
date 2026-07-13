#!/usr/bin/env python3
"""Second round of fixes for remaining problematic mapUrls."""

# Read the file
with open('client/src/data/campgrounds.ts', 'rb') as f:
    content = f.read().decode('utf-8', errors='replace')

fixes = {
    # Deception Pass - North Beach
    "North+Beach+Deception+Pass+Oak+Harbor+WA": "North+Beach+Deception+Pass+Washington",
    # Deception Pass - Old Growth (Deception Pass keeps dominating)
    "Old+Growth+Nature+Loop+Trail+Deception+Pass+WA": "Deception+Pass+forest+trail+WA",
    # Spencer Creek - Beverly Beach keeps dominating
    "Spencer+Creek+Beach+Access+Newport+OR": "Spencer+Creek+beach+Newport+Oregon",
    # Deschutes River at Tumalo - park keeps dominating
    "Deschutes+River+Tumalo+State+Park+Bend+OR": "Deschutes+River+swimming+Bend+OR",
    # Rogue River swimming at Farewell Bend
    "Farewell+Bend+Campground": "Rogue+River+natural+swimming+area+Oregon",
    # Willamette River at Champoeg
    "Champoeg+State+Park+Willamette+River+Trail+OR": "Willamette+River+Champoeg+State+Heritage+Area",
    # Lake Billy Chinook
    "Lake+Billy+Chinook+Cove+Palisades+OR": "Lake+Billy+Chinook+Madras+OR",
    # Deschutes River at LaPine
    "Deschutes+River+LaPine+State+Park+OR": "Deschutes+River+swimming+LaPine+Oregon",
    # Lightning Lake Manning Park
    "Lightning+Lake+Boat+Rentals+Manning+Park+BC": "Lightning+Lake+Manning+Park+BC",
}

count = 0
for old, new in fixes.items():
    old_url = f"https://www.google.com/maps/search/{old}"
    new_url = f"https://www.google.com/maps/search/{new}"
    if old_url in content:
        content = content.replace(old_url, new_url)
        count += 1
        print(f"  Fixed: {old} -> {new}")
    else:
        print(f"  NOT FOUND: {old}")

# Special: fix the "Rogue River 游泳" that uses "Farewell Bend Campground" as mapUrl
# But we need to be careful not to break other activities at the same campground
# The issue is there are multiple activities with "Farewell Bend Campground" in the mapUrl
# Let's handle the Rogue River swimming one specifically
old_rogue_swim = 'name: "Rogue River 游泳", ageRange: "3岁+", distance: "步行5分钟", details: "夏季水位低时有天然游泳池", mapUrl: "https://www.google.com/maps/search/Rogue+River+natural+swimming+area+Oregon"'
# This might not match exactly due to the earlier fix. Let's check what's there now.

# Also handle the duplicate "Deschutes River" entries at Tumalo
# There's "Deschutes River 戏水" and "儿童游乐场" both pointing to Tumalo
# The 儿童游乐场 one has "Deschutes River Tumalo State Park Bend OR Oregon" - fix it too
old_tumalo2 = "Deschutes+River+Tumalo+State+Park+Bend+OR+Oregon"
new_tumalo2 = "Tumalo+State+Park+playground+Bend+OR"
old_url2 = f"https://www.google.com/maps/search/{old_tumalo2}"
new_url2 = f"https://www.google.com/maps/search/{new_tumalo2}"
if old_url2 in content:
    content = content.replace(old_url2, new_url2)
    count += 1
    print(f"  Fixed: {old_tumalo2} -> {new_tumalo2}")

print(f"\nTotal fixes applied: {count}")

with open('client/src/data/campgrounds.ts', 'wb') as f:
    f.write(content.encode('utf-8'))
print("File updated!")

#!/usr/bin/env python3
"""Fix all 33 problematic activity mapUrls with more specific queries that return correct Places API results."""

import re

# Map of old query -> new query (more specific to get correct Places API result)
fixes = {
    # Deception Pass activities
    "Cranberry+Lake+Deception+Pass+State+Park": "Cranberry+Lake+Swimming+Area+Oak+Harbor+WA",
    "North+Beach+Deception+Pass+State+Park": "North+Beach+Deception+Pass+Oak+Harbor+WA",
    "Old+Growth+Forest+Trail+Deception+Pass+State+Park": "Old+Growth+Nature+Loop+Trail+Deception+Pass+WA",
    "Rosario+Beach+Deception+Pass+State+Park+WA": "Rosario+Beach+Anacortes+WA",
    
    # Millersylvania activities
    "Old+Growth+Lane+Millersylvania+State+Park": "Millersylvania+Old+Growth+Nature+Trail+Olympia+WA",
    "Deep+Lake+fishing+pier+Millersylvania+State+Park+WA": "Deep+Lake+Millersylvania+WA",
    
    # Mount Rainier activities
    "Cougar+Rock+Campground+Mount+Rainier+National+Park": "Cougar+Rock+Campground+Ashford+WA",
    "Nisqually+River+Cougar+Rock+Campground": "Nisqually+River+Mount+Rainier+WA",
    
    # Salt Creek activities
    "Tongue+Point+Salt+Creek+Recreation+Area": "Tongue+Point+Marine+Life+Sanctuary+Port+Angeles+WA",
    "Camp+Hayden+Salt+Creek+Recreation+Area": "Camp+Hayden+Bunkers+Port+Angeles+WA",
    
    # Beverly Beach activities
    "Spencer+Creek+Beverly+Beach+State+Park+OR": "Spencer+Creek+Beach+Access+Newport+OR",
    
    # Cape Disappointment activities
    "Waikiki+Beach+Cape+Disappointment+State+Park+WA": "Waikiki+Beach+Ilwaco+WA",
    
    # Trillium Lake - this one is actually correct (Trillium Lake), but the activity name is "Mt. Hood 倒影摄影"
    # The Places API returns "Trillium Lake" which IS the correct place for Mt. Hood reflection photography
    # Skip this one - it's a false positive from the audit
    
    # Pacific Crest Trail at Little Crater Lake
    "Pacific+Crest+Trail+Little+Crater+Lake+Campground+OR": "Pacific+Crest+Trail+Timothy+Lake+OR",
    
    # Tumalo State Park - activity is "Deschutes River 戏水"
    "Tumalo+State+Park": "Deschutes+River+Tumalo+State+Park+Bend+OR",
    
    # Cape Lookout activities
    "South+Beach+Cape+Lookout+State+Park": "Cape+Lookout+Beach+Tillamook+OR",
    
    # Farewell Bend / Rogue River activities
    # "Farewell Bend Campground" for "Rogue River 游泳" - need Rogue River
    # There are multiple entries for this campground
    
    # Rogue River Trail
    "Upper+Rogue+River+Trail+Farewell+Bend+Campground": "Upper+Rogue+River+Trail+Prospect+OR",
    
    # Crater Lake
    "Mazama+Campground+Amphitheater+Crater+Lake": "Mazama+Village+Crater+Lake+National+Park+OR",
    
    # Moran State Park activities
    "Cascade+Lake+Moran+State+Park": "Cascade+Lake+Orcas+Island+WA",
    "Mountain+Lake+Moran+State+Park": "Mountain+Lake+Orcas+Island+WA",
    
    # Honeyman State Park activities
    "Oregon+Dunes+Honeyman+State+Park": "Oregon+Dunes+Day+Use+Area+Florence+OR",
    "Cleawox+Lake+Honeyman+State+Park": "Cleawox+Lake+Florence+OR",
    
    # Fort Ebey activities
    "Lake+Pondilla+Fort+Ebey+State+Park": "Lake+Pondilla+Whidbey+Island+WA",
    
    # Larrabee State Park activities
    "Wildcat+Cove+Larrabee+State+Park": "Wildcat+Cove+Beach+Bellingham+WA",
    
    # Steamboat Rock - activity is "Banks Lake游泳"
    "Steamboat+Rock+State+Park+WA": "Banks+Lake+Swimming+Area+Electric+City+WA",
    
    # Champoeg - activity is "Willamette River步道"
    "Champoeg+State+Heritage+Area+OR": "Champoeg+State+Park+Willamette+River+Trail+OR",
    
    # Cove Palisades - activity is "Lake Billy Chinook游泳"
    "Cove+Palisades+State+Park+OR": "Lake+Billy+Chinook+Cove+Palisades+OR",
    
    # LaPine State Park activities
    "LaPine+State+Park+OR": "Deschutes+River+LaPine+State+Park+OR",
    "Big+Tree+LaPine+State+Park+OR": "Big+Tree+Oregon+Heritage+Tree+LaPine+OR",
    
    # Manning Park BC
    "Lightning+Lake+Boat+Rental+Manning+Park": "Lightning+Lake+Boat+Rentals+Manning+Park+BC",
}

# Read the file
with open('client/src/data/campgrounds.ts', 'rb') as f:
    content = f.read().decode('utf-8', errors='replace')

# Apply fixes
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

# Special case: "Farewell Bend Campground" appears multiple times for different activities
# We need to handle these contextually
# Activity "Rogue River 游泳" with mapUrl "Farewell Bend Campground" 
# Activity "钓鱼" with mapUrl "Rogue River Farewell Bend Campground"

# For the "Rogue River" fishing entries, fix them
old_rogue_fish = 'mapUrl: "https://www.google.com/maps/search/Rogue+River+Farewell+Bend+Campground"'
new_rogue_fish = 'mapUrl: "https://www.google.com/maps/search/Rogue+River+Swimming+Hole+Prospect+OR"'
if old_rogue_fish in content:
    content = content.replace(old_rogue_fish, new_rogue_fish)
    count += 1
    print(f"  Fixed: Rogue River Farewell Bend -> Rogue River Swimming Hole Prospect OR")

# For "Evening Ranger Programs" at Cougar Rock - the campground IS the correct place
# For "Junior Ranger Program" at Cougar Rock - the campground IS the correct place
# These are false positives - the program happens AT the campground
# Skip these

print(f"\nTotal fixes applied: {count}")

# Write back
with open('client/src/data/campgrounds.ts', 'wb') as f:
    f.write(content.encode('utf-8'))

print("File updated successfully!")

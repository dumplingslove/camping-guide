import re

with open('client/src/data/campgrounds.ts', 'r') as f:
    content = f.read()

# Strategy: find each campground object by matching `  {` after the array start
# and add lastUpdated before the closing `  },` or `  }`

lines = content.split('\n')
result = []
current_id = None
has_last_updated = False

for i, line in enumerate(lines):
    # Track current campground ID
    id_match = re.match(r'\s+id:\s+(\d+),', line)
    if id_match:
        current_id = int(id_match.group(1))
        has_last_updated = False
    
    # Check if this campground already has lastUpdated
    if current_id and 'lastUpdated:' in line:
        has_last_updated = True
    
    # Detect end of campground object - a line that is just "  }," or "  }"
    # preceded by a field line (not another closing brace)
    if current_id and not has_last_updated and re.match(r'^  \},?$', line):
        # Insert lastUpdated before this closing brace
        if current_id <= 24:
            date = '2026-07-10'
        elif current_id <= 36:
            date = '2026-07-08'
        else:
            date = '2026-07-11'
        result.append(f'    lastUpdated: "{date}",')
        has_last_updated = True
        current_id = None
    
    result.append(line)

with open('client/src/data/campgrounds.ts', 'w') as f:
    f.write('\n'.join(result))

# Verify
with open('client/src/data/campgrounds.ts', 'r') as f:
    content = f.read()
count = len(re.findall(r'lastUpdated:', content))
print(f'Total lastUpdated fields: {count}')

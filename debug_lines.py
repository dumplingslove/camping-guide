with open('client/src/data/campgrounds.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'Sol Duc Road' in line and 'tcNotes' in line:
        print("Line", i+1)
        print("  repr last 30:", repr(line[-30:]))
        stripped = line.strip()
        print("  starts with tcNotes:", stripped.startswith('tcNotes:'))
        ends_comma_brace = stripped.endswith(',  },')
        print("  ends with comma-space-space-brace-comma:", ends_comma_brace)
        print("  last 10 chars of stripped:", repr(stripped[-10:]))
        break

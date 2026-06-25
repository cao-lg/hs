import re
import json

input_path = '/workspace/gaokao-zy/data/schools-anhui.js'

with open(input_path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'(\n\s*\{\s*\n\s*id:\s*\d+,\s*\n\s*name:\s*"([^"]+)",[\s\S]*?\n\s*scoreHistory:\s*\{[\s\S]*?\n\s*\}\n\s*\})'

matches = list(re.finditer(pattern, content))
print(f'Found {len(matches)} matches')

if matches:
    for m in matches[:3]:
        print(f'  School: {m.group(2)}, length: {len(m.group(1))}')

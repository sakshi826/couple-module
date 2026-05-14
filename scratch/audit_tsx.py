import os
import re
import json

features_dir = r'd:\Downloads\Therapy Merged\src\features'

# Patterns to find potential hardcoded strings
# 1. Text between tags: >Text here<
# 2. Text in props: label="Text here", title="Text here", placeholder="Text here"
patterns = [
    re.compile(r'>\s*([A-Z][a-z]+(?:\s+[a-zA-Z]+)*)\s*<'),
    re.compile(r'(?:label|title|placeholder|subtitle|message|heading|buttonText|description|text)\s*=\s*["\']([A-Z][^"\']+)["\']'),
]

# Words to ignore (common components, props, etc.)
ignore_words = {'Moon', 'Sun', 'History', 'Check', 'X', 'Save', 'Play', 'Pause', 'Wind', 'RotateCcw', 'RefreshCw', 'PremiumLayout', 'PremiumComplete', 'PremiumIntro', 'AnimatePresence', 'motion', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'button'}

hardcoded_report = {}

for root, dirs, files in os.walk(features_dir):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                # Remove commented out code
                content = re.sub(r'{\s*/\*.*?\*/\s*}', '', content, flags=re.DOTALL)
                content = re.sub(r'//.*', '', content)
                
                # Find matches
                matches = []
                for pattern in patterns:
                    for match in pattern.finditer(content):
                        text = match.group(1).strip()
                        # Ignore if it's already using t()
                        # Simple check: is 't(' or 't("' or "t('" immediately before?
                        start = match.start(1)
                        if "t(" in content[max(0, start-10):start]:
                            continue
                        
                        if text and text not in ignore_words and len(text) > 1:
                            matches.append(text)
                
                if matches:
                    hardcoded_report[path] = list(set(matches))

with open(r'd:\Downloads\Therapy Merged\scratch\hardcoded_strings_audit.json', 'w', encoding='utf-8') as f:
    json.dump(hardcoded_report, f, indent=2)

print(f"Audit complete. Found potential hardcoded strings in {len(hardcoded_report)} files.")

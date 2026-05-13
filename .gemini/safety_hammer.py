import os
import re

def full_project_safety_hammer(path):
    print(f"Applying full project safety hammer to {path}...")
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    
                    if 't(' in content and '(typeof t' not in content:
                        # Regex to catch t( calls while excluding declarations
                        # Exclude: const { t } =, import { t }, function t(
                        new_content = re.sub(r'(?<!const\s\{)(?<!import\s\{)(?<!function\s)\bt\(', '(typeof t !== "undefined" ? t : (k) => k)(', content)
                        
                        if new_content != content:
                            with open(file_path, 'w', encoding='utf-8') as f:
                                f.write(new_content)
                except: continue

if __name__ == "__main__":
    full_project_safety_hammer('src')

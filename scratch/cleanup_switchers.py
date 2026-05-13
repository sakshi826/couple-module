import os
import re

src_dir = r"d:\Downloads\Therapy Merged\src"

def fix_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Remove imports of LanguageSelector and LanguageSwitcher
    content = re.sub(r'import .*LanguageSelector.*;?\n', '', content)
    content = re.sub(r'import .*LanguageSwitcher.*;?\n', '', content)
    
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(".tsx"):
            file_path = os.path.join(root, file)
            if fix_file(file_path):
                print(f"Cleaned {file_path}")

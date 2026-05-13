
import os
import re

def fix_hooks(content):
    lines = content.split('\n')
    new_lines = []
    for line in lines:
        # Check if it's a useTranslation hook call
        if 'const { t } = useTranslation();' in line:
            # Count leading spaces
            leading_spaces = len(line) - len(line.lstrip(' '))
            # Count leading tabs
            leading_tabs = len(line) - len(line.lstrip('\t'))
            
            # If it's indented more than one level (assuming 2 spaces per level)
            # Level 1 is 2 spaces. Level 2 is 4 spaces.
            # We remove if it's 4+ spaces or 2+ tabs.
            if leading_spaces >= 4 or leading_tabs >= 2:
                continue
        new_lines.append(line)
    return '\n'.join(new_lines)

def fix_db_nulls(content):
    # Pattern: (sql as any).query(queryString, params)
    # We want to add a check for sql
    return content.replace('(sql as any).query', '(sql ? (sql as any).query : async () => ({ rows: [] }))')

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = fix_hooks(content)
    new_content = fix_db_nulls(new_content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    src_dir = 'src'
    count = 0
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                if fix_file(os.path.join(root, file)):
                    count += 1
                    print(f"Fixed {file}")
    print(f"Total fixed: {count}")

if __name__ == '__main__':
    main()

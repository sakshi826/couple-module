
import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern: (sql as any).query(queryString, params)
    # We want to add a check for sql
    new_content = content.replace('(sql as any).query', '(sql ? (sql as any).query : async () => ({ rows: [] }))')
    
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
            if file.endswith('.ts') or file.endswith('.tsx'):
                if fix_file(os.path.join(root, file)):
                    count += 1
                    print(f"Fixed {file}")
    print(f"Total fixed: {count}")

if __name__ == '__main__':
    main()

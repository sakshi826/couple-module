import os
import re

def syntax_decorruptor(path):
    print(f"Decorrupting syntax in {path}...")
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith('.tsx'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                except: continue

                modified = False
                
                # Fix the specific corruption found in Sheet.tsx
                # Pattern: ),\n)\n  );\n};
                # Should be just ),\n)
                new_content = re.sub(r'\),\s*\)\s*;\s*\};', r'),\n)', content)
                if new_content != content:
                    content = new_content
                    modified = True

                # Fix double return parens
                new_content = re.sub(r'return\s*\(\s*\(\s*', r'return (\n', content)
                if new_content != content:
                    content = new_content
                    modified = True

                # Fix extra closing parens after export or displayname
                new_content = re.sub(r'\)\s*;\s*\)\s*;\s*\n', r');\n', content)
                if new_content != content:
                    content = new_content
                    modified = True

                # Fix the ))); case
                new_content = re.sub(r'\)\s*\)\s*;\s*\)\s*;\s*', r'));', content)
                if new_content != content:
                    content = new_content
                    modified = True

                if modified:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"  Fixed: {file_path}")

if __name__ == "__main__":
    syntax_decorruptor('src')

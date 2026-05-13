import os
import re

def super_fix(path):
    print(f"Applying super-fix to {path}...")
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith('.tsx'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                except:
                    continue

                if not re.search(r'\bt\(', content):
                    continue

                lines = content.split('\n')
                new_lines = []
                modified = False
                
                i = 0
                while i < len(lines):
                    line = lines[i]
                    
                    # 1. Handle concise arrow functions first (one-liners)
                    # const X = () => ( <div>{t('x')}</div> )
                    concise_match = re.search(r'^(const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*)\(([\s\S]*?)\)(?=\s*;|\s*$|\s*\n)', line)
                    if concise_match:
                         prefix = concise_match.group(1)
                         body = concise_match.group(2)
                         if re.search(r'\bt\(', body) and 'useTranslation' not in body:
                             new_lines.append(f'{prefix}{{')
                             new_lines.append('  const { t } = useTranslation();')
                             new_lines.append(f'  return ({body});')
                             new_lines.append('}')
                             modified = True
                             i += 1
                             continue

                    # 2. Handle block functions
                    # Check if this line is a function head
                    if re.search(r'(function\s+\w+|const\s+\w+\s*=\s*\(.*?\)\s*=>\s*\{)', line):
                        # Look ahead for t() usage before the next function start or hook
                        has_t_in_body = False
                        has_hook_in_body = False
                        
                        # We'll check the next 100 lines
                        for j in range(i + 1, min(len(lines), i + 101)):
                             # If we hit another function definition at the SAME or LESSER indentation, it's likely a sibling/parent end
                             # But simpler: if we hit a line that looks like another component head
                             if re.search(r'^(function\s+\w+|const\s+\w+\s*=\s*\(.*?\)\s*=>\s*\{)', lines[j]):
                                 break
                             
                             if re.search(r'\bt\(', lines[j]):
                                 has_t_in_body = True
                             if 'useTranslation()' in lines[j]:
                                 has_hook_in_body = True
                        
                        if has_t_in_body and not has_hook_in_body:
                             new_lines.append(line)
                             new_lines.append('  const { t } = useTranslation();')
                             modified = True
                             i += 1
                             continue
                    
                    new_lines.append(line)
                    i += 1

                if modified:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write('\n'.join(new_lines))
                    print(f"  Super-fixed: {file_path}")

if __name__ == "__main__":
    super_fix('src')

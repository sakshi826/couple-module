
import os
import re

def fix_illegal_hooks(content):
    # Pattern to find function bodies and check for useTranslation
    # This is tricky with regex, so we'll use a simpler line-by-line approach
    lines = content.split('\n')
    new_lines = []
    
    # Track if we are inside a lowercase function
    inside_illegal_scope = False
    brace_depth = 0
    illegal_scope_depth = 0
    
    for line in lines:
        # Check for function start: const funcName = ... => { or function funcName(...) {
        # We look for lowercase names
        match = re.search(r'(?:const|let|var)\s+([a-z][a-zA-Z0-9_]*)\s*=\s*(?:\([^)]*\)|[a-zA-Z0-9_]+)\s*=>\s*\{', line)
        if not match:
            match = re.search(r'function\s+([a-z][a-zA-Z0-9_]*)\s*\([^)]*\)\s*\{', line)
        
        if match:
            if not inside_illegal_scope:
                inside_illegal_scope = True
                illegal_scope_depth = brace_depth
        
        # Count braces to track scope
        brace_depth += line.count('{')
        brace_depth -= line.count('}')
        
        # If we are inside an illegal scope and find the hook, skip it
        if inside_illegal_scope and 'const { t } = useTranslation();' in line:
            continue
            
        # If we reached the end of the illegal scope
        if inside_illegal_scope and brace_depth <= illegal_scope_depth:
            inside_illegal_scope = False
            
        new_lines.append(line)
        
    return '\n'.join(new_lines)

def fix_db_nulls(content):
    return content.replace('(sql as any).query', '(sql ? (sql as any).query : async () => ({ rows: [] }))')

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = fix_illegal_hooks(content)
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

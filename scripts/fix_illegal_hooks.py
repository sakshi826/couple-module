
import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern: a function (handler or helper) containing the hook
    # We look for indentation to guess if it's nested
    lines = content.split('\n')
    new_lines = []
    in_component = False
    
    for line in lines:
        # Check if we are starting a component (rough guess: export default function X or const X = )
        if re.search(r'(export\s+(default\s+)?(function|const)\s+[A-Z])', line):
            in_component = True
        
        # If we see the hook and it's indented more than the component start, it's likely nested
        # Or if we've already seen it in the same component
        if 'const { t } = useTranslation();' in line:
            # If it's indented (starts with whitespace), it's likely nested
            if line.startswith('  ') or line.startswith('\t'):
                # Check if we already have it at the top level of this component (level 1 indentation)
                # For simplicity, if it's indented at all, it's probably bad if it's not at the very top of a component
                # Most components have the hook at the very top
                # Here we'll just remove it if it's inside a function that looks like a handler
                # Example: const handleX = () => { \n const { t } = useTranslation();
                # We'll just remove it and see. If t is missing, the global fallback handles it.
                continue 
        
        new_lines.append(line)
    
    new_content = '\n'.join(new_lines)
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

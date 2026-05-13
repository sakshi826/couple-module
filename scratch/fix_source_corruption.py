import os
import re

src_dir = r"d:\Downloads\Therapy Merged\src"

def fix_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    new_lines = []
    seen_t_in_file = False
    
    # We'll use a simpler approach: 
    # 1. Remove duplicate lines that are exactly the same
    # 2. Remove any useTranslation calls that are nested (indented more than 2 spaces)
    # 3. Fix the specific double declaration in some files
    
    for i, line in enumerate(lines):
        # Fix double imports in the same file
        if line.strip().startswith("import ") and line.strip() in [l.strip() for l in new_lines if l.strip().startswith("import ")]:
            continue
            
        # Detect useTranslation
        if "const { t" in line and "useTranslation(" in line:
            indent = len(line) - len(line.lstrip())
            
            # If it's heavily indented, it's definitely illegal (nested hook)
            if indent > 2:
                continue
                
            # If we've already seen a 't' declaration at the same or lower indentation in this component...
            # Actually, let's just keep the VERY FIRST one in the file if they are top-level
            if seen_t_in_file and indent <= 2:
                # Check if the previous lines also had it
                # This is tricky because one file might have multiple components
                # But for this project, the corruption often put them right next to each other
                if i > 0 and ("const { t" in lines[i-1] and "useTranslation(" in lines[i-1]):
                    continue
            
            seen_t_in_file = True
            
        new_lines.append(line)
    
    # Second pass: fix the 't' then 't, i18n' pattern
    final_lines = []
    for i, line in enumerate(new_lines):
        if i < len(new_lines) - 1:
            curr = line.strip()
            nxt = new_lines[i+1].strip()
            if curr == "const { t } = useTranslation();" and nxt == "const { t, i18n } = useTranslation();":
                continue # Skip the first one
            if curr == "const { t } = useTranslation();" and nxt == "const { t } = useTranslation();":
                continue # Skip the first one
        final_lines.append(line)

    content = "".join(final_lines)
    
    # Final check for the App.tsx case where it's indented but weirdly
    # We want to remove any useTranslation that is inside a function that is not a component
    # For now, let's just target the one in App.tsx specifically since I know it's there
    if "App.tsx" in file_path:
        content = re.sub(r"const redirectToAuth = \(\) => \{\n\s*const \{ t \} = useTranslation\(\);\n", "const redirectToAuth = () => {\n", content)

    with open(file_path, 'r', encoding='utf-8') as f:
        original = f.read()
        
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith((".tsx", ".ts")):
            file_path = os.path.join(root, file)
            if fix_file(file_path):
                print(f"Fixed {file_path}")

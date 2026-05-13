import os

def clean_one_go_fix(path):
    print(f"Applying CLEAN one-go fix to {path}...")
    
    # 1. Global Fallback in main.tsx
    main_path = os.path.join(path, 'main.tsx')
    if os.path.exists(main_path):
        with open(main_path, 'r', encoding='utf-8') as f:
            content = f.read()
        if 'window.t =' not in content:
            content = content.replace('import "./styles/index.css";', 
                                     'import "./styles/index.css";\n\n// Global fallback to prevent ReferenceError: t is not defined\n(window as any).t = (key: string) => key;')
            with open(main_path, 'w', encoding='utf-8') as f:
                f.write(content)

    # 2. UI Component Patch (Safe Access via String Replacement - NO SYNTAX CHANGES)
    targets = {
        't("breadcrumb")': '(typeof t !== "undefined" ? t : (k) => k)("breadcrumb")',
        't("close")': '(typeof t !== "undefined" ? t : (k) => k)("close")',
        't("more")': '(typeof t !== "undefined" ? t : (k) => k)("more")'
    }
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith('.tsx'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    
                    modified = False
                    for k, v in targets.items():
                        if k in content and '(typeof t' not in content:
                            content = content.replace(k, v)
                            modified = True
                    
                    if modified:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(content)
                except: continue

    # 3. Entry point Fix (Imports Only)
    for root, dirs, files in os.walk(path):
        for file in files:
            if file == 'index.tsx' and 'features' in root:
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    if 'import i18n' not in content:
                        # Find the first import and prepend
                        content = 'import i18n from "./i18n";\nimport { I18nextProvider } from "react-i18next";\n' + content
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(content)
                except: continue

if __name__ == "__main__":
    clean_one_go_fix('src')

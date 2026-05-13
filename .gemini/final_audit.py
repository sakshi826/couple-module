import os
import re

def final_audit(path):
    print(f"Final audit of t usage in {path}...")
    bad_files = []
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                except:
                    continue
                
                # Check for t( usage
                if re.search(r'\bt\(', content):
                    # Check for t definition
                    has_definition = (
                        re.search(r'\bconst\s+\{.*?t.*?\}\s*=\s*useTranslation', content) or
                        re.search(r'\bconst\s+t\s*=', content) or
                        re.search(r'\bfunction\s+.*?\(\s*t\b', content) or
                        re.search(r'\bimport\s+.*?t\b', content) or
                        re.search(r'\blet\s+t\b', content) or
                        re.search(r'\bvar\s+t\b', content)
                    )
                    
                    if not has_definition:
                        bad_files.append(file_path)
    return bad_files

if __name__ == "__main__":
    results = final_audit('src')
    if results:
        print(f"Found {len(results)} files with missing t definition:")
        for f in results:
            print(f"- {f}")
    else:
        print("No files with missing t definition found.")

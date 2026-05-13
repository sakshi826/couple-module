import os
import json
import re

def find_code_in_json(path):
    results = []
    code_indicators = ['=>', 'Math.', '().', 'const ', 'return ', ';', '}', '{']
    
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith('en.json'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                except:
                    continue
                
                def check_obj(obj, prefix=''):
                    for k, v in obj.items():
                        if isinstance(v, str):
                            count = sum(1 for ind in code_indicators if ind in v)
                            if count >= 2 or '=>' in v or 'const ' in v:
                                results.append((file_path, prefix + k, v))
                        elif isinstance(v, dict):
                            check_obj(v, prefix + k + '.')
                
                check_obj(data)
    return results

if __name__ == "__main__":
    res = find_code_in_json('src')
    if res:
        print(f"Found {len(res)} suspicious strings.")
        for f, k, v in res:
             # Sanitize for console
             v_clean = v.replace('\n', '\\n')[:100]
             print(f"File: {f} | Key: {k} | Value: {v_clean}")
    else:
        print("No code-like strings found.")

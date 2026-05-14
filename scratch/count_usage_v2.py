import os
import json

base_dir = r'd:\Downloads\Therapy Merged\src\features'
total_chars = 0
total_keys = 0

for feature in os.listdir(base_dir):
    i18n_dir = os.path.join(base_dir, feature, 'i18n')
    if not os.path.exists(i18n_dir): continue
    
    for filename in os.listdir(i18n_dir):
        if filename.endswith('.json') and filename != 'en.json':
            path = os.path.join(i18n_dir, filename)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                def count_usage(d):
                    chars = 0
                    keys = 0
                    if isinstance(d, dict):
                        for v in d.values():
                            c, k = count_usage(v)
                            chars += c
                            keys += k
                    elif isinstance(d, list):
                        for item in d:
                            c, k = count_usage(item)
                            chars += c
                            keys += k
                    elif isinstance(d, str):
                        chars = len(d)
                        keys = 1
                    return chars, keys
                
                c, k = count_usage(data)
                total_chars += c
                total_keys += k
            except: continue

print(f"Total Translated Keys: {total_keys}")
print(f"Total Translated Characters: {total_chars}")
print(f"Estimated Cost ($20/1M chars): ${ (total_chars / 1000000) * 20 :.2f}")

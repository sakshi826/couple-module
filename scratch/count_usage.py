import os
import json

base_dir = r'd:\Downloads\Therapy Merged\src\features'
total_translated_keys = 0
total_translated_files = 0

for feature in os.listdir(base_dir):
    i18n_dir = os.path.join(base_dir, feature, 'i18n')
    if not os.path.exists(i18n_dir): continue
    
    for filename in os.listdir(i18n_dir):
        if filename.endswith('.json') and filename != 'en.json':
            path = os.path.join(i18n_dir, filename)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                def count_keys(d):
                    count = 0
                    if isinstance(d, dict):
                        for v in d.values():
                            count += count_keys(v)
                    elif isinstance(d, list):
                        for item in d:
                            count += count_keys(item)
                    else:
                        count = 1
                    return count
                
                total_translated_keys += count_keys(data)
                total_translated_files += 1
            except: continue

print(f"Total Translated Keys: {total_translated_keys}")
print(f"Total Translated Files: {total_translated_files}")

import json
import os

base_dir = r'd:\Downloads\Therapy Merged\src\features'
features = [d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d))]

missing_keys_report = {}

for feature in features:
    i18n_dir = os.path.join(base_dir, feature, 'i18n')
    if not os.path.exists(i18n_dir): continue
    
    en_path = os.path.join(i18n_dir, 'en.json')
    if not os.path.exists(en_path): continue
    
    with open(en_path, 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    
    def get_keys(d, prefix=''):
        keys = set()
        for k, v in d.items():
            full_key = f"{prefix}.{k}" if prefix else k
            if isinstance(v, dict):
                keys.update(get_keys(v, full_key))
            else:
                keys.add(full_key)
        return keys

    en_keys = get_keys(en_data)
    
    for filename in os.listdir(i18n_dir):
        if filename.endswith('.json') and filename != 'en.json':
            lang = filename[:-5]
            path = os.path.join(i18n_dir, filename)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    lang_data = json.load(f)
                lang_keys = get_keys(lang_data)
                missing = en_keys - lang_keys
                if missing:
                    if feature not in missing_keys_report: missing_keys_report[feature] = {}
                    missing_keys_report[feature][lang] = list(missing)
            except: continue

with open(r'd:\Downloads\Therapy Merged\scratch\missing_keys_audit.json', 'w', encoding='utf-8') as f:
    json.dump(missing_keys_report, f, indent=2)

print(f"Audit complete. Found missing keys in {len(missing_keys_report)} features.")

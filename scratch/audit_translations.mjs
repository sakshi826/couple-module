import fs from 'fs';
import path from 'path';

const TARGET_LANGUAGES = [
  'es', 'fr', 'de', 'pt', 'ru',
  'zh-Hans', 'zh-Hant',
  'ja', 'ko',
  'ar', 'hi', 'bn',
  'id', 'tr', 'vi',
  'it', 'pl', 'th', 'tl',
  'nl', 'sv', 'no', 'da', 'fi',
  'cs', 'el', 'ro', 'hu', 'uk',
  'he', 'ms', 'ta', 'te', 'ur'
];

const featuresDir = 'src/features';
const features = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

console.log(`Checking ${features.length} features for 35 language parity...`);

const missing = [];

for (const feature of features) {
    const i18nDir = path.join(featuresDir, feature, 'i18n');
    if (!fs.existsSync(i18nDir)) continue;

    const files = fs.readdirSync(i18nDir);
    for (const lang of TARGET_LANGUAGES) {
        if (!files.includes(`${lang}.json`)) {
            missing.push(`${feature}: ${lang}`);
        }
    }
}

if (missing.length === 0) {
    console.log('All features have 35 language parity!');
} else {
    console.log(`Found ${missing.length} missing translation files:`);
    missing.forEach(m => console.log(`  - ${m}`));
}

// Also check src/app/i18n
const appI18nDir = 'src/app/i18n';
const appFiles = fs.readdirSync(appI18nDir);
for (const lang of TARGET_LANGUAGES) {
    if (!appFiles.includes(`${lang}.json`)) {
        console.log(`Missing in app i18n: ${lang}`);
    }
}

// Also check src/features/resources/data/sample_data_*.json
const resourcesDataDir = 'src/features/resources/data';
const dataFiles = fs.readdirSync(resourcesDataDir);
for (const lang of TARGET_LANGUAGES) {
    const filename = `sample_data_${lang}.json`;
    if (!dataFiles.includes(filename)) {
        console.log(`Missing in resources data: ${filename}`);
    }
}

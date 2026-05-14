const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_TRANSLATOR_KEY;
const ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';

const TARGET_LANGUAGES = ['ur', 'hi', 'es']; // Testing with a few

function flatten(obj, prefix = '') {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flatten(value, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

function unflatten(obj) {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    const parts = key.split('.');
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

async function translateBatch(texts, targetLang) {
    if (texts.length === 0) return [];
    try {
        const googleLang = targetLang === 'zh-Hans' ? 'zh-CN' : 
                          targetLang === 'zh-Hant' ? 'zh-TW' : 
                          targetLang === 'tl' ? 'tl' : targetLang;

        const response = await axios({
            url: ENDPOINT,
            method: 'post',
            params: { key: API_KEY },
            data: {
                q: texts,
                target: googleLang,
                format: 'text'
            }
        });
        return response.data.data.translations.map(res => res.translatedText);
    } catch (error) {
        console.error(`Error translating to ${targetLang}:`, error.response?.data?.error?.message || error.message);
        return null;
    }
}

async function run() {
    const i18nDir = path.join(__dirname, '..', 'src', 'app', 'i18n');
    const enPath = path.join(i18nDir, 'en.json');
    const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const flattenedEn = flatten(enContent);
    const keys = Object.keys(flattenedEn);
    const values = Object.values(flattenedEn);

    console.log('Translating Hub specific keys...');
    for (const lang of TARGET_LANGUAGES) {
        const targetPath = path.join(i18nDir, `${lang}.json`);
        let existingContent = fs.existsSync(targetPath) ? JSON.parse(fs.readFileSync(targetPath, 'utf8')) : {};
        let flattenedTarget = flatten(existingContent);

        const missingKeys = [];
        const missingValues = [];
        keys.forEach((key, i) => {
            // Check if key is missing OR if it's an empty object in the original structure (flattened as missing)
            // Or if it's in guided_series and target is empty/missing
            if (!flattenedTarget[key] || (key.startsWith('guided_series.') && (flattenedTarget[key] === values[i] || !flattenedTarget[key]))) {
                missingKeys.push(key);
                missingValues.push(values[i]);
            }
        });

        if (missingKeys.length > 0) {
            console.log(`Translating ${missingKeys.length} keys to ${lang}... `);
            const translatedValues = [];
            for (let i = 0; i < missingValues.length; i += 20) { // Smaller batches
                const batch = missingValues.slice(i, i + 20);
                const translated = await translateBatch(batch, lang);
                if (translated) {
                    translatedValues.push(...translated);
                    console.log(`  Progress: ${translatedValues.length}/${missingKeys.length}`);
                } else {
                    console.log('  Batch failed, stopping this language.');
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 2000)); // 2s delay
            }

            if (translatedValues.length === missingKeys.length) {
                missingKeys.forEach((key, i) => {
                    flattenedTarget[key] = translatedValues[i];
                });
                const targetContent = unflatten(flattenedTarget);
                fs.writeFileSync(targetPath, JSON.stringify(targetContent, null, 2));
                console.log('  Success!');
            }
        } else {
            console.log(`Skipping ${lang} - no missing keys.`);
        }
    }
}

run();

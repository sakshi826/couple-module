const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.AZURE_TRANSLATOR_KEY;
const ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';

const TARGET_LANGUAGES = [
  'es', 'fr', 'de', 'pt', 'ru',
  'zh-CN', 'zh-TW',
  'ja', 'ko',
  'ar', 'hi', 'bn',
  'id', 'tr', 'vi',
  'it', 'pl', 'th', 'tl',
  'nl', 'sv', 'nb', 'da', 'fi',
  'cs', 'el', 'ro', 'hu', 'uk',
  'he', 'ms', 'ta', 'te', 'ur'
];

function flatten(obj, prefix = '') {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
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
        // If file exists, we only want to translate missing keys.
        let existingContent = fs.existsSync(targetPath) ? JSON.parse(fs.readFileSync(targetPath, 'utf8')) : {};
        let flattenedTarget = flatten(existingContent);

        const missingKeys = [];
        const missingValues = [];
        keys.forEach((key, i) => {
            if (!flattenedTarget[key]) {
                missingKeys.push(key);
                missingValues.push(values[i]);
            }
        });

        if (missingKeys.length > 0) {
            process.stdout.write(`Translating ${missingKeys.length} keys to ${lang}... `);
            const translatedValues = [];
            for (let i = 0; i < missingValues.length; i += 50) {
                const batch = missingValues.slice(i, i + 50);
                const translated = await translateBatch(batch, lang);
                if (translated) {
                    translatedValues.push(...translated);
                }
            }

            if (translatedValues.length === missingKeys.length) {
                missingKeys.forEach((key, i) => {
                    flattenedTarget[key] = translatedValues[i];
                });
                const targetContent = unflatten(flattenedTarget);
                fs.writeFileSync(targetPath, JSON.stringify(targetContent, null, 2));
                console.log('Done.');
            } else {
                console.log('Failed.');
            }
        } else {
            console.log(`Skipping ${lang} - no missing keys.`);
        }
    }
    console.log('Hub translations synchronized.');
}

run();

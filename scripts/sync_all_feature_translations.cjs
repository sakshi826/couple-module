const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.AZURE_TRANSLATOR_KEY;
const ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';

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
  
  // Post-process to convert objects with numeric keys back to arrays if needed
  function convertArrays(o) {
    if (typeof o !== 'object' || o === null) return o;
    
    for (const key in o) {
      o[key] = convertArrays(o[key]);
    }
    
    const keys = Object.keys(o);
    if (keys.length > 0 && keys.every(k => !isNaN(k))) {
      const arr = [];
      keys.forEach(k => {
        arr[parseInt(k)] = o[k];
      });
      return arr;
    }
    return o;
  }
  
  return convertArrays(result);
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
        return null;
    }
}

async function syncFeature(feature) {
    const i18nDir = path.join(__dirname, '..', 'src', 'features', feature, 'i18n');
    const enPath = path.join(i18nDir, 'en.json');
    if (!fs.existsSync(enPath)) return;

    const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const flattenedEn = flatten(enContent);
    const keys = Object.keys(flattenedEn);
    const values = Object.values(flattenedEn);

    for (const lang of TARGET_LANGUAGES) {
        const targetPath = path.join(i18nDir, `${lang}.json`);
        let existingContent = fs.existsSync(targetPath) ? JSON.parse(fs.readFileSync(targetPath, 'utf8')) : {};
        let flattenedTarget = flatten(existingContent);

        // Purge keys from target that are not in EN
        Object.keys(flattenedTarget).forEach(key => {
            if (!flattenedEn.hasOwnProperty(key)) {
                delete flattenedTarget[key];
            }
        });

        const missingKeys = [];
        const missingValues = [];
        const technicalKeys = ['answer', 'type', 'slug', 'id', 'url', 'icon', 'image'];
        const forceUpdateKeys = ['app_title', 'app_description'];
        
        keys.forEach((key, i) => {
            const keyParts = key.split('.');
            const lastPart = keyParts[keyParts.length - 1];
            
            if (technicalKeys.includes(lastPart)) {
                // Force copy technical keys as-is
                flattenedTarget[key] = values[i];
            } else if (forceUpdateKeys.includes(lastPart)) {
                // If it's a title/desc, check if it needs update (this is tricky without original EN)
                // For now, we'll only translate if missing, but we'll manually fix care_tracker
                if (!flattenedTarget[key]) {
                    missingKeys.push(key);
                    missingValues.push(values[i]);
                }
            } else if (!flattenedTarget[key]) {
                missingKeys.push(key);
                missingValues.push(values[i]);
            }
        });

        if (missingKeys.length > 0) {
            const translatedValues = [];
            for (let i = 0; i < missingValues.length; i += 50) {
                const batch = missingValues.slice(i, i + 50);
                const translated = await translateBatch(batch, lang);
                if (translated) translatedValues.push(...translated);
            }

            if (translatedValues.length === missingKeys.length) {
                missingKeys.forEach((key, i) => {
                    flattenedTarget[key] = translatedValues[i];
                });
            }
        }
        
        // Always reconstruct to ensure arrays are preserved and structural parity
        const finalContent = unflatten(flattenedTarget);
        const finalString = JSON.stringify(finalContent, null, 2);
        const currentString = fs.existsSync(targetPath) ? fs.readFileSync(targetPath, 'utf8') : '';
        
        if (finalString !== currentString) {
            fs.writeFileSync(targetPath, finalString);
        }
    }
}

async function run() {
    const featuresDir = path.join(__dirname, '..', 'src', 'features');
    const features = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

    console.log(`Starting massive sync for ${features.length} features...`);
    for (const feature of features) {
        process.stdout.write(`Syncing ${feature}... `);
        await syncFeature(feature);
        console.log('Done.');
    }
    console.log('All feature translations synchronized.');
}

run();

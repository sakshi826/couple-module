import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

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

// Helper to flatten/unflatten JSON
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
        // Look ahead to see if the next part is a number
        const nextPart = parts[i + 1];
        current[part] = /^\d+$/.test(nextPart) ? [] : {};
      }
      current = current[part];
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

// Protect i18next interpolation variables
function protectInterpolation(text) {
  if (typeof text !== 'string') return { protectedText: text, placeholders: [] };
  const placeholders = [];
  const protectedText = text.replace(/\{\{([^}]+)\}\}/g, (match, p1) => {
    const id = placeholders.length;
    placeholders.push(match);
    return `[[${id}]]`;
  });
  return { protectedText, placeholders };
}

function restoreInterpolation(text, placeholders) {
  if (typeof text !== 'string') return text;
  return text.replace(/\[\[(\d+)\]\]/g, (match, id) => {
    return placeholders[id] || match;
  });
}

async function translateBatch(texts, targetLang) {
  if (texts.length === 0) return [];

  const googleLang = targetLang === 'zh-Hans' ? 'zh-CN' : 
                    targetLang === 'zh-Hant' ? 'zh-TW' : 
                    targetLang === 'tl' ? 'tl' : targetLang;

  const body = texts.map(text => {
    const { protectedText, placeholders } = protectInterpolation(text);
    return { text: protectedText, placeholders };
  });

  try {
    const response = await axios({
      url: ENDPOINT,
      method: 'post',
      params: { key: API_KEY },
      data: {
        q: body.map(b => b.text),
        target: googleLang,
        format: 'text'
      }
    });

    return response.data.data.translations.map((res, i) => {
      return restoreInterpolation(res.translatedText, body[i].placeholders);
    });
  } catch (error) {
    console.error(`Error translating to ${targetLang}:`, error.response?.data?.error?.message || error.message);
    throw error;
  }
}

async function translateModule(moduleName) {
  const moduleDir = path.join(process.cwd(), 'src', 'features', moduleName);
  const i18nDir = path.join(moduleDir, 'i18n');
  const enPath = path.join(i18nDir, 'en.json');

  if (!fs.existsSync(enPath)) {
    console.error(`Error: en.json not found for module ${moduleName} at ${enPath}`);
    return;
  }

  const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const flattenedEn = flatten(enContent);
  const keys = Object.keys(flattenedEn);
  const values = Object.values(flattenedEn);

  for (const lang of TARGET_LANGUAGES) {
    const targetPath = path.join(i18nDir, `${lang}.json`);
    
    if (fs.existsSync(targetPath)) {
      console.log(`Skipping ${lang} for ${moduleName} - already exists.`);
      continue;
    }

    console.log(`Translating ${moduleName} to ${lang}...`);
    
    try {
      const translatedValues = [];
      for (let i = 0; i < values.length; i += 50) {
        const batch = values.slice(i, i + 50);
        const translatedBatchResult = await translateBatch(batch, lang);
        translatedValues.push(...translatedBatchResult);
      }

      const flattenedTarget = {};
      keys.forEach((key, i) => {
        flattenedTarget[key] = translatedValues[i];
      });

      const targetContent = unflatten(flattenedTarget);
      fs.writeFileSync(targetPath, JSON.stringify(targetContent, null, 2), 'utf8');
      console.log(`Successfully generated ${lang}.json`);
    } catch (error) {
      console.error(`Failed to translate to ${lang}. Moving to next language.`);
    }
  }
}

const moduleName = process.argv[2];
if (!moduleName) {
  console.log('Usage: node scripts/translate.js <module_name>');
  process.exit(1);
}

translateModule(moduleName);

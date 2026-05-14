import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const API_KEY = process.env.GOOGLE_TRANSLATOR_KEY;
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

async function syncAppI18n() {
    const i18nDir = path.join(rootDir, 'src', 'app', 'i18n');
    const enPath = path.join(i18nDir, 'en.json');
    const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));

    for (const lang of TARGET_LANGUAGES) {
        const targetPath = path.join(i18nDir, `${lang}.json`);
        let targetContent = fs.existsSync(targetPath) ? JSON.parse(fs.readFileSync(targetPath, 'utf8')) : {};

        // Only sync guided_series block for now to save quota, or sync everything?
        // Let's sync everything that's missing.
        
        async function syncObject(source, target) {
            const missingKeys = [];
            const missingValues = [];
            
            for (const [key, value] of Object.entries(source)) {
                if (typeof value === 'object' && value !== null) {
                    if (!target[key]) target[key] = Array.isArray(value) ? [] : {};
                    await syncObject(value, target[key]);
                } else if (!target[key]) {
                    missingKeys.push(key);
                    missingValues.push(value);
                }
            }

            if (missingKeys.length > 0) {
                console.log(`Translating ${missingKeys.length} keys for ${lang}...`);
                const translated = await translateBatch(missingValues, lang);
                if (translated) {
                    missingKeys.forEach((key, i) => {
                        target[key] = translated[i];
                    });
                }
            }
        }

        await syncObject(enContent, targetContent);
        fs.writeFileSync(targetPath, JSON.stringify(targetContent, null, 2));
        console.log(`Synced ${lang}.json`);
    }
}

syncAppI18n();

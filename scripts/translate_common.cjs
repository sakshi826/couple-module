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

const commonKeys = {
  get_started: "Get Started",
  start_over: "Start Over",
  finish_exit: "Finish & Exit",
  well_done: "Well Done!",
  completion_message: "You've successfully completed this activity. Take a moment to appreciate your progress.",
  time_to_complete: "Time to complete",
  back: "Back",
  next: "Next",
  save: "Save",
  loading: "Loading..."
};

const keys = Object.keys(commonKeys);
const values = Object.values(commonKeys);

async function translateBatch(texts, targetLang) {
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
    const translations = {};

    console.log('Translating common keys...');
    for (const lang of TARGET_LANGUAGES) {
        process.stdout.write(`Translating to ${lang}... `);
        const translated = await translateBatch(values, lang);
        if (translated) {
            translations[lang] = {};
            keys.forEach((key, i) => {
                translations[lang][key] = translated[i];
            });
            console.log('Done.');
        } else {
            console.log('Failed.');
        }
    }

    // Now propagate to all features
    const featuresDir = path.join(__dirname, '..', 'src', 'features');
    const features = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

    features.forEach(feature => {
        const i18nDir = path.join(featuresDir, feature, 'i18n');
        if (fs.existsSync(i18nDir)) {
            for (const lang of TARGET_LANGUAGES) {
                const langPath = path.join(i18nDir, `${lang}.json`);
                if (fs.existsSync(langPath) && translations[lang]) {
                    let content = JSON.parse(fs.readFileSync(langPath, 'utf8'));
                    content.common = translations[lang];
                    fs.writeFileSync(langPath, JSON.stringify(content, null, 2));
                }
            }
        }
    });

    // Also hub
    const hubI18nDir = path.join(__dirname, '..', 'src', 'app', 'i18n');
    if (fs.existsSync(hubI18nDir)) {
        for (const lang of TARGET_LANGUAGES) {
            const langPath = path.join(hubI18nDir, `${lang}.json`);
            if (translations[lang]) {
                let content = fs.existsSync(langPath) ? JSON.parse(fs.readFileSync(langPath, 'utf8')) : {};
                content.common = translations[lang];
                // For hub, we also need to translate the hub specific keys if the file is new
                // But let's just do common for now to unblock UI.
                fs.writeFileSync(langPath, JSON.stringify(content, null, 2));
            }
        }
    }

    console.log('Propagated common translations to all modules.');
}

run();

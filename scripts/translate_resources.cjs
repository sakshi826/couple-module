const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_TRANSLATOR_KEY;
const ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';

const dataDir = path.join(__dirname, '..', 'src', 'features', 'resources', 'data');
const sourceFile = path.join(dataDir, 'sample_data.json');

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
    if (!texts || texts.length === 0) return [];
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
        console.error(`Translation error for ${targetLang}:`, error.response?.data || error.message);
        return null;
    }
}

async function translateResourceFile(lang) {
    const targetFile = path.join(dataDir, `sample_data_${lang}.json`);
    if (fs.existsSync(targetFile)) {
        console.log(`[${lang}] Already exists, skipping.`);
        return;
    }

    console.log(`[${lang}] Starting translation...`);
    const data = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
    
    const types = ['stories', 'articles', 'myths', 'tips'];
    for (const type of types) {
        console.log(`  Translating ${type}...`);
        const items = data[type];
        
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const fieldsToTranslate = [];
            
            // Core fields
            const coreFields = ['title', 'preview', 'quote', 'highlight', 'takeaway', 'truth', 'explanation', 'whyItHelps', 'identity', 'body'];
            coreFields.forEach(f => {
                if (item[f]) fieldsToTranslate.push({ key: f, value: item[f] });
            });

            // Arrays
            if (item.story && Array.isArray(item.story)) {
                item.story.forEach((p, idx) => fieldsToTranslate.push({ key: `story[${idx}]`, value: p }));
            }
            if (item.whatYouCanDo && Array.isArray(item.whatYouCanDo)) {
                item.whatYouCanDo.forEach((s, idx) => fieldsToTranslate.push({ key: `whatYouCanDo[${idx}]`, value: s }));
            }
            if (item.example) {
                if (item.example.instead) fieldsToTranslate.push({ key: 'example.instead', value: item.example.instead });
                if (item.example.tryThis) fieldsToTranslate.push({ key: 'example.tryThis', value: item.example.tryThis });
            }

            if (fieldsToTranslate.length > 0) {
                const values = fieldsToTranslate.map(f => f.value);
                const translated = await translateBatch(values, lang);
                
                if (translated) {
                    fieldsToTranslate.forEach((f, idx) => {
                        const transVal = translated[idx];
                        if (f.key.startsWith('story[')) {
                            const sIdx = parseInt(f.key.match(/\d+/)[0]);
                            item.story[sIdx] = transVal;
                        } else if (f.key.startsWith('whatYouCanDo[')) {
                            const sIdx = parseInt(f.key.match(/\d+/)[0]);
                            item.whatYouCanDo[sIdx] = transVal;
                        } else if (f.key.startsWith('example.')) {
                            const subKey = f.key.split('.')[1];
                            item.example[subKey] = transVal;
                        } else {
                            item[f.key] = transVal;
                        }
                    });
                } else {
                    console.error(`Skipping batch due to error in ${lang}`);
                }
                // Delay to avoid rate limits
                await new Promise(resolve => setTimeout(resolve, 300));
            }
            if (i % 10 === 0) console.log(`    Processed ${i}/${items.length} items...`);
        }
    }

    fs.writeFileSync(targetFile, JSON.stringify(data, null, 2));
    console.log(`[${lang}] Complete.`);
}

async function run() {
    // Process priority languages first
    const priority = ['ko', 'es', 'fr', 'de', 'pt', 'hi', 'zh-Hans'];
    for (const lang of priority) {
        await translateResourceFile(lang);
    }
    
    // Process the rest
    for (const lang of TARGET_LANGUAGES) {
        if (!priority.includes(lang)) {
            await translateResourceFile(lang);
        }
    }
}

run().catch(console.error);

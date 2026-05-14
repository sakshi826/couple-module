const fs = require('fs');
const path = require('path');

const hubDir = 'src/app/i18n';
const featuresDir = 'src/features';

// 1. Load Master Common from Hub
const masterCommon = {};
const hubFiles = fs.readdirSync(hubDir).filter(f => f.endsWith('.json'));
hubFiles.forEach(file => {
    const lang = file.replace('.json', '');
    try {
        const data = JSON.parse(fs.readFileSync(path.join(hubDir, file), 'utf8'));
        if (data.common) masterCommon[lang] = data.common;
    } catch (e) {}
});

// 2. Sync all features
const features = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

features.forEach(feature => {
    const i18nDir = path.join(featuresDir, feature, 'i18n');
    if (!fs.existsSync(i18nDir)) return;

    const enPath = path.join(i18nDir, 'en.json');
    if (!fs.existsSync(enPath)) return;

    let enData;
    try {
        enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    } catch (e) { return; }

    const langFiles = fs.readdirSync(i18nDir).filter(f => f.endsWith('.json') && f !== 'en.json');
    langFiles.forEach(file => {
        const lang = file.replace('.json', '');
        const langPath = path.join(i18nDir, file);
        let langData;
        try {
            langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));
        } catch (e) { langData = {}; }

        const synced = syncObject(enData, langData, lang);
        fs.writeFileSync(langPath, JSON.stringify(synced, null, 2));
    });
    console.log(`Synced ${feature}`);
});

function syncObject(en, langData, langCode) {
    const result = { ...langData };
    
    Object.keys(en).forEach(key => {
        if (typeof en[key] === 'object' && en[key] !== null && !Array.isArray(en[key])) {
            result[key] = syncObject(en[key], result[key] || {}, langCode);
        } else {
            if (result[key] === undefined || result[key] === null || result[key] === "") {
                // Try to find in master common
                if (masterCommon[langCode] && masterCommon[langCode][key]) {
                    result[key] = masterCommon[langCode][key];
                } else {
                    result[key] = en[key];
                }
            }
        }
    });
    
    return result;
}

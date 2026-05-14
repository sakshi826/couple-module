const fs = require('fs');
const path = require('path');

const featuresDir = 'src/features';
const features = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

const report = {};

features.forEach(feature => {
    const i18nDir = path.join(featuresDir, feature, 'i18n');
    if (!fs.existsSync(i18nDir)) return;

    const enPath = path.join(i18nDir, 'en.json');
    if (!fs.existsSync(enPath)) return;

    let enData;
    try {
        enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    } catch (e) {
        return;
    }

    const enKeys = getDeepKeys(enData);
    const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.json') && f !== 'en.json');

    files.forEach(file => {
        const lang = file.replace('.json', '');
        let langData;
        try {
            langData = JSON.parse(fs.readFileSync(path.join(i18nDir, file), 'utf8'));
        } catch (e) {
            return;
        }

        const langKeys = getDeepKeys(langData);
        const missing = enKeys.filter(k => !langKeys.includes(k));
        
        if (missing.length > 0) {
            if (!report[feature]) report[feature] = {};
            if (!report[feature][lang]) report[feature][lang] = [];
            report[feature][lang] = missing;
        }
    });
});

function getDeepKeys(obj, prefix = '') {
    return Object.keys(obj).reduce((res, el) => {
        if (Array.isArray(obj[el])) {
            return res.concat(prefix + el);
        } else if (typeof obj[el] === 'object' && obj[el] !== null) {
            return res.concat(getDeepKeys(obj[el], prefix + el + '.'));
        }
        return res.concat(prefix + el);
    }, []);
}

console.log(JSON.stringify(report, null, 2));

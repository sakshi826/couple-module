const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, '..', 'src', 'features');
const features = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

function updateFile(filePath, enPath) {
    if (!fs.existsSync(filePath) || !fs.existsSync(enPath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    let changedEn = false;
    let changedContent = false;

    // 1. Fix duration
    const durationMatch = content.match(/duration="([^"]+)"/);
    if (durationMatch) {
        const val = durationMatch[1];
        enContent.app_duration = val;
        content = content.replace(/duration="[^"]+"/, `duration={t('app_duration')}`);
        changedEn = true;
        changedContent = true;
    }

    // 2. Fix benefits
    const benefitsMatch = content.match(/benefits=\{\s*\[\s*([\s\S]*?)\s*\]\s*\}/);
    if (benefitsMatch && !benefitsMatch[1].includes('t(')) {
        const arrayContent = benefitsMatch[1];
        const benefitStrings = arrayContent.match(/"([^"]+)"/g);
        if (benefitStrings && benefitStrings.length > 0) {
            const keys = [];
            benefitStrings.forEach((bs, i) => {
                const val = bs.replace(/"/g, '');
                const key = `intro_p${i + 1}`;
                enContent[key] = val;
                keys.push(`t('${key}')`);
                changedEn = true;
            });
            content = content.replace(/benefits=\{\s*\[\s*[\s\S]*?\s*\]\s*\}/, `benefits={[${keys.join(', ')}]}`);
            changedContent = true;
        }
    }

    // 3. Fix app_title / app_description in Premium components ONLY
    const premiumComponents = ['PremiumLayout', 'PremiumIntro', 'PremiumComplete'];
    premiumComponents.forEach(comp => {
        // Handle {t("...", "default")}
        const tRegex = new RegExp(`<${comp}[^>]*?(title|description)=\\{t\\(['"][^'"]+['"](?:,\\s*['"]([^'"]+)['"])?\\)\\}`, 'g');
        content = content.replace(tRegex, (match, prop, defaultValue) => {
            const key = prop === 'title' ? 'app_title' : 'app_description';
            if (defaultValue && !enContent[key]) {
                enContent[key] = defaultValue;
                changedEn = true;
            }
            changedContent = true;
            return match.replace(/t\(['"][^'"]+['"](?:,\s*['"]([^'"]+)['"])?\)/, `t("${key}")`);
        });

        // Handle hardcoded "X"
        const hardcodedRegex = new RegExp(`<${comp}[^>]*?(title|description)="([^"]+)"`, 'g');
        content = content.replace(hardcodedRegex, (match, prop, val) => {
            const key = prop === 'title' ? 'app_title' : 'app_description';
            if (!enContent[key]) {
                enContent[key] = val;
                changedEn = true;
            }
            changedContent = true;
            return match.replace(`${prop}="${val}"`, `${prop}={t("${key}")}`);
        });
    });

    if (changedContent) fs.writeFileSync(filePath, content);
    if (changedEn) fs.writeFileSync(enPath, JSON.stringify(enContent, null, 2));
}

features.forEach(feature => {
    const enPath = path.join(featuresDir, feature, 'i18n', 'en.json');
    if (!fs.existsSync(enPath)) return;

    const componentsDir = path.join(featuresDir, feature);
    function walk(dir) {
        if (!fs.existsSync(dir)) return;
        fs.readdirSync(dir).forEach(f => {
            const full = path.join(dir, f);
            if (fs.statSync(full).isDirectory()) {
                walk(full);
            } else if (f.endsWith('.tsx')) {
                updateFile(full, enPath);
            }
        });
    }
    walk(componentsDir);
});

console.log('Safe standardization and extraction complete.');

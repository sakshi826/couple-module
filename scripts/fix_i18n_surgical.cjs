const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, '..', 'src', 'features');
const features = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

features.forEach(feature => {
    const indexPath = path.join(featuresDir, feature, 'pages', 'Index.tsx');
    const enPath = path.join(featuresDir, feature, 'i18n', 'en.json');
    
    if (!fs.existsSync(indexPath) || !fs.existsSync(enPath)) return;

    let indexContent = fs.readFileSync(indexPath, 'utf8');
    let enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    let changed = false;

    // Very broad match for title corruption: from the first title={t("app_title" until the Reflected/Mindset closing
    const broadCorruptionRegex = /title=\{t\("app_title", "[\s\S]*?title=\{t\("app_title", "[\s\S]*?"\} \}\}/g;
    if (broadCorruptionRegex.test(indexContent)) {
        indexContent = indexContent.replace(broadCorruptionRegex, (match) => {
            // Try to find the actual title string at the very end
            const titleMatch = match.match(/\)\}(.*?)"\} \}\}/);
            const cleanTitle = (titleMatch ? titleMatch[1].trim() : enContent.app_title) || "Wellness Activity";
            return `title={t("app_title", "${cleanTitle}")}`;
        });
        changed = true;
    }

    // Secondary broad match: title={t("app_title", " title=")}
    const secondaryCorruptionRegex = /title=\{t\("app_title", "[\s\S]*?title="\)\}(.*?)"\}/g;
    if (secondaryCorruptionRegex.test(indexContent)) {
        indexContent = indexContent.replace(secondaryCorruptionRegex, (match, title) => {
             const cleanTitle = title.trim() || enContent.app_title || "Wellness Activity";
             return `title={t("app_title", "${cleanTitle}")}`;
        });
        changed = true;
    }

    // Cleanup extra brackets
    if (indexContent.includes('>}>')) {
        indexContent = indexContent.replace(/>\}>/g, '>');
        changed = true;
    }
    if (indexContent.includes('} >')) {
        // This was from my cleanTag repair
        indexContent = indexContent.replace(/\} >/g, '}>');
        changed = true;
    }

    // Ensure useTranslation
    if (indexContent.includes('title={t(') && !indexContent.includes('import { useTranslation }')) {
        indexContent = 'import { useTranslation } from "react-i18next";\n' + indexContent;
        changed = true;
    }

    if (indexContent.includes('title={t(') && !indexContent.includes('const { t } = useTranslation()')) {
        if (indexContent.includes('const Index = () => {')) {
            indexContent = indexContent.replace('const Index = () => {', 'const Index = () => {\n  const { t } = useTranslation();');
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(indexPath, indexContent);
        console.log(`Repaired ${feature}`);
    }
});

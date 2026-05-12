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

    // Source of truth for title
    const appTitle = enContent.app_title || "Wellness Activity";

    // 1. Fix Imports
    if (!indexContent.includes('import { useTranslation }')) {
        indexContent = 'import { useTranslation } from "react-i18next";\n' + indexContent;
        changed = true;
    }
    if (!indexContent.includes('Sparkles') && !indexContent.includes('lucide-react')) {
        // Just in case we need an icon
    }

    // 2. Fix Hook usage
    if (!indexContent.includes('const { t } = useTranslation()')) {
        indexContent = indexContent.replace(/const (\w+) = \(\) => \{/, 'const $1 = () => {\n  const { t } = useTranslation();');
        changed = true;
    }

    // 3. Holistic repair of PremiumLayout / PremiumIntro
    // Regex to find the whole tag start until the first child or self-close
    const layoutRegex = /<(PremiumLayout|PremiumIntro)[\s\S]*?(title=\{t\("app_title"[\s\S]*?)\/?>/;
    if (layoutRegex.test(indexContent)) {
        const match = indexContent.match(layoutRegex);
        const tagName = match[1];
        
        // Reconstruct a clean tag
        let cleanTag = `<${tagName} \n      title={t("app_title", "${appTitle}")}`;
        
        // Try to preserve icon if it was not corrupted, or provide a default
        if (tagName === 'PremiumLayout') {
            if (indexContent.includes('icon={')) {
                 // Check if icon was corrupted (e.g. what_are_your_habits)
                 if (indexContent.includes('icon={<Sparkles')) {
                     cleanTag += `\n      icon={<Sparkles className="w-6 h-6 text-primary" />}`;
                 } else {
                     // Try to find the existing icon if it looks sane
                     const iconMatch = indexContent.match(/icon=\{<([^>]+)\/>\}/);
                     if (iconMatch) {
                         cleanTag += `\n      icon={<${iconMatch[1]}/>}`;
                     } else {
                         cleanTag += `\n      icon={<Sparkles className="w-6 h-6 text-primary" />}`;
                     }
                 }
            } else {
                cleanTag += `\n      icon={<Sparkles className="w-6 h-6 text-primary" />}`;
            }
        }

        // Add closing bracket
        cleanTag += ' >';
        
        // Replace the whole mess
        indexContent = indexContent.replace(layoutRegex, cleanTag);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(indexPath, indexContent);
        console.log(`Repaired ${feature}`);
    }
});

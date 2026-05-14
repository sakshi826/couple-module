import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const featuresDir = path.join(rootDir, 'src', 'features');

const syncCode = `  const { i18n: globalI18n } = useTranslation();
  
  React.useEffect(() => {
    if (globalI18n.language && globalI18n.language !== i18n.language) {
      i18n.changeLanguage(globalI18n.language);
    }
  }, [globalI18n.language]);

  const { t } = useTranslation();`;

const features = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

for (const feature of features) {
    const indexPath = path.join(featuresDir, feature, 'index.tsx');
    if (!fs.existsSync(indexPath)) continue;

    let content = fs.readFileSync(indexPath, 'utf8');
    
    // Check if already injected
    if (content.includes('globalI18n.language')) continue;

    // Check if it has useTranslation and i18n import
    if (!content.includes('useTranslation') || !content.includes('import i18n')) continue;

    console.log(`Injecting sync logic into ${feature}...`);

    // Replace the simple useTranslation call with the sync logic
    content = content.replace(/const\s+\{\s*t\s*\}\s*=\s*useTranslation\(\);/g, syncCode);

    // Ensure React is imported if we use React.useEffect
    if (!content.includes('import React')) {
        content = 'import React from "react";\n' + content;
    }

    fs.writeFileSync(indexPath, content);
}

console.log('Done.');

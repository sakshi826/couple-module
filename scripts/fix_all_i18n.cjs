const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, '..', 'src', 'features');
const features = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

console.log(`Processing ${features.length} features...`);

features.forEach(feature => {
    const i18nPath = path.join(featuresDir, feature, 'i18n.ts');
    const indexPath = path.join(featuresDir, feature, 'index.tsx');

    // 1. Fix i18n.ts
    const i18nContent = `import { createI18nInstance } from '../../lib/i18n';
const locales = import.meta.glob('./i18n/*.json', { eager: true });

const instance = createI18nInstance(locales);

export default instance;

export { SUPPORTED_LANGUAGES } from '../../lib/i18n-config';
`;
    fs.writeFileSync(i18nPath, i18nContent);

    // 2. Fix index.tsx
    if (fs.existsSync(indexPath)) {
        let indexContent = fs.readFileSync(indexPath, 'utf8');
        
        // Add imports if missing
        if (!indexContent.includes("import { I18nextProvider }")) {
            indexContent = `import { I18nextProvider } from 'react-i18next';\nimport i18n from './i18n';\nimport { Suspense } from 'react';\n` + indexContent;
        } else if (!indexContent.includes("import i18n from './i18n'")) {
            indexContent = `import i18n from './i18n';\n` + indexContent;
        }

        // Wrap with I18nextProvider and Suspense
        if (!indexContent.includes("<I18nextProvider")) {
            // Handle const App = () => (...)
            const arrowMatch = indexContent.match(/const\s+App\s*=\s*\(\)\s*=>\s*\(([\s\S]*)\);/);
            if (arrowMatch) {
                const inner = arrowMatch[1];
                const wrapped = `const App = () => (
  <I18nextProvider i18n={i18n}>
    <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
      ${inner.trim()}
    </Suspense>
  </I18nextProvider>
);`;
                indexContent = indexContent.replace(/const\s+App\s*=\s*\(\)\s*=>\s*\([\s\S]*\);/, wrapped);
            } else {
                // Handle return (...)
                const wrapMatch = indexContent.match(/return\s*\(([\s\S]*)\);/);
                if (wrapMatch) {
                    const inner = wrapMatch[1];
                    const wrapped = `return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
        ${inner.trim()}
      </Suspense>
    </I18nextProvider>
  );`;
                    indexContent = indexContent.replace(/return\s*\([\s\S]*\);/, wrapped);
                }
            }
        }
        
        fs.writeFileSync(indexPath, indexContent);
    }
});

console.log('Done!');

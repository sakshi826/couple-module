const fs = require('fs');
const path = require('path');

const supported = ['en', 'hi', 'ur', 'es', 'fr', 'de', 'pt', 'ru', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'ar', 'bn', 'id', 'tr', 'vi', 'it', 'pl', 'th', 'tl', 'nl', 'sv', 'no', 'da', 'fi', 'cs', 'el', 'ro', 'hu', 'uk', 'he', 'ms', 'ta', 'te'];

const featuresDir = path.join(process.cwd(), 'src', 'features');
const features = fs.readdirSync(featuresDir);

console.log('--- Feature Audit ---');
features.forEach(f => {
  const i18nPath = path.join(featuresDir, f, 'i18n');
  if (fs.existsSync(i18nPath)) {
    const existing = fs.readdirSync(i18nPath).map(file => file.replace('.json', ''));
    const missing = supported.filter(lang => !existing.includes(lang));
    if (missing.length > 0) {
      console.log(`${f}: Missing ${missing.join(', ')}`);
    }
  }
});

const appI18nPath = path.join(process.cwd(), 'src', 'app', 'i18n');
const appExisting = fs.readdirSync(appI18nPath).map(file => file.replace('.json', ''));
const appMissing = supported.filter(lang => !appExisting.includes(lang));
console.log('\n--- App Hub Audit ---');
if (appMissing.length > 0) {
  console.log(`Hub: Missing ${appMissing.join(', ')}`);
} else {
  console.log('Hub: All 35 languages present.');
}

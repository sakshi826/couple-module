import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const guidedJsonPath = path.join(rootDir, 'src', 'app', 'data', 'guidedSeries.json');
const enJsonPath = path.join(rootDir, 'src', 'app', 'i18n', 'en.json');

const guidedData = JSON.parse(fs.readFileSync(guidedJsonPath, 'utf8'));
const enContent = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

if (!enContent.guided_series) enContent.guided_series = {};

const strings = new Set();
Object.values(guidedData).forEach(concern => {
    concern.categories.forEach(cat => {
        strings.add(cat.name);
        cat.activities.forEach(act => {
            strings.add(act.name);
            if (act.description) strings.add(act.description);
        });
    });
});

strings.forEach(str => {
    // We use the string itself as the key to make it easier for t() to find it
    // i18next handles spaces and dots if configured correctly, but here we just want to ensure they exist in en.json
    if (!enContent.guided_series[str]) {
        enContent.guided_series[str] = str;
    }
});

fs.writeFileSync(enJsonPath, JSON.stringify(enContent, null, 2));
console.log(`Added ${strings.size} guided series strings to en.json`);

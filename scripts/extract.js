import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const moduleName = process.argv[2];

if (!moduleName) {
  console.log('Usage: node scripts/extract.js <module_name>');
  process.exit(1);
}

const modulePath = path.join('src', 'features', moduleName);
if (!fs.existsSync(modulePath)) {
  console.error(`Error: Module ${moduleName} not found at ${modulePath}`);
  process.exit(1);
}

// Create i18n directory if it doesn't exist
const i18nDir = path.join(modulePath, 'i18n');
if (!fs.existsSync(i18nDir)) {
  fs.mkdirSync(i18nDir, { recursive: true });
}

console.log(`Extracting strings for module: ${moduleName}...`);

try {
  // We use npx to run i18next-parser
  // We point it to the module's files and set the output to the module's i18n folder
  const command = `npx i18next-parser "${modulePath}/**/*.{ts,tsx}" --output "${modulePath}/i18n/$LOCALE.json" --config i18next-parser.config.js --fail-on-warnings`;
  
  execSync(command, { stdio: 'inherit' });
  
  console.log(`Extraction complete. Check ${modulePath}/i18n/en.json`);
} catch (error) {
  console.error('Extraction failed:', error.message);
  process.exit(1);
}

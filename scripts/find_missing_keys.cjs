const fs = require('fs');
const path = require('path');

const keys = new Set();
const i18nDir = path.join(process.cwd(), 'src', 'app', 'i18n');
const enPath = path.join(i18nDir, 'en.json');
const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));

function flatten(obj, prefix = '') {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      Object.assign(result, flatten(value, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

const flattenedEn = flatten(enContent);

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
        walk(fullPath);
      }
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.matchAll(/t\(['"]([^'"]+)['"]/g);
      for (const match of matches) {
        const key = match[1];
        if (!flattenedEn[key] && (key.startsWith('hub.') || key.startsWith('topics.') || key.startsWith('tools.') || key.startsWith('exercises.') || key.startsWith('trackers.'))) {
          keys.add(key);
        }
      }
    }
  }
}

walk(path.join(process.cwd(), 'src'));

console.log('Missing Hub-related keys in en.json:');
console.log(JSON.stringify(Array.from(keys).sort(), null, 2));

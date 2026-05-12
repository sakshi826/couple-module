const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, '..', 'src', 'features');
const features = fs.readdirSync(featuresDir);

const standardKeys = [
  'app_title',
  'common.get_started',
  'common.start_over',
  'common.finish_exit',
  'common.well_done',
  'common.completion_message',
  'common.time_to_complete',
  'common.back',
  'common.next',
  'common.save',
  'common.loading'
];

function getNestedKey(obj, keyPath) {
  return keyPath.split('.').reduce((acc, part) => acc && acc[part], obj);
}

console.log('Auditing features for missing standard keys in en.json...');

features.forEach(feature => {
  const enPath = path.join(featuresDir, feature, 'i18n', 'en.json');
  if (fs.existsSync(enPath)) {
    try {
      const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
      const missing = standardKeys.filter(k => !getNestedKey(en, k));
      if (missing.length > 0) {
        console.log(`Feature [${feature}] missing: ${missing.join(', ')}`);
      }
    } catch (e) {
      console.log(`Feature [${feature}] has malformed en.json`);
    }
  } else {
    // Check if it has an i18n directory
    if (fs.existsSync(path.join(featuresDir, feature, 'i18n'))) {
        console.log(`Feature [${feature}] missing en.json but has i18n dir`);
    }
  }
});

const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, '..', 'src', 'features');
const features = fs.readdirSync(featuresDir);

const standardCommon = {
  "get_started": "Get Started",
  "start_over": "Start Over",
  "finish_exit": "Finish & Exit",
  "well_done": "Well Done!",
  "completion_message": "You've successfully completed this activity. Take a moment to appreciate your progress.",
  "time_to_complete": "Time to complete",
  "back": "Back",
  "next": "Next",
  "save": "Save",
  "loading": "Loading..."
};

function formatTitle(folderName) {
  return folderName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

features.forEach(feature => {
  const i18nDir = path.join(featuresDir, feature, 'i18n');
  if (!fs.existsSync(i18nDir)) return;

  const enPath = path.join(i18nDir, 'en.json');
  let en = {};
  if (fs.existsSync(enPath)) {
    try {
      en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    } catch (e) {
      console.error(`Error parsing ${enPath}`);
      return;
    }
  }

  let modified = false;

  if (!en.app_title) {
    en.app_title = formatTitle(feature);
    modified = true;
  }

  if (!en.app_description) {
    en.app_description = en.intro?.subtitle || en.app_title;
    modified = true;
  }

  if (!en.common) {
    en.common = { ...standardCommon };
    modified = true;
  } else {
    for (const key in standardCommon) {
      if (!en.common[key]) {
        en.common[key] = standardCommon[key];
        modified = true;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
    console.log(`Updated [${feature}] en.json`);
  }
});

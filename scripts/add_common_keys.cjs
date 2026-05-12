const fs = require('fs');
const path = require('path');

const commonKeys = {
  common: {
    get_started: "Get Started",
    start_over: "Start Over",
    finish_exit: "Finish & Exit",
    well_done: "Well Done!",
    completion_message: "You've successfully completed this activity. Take a moment to appreciate your progress.",
    time_to_complete: "Time to complete",
    back: "Back",
    next: "Next",
    save: "Save",
    loading: "Loading..."
  }
};

const featuresDir = path.join(__dirname, '..', 'src', 'features');
const features = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

features.forEach(feature => {
    const enPath = path.join(featuresDir, feature, 'i18n', 'en.json');
    if (fs.existsSync(enPath)) {
        let content = JSON.parse(fs.readFileSync(enPath, 'utf8'));
        // Merge common keys
        content = { ...content, ...commonKeys };
        fs.writeFileSync(enPath, JSON.stringify(content, null, 2));
    }
});

// Also add to hub
const hubEnPath = path.join(__dirname, '..', 'src', 'app', 'i18n', 'en.json');
if (fs.existsSync(hubEnPath)) {
    let content = JSON.parse(fs.readFileSync(hubEnPath, 'utf8'));
    content = { ...content, ...commonKeys };
    fs.writeFileSync(hubEnPath, JSON.stringify(content, null, 2));
}

console.log('Added common keys to all en.json files.');

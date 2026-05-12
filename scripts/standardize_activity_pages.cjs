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

    // 1. Standardize PremiumIntro
    const introTitleMatch = indexContent.match(/<PremiumIntro[^>]*title="([^"]+)"/);
    if (introTitleMatch) {
        const originalTitle = introTitleMatch[1];
        if (!enContent.app_title) {
            enContent.app_title = originalTitle;
            changed = true;
        }
        indexContent = indexContent.replace(/(<PremiumIntro[^>]*title=)"[^"]+"/, `$1{t("app_title", "${originalTitle}")}`);
    }

    const introDescMatch = indexContent.match(/<PremiumIntro[^>]*description="([^"]+)"/);
    if (introDescMatch) {
        const originalDesc = introDescMatch[1];
        if (!enContent.app_description) {
            enContent.app_description = originalDesc;
            changed = true;
        }
        indexContent = indexContent.replace(/(<PremiumIntro[^>]*description=)"[^"]+"/, `$1{t("app_description", "${originalDesc}")}`);
    }

    const introDurMatch = indexContent.match(/<PremiumIntro[^>]*duration="([^"]+)"/);
    if (introDurMatch) {
        const originalDur = introDurMatch[1];
        if (!enContent.app_duration) {
            enContent.app_duration = originalDur;
            changed = true;
        }
        indexContent = indexContent.replace(/(<PremiumIntro[^>]*duration=)"[^"]+"/, `$1{t("app_duration", "${originalDur}")}`);
    }

    // 2. Standardize PremiumComplete
    const completeTitleMatch = indexContent.match(/<PremiumComplete[^>]*title="([^"]+)"/);
    if (completeTitleMatch) {
        const originalCompleteTitle = completeTitleMatch[1];
        if (!enContent.app_complete_title) {
            enContent.app_complete_title = originalCompleteTitle;
            changed = true;
        }
        indexContent = indexContent.replace(/(<PremiumComplete[^>]*title=)"[^"]+"/, `$1{t("app_complete_title", "${originalCompleteTitle}")}`);
    }

    const completeMsgMatch = indexContent.match(/<PremiumComplete[^>]*message="([^"]+)"/);
    if (completeMsgMatch) {
        const originalCompleteMsg = completeMsgMatch[1];
        if (!enContent.app_complete_message) {
            enContent.app_complete_message = originalCompleteMsg;
            changed = true;
        }
        indexContent = indexContent.replace(/(<PremiumComplete[^>]*message=)"[^"]+"/, `$1{t("app_complete_message", "${originalCompleteMsg}")}`);
    }

    // 3. Standardize PremiumLayout
    const layoutTitleMatch = indexContent.match(/<PremiumLayout[^>]*title="([^"]+)"/);
    if (layoutTitleMatch) {
        const originalLayoutTitle = layoutTitleMatch[1];
        indexContent = indexContent.replace(/(<PremiumLayout[^>]*title=)"[^"]+"/, `$1{t("app_title", "${originalLayoutTitle}")}`);
    }

    // Save changes
    fs.writeFileSync(indexPath, indexContent);
    if (changed) {
        fs.writeFileSync(enPath, JSON.stringify(enContent, null, 2));
    }
});

console.log('Standardized activity pages and updated en.json files safely.');

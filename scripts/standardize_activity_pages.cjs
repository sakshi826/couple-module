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

    // 1. Standardize PremiumIntro
    // Find title="...", description="..." or description={t("...")}, duration="..."
    
    // Extract hardcoded values to en.json if possible
    const titleMatch = indexContent.match(/<PremiumIntro[^>]*title="([^"]+)"/);
    if (titleMatch && !enContent.app_title) {
        enContent.app_title = titleMatch[1];
        indexContent = indexContent.replace(/title="[^"]+"/, 'title={t("app_title")}');
    } else if (indexContent.includes('<PremiumIntro')) {
        // Just ensure it uses t if not already
        if (!indexContent.includes('title={t(')) {
             indexContent = indexContent.replace(/title="([^"]+)"/, 'title={t("app_title", "$1")}');
        }
    }

    const descMatch = indexContent.match(/<PremiumIntro[^>]*description="([^"]+)"/);
    if (descMatch && !enContent.app_description) {
        enContent.app_description = descMatch[1];
        indexContent = indexContent.replace(/description="[^"]+"/, 'description={t("app_description")}');
    }

    const durMatch = indexContent.match(/<PremiumIntro[^>]*duration="([^"]+)"/);
    if (durMatch && !enContent.app_duration) {
        enContent.app_duration = durMatch[1];
        indexContent = indexContent.replace(/duration="[^"]+"/, 'duration={t("app_duration")}');
    }

    // 2. Standardize PremiumComplete
    const completeTitleMatch = indexContent.match(/<PremiumComplete[^>]*title="([^"]+)"/);
    if (completeTitleMatch && !enContent.app_complete_title) {
        enContent.app_complete_title = completeTitleMatch[1];
        indexContent = indexContent.replace(/<PremiumComplete([^>]*title=)"[^"]+"/, '<PremiumComplete$1{t("app_complete_title")}');
    }

    const completeMsgMatch = indexContent.match(/<PremiumComplete[^>]*message="([^"]+)"/);
    if (completeMsgMatch && !enContent.app_complete_message) {
        enContent.app_complete_message = completeMsgMatch[1];
        indexContent = indexContent.replace(/<PremiumComplete([^>]*message=)"[^"]+"/, '<PremiumComplete$1{t("app_complete_message")}');
    }

    // 3. Standardize PremiumLayout title
    const layoutTitleMatch = indexContent.match(/<PremiumLayout[^>]*title="([^"]+)"/);
    if (layoutTitleMatch) {
        indexContent = indexContent.replace(/<PremiumLayout([^>]*title=)"[^"]+"/, '<PremiumLayout$1{t("app_title", "$1")}');
    }

    // Save changes
    fs.writeFileSync(indexPath, indexContent);
    fs.writeFileSync(enPath, JSON.stringify(enContent, null, 2));
});

console.log('Standardized activity pages and updated en.json files.');

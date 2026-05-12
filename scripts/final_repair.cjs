const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, '..', 'src', 'features');
const features = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

features.forEach(feature => {
    const indexPath = path.join(featuresDir, feature, 'pages', 'Index.tsx');
    if (!fs.existsSync(indexPath)) return;

    let content = fs.readFileSync(indexPath, 'utf8');
    let changed = false;

    // Pattern: title={t("app_title", " ... title={t("app_title", ")}Reflecting")} })}
    // We want to replace the whole block from the first title={t("app_title", " until the last })}
    const corruptedBlockRegex = /title=\{t\("app_title", "[\s\S]*?title=\{t\("app_title", "\)\}(.*?)"\} (.*?)\}\}/g;
    
    if (corruptedBlockRegex.test(content)) {
        content = content.replace(corruptedBlockRegex, (match, title, rest) => {
            const cleanTitle = title.trim() || "Wellness Activity";
            return `title={t("app_title", "${cleanTitle}")}`;
        });
        changed = true;
    }

    // Secondary pattern for simpler corruption
    const secondaryRegex = /title=\{t\("app_title", "[\s\S]*?title=\{t\("app_title", ".*?"\)\}/g;
    if (secondaryRegex.test(content)) {
         // Fix it manually or leave for manual review if too complex
    }

    // Final cleanup of extra brackets
    if (content.includes('>}>')) {
        content = content.replace(/>\}>/g, '>');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(indexPath, content);
        console.log(`Repaired ${feature}`);
    }
});

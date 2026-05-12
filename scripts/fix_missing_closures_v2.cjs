const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, '..', 'src', 'features');
const features = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

features.forEach(feature => {
    const indexPath = path.join(featuresDir, feature, 'pages', 'Index.tsx');
    if (!fs.existsSync(indexPath)) return;

    let content = fs.readFileSync(indexPath, 'utf8');
    
    // Regex to find PremiumLayout with icon but missing closure
    // Look for <PremiumLayout ... icon={<Icon ... />} but NO >
    // Or <PremiumLayout ... icon={<Icon ... /> but NO } >
    const corruptedRegex = /<PremiumLayout[\s\S]*?icon=\{<[A-Z][a-zA-Z]*[\s\S]*?\/>\s*\n/g;
    
    let changed = false;
    if (corruptedRegex.test(content)) {
        content = content.replace(corruptedRegex, (match) => {
            if (match.includes('}>')) return match; // Already fixed
            changed = true;
            console.log(`Fixing ${feature}`);
            return match.trimEnd() + '}>\n';
        });
    }

    if (changed) {
        fs.writeFileSync(indexPath, content);
    }
});

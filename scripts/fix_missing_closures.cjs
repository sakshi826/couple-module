const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, '..', 'src', 'features');
const features = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

features.forEach(feature => {
    const indexPath = path.join(featuresDir, feature, 'pages', 'Index.tsx');
    if (!fs.existsSync(indexPath)) return;

    let content = fs.readFileSync(indexPath, 'utf8');
    let lines = content.split('\n');
    let changed = false;

    for (let i = 0; i < lines.length; i++) {
        // If a line has PremiumLayout and an icon but doesn't close the tag
        if (lines[i].includes('<PremiumLayout') && lines[i].includes('icon={<') && lines[i].includes('/>') && !lines[i].trim().endsWith('>')) {
            lines[i] = lines[i].trimEnd() + '}>';
            changed = true;
            console.log(`Fixed closure in ${feature} at line ${i + 1}`);
        }
    }

    if (changed) {
        fs.writeFileSync(indexPath, lines.join('\n'));
    }
});

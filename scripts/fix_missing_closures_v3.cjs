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
        const line = lines[i];
        // If line contains PremiumLayout AND an icon tag AND ends with /> (missing closure)
        if (line.includes('PremiumLayout') && line.includes('icon={<') && line.trim().endsWith('/>')) {
            lines[i] = line + '}>';
            changed = true;
            console.log(`Fixed ${feature} line ${i + 1}`);
        }
    }

    if (changed) {
        fs.writeFileSync(indexPath, lines.join('\n'));
    }
});

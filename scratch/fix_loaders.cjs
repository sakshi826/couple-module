const fs = require('fs');
const path = require('path');

function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else if (file.endsWith('index.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = getFiles('src/features');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const target = '<Suspense fallback={<div className="flex items-center justify-center h-full">{(typeof t !== "undefined" ? t : (k) => k)("common.loading")}</div>}>';
    if (content.includes(target)) {
        console.log(`Replacing in ${file}`);
        content = content.replace(target, '<Suspense fallback={null}>');
        fs.writeFileSync(file, content);
    }
});

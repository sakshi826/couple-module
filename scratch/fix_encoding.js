import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = 'd:/Downloads/Therapy Merged';

const urduTranslations = {
    '"yes": "?? ???"': '"yes": "جی ہاں"',
    '"no": "????"': '"no": "نہیں"',
    '"date": "??????"': '"date": "تاریخ"',
    '"continue": "???? ?????"': '"continue": "جاری رکھیں"',
    // Also catch variants with fewer question marks if any
    '"yes": "??"': '"yes": "جی ہاں"',
    '"no": "??"': '"no": "نہیں"',
    '"date": "???"': '"date": "تاریخ"',
    '"continue": "???"': '"continue": "جاری رکھیں"'
};

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file === 'ur.json') {
            console.log(`Processing ${fullPath}`);
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            
            // Direct replacement of the broken question mark strings
            // We'll use a more robust regex-based approach for the common keys
            const yesRegex = /"yes":\s*"[^"]*\?\?[^"]*"/g;
            const noRegex = /"no":\s*"[^"]*\?\?[^"]*"/g;
            const dateRegex = /"date":\s*"[^"]*\?\?[^"]*"/g;
            const continueRegex = /"continue":\s*"[^"]*\?\?[^"]*"/g;

            if (content.match(yesRegex)) { content = content.replace(yesRegex, '"yes": "جی ہاں"'); changed = true; }
            if (content.match(noRegex)) { content = content.replace(noRegex, '"no": "نہیں"'); changed = true; }
            if (content.match(dateRegex)) { content = content.replace(dateRegex, '"date": "تاریخ"'); changed = true; }
            if (content.match(continueRegex)) { content = content.replace(continueRegex, '"continue": "جاری رکھیں"'); changed = true; }

            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Fixed encoding in ${fullPath}`);
            }
        }
    }
}

walk(path.join(rootDir, 'src/features'));
walk(path.join(rootDir, 'src/app/i18n'));

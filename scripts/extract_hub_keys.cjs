const fs = require('fs');
const content = fs.readFileSync('src/app/components/SelfCareResources.tsx', 'utf8');
const matches = content.matchAll(/['"]((?:hub|topics|tools|exercises|trackers)\.[^'"]+)['"]/g);
const keys = new Set();
for (const m of matches) {
  keys.add(m[1]);
}
console.log(JSON.stringify(Array.from(keys).sort(), null, 2));

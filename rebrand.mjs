import fs from 'fs';
import path from 'path';

const replacements = [
  ['#1B4332', '#5D2E0F'],
  ['#2D6A4F', '#F58220'],
  ['#6B9080', '#A0845C'],
  ['#A8D5BA', '#F5C088'],
  ['#E8F5EC', '#FFF3E6'],
  ['#E0EDE6', '#F0DCC8'],
  ['#F0F7F3', '#FAF0E6'],
  ['#F8FAF9', '#FFFAF5'],
  ['#FAFCFB', '#FFFCF8'],
  ['#DCFCE7', '#FFEDD5'],
  ['#166534', '#9A3412'],
];

function walk(dir) {
  let results = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && f !== 'node_modules' && f !== '.git') {
      results = results.concat(walk(full));
    } else if (/\.(tsx?|css)$/.test(f)) {
      results.push(full);
    }
  }
  return results;
}

const srcDir = path.resolve('src');
const files = walk(srcDir);
let updated = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  const original = content;
  for (const [from, to] of replacements) {
    content = content.replaceAll(from, to);
  }
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    updated++;
    console.log('Updated:', path.relative(srcDir, file));
  }
}
console.log(`\nTotal files updated: ${updated}`);

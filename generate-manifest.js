#!/usr/bin/env node
/**
 * generate-manifest.js
 * يُشغَّل تلقائياً عند كل نشر على Netlify
 * يقرأ جميع ملفات _content/lessons/*.md ويولّد public/lessons-manifest.json
 * بحيث يقرأها الموقع بـ fetch() ويعرضها تلقائياً
 */

const fs   = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '_content', 'lessons');
const OUTPUT_DIR  = path.join(__dirname, 'public');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'lessons-manifest.json');

// Ensure output dir exists
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Parse frontmatter from markdown file
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  match[1].split('\n').forEach(line => {
    const [key, ...val] = line.split(':');
    if (key && val.length) {
      fm[key.trim()] = val.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });
  return fm;
}

// Read all lesson files
let lessons = [];
if (fs.existsSync(CONTENT_DIR)) {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md') && f !== 'exemple.md');
  lessons = files.map(file => {
    const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const fm = parseFrontmatter(content);
    return {
      id:       file.replace('.md', ''),
      title:    fm.title    || 'بدون عنوان',
      level:    fm.level    || '1',
      stream:   fm.stream   || 'all',
      type:     fm.type     || 'cours',
      file:     fm.file     || '',
      unit:     fm.unit     || '',
      pages:    fm.pages    || null,
      year:     fm.year     || '2025',
      notes:    fm.notes    || '',
      featured: fm.featured === 'true',
    };
  }).filter(l => l.file); // only include files that have a file path
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(lessons, null, 2), 'utf8');
console.log(`✅ manifest generated: ${lessons.length} lessons → ${OUTPUT_FILE}`);

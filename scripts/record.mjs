#!/usr/bin/env node
// Записывает новую итерацию в test-reports/manifest.json и снимает скриншоты.
// Usage: node scripts/record.mjs "description" [ICECAT-NNN]
//   ENV: NO_SHOTS=1 — пропустить Playwright (быстрый режим, только manifest).

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const MANIFEST = resolve(ROOT, 'test-reports/manifest.json');

const description = process.argv[2];
const linearRaw = process.argv[3];
if (!description) {
  console.error(
    'Usage: node scripts/record.mjs "description" [ICECAT-123,ICECAT-124]',
  );
  process.exit(1);
}
const linearIds = linearRaw
  ? linearRaw.split(',').map((s) => s.trim()).filter(Boolean)
  : [];

function gitInfo() {
  try {
    const sha = execSync('git rev-parse HEAD', { cwd: ROOT }).toString().trim();
    const short = execSync('git rev-parse --short HEAD', { cwd: ROOT })
      .toString()
      .trim();
    const msg = execSync('git log -1 --pretty=%s', { cwd: ROOT })
      .toString()
      .trim();
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: ROOT })
      .toString()
      .trim();
    return { sha, short, msg, branch };
  } catch {
    return { sha: null, short: null, msg: null, branch: null };
  }
}

function loadManifest() {
  if (!existsSync(MANIFEST)) {
    return { entries: [] };
  }
  try {
    return JSON.parse(readFileSync(MANIFEST, 'utf-8'));
  } catch {
    return { entries: [] };
  }
}

function makeId() {
  // YYYYMMDD-HHMMSS-<short-sha-or-0000>
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const stamp = `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(
    d.getUTCDate(),
  )}-${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}`;
  const { short } = gitInfo();
  return `${stamp}-${short ?? '0000000'}`;
}

const id = makeId();
const git = gitInfo();

let shots = [];
if (!process.env.NO_SHOTS) {
  console.error(`→ capturing screenshots for ${id}`);
  try {
    const raw = execSync(`node scripts/capture.mjs ${id}`, {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'inherit'],
    }).toString();
    shots = JSON.parse(raw);
  } catch (err) {
    console.error('Capture failed:', err.message);
    shots = [];
  }
} else {
  console.error('→ NO_SHOTS=1, skipping capture');
}

const manifest = loadManifest();
manifest.entries ||= [];

const entry = {
  id,
  createdAt: new Date().toISOString(),
  description,
  linearIds,
  git,
  shots,
};

manifest.entries.unshift(entry);
if (!existsSync(resolve(ROOT, 'test-reports'))) {
  mkdirSync(resolve(ROOT, 'test-reports'), { recursive: true });
}
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.error(`✓ recorded ${id} (${shots.length} shots)`);
console.log(id);

#!/usr/bin/env node
/**
 * Publishes this repo's committed state to the `frontend/` subdirectory of the
 * deployment repo, which Vercel builds (project: rajesh-jewellers, root directory:
 * frontend). Pushing there is what triggers a deploy.
 *
 * This repo and the deployment repo are separate: the storefront lives at the root
 * here but under `frontend/` there, so a plain `git push` can't be used. The script
 * keeps a clone of the deployment repo outside the project, mirrors every tracked
 * file into it, then commits and pushes.
 *
 * Usage:
 *   npm run deploy
 *   npm run deploy -- "custom commit message"
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, copyFileSync, rmSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEPLOY_REPO = 'https://github.com/raunitseth234/MY-Personal-Project.git';
const DEPLOY_BRANCH = 'master';
const SUBDIR = 'frontend';
const LIVE_URL = 'https://rajeshjewellers.vercel.app';

const SOURCE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIRROR = process.env.DEPLOY_MIRROR || path.join(homedir(), '.rajesh-deploy-mirror');

function git(args, cwd, { capture = false } = {}) {
  return execFileSync('git', args, {
    cwd,
    encoding: 'utf8',
    stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
  });
}

function gitOut(args, cwd) {
  return git(args, cwd, { capture: true }).trim();
}

function fail(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

// ─────────── 1. Source repo must be committed ───────────
// Only tracked files at HEAD get published, so uncommitted work would silently
// not ship. Better to stop than to deploy something that isn't what's on screen.
const dirty = gitOut(['status', '--porcelain'], SOURCE);
if (dirty) {
  fail(
    `You have uncommitted changes. Commit them first, then run this again:\n\n` +
      `    git add -A && git commit -m "your message"\n\n` +
      `Uncommitted files:\n${dirty}`
  );
}

const sourceSha = gitOut(['rev-parse', '--short', 'HEAD'], SOURCE);
const sourceSubject = gitOut(['log', '-1', '--pretty=%s'], SOURCE);
const message = process.argv[2] || sourceSubject;

// ─────────── 2. Get the deployment repo ready ───────────
const mirrorIsUsable =
  existsSync(path.join(MIRROR, '.git')) &&
  (() => {
    try {
      return gitOut(['remote', 'get-url', 'origin'], MIRROR).includes('MY-Personal-Project');
    } catch {
      return false;
    }
  })();

if (!mirrorIsUsable) {
  console.log(`→ Cloning deployment repo into ${MIRROR} (one time only)`);
  rmSync(MIRROR, { recursive: true, force: true });
  git(['clone', '--branch', DEPLOY_BRANCH, DEPLOY_REPO, MIRROR], process.cwd());
} else {
  console.log('→ Updating deployment repo');
  git(['checkout', DEPLOY_BRANCH], MIRROR);
  git(['pull', '--ff-only', 'origin', DEPLOY_BRANCH], MIRROR);
}

// ─────────── 3. Mirror every tracked file into frontend/ ───────────
// Wiping the directory first is what makes deletions and renames propagate.
const target = path.join(MIRROR, SUBDIR);
rmSync(target, { recursive: true, force: true });

const files = gitOut(['ls-files', '-z'], SOURCE).split('\0').filter(Boolean);
for (const rel of files) {
  const dest = path.join(target, rel);
  mkdirSync(path.dirname(dest), { recursive: true });
  copyFileSync(path.join(SOURCE, rel), dest);
}
console.log(`→ Copied ${files.length} tracked files`);

// ─────────── 4. Commit and push ───────────
git(['add', '-A', SUBDIR], MIRROR);

const staged = gitOut(['diff', '--cached', '--name-only'], MIRROR);
if (!staged) {
  console.log(`\n✓ Nothing changed — the live site already matches ${sourceSha}.\n`);
  process.exit(0);
}

const changedCount = staged.split('\n').length;
git(['commit', '-m', `${message}\n\nSource: ${sourceSha}`], MIRROR);
git(['push', 'origin', DEPLOY_BRANCH], MIRROR);

console.log(
  `\n✓ Pushed ${changedCount} changed file(s). Vercel is building now — live in 1-3 min:\n` +
    `  ${LIVE_URL}\n\n` +
    `  Build status: https://vercel.com/2k22aiml2212979-1621s-projects/rajesh-jewellers/deployments\n`
);

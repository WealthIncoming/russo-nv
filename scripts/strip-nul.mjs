// Post-build clean-up: the static HTML output occasionally contains a stray NUL byte where a
// streamed chunk boundary lands right before a multi-byte character (seen in production on
// /insights/corrosion-protection-iso-12944 before 11/2026). Browsers drop it in text and turn it
// into U+FFFD in attributes, so remove every NUL from the built HTML. Nothing else is touched.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2] ?? 'dist';
let files = 0;
let removed = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) {
      const buf = readFileSync(p);
      const n = buf.reduce((acc, b) => acc + (b === 0 ? 1 : 0), 0);
      if (n) {
        writeFileSync(p, buf.filter((b) => b !== 0));
        files += 1;
        removed += n;
      }
    }
  }
}

walk(root);
console.log(`strip-nul: removed ${removed} NUL byte(s) from ${files} HTML file(s)`);

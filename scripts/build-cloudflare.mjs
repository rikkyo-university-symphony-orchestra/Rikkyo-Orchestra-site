import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
const rootAssets = ['styles.css', 'script.js', 'common-layout.js', 'scrolltrigger.min.js'];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const rootFiles = await readdir(root);
const htmlFiles = rootFiles.filter((file) => file.endsWith('.html'));

await Promise.all([
  ...htmlFiles.map((file) => cp(path.join(root, file), path.join(output, file))),
  ...rootAssets.map((file) => cp(path.join(root, file), path.join(output, file))),
  cp(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true }),
]);

console.log(`Prepared ${htmlFiles.length} HTML files and static assets in dist/.`);

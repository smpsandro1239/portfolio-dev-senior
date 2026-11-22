import { cp, mkdir, rm, access, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { basename, join } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const source = join(root, 'src');
const output = join(root, 'docs');
const npmExec = process.platform === 'win32' ? 'npx.cmd' : 'npx';

function run(command, args) {
  execFileSync(command, args, { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function build() {
  await rm(output, { recursive: true, force: true });
  await mkdir(join(output, 'css'), { recursive: true });
  await mkdir(join(output, 'js'), { recursive: true });

  await cp(join(source, 'index.html'), join(output, 'index.html'));
  run(npmExec, ['csso-cli', join(source, 'css', 'main.css'), '-o', join(output, 'css', 'main.css')]);

  const jsDirectory = join(source, 'js');
  const { readdir } = await import('node:fs/promises');
  const jsFiles = (await readdir(jsDirectory)).filter(file => file.endsWith('.js')).sort();

  for (const file of jsFiles) {
    run(npmExec, [
      'terser',
      join(jsDirectory, file),
      '--compress',
      '--mangle',
      '--module',
      '--output',
      join(output, 'js', basename(file))
    ]);
  }

  for (const asset of ['manifest.json', 'sw.js']) {
    await cp(join(source, asset), join(output, asset));
  }

  const images = join(source, 'img');
  if (await exists(images)) {
    await cp(images, join(output, 'img'), { recursive: true });
  }

  await writeFile(join(output, '.nojekyll'), '');
  console.log('Build concluído: assets de produção gerados em ./docs');
}

build().catch(error => {
  console.error('Falha ao construir o portefólio:', error);
  process.exitCode = 1;
});

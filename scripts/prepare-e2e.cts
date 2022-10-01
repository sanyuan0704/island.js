import path from 'path';
import fse from 'fs-extra';
import * as execa from 'execa';
import prettier from 'prettier';

const prepareCommands = [
  'npm init -y',
  'git init',
  'npm i islandjs --registry https://registry.npmmirror.com/ -D --ignore-scripts',
  'git add .',
  'git commit -m "init"'
];

const tempDir = path.resolve(__dirname, '../.temp/e2e_temp_dir');
const defaultExecaOpts = {
  cwd: tempDir,
  stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr
};

async function prepareE2E() {
  await fse.ensureDir(tempDir);

  // add sample file
  fse.writeFileSync(path.resolve(tempDir, '.gitignore'), 'node_modules');
  const tempMdFilePath = path.resolve(tempDir, 'docs/index.md');
  await fse.ensureFile(tempMdFilePath);
  fse.writeFileSync(tempMdFilePath, '# Hello World' + Date.now());

  // init workspace
  prepareCommands.forEach((command: string) => {
    execa.execaCommandSync(command, defaultExecaOpts);
  });

  // add scripts
  const pkgPath = path.resolve(tempDir, 'package.json');
  const pkgJson = fse.readJSONSync(pkgPath);
  pkgJson.scripts = {
    dev: 'island dev docs',
    build: 'island build docs',
    preview: 'island start docs'
  };
  fse.writeFileSync(
    pkgPath,
    prettier.format(JSON.stringify(pkgJson), {
      parser: 'json',
      tabWidth: 2
    })
  );

  // exec dev command
  execa.execaCommandSync('yarn dev', defaultExecaOpts);
}

const clean = () => {
  fse.removeSync(tempDir);
};

try {
  prepareE2E();
} catch (error) {
  clean();
}

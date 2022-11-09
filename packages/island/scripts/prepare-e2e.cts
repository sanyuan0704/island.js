import path from 'path';
import fse from 'fs-extra';
import * as execa from 'execa';

const exampleDir = path.resolve(__dirname, '../playground/quick-learning');
const defaultExecaOpts = {
  cwd: exampleDir,
  stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr
};

async function prepareE2E() {
  await fse.ensureDir(exampleDir);

  // ensure after build
  if (!fse.existsSync(path.resolve(__dirname, '../dist'))) {
    // exec build command
    execa.commandSync('npm run build', {
      cwd: path.resolve(__dirname, '../')
    });
  }

  execa.commandSync('npx playwright install', {
    cwd: path.join(__dirname, '../'),
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr
  });

  // exec install
  execa.commandSync(
    'npm i --registry=https://registry.npmmirror.com/',
    defaultExecaOpts
  );

  // exec dev command
  execa.commandSync('npm run dev', defaultExecaOpts);
}

prepareE2E();

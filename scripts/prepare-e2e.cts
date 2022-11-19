import path from 'path';
import fse from 'fs-extra';
import * as execa from 'execa';

const exampleDir = path.resolve(__dirname, '../e2e/playground/basic');
const defaultExecaOpts = {
  cwd: exampleDir,
  stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr
};

async function prepareE2E() {
  // ensure after build
  if (!fse.existsSync(path.resolve(__dirname, '../dist'))) {
    // exec build command
    execa.commandSync('pnpm build', {
      cwd: path.resolve(__dirname, '../')
    });
  }

  execa.commandSync('npx playwright install', {
    cwd: path.join(__dirname, '../'),
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr
  });

  execa.commandSync('pnpm i', {
    cwd: exampleDir,
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr
  });

  // exec dev command
  execa.commandSync('pnpm dev', defaultExecaOpts);
}

prepareE2E();

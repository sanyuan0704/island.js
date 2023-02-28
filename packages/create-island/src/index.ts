#!/usr/bin/env node
/* eslint-disable no-console */

// @ts-check
import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import prompts from 'prompts';
import execa from 'execa';
import { cyan, blue, yellow, bold, dim, green } from 'kolorist';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json');

const argv = minimist<{
  t?: string;
  template?: string;
}>(process.argv.slice(2), { string: ['_'] });

const cwd = process.cwd();

const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
  _npmrc: '.npmrc'
};

async function init() {
  console.log(`  ${cyan('●') + blue('■') + yellow('▲')}`);
  console.log(`${bold('  island') + dim(' Creator')}  ${blue(`v${version}`)}`);
  console.log();
  let targetDir = argv._[0];
  if (!targetDir) {
    const { projectName } = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'Project name:',
      initial: 'island'
    });
    targetDir = projectName.trim();
  }
  const packageName = await getValidPackageName(targetDir);
  const root = path.join(cwd, targetDir);

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  } else {
    const existing = fs.readdirSync(root);
    if (existing.length) {
      console.log(yellow(`  Target directory "${targetDir}" is not empty.`));
      /**
       * @type {{ yes: boolean }}
       */
      const { yes } = await prompts({
        type: 'confirm',
        name: 'yes',
        initial: 'Y',
        message: 'Remove existing files and continue?'
      });
      if (yes) emptyDir(root);
      else return;
    }
  }

  console.log(dim('  Scaffolding project in ') + targetDir + dim(' ...'));

  const templateDir = path.join(__dirname, 'template');

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file);
    if (content) {
      if (content) fs.writeFileSync(targetPath, content);
      else copy(path.join(templateDir, file), targetPath);
    }
  };
  const files = fs.readdirSync(templateDir);
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file);
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8')
  );
  pkg.name = packageName;

  write('package.json', JSON.stringify(pkg, null, 2));

  const pkgManager =
    /pnpm/.test(process.env.npm_execpath as string) ||
    /pnpm/.test(process.env.npm_config_user_agent as string)
      ? 'pnpm'
      : /yarn/.test(process.env.npm_execpath as string)
      ? 'yarn'
      : 'npm';

  const related = path.relative(cwd, root);

  console.log(green('  Done.\n'));

  const { yes } = await prompts({
    type: 'confirm',
    name: 'yes',
    initial: 'Y',
    message: 'Install and start it now?'
  });

  if (yes) {
    const { agent } = await prompts({
      name: 'agent',
      type: 'select',
      message: 'Choose the agent',
      choices: ['npm', 'yarn', 'pnpm'].map((i) => ({ value: i, title: i }))
    });

    if (!agent) return;

    await execa(agent, ['install'], { stdio: 'inherit', cwd: root });
    await execa(agent, ['run', 'dev'], { stdio: 'inherit', cwd: root });
  } else {
    console.log(dim('\n  start it later by:\n'));
    if (root !== cwd) console.log(blue(`  cd ${bold(related)}`));

    console.log(
      blue(`  ${pkgManager === 'yarn' ? 'yarn' : `${pkgManager} install`}`)
    );
    console.log(
      blue(`  ${pkgManager === 'yarn' ? 'yarn dev' : `${pkgManager} run dev`}`)
    );
    console.log();
    console.log(`  ${cyan('●')} ${blue('■')} ${yellow('▲')}`);
    console.log();
  }
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) copyDir(src, dest);
  else fs.copyFileSync(src, dest);
}

async function getValidPackageName(projectName: string) {
  projectName = path.basename(projectName);
  const packageNameRegExp =
    /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
  if (packageNameRegExp.test(projectName)) {
    return projectName;
  } else {
    const suggestedPackageName = projectName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/^[._]/, '')
      .replace(/[^a-z0-9-~]+/g, '-');

    /**
     * @type {{ inputPackageName: string }}
     */
    const { inputPackageName } = await prompts({
      type: 'text',
      name: 'inputPackageName',
      message: 'Package name:',
      initial: suggestedPackageName,
      validate: (input) =>
        packageNameRegExp.test(input) ? true : 'Invalid package.json name'
    });
    return inputPackageName;
  }
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) return;

  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file);
    // baseline is Node 12 so can't use rmSync :(
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs);
      fs.rmdirSync(abs);
    } else {
      fs.unlinkSync(abs);
    }
  }
}

init().catch((e) => {
  console.error(e);
});

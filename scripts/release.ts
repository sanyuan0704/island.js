// 发包规范
// package.json 导出 ESM、CJS，files、types、license、packageManager
// CHANGELOG 生成规范

// 发布流程编排
// 1. 确定变动版本级别 patch | minor | major，遵循 semver 规范
// 2. 执行测试
// 3. 自动修改包版本
// 4. 执行 pnpm build
// 5. 生成 CHANGELOG.md
// 6. release commit
// 7. 执行 npm publish
// 8. git push 并打 tag

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import execa from 'execa';
import { prompt } from 'enquirer';
import semver from 'semver';
import minimist from 'minimist';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const args = minimist(process.argv.slice(2));
const isDry = args.dry;
const versionIncrements = ['patch', 'minor', 'major'] as const;

const pkg = require('../package.json');
const currentVersion = pkg.version;
const directRun = (bin: string, args: string[], opts?: execa.Options) => {
  return execa(bin, args, { stdio: 'inherit', ...opts });
};

const dryRun = (bin: string, args: string[], opts?: execa.Options) => {
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`));
  return Promise.resolve();
};

const run = isDry ? dryRun : directRun;

const step = (msg) => console.log(chalk.cyan(msg));

function updateVersion(version) {
  pkg.version = version;
  fs.writeFileSync(
    path.resolve(__dirname, '../package.json'),
    JSON.stringify(pkg, null, 2)
  );
}

async function main() {
  const { release } = await prompt<{ release: string }>({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versionIncrements.map(
      (i) => `${i} (${semver.inc(pkg.version, i)})`
    )
  });

  const targetVersion = release.match(/\((.*)\)/)![1];

  const { confirm } = await prompt<{ confirm: boolean }>({
    type: 'confirm',
    name: 'confirm',
    message: `Releasing ${targetVersion}. Confirm?`
  });

  if (!confirm) {
    return;
  }

  step('\nRunning tests...');
  await run('pnpm', ['test:unit']);
  await run('pnpm', ['test:e2e']);

  if (!isDry) {
    step('\nUpdate version...');
    updateVersion(targetVersion);
  }

  step('\nBuilding package...');
  await run('pnpm', ['build']);

  step('\nGenerating changelog...');
  await run('pnpm', ['changelog']);

  step('\nCommitting changes...');
  await run('git', ['add', '-A']);
  await run('git', ['commit', '-m', `'release: v${targetVersion}'`]);

  step('\nPublishing packages...');
  await run('pnpm', ['publish', '--access', 'public']);

  step('\nPushing to GitHub...');
  await run('git', ['tag', `v${targetVersion}`]);
  await run('git', ['push', 'origin', `refs/tags/v${targetVersion}`]);
  await run('git', ['push']);
}

main().catch((err) => {
  console.error(err);
  updateVersion(currentVersion);
});

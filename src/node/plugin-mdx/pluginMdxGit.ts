import { Plugin } from 'vite';
import { simpleGit } from 'simple-git';
import { MD_REGEX } from '../../node/constants';

export function pluginMdxGit(): Plugin {
  const cache = new Map<string, string>();
  const git = simpleGit();

  // https://github.com/steveukx/git-js#git-log
  async function getLastUpdatedTime(path: string) {
    const { latest } = await git.log({ file: path });
    return !latest ? '' : latest.date;
  }

  return <Plugin>{
    name: 'vite-plugin-mdx-git',
    async transform(code, id) {
      if (!MD_REGEX.test(id)) return code;

      let lastUpdatedTime = '';
      if (cache.has(id)) {
        lastUpdatedTime = id;
      } else {
        const rawTime = await getLastUpdatedTime(id);
        lastUpdatedTime = new Date(rawTime).toLocaleString();
        cache.set(id, lastUpdatedTime);
      }

      code = code.concat(`
        \n
export const lastUpdatedTime = "${lastUpdatedTime}"
      `);
      return code;
    }
  };
}

import { Plugin } from 'vite';
import fs from 'fs-extra';
import { MD_REGEX } from '../constants';
import { cleanUrl } from '../../shared/utils';

export function pluginMdxRawContent(): Plugin {
  return <Plugin>{
    name: 'vite-plugin-mdx-raw-content',
    async transform(code, id) {
      id = cleanUrl(id);
      if (!MD_REGEX.test(id)) return code;
      const rawContent = await fs.readFile(id, 'utf-8');
      code = code.concat(`
        \n
export const content = ${JSON.stringify(rawContent)}
      `);
      return code;
    }
  };
}

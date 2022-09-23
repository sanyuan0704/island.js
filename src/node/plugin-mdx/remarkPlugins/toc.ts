import type { Plugin } from 'unified';
import { visitChildren } from 'unist-util-visit-children';
import type { MdxjsEsm, Program } from 'mdast-util-mdxjs-esm';
import { parse } from 'acorn';
import Slugger from 'github-slugger';

const slugger = new Slugger();

interface TocItem {
  id: string;
  text: string;
  depth: number;
}

export const remarkPluginToc: Plugin = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    const toc: TocItem[] = [];
    let title = '';
    slugger.reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visitChildren((node: any) => {
      // Collect h2 ~ h5
      if (node.type === 'heading' && node.depth === 1) {
        title = node.children[0].value;
      }

      if (node.type === 'heading' && node.depth > 1 && node.depth < 5) {
        const originText = node.children[0].value;
        const id = slugger.slug(originText);
        const depth = node.depth;
        toc.push({ id, text: originText, depth });
      }
    })(tree);
    const insertedTocCode = `export const toc = ${JSON.stringify(
      toc,
      null,
      2
    )}`;
    // Add toc ast to current ast tree
    tree.children.push({
      type: 'mdxjsEsm',
      value: insertedTocCode,
      data: {
        estree: parse(insertedTocCode, {
          ecmaVersion: 2020,
          sourceType: 'module'
        }) as unknown as Program
      }
    } as MdxjsEsm);

    if (title) {
      const insertedTitle = `export const title = "${title}"`;
      tree.children.push({
        type: 'mdxjsEsm',
        value: insertedTitle,
        data: {
          estree: {
            type: 'Program',
            sourceType: 'module',
            body: [
              {
                type: 'ExportNamedDeclaration',
                declaration: {
                  type: 'VariableDeclaration',
                  kind: 'const',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'title'
                      },
                      init: {
                        type: 'Literal',
                        value: title,
                        raw: `"${title}"`
                      }
                    }
                  ]
                },
                specifiers: []
              }
            ]
          }
        }
      } as MdxjsEsm);
    }
  };
};

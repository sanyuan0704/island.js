import type { Plugin } from 'unified';
import { visitChildren } from 'unist-util-visit-children';
import type { MdxjsEsm } from 'mdast-util-mdxjs-esm';
import { parse } from 'acorn';

interface TocItem {
  id: string;
  text: string;
  depth: number;
  order: number;
}

export const remarkPluginToc: Plugin = () => {
  return (tree: any) => {
    const toc: TocItem[] = [];
    let order = 0;
    visitChildren((node: any) => {
      // Collect h2 ~ h5

      if (node.type === 'heading' && node.depth > 1 && node.depth < 5) {
        const text = node.children[0].value;
        const depth = node.depth;
        toc.push({ id: text, text, depth, order });
        order++;
      }
    })(tree);
    const insertedCode = `export const toc = ${JSON.stringify(toc, null, 2)}`;
    // Add toc ast to current ast tree
    tree.children.push({
      type: 'mdxjsEsm',
      value: insertedCode,
      data: {
        estree: parse(insertedCode, {
          ecmaVersion: 2020,
          sourceType: 'module'
        }) as any
      }
    } as MdxjsEsm);
  };
};

import type { Plugin } from 'unified';
import Slugger from 'github-slugger';
import { visit } from 'unist-util-visit';
import { Root } from 'hast';
import type { MdxjsEsm, Program } from 'mdast-util-mdxjs-esm';
import { parse } from 'acorn';

interface TocItem {
  id: string;
  text: string;
  depth: number;
}

interface ChildNode {
  type: 'link' | 'text' | 'inlineCode';
  value: string;
  children?: ChildNode[];
}

export const remarkPluginToc: Plugin<[], Root> = () => {
  return (tree) => {
    const toc: TocItem[] = [];
    const slugger = new Slugger();

    visit(tree, 'heading', (node) => {
      if (!node.depth || !node.children) {
        return;
      }
      // h2 ~ h4
      if (node.depth > 1 && node.depth < 5) {
        // node.children 是一个数组，包含几种情况:
        // 1. 文本节点，如 '## title'
        // 结构如下:
        // {
        //   type: 'text',
        //   value: 'title'
        // }
        // 2. 链接节点，如 '## [title](/path)'
        // 结构如下:
        // {
        //   type: 'link',
        //   children: [
        //     {
        //       type: 'text',
        //       value: 'title'
        //     }
        //   ]
        // }
        // 3. 内联代码节点，如 '## `title`'
        // 结构如下:
        // {
        //   type: 'inlineCode',
        //   value: 'title'
        // }
        const originText = (node.children as ChildNode[])
          .map((child) => {
            switch (child.type) {
              case 'link':
                return child.children?.map((c) => c.value).join('') || '';
              default:
                return child.value;
            }
          })
          .join('');
        const id = slugger.slug(originText);
        toc.push({
          id,
          text: originText,
          depth: node.depth
        });
      }
    });

    const insertCode = `export const toc = ${JSON.stringify(toc, null, 2)};`;

    tree.children.push({
      type: 'mdxjsEsm',
      value: insertCode,
      data: {
        estree: parse(insertCode, {
          ecmaVersion: 2020,
          sourceType: 'module'
        }) as unknown as Program
      }
    } as MdxjsEsm);
  };
};

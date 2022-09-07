import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';

export const rehypePluginPreWrapper: Plugin<[], import('hast').Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'code') {
        debugger;
      }
    });
  };
};

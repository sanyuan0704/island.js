import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Text } from 'hast';
import { fromHtml } from 'hast-util-from-html';
import shiki from 'shiki';

interface Options {
  highlighter: shiki.Highlighter;
}

// https://github.com/leafac/rehype-shiki/blob/41e64054d72ab29d5ad48c4c070499fc075090e9/source/index.ts
// The plugin cannot be used directly because it won't reserve the class name `language-xxx` in the code tag
// It cause conflict with preWrapper plugin, so we should integrate it manually
export const rehypePluginShiki: Plugin<[Options], import('hast').Root> = ({
  highlighter
}) => {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      // <pre><code>...</code></pre>
      if (
        node.tagName === 'pre' &&
        node.children?.[0]?.type === 'element' &&
        node.children[0].tagName === 'code'
      ) {
        const codeNode = node.children[0];
        const codeContent = (node.children[0].children[0] as Text).value;
        const codeClassName = codeNode.properties?.className?.toString() || '';
        const lang = codeClassName.split('-')[1];

        if (!lang) {
          return;
        }

        const highlightedCode = highlighter.codeToHtml(codeContent, { lang });
        const fragmentAst = fromHtml(highlightedCode, { fragment: true });
        // @ts-ignore Reserve the class name `language-xxx` in the code tag
        fragmentAst.children[0].children[0].properties.className =
          codeClassName;
        parent?.children.splice(index!, 1, ...fragmentAst.children);
      }
    });
  };
};

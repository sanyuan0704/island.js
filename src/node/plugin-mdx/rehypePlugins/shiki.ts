import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Text } from 'hast';
import { fromHtml } from 'hast-util-from-html';
import shiki from 'shiki';

interface Options {
  highlighter: shiki.Highlighter;
}

function highlightSingleLine(
  line: number,
  fragmentAst: ReturnType<typeof fromHtml>
) {
  // Children are composed of span and \n alternately, so we should get the even rows to highlight
  if (
    line >= 1 &&
    line * 2 - 2 <
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fragmentAst.children[0].children[0].children.length &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fragmentAst.children[0].children[0].children?.[line * 2 - 2]?.properties
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fragmentAst.children[0].children[0].children[
      line * 2 - 2
    ].properties.className = 'line highlighted';
  }
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

        const highlightLinesReg = /language-([a-zA-Z]*)\s*({[\d,-]*})?/i;
        const highlightRegExecResult = highlightLinesReg.exec(codeClassName);

        if (!highlightRegExecResult) {
          return;
        }

        const lang = highlightRegExecResult[1];
        if (!lang) {
          return;
        }

        // Support single line and line range
        const highlightLines: (number | number[])[] = [];
        highlightRegExecResult[2]
          ?.slice(1, highlightRegExecResult[2].length - 1)
          ?.split(',')
          .forEach((str) => {
            if (str.includes('-')) {
              const [start, end] = str.split('-');
              highlightLines.push([parseInt(start), parseInt(end)]);
            } else {
              highlightLines.push(parseInt(str));
            }
          });

        const highlightedCode = highlighter.codeToHtml(codeContent, { lang });
        const fragmentAst = fromHtml(highlightedCode, { fragment: true });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Reserve the class name `language-xxx` in the code tag
        fragmentAst.children[0].children[0].properties.className =
          'language-' + lang;

        highlightLines.forEach((line) => {
          if (line instanceof Array) {
            for (let i = line[0]; i <= line[1]; i++) {
              highlightSingleLine(i, fragmentAst);
            }
          } else {
            highlightSingleLine(line, fragmentAst);
          }
        });
        parent?.children.splice(index!, 1, ...fragmentAst.children);
      }
    });
  };
};

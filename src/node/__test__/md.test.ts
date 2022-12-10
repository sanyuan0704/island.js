import { unified } from 'unified';
import { describe, test, expect } from 'vitest';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { rehypePluginPreWrapper } from '../plugin-mdx/rehypePlugins/preWrapper';
import { rehypePluginShiki } from '../../node/plugin-mdx/rehypePlugins/shiki';
import shiki from 'shiki';

describe('Markdown compile cases', async () => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePluginPreWrapper)
    .use(rehypePluginShiki, {
      highlighter: await shiki.getHighlighter({ theme: 'nord' })
    })
    .use(rehypeStringify);

  test('Compile title', async () => {
    const mdContent = '# 123';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot('"<h1>123</h1>"');
  });

  test('Compile code', async () => {
    const mdContent = 'I am using `Island.js`';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot(
      '"<p>I am using <code>Island.js</code></p>"'
    );
  });

  test('Compile code block', async () => {
    const mdContent = '```js\nconsole.log(123);\n```';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot();
  });
});

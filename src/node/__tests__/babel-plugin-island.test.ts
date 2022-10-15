import { expect, describe, test } from 'vitest';
import { transformAsync, TransformOptions } from '@babel/core';
import babelPluginIsland from '../babel-plugin-island';
import { MASK_SPLITTER } from '../constants';
import os from 'os';

const isWindows = os.platform() === 'win32';

describe('test babel-plugin-island', () => {
  const ISLAND_PATH = '../Comp/index';
  const relativePath = 'project/test.tsx';
  const prefix = isWindows ? 'C:/' : '/User/';
  const IMPORTER_PATH = `${prefix}${relativePath}`;
  const babelOptions: TransformOptions = {
    filename: IMPORTER_PATH,
    presets: ['@babel/preset-react'],
    plugins: [babelPluginIsland]
  };
  test('Should compile jsx identifier', async () => {
    const code = `import A from '${ISLAND_PATH}'; export default function App() { return <A __island>hello</A>; }`;
    const result = await transformAsync(code, babelOptions);
    expect(result?.code).toContain(
      `__island: "${ISLAND_PATH}${MASK_SPLITTER}${IMPORTER_PATH}"`
    );
  });

  test('Should compile jsx member expression', async () => {
    const code = `import A from '${ISLAND_PATH}'; export default function App() { return <A.B __island>hello</A.B>; }`;
    const result = await transformAsync(code, babelOptions);
    expect(result?.code).toContain(
      `__island: "${ISLAND_PATH}${MASK_SPLITTER}${IMPORTER_PATH}"`
    );
  });

  test('Should compile jsx namespace expression', async () => {
    const code = `import * as A from '${ISLAND_PATH}'; export default function App() { return <A __island>hello</A>; }`;
    const result = await transformAsync(code, babelOptions);
    expect(result?.code).toContain(
      `__island: "${ISLAND_PATH}${MASK_SPLITTER}${IMPORTER_PATH}"`
    );
  });

  test('Should do nothing', async () => {
    const code = `import * as A from '${ISLAND_PATH}'; export default function App() { return <A>hello</A>; }`;
    const result = await transformAsync(code, babelOptions);
    expect(result?.code).toMatchInlineSnapshot(`
      "import * as A from '../Comp/index';
      export default function App() {
        return /*#__PURE__*/React.createElement(A, null, \\"hello\\");
      }"
    `);
  });
});

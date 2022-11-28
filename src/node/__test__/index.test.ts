import { expect, test } from 'vitest';

// 单元测试、集成测试  - 白盒测试
// E2E 测试 - 黑盒测试
test('add', () => {
  expect(1 + 1).toBe(2);
  expect('map'.slice(1)).toMatchSnapshot('"ap"');
  expect('map'.slice(1)).toMatchInlineSnapshot('"ap"');
});

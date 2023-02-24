const task = async () => {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      resolve();
    }, 20);
  });
};

const helmetStatic = {};

const renderToString = (title) => {
  helmetStatic.title = title;
};

async function renderPages() {
  return Promise.all(
    [1, 2, 3].map(async (title) => {
      // 1. renderToString
      renderToString(title);
      // 2. 执行异步操作
      await task();
      // 3. 拼接 HTML
      return `<html><head>${helmetStatic.title}</head></html>`;
    })
  );
}
// eslint-disable-next-line no-undef
renderPages().then(console.log);

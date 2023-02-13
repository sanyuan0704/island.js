const task = async () => {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      resolve();
    }, 20);
  });
};

const helmetStatic = {};

function renderToString(title) {
  helmetStatic.title = title;
}

async function renderPages() {
  return Promise.all(
    ['1', '2', '3'].map(async (title) => {
      renderToString(title);
      // renderToString 后插入异步任务
      await task();
      return `<title>${helmetStatic.title}</title>`;
    })
  );
}

// eslint-disable-next-line no-undef
renderPages().then(console.log);

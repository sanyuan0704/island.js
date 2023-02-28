import { defineConfig } from "islandjs";

export default defineConfig({
  themeConfig: {
    nav: [
      {
        text: "Home",
        link: "/",
      },
    ],
    sidebar: {
      "/": [
        {
          text: "文章列表",
          items: [
            {
              text: "Fresh",
              link: "/article/fresh",
            },
            {
              text: "Astro",
              link: "/article/astro",
            },
          ],
        },
      ],
    },
  },
});

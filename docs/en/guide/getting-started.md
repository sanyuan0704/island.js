# Getting Started

## Why Island.js?

🏝️ Island.js is a static site generator that builds on top of Vite, React and MDX. It is designed to be simple, powerful, and performant. It is built to help you focus on writing and deployed with minimum configuration.It has the following features:

- **Fast**: Island is built on top of Vite, which is a modern build tool that aims to provide a faster and leaner development experience.
- **Flexible**: It has internal MDX language support, which is a powerful way to write content. You can write, import and use React components in Markdown file.
- **Performant**: It is designed to be [island architecture](https://jasonformat.com/islands-architecture/), which means less javascript bundle, partial hydration and better performance about FCP, TTI.
- **Powerful**: Default theme includes a lot of features, such as `Dark Mode`, [`Home Page`](/en/guide/home-page), [`API Page`](/en/guide/api-page)、[`Full-text Search`](/en/guide/search), [`i18n`](/en/guide/i18n) etc.

Next we will walk you through the steps to create a new Island.js doc site.

:::tip
At present, we also provide independent tutorial documents to complete project initialization, development, bundling and deployment from scratch, with a better reading and interactive experience, you can click [[here]](https://island-tutorial.sanyuan0704.top/en) to view.
:::

## 1. Init project

Island.js has two installation methods, you only need to choose one. We recommend using the `create-island` cli because it can help you quickly and easily install Island.js and build a website framework.

### Use `create-island` cli

Using the `create-island` cli tool can help you quickly and easily install island and build a website framework. You can create a repository and run this command, which will create a new directory containing template files.

```bash
# npm
npx @islandjs/create-island@latest island-app
# yarn
yarn create @islandjs/island island-app
# pnpm
pnpm create @islandjs/island island-app
```

Answer the questions asked by the cli, and wait for the installation to complete. It will automatically install dependencies and start the development server.

If you name your new site `island-app`, then you will create a new directory called `island-app` in the current directory. You can enter the directory by the following command:

```bash
cd island-app
```

### Manual installation

Of course, you can also manually initialize the project. First, you can create a new directory by the following command:

```bash
mkdir island-app && cd island-app
```

Run `npm init -y` to initialize a project. You can use npm, yarn or pnpm to install Island.js:

```bash
# npm
npm install islandjs
# yarn
yarn add islandjs
# pnpm
pnpm add islandjs
```

Then create files and directories as follows:

```bash
mkdir docs && echo '# Hello World' > docs/index.md
```

Add the following scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "island dev docs",
    "build": "island build docs",
    "preview": "island start docs"
  }
}
```

## 2. Start dev server

Serve the documentation site in the local server.

```bash
yarn dev
```

Island will start a development server at <http://localhost:5173>.

If you use the `create-island` cli to create a project, you will see a page with a navigation bar and contents (like this document). If you choose to create a project manually, you will see `Hello World` printed on the page. This means that you have successfully started the development server of Island.js.

## 3. Build for production

Build the documentation site for production.

```bash
yarn build
```

Island will generate a static site in the `.island/dist` directory.

## 4. Preview locally

Preview the production build locally.

```bash
yarn preview
```

Island will start a production server at http://localhost:4173.

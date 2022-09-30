# Getting Started

## Why Island.js?

🏝️ Island.js is a static site generator that builds on top of Vite, React and Mdx. It is designed to be simple, powerful, and performant. It is built to help you focus on writing and deployed with minimum configuration.It has the following features:

- **Fast**: Island is built on top of Vite, which is a modern build tool that aims to provide a faster and leaner development experience.
- **Flexible**: It has internal Mdx language support, which is a powerful way to write content. You can write, import and use React components in Markdown file.
- **Performant**: It is designed to be [island architecture](https://jasonformat.com/islands-architecture/), which means less javascript bundle, partial hydration and better performance about FCP, TTI.

Next we will walk you through the steps to create a new Island.js doc site.

## 1. Init project

First, you can create a new directory by following command:

```bash
mkdir island-app && cd island-app
```

Execute `npm init -y` to init a project. You can install Island with npm, yarn or pnpm:

```bash
# npm
npm install islandjs
# yarn
yarn add islandjs
# pnpm
pnpm add islandjs
```

Then you can create file:

```bash
mkdir docs && echo '# Hello World' > docs/index.md
```

And then you can add the following scripts in `package.json`:

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

Island will start a development server at http://localhost:5173.

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

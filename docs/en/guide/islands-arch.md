# Islands architecture

The idea of "islands architecture" was first coined by Etsy's frontend architect [Katie Sylor-Miller](https://twitter.com/ksylor) in 2019, and expanded on in this [post](https://jasonformat.com/islands-architecture/) by Preact creator Jason Miller.

This kind of architecture is aim to solve the problem of the hydration need of MPA, which is deeply analyzed before.

## What's it?

As the name suggests, we can image the whole page as a sea of static, and the interactive parts as islands.As the following picture shows:

![./assets/islands-arch.png](https://res.cloudinary.com/wedding-website/image/upload/v1596766231/islands-architecture-1.png)

Then the hydration process will only be executed on the islands, which will make the first page load performance and TTI(time to interactive) better because it only needs partial client script that is correspond to the interactive parts.

## Implement details in Island.js

The implementation of this architecture includes three parts: `server runtime`、`build time` and `client runtime`.

### Basic Usage

Before introducing the architecture implementation, I think it is necessary to introduce how to use an island component.In island.js, the usage is very simple, just like the following code:

```js
import { Aside } from './Aside.tsx';

export function Layout() {
  return <Aside __island />;
}
```

You only need to add a `__island` prop to the component when you use it, and then the component will automatically be identified as an island component. Island.js will only inject the client script of island components as well as their props when they are rendered on the client.

### Internal Implement

**1. Server runtime**.The server runtime is responsible for the server-side rendering of the islands, and it is also the core of the islands architecture. The main task of the server runtime is to collect the islands information in `renderToString` process.

In `Island.js`, it hijack the react/jsx-runtime's jsx function and collect the islands information when `__island` prop is found in the component.

**2. Build time**. The build time is responsible for generating the client script of the islands and injecting it into the html. In build time, Island.js will generate three bundle:

- Server bundle, for rendering to html string in server.
- Client hydration bundle, for hydrating the islands in client.
- Islands bundle, for registering the islands components and props on `window` object.

Island.js will combine all island components into a virtual module and bundle them. In the virtual module, all of the island components will be hang on `window` object. So in client hydration bundle, we can get the island components from `window` object and hydrate them separately.

**3. Client runtime**. The client runtime is responsible for hydrating the islands in browser to make them interactive.

There are the some relevant code in repository:

[island-jsx-runtime.js](https://github.com/sanyuan0704/island.js/blob/master/packages/island/src/runtime/island-jsx-runtime.js): The jsx runtime will collect the islands information when `__island` prop is found in the component, served as the server runtime.

[babel-plugin-island](https://github.com/sanyuan0704/island.js/blob/master/packages/island/src/node/babel-plugin-island.ts): The babel plugin will transform the `__island` prop to `__island=${islandAbsoluteFilePath}` prop, so in build time, bundler will find the island component file path.

[SSGBuilder](https://github.com/sanyuan0704/island.js/blob/master/packages/island/src/node/build.ts): The complete build time implement.

[client-entry](https://github.com/sanyuan0704/island.js/blob/master/packages/island/src/runtime/client-entry.tsx#L50): The client runtime will hydrate the islands in browser to make them interactive.

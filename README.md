# Zag JS Recipes

Custom Machines for [Zag JS](https://zagjs.com/). 
Visit [zagjs.com](https://zagjs.com/) for full usage guide and more information.

### Available Machines

- Lottie

### Installation

```sh
npm i --save @zag-js-recipes/{component}

# or

yarn add @zag-js-recipes/{component}
```

> `{component}` represents any component machine like dialog (`@zag-js-recipes/lottie`)

For framework specific solutions, we provide simple wrappers to help you consume the component state machines.

- ⚛️ `@zag-js/react` - React hooks for consuming machines in React applications
- 💚 `@zag-js/vue` - Vue composition for consuming machines in Vue applications
- 🎷 `@zag-js/solid` - Solid.js utilities for consuming machines in Solid.js applications

### Usage

```jsx
import * as lottie from "@zag-js-recipes/lottie";
import { normalizeProps, useMachine } from "@zag-js/react";

function Example() {
  // if you need access to `state` or `send` from machine
  const [state, send] = useMachine(lottie.machine({ id: "2" }));

  // convert machine details into `DOM` props
  const api = lottie.connect(state, send, normalizeProps);

  // consume into components
  return <div {...api.lottieProps} />
}
```

## Commands

### Build commands

Our build is managed with esbuild and turborepo to provide fast, concurrent builds across the packages.

- `build-fast` : Build the CJS and ESM versions, without the types.
- `build` : Build the CJS, ESM and DTS files. This is the actual production build that we run in the CI.
- `start` : The command to run when developing for Zag. It runs the `build:fast` command, watches for changes and
  rebuilds as needed.

### Examples

Since zag is framework agnostic, we need a way to test it within a framework. The `examples/` directory includes starter
projects for the frameworks we support.

- `start-react` : Starts the Next.js TypeScript project
- `start-vue` : Starts the Vue 3 TypeScript project
- `start-solid` : Starts the Solid TypeScript project

### E2E Tests

We've setup end-to-end tests for every machine we built. We use [Playwright](https://playwright.dev/) for testing and we
ensure that the component works the same way regardless of the framework.

- `e2e-react` : Starts the E2E tests for the React project
- `e2e-vue` : Starts the E2E tests for the Vue project
- `e2e-solid` : Starts the E2E tests for the Solid project

### Contributing new machines/features

- `generate-machine` : Generates a new machine package in the `packages/` directory. It sets up the required files and
  structure for new machine.
- `generate-util` : Generates a new utility package in the `packages/utilities` directory.

### Other commands

- `test` : Run the tests for all packages
- `lint` : Lint all packages

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding a 👍. This helps maintainers prioritize
what to work on.

## License

MIT © [Abraham Aremu](https://github.com/anubra266)

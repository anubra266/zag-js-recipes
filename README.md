# Zag

Finite state machines for accessible JavaScript components

- **Write once, use everywhere 🦄**: The component interactions are modelled in a framework agnostic way. We provide
  adapters for JS frameworks like React, Solid, or Vue.
- **Focus on accessibility ♿️**: Zag is built with accessibility in mind. We handle many details related to keyboard
  interactions, focus management, aria roles and attributes.
- **Headless ✨**: The machine APIs are completely unstyled and gives you the control to use any styling solution you
  prefer.
- **Powered by state machines 🌳**: Zag is built on top of the latest ideas in Statecharts. We don't follow the SCXML
  specifications, but we've created an API that we think will help us build more complex components fast.

## The problem

With the rise of design systems and component-driven development, there's an endless re-implementation of common
component patterns (Tabs, Menu, Modal, etc.) in multiple frameworks.

Most of these implementations seem to be fairly similar in spirit, the differences being around the reactivity and
effects systems for the framework (e.g. `useState`, `useEffect` in React.js). Framework specific solutions tend to grow
in complexity over time and often become hard to understand, debug, improve or test.

## Solution

**Zag** is a JavaScript API that implements common component patterns using the state machine methodology.

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
import * as toggle from "@zag-js-recipes/lottie";
import { normalizeProps, useMachine } from "@zag-js/react";

function Example() {
  // if you need access to `state` or `send` from machine
  const [state, send] = useMachine(toggle.machine({ id: "2" }));

  // convert machine details into `DOM` props
  const api = toggle.connect(state, send, normalizeProps);

  // consume into components
  return <button {...api.buttonProps}>Toggle me</button>;
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

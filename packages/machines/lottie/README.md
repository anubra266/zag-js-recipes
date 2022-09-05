# @zag-js/lottie

Core logic for the lottie widget implemented as a state machine

## Installation

```sh
# Install the lottie machine

yarn add  @zag-js-recipes/lottie
# or
npm i  @zag-js-recipes/lottie
```

```sh
# Install your framework adapter for zag-js
yarn add  @zag-js/react
```

## Usage

### Basic

```tsx
import * as lottie from "@zag-js-recipes/lottie";
// your framework zag package - react | vue | solid
import { useMachine, normalizeProps } from "@zag-js/react";
// import the lottie animation json
import lottieData from "animation.json";

export default function Page() {
  const [state, send] = useMachine(
    lottie.machine({
      id: useId(),
      // the lottie animation json is passed here
      animationData: lottieData,
    })
  );

  const api = lottie.connect(state, send, normalizeProps);

  return (
    <>
      <div {...api.lottieProps} style={{ width: "200px" }} />
      <button onClick={api.pause}>pause</button>
      <button onClick={api.play}>play</button>
      <button onClick={api.stop}>stop</button>
    </>
  );
}
```

## Interactivity

To use interactivity pass a `interactivity` object to the context. You can see all possible combinations in the [lottie interactivity docs](https://lottiefiles.com/interactivity)

```ts
const [state, send] = useMachine(
  lottie.machine({
    id: useId(),
    // the lottie animation json is passed here
    animationData: lottieData,
    interactivity: {
      mode: "scroll",
      actions: [
        {
          visibility: [0, 1],
          type: "seek",
          frames: [0, 300],
        },
      ],
    },
  })
);
```

## Accepted context

```ts
type LottieOptions = {
  animationData: any;
  interactivity?: Interactivity;
  renderer?: "svg" | "canvas" | "html";
  loop?: boolean | number;
  autoplay?: boolean;
  initialSegment?: AnimationSegment;
  name?: string;
  assetsPath?: string;
  rendererSettings?:
    | SVGRendererConfig
    | CanvasRendererConfig
    | HTMLRendererConfig;
  audioFactory?(assetPath: string): {
    play(): void;
    seek(): void;
    playing(): void;
    rate(): void;
    setVolume(): void;
  };

  onComplete?: AnimationEventHandler | null;
  onLoopComplete?: AnimationEventHandler | null;
  onEnterFrame?: AnimationEventHandler | null;
  onSegmentStart?: AnimationEventHandler | null;
  onConfigReady?: AnimationEventHandler | null;
  onDataReady?: AnimationEventHandler | null;
  onDataFailed?: AnimationEventHandler | null;
  onLoadedImages?: AnimationEventHandler | null;
  onDOMLoaded?: AnimationEventHandler | null;
  onDestroy?: AnimationEventHandler | null;
};
```

## Contribution

Yes please! See the
[contributing guidelines](https://github.com/chakra-ui/zag/blob/main/CONTRIBUTING.md)
for details.

## Licence

This project is licensed under the terms of the
[MIT license](https://github.com/chakra-ui/zag/blob/main/LICENSE).

```

```

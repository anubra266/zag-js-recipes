import * as lottie from "@zag-js-recipes/lottie"
import { normalizeProps, useMachine, mergeProps } from "@zag-js/solid"
import { createMemo, createUniqueId } from "solid-js"
import { lottieData } from "@zag-js-recipes/shared"
import { StateVisualizer } from "../components/state-visualizer"
import { Toolbar } from "../components/toolbar"

export default function Page() {
  const [state, send] = useMachine(lottie.machine({ id: createUniqueId(), animationData: lottieData }))

  const api = createMemo(() => lottie.connect(state, send, normalizeProps))

  return (
    <>
      <main class="lottie">
        <div {...api().lottieProps} style={{ width: "200px" }} />

        <button onClick={api().pause}>pause</button>
        <button onClick={api().play}>play</button>
        <button onClick={api().stop}>stop</button>
      </main>

      <Toolbar controls={null} visualizer={<StateVisualizer state={state} />} />
    </>
  )
}

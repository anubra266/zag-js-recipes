import * as lottie from "@zag-js-recipes/lottie"
import { useMachine, normalizeProps } from "@zag-js/react"
import { lottieData } from "@zag-js-recipes/shared"
import { useId } from "react"
import { StateVisualizer } from "../components/state-visualizer"
import { Toolbar } from "../components/toolbar"

export default function Page() {
  const [state, send] = useMachine(
    lottie.machine({
      id: useId(),
      animationData: lottieData,
    }),
  )

  const api = lottie.connect(state, send, normalizeProps)

  return (
    <>
      <main className="lottie">
        <div {...api.lottieProps} style={{ width: "200px" }} />

        <button onClick={api.pause}>pause</button>
        <button onClick={api.play}>play</button>
        <button onClick={api.stop}>stop</button>
      </main>

      <Toolbar controls={null}>
        <StateVisualizer state={state} />
      </Toolbar>
    </>
  )
}

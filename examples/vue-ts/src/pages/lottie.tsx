import * as lottie from "@zag-js-recipes/lottie";
import { normalizeProps, useMachine, mergeProps } from "@zag-js/vue";
import { computed, defineComponent, h, Fragment } from "vue";
import { lottieData } from "@zag-js-recipes/shared";
import { StateVisualizer } from "../components/state-visualizer";
import { Toolbar } from "../components/toolbar";

export default defineComponent({
  name: "LottieMachine",
  setup() {
    const [state, send] = useMachine(
      lottie.machine({ id: "1", animationData: lottieData })
    );

    const apiRef = computed(() =>
      lottie.connect(state.value, send, normalizeProps)
    );

    return () => {
      const api = apiRef.value;

      return (
        <>
          <main class="lottie">
            <div {...api.lottieProps} style={{ width: "200px" }} />

            <button onClick={api.pause}>pause</button>
            <button onClick={api.play}>play</button>
            <button onClick={api.stop}>stop</button>
          </main>

          <Toolbar
            controls={null}
            visualizer={<StateVisualizer state={state} />}
          />
        </>
      );
    };
  },
});

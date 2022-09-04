import { NormalizeProps, type PropTypes } from "@zag-js/types"
import { State, Send } from "./lottie.types"
import { dom } from "./lottie.dom"
import { AnimationDirection, AnimationSegment } from "lottie-web"

export function connect<T extends PropTypes>(state: State, send: Send, normalize: NormalizeProps<T>) {
  return {
    isPaused: state.context.lottiePlayer?.isPaused,
    play() {
      send("PLAY")
    },
    stop() {
      send("STOP")
    },
    pause() {
      send("PAUSE")
    },
    /**
     * Set animation speed
     * @param speed
     */
    setSpeed(speed: number) {
      send({ type: "SET_SPEED", speed })
    },
    /**
     * Got to frame and play
     * @param value
     * @param isFrame
     */
    goToAndPlay(value: number, isFrame?: boolean) {
      send({ type: "GOTO_AND_PLAY", value, isFrame })
    },
    /**
     * Got to frame and stop
     * @param value
     * @param isFrame
     */
    goToAndStop(value: number, isFrame?: boolean) {
      send({ type: "GOTO_AND_STOP", value, isFrame })
    },
    /**
     * Set animation direction
     * @param direction
     */
    setDirection(direction: AnimationDirection) {
      send({ type: "SET_DIRECTION", direction })
    },
    /**
     * Play animation segments
     * @param segments
     * @param forceFlag
     */
    playSegments(segments: AnimationSegment | AnimationSegment[], forceFlag?: boolean) {
      send({ type: "PLAY_SEGMENTS", segments, forceFlag })
    },
    /**
     * Set animation direction
     * @param direction
     */
    setSubframe(useSubFrames: boolean) {
      send({ type: "SET_SUBFRAMES", useSubFrames })
    },
    /**
     * Get animation duration
     * @param inFrames
     */
    getDuration(inFrames?: boolean): number | undefined {
      return state.context.lottiePlayer?.getDuration(inFrames)
    },
    destroy() {
      send("DESTROY")
    },

    lottieProps: normalize.element({
      id: dom.getLottieId(state.context),
    }),
  }
}

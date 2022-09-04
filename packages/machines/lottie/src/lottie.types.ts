import type { StateMachine as S } from "@zag-js/core"
import type { CommonProperties, Context, DirectionProperty, RequiredBy } from "@zag-js/types"
import { AnimationConfigWithData, AnimationItem } from "lottie-web"

type PublicContext = DirectionProperty &
  CommonProperties &
  Omit<AnimationConfigWithData, "container" | "animationData"> & {
    animationData: unknown
    onComplete?: AnimationEventHandler | null
    onLoopComplete?: AnimationEventHandler | null
    onEnterFrame?: AnimationEventHandler | null
    onSegmentStart?: AnimationEventHandler | null
    onConfigReady?: AnimationEventHandler | null
    onDataReady?: AnimationEventHandler | null
    onDataFailed?: AnimationEventHandler | null
    onLoadedImages?: AnimationEventHandler | null
    onDOMLoaded?: AnimationEventHandler | null
    onDestroy?: AnimationEventHandler | null
    interactivity?: Interactivity
  }

type PrivateContext = Context<{
  /**
   * @internal
   */
  lottiePlayer: AnimationItem | null
}>

type ComputedContext = Readonly<{}>

export type UserDefinedContext = RequiredBy<PublicContext, "id">

export type MachineContext = PublicContext & PrivateContext & ComputedContext

export type MachineState = {
  value: "unknown"
}

export type State = S.State<MachineContext, MachineState>

export type Send = S.Send<S.AnyEventObject>

type AnimationEventHandler = () => void

type Axis = "x" | "y"

type ActionType = "seek" | "play" | "stop" | "loop" | "toggle"
type Frames = [number] | [number, number] | string
type Visibility = [number, number]
type Position = { [key in Axis]: number | [number, number] }

type ActionState = unknown
type Transition = unknown

type Action = {
  position?: Position
  visibility?: Visibility
  type?: ActionType
  forceFlag?: boolean
  state?: ActionState
  transition?: Transition
  frames?: Frames
  reset?: boolean
  count?: number
  repeat?: number
  path?: string
}

type Interactivity = {
  actions: Action[]
  mode: "scroll" | "cursor" | "chain"
}

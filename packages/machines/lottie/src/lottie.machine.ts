import lottie, { AnimationConfigWithData } from "lottie-web"
import syncLottieInteractivity from "@lottiefiles/lottie-interactivity"

import { createMachine, ref } from "@zag-js/core"
import { MachineContext, MachineState, UserDefinedContext } from "./lottie.types"
import { dom } from "./lottie.dom"

export function machine(ctx: UserDefinedContext) {
  return createMachine<MachineContext, MachineState>(
    {
      id: "lottie",
      initial: "unknown",
      context: {
        lottiePlayer: null,
        animationData: {},
        ...ctx,
      },

      watch: {
        autoplay: "updateAutoplay",
        initialSegment: "updateInitialSegment",
      },

      activities: ["loadAnimation", "loadInteractivity"],

      on: {
        PLAY: {
          actions: (ctx) => {
            ctx.lottiePlayer?.play()
          },
        },
        STOP: {
          actions: (ctx) => {
            ctx.lottiePlayer?.stop()
          },
        },
        PAUSE: {
          actions: (ctx) => {
            ctx.lottiePlayer?.pause()
          },
        },
        SET_SPEED: {
          actions: (ctx, evt) => {
            ctx.lottiePlayer?.setSpeed(evt.speed)
          },
        },
        GOTO_AND_PLAY: {
          actions: (ctx, evt) => {
            ctx.lottiePlayer?.goToAndPlay(evt.value, evt.isFrame)
          },
        },
        GOTO_AND_STOP: {
          actions: (ctx, evt) => {
            ctx.lottiePlayer?.goToAndStop(evt.value, evt.isFrame)
          },
        },
        SET_DIRECTION: {
          actions: (ctx, evt) => {
            ctx.lottiePlayer?.setDirection(evt.direction)
          },
        },
        PLAY_SEGMENTS: {
          actions: (ctx, evt) => {
            ctx.lottiePlayer?.playSegments(evt.segments, evt.forceFlag)
          },
        },
        SET_SUBFRAMES: {
          actions: (ctx, evt) => {
            ctx.lottiePlayer?.setSubframe(evt.useSubFrames)
          },
        },
        DESTROY: {
          actions: (ctx) => {
            ctx.lottiePlayer?.destroy()

            // Removing the reference to the animation so separate cleanups are skipped.
            // Without it the internal `lottie-react` instance throws exceptions as it already cleared itself on destroy.
            ctx.lottiePlayer = null
          },
        },
      },

      states: {
        unknown: {
          on: {
            SETUP: {
              actions: ["loadAnimation", "loadInteractivity"],
            },
          },
        },
      },
    },
    {
      actions: {
        updateAutoplay(ctx) {
          if (!ctx.lottiePlayer) return
          ctx.lottiePlayer.autoplay = !!ctx.autoplay
        },
        updateInitialSegment(ctx) {
          if (!ctx.lottiePlayer) return

          // When null should reset to default animation length
          if (!ctx.initialSegment) {
            ctx.lottiePlayer.resetSegments(true)
            return
          }

          // If it's not a valid segment, do nothing
          if (!Array.isArray(ctx.initialSegment) || !ctx.initialSegment.length) {
            return
          }

          // If the current position it's not in the new segment
          // set the current position to start
          if (
            ctx.lottiePlayer.currentRawFrame < ctx.initialSegment[0] ||
            ctx.lottiePlayer.currentRawFrame > ctx.initialSegment[1]
          ) {
            ctx.lottiePlayer.currentRawFrame = ctx.initialSegment[0]
          }

          // Update the segment
          ctx.lottiePlayer.setSegment(ctx.initialSegment[0], ctx.initialSegment[1])
        },
      },
      activities: {
        loadAnimation(ctx) {
          const el = dom.getLottieEl(ctx)

          if (!el) return

          // Destroy any previous instance
          ctx.lottiePlayer?.destroy()

          // Build the animation configuration
          const config: AnimationConfigWithData = {
            ...ctx,
            container: el,
          }

          // Save the animation instance
          ctx.lottiePlayer = ref(lottie.loadAnimation(config))

          // Return a function that will clean up
          return () => {
            ctx.lottiePlayer?.destroy()
          }
        },
        loadInteractivity(ctx) {
          if (!ctx.interactivity || !ctx.lottiePlayer) return

          syncLottieInteractivity({
            player: ctx.lottiePlayer,
            ...ctx.interactivity,
          })
        },
      },
    },
  )
}

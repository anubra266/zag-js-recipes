import { defineDomHelpers } from "@zag-js/dom-utils"
import type { MachineContext as Ctx } from "./lottie.types"

export const dom = defineDomHelpers({
  getLottieId: (ctx: Ctx) => `lottie:${ctx.id}:item`,
  getLottieEl: (ctx: Ctx) => dom.getById(ctx, dom.getLottieId(ctx)),
})

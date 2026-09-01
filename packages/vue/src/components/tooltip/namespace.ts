// Compound namespace: mirrors the React dot-notation API
// (Tooltip.Trigger, Tooltip.Content, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Tooltip from './Tooltip.vue'
import TooltipArrow from './TooltipArrow.vue'
import TooltipContent from './TooltipContent.vue'
import TooltipTrigger from './TooltipTrigger.vue'

type TooltipCompound = typeof Tooltip & {
  Arrow: typeof TooltipArrow
  Content: typeof TooltipContent
  Root: typeof Tooltip
  Trigger: typeof TooltipTrigger
}

export const TooltipNamespace: TooltipCompound = Object.assign(Tooltip, {
  Arrow: TooltipArrow,
  Content: TooltipContent,
  Root: Tooltip,
  Trigger: TooltipTrigger,
})

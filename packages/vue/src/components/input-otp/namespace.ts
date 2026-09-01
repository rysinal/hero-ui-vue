// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import InputOTP from './InputOTP.vue'
import InputOTPGroup from './InputOTPGroup.vue'
import InputOTPSeparator from './InputOTPSeparator.vue'
import InputOTPSlot from './InputOTPSlot.vue'

type InputOTPCompound = typeof InputOTP & {
  Group: typeof InputOTPGroup
  Root: typeof InputOTP
  Separator: typeof InputOTPSeparator
  Slot: typeof InputOTPSlot
}

export const InputOTPNamespace: InputOTPCompound = Object.assign(InputOTP, {
  Group: InputOTPGroup,
  Root: InputOTP,
  Separator: InputOTPSeparator,
  Slot: InputOTPSlot,
})

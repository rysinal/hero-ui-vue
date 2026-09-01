// InputOTP carries the dot-notation parts (InputOTP.Root, ...)
// while every part stays available as a flat export below.
export { InputOTPNamespace as InputOTP } from './namespace'
export { default as InputOTPRoot } from './InputOTP.vue'
export {
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_CHARS_AND_DIGITS,
  REGEXP_ONLY_DIGITS,
} from './patterns'
export { default as InputOTPGroup } from './InputOTPGroup.vue'
export { default as InputOTPSlot } from './InputOTPSlot.vue'
export { default as InputOTPSeparator } from './InputOTPSeparator.vue'
export type { InputOTPVariants } from '@rysinal/heroui-vue-styles'

// Compound namespace: mirrors the React dot-notation API
// (Radio.Control, Radio.Indicator, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Radio from './Radio.vue'
import RadioContent from './RadioContent.vue'
import RadioControl from './RadioControl.vue'
import RadioIndicator from './RadioIndicator.vue'

type RadioCompound = typeof Radio & {
  Content: typeof RadioContent
  Control: typeof RadioControl
  Indicator: typeof RadioIndicator
  Root: typeof Radio
}

export const RadioNamespace: RadioCompound = Object.assign(Radio, {
  Content: RadioContent,
  Control: RadioControl,
  Indicator: RadioIndicator,
  Root: Radio,
})

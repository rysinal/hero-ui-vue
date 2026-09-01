// Compound namespace: mirrors the React dot-notation API
// (Switch.Control, Switch.Thumb, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Switch from './Switch.vue'
import SwitchContent from './SwitchContent.vue'
import SwitchControl from './SwitchControl.vue'
import SwitchIcon from './SwitchIcon.vue'
import SwitchThumb from './SwitchThumb.vue'

type SwitchCompound = typeof Switch & {
  Content: typeof SwitchContent
  Control: typeof SwitchControl
  Icon: typeof SwitchIcon
  Root: typeof Switch
  Thumb: typeof SwitchThumb
}

export const SwitchNamespace: SwitchCompound = Object.assign(Switch, {
  Content: SwitchContent,
  Control: SwitchControl,
  Icon: SwitchIcon,
  Root: Switch,
  Thumb: SwitchThumb,
})

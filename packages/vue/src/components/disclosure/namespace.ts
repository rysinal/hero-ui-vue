// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Disclosure from './Disclosure.vue'
import DisclosureBody from './DisclosureBody.vue'
import DisclosureContent from './DisclosureContent.vue'
import DisclosureHeading from './DisclosureHeading.vue'
import DisclosureIndicator from './DisclosureIndicator.vue'
import DisclosureTrigger from './DisclosureTrigger.vue'

type DisclosureCompound = typeof Disclosure & {
  Body: typeof DisclosureBody
  Content: typeof DisclosureContent
  Heading: typeof DisclosureHeading
  Indicator: typeof DisclosureIndicator
  Root: typeof Disclosure
  Trigger: typeof DisclosureTrigger
}

export const DisclosureNamespace: DisclosureCompound = Object.assign(Disclosure, {
  Body: DisclosureBody,
  Content: DisclosureContent,
  Heading: DisclosureHeading,
  Indicator: DisclosureIndicator,
  Root: Disclosure,
  Trigger: DisclosureTrigger,
})

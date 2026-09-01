// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Alert from './Alert.vue'
import AlertContent from './AlertContent.vue'
import AlertDescription from './AlertDescription.vue'
import AlertIndicator from './AlertIndicator.vue'
import AlertTitle from './AlertTitle.vue'

type AlertCompound = typeof Alert & {
  Content: typeof AlertContent
  Description: typeof AlertDescription
  Indicator: typeof AlertIndicator
  Root: typeof Alert
  Title: typeof AlertTitle
}

export const AlertNamespace: AlertCompound = Object.assign(Alert, {
  Content: AlertContent,
  Description: AlertDescription,
  Indicator: AlertIndicator,
  Root: Alert,
  Title: AlertTitle,
})

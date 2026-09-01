// Compound namespace: mirrors the React dot-notation API
// (Toast.Title, Toast.CloseButton, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Toast from './Toast.vue'
import ToastActionButton from './ToastActionButton.vue'
import ToastCloseButton from './ToastCloseButton.vue'
import ToastContent from './ToastContent.vue'
import ToastDescription from './ToastDescription.vue'
import ToastIndicator from './ToastIndicator.vue'
import ToastProvider from './ToastProvider.vue'
import ToastTitle from './ToastTitle.vue'

type ToastCompound = typeof Toast & {
  ActionButton: typeof ToastActionButton
  CloseButton: typeof ToastCloseButton
  Content: typeof ToastContent
  Description: typeof ToastDescription
  Indicator: typeof ToastIndicator
  Provider: typeof ToastProvider
  Root: typeof Toast
  Title: typeof ToastTitle
}

export const ToastNamespace: ToastCompound = Object.assign(Toast, {
  ActionButton: ToastActionButton,
  CloseButton: ToastCloseButton,
  Content: ToastContent,
  Description: ToastDescription,
  Indicator: ToastIndicator,
  Provider: ToastProvider,
  Root: Toast,
  Title: ToastTitle,
})

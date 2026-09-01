// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Breadcrumbs from './Breadcrumbs.vue'
import BreadcrumbsItem from './BreadcrumbsItem.vue'

type BreadcrumbsCompound = typeof Breadcrumbs & {
  Item: typeof BreadcrumbsItem
  Root: typeof Breadcrumbs
}

export const BreadcrumbsNamespace: BreadcrumbsCompound = Object.assign(Breadcrumbs, {
  Item: BreadcrumbsItem,
  Root: Breadcrumbs,
})

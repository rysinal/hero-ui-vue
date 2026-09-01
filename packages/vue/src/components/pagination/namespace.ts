// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Pagination from './Pagination.vue'
import PaginationContent from './PaginationContent.vue'
import PaginationEllipsis from './PaginationEllipsis.vue'
import PaginationItem from './PaginationItem.vue'
import PaginationLink from './PaginationLink.vue'
import PaginationNext from './PaginationNext.vue'
import PaginationNextIcon from './PaginationNextIcon.vue'
import PaginationPrevious from './PaginationPrevious.vue'
import PaginationPreviousIcon from './PaginationPreviousIcon.vue'
import PaginationSummary from './PaginationSummary.vue'

type PaginationCompound = typeof Pagination & {
  Content: typeof PaginationContent
  Ellipsis: typeof PaginationEllipsis
  Item: typeof PaginationItem
  Link: typeof PaginationLink
  Next: typeof PaginationNext
  NextIcon: typeof PaginationNextIcon
  Previous: typeof PaginationPrevious
  PreviousIcon: typeof PaginationPreviousIcon
  Root: typeof Pagination
  Summary: typeof PaginationSummary
}

export const PaginationNamespace: PaginationCompound = Object.assign(Pagination, {
  Content: PaginationContent,
  Ellipsis: PaginationEllipsis,
  Item: PaginationItem,
  Link: PaginationLink,
  Next: PaginationNext,
  NextIcon: PaginationNextIcon,
  Previous: PaginationPrevious,
  PreviousIcon: PaginationPreviousIcon,
  Root: Pagination,
  Summary: PaginationSummary,
})

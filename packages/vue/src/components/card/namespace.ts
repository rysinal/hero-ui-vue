// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Card from './Card.vue'
import CardContent from './CardContent.vue'
import CardDescription from './CardDescription.vue'
import CardFooter from './CardFooter.vue'
import CardHeader from './CardHeader.vue'
import CardTitle from './CardTitle.vue'

type CardCompound = typeof Card & {
  Content: typeof CardContent
  Description: typeof CardDescription
  Footer: typeof CardFooter
  Header: typeof CardHeader
  Root: typeof Card
  Title: typeof CardTitle
}

export const CardNamespace: CardCompound = Object.assign(Card, {
  Content: CardContent,
  Description: CardDescription,
  Footer: CardFooter,
  Header: CardHeader,
  Root: Card,
  Title: CardTitle,
})

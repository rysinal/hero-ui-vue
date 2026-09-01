// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import FieldGroup from './FieldGroup.vue'
import Fieldset from './Fieldset.vue'
import FieldsetActions from './FieldsetActions.vue'
import FieldsetLegend from './FieldsetLegend.vue'

type FieldsetCompound = typeof Fieldset & {
  Actions: typeof FieldsetActions
  Group: typeof FieldGroup
  Legend: typeof FieldsetLegend
  Root: typeof Fieldset
}

export const FieldsetNamespace: FieldsetCompound = Object.assign(Fieldset, {
  Actions: FieldsetActions,
  Group: FieldGroup,
  Legend: FieldsetLegend,
  Root: Fieldset,
})

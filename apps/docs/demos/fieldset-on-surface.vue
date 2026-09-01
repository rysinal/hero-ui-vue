<template>
  <Surface class="w-full max-w-md rounded-3xl p-6">
    <Fieldset>
      <FieldsetLegend>Shipping address</FieldsetLegend>
      <FieldGroup>
        <TextField name="street" variant="secondary">
          <Label>Street</Label>
          <Input class="w-full" placeholder="123 Main St" />
        </TextField>
        <TextField name="city" variant="secondary">
          <Label>City</Label>
          <Input class="w-full" placeholder="Springfield" />
          <Description>We only ship within the US</Description>
        </TextField>
      </FieldGroup>
      <FieldsetActions>
        <Button variant="secondary">Cancel</Button>
        <Button>Save</Button>
      </FieldsetActions>
    </Fieldset>
  </Surface>
</template>

<script setup lang="ts">
import {
  Button,
  Description,
  FieldGroup,
  Fieldset,
  FieldsetActions,
  FieldsetLegend,
  Input,
  Label,
  Surface,
  TextField,
} from '@rysinal/heroui-vue'
</script>

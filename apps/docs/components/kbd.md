# Kbd

Displays keyboard keys and shortcuts.

## Import

```ts
import { Kbd } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/kbd-basic.vue

:::

## Anatomy

`Kbd.Abbr` maps a key name to its glyph and an accessible label, so
`key-value="command"` renders ⌘ with `title="Command"`.

```vue
<template>
  <Kbd>
    <Kbd.Abbr key-value="command" />
    <Kbd.Content>K</Kbd.Content>
  </Kbd>
</template>
```

## Variants

:::preview

demo-preview=../demos/kbd-variants.vue

:::

## Special Keys

:::preview

demo-preview=../demos/kbd-special.vue

:::

## Navigation Keys

:::preview

demo-preview=../demos/kbd-navigation.vue

:::

## Inline Usage

:::preview

demo-preview=../demos/kbd-inline.vue

:::

## Instructional Text

:::preview

demo-preview=../demos/kbd-instructional.vue

:::

## API

### Kbd

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'light'` | `'default'` | Visual style |
| `keys` | `KbdKey[]` | `undefined` | Shortcut keys rendered as glyphs ahead of the content |
| `class` | `string` | `undefined` | Additional classes |

### Kbd.Abbr

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `keyValue` | `KbdKey` | — | The key to render |
| `class` | `string` | `undefined` | Additional classes |

### Kbd.Content

Wraps literal text such as a letter key.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `undefined` | Additional classes |

### Supported keys

`command` `shift` `ctrl` `option` `enter` `delete` `escape` `tab` `capslock`
`up` `right` `down` `left` `pageup` `pagedown` `home` `end` `help` `space`
`fn` `win` `alt`

The maps are exported as `kbdKeysMap` and `kbdKeysLabelMap`.

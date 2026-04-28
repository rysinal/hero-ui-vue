# Findings: HeroUI Vue 3 Port Research

## Research Date
2026-04-28

---

## HeroUI React Architecture Analysis

### Core Architecture Principles

1. **Compound Component Pattern**
   - Components export multiple sub-components (Root, Item, Trigger, Content, etc.)
   - Enables maximum flexibility and customization
   - Similar to Radix UI design philosophy
   - Example: `Accordion.Root`, `Accordion.Item`, `Accordion.Trigger`

2. **React Aria Components Foundation**
   - Built on top of React Aria Components for accessibility
   - Provides ARIA attributes, keyboard navigation, focus management
   - Transforms React Aria's prop-based API to Radix UI's composition-based API

3. **Styling System**
   - Tailwind CSS v4 as the foundation
   - BEM (Block Element Modifier) naming convention for CSS classes
   - `tailwind-variants` for variant management
   - Separate `.styles.ts` files for each component
   - CSS files in `@heroui/styles` package

4. **Monorepo Structure**
   - pnpm workspace with Turborepo
   - Packages: `react`, `styles`, `docs`, `storybook`, `standard`
   - Shared configurations across packages

### Component Structure Pattern

```typescript
// Context for sharing state/styles
const ComponentContext = createContext<{slots?: ReturnType<typeof componentVariants>}>({});

// Root component
const ComponentRoot = forwardRef(({children, className, ...props}, ref) => {
  const slots = useMemo(() => componentVariants({...}), [...]);
  
  return (
    <ComponentContext.Provider value={{slots}}>
      <ReactAriaComponent ref={ref} className={composeTwRenderProps(className, slots.base())}>
        {children}
      </ReactAriaComponent>
    </ComponentContext.Provider>
  );
});

// Child components consume context
const ComponentItem = forwardRef(({className, ...props}, ref) => {
  const {slots} = useContext(ComponentContext);
  
  return (
    <ReactAriaComponent ref={ref} className={composeTwRenderProps(className, slots?.item())}>
      {props.children}
    </ReactAriaComponent>
  );
});

// Export pattern
export const Component = Object.assign(ComponentRoot, {
  Root: ComponentRoot,
  Item: ComponentItem,
  // ... other parts
});
```

### Key Utilities

1. **composeTwRenderProps**: Merges Tailwind classes with render props
2. **focusRingClasses**: Consistent focus styling
3. **disabledClasses**: Disabled state styling
4. **mapPropsVariants**: Separates variant props from component props

### Component Categories (80+ Total)

#### Foundation (10 components)
- Button, Link, Text, Label, Description, FieldError, Spinner, Separator, Kbd, CloseButton

#### Forms (15 components)
- TextField, TextArea, Input, InputGroup, Checkbox, CheckboxGroup, Radio, RadioGroup, Switch, SwitchGroup, Select, ComboBox, Autocomplete, SearchField, NumberField

#### Layout & Navigation (12 components)
- Accordion, Tabs, Disclosure, DisclosureGroup, Breadcrumbs, Pagination, Toolbar, Card, Surface, Fieldset, Form, ScrollShadow

#### Overlays (8 components)
- Popover, Tooltip, Modal, Drawer, AlertDialog, Dropdown, Menu, ListBox

#### Data Display (12 components)
- Avatar, Badge, Chip, Tag, TagGroup, Table, Skeleton, ProgressBar, ProgressCircle, Meter, EmptyState, Header

#### Date & Time (8 components)
- Calendar, RangeCalendar, DateField, DatePicker, DateRangePicker, TimeField, DateInputGroup, CalendarYearPicker

#### Color (6 components)
- ColorPicker, ColorArea, ColorSlider, ColorField, ColorSwatch, ColorSwatchPicker

#### Advanced (9 components)
- Slider, ToggleButton, ToggleButtonGroup, ButtonGroup, InputOTP, Toast, Alert, MenuSection, ListBoxSection

---

## Vue 3 Ecosystem Research

### Radix Vue
- **Purpose**: Vue port of Radix UI primitives
- **Status**: Active development, production-ready
- **Coverage**: Most Radix UI primitives available
- **API**: Similar to Radix UI but with Vue idioms (v-model, slots)
- **Accessibility**: Full ARIA support, keyboard navigation
- **Documentation**: https://www.radix-vue.com/

### Available Radix Vue Primitives

#### Navigation
- Accordion, Tabs, NavigationMenu, Menubar, ContextMenu

#### Overlays
- Dialog, AlertDialog, Popover, Tooltip, HoverCard, DropdownMenu

#### Forms
- Checkbox, RadioGroup, Switch, Select, Combobox, Slider, Toggle, ToggleGroup

#### Data Display
- Avatar, Progress, Separator, ScrollArea

#### Utilities
- Label, Collapsible, AspectRatio, Presence, Portal, Primitive

### Key Differences: React Aria vs Radix Vue

| Feature | React Aria | Radix Vue |
|---------|-----------|-----------|
| API Style | Props-based | Composition-based |
| State Management | Hooks | Composables |
| Slots | Render props | Vue slots |
| Events | onEvent props | @event directives |
| Two-way binding | Controlled components | v-model |
| Refs | forwardRef | defineExpose |

### Vue 3 Composition API Patterns

```typescript
// Context pattern (provide/inject)
const ComponentKey = Symbol('Component');

export const useComponentContext = () => {
  const context = inject(ComponentKey);
  if (!context) throw new Error('Component must be used within ComponentRoot');
  return context;
};

// Root component
export const ComponentRoot = defineComponent({
  setup(props, { slots }) {
    const state = reactive({...});
    provide(ComponentKey, state);
    return () => slots.default?.();
  }
});

// Child component
export const ComponentItem = defineComponent({
  setup(props, { slots }) {
    const context = useComponentContext();
    return () => slots.default?.();
  }
});
```

---

## Styling System Analysis

### Tailwind CSS v4 Features
- Native CSS cascade layers
- New `@theme` directive
- Improved performance
- Better TypeScript support
- CSS-first configuration

### BEM Naming Convention
```css
/* Block */
.button { }

/* Element */
.button__icon { }

/* Modifier */
.button--primary { }
.button--lg { }
```

### Default Size Pattern (Critical)
```css
/* Base includes default size (--md equivalent) */
.avatar {
  @apply size-10; /* Default size */
}

/* Size variants */
.avatar--sm { @apply size-8; }
.avatar--md { /* Empty - this is the default */ }
.avatar--lg { @apply size-12; }
```

### Tailwind Variants Usage
```typescript
import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: 'button',
  variants: {
    variant: {
      primary: 'button--primary',
      secondary: 'button--secondary',
    },
    size: {
      sm: 'button--sm',
      md: 'button--md',
      lg: 'button--lg',
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  }
});
```

---

## Technical Challenges & Solutions

### Challenge 1: React Aria Components → Radix Vue
**Problem**: React Aria Components API differs from Radix Vue
**Solution**: 
- Map React Aria primitives to Radix Vue equivalents
- Create adapter layer where needed
- Document API differences

### Challenge 2: Render Props → Vue Slots
**Problem**: React render props pattern doesn't exist in Vue
**Solution**:
- Use scoped slots for dynamic content
- Provide slot props for state access
- Use composables for shared logic

### Challenge 3: forwardRef → defineExpose
**Problem**: Vue doesn't have forwardRef
**Solution**:
- Use `defineExpose` to expose component methods
- Use template refs for DOM access
- Document ref usage patterns

### Challenge 4: Context API → Provide/Inject
**Problem**: Different context mechanisms
**Solution**:
- Use provide/inject with Symbol keys
- Create composables for context access
- Add error handling for missing context

### Challenge 5: Compound Components Export
**Problem**: Vue doesn't have Object.assign pattern
**Solution**:
- Export components individually
- Create namespace object for convenience
- Document both import patterns

---

## Component Mapping Strategy

### React → Vue Equivalents

| React Pattern | Vue Pattern |
|---------------|-------------|
| `useState` | `ref`, `reactive` |
| `useEffect` | `watchEffect`, `watch` |
| `useContext` | `inject` |
| `useMemo` | `computed` |
| `useCallback` | `computed` (returns function) |
| `forwardRef` | `defineExpose` |
| `children` | `slots.default` |
| `className` | `class` |
| `onChange` | `@change` or `v-model` |

### Example: Button Component Port

**React Version:**
```tsx
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, ...props }, ref) => {
    const styles = buttonVariants({ variant, size });
    return (
      <button ref={ref} className={cn(styles, className)} {...props}>
        {children}
      </button>
    );
  }
);
```

**Vue Version:**
```vue
<script setup lang="ts">
import { computed } from 'vue';
import { buttonVariants } from './button.styles';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
});

const buttonClass = computed(() => 
  buttonVariants({ 
    variant: props.variant, 
    size: props.size,
    class: props.class 
  })
);
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
```

---

## Build & Tooling Decisions

### Build Tool: Vite
**Rationale**:
- Fast HMR for development
- Native ESM support
- Excellent TypeScript support
- Vue 3 recommended tool
- Plugin ecosystem

### Testing: Vitest + Vue Test Utils
**Rationale**:
- Vite integration
- Fast execution
- Jest-compatible API
- Great Vue support
- Component testing utilities

### Documentation: VitePress
**Rationale**:
- Vue-native
- Fast and modern
- Markdown-based
- Component playground support
- Great DX

### Storybook: Storybook 8 for Vue 3
**Rationale**:
- Industry standard
- Component isolation
- Visual testing
- Documentation generation
- Addon ecosystem

---

## Accessibility Considerations

### WCAG 2.1 AA Requirements
- Keyboard navigation for all interactive elements
- Focus indicators visible
- ARIA labels and descriptions
- Screen reader support
- Color contrast ratios
- Touch target sizes (44x44px minimum)

### Radix Vue Accessibility Features
- Built-in ARIA attributes
- Keyboard navigation patterns
- Focus management
- Screen reader announcements
- Roving tabindex
- Escape key handling

### Testing Strategy
- Automated: axe-core, eslint-plugin-vuejs-accessibility
- Manual: Screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard: Tab, Arrow keys, Enter, Space, Escape
- Visual: Focus indicators, color contrast

---

## Performance Considerations

### Bundle Size Optimization
- Tree-shaking support
- Individual component imports
- CSS purging with Tailwind
- Code splitting
- Lazy loading for heavy components

### Runtime Performance
- Virtual scrolling for large lists
- Debounced inputs
- Memoized computations
- Efficient reactivity
- Minimal re-renders

### Build Performance
- Vite's fast builds
- Incremental compilation
- Parallel processing
- Caching strategies

---

## Migration Path for Users

### From HeroUI React
1. Component names remain the same
2. Props API similar but Vue-idiomatic
3. Events use `@` instead of `on` prefix
4. Two-way binding with `v-model`
5. Slots instead of children prop
6. Template refs instead of forwardRef

### Example Migration

**React:**
```tsx
<TextField
  label="Email"
  value={email}
  onChange={setEmail}
  isRequired
/>
```

**Vue:**
```vue
<TextField
  label="Email"
  v-model="email"
  :required="true"
/>
```

---

## Open Questions

1. **Component Naming**: Keep React names or use Vue conventions?
   - Decision: Keep React names for consistency
   
2. **v-model Support**: Which components should support v-model?
   - Decision: All form components

3. **Slots vs Props**: When to use slots vs props for content?
   - Decision: Follow Radix Vue patterns

4. **TypeScript Strictness**: How strict should types be?
   - Decision: Strict mode enabled, full type coverage

5. **SSR Support**: Nuxt compatibility required?
   - Decision: Yes, test with Nuxt 3

---

## Resources

### Documentation
- HeroUI React: https://heroui.com
- Radix Vue: https://www.radix-vue.com
- Vue 3: https://vuejs.org
- Tailwind CSS v4: https://tailwindcss.com
- Vite: https://vitejs.dev
- VitePress: https://vitepress.dev

### Repositories
- HeroUI React: https://github.com/heroui-inc/heroui
- Radix Vue: https://github.com/radix-vue/radix-vue
- Vue 3: https://github.com/vuejs/core

### Community
- HeroUI Discord: https://discord.gg/9b6yyZKmH4
- Vue Discord: https://discord.com/invite/vue
- Radix Vue Discord: https://chat.radix-vue.com

---

**Last Updated**: 2026-04-28

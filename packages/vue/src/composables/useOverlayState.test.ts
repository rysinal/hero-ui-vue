import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { useOverlayState } from './useOverlayState'

describe('useOverlayState', () => {
  it('starts closed by default', () => {
    const state = useOverlayState()

    expect(state.isOpen.value).toBe(false)
  })

  it('honours defaultOpen when uncontrolled', () => {
    const state = useOverlayState({ defaultOpen: true })

    expect(state.isOpen.value).toBe(true)
  })

  it('opens, closes and toggles when uncontrolled', () => {
    const state = useOverlayState()

    state.open()
    expect(state.isOpen.value).toBe(true)

    state.close()
    expect(state.isOpen.value).toBe(false)

    state.toggle()
    expect(state.isOpen.value).toBe(true)
  })

  it('does not mutate its own state when controlled', () => {
    const state = useOverlayState({ isOpen: false })

    state.open()
    expect(state.isOpen.value).toBe(false)
  })

  it('follows a controlled ref', async () => {
    const isOpen = ref(false)
    const state = useOverlayState({ isOpen })

    expect(state.isOpen.value).toBe(false)

    isOpen.value = true
    await nextTick()

    expect(state.isOpen.value).toBe(true)
  })

  it('reports every change through onOpenChange, controlled or not', () => {
    const onOpenChange = vi.fn()
    const state = useOverlayState({ onOpenChange })

    state.open()
    state.close()

    expect(onOpenChange).toHaveBeenNthCalledWith(1, true)
    expect(onOpenChange).toHaveBeenNthCalledWith(2, false)
  })

  it('still reports changes while controlled so the parent can commit them', () => {
    const onOpenChange = vi.fn()
    const state = useOverlayState({ isOpen: false, onOpenChange })

    state.open()

    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(state.isOpen.value).toBe(false)
  })

  it('accepts a getter for the controlled value', async () => {
    const source = ref(true)
    const state = useOverlayState({ isOpen: () => source.value })

    expect(state.isOpen.value).toBe(true)

    source.value = false
    await nextTick()

    expect(state.isOpen.value).toBe(false)
  })
})

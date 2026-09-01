import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { Color, parseColor } from '../color'

describe('parseColor', () => {
  it('parses hex in both lengths', () => {
    expect(parseColor('#f00').toString('rgb')).toBe('rgb(255, 0, 0)')
    expect(parseColor('#7434ff').toString('rgb')).toBe('rgb(116, 52, 255)')
  })

  it('parses rgb and rgba', () => {
    expect(parseColor('rgb(116, 52, 255)').red).toBe(116)
    expect(parseColor('rgba(0, 0, 0, 0.5)').alpha).toBe(0.5)
  })

  it('parses hsl and converts to rgb', () => {
    // hsl(0, 100%, 50%) is pure red.
    const color = parseColor('hsl(0, 100%, 50%)')
    expect([color.red, color.green, color.blue]).toEqual([255, 0, 0])
  })

  it('parses hsb', () => {
    const color = parseColor('hsb(120, 100%, 100%)')
    expect([color.red, color.green, color.blue]).toEqual([0, 255, 0])
  })

  it('rejects an unsupported value', () => {
    expect(() => parseColor('not-a-color')).toThrow(/Unsupported color/)
  })
})

describe('Color channels', () => {
  it('reads rgb and hsl channels', () => {
    const color = parseColor('hsl(200, 100%, 50%)')

    expect(color.getChannelValue('hue')).toBe(200)
    expect(color.getChannelValue('saturation')).toBe(100)
    expect(color.getChannelValue('lightness')).toBe(50)
  })

  it('returns a new colour rather than mutating', () => {
    const color = parseColor('hsl(0, 100%, 50%)')
    const next = color.withChannelValue('hue', 120)

    expect(color.getChannelValue('hue')).toBe(0)
    expect(next.getChannelValue('hue')).toBe(120)
    expect(next).not.toBe(color)
  })

  it('clamps a channel to its range', () => {
    const color = parseColor('rgb(0, 0, 0)')

    expect(color.withChannelValue('red', 999).red).toBe(255)
    expect(color.withChannelValue('red', -5).red).toBe(0)
  })

  it('round-trips through the format it was written in', () => {
    expect(parseColor('hsl(0, 100%, 50%)').toString()).toBe('hsl(0, 100%, 50%)')
    expect(parseColor('rgb(1, 2, 3)').toString()).toBe('rgb(1, 2, 3)')
    expect(parseColor('#7434ff').toString()).toBe('#7434ff')
  })

  it('keeps alpha in the css output', () => {
    expect(new Color(0, 0, 0, 0.5, 'rgb').toString()).toBe('rgba(0, 0, 0, 0.5)')
  })
})

describe('channel precision', () => {
  it('does not drift when a channel is set repeatedly', () => {
    // 8-bit rgb cannot represent every hue, so a naive implementation reads
    // hue 1 back as 0.94 and the value creeps on every keypress.
    let color = parseColor('hsl(0, 100%, 50%)')

    for (let expected = 1; expected <= 10; expected += 1) {
      color = color.withChannelValue('hue', color.getChannelValue('hue') + 1)
      expect(color.getChannelValue('hue')).toBe(expected)
    }
  })

  it('keeps saturation and lightness while the hue moves', () => {
    const color = parseColor('hsl(200, 40%, 60%)').withChannelValue('hue', 210)

    expect(color.getChannelValue('saturation')).toBe(40)
    expect(color.getChannelValue('lightness')).toBe(60)
  })

  it('forgets remembered channels once rgb is set directly', () => {
    const color = parseColor('hsl(0, 100%, 50%)').withChannelValue('green', 128)

    // Setting rgb re-derives the polar channels rather than reusing stale ones.
    expect(color.green).toBe(128)
    expect(color.getChannelValue('hue')).toBeCloseTo(30, 0)
  })
})

describe('reactivity', () => {
  it('keeps exact channels when held in a deep ref', () => {
    // A deep ref proxies the instance, and a naive implementation keyed on
    // object identity loses the remembered channels through the proxy.
    const held = ref(parseColor('hsl(0, 100%, 50%)'))
    held.value = held.value.withChannelValue('hue', 1)

    expect(held.value.getChannelValue('hue')).toBe(1)
  })
})

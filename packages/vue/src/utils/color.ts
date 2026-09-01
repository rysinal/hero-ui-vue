/**
 * A small colour model for the colour components. React uses
 * @react-stately/color; this covers the same surface those components need —
 * parsing, per-channel access, and conversion between rgb, hsl and hsb.
 */

export type ColorFormat = 'rgb' | 'hsl' | 'hsb' | 'hex'
export type ColorChannel =
  | 'red'
  | 'green'
  | 'blue'
  | 'hue'
  | 'saturation'
  | 'lightness'
  | 'brightness'
  | 'alpha'

export interface ColorChannelRange {
  minValue: number
  maxValue: number
  step: number
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const round = (value: number, places = 2) => {
  const factor = 10 ** places
  return Math.round(value * factor) / factor
}

const CHANNEL_RANGES: Record<ColorChannel, ColorChannelRange> = {
  alpha: { maxValue: 1, minValue: 0, step: 0.01 },
  blue: { maxValue: 255, minValue: 0, step: 1 },
  brightness: { maxValue: 100, minValue: 0, step: 1 },
  green: { maxValue: 255, minValue: 0, step: 1 },
  hue: { maxValue: 360, minValue: 0, step: 1 },
  lightness: { maxValue: 100, minValue: 0, step: 1 },
  red: { maxValue: 255, minValue: 0, step: 1 },
  saturation: { maxValue: 100, minValue: 0, step: 1 },
}

const rgbToHsl = (r: number, g: number, b: number) => {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const delta = max - min
  const lightness = (max + min) / 2

  let hue = 0
  if (delta !== 0) {
    if (max === rn) hue = ((gn - bn) / delta) % 6
    else if (max === gn) hue = (bn - rn) / delta + 2
    else hue = (rn - gn) / delta + 4
    hue *= 60
    if (hue < 0) hue += 360
  }

  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))

  return { hue, lightness: lightness * 100, saturation: saturation * 100 }
}

const hslToRgb = (h: number, s: number, l: number) => {
  const sn = s / 100
  const ln = l / 100
  const c = (1 - Math.abs(2 * ln - 1)) * sn
  const hp = ((h % 360) + 360) % 360 / 60
  const x = c * (1 - Math.abs((hp % 2) - 1))

  let rgb: [number, number, number]
  if (hp < 1) rgb = [c, x, 0]
  else if (hp < 2) rgb = [x, c, 0]
  else if (hp < 3) rgb = [0, c, x]
  else if (hp < 4) rgb = [0, x, c]
  else if (hp < 5) rgb = [x, 0, c]
  else rgb = [c, 0, x]

  const m = ln - c / 2
  return {
    blue: Math.round((rgb[2] + m) * 255),
    green: Math.round((rgb[1] + m) * 255),
    red: Math.round((rgb[0] + m) * 255),
  }
}

const rgbToHsb = (r: number, g: number, b: number) => {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const delta = max - min

  let hue = 0
  if (delta !== 0) {
    if (max === rn) hue = ((gn - bn) / delta) % 6
    else if (max === gn) hue = (bn - rn) / delta + 2
    else hue = (rn - gn) / delta + 4
    hue *= 60
    if (hue < 0) hue += 360
  }

  return {
    brightness: max * 100,
    hue,
    saturation: max === 0 ? 0 : (delta / max) * 100,
  }
}

const hsbToRgb = (h: number, s: number, v: number) => {
  const sn = s / 100
  const vn = v / 100
  const c = vn * sn
  const hp = ((h % 360) + 360) % 360 / 60
  const x = c * (1 - Math.abs((hp % 2) - 1))

  let rgb: [number, number, number]
  if (hp < 1) rgb = [c, x, 0]
  else if (hp < 2) rgb = [x, c, 0]
  else if (hp < 3) rgb = [0, c, x]
  else if (hp < 4) rgb = [0, x, c]
  else if (hp < 5) rgb = [x, 0, c]
  else rgb = [c, 0, x]

  const m = vn - c
  return {
    blue: Math.round((rgb[2] + m) * 255),
    green: Math.round((rgb[1] + m) * 255),
    red: Math.round((rgb[0] + m) * 255),
  }
}

/**
 * Key for the channels the caller actually set.
 *
 * 8-bit rgb cannot represent every hue, so round-tripping an edit through rgb
 * drifts: nudging hue from 0 reads back 0.94, and the value creeps on every
 * keypress. Remembering the authored value keeps repeated edits exact.
 *
 * It lives on the instance as a non-enumerable property rather than in a
 * WeakMap: a Vue deep ref proxies the Color, and anything keyed on object
 * identity would miss through the proxy.
 */
const EXACT = Symbol('heroui.color.exact')

const exactOf = (color: object): Partial<Record<ColorChannel, number>> =>
  (color as { [EXACT]?: Partial<Record<ColorChannel, number>> })[EXACT] ?? {}

export class Color {
  readonly red: number
  readonly green: number
  readonly blue: number
  readonly alpha: number
  /** Format the colour was written in, so toString() can round-trip it. */
  readonly format: ColorFormat

  constructor(
    red: number,
    green: number,
    blue: number,
    alpha = 1,
    format: ColorFormat = 'rgb',
    exact: Partial<Record<ColorChannel, number>> = {},
  ) {
    this.red = clamp(Math.round(red), 0, 255)
    this.green = clamp(Math.round(green), 0, 255)
    this.blue = clamp(Math.round(blue), 0, 255)
    this.alpha = clamp(alpha, 0, 1)
    this.format = format
    // Configurable so a reactive proxy can re-describe it; non-enumerable so
    // it stays out of the public shape.
    Object.defineProperty(this, EXACT, {
      configurable: true,
      enumerable: false,
      value: exact,
      writable: false,
    })
  }

  getChannelValue(channel: ColorChannel): number {
    const remembered = exactOf(this)[channel]
    if (remembered !== undefined) return remembered

    switch (channel) {
      case 'red':
        return this.red
      case 'green':
        return this.green
      case 'blue':
        return this.blue
      case 'alpha':
        return this.alpha
      case 'hue':
        return round(rgbToHsl(this.red, this.green, this.blue).hue)
      case 'saturation':
        return round(
          this.format === 'hsb'
            ? rgbToHsb(this.red, this.green, this.blue).saturation
            : rgbToHsl(this.red, this.green, this.blue).saturation,
        )
      case 'lightness':
        return round(rgbToHsl(this.red, this.green, this.blue).lightness)
      case 'brightness':
        return round(rgbToHsb(this.red, this.green, this.blue).brightness)
      default:
        return 0
    }
  }

  /** Returns a new colour with one channel replaced; never mutates. */
  withChannelValue(channel: ColorChannel, value: number): Color {
    const range = CHANNEL_RANGES[channel]
    const next = clamp(value, range.minValue, range.maxValue)

    if (channel === 'alpha') {
      return new Color(this.red, this.green, this.blue, next, this.format, exactOf(this))
    }
    if (channel === 'red' || channel === 'green' || channel === 'blue') {
      const rgb = { blue: this.blue, green: this.green, red: this.red }
      rgb[channel] = next
      // Changing rgb invalidates any remembered polar channels.
      return new Color(rgb.red, rgb.green, rgb.blue, this.alpha, this.format)
    }

    if (channel === 'brightness' || (channel === 'saturation' && this.format === 'hsb')) {
      const hsb = { ...rgbToHsb(this.red, this.green, this.blue), ...exactOf(this) }
      const updated = { ...hsb, [channel]: next }
      const rgb = hsbToRgb(updated.hue, updated.saturation, updated.brightness)
      return new Color(rgb.red, rgb.green, rgb.blue, this.alpha, this.format, {
        brightness: updated.brightness,
        hue: updated.hue,
        saturation: updated.saturation,
      })
    }

    const hsl = { ...rgbToHsl(this.red, this.green, this.blue), ...exactOf(this) }
    const updated = { ...hsl, [channel]: next }
    const rgb = hslToRgb(updated.hue, updated.saturation, updated.lightness)
    return new Color(rgb.red, rgb.green, rgb.blue, this.alpha, this.format, {
      hue: updated.hue,
      lightness: updated.lightness,
      saturation: updated.saturation,
    })
  }

  getChannelRange(channel: ColorChannel): ColorChannelRange {
    return CHANNEL_RANGES[channel]
  }

  toFormat(format: ColorFormat): Color {
    return new Color(this.red, this.green, this.blue, this.alpha, format, exactOf(this))
  }

  toString(format: ColorFormat | 'css' = 'css'): string {
    const target = format === 'css' ? this.format : format

    if (target === 'hex') {
      const hex = (value: number) => value.toString(16).padStart(2, '0')
      return `#${hex(this.red)}${hex(this.green)}${hex(this.blue)}`
    }

    if (target === 'hsl') {
      const { hue, lightness, saturation } = {
        ...rgbToHsl(this.red, this.green, this.blue),
        ...exactOf(this),
      }
      return this.alpha < 1
        ? `hsla(${round(hue, 0)}, ${round(saturation, 0)}%, ${round(lightness, 0)}%, ${round(this.alpha)})`
        : `hsl(${round(hue, 0)}, ${round(saturation, 0)}%, ${round(lightness, 0)}%)`
    }

    if (target === 'hsb') {
      const { brightness, hue, saturation } = {
        ...rgbToHsb(this.red, this.green, this.blue),
        ...exactOf(this),
      }
      return `hsb(${round(hue, 0)}, ${round(saturation, 0)}%, ${round(brightness, 0)}%)`
    }

    return this.alpha < 1
      ? `rgba(${this.red}, ${this.green}, ${this.blue}, ${round(this.alpha)})`
      : `rgb(${this.red}, ${this.green}, ${this.blue})`
  }
}

const HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i
const FN_RE = /^(rgba?|hsla?|hsba?)\(([^)]+)\)$/i

/**
 * Parses a CSS colour string. Accepts hex, rgb/rgba, hsl/hsla and hsb.
 * Throws on anything else, matching React's parseColor.
 */
export function parseColor(value: string): Color {
  const input = value.trim()

  const hex = HEX_RE.exec(input)
  if (hex) {
    let digits = hex[1]!
    if (digits.length === 3) digits = digits.split('').map((d) => d + d).join('')
    const red = parseInt(digits.slice(0, 2), 16)
    const green = parseInt(digits.slice(2, 4), 16)
    const blue = parseInt(digits.slice(4, 6), 16)
    const alpha = digits.length === 8 ? parseInt(digits.slice(6, 8), 16) / 255 : 1
    return new Color(red, green, blue, alpha, 'hex')
  }

  const fn = FN_RE.exec(input)
  if (fn) {
    const name = fn[1]!.toLowerCase()
    const parts = fn[2]!
      .split(/[,/]/)
      .map((part) => part.trim())
      .filter(Boolean)
    const numbers = parts.map((part) => Number.parseFloat(part))
    const alpha = numbers.length > 3 ? (numbers[3] ?? 1) : 1

    if (name.startsWith('rgb')) {
      return new Color(numbers[0] ?? 0, numbers[1] ?? 0, numbers[2] ?? 0, alpha, 'rgb')
    }
    if (name.startsWith('hsl')) {
      const [hue = 0, saturation = 0, lightness = 0] = numbers
      const rgb = hslToRgb(hue, saturation, lightness)
      return new Color(rgb.red, rgb.green, rgb.blue, alpha, 'hsl', {
        hue,
        lightness,
        saturation,
      })
    }
    const [hue = 0, saturation = 0, brightness = 0] = numbers
    const rgb = hsbToRgb(hue, saturation, brightness)
    return new Color(rgb.red, rgb.green, rgb.blue, alpha, 'hsb', {
      brightness,
      hue,
      saturation,
    })
  }

  throw new Error(`Unsupported color value: ${value}`)
}

/** Parses a string, or passes an existing Color straight through. */
export const toColor = (value: string | Color): Color =>
  typeof value === 'string' ? parseColor(value) : value

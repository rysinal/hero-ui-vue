import { CalendarDate } from '@internationalized/date'
import { describe, expect, it } from 'vitest'
import { buildSegments } from './segments'

describe('buildSegments', () => {
  it('shows placeholders when there is no value', () => {
    const segments = buildSegments(null, 'en-US')
    const editable = segments.filter((segment) => segment.isEditable)

    expect(editable.map((segment) => segment.text)).toEqual(['mm', 'dd', 'yyyy'])
    expect(editable.every((segment) => segment.isPlaceholder)).toBe(true)
  })

  it('pads the parts of a real date', () => {
    const segments = buildSegments(new CalendarDate(2026, 9, 5), 'en-US')
    const editable = segments.filter((segment) => segment.isEditable)

    expect(editable.map((segment) => segment.text)).toEqual(['09', '05', '2026'])
    expect(editable.every((segment) => segment.isPlaceholder)).toBe(false)
  })

  it('follows the locale field order', () => {
    // en-US is month/day/year; en-GB is day/month/year.
    const us = buildSegments(new CalendarDate(2026, 9, 5), 'en-US')
      .filter((segment) => segment.isEditable)
      .map((segment) => segment.type)
    const gb = buildSegments(new CalendarDate(2026, 9, 5), 'en-GB')
      .filter((segment) => segment.isEditable)
      .map((segment) => segment.type)

    expect(us).toEqual(['month', 'day', 'year'])
    expect(gb).toEqual(['day', 'month', 'year'])
  })

  it('keeps the separators between the parts', () => {
    const literals = buildSegments(new CalendarDate(2026, 9, 5), 'en-US').filter(
      (segment) => segment.type === 'literal',
    )

    expect(literals.length).toBeGreaterThan(0)
    expect(literals.every((segment) => !segment.isEditable)).toBe(true)
  })

  it('reports the range each part accepts', () => {
    const segments = buildSegments(new CalendarDate(2026, 9, 5), 'en-US')
    const month = segments.find((segment) => segment.type === 'month')!
    const day = segments.find((segment) => segment.type === 'day')!

    expect([month.minValue, month.maxValue]).toEqual([1, 12])
    expect([day.minValue, day.maxValue]).toEqual([1, 31])
  })

  it('adds time parts at finer granularity', () => {
    const types = buildSegments(new CalendarDate(2026, 9, 5), 'en-US', 'minute')
      .filter((segment) => segment.isEditable)
      .map((segment) => segment.type)

    expect(types).toContain('hour')
    expect(types).toContain('minute')
    expect(types).toContain('dayPeriod')
  })

  it('drops the day period in a 24 hour cycle', () => {
    const types = buildSegments(new CalendarDate(2026, 9, 5), 'en-US', 'minute', 24)
      .filter((segment) => segment.isEditable)
      .map((segment) => segment.type)

    expect(types).not.toContain('dayPeriod')
  })
})

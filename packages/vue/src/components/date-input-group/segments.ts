import type { CalendarDateTime, DateValue, ZonedDateTime } from '@internationalized/date'
import { Time } from '@internationalized/date'
import type { DateSegment, DateSegmentType } from './context'

/**
 * Anything carrying a wall-clock time. `@internationalized/date` does not ship
 * this union (React picks it up from react-aria), so it is declared here.
 */
export type TimeValue = Time | CalendarDateTime | ZonedDateTime

export type DateGranularity = 'day' | 'hour' | 'minute' | 'second'

/** TimeField only ever edits the clock parts, so it has its own granularity. */
export type TimeGranularity = 'hour' | 'minute' | 'second'

const PLACEHOLDERS: Partial<Record<DateSegmentType, string>> = {
  day: 'dd',
  dayPeriod: 'AM',
  hour: 'hh',
  minute: 'mm',
  month: 'mm',
  second: 'ss',
  year: 'yyyy',
}

const pad = (value: number, length: number) => String(value).padStart(length, '0')

/**
 * Splits a date into the editable parts plus the literals between them, using
 * the locale's own field order so day/month land the right way round.
 */
export function buildSegments(
  value: DateValue | null,
  locale: string,
  granularity: DateGranularity = 'day',
  hourCycle: 12 | 24 = 12,
): DateSegment[] {
  const withTime = granularity !== 'day'

  const formatter = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    // The reference instant below is built with Date.UTC, so the formatter has
    // to read it back in UTC. Without this the local offset shifts the hour and,
    // past a large enough offset, reports the wrong half of the day.
    timeZone: 'UTC',
    ...(withTime
      ? { hour: '2-digit', hour12: hourCycle === 12, minute: '2-digit' }
      : {}),
    ...(granularity === 'second' ? { second: '2-digit' } : {}),
  })

  // Format a reference date purely to learn the locale's part order. The clock
  // parts have to come from the value, since the day period is read back from
  // this instant rather than recomputed.
  const reference = value ?? { day: 1, month: 1, year: 2000 }
  const withClock = reference as { hour?: number; minute?: number; second?: number }
  const parts = formatter.formatToParts(
    new Date(
      Date.UTC(
        reference.year,
        reference.month - 1,
        reference.day,
        withClock.hour ?? 12,
        withClock.minute ?? 0,
        withClock.second ?? 0,
      ),
    ),
  )

  const readValue = (type: DateSegmentType): number | undefined => {
    if (!value) return undefined
    switch (type) {
      case 'year':
        return value.year
      case 'month':
        return value.month
      case 'day':
        return value.day
      case 'hour':
        return (value as { hour?: number }).hour
      case 'minute':
        return (value as { minute?: number }).minute
      case 'second':
        return (value as { second?: number }).second
      default:
        return undefined
    }
  }

  const rangeFor = (type: DateSegmentType) => {
    switch (type) {
      case 'year':
        return { maxValue: 9999, minValue: 1 }
      case 'month':
        return { maxValue: 12, minValue: 1 }
      case 'day':
        return { maxValue: 31, minValue: 1 }
      case 'hour':
        return hourCycle === 12 ? { maxValue: 12, minValue: 1 } : { maxValue: 23, minValue: 0 }
      case 'minute':
      case 'second':
        return { maxValue: 59, minValue: 0 }
      default:
        return {}
    }
  }

  const widthFor = (type: DateSegmentType) => (type === 'year' ? 4 : 2)

  return parts
    .filter((part) => part.type !== 'dayPeriod' || hourCycle === 12)
    .map((part) => {
      const type = part.type as DateSegmentType

      if (type === 'literal') {
        return { isEditable: false, isPlaceholder: false, text: part.value, type }
      }

      if (type === 'dayPeriod') {
        return {
          isEditable: true,
          isPlaceholder: value === null,
          text: value ? part.value : PLACEHOLDERS.dayPeriod!,
          type,
        }
      }

      const current = readValue(type)
      const isPlaceholder = current === undefined
      // A 12-hour clock stores 0-23 but shows 12 for midnight and 1-12 after.
      const display =
        type === 'hour' && hourCycle === 12 && current !== undefined
          ? current % 12 === 0
            ? 12
            : current % 12
          : current

      return {
        ...rangeFor(type),
        isEditable: true,
        isPlaceholder,
        text: isPlaceholder ? (PLACEHOLDERS[type] ?? part.value) : pad(display!, widthFor(type)),
        type,
        value: current,
      }
    })
}

/**
 * Splits a time into its editable parts plus the literals between them, using
 * the locale's own field order and day-period placement.
 */
export function buildTimeSegments(
  value: TimeValue | null,
  locale: string,
  granularity: TimeGranularity = 'minute',
  hourCycle: 12 | 24 = 12,
): DateSegment[] {
  const formatter = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    hour12: hourCycle === 12,
    minute: '2-digit',
    // The reference instant below is built with Date.UTC, so the formatter has
    // to read it back in UTC. Without this the local offset shifts the hour and
    // flips the day period.
    timeZone: 'UTC',
    ...(granularity === 'second' ? { second: '2-digit' } : {}),
  })

  // Format a reference time purely to learn the locale's part order. Noon keeps
  // a 12-hour clock in the PM half, so the day period reads back correctly.
  const reference = value ?? new Time(12, 0, 0)
  const parts = formatter.formatToParts(
    new Date(Date.UTC(2000, 0, 1, reference.hour, reference.minute, reference.second)),
  )

  const readValue = (type: DateSegmentType): number | undefined => {
    if (!value) return undefined
    switch (type) {
      case 'hour':
        return value.hour
      case 'minute':
        return value.minute
      case 'second':
        return value.second
      default:
        return undefined
    }
  }

  const rangeFor = (type: DateSegmentType) => {
    switch (type) {
      case 'hour':
        // A 12-hour clock still stores 0-23; only the display wraps.
        return hourCycle === 12 ? { maxValue: 12, minValue: 1 } : { maxValue: 23, minValue: 0 }
      case 'minute':
      case 'second':
        return { maxValue: 59, minValue: 0 }
      default:
        return {}
    }
  }

  return parts
    .filter((part) => {
      if (part.type === 'dayPeriod') return hourCycle === 12
      // Drop the seconds the formatter adds when the caller did not ask for them.
      if (part.type === 'second') return granularity === 'second'
      return true
    })
    .map((part) => {
      const type = part.type as DateSegmentType

      if (type === 'literal') {
        return { isEditable: false, isPlaceholder: false, text: part.value, type }
      }

      if (type === 'dayPeriod') {
        return {
          isEditable: true,
          isPlaceholder: value === null,
          text: value ? part.value : PLACEHOLDERS.dayPeriod!,
          type,
        }
      }

      const current = readValue(type)
      const isPlaceholder = current === undefined
      // The 12-hour clock shows 12 for midnight and 1-12 for the rest.
      const display =
        type === 'hour' && hourCycle === 12 && current !== undefined
          ? current % 12 === 0
            ? 12
            : current % 12
          : current

      return {
        ...rangeFor(type),
        isEditable: true,
        isPlaceholder,
        text: isPlaceholder ? (PLACEHOLDERS[type] ?? part.value) : pad(display!, 2),
        type,
        value: current,
      }
    })
}

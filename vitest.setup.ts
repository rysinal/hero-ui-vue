/* global ResizeObserver */
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// jsdom has no ResizeObserver, but radix-vue measures elements on mount
// (Tooltip, Slider, ...). Without this the observers throw as unhandled
// rejections after the test body already passed.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver ??= ResizeObserverStub as typeof ResizeObserver;

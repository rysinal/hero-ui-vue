/* global ResizeObserver, Element */
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

// jsdom implements pointer events but not pointer capture, which radix-vue's
// Slider calls on pointerdown. The throw aborts the rest of the handler chain,
// so any of our own pointerdown logic on the same element silently never runs.
Element.prototype.setPointerCapture ??= function setPointerCapture() {};
Element.prototype.releasePointerCapture ??= function releasePointerCapture() {};
Element.prototype.hasPointerCapture ??= function hasPointerCapture() {
  return false;
};

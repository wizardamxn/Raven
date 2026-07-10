// Shared pointer state — a single passive listener that ambient effects read
// from inside the shared frame loop, so we never attach one pointermove
// listener per effect. Fine-pointer only (touch devices skip initialization).

export type PointerState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** True once the visitor has actually moved the pointer. */
  active: boolean;
};

const state: PointerState = { x: 0, y: 0, vx: 0, vy: 0, active: false };
let initialized = false;

/** Read the live pointer state. Same object every call — do not mutate. */
export function getPointer(): Readonly<PointerState> {
  return state;
}

/**
 * Attach the shared pointermove listener (idempotent). No-op on the server
 * and on coarse-pointer devices. Safe to call from many effects.
 */
export function initPointer() {
  if (initialized || typeof window === "undefined") return;
  if (!window.matchMedia("(pointer: fine)").matches) return;
  initialized = true;

  state.x = window.innerWidth / 2;
  state.y = window.innerHeight / 2;
  let lastX = state.x;
  let lastY = state.y;

  window.addEventListener(
    "pointermove",
    (e: PointerEvent) => {
      state.vx = e.clientX - lastX;
      state.vy = e.clientY - lastY;
      lastX = state.x = e.clientX;
      lastY = state.y = e.clientY;
      state.active = true;
    },
    { passive: true }
  );
}

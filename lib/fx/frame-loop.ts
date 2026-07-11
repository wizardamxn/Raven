// One shared requestAnimationFrame loop for all ambient effects.
//
// Every canvas / cursor / proximity effect subscribes here instead of owning
// its own rAF. The loop only runs while at least one subscriber is active and
// the tab is visible, so a hidden tab costs nothing.

type FrameCallback = (time: number) => void;

const callbacks = new Set<FrameCallback>();
let rafId = 0;
let running = false;

function tick(time: number) {
  // Snapshot so a callback that unsubscribes mid-tick can't skip a sibling.
  for (const cb of [...callbacks]) cb(time);

  if (callbacks.size > 0 && typeof document !== "undefined" && !document.hidden) {
    rafId = requestAnimationFrame(tick);
  } else {
    running = false;
  }
}

function start() {
  if (running || callbacks.size === 0) return;
  if (typeof document !== "undefined" && document.hidden) return;
  running = true;
  rafId = requestAnimationFrame(tick);
}

/** Subscribe a per-frame callback. Returns an unsubscribe function. */
export function subscribeFrame(cb: FrameCallback): () => void {
  callbacks.add(cb);
  start();
  return () => {
    callbacks.delete(cb);
  };
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) start();
    // When hidden, the running tick stops the loop on its next frame.
  });
}

export function stopFrameLoop() {
  cancelAnimationFrame(rafId);
  running = false;
}

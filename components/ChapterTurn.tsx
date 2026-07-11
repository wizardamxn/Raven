import { ViewTransition } from "react";

/**
 * Wraps a page in the "ink-bleed page turn" — old content darkens, blurs and
 * sinks like wet ink; the new page settles in from a soft glow. Only fires on
 * navigations tagged `transitionTypes={["page-turn"]}`; browser back/forward
 * and untyped navigations swap instantly (default "none").
 */
export default function ChapterTurn({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ViewTransition
      enter={{ "page-turn": "ink-in", default: "none" }}
      exit={{ "page-turn": "ink-out", default: "none" }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}

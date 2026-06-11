/**
 * Scroll behavior that respects prefers-reduced-motion. JS-initiated smooth
 * scrolling (scrollTo/scrollIntoView with behavior:'smooth') ignores the CSS
 * `scroll-behavior: auto` reset in global.css, so call sites must opt out
 * explicitly. SSR-safe: no matchMedia on the server → 'auto'.
 */
export function scrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') return 'auto';
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

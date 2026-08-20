import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../animations/gsap';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a GSAP context that automatically cleans up on unmount.
 * Use this for any component that creates GSAP animations.
 */
export function useGsapContext(
  callback: (ctx: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Clean up previous context
    if (ctxRef.current) {
      ctxRef.current.revert();
    }

    // Create new context
    ctxRef.current = gsap.context(() => {
      if (!prefersReducedMotion()) {
        callback(ctxRef.current!);
      }
    });

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Refresh ScrollTrigger after layout changes.
 * Call this after images load or dynamic content changes.
 */
export function useScrollTriggerRefresh(deps: React.DependencyList = []) {
  useEffect(() => {
    // Small delay to ensure DOM has settled
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

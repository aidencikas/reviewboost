import { useEffect, useRef } from 'react';
import { createScrollReveal, createStaggerAnimation, prefersReducedMotion } from '../animations/gsap';

interface UseScrollRevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: UseScrollRevealOptions
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    const animation = createScrollReveal(ref.current, {
      y: options?.y,
      opacity: options?.opacity,
      duration: options?.duration,
      delay: options?.delay,
      ease: options?.ease,
      start: options?.start,
    });

    return () => {
      animation?.kill();
    };
  }, [options?.y, options?.opacity, options?.duration, options?.delay, options?.ease, options?.start]);

  return ref;
}

export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  options?: UseScrollRevealOptions & { stagger?: number }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    const children = ref.current.children;
    if (!children.length) return;

    const animation = createStaggerAnimation(Array.from(children), {
      y: options?.y,
      opacity: options?.opacity,
      duration: options?.duration,
      stagger: options?.stagger,
      delay: options?.delay,
      ease: options?.ease,
    });

    return () => {
      animation?.kill();
    };
  }, [options?.y, options?.opacity, options?.duration, options?.stagger, options?.delay, options?.ease]);

  return ref;
}

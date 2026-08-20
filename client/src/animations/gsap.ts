import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Default easing
export const easings = {
  smooth: 'power2.out',
  smoothIn: 'power2.in',
  smoothInOut: 'power2.inOut',
  bounce: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.3)',
} as const;

// Default durations
export const durations = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2,
} as const;

// Check for reduced motion preference
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Create a reveal animation (fade in from bottom)
export function createRevealAnimation(
  element: gsap.TweenTarget,
  options?: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  }
) {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0 });
    return;
  }

  return gsap.from(element, {
    y: options?.y ?? 40,
    opacity: options?.opacity ?? 0,
    duration: options?.duration ?? durations.normal,
    delay: options?.delay ?? 0,
    ease: options?.ease ?? easings.smooth,
  });
}

// Create a scroll-triggered reveal animation
export function createScrollReveal(
  element: gsap.DOMTarget,
  options?: {
    trigger?: gsap.DOMTarget;
    start?: string;
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    scrub?: boolean | number;
  }
) {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0 });
    return;
  }

  return gsap.from(element, {
    scrollTrigger: {
      trigger: options?.trigger ?? element,
      start: options?.start ?? 'top 85%',
      toggleActions: 'play none none none',
    },
    y: options?.y ?? 40,
    opacity: options?.opacity ?? 0,
    duration: options?.duration ?? durations.normal,
    delay: options?.delay ?? 0,
    ease: options?.ease ?? easings.smooth,
  });
}

// Create a stagger animation for multiple elements
export function createStaggerAnimation(
  elements: gsap.TweenTarget,
  options?: {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
  }
) {
  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  return gsap.from(elements, {
    y: options?.y ?? 40,
    opacity: options?.opacity ?? 0,
    duration: options?.duration ?? durations.normal,
    stagger: options?.stagger ?? 0.1,
    delay: options?.delay ?? 0,
    ease: options?.ease ?? easings.smooth,
  });
}

// Create a parallax effect
export function createParallax(
  element: gsap.DOMTarget,
  options?: {
    trigger?: gsap.DOMTarget;
    start?: string;
    end?: string;
    y?: number;
    scrub?: boolean | number;
  }
) {
  if (prefersReducedMotion()) return;

  return gsap.to(element, {
    scrollTrigger: {
      trigger: options?.trigger ?? element,
      start: options?.start ?? 'top bottom',
      end: options?.end ?? 'bottom top',
      scrub: options?.scrub ?? true,
    },
    y: options?.y ?? -50,
  });
}

// Create a pinned section
export function createPinnedSection(
  trigger: gsap.DOMTarget,
  options?: {
    start?: string;
    end?: string;
    pin?: boolean;
    scrub?: boolean | number;
  }
) {
  if (prefersReducedMotion()) return;

  return ScrollTrigger.create({
    trigger,
    start: options?.start ?? 'top top',
    end: options?.end ?? '+=100%',
    pin: options?.pin ?? true,
    scrub: options?.scrub ?? true,
  });
}

// Cleanup all ScrollTrigger instances
export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

// Kill all GSAP animations
export function killAllAnimations() {
  gsap.killTweensOf('*');
  cleanupScrollTriggers();
}

// Refresh ScrollTrigger (call after layout changes)
export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };

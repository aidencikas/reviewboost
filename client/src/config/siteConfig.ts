export const siteConfig = {
  // Brand
  brand: 'ReviewBoost',
  tagline: {
    lt: 'Daugiau Google atsiliepimų. Paprasčiau.',
    en: 'More Google Reviews. Made Simple.',
  },

  // Google Review URL (placeholder — replace with actual URL)
  googleReviewUrl: '',

  // Contact Information (placeholders — replace with actual values)
  contact: {
    email: '',
    phone: '',
    address: '',
  },

  // Social Media Links (placeholders — replace with actual URLs)
  social: {
    instagram: '',
    facebook: '',
    linkedin: '',
  },

  // Website URL (placeholder — replace with production URL)
  url: '',

  // Analytics (placeholder — add GA4 measurement ID)
  analytics: {
    googleAnalyticsId: '',
  },

  // SEO
  seo: {
    title: {
      lt: 'ReviewBoost — Paprastesnis kelias iki Google atsiliepimų',
      en: 'ReviewBoost — A Simpler Path to Google Reviews',
    },
    description: {
      lt: 'ReviewBoost NFC kortelė leidžia klientams palikti Google atsiliepimą vienu telefono bakstelėjimu. Paprasta, greita, efektyvu.',
      en: 'ReviewBoost NFC card lets customers leave a Google review with a single phone tap. Simple, fast, effective.',
    },
    keywords: {
      lt: ['Google atsiliepimai', 'NFC kortelė', 'verslo atsiliepimai', 'ReviewBoost', 'Google review card'],
      en: ['Google reviews', 'NFC card', 'business reviews', 'ReviewBoost', 'review card'],
    },
  },

  // Product
  product: {
    name: 'ReviewBoost NFC Google Review Card',
    description: {
      lt: 'Premium NFC kortelė, sukurta palengvinti Google atsiliepimų rinkimą.',
      en: 'Premium NFC card designed to simplify Google review collection.',
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;

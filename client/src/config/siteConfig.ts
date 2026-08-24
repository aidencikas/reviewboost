export const siteConfig = {
  // Brand
  brand: 'ReviewBoost',
  tagline: {
    lt: 'Daugiau Google atsiliepimų. Paprasčiau.',
    en: 'More Google Reviews. Made Simple.',
  },

  // Google Review URL
  googleReviewUrl: 'https://g.page/r/CZUKyvpXY2mQEBM/review',

  // Contact Information
  contact: {
    email: 'reviewboostlt@gmail.com',
    phone: '+37067784788',
    address: '',
  },

  // Social Media Links (placeholders — replace with actual URLs)
  social: {
    instagram: '',
    facebook: '',
    linkedin: '',
  },

  // Website URL
  url: 'https://reviewboost.lt',

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

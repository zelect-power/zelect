// Zelect Power Technology — design tokens
// Primary palette: emerald gradient from logo
// Gradient stops: #52b884 → #32a879 → #06563c
// Light theme default; dark theme toggle

window.ZP_TOKENS = {
  // brand gradient (from SVG logo)
  gradient: 'linear-gradient(135deg, #52b884 0%, #2f9f74 35%, #0f7a52 70%, #06563c 100%)',
  gradientSoft: 'linear-gradient(135deg, rgba(82,184,132,0.12) 0%, rgba(15,122,82,0.06) 100%)',
  gradientGlow: 'radial-gradient(60% 80% at 70% 40%, rgba(50,168,121,0.35) 0%, rgba(6,86,60,0) 60%)',
  // solids
  emerald: {
    50:  '#eafaf1',
    100: '#c8f0d9',
    200: '#8fe0b8',
    300: '#52b884',
    400: '#2f9f74',
    500: '#0f7a52',
    600: '#0a6845',
    700: '#06563c',
    800: '#053f2c',
    900: '#04281d',
  },
  ink: {
    0:  '#ffffff',
    50: '#fafafa',
    100:'#f2f3f4',
    200:'#e6e7e9',
    300:'#c9ccd0',
    400:'#8f949c',
    500:'#5f6670',
    600:'#3d434d',
    700:'#222831',
    800:'#141820',
    900:'#0a0d13',
  },
  accent: '#52b884',
  // typography
  fontSans: "'Inter Tight', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
  fontMono: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
  // radii
  rSm: 6,
  rMd: 10,
  rLg: 16,
  rXl: 24,
  // spacing rhythm: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
};

// Theme palettes
window.ZP_THEMES = {
  light: {
    bg:        '#ffffff',
    bgAlt:     '#fafafa',
    bgSoft:    '#f2f3f4',
    surface:   '#ffffff',
    surface2:  '#f7f8f9',
    border:    'rgba(10,13,19,0.08)',
    borderStr: 'rgba(10,13,19,0.14)',
    text:      '#0a0d13',
    textSub:   '#5f6670',
    textDim:   '#8f949c',
    brand:     '#0f7a52',
    brandInk:  '#06563c',
    brandSoft: 'rgba(82,184,132,0.10)',
    // hero/accent
    heroOverlay: 'radial-gradient(70% 60% at 80% 30%, rgba(82,184,132,0.18) 0%, rgba(255,255,255,0) 60%)',
    gridStroke:  'rgba(10,13,19,0.05)',
    shadow:      '0 1px 2px rgba(10,13,19,0.04), 0 8px 24px rgba(10,13,19,0.06)',
    shadowLg:    '0 2px 4px rgba(10,13,19,0.04), 0 24px 60px rgba(10,13,19,0.10)',
  },
  dark: {
    bg:        '#070a0f',
    bgAlt:     '#0c1117',
    bgSoft:    '#111821',
    surface:   '#0e141c',
    surface2:  '#141c26',
    border:    'rgba(255,255,255,0.08)',
    borderStr: 'rgba(255,255,255,0.16)',
    text:      '#f3f5f7',
    textSub:   '#a8afb8',
    textDim:   '#6b727c',
    brand:     '#52b884',
    brandInk:  '#8fe0b8',
    brandSoft: 'rgba(82,184,132,0.12)',
    heroOverlay: 'radial-gradient(70% 60% at 80% 30%, rgba(82,184,132,0.22) 0%, rgba(7,10,15,0) 60%)',
    gridStroke:  'rgba(255,255,255,0.04)',
    shadow:      '0 1px 2px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.4)',
    shadowLg:    '0 2px 4px rgba(0,0,0,0.4), 0 24px 60px rgba(0,0,0,0.6)',
  },
};

// i18n content (Ukrainian only for now, but structured for future multilang)
window.ZP_I18N = {
  uk: {
    nav: {
      products: 'Продукти',
      services: 'Послуги',
      support:  'Підтримка',
      news:     'Новини',
      contacts: 'Контакти',
      cta:      'Отримати пропозицію',
    },
  },
};

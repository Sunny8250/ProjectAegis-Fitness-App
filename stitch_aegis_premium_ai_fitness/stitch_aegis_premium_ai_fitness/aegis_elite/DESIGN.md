---
name: Aegis Elite
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#bec6e0'
  on-tertiary: '#283044'
  tertiary-container: '#9ba2bb'
  on-tertiary-container: '#31394d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  container-padding: 20px
  gutter: 16px
---

## Brand & Style
The design system is engineered for a premium, high-end fitness experience that emphasizes discipline, precision, and luxury. It targets high-performance individuals who value a data-driven yet aesthetically refined interface. 

The aesthetic is **Modern Minimalist** with a focus on high-contrast "Dark Mode" utility. It leverages deep navy foundations to create a sense of focus and exclusivity. The visual narrative avoids trendy distractions like glassmorphism or neumorphism in favor of structural clarity, generous whitespace, and purposeful layering. The emotional response is one of calm authority and sophisticated performance.

## Colors
The palette is rooted in a "True Dark" philosophy. The background uses a very dark navy to maintain depth and premium quality without hitting the flat "pitch black" of lower-end apps. 

- **Primary Emerald**: Used for core actions, success states, and key progress metrics. It represents vitality and growth.
- **Accent Electric Blue**: Used sparingly for data visualization and secondary interactive elements to provide a technical, high-performance edge.
- **Surface Hierarchy**: UI depth is created through two distinct surface layers. Primary surfaces (#0F172A) are used for main content cards, while secondary surfaces (#1E293B) provide contrast for nested elements or hover states.

## Typography
The system utilizes **Inter** exclusively to maintain a systematic, technical, and clean appearance. 

- **Headlines**: Use heavy weights (700-800) with slight negative letter-spacing to create a "dense" and authoritative look for workout titles and progress headers.
- **Body Text**: Kept intentionally small and clean to maximize whitespace. 
- **Labels**: Use uppercase with increased tracking for categorizations (e.g., "MUSCLE GROUP," "DURATION") to provide clear hierarchy without adding visual weight.
- **Readability**: Always ensure the secondary text (#94A3B8) meets AA contrast standards against the primary surface colors.

## Layout & Spacing
This design system follows a strict **8pt Grid** system to ensure mathematical harmony.

- **Mobile Layout**: Utilizes a fluid grid with 20px side margins and 16px gutters between card elements.
- **Vertical Rhythm**: Large sections are separated by 48px (2xl) to create the "High-end SaaS" feel, allowing content to breathe.
- **Safe Areas**: All interactive elements (buttons, inputs) must maintain a minimum 16px clearance from the edge of the screen.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and **Soft Ambient Shadows**. 

1. **Background**: Level 0 (#020617) - The lowest z-index.
2. **Cards/Surfaces**: Level 1 (#0F172A) - Raised via color and a subtle 10% opacity black shadow (Y: 4px, Blur: 20px).
3. **Overlays/Modals**: Level 2 (#1E293B) - The highest surface elevation, using a more pronounced shadow (Y: 12px, Blur: 30px) to draw focus.

Avoid borders on cards; use the tonal difference between the background and surface to define edges.

## Shapes
The shape language is sophisticated and modern. 

- **Cards & Inputs**: Use a consistent 16px (rounded-lg) radius. This balances the "industrial" dark theme with a touch of approachability.
- **Primary Buttons**: Can occasionally utilize a 32px (rounded-xl) or pill shape to differentiate them from static cards.
- **Small Components**: Chips and small tags use a 4px (soft) radius to maintain crispness at smaller scales.

## Components
### Buttons
- **Primary**: Emerald Green gradient (from #10B981 to #059669 at 135 degrees). Text is bold and white.
- **Secondary/Ghost**: No fill. 1px border using #1E293B. Text is White.
- **Tertiary/Ghost**: No fill, no border. Text is Emerald Green.

### Cards
Cards are the primary container. They should never have a border. Use #0F172A as the base. Content inside should be padded with 20px (lg) on all sides.

### Inputs
Minimalist style. Background: #0F172A. Border: 1px solid #1E293B. On focus, the border changes to Emerald Green (#10B981) with a subtle outer glow.

### Progress & Charts
- **Circular Indicators**: Use a thick stroke (8px+). Background track is #1E293B, active track is Emerald Green.
- **Charts**: Line charts use a 2px stroke width. The area under the line should have a subtle vertical gradient from Emerald Green (15% opacity) to Transparent.
- **Navigation**: The bottom bar is a floating element with a blur-less dark surface (#0F172A) and a 16px radius, sitting 16px from the bottom of the screen.

### Lists
List items use #0F172A with a thin #1E293B divider between items. Chevron icons use Secondary Text color (#94A3B8).
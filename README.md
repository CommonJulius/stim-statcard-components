# Stim — StatCard Component Library

Reference implementation of the StatCard component system, built with design tokens extracted from the Harmoni Figma foundation file.

## Quick Start

```bash
npm install
npm run dev
```

Preview runs at `http://localhost:5173`

## Project Structure

```
├── tokens/              # Design tokens (CSS custom properties)
│   ├── index.css        # Entry point — imports all token files
│   ├── colors.css       # 63 color tokens (primitives, status, hover, inactive, semantic)
│   ├── typography.css   # Font sizes, line-heights, weights (responsive)
│   ├── spacing.css      # Spacing scale, grid system, radius
│   ├── breakpoints.css  # 6 breakpoints (XS–XXL)
│   └── motion.css       # Easing curves and durations
├── components/
│   └── StatCard/        # StatCard component + variants
│       ├── StatCard.tsx  # React components
│       ├── StatCard.css  # All component styles
│       └── index.ts      # Exports
└── src/
    └── App.tsx          # Preview app with all variants
```

## Design Tokens

All tokens are framework-agnostic CSS custom properties. Import `tokens/index.css` to get everything.

### Breakpoints

| Name | Value | Usage |
|------|-------|-------|
| XS | ≤400px | Small mobile |
| SM | ≥400px | Mobile |
| MD | ≥768px | Tablet |
| LG | ≥992px | Small desktop |
| XL | ≥1200px | Desktop |
| XXL | ≥1440px | Large desktop |

**Mobile-first approach** — base values are mobile, overridden at MD (tablet) and XL (desktop).

### Grid System

| | Mobile | Tablet (≥768) | Desktop (≥1200) |
|---|---|---|---|
| Columns | 8 | 12 | 12 |
| Margin | 0 | 16px | 24px |
| Gutter | 4px | 8px | 16px |

### Typography

Font: **General Sans** (weights: 400 regular, 500 medium, 600 semibold)

12 responsive text styles: `h1`–`h4`, `preamble`, `body1`–`body3`, `overline`, `input`, `quote-big`, `quote`
5 static label styles: `label1`–`label5`
2 button styles: `button-big`, `button-small`

All have corresponding CSS utility classes (e.g., `.text-h1`, `.text-body1`).

### Spacing

Fixed scale: `--space-{0|2|4|8|12|16|24|32|40|48|56|64|72|80|96|120|200}`

Responsive spacing:
- `--outer-x-default` — container horizontal padding (16/16/24)
- `--inner-x-default` — component internal padding (16/24/48)

### Motion

Easing curves: `--ease-standard`, `--ease-emphasized`, `--ease-accelerate`, `--ease-decelerate`, `--ease-linear`

Durations: `--duration-fast` (0.05s) through `--duration-slow-2` (0.6s)

### Colors

63 tokens across 6 color families (Purple, Green, Blue, Orange, Grey, Black/White) with levels 50–600 + accent. Includes status, hover, and inactive variants.

## StatCard Component

A data visualization card with 5 content variants. All share the same header (title + description) and support color variants and a wide (single-card) layout.

### Variants

| Variant | Component | Description |
|---------|-----------|-------------|
| Big Text | `StatCardBigText` | SVG text that scales to fill width (max-height constrained) |
| Graphic | `StatCardGraphic` | SVG/image anchored to bottom of card |
| Bar Chart | `StatCardBarChart` | Data-driven bars with viewport-triggered animation |
| Semi-Circle | `StatCardSemiCircle` | Half-donut chart with variable segment thickness |
| Marquee | `StatCardMarquee` | Continuously scrolling text banner |

### Props (common)

| Prop | Type | Description |
|------|------|-------------|
| `title` | string | Card heading (renders as `<h3>`) |
| `description` | string | Supporting text |
| `variant` | `'blue' \| 'purple' \| 'green' \| 'orange' \| 'grey'` | Color scheme |
| `bgVariant` | same as variant | Override background color independently |
| `wide` | boolean | Single-card layout (text left, content right on ≥768px) |

### Layout

**Grid mode** (`StatCardGrid`): 1 column on mobile, 2 columns on tablet+. Last odd card spans full width.

**Wide/single mode** (`wide` prop): Uses 12-column CSS grid. Text fills columns 1–5, content starts at column 7. Falls back to standard stacked layout on mobile.

### Card heights

- Mobile: 300px min, 24px top padding, 16px bottom padding
- Tablet: 400px min, 24px padding
- Desktop: 448px min, 40px padding

### Animations

- **Bar Chart**: Bars grow upward on viewport entry (90% threshold). Duration scales proportionally per bar (tallest = 1s). Uses `--ease-standard`.
- **Semi-Circle**: Segments draw sequentially via stroke-dashoffset. Linear easing, 1s total.
- **Marquee**: Continuous horizontal scroll at 50s per cycle.

### CMS Integration Notes

Each variant maps cleanly to CMS fields:

- **BigText**: `bigText` (string)
- **Graphic**: `graphic` (asset URL), `graphicAlt` (string)
- **BarChart**: `bars` (array of `{ value, displayValue?, unit?, label }`)
- **SemiCircle**: `segments` (array of `{ value, label, displayValue? }`)
- **Marquee**: `items` (array of strings)

The `variant`, `bgVariant`, and `wide` props can be content editor selections.

## Deploy

Vercel auto-detects Vite. Push to GitHub and connect the repo in Vercel — zero config needed.

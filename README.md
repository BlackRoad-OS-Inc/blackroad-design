# blackroad-design

[![CI](https://github.com/BlackRoad-OS-Inc/blackroad-design/actions/workflows/ci.yml/badge.svg)](https://github.com/BlackRoad-OS-Inc/blackroad-design/actions/workflows/ci.yml)

> **BlackRoad OS Design System** — brand tokens, color palettes, typography, CSS utilities, and pixel art assets.

[![Design System](https://img.shields.io/badge/design-system-FF1D6C?style=flat-square)](https://blackroad.ai)
[![Status](https://img.shields.io/badge/status-active-brightgreen?style=flat-square)](https://github.com/BlackRoad-OS-Inc/blackroad-design)

---

## 📦 Contents

```
blackroad-design/
├── tokens/          # Design tokens (JSON — source of truth)
│   ├── colors.json
│   ├── spacing.json
│   ├── typography.json
│   └── animation.json
├── css/             # Generated CSS
│   ├── variables.css      # CSS custom properties
│   └── tailwind-preset.js # Tailwind config preset
├── assets/          # Visual assets
│   └── palettes/    # Official color palettes (.gpl + .json)
├── icons/           # Icon library
├── components/      # Component design specs
└── docs/            # Design documentation
```

---

## 🎨 Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Hot Pink | `#FF1D6C` | **Primary** — CTAs, active states |
| Amber | `#F5A623` | Accent — highlights, warnings |
| Violet | `#9C27B0` | Secondary — Octavia agent |
| Electric Blue | `#2979FF` | Info — links, secondary actions |
| Black | `#000000` | Backgrounds |
| White | `#FFFFFF` | Text, borders on dark |

### Brand Gradient
```css
background: linear-gradient(135deg, #F5A623 0%, #FF1D6C 38.2%, #9C27B0 61.8%, #2979FF 100%);
```
> Gradient stops use **Golden Ratio** proportions (0%, 38.2%, 61.8%, 100%)

### ⛔ Forbidden Colors (old system — do not use)
`#FF9D00` `#FF6B00` `#FF0066` `#FF006B` `#D600AA` `#7700FF` `#0066FF`

---

## 📐 Spacing (Golden Ratio)

All spacing is derived from **φ = 1.618**:

| Token | Value | Rule |
|-------|-------|------|
| `--space-xs` | 8px | base |
| `--space-sm` | 13px | × φ |
| `--space-md` | 21px | × φ |
| `--space-lg` | 34px | × φ |
| `--space-xl` | 55px | × φ |
| `--space-2xl` | 89px | × φ |
| `--space-3xl` | 144px | × φ |

---

## 🔤 Typography

- **Sans**: SF Pro Display → Segoe UI → system-ui
- **Mono**: SF Mono → Fira Code → JetBrains Mono
- **Line height**: `1.618` (Golden Ratio)

---

## 🤖 Agent Colors

Each AI agent has a distinct identity color:

| Agent | Color | Hex |
|-------|-------|-----|
| Lucidia | Cyan | `#00BCD4` |
| Octavia | Purple | `#9C27B0` |
| Alice | Green | `#4CAF50` |
| Aria | Blue | `#2196F3` |
| Shellfish | Red | `#F44336` |

---

## 🚀 Usage

### CSS Custom Properties
```html
<link rel="stylesheet" href="https://cdn.blackroad.ai/design/variables.css">
```

```css
.cta-button {
  background: var(--gradient-brand);
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-sans);
  line-height: var(--line-height);
}
```

### Tailwind CSS
```js
// tailwind.config.js
const blackroadPreset = require('./css/tailwind-preset.js')

module.exports = {
  presets: [blackroadPreset],
  // ...
}
```

---

> © BlackRoad OS, Inc. All rights reserved. Proprietary design assets.

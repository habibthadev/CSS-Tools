# CSS Tools

A modern, dark-themed developer toolkit for generating production-ready CSS. Compose, preview, and copy clean CSS in real time — no build, no auth, no bloat.

[Live Demo](https://csstool.vercel.app) · [Report Issue](https://github.com/habibthadev/CSS-Tools/issues)

---

## Features

- **45 CSS generators** across 6 categories — from gradients to filters to flexbox
- **Live preview** — every control change reflects instantly in the preview panel
- **One-click copy** — copies clean, production-ready CSS to clipboard with optimistic feedback
- **Full-text search** — fuzzy search across all tools from the sidebar or home page
- **Dark / Light mode** — persistent theme toggle, honors system preference fallback
- **SEO-ready** — per-page titles, meta descriptions, Open Graph tags, JSON-LD structured data, and sitemap
- **Mobile responsive** — collapsible sidebar, fully usable on touch devices
- **No loaders** — all state is local/derived; updates happen synchronously

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | SCSS with CSS custom properties |
| State | Zustand |
| Icons | Tabler Icons |
| SEO | react-helmet-async |
| Routing | React Router v6 |
| Deploy | Vercel |

---

## Tool Categories

### Backgrounds
`background-color` · `linear-gradient` · `radial-gradient`

### Typography
`font-size` · `text-color` · `line-height` · `letter-spacing` · `text-transform` · `text-align` · `font-weight` · `text-decoration`

### Spacing
`padding` · `margin`

### Borders
`border` · `outline` · `border-radius`

### Effects
`box-shadow` · `opacity` · `blur` · `brightness` · `contrast` · `grayscale` · `hue-rotate` · `invert` · `saturate` · `sepia` · `drop-shadow`

### Layout
`flexbox` · `grid` · `rotate` · `translate` · `skew`

---

## Getting Started

```bash
# Clone
git clone https://github.com/habibthadev/CSS-Tools.git
cd CSS-Tools

# Install
pnpm install

# Develop
pnpm dev

# Build
pnpm build
```

Requires Node 18+.

---

## Project Structure

```
src/
├── components/          # Shared UI (Sidebar, Layout, CodeBlock, Slider, ColorInput…)
├── data/tools.js        # Tool registry — all 32 tools, categories, icons, slugs
├── pages/
│   ├── Home.jsx         # Landing page with search + category grid
│   └── tools/           # One file per tool generator
├── store/
│   ├── useAppStore.js   # Zustand store (search, sidebar, copy state)
│   └── useTheme.js      # Theme toggle + localStorage persistence
└── styles/
    ├── _tokens.scss     # CSS custom properties, dark + light mode
    ├── _animations.scss # Keyframes + utility animation classes
    ├── _layout.scss     # App shell, footer, page container
    ├── _sidebar.scss    # Sidebar navigation + collapsible categories
    ├── _topbar.scss     # Sticky top bar
    ├── _home.scss       # Home page styles
    ├── _tool.scss       # Tool page split-panel layout
    ├── _components.scss # All shared component styles
    └── main.scss        # Import manifest
```

---

## Adding a New Tool

1. Add an entry to `src/data/tools.js`:

```js
{
  name: 'Tool Name',
  slug: 'tool-name',
  description: 'One sentence description.',
  icon: IconName,
  category: 'effects',
}
```

2. Create `src/pages/tools/ToolName.jsx` using `ToolLayout` + `CodeBlock` + `Slider` / `ColorInput`.

3. Add a route in `src/App.jsx`:

```jsx
<Route path="tool-name" element={<ToolName />} />
```

4. Add the URL to `public/sitemap.xml`.

---

## Design System

The design uses a purple-accented dark theme (`--accent: #a855f7`) with a layered surface elevation system. All colors are CSS custom properties defined in `_tokens.scss`. Light mode is activated via `[data-theme="light"]` on the `<html>` element.

### Token Naming

| Token | Role |
|---|---|
| `--surface-base` | Page canvas |
| `--surface-raised` | Cards, panels |
| `--surface-overlay` | Dropdowns, floating elements |
| `--accent` | Brand purple, primary actions |
| `--accent-muted` | Subtle accent fills |
| `--text-primary` | Headings, labels |
| `--text-secondary` | Supporting text |
| `--text-muted` | Metadata, placeholders |
| `--border-default` | Standard separation |
| `--border-faint` | Subtle separation |

---

## SEO

Each tool page renders full meta tags via `<SEOMeta>`:
- `<title>` — tool-specific
- `<meta name="description">`
- Open Graph tags for social sharing
- JSON-LD `SoftwareApplication` structured data on the home page

A machine-readable sitemap lives at `/sitemap.xml` and `robots.txt` is configured for full crawl access.

---

## License

MIT © [Habib Adebayo](https://habibthadev.tech)

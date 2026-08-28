# TechGroup Solutions Portfolio V4 — Brand Identity + Interactive Motion

V4 keeps the truthful project/context model from V3 and adds the supplied TechGroup Solutions brand icon set, installable-web-app metadata, and a richer interaction layer. The site remains plain HTML/CSS/JavaScript with no framework or build step.

## V4 additions

### Supplied brand identity assets integrated

- `favicon.ico`
- `favicon.svg` — optimized in this package to a much smaller SVG wrapper while preserving the supplied TGS artwork
- `favicon-96x96.png`
- `apple-touch-icon.png`
- `web-app-manifest-192x192.png`
- `web-app-manifest-512x512.png`
- `site.webmanifest`

The homepage and case-study pages now reference the favicon, Apple touch icon, and manifest. The 192px TGS mark is also used as the sidebar/case-study brand icon, and the 96px mark appears as a floating hero brand seal.

### Manifest corrected for TechGroup Solutions

The supplied manifest was updated for this portfolio:

- App name: `TechGroup Solutions`
- Short name: `TGS`
- Relative GitHub Pages-safe `start_url` and `scope`
- Dark brand theme/background colors
- 192px and 512px maskable/standard icon declarations

### Interaction and animation enhancements

- TGS branded startup/intro animation with orbiting rings and loading line
- Smooth custom cursor for precise-pointer devices
- Cursor expansion over links, buttons, inputs, and interactive controls
- Existing ambient pointer lighting retained and optimized
- Technical grid layer in the ambient background
- Hero parallax retained with a new floating TGS brand seal
- Orbit nodes added to the hero ring system
- Independent floating timing for code/database/cloud hero chips
- Magnetic CTA, filter, and quick-contact motion
- Pointer-position spotlight lighting on cards and major interactive panels
- Restrained 3D tilt on project/portfolio cards
- Stronger staggered reveal treatment with blur-to-focus entrance
- Animated section-heading accent lines
- Pulsing architecture-flow arrows and active architecture node
- Spring opening motion for the quick-contact Popover API panel
- Native `<dialog>` case-study opening animation
- Active sidebar indicator breathing effect
- Small standalone/PWA mode brand treatment
- Versioned service worker for same-origin static assets and offline navigation fallback
- Optional browser install prompt injected into Quick Contact when PWA installation is available

All pointer-heavy and decorative motion is disabled for coarse-pointer devices where appropriate and respects `prefers-reduced-motion`.

## Truthful portfolio model retained

The site continues to distinguish project context instead of presenting all prior work as TechGroup Solutions-owned client work:

- RHU Morong Health System — academic thesis/team project
- Angono NHS Career Assessment — independent academic/full-stack project
- HowCan-i-Help — professional collaboration at Real IT OPC
- RITREMIS — professional collaboration at Real IT OPC / active development

Collaborators remain credited in context without automatically representing them as TechGroup Solutions employees.

## Contact behavior

The static fallback email remains configured in the `<body>` data attributes. The form does **not** fake a successful server submission. If `data-contact-endpoint` is empty, the form prepares a prefilled email instead.

To enable direct submission later:

```html
<body
  data-contact-email="your-real-business-email@example.com"
  data-contact-endpoint="https://your-api.example.com/contact"
>
```

Keep SMTP/API credentials on the server only.

## Files

- `index.html` — homepage and interactive client-acquisition flow
- `style.css` — visual system, accessibility, responsive rules, and V4 motion layer
- `script.js` — progressive interactions, filtering, dialogs, planner, validation, cursor, spotlight, tilt, and motion
- `site.webmanifest` — installable app metadata
- `sw.js` — versioned offline/cache service worker
- favicon/touch/PWA icon files — supplied TGS identity assets
- `case-studies/` — truthful project-context pages
- `images/` — hero/social/legacy logo assets
- `robots.txt`
- `sitemap.xml`

## Deployment

Copy the **contents** of this folder to the root of the GitHub Pages repository. No build step is required.

After deployment, hard-refresh the browser or clear the favicon cache if the old icon remains visible. Browsers often cache favicons aggressively.

If you later add a custom domain, update canonical URLs, Open Graph URLs, JSON-LD URLs, `robots.txt`, and `sitemap.xml` accordingly.

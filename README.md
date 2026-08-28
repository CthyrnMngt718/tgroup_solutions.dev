# TechGroup Solutions Portfolio V2

This package is a static GitHub Pages-ready rebuild of the supplied portfolio. It keeps the dark indigo/cyan/teal identity while shifting the site toward client trust, project proof, accessibility, performance, and lead conversion.

## Included

- `index.html` — redesigned client-facing homepage
- `style.css` — responsive design system, container queries, reduced-motion support, progressive scroll-driven animation, light/dark themes
- `script.js` — native ES-module interactions, View Transitions filtering, accessible dialogs, project planner, architecture demo, scrollspy, rAF pointer effects, form validation, analytics-ready events
- `case-studies/` — four indexable project case-study pages
- `images/` — optimized WebP versions of the logo and hero artwork plus social preview
- `robots.txt` and `sitemap.xml` — baseline search-engine discovery files

## Important production configuration

### 1) Contact email

The existing source used:

`techgroupsolutions@email.com`

That address has been preserved as the fallback contact address. If this is not a real monitored mailbox, replace every occurrence in `index.html` with the real business email.

### 2) Direct form submission endpoint

The form intentionally does **not** pretend to send a message when no backend exists.

By default, `data-endpoint=""` is empty, so a validated inquiry opens the visitor's email application with the project information prefilled.

To enable true server-side submission, set a secure HTTPS endpoint in either location:

```html
<body data-contact-email="hello@yourdomain.com" data-contact-endpoint="https://your-api.example.com/contact">
```

or:

```html
<form id="contactForm" data-endpoint="https://your-api.example.com/contact">
```

The endpoint should accept JSON via POST and return a 2xx response on success. Keep SMTP/API secrets on the server, never in `script.js`.

### 3) Domain and SEO

The canonical URLs, Open Graph URLs, sitemap, and schema currently use:

`https://cthyrnmngt718.github.io/tgroup_solutions.dev/`

When you move to a custom domain, replace that base URL in:

- `index.html`
- all files in `case-studies/`
- `robots.txt`
- `sitemap.xml`

### 4) Project evidence

The portfolio copy is based on the project descriptions in the supplied source. Replace the CSS-generated project previews with real approved screenshots when available. Do not publish metrics, results, client names, or claims unless they are accurate and supportable.

### 5) Social / booking links

Unknown `#` social, WhatsApp, and booking URLs were removed instead of publishing dead links. Add them back only when real URLs are available.

## Modern browser features used

The site progressively enhances with:

- View Transition API for portfolio filtering
- Popover API for quick contact, with a JavaScript fallback
- native `<dialog>` for accessible case-study previews
- CSS container queries
- CSS scroll-driven animation where supported
- `content-visibility` for below-the-fold rendering optimization
- `prefers-reduced-motion`, `prefers-contrast`, and coarse-pointer handling
- `requestAnimationFrame` throttling for pointer and scroll effects

Unsupported features gracefully fall back to standard behavior.

## Analytics-ready events

`script.js` emits lightweight events without forcing an analytics provider. If `window.dataLayer` exists, events are pushed there. It also dispatches `tgs:analytics` CustomEvents.

Examples include:

- `cta_clicked`
- `portfolio_filter_changed`
- `case_study_opened`
- `project_brief_used`
- `contact_form_started`
- `contact_form_submitted`
- `contact_form_error`

## Deployment

Copy the contents of this folder to the root of the GitHub Pages repository and keep the `images/` and `case-studies/` directory structure unchanged.

No build step or framework is required.

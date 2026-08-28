# TechGroup Solutions Portfolio V5 — Client Studio + Application Development

V5 refines the portfolio into a broader **TechGroup Solutions business portfolio** rather than a single-developer presentation. It keeps the existing dark blue/cyan identity, TGS favicon/PWA assets, case studies, project planner, accessibility work, and vanilla HTML/CSS/JavaScript architecture while expanding the service positioning and interaction layer.

## Key V5 changes

### Business identity and contact

- Business inquiry email is now `tgroupsolutions.dev2026@gmail.com`.
- Main contact form, quick-contact panel, structured data, and business links use the new address.
- The main navigation and content now present TechGroup Solutions as a collaborative development team.
- Personal social links are no longer used as the primary business identity. The public GitHub repository remains available as technical/project proof.

### Web + application-based system positioning

The portfolio no longer positions TechGroup Solutions as web-only. The service language now covers:

- Web platforms and web applications
- Application-based system development
- Custom management systems
- Database and reporting solutions
- UI/UX and interface design
- Maintenance and enhancement
- Technical documentation
- Branding and visual identity

The interactive project planner and contact form now include **Application-Based System** as a project type. The architecture section has also been generalized from a web-only model to a web/application system model.

Application-specific technologies are intentionally not hard-coded into marketing claims. Platform and stack selection should be confirmed during technical discovery based on the client's operating environment, deployment requirements, connectivity, users, data, and integrations.

### Client-hooking content strategy

The main copy has been expanded around client concerns rather than individual biography:

- What operational problem is being solved?
- Which platform fits the use case?
- What workflows, roles, records, and outputs matter?
- How will scope and delivery be clarified?
- What happens after launch?
- What actual project experience demonstrates the team's capability?

The project portfolio preserves original project context while focusing on transferable system-development capability. Professional projects completed at Real IT OPC remain credited to that organization.

### Core team presentation

The team section now presents two complementary core developers:

- **Cathyrine Menguito** — system development, frontend, UI/UX, documentation, workflow implementation, and project coordination
- **Ariel B. Eubanas, Jr.** — co-developer, full-stack web development, back-end architecture, database workflows, and implementation support

A team collaboration bridge visually communicates the delivery model instead of making the website read like a personal portfolio.

## V5 interaction and animation layer

The motion system is deliberately richer but still performance-conscious and accessibility-aware.

### Global / section motion

- Section-specific ambient glow fields that react to scroll position
- IntersectionObserver-driven active-section state
- Scroll-progress variables for section parallax without heavy scroll handlers
- Existing ambient pointer light, custom cursor, magnetic CTAs, and TGS startup animation retained
- Responsive and coarse-pointer fallbacks
- `prefers-reduced-motion` support for all new animation groups

### Hero

- Additional application-system hero chip
- Expanded web/application/business messaging
- Proof cards rebuilt to prevent the previous `Academic + Professional` overlap issue
- Safer wrapping and responsive 2-column / 1-column proof layouts
- Existing 3D pointer parallax, TGS seal, orbit rings, and icon movement retained

### Why Us

- Soft pointer tilt
- Spotlight gradients
- Animated icon orbits
- More outcome-oriented client copy

### Services

- Eight service cards
- Pointer spotlight and subtle 3D response
- Moving technical scan effects
- Breathing service icons
- Application-based system development added as a first-class service

### Featured Case Study

- Floating dashboard mockup
- Animated metric cards
- Expanded system/context copy

### Portfolio

- View Transition filtering retained
- Pointer-position spotlight retained
- Project-card perspective tilt retained
- Animated project icons while the portfolio section is active
- Generalized project descriptions instead of centering a single developer

### Process

- Scroll-progress delivery line
- Current/completed step highlighting
- Expanded client-facing workflow language

### Capabilities

- Generalized web/application architecture model
- Interactive system-layer explorer retained
- Animated capability tags
- More explicit distinction between current experience and project-specific technology selection

### Project Planner

- Application-Based System option
- Offline/local workflow and external integration feature options
- Updated complexity scoring
- Animated complexity meter and output panel

### Team

- Two-column core-team presentation
- Pointer tilt and spotlight interactions
- Animated developer avatars
- Animated collaboration bridge

### FAQ

- New application-development FAQ
- Animated open states and stronger active styling
- More detailed answers around timeline, scope, ownership, maintenance, and changes

### Contact

- New business email
- Web/application/custom-system service positioning
- Richer discovery copy
- Focus-state motion and subtle live border animation
- Mailto fallback remains honest when no secure backend endpoint is configured

## Contact form behavior

The static GitHub Pages deployment cannot safely contain SMTP credentials. The form therefore supports two modes:

1. **Production API mode** — set a secure endpoint in `data-contact-endpoint`.
2. **Static fallback mode** — when the endpoint is blank, the form opens the visitor's email application with the project details prefilled and addressed to `tgroupsolutions.dev2026@gmail.com`.

Example production setup:

```html
<body
  data-contact-email="tgroupsolutions.dev2026@gmail.com"
  data-contact-endpoint="https://your-secure-api.example/contact"
>
```

Keep SMTP passwords, API keys, and mail-service secrets on the server only.

## Project context retained

- RHU Morong Health System — academic thesis / team project / live
- Angono NHS Career Assessment — independent academic full-stack project / live
- HowCan-i-Help — professional collaboration at Real IT OPC / live
- RITREMIS — professional collaboration at Real IT OPC / active development

Reported usage/outcome figures remain labeled as project-reported rather than independently audited business claims.

## Main files

- `index.html` — client-acquisition homepage
- `style.css` — brand design system, responsive behavior, accessibility, and V5 motion layer
- `script.js` — ES-module interactions, filtering, dialogs, planner, form logic, PWA behavior, pointer effects, and section/process motion
- `site.webmanifest` — installable TGS web-app metadata
- `sw.js` — versioned service worker (`tgs-portfolio-v5-1`)
- `case-studies/` — project-context pages
- favicon / Apple touch / PWA icon files — supplied TGS brand assets

## Deployment

Copy the **contents** of this folder to the root of the GitHub Pages repository. No build step is required.

After deploying a new version, hard-refresh the site or clear the service-worker/site cache if older CSS/JS remains visible. The V5 service-worker cache name is versioned so the previous V4 cache can be replaced automatically.

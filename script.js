/* ============================================================
   TECHGROUP SOLUTIONS — PORTFOLIO V6
   Native ES module, no framework required.
   ============================================================ */

const root = document.documentElement;
const body = document.body;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const hasFinePointer = window.matchMedia('(pointer: fine)');

const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function trackEvent(name, detail = {}) {
    // Analytics-ready without forcing a vendor. Connect GTM/GA/Plausible later if desired.
    if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: name, ...detail });
    }
    window.dispatchEvent(new CustomEvent('tgs:analytics', { detail: { name, ...detail } }));
}


/* ============================================================
   SITE INTRO
   ============================================================ */
function initSiteIntro() {
    const intro = qs('#siteIntro');
    if (!intro) return;

    if (prefersReducedMotion.matches) {
        intro.remove();
        return;
    }

    const startedAt = performance.now();
    const dismiss = () => {
        const minimumVisibleMs = 760;
        const wait = Math.max(0, minimumVisibleMs - (performance.now() - startedAt));
        window.setTimeout(() => {
            intro.classList.add('is-dismissing');
            window.setTimeout(() => intro.remove(), 760);
        }, wait);
    };

    if (document.readyState === 'complete') dismiss();
    else window.addEventListener('load', dismiss, { once: true });
}

/* ============================================================
   THEME
   ============================================================ */
function initTheme() {
    const button = qs('#themeToggle');
    if (!button) return;

    const stored = localStorage.getItem('tgs-theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialTheme = stored || (systemPrefersLight ? 'light' : 'dark');

    const applyTheme = (theme) => {
        root.dataset.theme = theme;
        root.style.colorScheme = theme;
        const isLight = theme === 'light';
        button.innerHTML = `<i class="fas ${isLight ? 'fa-sun' : 'fa-moon'}" aria-hidden="true"></i><span class="sidebar-footer-label">Theme</span>`;
        button.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} theme`);
        const themeMeta = qs('meta[name="theme-color"]');
        if (themeMeta) themeMeta.content = isLight ? '#f8fafc' : '#080a0f';
    };

    applyTheme(initialTheme);

    button.addEventListener('click', () => {
        const next = root.dataset.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('tgs-theme', next);
        applyTheme(next);
        trackEvent('theme_changed', { theme: next });
    });
}

/* ============================================================
   MOBILE SIDEBAR
   ============================================================ */
function initMobileNavigation() {
    const toggle = qs('#mobileToggle');
    const sidebar = qs('#sidebar');
    if (!toggle || !sidebar) return;

    const setOpen = (open) => {
        sidebar.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        toggle.innerHTML = `<i class="fas ${open ? 'fa-xmark' : 'fa-bars'}" aria-hidden="true"></i>`;
    };

    toggle.addEventListener('click', () => setOpen(!sidebar.classList.contains('open')));

    qsa('.sidebar-nav a', sidebar).forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 980) setOpen(false);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && sidebar.classList.contains('open')) {
            setOpen(false);
            toggle.focus();
        }
    });
}

/* ============================================================
   ADVANCED SIDEBAR + COMMAND PALETTE
   - Desktop compact mode is persisted locally.
   - Ctrl/Cmd + K opens quick navigation.
   - Arrow keys move through visible command results.
   ============================================================ */
function initAdvancedSidebar() {
    const collapse = qs('#sidebarCollapse');
    const sidebar = qs('#sidebar');
    const palette = qs('#commandPalette');
    const paletteButton = qs('#commandPaletteButton');
    const paletteSearch = qs('#commandSearch');
    const paletteItems = qsa('[data-command-item]', palette || document);
    const paletteEmpty = qs('#commandEmpty');
    const closeButtons = qsa('[data-command-close]', palette || document);
    const desktopQuery = window.matchMedia('(min-width: 981px)');

    const setCollapsed = (collapsed, persist = true) => {
        const shouldCollapse = Boolean(collapsed && desktopQuery.matches);
        body.classList.toggle('sidebar-collapsed', shouldCollapse);
        collapse?.setAttribute('aria-expanded', String(!shouldCollapse));
        collapse?.setAttribute('aria-label', shouldCollapse ? 'Expand sidebar' : 'Collapse sidebar');
        collapse?.setAttribute('title', shouldCollapse ? 'Expand sidebar' : 'Collapse sidebar');
        const icon = qs('i', collapse || document);
        if (icon) icon.className = `fas ${shouldCollapse ? 'fa-angles-right' : 'fa-angles-left'}`;
        if (persist) localStorage.setItem('tgs-sidebar-collapsed', shouldCollapse ? '1' : '0');
    };

    if (collapse && sidebar) {
        setCollapsed(localStorage.getItem('tgs-sidebar-collapsed') === '1', false);
        collapse.addEventListener('click', () => {
            const next = !body.classList.contains('sidebar-collapsed');
            setCollapsed(next);
            trackEvent('sidebar_toggled', { collapsed: next });
        });
        desktopQuery.addEventListener?.('change', () => setCollapsed(localStorage.getItem('tgs-sidebar-collapsed') === '1', false));
    }

    if (!(palette instanceof HTMLDialogElement) || !paletteButton || !paletteSearch) return;

    let activeIndex = 0;

    const visibleItems = () => paletteItems.filter((item) => !item.hidden);

    const paintActive = () => {
        const items = visibleItems();
        if (!items.length) return;
        activeIndex = Math.max(0, Math.min(activeIndex, items.length - 1));
        paletteItems.forEach((item) => item.classList.remove('command-active'));
        items[activeIndex].classList.add('command-active');
    };

    const filterItems = () => {
        const query = paletteSearch.value.trim().toLowerCase();
        paletteItems.forEach((item) => {
            const haystack = `${item.textContent} ${item.dataset.search || ''}`.toLowerCase();
            item.hidden = Boolean(query && !haystack.includes(query));
        });
        activeIndex = 0;
        paintActive();
        if (paletteEmpty) paletteEmpty.hidden = visibleItems().length > 0;
    };

    const openPalette = () => {
        if (!palette.open) palette.showModal();
        paletteSearch.value = '';
        paletteItems.forEach((item) => { item.hidden = false; });
        if (paletteEmpty) paletteEmpty.hidden = true;
        activeIndex = 0;
        paintActive();
        requestAnimationFrame(() => paletteSearch.focus());
        trackEvent('command_palette_opened');
    };

    const closePalette = () => {
        if (palette.open) palette.close();
        paletteButton.focus({ preventScroll: true });
    };

    paletteButton.addEventListener('click', openPalette);
    closeButtons.forEach((button) => button.addEventListener('click', closePalette));
    palette.addEventListener('click', (event) => {
        const rect = palette.getBoundingClientRect();
        const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
        if (!inside) palette.close();
    });

    paletteSearch.addEventListener('input', filterItems);
    paletteSearch.addEventListener('keydown', (event) => {
        const items = visibleItems();
        if (!items.length) return;
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            activeIndex = (activeIndex + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
            paintActive();
            items[activeIndex].scrollIntoView({ block: 'nearest' });
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            items[activeIndex]?.click();
        }
    });

    paletteItems.forEach((item) => item.addEventListener('click', () => {
        palette.close();
        trackEvent('command_palette_navigation', { target: item.getAttribute('href') || '' });
    }));

    document.addEventListener('keydown', (event) => {
        const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';
        if (!isShortcut) return;
        event.preventDefault();
        if (palette.open) closePalette(); else openPalette();
    });
}

/* ============================================================
   AMBIENT POINTER + HERO PARALLAX (rAF throttled)
   ============================================================ */
function initPointerEffects() {
    if (prefersReducedMotion.matches || !hasFinePointer.matches) return;

    const heroVisual = qs('#heroVisual');
    let frame = 0;
    let latestEvent = null;

    const update = () => {
        frame = 0;
        if (!latestEvent) return;

        const xPercent = (latestEvent.clientX / window.innerWidth) * 100;
        const yPercent = (latestEvent.clientY / window.innerHeight) * 100;
        root.style.setProperty('--mouse-x', `${xPercent.toFixed(2)}%`);
        root.style.setProperty('--mouse-y', `${yPercent.toFixed(2)}%`);

        if (heroVisual) {
            const rect = heroVisual.getBoundingClientRect();
            const inside = latestEvent.clientX >= rect.left && latestEvent.clientX <= rect.right && latestEvent.clientY >= rect.top && latestEvent.clientY <= rect.bottom;

            if (inside) {
                const normalizedX = (latestEvent.clientX - rect.left) / rect.width - 0.5;
                const normalizedY = (latestEvent.clientY - rect.top) / rect.height - 0.5;
                root.style.setProperty('--hero-ry', `${(normalizedX * 5).toFixed(2)}deg`);
                root.style.setProperty('--hero-rx', `${(-normalizedY * 4).toFixed(2)}deg`);
                root.style.setProperty('--hero-x', `${(normalizedX * 5).toFixed(2)}px`);
                root.style.setProperty('--hero-y', `${(normalizedY * 5).toFixed(2)}px`);
            }
        }
    };

    document.addEventListener('pointermove', (event) => {
        latestEvent = event;
        if (!frame) frame = requestAnimationFrame(update);
    }, { passive: true });

    heroVisual?.addEventListener('pointerleave', () => {
        root.style.setProperty('--hero-ry', '0deg');
        root.style.setProperty('--hero-rx', '0deg');
        root.style.setProperty('--hero-x', '0px');
        root.style.setProperty('--hero-y', '0px');
    });
}


/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
function initCustomCursor() {
    const dot = qs('#cursorDot');
    const ring = qs('#cursorRing');
    if (!dot || !ring || prefersReducedMotion.matches || !hasFinePointer.matches) return;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let rafId = 0;

    const render = () => {
        rafId = 0;
        ringX += (pointerX - ringX) * 0.18;
        ringY += (pointerY - ringY) * 0.18;
        dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        if (Math.abs(pointerX - ringX) > 0.1 || Math.abs(pointerY - ringY) > 0.1) {
            rafId = requestAnimationFrame(render);
        }
    };

    const schedule = () => {
        if (!rafId) rafId = requestAnimationFrame(render);
    };

    document.addEventListener('pointermove', (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        body.classList.add('tgs-pointer-active');
        schedule();
    }, { passive: true });

    document.addEventListener('pointerleave', () => body.classList.remove('tgs-pointer-active'));
    document.addEventListener('pointerenter', () => body.classList.add('tgs-pointer-active'));

    qsa('a, button, input, select, textarea, summary, [role="button"]').forEach((element) => {
        element.addEventListener('pointerenter', () => ring.classList.add('is-hovering'));
        element.addEventListener('pointerleave', () => ring.classList.remove('is-hovering'));
    });
}

/* ============================================================
   CARD SPOTLIGHT + LIGHTWEIGHT 3D TILT
   ============================================================ */
function initCardInteractions() {
    if (prefersReducedMotion.matches || !hasFinePointer.matches) return;

    const cards = qsa('.interactive-card, .project-card, .service-card, .featured-case, .process-step, .team-card, .capability-card, .portfolio-card, .case-card, .case-story-card, .architecture-demo, .estimator-shell');

    cards.forEach((card) => {
        let frame = 0;
        let latest = null;

        const update = () => {
            frame = 0;
            if (!latest) return;
            const rect = card.getBoundingClientRect();
            const x = Math.max(0, Math.min(rect.width, latest.clientX - rect.left));
            const y = Math.max(0, Math.min(rect.height, latest.clientY - rect.top));
            card.style.setProperty('--spot-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--spot-y', `${(y / rect.height) * 100}%`);

            const nx = x / rect.width - 0.5;
            const ny = y / rect.height - 0.5;

            if (card.classList.contains('portfolio-card')) {
                card.style.setProperty('--card-ry', `${(nx * 3.6).toFixed(2)}deg`);
                card.style.setProperty('--card-rx', `${(-ny * 3.0).toFixed(2)}deg`);
            } else if (card.matches('#why-us .interactive-card, .service-card, .capability-card, .team-card')) {
                card.style.setProperty('--soft-ry', `${(nx * 2.2).toFixed(2)}deg`);
                card.style.setProperty('--soft-rx', `${(-ny * 1.8).toFixed(2)}deg`);
            }
        };

        card.addEventListener('pointermove', (event) => {
            latest = event;
            if (!frame) frame = requestAnimationFrame(update);
        }, { passive: true });

        card.addEventListener('pointerleave', () => {
            card.style.setProperty('--spot-x', '50%');
            card.style.setProperty('--spot-y', '50%');
            card.style.setProperty('--card-rx', '0deg');
            card.style.setProperty('--card-ry', '0deg');
            card.style.setProperty('--soft-rx', '0deg');
            card.style.setProperty('--soft-ry', '0deg');
        });
    });
}

/* ============================================================
   MAGNETIC CTAs
   ============================================================ */
function initMagneticElements() {
    if (prefersReducedMotion.matches || !hasFinePointer.matches) return;

    qsa('.btn:not(:disabled), .filter-btn, .quick-contact-button').forEach((element) => {
        element.addEventListener('pointermove', (event) => {
            const rect = element.getBoundingClientRect();
            const x = event.clientX - (rect.left + rect.width / 2);
            const y = event.clientY - (rect.top + rect.height / 2);
            const strength = element.classList.contains('quick-contact-button') ? 0.18 : 0.12;
            element.style.setProperty('--mag-x', `${(x * strength).toFixed(2)}px`);
            element.style.setProperty('--mag-y', `${(y * strength).toFixed(2)}px`);
        });

        element.addEventListener('pointerleave', () => {
            element.style.setProperty('--mag-x', '0px');
            element.style.setProperty('--mag-y', '0px');
        });
    });
}

/* ============================================================
   SECTION ENTER MOTION
   Adds a subtle one-time body class once visitors move beyond hero.
   ============================================================ */
function initPageMotionState() {
    if (!('IntersectionObserver' in window)) return;
    const hero = qs('#hero');
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => {
        body.classList.toggle('past-hero', !entry.isIntersecting);
    }, { threshold: 0.18 });

    observer.observe(hero);
}

/* ============================================================
   HERO DYNAMIC SUPPORTING LINE
   Primary value proposition remains static for clarity.
   ============================================================ */
function initHeroDynamicLine() {
    const target = qs('#heroDynamicLine');
    if (!target || prefersReducedMotion.matches) return;

    const phrases = [
        'Web, application and database solutions.',
        'Workflow-first systems for real operations.',
        'Interface, application logic, data and delivery.',
        'Built around requirements—not generic templates.',
        'Web platform or application-based system: scope decides.'
    ];

    let index = 0;
    window.setInterval(() => {
        index = (index + 1) % phrases.length;
        target.animate(
            [
                { opacity: 1, transform: 'translateY(0)' },
                { opacity: 0, transform: 'translateY(-4px)', offset: 0.45 },
                { opacity: 0, transform: 'translateY(4px)', offset: 0.55 },
                { opacity: 1, transform: 'translateY(0)' }
            ],
            { duration: 420, easing: 'ease' }
        );
        window.setTimeout(() => { target.textContent = phrases[index]; }, 210);
    }, 3600);
}

/* ============================================================
   REVEALS
   ============================================================ */
function initRevealObserver() {
    const elements = qsa('.reveal');
    if (!elements.length) return;

    if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
        elements.forEach((el) => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    elements.forEach((element) => observer.observe(element));
}

/* ============================================================
   SCROLLSPY
   ============================================================ */
function initScrollSpy() {
    const sections = qsa('main section[id]');
    const links = qsa('.sidebar-nav a[href^="#"]');
    if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

    const linkMap = new Map(links.map((link) => [link.getAttribute('href')?.slice(1), link]));
    const visible = new Map();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.intersectionRatio));
        const current = [...visible.entries()]
            .filter(([, ratio]) => ratio > 0)
            .sort((a, b) => b[1] - a[1])[0]?.[0];

        if (!current || !linkMap.has(current)) return;
        const activeLink = linkMap.get(current);
        links.forEach((link) => link.classList.toggle('active', link === activeLink));
        const currentLabel = qs('#sidebarCurrentSection');
        if (currentLabel) currentLabel.textContent = activeLink?.dataset.label || activeLink?.textContent.trim() || current;
    }, {
        rootMargin: '-20% 0px -62% 0px',
        threshold: [0, 0.05, 0.15, 0.3, 0.6]
    });

    sections.forEach((section) => observer.observe(section));
}

/* ============================================================
   SCROLL PROGRESS + SMART ARROW (one rAF scroll loop)
   ============================================================ */
function initScrollUi() {
    const progressBar = qs('#progress-bar');
    const arrow = qs('#scrollArrow');
    const icon = qs('#arrowIcon');
    const tooltip = qs('#arrowTooltip');
    if (!progressBar && !arrow) return;

    let ticking = false;

    const update = () => {
        ticking = false;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const scrollTop = window.scrollY;
        const ratio = Math.min(1, Math.max(0, scrollTop / maxScroll));

        if (progressBar) progressBar.style.width = `${ratio * 100}%`;
        const sidebarProgress = qs('#sidebarProgressFill');
        if (sidebarProgress) sidebarProgress.style.width = `${ratio * 100}%`;

        if (arrow && icon && tooltip) {
            const goUp = scrollTop > maxScroll * 0.48;
            icon.className = `fas ${goUp ? 'fa-chevron-up' : 'fa-chevron-down'}`;
            tooltip.textContent = goUp ? 'Scroll to top' : 'Scroll down';
            arrow.setAttribute('aria-label', goUp ? 'Scroll to top' : 'Scroll down');
            arrow.dataset.direction = goUp ? 'up' : 'down';
        }
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });

    arrow?.addEventListener('click', () => {
        const direction = arrow.dataset.direction || 'down';
        const behavior = prefersReducedMotion.matches ? 'auto' : 'smooth';
        if (direction === 'up') {
            window.scrollTo({ top: 0, behavior });
        } else {
            const currentSection = qsa('main section[id]').find((section) => {
                const rect = section.getBoundingClientRect();
                return rect.top <= window.innerHeight * 0.45 && rect.bottom > window.innerHeight * 0.45;
            });
            const sections = qsa('main section[id]');
            const currentIndex = currentSection ? sections.indexOf(currentSection) : -1;
            const next = sections[currentIndex + 1] || qs('#contact');
            next?.scrollIntoView({ behavior, block: 'start' });
        }
    });

    update();
}

/* ============================================================
   PORTFOLIO FILTERS + VIEW TRANSITIONS
   ============================================================ */
function initPortfolioFilters() {
    const buttons = qsa('.filter-btn');
    const items = qsa('.portfolio-item[data-category]');
    if (!buttons.length || !items.length) return;

    items.forEach((item, index) => {
        item.style.viewTransitionName = `project-card-${index + 1}`;
    });

    const applyFilter = (value) => {
        items.forEach((item) => {
            const categories = (item.dataset.category || '').split(/\s+/).filter(Boolean);
            const shouldShow = value === 'all' || categories.includes(value);
            item.hidden = !shouldShow;
            if (shouldShow) item.classList.add('visible');
        });
    };

    buttons.forEach((button) => {
        button.addEventListener('click', async () => {
            const filter = button.dataset.filter || 'all';
            buttons.forEach((item) => {
                const active = item === button;
                item.classList.toggle('active', active);
                item.setAttribute('aria-pressed', String(active));
            });

            const update = () => applyFilter(filter);
            if ('startViewTransition' in document && !prefersReducedMotion.matches) {
                document.startViewTransition(update);
            } else {
                update();
            }

            trackEvent('portfolio_filter_changed', { filter });
        });
    });
}

/* ============================================================
   NATIVE <dialog> CASE STUDIES
   ============================================================ */
function initDialogs() {
    const dialogs = qsa('dialog.case-dialog');
    if (!dialogs.length) return;

    const openDialog = (id, source = 'unknown') => {
        const dialog = document.getElementById(id);
        if (!(dialog instanceof HTMLDialogElement)) return;
        if (!dialog.open) dialog.showModal();
        trackEvent('case_study_opened', { case_study: id, source });
    };

    qsa('[data-dialog-open]').forEach((button) => {
        button.addEventListener('click', () => openDialog(button.dataset.dialogOpen, 'portfolio'));
    });

    dialogs.forEach((dialog) => {
        qsa('[data-dialog-close]', dialog).forEach((button) => {
            button.addEventListener('click', () => dialog.close());
        });

        dialog.addEventListener('click', (event) => {
            const rect = dialog.getBoundingClientRect();
            const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
            if (!inside) dialog.close();
        });

        dialog.addEventListener('close', () => {
            if (location.hash === `#${dialog.id}`) history.replaceState(null, '', location.pathname + location.search);
        });
    });

    const hashId = location.hash.slice(1);
    if (hashId && document.getElementById(hashId)?.matches('dialog.case-dialog')) {
        requestAnimationFrame(() => openDialog(hashId, 'url_hash'));
    }
}

/* ============================================================
   POPOVER FALLBACK
   ============================================================ */
function initQuickContact() {
    const button = qs('#quickContactButton');
    const popover = qs('#quickContact');
    if (!button || !popover) return;

    if (!('showPopover' in HTMLElement.prototype)) {
        popover.removeAttribute('popover');
        popover.hidden = true;

        button.addEventListener('click', () => {
            popover.hidden = !popover.hidden;
            popover.classList.toggle('fallback-open', !popover.hidden);
        });

        document.addEventListener('click', (event) => {
            if (!popover.hidden && !popover.contains(event.target) && event.target !== button && !button.contains(event.target)) {
                popover.hidden = true;
                popover.classList.remove('fallback-open');
            }
        });
    }

    qsa('a', popover).forEach((link) => link.addEventListener('click', () => trackEvent('quick_contact_clicked', { target: link.textContent.trim() })));
}

/* ============================================================
   INTERACTIVE ARCHITECTURE
   ============================================================ */
function initArchitectureDemo() {
    const nodes = qsa('[data-architecture]');
    const description = qs('#architectureDescription');
    const detailList = qs('#architectureDetails');
    if (!nodes.length || !description || !detailList) return;

    const content = {
        users: {
            description: 'Every architecture starts with people, roles, permissions, and the real workflow the system must support.',
            bullets: ['Identify user roles and responsibilities', 'Map tasks, approvals, and pain points', 'Design for the actual operating environment']
        },
        interface: {
            description: 'The interface layer turns business rules into clear actions across browser-based or application-oriented screens.',
            bullets: ['Responsive or platform-appropriate components', 'Clear validation and feedback states', 'Task-focused dashboards, forms, and application screens']
        },
        api: {
            description: 'The application layer processes actions, applies business rules, validates input, and coordinates data-backed workflows. The final technology depends on platform requirements.',
            bullets: ['Business logic and workflow handling', 'Validation and state changes', 'Integration between interface actions and data services']
        },
        database: {
            description: 'The data layer keeps records structured so information can be stored, retrieved, updated, filtered, and presented in operational views or reports.',
            bullets: ['Structured record organization', 'Data flows for assessments and operations', 'Reporting-oriented queries, summaries, and result views']
        }
    };

    const selectNode = (node) => {
        nodes.forEach((item) => item.classList.toggle('active', item === node));
        const data = content[node.dataset.architecture];
        if (!data) return;
        description.textContent = data.description;
        detailList.replaceChildren(...data.bullets.map((text) => {
            const li = document.createElement('li');
            li.textContent = text;
            return li;
        }));
        trackEvent('architecture_layer_selected', { layer: node.dataset.architecture });
    };

    nodes.forEach((node) => node.addEventListener('click', () => selectNode(node)));
}

/* ============================================================
   PROJECT PLANNER / COMPLEXITY ESTIMATOR
   ============================================================ */
function initProjectEstimator() {
    const form = qs('#estimatorForm');
    const complexity = qs('#complexityValue');
    const meter = qs('#complexityMeter');
    const reason = qs('#complexityReason');
    const preview = qs('#briefPreview');
    const useButton = qs('#useBriefButton');
    if (!form || !complexity || !meter || !reason || !preview || !useButton) return;

    let currentBrief = '';
    let currentType = '';

    const calculate = () => {
        const data = new FormData(form);
        const type = data.get('estimator_type') || 'Custom Management System';
        const roles = data.get('estimator_roles') || '1–3';
        const features = data.getAll('estimator_features');

        const typeScore = {
            'Business Website': 1,
            'Web Application': 2,
            'Application-Based System': 3,
            'Existing System Upgrade': 2,
            'Custom Management System': 3
        }[type] || 2;

        const roleScore = { '1–3': 1, '4–6': 2, '7+': 3 }[roles] || 1;
        const advancedFeatures = new Set(['Notifications', 'File uploads', 'Data export / reporting', 'Appointments / Scheduling', 'Offline / local workflow', 'External integration']);
        const advancedCount = features.filter((feature) => advancedFeatures.has(feature)).length;
        const score = typeScore + roleScore + Math.ceil(features.length / 3) + advancedCount;

        let level = 'Low';
        let width = 32;
        let explanation = 'A focused project with a small number of user roles and core features can usually be scoped with fewer moving parts.';

        if (score >= 10) {
            level = 'High';
            width = 88;
            explanation = 'Multiple roles, workflows, and advanced features increase coordination across interface, business logic, database design, integrations, testing, and deployment.';
        } else if (score >= 6) {
            level = 'Medium';
            width = 62;
            explanation = 'A multi-user system with several core features typically needs structured planning across interface, application logic, data, validation, testing, and deployment.';
        }

        const featureText = features.length ? features.join(', ') : 'Core features to be defined during discovery';
        currentBrief = `Project type: ${type}\nUser roles: ${roles}\nRequested features: ${featureText}\nInitial complexity indicator: ${level}\n\nI would like to discuss the current workflow, users, priorities, timeline, and technical requirements.`;
        currentType = type;

        complexity.textContent = level;
        meter.style.width = `${width}%`;
        reason.textContent = explanation;
        preview.textContent = currentBrief.replaceAll('\n', ' · ');
    };

    form.addEventListener('change', calculate);

    useButton.addEventListener('click', () => {
        const contactMessage = qs('#contactMessage');
        const projectType = qs('#projectType');
        if (!contactMessage || !projectType) return;

        const typeMap = {
            'Existing System Upgrade': 'System Maintenance / Enhancement'
        };

        const optionValue = typeMap[currentType] || currentType;
        if (qsa('option', projectType).some((option) => option.value === optionValue)) {
            projectType.value = optionValue;
        }

        contactMessage.value = currentBrief;
        contactMessage.dispatchEvent(new Event('input', { bubbles: true }));
        qs('#contact')?.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
        window.setTimeout(() => contactMessage.focus({ preventScroll: true }), prefersReducedMotion.matches ? 0 : 550);
        trackEvent('project_brief_used', { project_type: currentType, complexity: complexity.textContent });
    });

    calculate();
}

/* ============================================================
   CONTACT FORM — FORMSPREE AJAX + SAFE FALLBACK
   Formspree requires a form-specific ID from the Formspree dashboard.
   Set data-formspree-id on <body> or #contactForm once that ID exists.
   ============================================================ */
function initContactForm() {
    const form = qs('#contactForm');
    const status = qs('#formStatus');
    if (!form || !status) return;

    const submitButton = qs('button[type="submit"]', form);
    const buttonLabel = qs('span', submitButton);
    const contactEmail = (body.dataset.contactEmail || '').trim();
    const configuredId = (form.dataset.formspreeId || body.dataset.formspreeId || '').trim();
    const hasFormspree = Boolean(configuredId && configuredId !== 'YOUR_FORM_ID' && !configuredId.includes('REPLACE'));
    const formspreeEndpoint = hasFormspree ? `https://formspree.io/f/${encodeURIComponent(configuredId)}` : '';

    if (hasFormspree) {
        form.action = formspreeEndpoint;
        form.method = 'POST';
    }

    const fields = qsa('input:not([type="checkbox"]):not([type="hidden"]), select, textarea', form)
        .filter((field) => field.id && field.id !== 'companyWebsite');
    const consent = qs('#contactConsent');

    const setStatus = (message, type = '') => {
        status.textContent = message;
        status.className = `form-status ${type}`.trim();
    };

    const setFieldError = (field, message = '') => {
        field.setAttribute('aria-invalid', message ? 'true' : 'false');
        const error = qs(`[data-error-for="${field.id}"]`, form);
        if (error) error.textContent = message;
    };

    const getErrorMessage = (field) => {
        const validity = field.validity;
        if (validity.valueMissing) return 'This field is required.';
        if (validity.typeMismatch) return 'Enter a valid email address.';
        if (validity.tooShort) return `Please enter at least ${field.minLength} characters.`;
        if (validity.patternMismatch) return 'Please check the format of this field.';
        return 'Please check this field.';
    };

    const validateField = (field) => {
        const valid = field.checkValidity();
        setFieldError(field, valid ? '' : getErrorMessage(field));
        return valid;
    };

    fields.forEach((field) => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.getAttribute('aria-invalid') === 'true') validateField(field);
        });
    });

    consent?.addEventListener('change', () => setFieldError(consent, consent.checked ? '' : 'Please confirm the project-terms acknowledgement.'));

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const honeypot = qs('#companyWebsite');
        if (honeypot?.value) {
            setStatus('Thanks. Your inquiry has been received.', 'success');
            form.reset();
            return;
        }

        const fieldValidity = fields.map(validateField);
        const consentValid = consent ? consent.checked : true;
        if (consent && !consentValid) setFieldError(consent, 'Please confirm the project-terms acknowledgement.');

        if (fieldValidity.includes(false) || !consentValid) {
            setStatus('Please correct the highlighted fields before continuing.', 'error');
            qs('[aria-invalid="true"]', form)?.focus();
            trackEvent('contact_form_validation_error');
            return;
        }

        const data = new FormData(form);
        data.delete('company_website');
        // These fields make the Formspree notification easier to triage and reply to.
        if (!data.get('subject')) data.set('subject', `TechGroup Solutions Project Inquiry — ${data.get('project_type') || 'Custom System'}`);
        data.set('source_url', location.href);

        submitButton.disabled = true;
        if (buttonLabel) buttonLabel.textContent = hasFormspree ? 'Sending securely…' : 'Opening email…';
        submitButton.querySelector('i')?.classList.add('fa-spin');
        setStatus(hasFormspree ? 'Securely sending your project inquiry…' : 'Preparing a prefilled email because the Formspree form ID has not been activated yet…', 'info');

        try {
            if (hasFormspree) {
                const response = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                const result = await response.json().catch(() => ({}));
                if (!response.ok) {
                    const serverMessage = Array.isArray(result.errors) ? result.errors.map((item) => item.message).filter(Boolean).join(' ') : '';
                    throw new Error(serverMessage || `Form submission returned ${response.status}`);
                }

                const projectType = data.get('project_type') || 'not_specified';
                form.reset();
                setStatus('Thank you. Your project inquiry was sent successfully to TechGroup Solutions. We will review the details and respond using the email address you provided.', 'success');
                trackEvent('contact_form_submitted', { project_type: projectType, method: 'formspree' });
            } else {
                if (!contactEmail) throw new Error('No project-inquiry email is configured.');

                const payload = Object.fromEntries(data.entries());
                const subject = `Project Inquiry — ${payload.project_type || 'Custom System'}`;
                const message = [
                    `Name: ${payload.name || ''}`,
                    `Email: ${payload.email || ''}`,
                    `Organization: ${payload.organization || 'Not specified'}`,
                    `Project type: ${payload.project_type || 'Not specified'}`,
                    `Budget: ${payload.budget || 'Not specified'}`,
                    `Timeline: ${payload.timeline || 'Not specified'}`,
                    '',
                    'Project brief:',
                    payload.message || ''
                ].join('\n');

                window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
                setStatus('The Formspree endpoint still needs its form ID. Your email application was opened with the inquiry prefilled so the message can still be sent.', 'info');
                trackEvent('contact_form_submitted', { project_type: payload.project_type || 'not_specified', method: 'mailto_fallback' });
            }
        } catch (error) {
            console.error('Contact form submission failed:', error);
            setStatus(`We could not send the inquiry automatically. ${error.message || ''} Please email tgroupsolutions.dev2026@gmail.com or try again.`, 'error');
            trackEvent('contact_form_error');
        } finally {
            submitButton.disabled = false;
            if (buttonLabel) buttonLabel.textContent = 'Send Project Inquiry';
            submitButton.querySelector('i')?.classList.remove('fa-spin');
        }
    });

    form.addEventListener('focusin', () => {
        if (!form.dataset.started) {
            form.dataset.started = 'true';
            trackEvent('contact_form_started');
        }
    }, { once: true });
}

/* ============================================================
   SECTION-SPECIFIC MOTION + PROCESS PROGRESSION
   ============================================================ */
function initSectionMotion() {
    const sections = qsa('.section-motion');
    if (!sections.length) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle('is-active', entry.isIntersecting);
                if (entry.isIntersecting) entry.target.dataset.motionSeen = 'true';
            });
        }, { threshold: 0.12, rootMargin: '-8% 0px -12% 0px' });
        sections.forEach((section) => observer.observe(section));
    } else {
        sections.forEach((section) => section.classList.add('is-active'));
    }

    if (prefersReducedMotion.matches) return;

    const processShell = qs('#processShell');
    const processSteps = processShell ? qsa('.process-step', processShell) : [];
    let scheduled = false;

    const update = () => {
        scheduled = false;
        const viewport = window.innerHeight || 1;

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const travel = rect.height + viewport;
            const progress = Math.max(0, Math.min(1, (viewport - rect.top) / travel));
            section.style.setProperty('--section-progress', progress.toFixed(3));
        });

        if (processShell && processSteps.length) {
            const rect = processShell.getBoundingClientRect();
            const start = viewport * 0.72;
            const end = viewport * 0.26;
            const progress = Math.max(0, Math.min(1, (start - rect.top) / Math.max(1, rect.height - end + start)));
            processShell.style.setProperty('--process-progress', `${(progress * 100).toFixed(1)}%`);

            const currentIndex = Math.min(processSteps.length - 1, Math.max(0, Math.floor(progress * processSteps.length)));
            processSteps.forEach((step, index) => {
                step.classList.toggle('is-passed', index < currentIndex || progress >= 0.99);
                step.classList.toggle('is-current', index === currentIndex && progress > 0.03 && progress < 0.99);
            });
        }
    };

    const schedule = () => {
        if (!scheduled) {
            scheduled = true;
            requestAnimationFrame(update);
        }
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    schedule();
}

/* ============================================================
   GENERIC CTA ANALYTICS
   ============================================================ */
function initCtaTracking() {
    qsa('a.btn, button.btn').forEach((element) => {
        element.addEventListener('click', () => {
            const label = element.textContent.trim().replace(/\s+/g, ' ');
            trackEvent('cta_clicked', { label });
        });
    });
}


/* ============================================================
   PWA / INSTALLABLE PORTFOLIO
   ============================================================ */
function initPwa() {
    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register(new URL('sw.js', import.meta.url)).catch(() => {
                // The portfolio remains fully usable without service-worker support.
            });
        }, { once: true });
    }

    let deferredPrompt = null;
    const quickContact = qs('#quickContact');

    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredPrompt = event;
        if (!quickContact || qs('#installAppButton', quickContact)) return;

        const installButton = document.createElement('button');
        installButton.type = 'button';
        installButton.id = 'installAppButton';
        installButton.className = 'quick-contact-install';
        installButton.innerHTML = '<i class="fas fa-download" aria-hidden="true"></i><span>Install TGS app</span>';
        quickContact.appendChild(installButton);

        installButton.addEventListener('click', async () => {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            const choice = await deferredPrompt.userChoice;
            trackEvent('pwa_install_prompt', { outcome: choice.outcome });
            deferredPrompt = null;
            installButton.remove();
        });
    });

    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        qs('#installAppButton')?.remove();
        trackEvent('pwa_installed');
    });
}

/* ============================================================
   CURRENT YEAR
   ============================================================ */
function initYear() {
    const year = qs('#currentYear');
    if (year) year.textContent = String(new Date().getFullYear());
}

/* ============================================================
   BOOT
   ============================================================ */
function boot() {
    initSiteIntro();
    initTheme();
    initMobileNavigation();
    initAdvancedSidebar();
    initPointerEffects();
    initCustomCursor();
    initCardInteractions();
    initMagneticElements();
    initPageMotionState();
    initSectionMotion();
    initHeroDynamicLine();
    initRevealObserver();
    initScrollSpy();
    initScrollUi();
    initPortfolioFilters();
    initDialogs();
    initQuickContact();
    initArchitectureDemo();
    initProjectEstimator();
    initContactForm();
    initCtaTracking();
    initPwa();
    initYear();
}

boot();

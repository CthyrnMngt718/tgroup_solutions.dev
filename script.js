/* ============================================================
   ROOT VARIABLES – Dark & Light
   ============================================================ */
:root {
    --bg-primary: #080a0f;
    --bg-secondary: #0d1117;
    --bg-card: rgba(22, 30, 46, 0.75);
    --bg-sidebar: rgba(10, 14, 20, 0.92);
    --accent-1: #6366f1;
    --accent-2: #14b8a6;
    --accent-gradient: linear-gradient(135deg, #6366f1, #14b8a6, #6366f1);
    --accent-glow: rgba(99, 102, 241, 0.15);
    --text-primary: #edf2f7;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --border-color: rgba(99, 102, 241, 0.12);
    --shadow-color: rgba(0, 0, 0, 0.4);
    --radius: 16px;
    --transition: 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --nav-width: 220px;
}

/* Light mode */
[data-theme="light"] {
    --bg-primary: #f8fafc;
    --bg-secondary: #f1f5f9;
    --bg-card: rgba(255, 255, 255, 0.9);
    --bg-sidebar: rgba(255, 255, 255, 0.95);
    --text-primary: #0f172a;
    --text-secondary: #334155;
    --text-muted: #64748b;
    --border-color: rgba(99, 102, 241, 0.15);
    --shadow-color: rgba(0, 0, 0, 0.06);
    --accent-glow: rgba(99, 102, 241, 0.12);
}

/* ============================================================
   RESET & BASE
   ============================================================ */
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 20px; }
body {
    font-family: var(--font-sans);
    background-color: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    display: flex;
    min-height: 100vh;
}
a { text-decoration: none; color: inherit; }
ul { list-style: none; }
img { max-width: 100%; display: block; }

/* ============================================================
   SCROLLBAR
   ============================================================ */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--bg-secondary); }
::-webkit-scrollbar-thumb { background: var(--accent-1); border-radius: 10px; }

/* ============================================================
   SIDEBAR NAVIGATION
   ============================================================ */
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: var(--nav-width);
    height: 100vh;
    background: var(--bg-sidebar);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    padding: 32px 16px;
    z-index: 1000;
    transition: transform 0.4s var(--ease-spring);
}

.sidebar-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 40px;
    padding: 0 8px;
}

.logo-icon {
    width: 42px;
    height: 42px;
    background: var(--accent-gradient);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 800;
    color: #fff;
    font-family: var(--font-mono);
    box-shadow: 0 0 30px var(--accent-glow);
    flex-shrink: 0;
}

.logo-label {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text-primary);
}

.sidebar-nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.sidebar-nav a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-muted);
    transition: all 0.3s var(--ease-spring);
}

.sidebar-nav a i {
    width: 20px;
    font-size: 1rem;
    text-align: center;
}

.sidebar-nav a:hover,
.sidebar-nav a.active {
    color: var(--text-primary);
    background: rgba(99, 102, 241, 0.08);
}

.sidebar-nav a.active {
    color: var(--accent-1);
    background: rgba(99, 102, 241, 0.12);
}

.sidebar-bottom {
    padding-top: 16px;
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: center;
}

.sidebar-bottom #theme-toggle {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 1.1rem;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: var(--transition);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sidebar-bottom #theme-toggle:hover {
    color: var(--accent-1);
    background: rgba(99, 102, 241, 0.08);
    transform: rotate(20deg);
}

/* Mobile Toggle */
.mobile-toggle {
    display: none;
    position: fixed;
    top: 16px;
    right: 20px;
    z-index: 1001;
    background: var(--bg-card);
    backdrop-filter: blur(12px);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 10px 12px;
    cursor: pointer;
    color: var(--text-primary);
    font-size: 1.2rem;
}

/* ============================================================
   MAIN CONTENT
   ============================================================ */
.main-content {
    margin-left: var(--nav-width);
    flex: 1;
    padding: 0 60px 60px;
    max-width: 100%;
}

/* ============================================================
   SECTION COMMON
   ============================================================ */
section {
    padding: 60px 0 40px;
    border-bottom: 1px solid var(--border-color);
}
section:last-of-type { border-bottom: none; }

.section-header { margin-bottom: 40px; }

.section-tag {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--accent-1);
    background: rgba(99, 102, 241, 0.08);
    padding: 4px 14px;
    border-radius: 50px;
    border: 1px solid var(--border-color);
    font-family: var(--font-mono);
    margin-bottom: 10px;
}

.section-header h2 {
    font-size: 2.4rem;
    font-weight: 800;
    line-height: 1.15;
}

.gradient-text {
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
    animation: gradShift 5s ease-in-out infinite;
}

@keyframes gradShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

.section-sub {
    color: var(--text-secondary);
    font-size: 1.05rem;
    max-width: 600px;
    margin-top: 8px;
}

/* ============================================================
   HERO
   ============================================================ */
#hero {
    padding-top: 80px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: none;
    position: relative;
}

.hero-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(99, 102, 241, 0.06);
    border: 1px solid var(--border-color);
    padding: 4px 16px 4px 12px;
    border-radius: 50px;
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--text-secondary);
    font-family: var(--font-mono);
    margin-bottom: 20px;
}

.badge-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent-2);
    animation: pulseDot 2s ease-in-out infinite;
    box-shadow: 0 0 12px rgba(20, 184, 166, 0.4);
}

@keyframes pulseDot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
}

.hero-content h1 {
    font-size: 3.6rem;
    font-weight: 900;
    line-height: 1.08;
    margin-bottom: 8px;
}
.hero-content h1 .gradient-text { font-size: 3.6rem; }

.hero-sub {
    font-size: 1.15rem;
    color: var(--text-secondary);
    font-weight: 400;
    margin-bottom: 12px;
}

.hero-desc {
    font-size: 1rem;
    color: var(--text-secondary);
    max-width: 480px;
    line-height: 1.8;
    margin-bottom: 28px;
}

.hero-buttons {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s var(--ease-spring);
    border: 2px solid transparent;
    cursor: pointer;
}

.btn-primary {
    background: var(--accent-gradient);
    color: #fff;
    border-color: var(--accent-1);
    box-shadow: 0 0 30px var(--accent-glow);
}
.btn-primary:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 0 50px var(--accent-glow);
}

.btn-secondary {
    background: transparent;
    color: var(--text-primary);
    border-color: var(--border-color);
}
.btn-secondary:hover {
    border-color: var(--accent-1);
    color: var(--accent-1);
    box-shadow: 0 0 30px var(--accent-glow);
    transform: translateY(-3px);
}

.hero-stats {
    display: flex;
    align-items: center;
    gap: 32px;
    margin-top: 36px;
}
.stat { display: flex; flex-direction: column; }
.stat-number {
    font-size: 1.8rem;
    font-weight: 800;
    font-family: var(--font-mono);
    color: var(--text-primary);
}
.stat-label {
    font-size: 0.7rem;
    color: var(--text-muted);
    font-weight: 400;
}
.stat-divider {
    width: 1px;
    height: 36px;
    background: var(--border-color);
}

.hero-image {
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero-image-wrapper {
    position: relative;
    width: 340px;
    height: 340px;
}

.hero-visual {
    width: 100%;
    height: 100%;
    border-radius: 24px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    overflow: hidden;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.code-window {
    width: 90%;
    max-width: 280px;
    background: var(--bg-primary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    overflow: hidden;
    font-family: var(--font-mono);
    font-size: 0.75rem;
}

.code-header {
    display: flex;
    gap: 6px;
    padding: 10px 14px;
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-color);
}
.code-header span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--text-muted);
    opacity: 0.3;
}
.code-header span:nth-child(1) { background: #ff5f57; }
.code-header span:nth-child(2) { background: #ffbd2e; }
.code-header span:nth-child(3) { background: #28c840; }

.code-content {
    padding: 16px 14px;
    color: var(--text-secondary);
    line-height: 1.8;
}
.code-content span { color: var(--accent-1); }
.code-content .indent { padding-left: 16px; }

.hero-ring {
    position: absolute;
    inset: -12px;
    border-radius: 50%;
    border: 2px solid var(--border-color);
    animation: spinRing 25s linear infinite;
    z-index: 0;
}
.hero-ring-2 {
    position: absolute;
    inset: -24px;
    border-radius: 50%;
    border: 2px dashed var(--border-color);
    animation: spinRing 40s linear infinite reverse;
    z-index: 0;
    opacity: 0.4;
}

@keyframes spinRing {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    animation: bounce 2s infinite;
}
.scroll-indicator a {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid var(--border-color);
    color: var(--text-secondary);
    text-align: center;
    line-height: 40px;
    transition: var(--transition);
}
.scroll-indicator a:hover {
    border-color: var(--accent-1);
    color: var(--accent-1);
    background: rgba(99, 102, 241, 0.06);
}
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
    40% { transform: translateX(-50%) translateY(-10px); }
    60% { transform: translateX(-50%) translateY(-5px); }
}

/* ============================================================
   ABOUT
   ============================================================ */
#about {
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
}

.about-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}

.about-card {
    background: var(--bg-card);
    backdrop-filter: blur(8px);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 28px 24px;
    text-align: center;
    transition: all 0.4s var(--ease-spring);
}
.about-card:hover {
    transform: translateY(-6px);
    border-color: var(--accent-1);
    box-shadow: 0 16px 40px var(--shadow-color);
}

.service-icon {
    width: 56px;
    height: 56px;
    margin: 0 auto 14px;
    border-radius: 50%;
    background: rgba(99, 102, 241, 0.06);
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: var(--accent-1);
    transition: var(--transition);
}
.about-card:hover .service-icon {
    background: rgba(99, 102, 241, 0.12);
    box-shadow: 0 0 24px var(--accent-glow);
    transform: scale(1.05);
}
.about-card h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; }
.about-card p { color: var(--text-secondary); font-size: 0.88rem; line-height: 1.7; }

/* ============================================================
   SERVICES
   ============================================================ */
.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
}

.service-card {
    background: var(--bg-card);
    backdrop-filter: blur(8px);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 28px 24px;
    text-align: center;
    transition: all 0.4s var(--ease-spring);
}
.service-card:hover {
    transform: translateY(-6px);
    border-color: var(--accent-1);
    box-shadow: 0 16px 40px var(--shadow-color);
}
.service-card .service-icon { margin: 0 auto 14px; }
.service-card h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; }
.service-card p { color: var(--text-secondary); font-size: 0.88rem; line-height: 1.7; }

/* ============================================================
   PORTFOLIO
   ============================================================ */
.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
}

.portfolio-item {
    background: var(--bg-card);
    backdrop-filter: blur(8px);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    overflow: hidden;
    transition: all 0.4s var(--ease-spring);
}
.portfolio-item:hover {
    transform: translateY(-6px);
    border-color: var(--accent-1);
    box-shadow: 0 16px 40px var(--shadow-color);
}

.portfolio-thumb {
    height: 160px;
    background: var(--bg-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.8rem;
    opacity: 0.5;
    color: var(--accent-1);
}

.portfolio-info { padding: 20px 22px 24px; }
.portfolio-info .section-tag { margin-bottom: 6px; font-size: 0.6rem; }
.portfolio-info h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 4px; }
.portfolio-info p { color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 10px; line-height: 1.6; }

.portfolio-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}
.portfolio-tags span {
    background: rgba(99, 102, 241, 0.06);
    padding: 2px 12px;
    border-radius: 50px;
    font-size: 0.6rem;
    color: var(--accent-1);
    border: 1px solid var(--border-color);
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.3px;
}

/* ============================================================
   SKILLS
   ============================================================ */
#skills {
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
}

.skill-item { margin-bottom: 8px; }
.skill-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 4px;
}
.skill-info span:last-child { color: var(--accent-1); }

.progress-bar {
    height: 6px;
    background: var(--bg-card);
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border-color);
}
.progress-fill {
    height: 100%;
    background: var(--accent-gradient);
    border-radius: 10px;
    transition: width 1.5s var(--ease-spring);
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
.testimonial-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
}

.testimonial-card {
    background: var(--bg-card);
    backdrop-filter: blur(8px);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 28px 24px;
    transition: all 0.4s var(--ease-spring);
}
.testimonial-card:hover {
    transform: translateY(-6px);
    border-color: var(--accent-1);
    box-shadow: 0 16px 40px var(--shadow-color);
}
.testimonial-card p {
    color: var(--text-secondary);
    font-style: italic;
    font-size: 0.95rem;
    line-height: 1.7;
    margin-bottom: 16px;
}
.testimonial-author .author {
    font-weight: 700;
    color: var(--text-primary);
    display: block;
}
.testimonial-author .role {
    color: var(--text-muted);
    font-size: 0.8rem;
    font-weight: 400;
}

/* ============================================================
   CONTACT & FOOTER
   ============================================================ */
#contact {
    padding: 0;
    background: var(--bg-primary);
    border-bottom: none;
}
#contact .section-header { padding: 60px 40px 0 40px; }
#contact .contact-grid { padding: 0 40px 40px 40px; }

.contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 50px;
}

.contact-info { display: flex; flex-direction: column; gap: 16px; }
.contact-info h3 { font-size: 1.2rem; font-weight: 700; }
.contact-info p { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 8px; }

.contact-item {
    display: flex;
    align-items: center;
    gap: 14px;
    color: var(--text-secondary);
    font-size: 0.9rem;
    transition: var(--transition);
}
.contact-item:hover { color: var(--text-primary); }
.contact-item i {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 50%;
    color: var(--accent-1);
    flex-shrink: 0;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
}
.contact-form input,
.contact-form textarea,
.contact-form select {
    padding: 14px 18px;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    background: var(--bg-card);
    backdrop-filter: blur(8px);
    color: var(--text-primary);
    font-size: 0.9rem;
    transition: var(--transition);
    font-family: var(--font-sans);
    outline: none;
    appearance: none;
}
.contact-form select option { background: var(--bg-primary); color: var(--text-primary); }
.contact-form input:focus,
.contact-form textarea:focus,
.contact-form select:focus {
    border-color: var(--accent-1);
    box-shadow: 0 0 24px var(--accent-glow);
    background: rgba(99, 102, 241, 0.04);
}

/* Footer inside contact */
#contact footer {
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
    padding: 20px 40px 16px;
    width: 100%;
    margin: 0;
    text-align: center;
}
#contact footer .footer-inner {
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
#contact footer .footer-social { display: flex; gap: 12px; }
#contact footer .footer-social a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    color: var(--text-muted);
    transition: var(--transition);
    font-size: 0.85rem;
}
#contact footer .footer-social a:hover {
    border-color: var(--accent-1);
    color: var(--accent-1);
    box-shadow: 0 0 20px var(--accent-glow);
    transform: translateY(-3px);
}
#contact footer .footer-copy {
    font-size: 0.7rem;
    color: var(--text-muted);
    opacity: 0.5;
    margin: 0;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 1024px) {
    .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 40px;
    }
    .hero-desc { margin: 0 auto 28px; }
    .hero-buttons { justify-content: center; }
    .hero-stats { justify-content: center; }
    .hero-image-wrapper { width: 260px; height: 260px; }
    .about-grid { grid-template-columns: repeat(2, 1fr); }
    .contact-grid { grid-template-columns: 1fr; gap: 30px; }
}

@media (max-width: 768px) {
    :root { --nav-width: 0; }
    .sidebar {
        transform: translateX(-100%);
        width: 220px;
        padding: 24px 16px;
    }
    .sidebar.open { transform: translateX(0); }
    .mobile-toggle { display: flex; align-items: center; justify-content: center; }
    .main-content { margin-left: 0; padding: 0 20px 40px; }
    #hero { padding-top: 72px; min-height: auto; }
    .hero-content h1 { font-size: 2.2rem; }
    .hero-content h1 .gradient-text { font-size: 2.2rem; }
    .hero-image-wrapper { width: 180px; height: 180px; }
    .hero-stats { gap: 16px; flex-wrap: wrap; }
    .stat-divider { height: 28px; }
    .scroll-indicator { bottom: 15px; }
    .section-header h2 { font-size: 1.8rem; }
    .about-grid { grid-template-columns: 1fr; }
    .services-grid, .portfolio-grid, .skills-grid { grid-template-columns: 1fr; }
    #contact .section-header { padding: 40px 20px 0 20px; }
    #contact .contact-grid { padding: 0 20px 30px 20px; }
    #contact footer { padding: 16px 20px 12px; }
}

@media (max-width: 480px) {
    .hero-content h1 { font-size: 1.8rem; }
    .hero-content h1 .gradient-text { font-size: 1.8rem; }
    .btn { padding: 10px 18px; font-size: 0.8rem; }
    section { padding: 40px 0 30px; }
    .hero-image-wrapper { width: 140px; height: 140px; }
    .hero-ring { inset: -8px; }
    .hero-ring-2 { display: none; }
    .stat-number { font-size: 1.3rem; }
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
.reveal {
    opacity: 0;
    transform: translateY(36px);
    transition: opacity 0.8s cubic-bezier(0.2, 0.9, 0.3, 1),
                transform 0.8s cubic-bezier(0.2, 0.9, 0.3, 1);
}
.reveal.visible { opacity: 1; transform: translateY(0); }
.reveal-d1 { transition-delay: 0.06s; }
.reveal-d2 { transition-delay: 0.12s; }
.reveal-d3 { transition-delay: 0.18s; }
.reveal-d4 { transition-delay: 0.24s; }

/* ============================================================
   PROGRESS BAR (top)
   ============================================================ */
#progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--accent-gradient);
    width: 0%;
    z-index: 9999;
    box-shadow: 0 0 20px var(--accent-glow);
    transition: width 0.12s ease-out;
}

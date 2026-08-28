// ============================================================
// MOBILE SIDEBAR TOGGLE
// ============================================================
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        const isOpen = sidebar.classList.contains('open');
        mobileToggle.innerHTML = isOpen ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
        mobileToggle.setAttribute('aria-expanded', isOpen);
    });
}

// Close sidebar on link click (mobile)
document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// ============================================================
// SCROLLSPY – Active nav link
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.sidebar-nav a');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = Math.min(progress, 100) + '%';
});

// ============================================================
// THEME TOGGLE
// ============================================================
const themeToggle = document.getElementById('theme-toggle');
const storedTheme = localStorage.getItem('theme') || 'dark';

if (storedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================================
// SKILLS – Animate progress bars on reveal
// ============================================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.progress-fill');
            fills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 200);
            });
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-item').forEach(el => skillObserver.observe(el));

// ============================================================
// SINGLE VERSATILE ARROW BUTTON (like your portfolio)
// ============================================================
const scrollArrow = document.getElementById('scrollArrow');
const arrowIcon = document.getElementById('arrowIcon');
const arrowTooltip = document.getElementById('arrowTooltip');

function updateArrow() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const atTop = scrollTop < 50;
    const atBottom = scrollTop > docHeight - 50;

    if (atBottom) {
        arrowIcon.className = 'fas fa-chevron-up';
        arrowTooltip.textContent = 'Scroll to Top';
    } else if (atTop) {
        arrowIcon.className = 'fas fa-chevron-down';
        arrowTooltip.textContent = 'Scroll Down';
    } else {
        // If in middle, check which direction is closer
        const toTop = scrollTop;
        const toBottom = docHeight - scrollTop;
        if (toTop < toBottom) {
            arrowIcon.className = 'fas fa-chevron-up';
            arrowTooltip.textContent = 'Scroll to Top';
        } else {
            arrowIcon.className = 'fas fa-chevron-down';
            arrowTooltip.textContent = 'Scroll Down';
        }
    }
}

scrollArrow.addEventListener('click', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const atTop = scrollTop < 50;
    const atBottom = scrollTop > docHeight - 50;

    if (atBottom || (!atTop && scrollTop > docHeight / 2)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: docHeight, behavior: 'smooth' });
    }
});

window.addEventListener('scroll', updateArrow);
updateArrow();

// ============================================================
// CONTACT FORM
// ============================================================
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        setTimeout(() => {
            btn.innerHTML = original;
            btn.disabled = false;
            this.reset();
        }, 2000);
    }, 1500);
});

// ============================================================
// UPDATE FOOTER YEAR
// ============================================================
document.getElementById('current-year').textContent = new Date().getFullYear();

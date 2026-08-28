// ============================================================
// AMBIENT MOUSE-FOLLOW
// ============================================================
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', x + '%');
    document.documentElement.style.setProperty('--mouse-y', y + '%');
});

// ============================================================
// THEME TOGGLE
// ============================================================
const themeToggle = document.getElementById('themeToggle');
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
// MOBILE SIDEBAR TOGGLE
// ============================================================
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');
mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    const isOpen = sidebar.classList.contains('open');
    mobileToggle.innerHTML = isOpen ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
    mobileToggle.setAttribute('aria-expanded', isOpen);
});
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
// SCROLLSPY for sidebar nav
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.sidebar-nav a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
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
});

// ============================================================
// PROGRESS BAR
// ============================================================
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = Math.min(progress, 100) + '%';
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
// COUNTER ANIMATION
// ============================================================
function animateCounter(el, target) {
    let current = 0;
    const increment = Math.ceil(target / 80);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = current;
        }
    }, 20);
}
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

// ============================================================
// TYPING EFFECT (Hero)
// ============================================================
(function typing() {
    const el = document.getElementById('typedText');
    const phrases = [
        'Built Around Your Needs',
        'Scalable & Reliable',
        'User-Focused Design',
        'Custom Solutions'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function type() {
        const fullText = phrases[phraseIndex];
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }
        el.textContent = currentText;
        if (!isDeleting && charIndex === fullText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
            return;
        }
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 500);
            return;
        }
        const speed = isDeleting ? 40 : 80;
        setTimeout(type, speed);
    }
    type();
})();

// ============================================================
// PORTFOLIO FILTER
// ============================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.dataset.filter;

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.dataset.category === filterValue) {
                item.style.display = 'block';
                // Re-trigger reveal animation
                setTimeout(() => item.classList.add('visible'), 50);
            } else {
                item.style.display = 'none';
                item.classList.remove('visible');
            }
        });
    });
});

// ============================================================
// PORTFOLIO MODALS
// ============================================================
const modalOverlays = document.querySelectorAll('.modal-overlay');
const projectCards = document.querySelectorAll('.portfolio-item[data-modal]');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    });
});

modalOverlays.forEach(modal => {
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});

// ============================================================
// FLOATING CTA TOGGLE
// ============================================================
const ctaToggle = document.getElementById('ctaToggle');
const floatingCta = document.getElementById('floatingCta');
ctaToggle.addEventListener('click', () => {
    floatingCta.classList.toggle('open');
});

// ============================================================
// SCROLL ARROW (Single versatile arrow)
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
// RIPPLE EFFECT ON BUTTONS
// ============================================================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================================
// UPDATE FOOTER YEAR
// ============================================================
document.getElementById('current-year').textContent = new Date().getFullYear();

// ============================================================
// CLOSE FLOATING CTA & MODALS ON ESCAPE
// ============================================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        floatingCta.classList.remove('open');
        modalOverlays.forEach(modal => {
            if (modal.classList.contains('open')) {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }
});

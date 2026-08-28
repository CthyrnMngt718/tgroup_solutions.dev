// ============================================================
// MOBILE SIDEBAR TOGGLE
// ============================================================
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');
const menuIcon = mobileToggle.querySelector('i');

mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    const isOpen = sidebar.classList.contains('open');
    menuIcon.className = isOpen ? 'fas fa-xmark' : 'fas fa-bars';
    mobileToggle.setAttribute('aria-expanded', isOpen);
});

// Close sidebar when a nav link is clicked (mobile)
document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
            menuIcon.className = 'fas fa-bars';
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// ============================================================
// ACTIVE NAV LINK ON SCROLL
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
        if (link.getAttribute('data-section') === current) {
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
    themeToggle.innerHTML = newTheme === 'light' ?
        '<i class="fas fa-sun"></i>' :
        '<i class="fas fa-moon"></i>';
});

// ============================================================
// SCROLL REVEAL (IntersectionObserver)
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

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
// GITHUB REPOS – Fetch from API (with fallback)
// ============================================================
(async function fetchGitHubRepos() {
    const username = 'TechGroupSolutions'; // Replace with your actual GitHub username
    const container = document.getElementById('repo-container');

    // Fallback data (in case API fails or rate limit)
    const fallbackRepos = [
        {
            name: 'health-system-rhu',
            description: 'Complete healthcare management system for rural health units – PHP / MySQL / Bootstrap.',
            language: 'PHP',
            stargazers_count: 12,
            forks_count: 4,
            updated_at: new Date(Date.now() - 2 * 86400000).toISOString() // 2 days ago
        },
        {
            name: 'career-assessment-angono',
            description: 'Career assessment tool for Senior High students – used by 100+ students.',
            language: 'PHP',
            stargazers_count: 8,
            forks_count: 2,
            updated_at: new Date(Date.now() - 7 * 86400000).toISOString() // 7 days ago
        },
        {
            name: 'howcan-i-help',
            description: 'Healthcare assistance platform connecting patients with donors and resources.',
            language: 'PHP',
            stargazers_count: 6,
            forks_count: 1,
            updated_at: new Date(Date.now() - 21 * 86400000).toISOString() // 3 weeks ago
        }
    ];

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!response.ok) throw new Error('GitHub API limit or error');
        const repos = await response.json();

        // Render repos
        renderRepos(repos);

    } catch (error) {
        console.warn('GitHub API not available, using fallback data.');
        renderRepos(fallbackRepos);
    }

    function renderRepos(repos) {
        container.innerHTML = repos.map(repo => `
            <div class="repo-card reveal reveal-d1">
                <div class="repo-top">
                    <div class="repo-name">
                        <i class="fas fa-book"></i> ${repo.name}
                    </div>
                    <span style="font-size:0.65rem;color:var(--text-muted);font-family:var(--font-mono);">${repo.private ? 'private' : 'public'}</span>
                </div>
                <div class="repo-desc">${repo.description || 'No description provided.'}</div>
                <div class="repo-meta">
                    <span><span class="lang-dot" style="background:${getLanguageColor(repo.language)};"></span> ${repo.language || 'N/A'}</span>
                    <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-fork"></i> ${repo.forks_count}</span>
                    <span>updated ${timeAgo(repo.updated_at)}</span>
                </div>
            </div>
        `).join('');

        // Observe new repo cards for scroll reveal
        document.querySelectorAll('#repo-container .repo-card').forEach(el => {
            revealObserver.observe(el);
        });
    }

    function getLanguageColor(lang) {
        const colors = {
            'PHP': '#4f5d95',
            'JavaScript': '#f1e05a',
            'Python': '#3572A5',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Ruby': '#701516',
            'Go': '#00ADD8',
            'TypeScript': '#2b7489',
            'Shell': '#89e051',
            'C': '#555555',
            'C++': '#f34b7d',
            'Java': '#b07219',
            'Rust': '#dea584',
        };
        return colors[lang] || '#6b6b6b';
    }

    function timeAgo(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + ' years ago';
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + ' months ago';
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + ' days ago';
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + ' hours ago';
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + ' minutes ago';
        return 'just now';
    }
})();

// ============================================================
// UPDATE FOOTER YEAR
// ============================================================
document.getElementById('current-year').textContent = new Date().getFullYear();

/* ── Theme ── */
const THEME_KEY = 'zeus_theme';

function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
}

function updateThemeIcons(theme) {
    const isLight = theme === 'light';
    const icon = isLight ? 'fa-moon' : 'fa-sun';
    document.querySelectorAll('#theme-toggle i').forEach(el => {
        el.className = 'fa-solid ' + icon;
    });
    const mobileIcon = document.querySelector('#theme-toggle-mobile i');
    if (mobileIcon) mobileIcon.className = 'fa-solid ' + icon + ' ml-2';
    const label = document.getElementById('theme-toggle-label');
    if (label) label.textContent = isLight ? 'الوضع الداكن' : 'الوضع الفاتح';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
        localStorage.setItem(THEME_KEY, theme);
        localStorage.setItem('zeus_admin_theme', theme);
    } catch { /* ignore */ }
    updateThemeIcons(theme);
}

function toggleTheme() {
    setTheme(getTheme() === 'light' ? 'dark' : 'light');
}

document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
document.getElementById('theme-toggle-mobile')?.addEventListener('click', () => {
    toggleTheme();
    setMenuOpen(false);
});
updateThemeIcons(getTheme());

/* ── Mobile Menu ── */
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileBackdrop = document.getElementById('mobile-menu-backdrop');
const menuIcon = menuBtn.querySelector('i');

function setMenuOpen(open) {
    menuBtn.setAttribute('aria-expanded', open);
    mobileMenu.setAttribute('aria-hidden', !open);
    mobileBackdrop.setAttribute('aria-hidden', !open);
    mobileMenu.classList.toggle('is-open', open);
    mobileBackdrop.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    menuIcon.className = open ? 'fa-solid fa-xmark text-lg' : 'fa-solid fa-bars text-lg';
}

function toggleMenu() {
    setMenuOpen(!mobileMenu.classList.contains('is-open'));
}

menuBtn.addEventListener('click', toggleMenu);
mobileBackdrop.addEventListener('click', () => setMenuOpen(false));

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuOpen(false);
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) setMenuOpen(false);
});

/* ── Smooth Scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const navHeight = document.getElementById('navbar').offsetHeight;
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* ── Navbar Scroll + Active Link + Background Fade ── */
const navbar = document.getElementById('navbar');
const scrollBg = document.getElementById('scroll-bg');
const navLinks = document.querySelectorAll('.nav-link, .mobile-link:not(.mobile-link--cta)');
const sections = document.querySelectorAll('section[id]');
const FADE_DISTANCE = 700;

function onScroll() {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 50);

    if (scrollBg) {
        const opacity = Math.max(0, 1 - scrollY / FADE_DISTANCE);
        scrollBg.style.opacity = opacity;
        scrollBg.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible';
    }

    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - navbar.offsetHeight - 80;
        if (scrollY >= top) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('is-active', href === `#${current}`);
    });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Testimonial Slider ── */
let currentSlide = 0;
let slideInterval;

function initTestimonials() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    if (!slides.length) return;

    clearInterval(slideInterval);
    currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active-slide', i === index);
            slide.classList.toggle('hidden-slide', i !== index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        showSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    const nextBtn = document.getElementById('next-testimonial');
    const prevBtn = document.getElementById('prev-testimonial');
    if (nextBtn) {
        nextBtn.replaceWith(nextBtn.cloneNode(true));
        document.getElementById('next-testimonial').addEventListener('click', () => { nextSlide(); resetInterval(); });
    }
    if (prevBtn) {
        prevBtn.replaceWith(prevBtn.cloneNode(true));
        document.getElementById('prev-testimonial').addEventListener('click', () => { prevSlide(); resetInterval(); });
    }
    dots.forEach(dot => {
        dot.onclick = () => { showSlide(parseInt(dot.dataset.index, 10)); resetInterval(); };
    });

    showSlide(0);
    slideInterval = setInterval(nextSlide, 5000);
}

window.reinitTestimonials = initTestimonials;
initTestimonials();

/* ── Portfolio Filter & Video ── */
function isVideoFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement);
}

function exitVideoFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}

async function openPortfolioVideo(card, video) {
    document.querySelectorAll('.portfolio-card--video video').forEach(v => {
        if (v !== video) {
            v.pause();
            v.controls = false;
            v.closest('.portfolio-card--video')?.classList.remove('is-playing');
        }
    });

    video.muted = false;
    video.controls = true;
    card.classList.add('is-playing');

    try {
        if (video.requestFullscreen) await video.requestFullscreen();
        else if (video.webkitEnterFullscreen) { video.webkitEnterFullscreen(); await video.play(); return; }
        else if (video.webkitRequestFullscreen) await video.webkitRequestFullscreen();
        await video.play();
    } catch {
        try { await video.play(); } catch { /* user gesture required */ }
    }
}

function resetPortfolioVideo(video) {
    video.pause();
    video.controls = false;
    video.currentTime = 0;
    video.closest('.portfolio-card--video')?.classList.remove('is-playing');
}

function initPortfolio() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.onclick = () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            document.querySelectorAll('.portfolio-card').forEach(item => {
                const match = filter === 'all' || item.dataset.category === filter;
                item.style.display = match ? '' : 'none';
                if (match) {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    requestAnimationFrame(() => {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    });
                }
            });
        };
    });

    document.querySelectorAll('.portfolio-card--video').forEach(card => {
        const video = card.querySelector('video');
        if (!video) return;

        card.onclick = () => {
            if (isVideoFullscreen() && document.fullscreenElement === video) {
                exitVideoFullscreen();
                return;
            }
            if (video.paused) openPortfolioVideo(card, video);
            else { video.pause(); card.classList.remove('is-playing'); }
        };

        video.onended = () => {
            resetPortfolioVideo(video);
            if (isVideoFullscreen()) exitVideoFullscreen();
        };
    });
}

window.reinitPortfolio = initPortfolio;
initPortfolio();

if (!window._zeusFullscreenBound) {
    window._zeusFullscreenBound = true;
    ['fullscreenchange', 'webkitfullscreenchange'].forEach(evt => {
        document.addEventListener(evt, () => {
            if (isVideoFullscreen()) return;
            document.querySelectorAll('.portfolio-card--video video').forEach(resetPortfolioVideo);
        });
    });
}

/* ── Newsletter Form ── */
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('newsletter-msg');
    msg.classList.remove('hidden');
    e.target.reset();
    setTimeout(() => msg.classList.add('hidden'), 4000);
});

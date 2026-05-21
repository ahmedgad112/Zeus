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

/* ── Service Card Mouse Glow ── */
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
    });

    const glowColors = {
        cyan: 'rgba(34,211,238,0.15)',
        purple: 'rgba(168,85,247,0.15)',
        blue: 'rgba(59,130,246,0.15)',
        amber: 'rgba(245,158,11,0.15)',
    };
    const glow = glowColors[card.dataset.glow] || glowColors.cyan;
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = `0 20px 60px ${glow}, 0 0 0 1px rgba(255,255,255,0.1)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
    });
});

/* ── Testimonial Slider ── */
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active-slide', i === index);
        slide.classList.toggle('hidden-slide', i !== index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('bg-cyan-400', i === index);
        dot.classList.toggle('bg-white/20', i !== index);
        dot.classList.toggle('w-6', i === index);
        dot.classList.toggle('w-2.5', i !== index);
    });
    currentSlide = index;
}

function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
}

document.getElementById('next-testimonial').addEventListener('click', () => {
    nextSlide();
    resetInterval();
});
document.getElementById('prev-testimonial').addEventListener('click', () => {
    prevSlide();
    resetInterval();
});
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        showSlide(parseInt(dot.dataset.index));
        resetInterval();
    });
});

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}
slideInterval = setInterval(nextSlide, 5000);

/* ── Portfolio Filter ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('active', 'bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/30');
            b.classList.add('text-slate-400', 'border-white/10');
        });
        btn.classList.add('active', 'bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/30');
        btn.classList.remove('text-slate-400', 'border-white/10');

        const filter = btn.dataset.filter;
        portfolioItems.forEach(item => {
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
    });
});

/* ── Portfolio Video Play ── */
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
        if (video.requestFullscreen) {
            await video.requestFullscreen();
        } else if (video.webkitEnterFullscreen) {
            video.webkitEnterFullscreen();
            await video.play();
            return;
        } else if (video.webkitRequestFullscreen) {
            await video.webkitRequestFullscreen();
        }
        await video.play();
    } catch {
        try {
            await video.play();
        } catch { /* user gesture required */ }
    }
}

function resetPortfolioVideo(video) {
    video.pause();
    video.controls = false;
    video.currentTime = 0;
    video.closest('.portfolio-card--video')?.classList.remove('is-playing');
}

document.querySelectorAll('.portfolio-card--video').forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;

    card.addEventListener('click', () => {
        if (isVideoFullscreen() && document.fullscreenElement === video) {
            exitVideoFullscreen();
            return;
        }
        if (video.paused) openPortfolioVideo(card, video);
        else {
            video.pause();
            card.classList.remove('is-playing');
        }
    });

    video.addEventListener('ended', () => {
        resetPortfolioVideo(video);
        if (isVideoFullscreen()) exitVideoFullscreen();
    });
});

['fullscreenchange', 'webkitfullscreenchange'].forEach(evt => {
    document.addEventListener(evt, () => {
        if (isVideoFullscreen()) return;
        document.querySelectorAll('.portfolio-card--video video').forEach(resetPortfolioVideo);
    });
});

/* ── Newsletter Form ── */
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('newsletter-msg');
    msg.classList.remove('hidden');
    e.target.reset();
    setTimeout(() => msg.classList.add('hidden'), 4000);
});

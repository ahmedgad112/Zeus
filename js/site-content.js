/**
 * تحميل وعرض محتوى الموقع من ContentStore
 */
(function () {
    const PROCESS_COLORS = {
        cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', hover: 'group-hover:border-cyan-500/20', shadow: 'group-hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]' },
        purple: { border: 'border-purple-500/30', text: 'text-purple-400', hover: 'group-hover:border-purple-500/20', shadow: 'group-hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]' },
        blue: { border: 'border-blue-500/30', text: 'text-blue-400', hover: 'group-hover:border-blue-500/20', shadow: 'group-hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]' },
        amber: { border: 'border-amber-500/30', text: 'text-amber-400', hover: 'group-hover:border-amber-500/20', shadow: 'group-hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]' },
    };

    const GLOW_ICON = {
        cyan: 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500',
        purple: 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500',
        blue: 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500',
        amber: 'bg-amber-500/10 text-amber-400 group-hover:bg-amber-500',
    };

    function setHtml(id, html) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
    }

    function setText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    function renderPortfolioItem(item) {
        const isVideo = item.mediaType === 'video';
        const videoClass = isVideo ? ' portfolio-card--video' : '';
        const media = isVideo
            ? `<video class="portfolio-card__asset" src="${item.src}" playsinline preload="metadata"></video>
               <span class="portfolio-card__play" aria-hidden="true"><i class="fa-solid fa-play"></i></span>`
            : `<img class="portfolio-card__asset" src="${item.src}" alt="${item.alt || item.title}" loading="lazy">`;

        return `<div class="portfolio-card${videoClass} group" data-category="${item.category}" data-id="${item.id}">
            <div class="portfolio-card__media">${media}</div>
            <div class="portfolio-card__info">
                <span class="text-xs font-bold ${item.tagClass} uppercase tracking-wide mb-1">${item.tag}</span>
                <h4 class="text-base sm:text-lg font-bold text-white">${item.title}</h4>
            </div>
        </div>`;
    }

    function applyContent(data) {
        document.title = data.meta.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = data.meta.description;

        setText('hero-badge', data.hero.badge);
        setText('hero-title-1', data.hero.titleLine1);
        setText('hero-title-highlight', data.hero.titleHighlight);
        setText('hero-title-2', data.hero.titleLine2);
        setHtml('hero-description', data.hero.description);

        const heroStats = document.getElementById('hero-stats');
        if (heroStats) {
            heroStats.innerHTML = data.hero.stats.map(s =>
                `<div><p class="text-3xl font-black ${s.color}">${s.value}</p><p class="text-xs text-slate-500 mt-1">${s.label}</p></div>`
            ).join('');
        }

        setText('about-label', data.about.label);
        setHtml('about-title', data.about.title + '<br><span class="bg-clip-text text-transparent bg-gradient-to-l from-cyan-400 to-purple-400">' + data.about.titleHighlight + '</span>');
        const aboutParas = document.getElementById('about-paragraphs');
        if (aboutParas) {
            aboutParas.innerHTML = data.about.paragraphs.map(p => `<p class="text-slate-400 leading-relaxed mb-5">${p}</p>`).join('');
        }

        const aboutQuotes = document.getElementById('about-quotes');
        if (aboutQuotes) {
            aboutQuotes.innerHTML = data.about.quotes.map(q =>
                `<div class="glass rounded-2xl p-5 border-r-4 ${q.border}">
                    <i class="fa-solid fa-quote-right ${q.iconColor} text-2xl mb-3 block"></i>
                    <p class="text-sm text-slate-300 italic leading-relaxed">${q.text}</p>
                </div>`
            ).join('');
        }

        const aboutStats = document.getElementById('about-stats');
        if (aboutStats) {
            aboutStats.innerHTML = data.about.stats.map(s =>
                `<div class="text-center p-6 rounded-2xl bg-white/5 border border-white/5 ${s.hover} transition-colors">
                    <i class="fa-solid ${s.icon} ${s.iconColor} text-2xl mb-3"></i>
                    <p class="text-3xl font-black text-white">${s.value}</p>
                    <p class="text-xs text-slate-500 mt-1">${s.label}</p>
                </div>`
            ).join('');
        }

        setText('about-philosophy-title', data.about.philosophyTitle);
        setText('about-philosophy-text', data.about.philosophyText);

        setText('services-label', data.services.label);
        setText('services-title', data.services.title);
        setText('services-subtitle', data.services.subtitle);

        const servicesGrid = document.getElementById('services-grid');
        if (servicesGrid) {
            servicesGrid.innerHTML = data.services.items.map(s => {
                const iconBg = GLOW_ICON[s.glow] || GLOW_ICON.cyan;
                return `<div class="service-card relative glass rounded-2xl p-7 border border-white/5 overflow-hidden cursor-default group" data-glow="${s.glow}">
                    <div class="w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center text-2xl mb-6 group-hover:text-black group-hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-400">
                        <i class="fa-solid ${s.icon}"></i>
                    </div>
                    <h3 class="text-lg font-bold text-white mb-2">${s.title}</h3>
                    <p class="text-xs ${s.accent}/70 font-medium mb-3 uppercase tracking-wide">${s.subtitle}</p>
                    <p class="text-slate-400 text-sm leading-relaxed">${s.description}</p>
                    <div class="mt-6 pt-4 border-t border-white/5 flex items-center ${s.accent} text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>اكتشف المزيد</span>
                        <i class="fa-solid fa-arrow-left mr-2 text-xs"></i>
                    </div>
                </div>`;
            }).join('');
            initServiceGlow();
        }

        setText('process-label', data.process.label);
        setText('process-title', data.process.title);
        setText('process-subtitle', data.process.subtitle);

        const processGrid = document.getElementById('process-grid');
        if (processGrid) {
            processGrid.innerHTML = data.process.steps.map(step => {
                const c = PROCESS_COLORS[step.color] || PROCESS_COLORS.cyan;
                return `<div class="relative text-center group">
                    <div class="relative z-10 w-16 h-16 rounded-2xl glass ${c.border} flex items-center justify-center ${c.text} font-black text-xl mx-auto mb-5 ${c.shadow} group-hover:-translate-y-1 transition-all duration-300">
                        <span>${step.num}</span>
                    </div>
                    <div class="glass rounded-2xl p-6 border border-white/5 ${c.hover} transition-colors">
                        <i class="fa-solid ${step.icon} ${c.text} text-xl mb-3"></i>
                        <h4 class="text-base font-bold text-white mb-2">${step.title}</h4>
                        <p class="text-slate-400 text-xs leading-relaxed">${step.text}</p>
                    </div>
                </div>`;
            }).join('');
        }

        setText('testimonials-label', data.testimonials.label);
        setText('testimonials-title', data.testimonials.title);

        const track = document.getElementById('testimonial-track');
        const dotsWrap = document.getElementById('testimonial-dots');
        if (track) {
            track.innerHTML = data.testimonials.items.map((t, i) =>
                `<div class="testimonial-slide ${i === 0 ? 'active-slide' : 'hidden-slide'} glass rounded-3xl p-8 sm:p-10 border border-white/10 text-center">
                    <div class="flex justify-center mb-4">${'<i class="fa-solid fa-star text-amber-400 text-sm"></i>'.repeat(5)}</div>
                    <p class="text-lg text-slate-300 leading-relaxed mb-6 italic">${t.text}</p>
                    <div class="flex items-center justify-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-black font-bold text-sm">${t.initial}</div>
                        <div class="text-right">
                            <p class="font-bold text-white text-sm">${t.name}</p>
                            <p class="text-xs text-slate-500">${t.role}</p>
                        </div>
                    </div>
                </div>`
            ).join('');
        }
        if (dotsWrap) {
            dotsWrap.innerHTML = data.testimonials.items.map((_, i) =>
                `<button class="dot ${i === 0 ? 'w-6 bg-cyan-400' : 'w-2.5 bg-white/20'} h-2.5 rounded-full transition-all" data-index="${i}" aria-label="${i + 1}"></button>`
            ).join('');
        }
        if (typeof window.reinitTestimonials === 'function') window.reinitTestimonials();

        setText('portfolio-label', data.portfolio.label);
        setText('portfolio-title', data.portfolio.title);
        setText('portfolio-subtitle', data.portfolio.subtitle);

        const grid = document.getElementById('portfolio-grid');
        if (grid) {
            grid.innerHTML = data.portfolio.items.map(renderPortfolioItem).join('');
            if (typeof window.reinitPortfolio === 'function') window.reinitPortfolio();
        }

        setHtml('contact-title', data.contact.title + '<br><span class="bg-clip-text text-transparent bg-gradient-to-l from-cyan-400 to-purple-400">' + data.contact.titleHighlight + '</span>');
        setText('contact-description', data.contact.description);

        const waLink = document.getElementById('contact-whatsapp');
        if (waLink) {
            const num = data.contact.whatsapp.replace(/\D/g, '');
            waLink.href = 'https://wa.me/' + (num.startsWith('20') ? num : '20' + num.replace(/^0/, ''));
        }
        const mailLink = document.getElementById('contact-email');
        if (mailLink) mailLink.href = 'mailto:' + data.contact.email;

        setText('footer-description', data.footer.description);
        setText('footer-copyright', data.footer.copyright);

        const social = data.footer.social;
        const fb = document.getElementById('social-facebook');
        const ig = document.getElementById('social-instagram');
        const wa = document.getElementById('social-whatsapp');
        const tt = document.getElementById('social-tiktok');
        if (fb) fb.href = social.facebook;
        if (ig) ig.href = social.instagram;
        if (wa) wa.href = social.whatsapp;
        if (tt) tt.href = social.tiktok;
    }

    function initServiceGlow() {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width) * 100 + '%');
                card.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height) * 100 + '%');
            });
            const glowColors = { cyan: 'rgba(34,211,238,0.15)', purple: 'rgba(168,85,247,0.15)', blue: 'rgba(59,130,246,0.15)', amber: 'rgba(245,158,11,0.15)' };
            const glow = glowColors[card.dataset.glow] || glowColors.cyan;
            card.addEventListener('mouseenter', () => { card.style.boxShadow = `0 20px 60px ${glow}, 0 0 0 1px rgba(255,255,255,0.1)`; });
            card.addEventListener('mouseleave', () => { card.style.boxShadow = ''; });
        });
    }

    applyContent(ContentStore.get());

    window.addEventListener('storage', (e) => {
        if (e.key === 'zeus_site_content_v1') applyContent(ContentStore.get());
    });
})();

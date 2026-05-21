/**
 * Zeus Admin Dashboard
 */
(function () {
    let state = ContentStore.get();
    let editingPortfolioId = null;

    const PANEL_TITLES = {
        portfolio: 'معرض الأعمال',
        hero: 'الصفحة الرئيسية',
        about: 'من نحن',
        services: 'الخدمات',
        process: 'آلية العمل',
        testimonials: 'آراء العملاء',
        contact: 'التواصل والفوتر',
        settings: 'الإعدادات',
    };

    const loginScreen = document.getElementById('login-screen');
    const dashboard = document.getElementById('dashboard');
    const toast = document.getElementById('toast');

    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2800);
    }

    function showApp() {
        loginScreen.classList.add('hidden');
        dashboard.classList.remove('hidden');
        renderAll();
    }

    function field(label, id, value, type = 'text', rows) {
        const tag = type === 'textarea'
            ? `<textarea class="admin-textarea" id="${id}" rows="${rows || 3}">${value || ''}</textarea>`
            : `<input type="${type}" class="admin-input" id="${id}" value="${(value || '').replace(/"/g, '&quot;')}">`;
        return `<div class="admin-card"><label class="admin-label">${label}</label>${tag}</div>`;
    }

    function read(id) {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
    }

    function renderHeroForm() {
        const h = state.hero;
        document.getElementById('form-hero').innerHTML =
            field('الشارة العلوية', 'hero-badge', h.badge) +
            field('السطر الأول', 'hero-title-1', h.titleLine1) +
            field('النص المميز', 'hero-title-highlight', h.titleHighlight) +
            field('السطر الثاني', 'hero-title-2', h.titleLine2) +
            field('الوصف (يدعم HTML)', 'hero-description', h.description, 'textarea', 4) +
            '<div class="admin-card"><p class="admin-label mb-3">الإحصائيات</p><div id="hero-stats-fields"></div>' +
            '<button type="button" id="btn-add-hero-stat" class="admin-btn admin-btn--ghost text-sm mt-2"><i class="fa-solid fa-plus"></i></button></div>';

        const wrap = document.getElementById('hero-stats-fields');
        wrap.innerHTML = h.stats.map((s, i) => statRow('hero-stat', i, s)).join('');
        document.getElementById('btn-add-hero-stat').onclick = () => {
            h.stats.push({ value: '', label: '', color: 'text-cyan-400' });
            renderHeroForm();
        };
        bindStatRows('hero-stat', h.stats);
    }

    function statRow(prefix, i, s) {
        return `<div class="admin-grid-2 mb-2 items-end" data-stat="${i}">
            <div><label class="admin-label text-xs">القيمة</label><input class="admin-input ${prefix}-value" data-i="${i}" value="${s.value}"></div>
            <div><label class="admin-label text-xs">التسمية</label><input class="admin-input ${prefix}-label" data-i="${i}" value="${s.label}"></div>
            <button type="button" class="admin-btn admin-btn--danger text-xs ${prefix}-del" data-i="${i}"><i class="fa-solid fa-trash"></i></button>
        </div>`;
    }

    function bindStatRows(prefix, arr) {
        document.querySelectorAll(`.${prefix}-value`).forEach(inp => {
            inp.oninput = () => { arr[+inp.dataset.i].value = inp.value; };
        });
        document.querySelectorAll(`.${prefix}-label`).forEach(inp => {
            inp.oninput = () => { arr[+inp.dataset.i].label = inp.value; };
        });
        document.querySelectorAll(`.${prefix}-del`).forEach(btn => {
            btn.onclick = () => {
                arr.splice(+btn.dataset.i, 1);
                if (prefix === 'hero-stat') renderHeroForm();
                else renderAboutForm();
            };
        });
    }

    function renderAboutForm() {
        const a = state.about;
        document.getElementById('form-about').innerHTML =
            field('التسمية', 'about-label', a.label) +
            field('العنوان', 'about-title', a.title) +
            field('العنوان المميز', 'about-titleHighlight', a.titleHighlight) +
            '<div class="admin-card"><p class="admin-label mb-2">الفقرات</p><div id="about-paras"></div><button type="button" id="btn-add-para" class="admin-btn admin-btn--ghost text-sm">+ فقرة</button></div>' +
            '<div class="admin-card"><p class="admin-label mb-2">الاقتباسات</p><div id="about-quotes-admin"></div></div>' +
            '<div class="admin-card"><p class="admin-label mb-2">إحصائيات</p><div id="about-stats-fields"></div><button type="button" id="btn-add-about-stat" class="admin-btn admin-btn--ghost text-sm mt-2">+</button></div>' +
            field('عنوان الفلسفة', 'about-philosophy-title', a.philosophyTitle) +
            field('نص الفلسفة', 'about-philosophy-text', a.philosophyText);

        const paras = document.getElementById('about-paras');
        paras.innerHTML = a.paragraphs.map((p, i) =>
            `<div class="mb-2 flex gap-2"><textarea class="admin-textarea flex-1 about-para" data-i="${i}" rows="2">${p}</textarea>
             <button type="button" class="admin-btn admin-btn--danger about-para-del" data-i="${i}"><i class="fa-solid fa-trash"></i></button></div>`
        ).join('');
        document.querySelectorAll('.about-para').forEach(t => {
            t.oninput = () => { a.paragraphs[+t.dataset.i] = t.value; };
        });
        document.querySelectorAll('.about-para-del').forEach(b => {
            b.onclick = () => { a.paragraphs.splice(+b.dataset.i, 1); renderAboutForm(); };
        });
        document.getElementById('btn-add-para').onclick = () => { a.paragraphs.push(''); renderAboutForm(); };

        const quotesEl = document.getElementById('about-quotes-admin');
        quotesEl.innerHTML = a.quotes.map((q, i) =>
            `<textarea class="admin-textarea mb-2 about-quote" data-i="${i}" rows="2">${q.text}</textarea>`
        ).join('');
        document.querySelectorAll('.about-quote').forEach(t => {
            t.oninput = () => { a.quotes[+t.dataset.i].text = t.value; };
        });

        const statsWrap = document.getElementById('about-stats-fields');
        statsWrap.innerHTML = a.stats.map((s, i) =>
            `<div class="border border-white/5 rounded-lg p-3 mb-2 space-y-2" data-i="${i}">
                <div class="admin-grid-2">
                    <input class="admin-input about-stat-icon" data-i="${i}" placeholder="أيقونة fa-users" value="${s.icon}">
                    <input class="admin-input about-stat-value" data-i="${i}" placeholder="القيمة" value="${s.value}">
                </div>
                <input class="admin-input about-stat-label" data-i="${i}" placeholder="التسمية" value="${s.label}">
                <button type="button" class="admin-btn admin-btn--danger text-xs about-stat-del" data-i="${i}"><i class="fa-solid fa-trash"></i></button>
            </div>`
        ).join('');
        document.querySelectorAll('.about-stat-icon').forEach(el => { el.oninput = () => { a.stats[+el.dataset.i].icon = el.value; }; });
        document.querySelectorAll('.about-stat-value').forEach(el => { el.oninput = () => { a.stats[+el.dataset.i].value = el.value; }; });
        document.querySelectorAll('.about-stat-label').forEach(el => { el.oninput = () => { a.stats[+el.dataset.i].label = el.value; }; });
        document.querySelectorAll('.about-stat-del').forEach(b => {
            b.onclick = () => { a.stats.splice(+b.dataset.i, 1); renderAboutForm(); };
        });
        document.getElementById('btn-add-about-stat').onclick = () => {
            a.stats.push({ icon: 'fa-star', iconColor: 'text-cyan-400', value: '', label: '', hover: 'hover:border-cyan-500/30' });
            renderAboutForm();
        };
    }

    function renderServices() {
        document.getElementById('services-header-label').value = state.services.label;
        document.getElementById('services-header-title').value = state.services.title;
        document.getElementById('services-header-subtitle').value = state.services.subtitle;

        ['services-header-label', 'services-header-title', 'services-header-subtitle'].forEach(id => {
            document.getElementById(id).oninput = (e) => {
                const key = id.replace('services-header-', '');
                if (key === 'label') state.services.label = e.target.value;
                else if (key === 'title') state.services.title = e.target.value;
                else state.services.subtitle = e.target.value;
            };
        });

        const list = document.getElementById('services-list');
        list.innerHTML = state.services.items.map((s, i) =>
            `<div class="admin-card" data-i="${i}">
                <div class="admin-grid-2 mb-2">
                    <div><label class="admin-label">الأيقونة (fa-)</label><input class="admin-input svc-icon" data-i="${i}" value="${s.icon}"></div>
                    <div><label class="admin-label">اللون</label>
                        <select class="admin-select svc-glow" data-i="${i}">
                            ${['cyan','purple','blue','amber'].map(g => `<option value="${g}" ${s.glow===g?'selected':''}>${g}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <input class="admin-input mb-2 svc-title" data-i="${i}" placeholder="العنوان" value="${s.title}">
                <input class="admin-input mb-2 svc-subtitle" data-i="${i}" placeholder="Subtitle" value="${s.subtitle}">
                <textarea class="admin-textarea svc-desc" data-i="${i}" rows="2">${s.description}</textarea>
                <button type="button" class="admin-btn admin-btn--danger text-xs mt-2 svc-del" data-i="${i}"><i class="fa-solid fa-trash"></i> حذف</button>
            </div>`
        ).join('');

        const accentMap = { cyan: 'text-cyan-400', purple: 'text-purple-400', blue: 'text-blue-400', amber: 'text-amber-400' };
        document.querySelectorAll('.svc-icon').forEach(el => { el.oninput = () => { state.services.items[+el.dataset.i].icon = el.value; }; });
        document.querySelectorAll('.svc-title').forEach(el => { el.oninput = () => { state.services.items[+el.dataset.i].title = el.value; }; });
        document.querySelectorAll('.svc-subtitle').forEach(el => { el.oninput = () => { state.services.items[+el.dataset.i].subtitle = el.value; }; });
        document.querySelectorAll('.svc-desc').forEach(el => { el.oninput = () => { state.services.items[+el.dataset.i].description = el.value; }; });
        document.querySelectorAll('.svc-glow').forEach(el => {
            el.onchange = () => {
                const item = state.services.items[+el.dataset.i];
                item.glow = el.value;
                item.accent = accentMap[el.value];
            };
        });
        document.querySelectorAll('.svc-del').forEach(b => {
            b.onclick = () => { state.services.items.splice(+b.dataset.i, 1); renderServices(); };
        });
    }

    function renderProcess() {
        const p = state.process;
        let html = field('التسمية', 'process-label', p.label) +
            field('العنوان', 'process-title', p.title) +
            field('الوصف', 'process-subtitle', p.subtitle);
        html += '<div id="process-steps"></div><button type="button" id="btn-add-step" class="admin-btn admin-btn--ghost mt-2">+ خطوة</button>';
        document.getElementById('form-process').innerHTML = html;

        const stepsEl = document.getElementById('process-steps');
        stepsEl.innerHTML = p.steps.map((step, i) =>
            `<div class="admin-card">
                <div class="admin-grid-2 mb-2">
                    <input class="admin-input proc-num" data-i="${i}" placeholder="01" value="${step.num}">
                    <select class="admin-select proc-color" data-i="${i}">
                        ${['cyan','purple','blue','amber'].map(c => `<option ${step.color===c?'selected':''}>${c}</option>`).join('')}
                    </select>
                </div>
                <input class="admin-input mb-2 proc-icon" data-i="${i}" placeholder="fa-lightbulb" value="${step.icon}">
                <input class="admin-input mb-2 proc-title" data-i="${i}" value="${step.title}">
                <textarea class="admin-textarea proc-text" data-i="${i}" rows="2">${step.text}</textarea>
                <button type="button" class="admin-btn admin-btn--danger text-xs mt-2 proc-del" data-i="${i}"><i class="fa-solid fa-trash"></i></button>
            </div>`
        ).join('');

        document.querySelectorAll('.proc-num').forEach(el => { el.oninput = () => { p.steps[+el.dataset.i].num = el.value; }; });
        document.querySelectorAll('.proc-icon').forEach(el => { el.oninput = () => { p.steps[+el.dataset.i].icon = el.value; }; });
        document.querySelectorAll('.proc-title').forEach(el => { el.oninput = () => { p.steps[+el.dataset.i].title = el.value; }; });
        document.querySelectorAll('.proc-text').forEach(el => { el.oninput = () => { p.steps[+el.dataset.i].text = el.value; }; });
        document.querySelectorAll('.proc-color').forEach(el => { el.onchange = () => { p.steps[+el.dataset.i].color = el.value; }; });
        document.querySelectorAll('.proc-del').forEach(b => {
            b.onclick = () => { p.steps.splice(+b.dataset.i, 1); renderProcess(); };
        });
        document.getElementById('btn-add-step').onclick = () => {
            p.steps.push({ num: String(p.steps.length + 1).padStart(2, '0'), icon: 'fa-star', color: 'cyan', title: '', text: '' });
            renderProcess();
        };
    }

    function renderTestimonials() {
        const list = document.getElementById('testimonials-list');
        const header = `<div class="admin-card mb-4">
            <label class="admin-label">تسمية القسم</label>
            <input class="admin-input mb-2" id="testimonials-header-label" value="${state.testimonials.label}">
            <label class="admin-label">العنوان</label>
            <input class="admin-input" id="testimonials-header-title" value="${state.testimonials.title}">
        </div>`;
        list.innerHTML = header + state.testimonials.items.map((t, i) =>
            `<div class="admin-card">
                <textarea class="admin-textarea mb-2 test-text" data-i="${i}" rows="2">${t.text}</textarea>
                <div class="admin-grid-2 mb-2">
                    <input class="admin-input test-name" data-i="${i}" placeholder="الاسم" value="${t.name}">
                    <input class="admin-input test-initial" data-i="${i}" placeholder="الحرف" value="${t.initial}">
                </div>
                <input class="admin-input test-role" data-i="${i}" placeholder="الوظيفة" value="${t.role}">
                <button type="button" class="admin-btn admin-btn--danger text-xs mt-2 test-del" data-i="${i}"><i class="fa-solid fa-trash"></i></button>
            </div>`
        ).join('');

        document.querySelectorAll('.test-text').forEach(el => { el.oninput = () => { state.testimonials.items[+el.dataset.i].text = el.value; }; });
        document.querySelectorAll('.test-name').forEach(el => { el.oninput = () => { state.testimonials.items[+el.dataset.i].name = el.value; }; });
        document.querySelectorAll('.test-initial').forEach(el => { el.oninput = () => { state.testimonials.items[+el.dataset.i].initial = el.value; }; });
        document.querySelectorAll('.test-role').forEach(el => { el.oninput = () => { state.testimonials.items[+el.dataset.i].role = el.value; }; });
        document.querySelectorAll('.test-del').forEach(b => {
            b.onclick = () => { state.testimonials.items.splice(+b.dataset.i, 1); renderTestimonials(); };
        });
        document.getElementById('testimonials-header-label').oninput = (e) => { state.testimonials.label = e.target.value; };
        document.getElementById('testimonials-header-title').oninput = (e) => { state.testimonials.title = e.target.value; };
    }

    function renderContact() {
        const c = state.contact;
        const f = state.footer;
        document.getElementById('form-contact').innerHTML =
            field('عنوان CTA', 'contact-title', c.title) +
            field('الجزء المميز', 'contact-titleHighlight', c.titleHighlight) +
            field('الوصف', 'contact-description', c.description, 'textarea') +
            field('واتساب', 'contact-whatsapp', c.whatsapp) +
            field('البريد', 'contact-email', c.email) +
            '<hr class="border-white/10 my-6">' +
            field('وصف الفوتر', 'footer-description', f.description) +
            field('حقوق النشر', 'footer-copyright', f.copyright) +
            field('فيسبوك', 'social-facebook', f.social.facebook) +
            field('إنستغرام', 'social-instagram', f.social.instagram) +
            field('واتساب (رابط)', 'social-whatsapp', f.social.whatsapp) +
            field('تيك توك', 'social-tiktok', f.social.tiktok);
    }

    function renderPortfolioList() {
        const list = document.getElementById('portfolio-list');
        const p = state.portfolio;
        const header = `<div class="admin-card mb-6">
            <label class="admin-label">تسمية القسم</label>
            <input class="admin-input mb-2" id="portfolio-header-label" value="${p.label}">
            <label class="admin-label">العنوان</label>
            <input class="admin-input mb-2" id="portfolio-header-title" value="${p.title}">
            <label class="admin-label">الوصف</label>
            <input class="admin-input" id="portfolio-header-subtitle" value="${p.subtitle}">
        </div>`;
        const items = state.portfolio.items;
        if (!items.length) {
            list.innerHTML = header + '<p class="text-slate-500 text-center py-12">لا توجد أعمال. اضغط «إضافة عمل جديد»</p>';
            bindPortfolioHeader();
            return;
        }
        list.innerHTML = header + items.map(item => {
            const thumb = item.mediaType === 'video'
                ? `<video class="portfolio-admin-thumb" src="${item.src}" muted></video>`
                : `<img class="portfolio-admin-thumb" src="${item.src}" alt="">`;
            const catLabel = item.category === 'video' ? 'فيديو' : 'تصميم';
            return `<div class="portfolio-admin-item" data-id="${item.id}">
                ${thumb}
                <div class="min-w-0">
                    <p class="font-bold text-white truncate">${item.title}</p>
                    <p class="text-xs text-slate-500">${item.tag} · ${catLabel}</p>
                </div>
                <div class="flex gap-2 flex-shrink-0">
                    <button type="button" class="admin-btn admin-btn--ghost text-xs pf-edit" data-id="${item.id}"><i class="fa-solid fa-pen"></i></button>
                    <button type="button" class="admin-btn admin-btn--danger text-xs pf-delete" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>`;
        }).join('');

        document.querySelectorAll('.pf-edit').forEach(btn => {
            btn.onclick = () => openPortfolioModal(btn.dataset.id);
        });
        document.querySelectorAll('.pf-delete').forEach(btn => {
            btn.onclick = () => {
                if (!confirm('حذف هذا العمل من المعرض؟')) return;
                state.portfolio.items = state.portfolio.items.filter(p => p.id !== btn.dataset.id);
                save();
                renderPortfolioList();
            };
        });
        bindPortfolioHeader();
    }

    function bindPortfolioHeader() {
        const lbl = document.getElementById('portfolio-header-label');
        const ttl = document.getElementById('portfolio-header-title');
        const sub = document.getElementById('portfolio-header-subtitle');
        if (lbl) lbl.oninput = (e) => { state.portfolio.label = e.target.value; };
        if (ttl) ttl.oninput = (e) => { state.portfolio.title = e.target.value; };
        if (sub) sub.oninput = (e) => { state.portfolio.subtitle = e.target.value; };
    }

    function fillTagColors() {
        const sel = document.getElementById('pf-tagClass');
        sel.innerHTML = TAG_COLORS.map(t => `<option value="${t.value}">${t.label}</option>`).join('');
    }

    function openPortfolioModal(id) {
        editingPortfolioId = id || null;
        const modal = document.getElementById('portfolio-modal');
        const form = document.getElementById('portfolio-form');
        form.reset();
        document.getElementById('pf-file').value = '';

        if (id) {
            const item = state.portfolio.items.find(p => p.id === id);
            if (!item) return;
            document.getElementById('portfolio-modal-title').textContent = 'تعديل عمل';
            document.getElementById('pf-id').value = item.id;
            document.getElementById('pf-category').value = item.category;
            document.getElementById('pf-mediaType').value = item.mediaType;
            document.getElementById('pf-tag').value = item.tag;
            document.getElementById('pf-tagClass').value = item.tagClass;
            document.getElementById('pf-title').value = item.title;
            document.getElementById('pf-src').value = item.src.startsWith('data:') ? '' : item.src;
            document.getElementById('pf-alt').value = item.alt || '';
        } else {
            document.getElementById('portfolio-modal-title').textContent = 'إضافة عمل جديد';
            document.getElementById('pf-id').value = '';
            document.getElementById('pf-category').value = 'design';
            document.getElementById('pf-mediaType').value = 'image';
            document.getElementById('pf-tagClass').value = 'text-cyan-400';
        }

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
    }

    function closePortfolioModal() {
        document.getElementById('portfolio-modal').classList.remove('is-open');
        document.getElementById('portfolio-modal').setAttribute('aria-hidden', 'true');
        editingPortfolioId = null;
    }

    function collectHero() {
        state.hero.badge = read('hero-badge');
        state.hero.titleLine1 = read('hero-title-1');
        state.hero.titleHighlight = read('hero-title-highlight');
        state.hero.titleLine2 = read('hero-title-2');
        state.hero.description = document.getElementById('hero-description')?.value || state.hero.description;
    }

    function collectAbout() {
        state.about.label = read('about-label');
        state.about.title = read('about-title');
        state.about.titleHighlight = read('about-titleHighlight');
        state.about.philosophyTitle = read('about-philosophy-title');
        state.about.philosophyText = read('about-philosophy-text');
    }

    function collectProcess() {
        state.process.label = read('process-label');
        state.process.title = read('process-title');
        state.process.subtitle = read('process-subtitle');
    }

    function collectContact() {
        state.contact.title = read('contact-title');
        state.contact.titleHighlight = read('contact-titleHighlight');
        state.contact.description = document.getElementById('contact-description')?.value || '';
        state.contact.whatsapp = read('contact-whatsapp');
        state.contact.email = read('contact-email');
        state.footer.description = read('footer-description');
        state.footer.copyright = read('footer-copyright');
        state.footer.social.facebook = read('social-facebook');
        state.footer.social.instagram = read('social-instagram');
        state.footer.social.whatsapp = read('social-whatsapp');
        state.footer.social.tiktok = read('social-tiktok');
    }

    function collectAll() {
        collectHero();
        collectAbout();
        collectProcess();
        collectContact();
        const pl = document.getElementById('portfolio-header-label');
        const pt = document.getElementById('portfolio-header-title');
        const ps = document.getElementById('portfolio-header-subtitle');
        if (pl) state.portfolio.label = pl.value.trim();
        if (pt) state.portfolio.title = pt.value.trim();
        if (ps) state.portfolio.subtitle = ps.value.trim();
        const tLabel = document.getElementById('testimonials-header-label');
        const tTitle = document.getElementById('testimonials-header-title');
        if (tLabel) state.testimonials.label = tLabel.value;
        if (tTitle) state.testimonials.title = tTitle.value;
        state.meta.title = read('meta-title') || state.meta.title;
        state.meta.description = document.getElementById('meta-description')?.value || state.meta.description;
    }

    function save() {
        collectAll();
        ContentStore.save(state);
        showToast('تم الحفظ — حدّث صفحة الموقع لمعاينة التغييرات');
    }

    function renderAll() {
        renderHeroForm();
        renderAboutForm();
        renderServices();
        renderProcess();
        renderTestimonials();
        renderContact();
        renderPortfolioList();
        document.getElementById('meta-title').value = state.meta.title;
        document.getElementById('meta-description').value = state.meta.description;
    }

    /* ── Nav ── */
    document.querySelectorAll('.admin-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            const panel = btn.dataset.panel;
            document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('is-active'));
            document.getElementById('panel-' + panel).classList.add('is-active');
            document.getElementById('panel-title').textContent = PANEL_TITLES[panel];
            document.getElementById('admin-sidebar').classList.remove('is-open');
        });
    });

    document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
        document.getElementById('admin-sidebar').classList.toggle('is-open');
    });

    /* ── Login ── */
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const pass = document.getElementById('login-password').value;
        if (ContentStore.login(pass)) {
            document.getElementById('login-error').classList.add('hidden');
            showApp();
        } else {
            document.getElementById('login-error').classList.remove('hidden');
        }
    });

    if (ContentStore.isLoggedIn()) showApp();

    document.getElementById('btn-logout').addEventListener('click', () => {
        ContentStore.logout();
        location.reload();
    });

    document.getElementById('btn-save-all').addEventListener('click', save);

    document.getElementById('btn-add-portfolio').addEventListener('click', () => openPortfolioModal(null));
    document.getElementById('portfolio-modal-close').addEventListener('click', closePortfolioModal);
    document.getElementById('portfolio-modal-cancel').addEventListener('click', closePortfolioModal);

    document.getElementById('pf-mediaType').addEventListener('change', (e) => {
        const cat = document.getElementById('pf-category');
        if (e.target.value === 'video') cat.value = 'video';
    });

    document.getElementById('pf-file').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 4 * 1024 * 1024) {
            alert('الملف كبير جداً. ضعه في مجلد image/ وأدخل المسار يدوياً.');
            e.target.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            document.getElementById('pf-src').value = reader.result;
            document.getElementById('pf-mediaType').value = file.type.startsWith('video') ? 'video' : 'image';
            if (file.type.startsWith('video')) document.getElementById('pf-category').value = 'video';
        };
        reader.readAsDataURL(file);
    });

    document.getElementById('portfolio-form').addEventListener('submit', (e) => {
        e.preventDefault();
        let src = read('pf-src');
        if (!src) {
            alert('أدخل رابط الملف أو ارفع صورة/فيديو');
            return;
        }
        const item = {
            id: document.getElementById('pf-id').value || uid(),
            category: document.getElementById('pf-category').value,
            tag: read('pf-tag'),
            tagClass: document.getElementById('pf-tagClass').value,
            title: read('pf-title'),
            mediaType: document.getElementById('pf-mediaType').value,
            src,
            alt: read('pf-alt') || read('pf-title'),
        };
        if (item.mediaType === 'video') item.category = 'video';

        const idx = state.portfolio.items.findIndex(p => p.id === item.id);
        if (idx >= 0) state.portfolio.items[idx] = item;
        else state.portfolio.items.push(item);

        save();
        renderPortfolioList();
        closePortfolioModal();
    });

    document.getElementById('btn-add-service').addEventListener('click', () => {
        state.services.items.push({
            glow: 'cyan', icon: 'fa-star', title: '', subtitle: '', description: '', accent: 'text-cyan-400',
        });
        renderServices();
    });

    document.getElementById('btn-add-testimonial').addEventListener('click', () => {
        state.testimonials.items.push({
            text: '', name: '', role: '', initial: '؟', gradient: 'from-cyan-400 to-purple-500',
        });
        renderTestimonials();
    });

    document.getElementById('btn-change-password').addEventListener('click', () => {
        const p = document.getElementById('new-password').value;
        if (p.length < 4) { alert('كلمة المرور قصيرة'); return; }
        ContentStore.changePassword(p);
        document.getElementById('new-password').value = '';
        showToast('تم تغيير كلمة المرور');
    });

    document.getElementById('btn-export').addEventListener('click', () => {
        collectAll();
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'zeus-content-backup.json';
        a.click();
    });

    document.getElementById('import-file').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                state = ContentStore.importJson(reader.result);
                renderAll();
                showToast('تم الاستيراد بنجاح');
            } catch {
                alert('ملف JSON غير صالح');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
        if (!confirm('استعادة كل المحتوى للإعدادات الافتراضية؟')) return;
        state = ContentStore.reset();
        renderAll();
        showToast('تمت الاستعادة');
    });

    fillTagColors();
})();

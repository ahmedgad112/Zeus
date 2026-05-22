/**
 * Zeus Agency — محتوى الموقع (localStorage)
 */
const ZEUS_STORAGE_KEY = 'zeus_site_content_v1';
const ZEUS_USERS_KEY = 'zeus_admin_users_v1';
const ZEUS_USER_SESSION_KEY = 'zeus_admin_user';

const TAG_COLORS = [
    { value: 'text-cyan-400', label: 'سماوي' },
    { value: 'text-purple-400', label: 'بنفسجي' },
    { value: 'text-blue-400', label: 'أزرق' },
    { value: 'text-amber-400', label: 'كهرماني' },
    { value: 'text-yellow-400', label: 'أصفر' },
    { value: 'text-pink-400', label: 'وردي' },
    { value: 'text-emerald-400', label: 'أخضر' },
];

function uid() {
    return 'p_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
}

const DEFAULT_CONTENT = {
    meta: {
        title: 'زيوس | Zeus Agency — تسويق رقمي وإنتاج فيديو',
        description: 'زيوس | Zeus Agency — وكالة تسويق رقمي وإنتاج فيديو. نصنع التأثير الطاغي لعلامتك التجارية.',
    },
    hero: {
        badge: 'وكالة تسويق رقمي & إنتاج فيديو',
        titleLine1: 'لا تنتظر الفرصة..',
        titleHighlight: 'اصنع التأثير الطاغي',
        titleLine2: 'لعلامتك التجارية.',
        description: 'في <strong class="text-white">زيوس</strong>، ندمج الإبداع البصري مع الاستراتيجيات التسويقية الذكية — من إنتاج الفيديو وحتى بناء الهوية البصرية — لنحوّل فكرتك إلى براند يتحدث عنه الجميع.',
        ctaPrimary: 'شاهد أعمالنا',
        ctaSecondary: 'استشارة مجانية',
        stats: [
            { value: '+50', label: 'براند وثق بنا', color: 'text-cyan-400' },
            { value: '+200', label: 'مشروع منجز', color: 'text-purple-400' },
            { value: '100%', label: 'رضا العملاء', color: 'text-blue-400' },
        ],
    },
    about: {
        label: 'من نحن',
        title: 'الإبداع ليس مجرد فكرة،',
        titleHighlight: 'بل القوة التي تحرك الأسواق',
        paragraphs: [
            '<strong class="text-white">زيوس | Zeus Agency</strong> هي شريكك الاستراتيجي في العالم الرقمي. مجموعة من المبدعين، المصممين، وصنّاع المحتوى اجتمعت لتقديم حلول تسويقية وإعلامية مبتكرة تغيّر مقاييس النجاح.',
            'لا نكتفي بإنشاء التصاميم أو تصوير الفيديوهات — نبني هويات بصرية وقصصاً ملهمة تربط جمهورك ببراندك وتدفع مبيعاتك نحو الصدارة.',
        ],
        quotes: [
            { text: '"الاسم مستوحى من القوة والسيطرة، والأفعال تجسّد الدقة والابتكار."', border: 'border-r-cyan-400', iconColor: 'text-cyan-400/50' },
            { text: '"نؤمن أن كل براند يستحق قصة تُروى بصرياً بطريقة لا تُنسى."', border: 'border-r-purple-400', iconColor: 'text-purple-400/50' },
        ],
        stats: [
            { icon: 'fa-users', iconColor: 'text-cyan-400', value: '+50', label: 'عميل سعيد', hover: 'hover:border-cyan-500/30' },
            { icon: 'fa-clapperboard', iconColor: 'text-purple-400', value: '+200', label: 'فيديو & تصميم', hover: 'hover:border-purple-500/30' },
            { icon: 'fa-award', iconColor: 'text-blue-400', value: '5+', label: 'سنوات خبرة', hover: 'hover:border-blue-500/30' },
            { icon: 'fa-globe', iconColor: 'text-amber-400', value: '100%', label: 'التزام بالجودة', hover: 'hover:border-amber-500/30' },
        ],
        philosophyTitle: 'فلسفتنا ببساطة:',
        philosophyText: 'استراتيجية ذكية + إبداع بصري = تأثير طاغٍ لا يُتجاهل',
    },
    services: {
        label: 'خدماتنا',
        title: 'حلول إبداعية بلا حدود',
        subtitle: 'نقدّم مجموعة متكاملة من الخدمات الرقمية والإبداعية لترفع براندك إلى المستوى التالي.',
        items: [
            { glow: 'cyan', icon: 'fa-video', title: 'إنتاج وصناعة المحتوى المرئي', subtitle: 'Video Production', description: 'تصوير وإخراج الفيديوهات، Reels، البودكاست، والمونتاج الاحترافي الذي يخطف انتباه المشاهد.', accent: 'text-cyan-400' },
            { glow: 'purple', icon: 'fa-palette', title: 'التصميم الإبداعي والهوية البصرية', subtitle: 'Creative Graphic Design', description: 'تصاميم السوشيال ميديا، الدمج الرقمي، وبناء هويات بصرية متكاملة تميّزك عن المنافسين.', accent: 'text-purple-400' },
            { glow: 'blue', icon: 'fa-hashtag', title: 'إدارة وحملات السوشيال ميديا', subtitle: 'Social Media Management', description: 'التخطيط الاستراتيجي، كتابة المحتوى، وإدارة الحملات لضمان أعلى نسب تفاعل ووصول حقيقي.', accent: 'text-blue-400' },
            { glow: 'amber', icon: 'fa-chess-knight', title: 'الاستشارات التسويقية وبناء البراندات', subtitle: 'Marketing Strategy', description: 'نساعد الشركات وصناع المحتوى على وضع خارطة طريق واضحة للنمو السريع والانتشار.', accent: 'text-amber-400' },
        ],
    },
    process: {
        label: 'آلية العمل',
        title: 'رحلة صناعة الفارق',
        subtitle: 'من الفكرة الأولى وحتى تحليل النتائج — عملية واضحة ومنظمة.',
        steps: [
            { num: '01', icon: 'fa-lightbulb', color: 'cyan', title: 'العصف الذهني', text: 'نفهم طبيعة عملك، أهدافك، وجمهورك المستهدف بدقة متناهية.' },
            { num: '02', icon: 'fa-pen-ruler', color: 'purple', title: 'التخطيط وصياغة الفكرة', text: 'نضع الفكرة الإبداعية غير التقليدية والخطة التسويقية الملائمة.' },
            { num: '03', icon: 'fa-film', color: 'blue', title: 'التنفيذ والإنتاج', text: 'يتولى فريق المخرجين والمصممين إخراج العمل بأعلى جودة بصرية.' },
            { num: '04', icon: 'fa-chart-pie', color: 'amber', title: 'التحليل والتطوير', text: 'نتابع الأرقام والتفاعل لنضمن لك أفضل عائد على الاستثمار.' },
        ],
    },
    testimonials: {
        label: 'آراء العملاء',
        title: 'ماذا يقول شركاؤنا؟',
        items: [
            { text: '"زيوس حوّلت حضورنا على السوشيال ميديا بالكامل. الفيديوهات والتصاميم حققت تفاعلاً لم نتوقعه أبداً."', name: 'محمد العلي', role: 'صاحب مطعم — عميل', initial: 'م', gradient: 'from-cyan-400 to-purple-500' },
            { text: '"احترافية عالية من أول جلسة عصف ذهني وحتى التسليم. الهوية البصرية الجديدة غيّرت صورة براندنا تماماً."', name: 'سارة محمود', role: 'مديرة تسويق — عميلة', initial: 'س', gradient: 'from-purple-400 to-blue-500' },
            { text: '"Reels اللي انتجتوها لنا وصلت ملايين المشاهدات. فريق زيوس يفهم الترند ويعرف يحوّله لنتائج حقيقية."', name: 'أحمد حسن', role: 'صانع محتوى — عميل', initial: 'أ', gradient: 'from-amber-400 to-cyan-500' },
        ],
    },
    portfolio: {
        label: 'معرض الإبداع',
        title: 'بعض أعمالنا الأخيرة',
        subtitle: 'نماذج من مشاريع إنتاج الفيديو والتصميم الجرافيكي.',
        items: [
            { id: 'p_video1', category: 'video', tag: 'Video Production', tagClass: 'text-cyan-400', title: 'إنتاج فيديو احترافي لحملات التسويق', mediaType: 'video', src: 'image/v.mp4', alt: 'إنتاج فيديو' },
            { id: 'p_1', category: 'design', tag: 'Social Media', tagClass: 'text-purple-400', title: 'تعاقد إدارة سوشيال ميديا — Warda Travel', mediaType: 'image', src: 'image/1.jpg', alt: 'تعاقد Zeus Media مع Warda Travel' },
            { id: 'p_2', category: 'design', tag: 'Creative Campaign', tagClass: 'text-blue-400', title: 'تصميم إبداعي — خسرت عملاء كتير؟', mediaType: 'image', src: 'image/2.jpg', alt: 'تصميم إبداعي لحملة تسويقية' },
            { id: 'p_3', category: 'design', tag: 'Graphic Design', tagClass: 'text-amber-400', title: 'وسائل التواصل ليست الهدف بل هي الوقود', mediaType: 'image', src: 'image/3.jpg', alt: 'وسائل التواصل ليست الهدف بل هي الوقود' },
            { id: 'p_4', category: 'design', tag: 'Social Media Design', tagClass: 'text-yellow-400', title: 'جاهز تخلي براندك يطير؟', mediaType: 'image', src: 'image/4.jpg', alt: 'جاهز تخلي براندك يطير' },
            { id: 'p_5', category: 'design', tag: 'Brand Identity', tagClass: 'text-pink-400', title: 'تسويق الغد نصنعه اليوم', mediaType: 'image', src: 'image/5.jpg', alt: 'تسويق الغد نصنعه اليوم' },
        ],
    },
    contact: {
        title: 'جاهز لتمنح عملك',
        titleHighlight: 'قوة "Zeus"؟',
        description: 'تواصل معنا اليوم للحديث عن مشروعك القادم، ودعنا نصنع لك تأثيراً تسويقياً وبصرياً فريداً.',
        whatsapp: '01284500809',
        email: 'zeusadv98@gmail.com',
    },
    footer: {
        description: 'وكالة تسويق رقمي وإنتاج فيديو — نصنع التأثير الطاغي لعلامتك التجارية.',
        copyright: '© 2026 Zeus Agency — زيوس. جميع الحقوق محفوظة.',
        social: {
            facebook: 'https://www.facebook.com/share/18wStFecLb/',
            instagram: 'https://www.instagram.com/zeus_media_egypt?igsh=ejJ3M253Y3l3NzN0',
            whatsapp: 'https://wa.me/+201284500809',
            tiktok: 'https://www.tiktok.com/@zeus.media.egypt?_r=1&_t=ZS-96YJXMy8GQ8',
        },
    },
};

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const ROLE_LABELS = { admin: 'مدير', editor: 'محرر' };

const DEFAULT_USERS = [
    {
        id: 'u_admin',
        username: 'admin',
        displayName: 'مدير النظام',
        role: 'admin',
        passwordHash: 'c1f7cffdb382596624b5bff6535756152b8618d0c80fc72a0a09622ae2bef8b9',
    },
    {
        id: 'u_editor',
        username: 'editor',
        displayName: 'محرر المحتوى',
        role: 'editor',
        passwordHash: 'a4ecfe3da82ef2de2dd96fd9c74c08d0c8805ebb2d88d93660b498b9952a3769',
    },
];

async function hashPassword(password) {
    const data = new TextEncoder().encode('zeus_v1:' + password);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function sanitizeUsername(username) {
    return String(username || '').trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
}

function migrateLegacyAdminPassword() {
    try {
        const raw = localStorage.getItem(ZEUS_STORAGE_KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        if (data.admin && data.admin.password) {
            return String(data.admin.password);
        }
    } catch { /* ignore */ }
    return null;
}

function normalizeUsers(stored) {
    if (!Array.isArray(stored) || !stored.length) return null;
    const defaultsByName = Object.fromEntries(DEFAULT_USERS.map(u => [u.username, u]));
    const normalized = stored.map(u => {
        const name = sanitizeUsername(u.username);
        const def = defaultsByName[name];
        const merged = {
            ...(def || {}),
            ...u,
            username: name || u.username,
        };
        if (!merged.passwordHash && def) merged.passwordHash = def.passwordHash;
        return merged;
    });
    const ok = normalized.every(u => u.username && u.passwordHash && u.role);
    return ok ? normalized : null;
}

const UserStore = {
    getAll() {
        try {
            const raw = localStorage.getItem(ZEUS_USERS_KEY);
            if (raw) {
                const valid = normalizeUsers(JSON.parse(raw));
                if (valid) return valid;
            }
        } catch { /* ignore */ }
        const users = deepClone(DEFAULT_USERS);
        this.saveAll(users);
        return users;
    },

    resetToDefaults() {
        localStorage.removeItem(ZEUS_USERS_KEY);
        return this.getAll();
    },

    saveAll(users) {
        localStorage.setItem(ZEUS_USERS_KEY, JSON.stringify(users));
    },

    async ensureHashes() {
        return this.getAll();
    },

    getSession() {
        try {
            const raw = sessionStorage.getItem(ZEUS_USER_SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },

    setSession(user) {
        if (user) {
            sessionStorage.setItem(ZEUS_USER_SESSION_KEY, JSON.stringify({
                id: user.id,
                username: user.username,
                displayName: user.displayName,
                role: user.role,
            }));
        } else {
            sessionStorage.removeItem(ZEUS_USER_SESSION_KEY);
        }
    },

    isLoggedIn() {
        return !!this.getSession();
    },

    isAdmin() {
        const u = this.getSession();
        return u && u.role === 'admin';
    },

    async login(username, password) {
        if (!password) return null;
        if (!crypto.subtle) {
            throw new Error('المتصفح لا يدعم تسجيل الدخول — افتح الموقع عبر HTTPS');
        }
        const users = this.getAll();
        const name = sanitizeUsername(username);
        const hash = await hashPassword(password);
        let user = users.find(u => u.username === name && u.passwordHash === hash);

        if (!user && name === 'admin') {
            const legacyPass = migrateLegacyAdminPassword();
            if (legacyPass && password === legacyPass) {
                const admin = users.find(u => u.username === 'admin');
                if (admin) {
                    admin.passwordHash = hash;
                    this.saveAll(users);
                    user = admin;
                }
            }
        }

        if (!user) return null;
        this.setSession(user);
        return this.getSession();
    },

    logout() {
        this.setSession(null);
    },

    listPublic() {
        return this.getAll().map(({ passwordHash, _legacyPassword, ...u }) => u);
    },

    async createUser({ username, displayName, password, role }) {
        if (!UserStore.isAdmin()) throw new Error('ليس لديك صلاحية');
        const name = sanitizeUsername(username);
        if (name.length < 3) throw new Error('اسم المستخدم قصير');
        if (!password || password.length < 4) throw new Error('كلمة المرور قصيرة');
        if (!['admin', 'editor'].includes(role)) throw new Error('دور غير صالح');
        const users = this.getAll();
        if (users.some(u => u.username === name)) throw new Error('اسم المستخدم موجود');
        const user = {
            id: 'u_' + Date.now().toString(36),
            username: name,
            displayName: (displayName || name).trim(),
            role,
            passwordHash: await hashPassword(password),
        };
        users.push(user);
        this.saveAll(users);
        const { passwordHash, ...pub } = user;
        return pub;
    },

    deleteUser(id) {
        if (!UserStore.isAdmin()) throw new Error('ليس لديك صلاحية');
        const me = this.getSession();
        if (me && me.id === id) throw new Error('لا يمكن حذف حسابك');
        const users = this.getAll();
        const target = users.find(u => u.id === id);
        if (!target) throw new Error('المستخدم غير موجود');
        const admins = users.filter(u => u.role === 'admin');
        if (target.role === 'admin' && admins.length <= 1) {
            throw new Error('يجب أن يبقى مدير واحد على الأقل');
        }
        this.saveAll(users.filter(u => u.id !== id));
    },

    async changePassword(currentPassword, newPassword) {
        const me = this.getSession();
        if (!me) throw new Error('غير مسجل');
        if (!newPassword || newPassword.length < 4) throw new Error('كلمة المرور الجديدة قصيرة');
        const users = await this.ensureHashes();
        const idx = users.findIndex(u => u.id === me.id);
        if (idx < 0) throw new Error('المستخدم غير موجود');
        const hash = await hashPassword(currentPassword);
        if (users[idx].passwordHash !== hash) throw new Error('كلمة المرور الحالية غير صحيحة');
        users[idx].passwordHash = await hashPassword(newPassword);
        this.saveAll(users);
    },

    async resetUserPassword(id, newPassword) {
        if (!UserStore.isAdmin()) throw new Error('ليس لديك صلاحية');
        if (!newPassword || newPassword.length < 4) throw new Error('كلمة المرور قصيرة');
        const users = this.getAll();
        const idx = users.findIndex(u => u.id === id);
        if (idx < 0) throw new Error('المستخدم غير موجود');
        users[idx].passwordHash = await hashPassword(newPassword);
        this.saveAll(users);
    },
};

function mergeDefaults(stored) {
    const base = deepClone(DEFAULT_CONTENT);
    if (!stored || typeof stored !== 'object') return base;
    return {
        ...base,
        ...stored,
        hero: { ...base.hero, ...stored.hero },
        about: { ...base.about, ...stored.about },
        services: { ...base.services, ...stored.services },
        process: { ...base.process, ...stored.process },
        testimonials: { ...base.testimonials, ...stored.testimonials },
        portfolio: { ...base.portfolio, ...stored.portfolio },
        contact: { ...base.contact, ...stored.contact },
        footer: { ...base.footer, ...stored.footer },
        meta: { ...base.meta, ...stored.meta },
    };
}

const ContentStore = {
    get() {
        try {
            const raw = localStorage.getItem(ZEUS_STORAGE_KEY);
            if (!raw) return deepClone(DEFAULT_CONTENT);
            return mergeDefaults(JSON.parse(raw));
        } catch {
            return deepClone(DEFAULT_CONTENT);
        }
    },

    save(data) {
        const clean = { ...data };
        delete clean.admin;
        localStorage.setItem(ZEUS_STORAGE_KEY, JSON.stringify(clean));
        window.dispatchEvent(new CustomEvent('zeus-content-updated'));
    },

    reset() {
        if (!UserStore.isAdmin()) throw new Error('ليس لديك صلاحية');
        localStorage.removeItem(ZEUS_STORAGE_KEY);
        window.dispatchEvent(new CustomEvent('zeus-content-updated'));
        return deepClone(DEFAULT_CONTENT);
    },

    exportJson() {
        return JSON.stringify(this.get(), null, 2);
    },

    importJson(jsonStr) {
        const parsed = JSON.parse(jsonStr);
        const merged = mergeDefaults(parsed);
        this.save(merged);
        return merged;
    },

    isLoggedIn: () => UserStore.isLoggedIn(),
    isAdmin: () => UserStore.isAdmin(),
    getUser: () => UserStore.getSession(),
    login: (username, password) => UserStore.login(username, password),
    logout: () => UserStore.logout(),
    listUsers: () => UserStore.listPublic(),
    createUser: (data) => UserStore.createUser(data),
    deleteUser: (id) => UserStore.deleteUser(id),
    changePassword: (current, newPass) => UserStore.changePassword(current, newPass),
    resetUserPassword: (id, newPass) => UserStore.resetUserPassword(id, newPass),
    resetUsersToDefaults: () => UserStore.resetToDefaults(),
};

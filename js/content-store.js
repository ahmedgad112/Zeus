/**
 * Zeus Agency — محتوى الموقع (localStorage)
 */
const ZEUS_STORAGE_KEY = 'zeus_site_content_v1';
const ZEUS_AUTH_KEY = 'zeus_admin_session';

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
    admin: {
        password: 'zeus2026',
    },
};

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

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
        admin: { ...base.admin, ...stored.admin },
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
        localStorage.setItem(ZEUS_STORAGE_KEY, JSON.stringify(data));
        window.dispatchEvent(new CustomEvent('zeus-content-updated'));
    },

    reset() {
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

    isLoggedIn() {
        return sessionStorage.getItem(ZEUS_AUTH_KEY) === '1';
    },

    login(password) {
        const data = this.get();
        if (password === data.admin.password) {
            sessionStorage.setItem(ZEUS_AUTH_KEY, '1');
            return true;
        }
        return false;
    },

    logout() {
        sessionStorage.removeItem(ZEUS_AUTH_KEY);
    },

    changePassword(newPass) {
        const data = this.get();
        data.admin.password = newPass;
        this.save(data);
    },
};

if (typeof module !== 'undefined') module.exports = { ContentStore, DEFAULT_CONTENT, TAG_COLORS, uid };

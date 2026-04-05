export const locales = ["uz", "en", "ru"] as const;

export type Locale = (typeof locales)[number];

type TranslationDictionary = {
  navbar: {
    links: { label: string; id: string }[];
    login: string;
    start: string;
    languageLabel: string;
  };
  hero: {
    badge: string;
    typedPhrase: string;
    title: { line1: string; italic: string; line3: string; line4: string };
    description: string;
    primaryCta: string;
    secondaryCta: string;
    stats: { value: string; label: string }[];
    profileCards: { name: string; handle: string; bio: string }[];
    floatingReady: string;
    floatingOnline: string;
    floatingUptime: string;
  };
  trust: { caption: string };
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  carousel: {
    eyebrow: string;
    titleLine1: string;
    titleItalic: string;
    steps: { icon: string; title: string; text: string }[];
  };
  templates: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollHint: string;
    items: { name: string; user: string; handle: string; bio: string }[];
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    steps: { n: string; title: string; desc: string; icon: string }[];
  };
  cta: {
    titleLine1: string;
    titleItalic: string;
    titleLine3: string;
    descriptionLine1: string;
    descriptionLine2: string;
    primary: string;
    secondary: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  footer: {
    description: string;
    platformTitle: string;
    companyTitle: string;
    platformLinks: string[];
    companyLinks: string[];
    copyright: string;
  };
  auth: {
    backHome: string;
    title: string;
    description: string;
    loginWithGoogle: string;
    loginWithFacebook: string;
    loginWithTelegram: string;
    termsPrefix: string;
    termsLink: string;
    and: string;
    privacyLink: string;
    termsSuffix: string;
    samplePage: string;
    sampleRole: string;
    sampleButtons: string[];
    yourLink: string;
    telegramOpening: string;
    telegramError: string;
    telegramCta: string;
  };
  authCallback: {
    loadingTitle: string;
    loadingDescription: string;
    errorTitle: string;
    genericError: string;
    retry: string;
  };
  onboarding: {
    progressStep: string;
    stepBadge: string;
    back: string;
    skip: string;
    continue: string;
    finish: string;
    preview: string;
    link: string;
    steps: { id: number; title: string; desc: string }[];
    step1Options: string[];
    step2Options: string[];
    uploadTitle: string;
    uploadClick: string;
    uploadHint: string;
    remove: string;
    titleLabel: string;
    titlePlaceholder: string;
    descriptionLabel: string;
    optional: string;
    descriptionPlaceholder: string;
    socialPlaceholders: Record<string, string>;
    contactButton: string;
    workHours: string;
    phone: string;
    googleMaps: string;
    mapsPlaceholder: string;
    successTitle: string;
    successDescription: string;
    dashboard: string;
    loadingProfile: string;
    saving: string;
    saveError: string;
  };
  dashboardPage: {
    title: string;
    description: string;
    loading: string;
    loadError: string;
    errorTitle: string;
    retry: string;
    emptyTitle: string;
    emptyDescription: string;
    startAction: string;
    editAction: string;
    claimAction: string;
    summaryTitle: string;
    profileTitle: string;
    platforms: string;
    phones: string;
    socials: string;
    websites: string;
    name: string;
    template: string;
    workingHours: string;
    mapLabel: string;
    notProvided: string;
    connected: string;
    guestNotice: string;
    claimTitle: string;
    claimDescription: string;
    claimBadge: string;
  };
};

export const translations: Record<Locale, TranslationDictionary> = {
  uz: {
    navbar: {
      links: [
        { label: "Imkoniyatlar", id: "imkoniyatlar" },
        { label: "Shablonlar", id: "shablonlar" },
        { label: "Qanday ishlaydi", id: "qanday-ishlaydi" },
        { label: "FAQ", id: "faq" },
      ],
      login: "Kirish",
      start: "Boshlash",
      languageLabel: "Til",
    },
    hero: {
      badge: "Mini-sayt yaratuvchi platforma",
      typedPhrase: "sizning-nomingiz",
      title: {
        line1: "Shaxsiy",
        italic: "sahifangizni",
        line3: "bir necha",
        line4: "daqiqada yarating",
      },
      description:
        "Logo, havolalar, ish vaqti, ijtimoiy tarmoqlar va manzil ma'lumotlarini qo'shing — va tayyor mini-saytingizni darhol ishga tushiring.",
      primaryCta: "Bepul boshlash",
      secondaryCta: "Namuna ko'rish",
      stats: [
        { value: "500+", label: "Foydalanuvchilar" },
        { value: "4.9★", label: "Reyting" },
        { value: "2 min", label: "O'rtacha sozlash" },
      ],
      profileCards: [
        {
          name: "Alisher Nazarov",
          handle: "alisher.uz",
          bio: "UX dizayner va frontend dasturchi. 5 yillik tajriba.",
        },
        {
          name: "Zulfiya's Studio",
          handle: "zulfiya",
          bio: "Kichik biznes uchun brending va dizayn.",
        },
      ],
      floatingReady: "Sahifa tayyor!",
      floatingOnline: "Onlayn",
      floatingUptime: "24/7 ishlaydi",
    },
    trust: {
      caption:
        "Bizneslar, mutaxassislar va brendlar uchun qulay sahifa yaratuvchi platforma",
    },
    features: {
      eyebrow: "Imkoniyatlar",
      title: "Hamma narsa bir joyda",
      subtitle: "Sahifangizni to'liq boshqarish uchun kerakli barcha vositalar",
      items: [
        { title: "Logo va brend ko'rinishi", desc: "Logotipingizni yuklang, rang va shrift tanlab, o'zingizga xos ko'rinish yarating." },
        { title: "Ijtimoiy tarmoqlar havolalari", desc: "Instagram, Telegram, YouTube va boshqa tarmoqlarga havolalar qo'shing." },
        { title: "Ish vaqti ko'rsatish", desc: "Har kunlik ish jadvali, bayram va ta'til kunlarini batafsil ko'rsating." },
        { title: "Manzil havolalari", desc: "Google Maps, Yandex Maps va 2GIS havolalarini bir joyga jamlang." },
        { title: "Telefon raqamlar", desc: "Bir yoki bir nechta aloqa raqamlarini qo'shing, tezkor qo'ng'iroq tugmasi bilan." },
        { title: "Shaxsiy havola", desc: "biosahifa.uz/ismingiz ko'rinishida o'zingizning maxsus havolangizni oling." },
        { title: "Tez sozlash", desc: "Ro'yxatdan o'tish va sozlashni 2–3 daqiqada yakunlang. Murakkab texnik bilim shart emas." },
        { title: "Mobilga mos dizayn", desc: "Barcha qurilmalarda, jumladan smartfon va planshetlarda mukammal ko'rinadi." },
      ],
    },
    carousel: {
      eyebrow: "Qanday ishlaydi",
      titleLine1: "Platformadan qanday",
      titleItalic: "foydalaniladi",
      steps: [
        { icon: "🔐", title: "Tizimga kiring", text: "Email yoki telefon raqami orqali tez ro'yxatdan o'ting" },
        { icon: "🖼️", title: "Logotip yuklang", text: "Kompaniya logotipi yoki shaxsiy rasmingizni qo'shing" },
        { icon: "✏️", title: "Sarlavha va tavsif", text: "Kim ekanligingizni qisqacha va aniq ifodalang" },
        { icon: "🔗", title: "Ijtimoiy tarmoqlar", text: "Barcha tarmoqlarga havolalarni bir joyga yig'ing" },
        { icon: "🕐", title: "Ish vaqtini belgilang", text: "Dushanba–Juma: 9:00–18:00 formatida ko'rsating" },
        { icon: "📍", title: "Manzil havolalari", text: "Google, Yandex, 2GIS xarita havolalarini joylashtiring" },
        { icon: "🚀", title: "Sahifani chop eting", text: "Bir tugma bosamiz — sahifangiz darhol onlayn!" },
        { icon: "📲", title: "Havolani ulashing", text: "biosahifa.uz/ismingiz — barcha joyda ulashing" },
      ],
    },
    templates: {
      eyebrow: "Shablonlar",
      title: "Tayyor shablonlar",
      subtitle: "Turli uslubdagi sahifalardan birini tanlang va o'zingizga moslashtiring",
      ctaPrimary: "Bog'lanish",
      ctaSecondary: "Portfolio ko'rish",
      scrollHint: "↓ Davom etish uchun aylantiring",
      items: [
        { name: "Minimal Oq", user: "Aziza Karimova", handle: "aziza.design", bio: "UX/UI dizayner" },
        { name: "Qora Premium", user: "Jasur Toshmatov", handle: "jasur.pro", bio: "Fotograf va videograf" },
        { name: "Rang Gradient", user: "Malika Umarova", handle: "malika.uz", bio: "SMM mutaxassisi va bloger" },
        { name: "Biznes Uslubi", user: "NexaCorp", handle: "nexacorp", bio: "IT kompaniya · Toshkent" },
        { name: "Kreativ", user: "Studio Saodat", handle: "saodat.art", bio: "Grafik dizayner va illyustrator" },
        { name: "Soft Pastel", user: "Nilufar Beauty", handle: "nilufar.beauty", bio: "Kosmetolog va vizajist" },
        { name: "Dark Glass", user: "Cyber Pro", handle: "cyberpro", bio: "Kiberxavfsizlik mutaxassisi" },
        { name: "Bold Creator", user: "UzContent", handle: "uzcontent", bio: "YouTuber · 200K obunachi" },
      ],
    },
    howItWorks: {
      eyebrow: "Jarayon",
      title: "Qanday ishlaydi",
      steps: [
        { n: "01", title: "Ro'yxatdan o'ting", desc: "Email yoki telefon raqamingiz bilan tezda ro'yxatdan o'ting. 1 daqiqa ham ketmaydi.", icon: "📝" },
        { n: "02", title: "Ma'lumotlaringizni kiriting", desc: "Logo, sarlavha, tavsif, telefon, manzil va barcha kerakli ma'lumotlarni qo'shing.", icon: "📋" },
        { n: "03", title: "Dizaynni tanlang", desc: "Ko'plab tayyor shablonlardan birini tanlang va ranglar, shriftlarni o'zingizga moslang.", icon: "🎨" },
        { n: "04", title: "Havolangizni ulashing", desc: "biosahifa.uz/ismingiz — bu havolani Instagram bio, kartochka yoki WhatsApp'ga qo'ying.", icon: "🔗" },
      ],
    },
    cta: {
      titleLine1: "Bugunoq o'z",
      titleItalic: "sahifangizni",
      titleLine3: "yarating",
      descriptionLine1: "Biznesingiz yoki shaxsiy brendingiz uchun zamonaviy mini-saytni",
      descriptionLine2: "bir necha daqiqada ishga tushiring.",
      primary: "Boshlash",
      secondary: "Demo ko'rish",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Ko'p so'raladigan savollar",
      items: [
        { q: "Bu platforma nima uchun kerak?", a: "BioSahifa sizga o'z biznesingiz yoki shaxsiy brendingiz uchun professional mini-veb-sayt yaratish imkonini beradi. Barcha aloqa ma'lumotlari, havolalar va ish vaqti bitta sahifada — tez topiladi, qulay ulashiladi." },
        { q: "Sahifani yaratish qancha vaqt oladi?", a: "O'rtacha 2–3 daqiqa. Ro'yxatdan o'tish, ma'lumot kiritish va sahifani nashr etish — barchasi juda oddiy va tezkor jarayon." },
        { q: "Telefon va ijtimoiy tarmoqlarni qo'sha olamanmi?", a: "Ha, albatta. Instagram, Telegram, YouTube, Facebook, TikTok va boshqa ijtimoiy tarmoq havolalarini, shuningdek telefon raqamlarini qo'shish mumkin." },
        { q: "Manzil havolalarini joylashtira olamanmi?", a: "Ha. Google Maps, Yandex Maps va 2GIS xarita havolalarini sahifangizga qo'shishingiz mumkin. Mijozlaringiz bir bosganda joylashuvingizga yo'l topa oladi." },
        { q: "Dizaynni keyin o'zgartirish mumkinmi?", a: "Albatta. Sahifangizni istalgan vaqt tahrirlashingiz — shablon almashtirish, rang va matnlarni yangilash mumkin. O'zgarishlar darhol kuchga kiradi." },
        { q: "Sahifam mobil qurilmalarda ishlayadimi?", a: "Ha, barcha shablonlar to'liq mobil moslashtirilgan. Smartfon, planshet va kompyuterda bir xil sifatli ko'rinadi." },
      ],
    },
    footer: {
      description: "Bizneslar va shaxslar uchun professional mini-veb-sayt yaratuvchi platforma.",
      platformTitle: "Platforma",
      companyTitle: "Kompaniya",
      platformLinks: ["Imkoniyatlar", "Shablonlar", "Narxlar", "Blog"],
      companyLinks: ["Biz haqimizda", "Aloqa", "Shartlar", "Maxfiylik"],
      copyright: "© 2025 BioSahifa. Barcha huquqlar himoyalangan.",
    },
    auth: {
      backHome: "Bosh sahifaga qaytish",
      title: "Tizimga kirish",
      description: "Hisobingizga kiring va shaxsiy sahifangizni yaratishni boshlang.",
      loginWithGoogle: "Google orqali kirish",
      loginWithFacebook: "Facebook orqali kirish",
      loginWithTelegram: "Telegram orqali kirish",
      termsPrefix: "Davom etish orqali siz",
      termsLink: "foydalanish shartlari",
      and: "va",
      privacyLink: "maxfiylik siyosatiga",
      termsSuffix: "rozilik bildirasiz.",
      samplePage: "Namuna sahifa",
      sampleRole: "UX Dizayner · Toshkent",
      sampleButtons: ["Bog'lanish", "Portfolio", "Telegram"],
      yourLink: "Sizning havolangiz",
      telegramOpening: "Telegram oynasi tayyorlanmoqda...",
      telegramError: "Telegram auth oqimini ochib bo'lmadi. Qayta urinib ko'ring.",
      telegramCta: "Telegram botni ochish",
    },
    authCallback: {
      loadingTitle: "Telegram tasdiqlanmoqda",
      loadingDescription:
        "Autorizatsiya ma'lumotlari tekshirilmoqda. Bir necha soniya kuting.",
      errorTitle: "Telegram auth tugamadi",
      genericError: "Telegram orqali kirishda xatolik yuz berdi.",
      retry: "Auth sahifasiga qaytish",
    },
    onboarding: {
      progressStep: "{step}/{total}-qadam",
      stepBadge: "{step}-qadam",
      back: "Orqaga",
      skip: "O'tkazib yuborish",
      continue: "Davom etish →",
      finish: "Yakunlash 🎉",
      preview: "Ko'rinish",
      link: "Havola",
      steps: [
        { id: 1, title: "Qaysi manba orqali bilib oldingiz?", desc: "BioSahifa haqida qaysi manbadan bilib oldingiz?" },
        { id: 2, title: "Havolangizni qayerga joylashtirmoqchisiz?", desc: "Bir yoki bir nechta platformani tanlashingiz mumkin." },
        { id: 3, title: "Shablonni tanlang", desc: "O'zingizga mos dizaynni tanlang. Keyinroq ham o'zgartirishingiz mumkin." },
        { id: 4, title: "Asosiy ma'lumotlarni kiriting", desc: "Bu ma'lumotlar sahifangizning asosiy ko'rinishini belgilaydi." },
        { id: 5, title: "Ijtimoiy tarmoqlar havolalari", desc: "Kerakli havolalarni qo'shing. Istalganlarini bo'sh qoldirishingiz mumkin." },
        { id: 6, title: "Qo'shimcha ma'lumotlar", desc: "Ish vaqti, manzil va aloqa ma'lumotlarini kiriting." },
      ],
      step1Options: ["Instagram", "Telegram", "Facebook", "YouTube", "Google qidiruv", "Do'st tavsiyasi", "Boshqa"],
      step2Options: ["Instagram bio", "Telegram profil", "TikTok bio", "YouTube tavsifi", "Facebook sahifa", "WhatsApp", "LinkedIn", "Shaxsiy vizitka", "Biznes profili", "Boshqa"],
      uploadTitle: "Logo / Rasm",
      uploadClick: "Rasm yuklash uchun bosing",
      uploadHint: "PNG, JPG, SVG — max 2MB",
      remove: "O'chirish",
      titleLabel: "Sarlavha",
      titlePlaceholder: "Masalan: Aziza Karimova yoki MegaZon UZ",
      descriptionLabel: "Tavsif",
      optional: "ixtiyoriy",
      descriptionPlaceholder: "Qisqacha o'zingiz haqingizda...",
      socialPlaceholders: {
        Instagram: "instagram.com/sizning-nom",
        Telegram: "t.me/sizning-nom",
        Facebook: "facebook.com/sizning-nom",
        YouTube: "youtube.com/@sizning-nom",
        TikTok: "tiktok.com/@sizning-nom",
        LinkedIn: "linkedin.com/in/sizning-nom",
        Website: "sizning-sayt.uz",
      },
      contactButton: "Bog'lanish",
      workHours: "Ish vaqti",
      phone: "Telefon",
      googleMaps: "Google Maps",
      mapsPlaceholder: "Google Maps havolasi",
      successTitle: "Tabriklayapman!",
      successDescription: "Sahifangiz tayyor. Endi dashboard'da tahrirlash va boshqarish mumkin.",
      dashboard: "Dashboard'ga o'tish",
      loadingProfile: "Saqlangan profilingiz yuklanmoqda...",
      saving: "Saqlanmoqda...",
      saveError: "Profilni saqlashda xatolik yuz berdi. Qayta urinib ko'ring.",
    },
    dashboardPage: {
      title: "Dashboard",
      description:
        "Bu yerda sahifangizning holatini ko'rasiz, ma'lumotlarni tahrirlaysiz va profilingizni akkauntga bog'lashga tayyor bo'lasiz.",
      loading: "Dashboard yuklanmoqda...",
      loadError: "Dashboard ma'lumotlarini yuklab bo'lmadi.",
      errorTitle: "Dashboard ochilmadi",
      retry: "Qayta urinish",
      emptyTitle: "Hozircha profil topilmadi",
      emptyDescription:
        "Avval onboarding bosqichlarini yakunlang, keyin bu yerda tayyor profilingiz ko'rinadi.",
      startAction: "Onboarding'ni boshlash",
      editAction: "Onboarding'ni tahrirlash",
      claimAction: "Template ni claim qilish",
      summaryTitle: "Qisqacha holat",
      profileTitle: "Profil ma'lumotlari",
      platforms: "Platformalar",
      phones: "Telefonlar",
      socials: "Ijtimoiy tarmoqlar",
      websites: "Websaytlar",
      name: "Nomi",
      template: "Shablon",
      workingHours: "Ish vaqti",
      mapLabel: "Xarita",
      notProvided: "Kiritilmagan",
      connected: "Ulangan",
      guestNotice:
        "Siz guest sessiyada ishlayapsiz. Telegram yoki Google orqali kirib profilingizni akkauntga biriktirishingiz mumkin.",
      claimTitle: "Profilingizni claim qiling",
      claimDescription:
        "Telegram yoki Google orqali kirib, hozirgi guest profilingizni shaxsiy akkauntga bog'lash oqimiga tayyor turing.",
      claimBadge: "Claim uchun tayyor link",
    },
  },
  en: {
    navbar: {
      links: [
        { label: "Features", id: "imkoniyatlar" },
        { label: "Templates", id: "shablonlar" },
        { label: "How it works", id: "qanday-ishlaydi" },
        { label: "FAQ", id: "faq" },
      ],
      login: "Log in",
      start: "Get started",
      languageLabel: "Language",
    },
    hero: {
      badge: "Mini-site creation platform",
      typedPhrase: "your-name",
      title: { line1: "Create", italic: "your personal page", line3: "in just", line4: "a few minutes" },
      description: "Add your logo, links, working hours, social media, and address details — then launch your mini-site instantly.",
      primaryCta: "Start free",
      secondaryCta: "View demo",
      stats: [
        { value: "500+", label: "Users" },
        { value: "4.9★", label: "Rating" },
        { value: "2 min", label: "Average setup" },
      ],
      profileCards: [
        { name: "Alisher Nazarov", handle: "alisher.uz", bio: "UX designer and frontend developer. 5 years of experience." },
        { name: "Zulfiya's Studio", handle: "zulfiya", bio: "Branding and design for small businesses." },
      ],
      floatingReady: "Page is ready!",
      floatingOnline: "Online",
      floatingUptime: "Works 24/7",
    },
    trust: { caption: "An easy page builder for businesses, professionals, and brands" },
    features: {
      eyebrow: "Features",
      title: "Everything in one place",
      subtitle: "All the tools you need to fully manage your page",
      items: [
        { title: "Logo and brand look", desc: "Upload your logo, choose colors and fonts, and create a unique style." },
        { title: "Social media links", desc: "Add links to Instagram, Telegram, YouTube, and other networks." },
        { title: "Display business hours", desc: "Show daily schedule, holidays, and days off in detail." },
        { title: "Location links", desc: "Gather Google Maps, Yandex Maps, and 2GIS links in one place." },
        { title: "Phone numbers", desc: "Add one or multiple contact numbers with a quick-call button." },
        { title: "Personal URL", desc: "Get your custom URL like biosahifa.uz/yourname." },
        { title: "Fast setup", desc: "Complete sign-up and setup in 2–3 minutes. No technical skills required." },
        { title: "Mobile-first design", desc: "Looks perfect on all devices, including phones and tablets." },
      ],
    },
    carousel: {
      eyebrow: "How it works",
      titleLine1: "How to use",
      titleItalic: "the platform",
      steps: [
        { icon: "🔐", title: "Sign in", text: "Register quickly using your email or phone number" },
        { icon: "🖼️", title: "Upload a logo", text: "Add your company logo or personal photo" },
        { icon: "✏️", title: "Title and description", text: "Clearly describe who you are in a few words" },
        { icon: "🔗", title: "Social media", text: "Collect links to all networks in one place" },
        { icon: "🕐", title: "Set business hours", text: "Display in a format like Mon–Fri: 9:00–18:00" },
        { icon: "📍", title: "Location links", text: "Add Google, Yandex, and 2GIS map links" },
        { icon: "🚀", title: "Publish the page", text: "One click — your page goes live instantly!" },
        { icon: "📲", title: "Share your link", text: "biosahifa.uz/yourname — share it everywhere" },
      ],
    },
    templates: {
      eyebrow: "Templates",
      title: "Ready-made templates",
      subtitle: "Choose a style and tailor it to your needs",
      ctaPrimary: "Contact",
      ctaSecondary: "View portfolio",
      scrollHint: "↓ Scroll to continue",
      items: [
        { name: "Minimal White", user: "Aziza Karimova", handle: "aziza.design", bio: "UX/UI designer" },
        { name: "Black Premium", user: "Jasur Toshmatov", handle: "jasur.pro", bio: "Photographer & videographer" },
        { name: "Color Gradient", user: "Malika Umarova", handle: "malika.uz", bio: "SMM expert & blogger" },
        { name: "Business Style", user: "NexaCorp", handle: "nexacorp", bio: "IT company · Tashkent" },
        { name: "Creative", user: "Studio Saodat", handle: "saodat.art", bio: "Graphic designer & illustrator" },
        { name: "Soft Pastel", user: "Nilufar Beauty", handle: "nilufar.beauty", bio: "Cosmetologist & makeup artist" },
        { name: "Dark Glass", user: "Cyber Pro", handle: "cyberpro", bio: "Cybersecurity specialist" },
        { name: "Bold Creator", user: "UzContent", handle: "uzcontent", bio: "YouTuber · 200K subscribers" },
      ],
    },
    howItWorks: {
      eyebrow: "Process",
      title: "How it works",
      steps: [
        { n: "01", title: "Sign up", desc: "Register quickly with your email or phone number. It takes less than a minute.", icon: "📝" },
        { n: "02", title: "Add your details", desc: "Add logo, headline, description, phone, address, and all required information.", icon: "📋" },
        { n: "03", title: "Choose a design", desc: "Pick one of many ready templates and customize colors and fonts.", icon: "🎨" },
        { n: "04", title: "Share your URL", desc: "biosahifa.uz/yourname — place it in Instagram bio, a card, or WhatsApp.", icon: "🔗" },
      ],
    },
    cta: {
      titleLine1: "Create",
      titleItalic: "your page",
      titleLine3: "today",
      descriptionLine1: "Launch a modern mini-site for your business or personal brand",
      descriptionLine2: "in just a few minutes.",
      primary: "Get started",
      secondary: "Watch demo",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      items: [
        { q: "What is this platform for?", a: "BioSahifa helps you create a professional mini website for your business or personal brand. Contact details, links, and business hours all in one page — easy to find and share." },
        { q: "How long does it take to create a page?", a: "On average, 2–3 minutes. Sign up, add your details, and publish — the whole process is simple and fast." },
        { q: "Can I add phone numbers and social media?", a: "Yes, absolutely. You can add links to Instagram, Telegram, YouTube, Facebook, TikTok, and other platforms, as well as phone numbers." },
        { q: "Can I add map links?", a: "Yes. You can add Google Maps, Yandex Maps, and 2GIS links to your page so clients can find your location with one click." },
        { q: "Can I change the design later?", a: "Of course. You can edit your page anytime — switch templates and update colors or text. Changes apply instantly." },
        { q: "Will my page work on mobile devices?", a: "Yes, all templates are fully mobile-responsive and look great on phones, tablets, and desktops." },
      ],
    },
    footer: {
      description: "A platform for creating professional mini websites for businesses and individuals.",
      platformTitle: "Platform",
      companyTitle: "Company",
      platformLinks: ["Features", "Templates", "Pricing", "Blog"],
      companyLinks: ["About", "Contact", "Terms", "Privacy"],
      copyright: "© 2025 BioSahifa. All rights reserved.",
    },
    auth: {
      backHome: "Back to home",
      title: "Sign in",
      description: "Sign in to your account and start building your personal page.",
      loginWithGoogle: "Continue with Google",
      loginWithFacebook: "Continue with Facebook",
      loginWithTelegram: "Continue with Telegram",
      termsPrefix: "By continuing, you agree to the",
      termsLink: "Terms of use",
      and: "and",
      privacyLink: "Privacy policy",
      termsSuffix: ".",
      samplePage: "Sample page",
      sampleRole: "UX Designer · Tashkent",
      sampleButtons: ["Contact", "Portfolio", "Telegram"],
      yourLink: "Your link",
      telegramOpening: "Preparing your Telegram auth flow...",
      telegramError: "We could not open the Telegram auth flow. Please try again.",
      telegramCta: "Open Telegram bot",
    },
    authCallback: {
      loadingTitle: "Confirming Telegram sign-in",
      loadingDescription:
        "We are validating the authorization payload and preparing your session.",
      errorTitle: "Telegram sign-in failed",
      genericError: "Something went wrong while signing in with Telegram.",
      retry: "Back to auth",
    },
    onboarding: {
      progressStep: "Step {step} of {total}",
      stepBadge: "Step {step}",
      back: "Back",
      skip: "Skip",
      continue: "Continue →",
      finish: "Finish 🎉",
      preview: "Preview",
      link: "Link",
      steps: [
        { id: 1, title: "How did you hear about us?", desc: "Where did you first hear about BioSahifa?" },
        { id: 2, title: "Where will you place your link?", desc: "You can choose one or multiple platforms." },
        { id: 3, title: "Choose a template", desc: "Pick a design that fits you. You can change it later." },
        { id: 4, title: "Enter basic information", desc: "These details define your page's primary appearance." },
        { id: 5, title: "Social media links", desc: "Add the links you need. You can leave any of them empty." },
        { id: 6, title: "Additional information", desc: "Enter working hours, address, and contact information." },
      ],
      step1Options: ["Instagram", "Telegram", "Facebook", "YouTube", "Google search", "Friend referral", "Other"],
      step2Options: ["Instagram bio", "Telegram profile", "TikTok bio", "YouTube description", "Facebook page", "WhatsApp", "LinkedIn", "Personal business card", "Business profile", "Other"],
      uploadTitle: "Logo / Image",
      uploadClick: "Click to upload an image",
      uploadHint: "PNG, JPG, SVG — max 2MB",
      remove: "Remove",
      titleLabel: "Title",
      titlePlaceholder: "For example: Aziza Karimova or MegaZon UZ",
      descriptionLabel: "Description",
      optional: "optional",
      descriptionPlaceholder: "A short bio about yourself...",
      socialPlaceholders: {
        Instagram: "instagram.com/your-name",
        Telegram: "t.me/your-name",
        Facebook: "facebook.com/your-name",
        YouTube: "youtube.com/@your-name",
        TikTok: "tiktok.com/@your-name",
        LinkedIn: "linkedin.com/in/your-name",
        Website: "your-site.uz",
      },
      contactButton: "Contact",
      workHours: "Working hours",
      phone: "Phone",
      googleMaps: "Google Maps",
      mapsPlaceholder: "Google Maps link",
      successTitle: "Congratulations!",
      successDescription: "Your page is ready. Now you can edit and manage it in the dashboard.",
      dashboard: "Go to dashboard",
      loadingProfile: "Loading your saved profile...",
      saving: "Saving...",
      saveError: "We could not save your profile. Please try again.",
    },
    dashboardPage: {
      title: "Dashboard",
      description:
        "Review your page status, jump back into onboarding, and keep your profile ready to be claimed by a real account later.",
      loading: "Loading dashboard...",
      loadError: "We could not load your dashboard right now.",
      errorTitle: "Dashboard is unavailable",
      retry: "Try again",
      emptyTitle: "No profile found yet",
      emptyDescription:
        "Complete onboarding first and your saved profile will appear here.",
      startAction: "Start onboarding",
      editAction: "Edit onboarding",
      claimAction: "Claim template/account",
      summaryTitle: "Quick summary",
      profileTitle: "Profile details",
      platforms: "Platforms",
      phones: "Phones",
      socials: "Socials",
      websites: "Websites",
      name: "Name",
      template: "Template",
      workingHours: "Working hours",
      mapLabel: "Map",
      notProvided: "Not provided",
      connected: "Connected",
      guestNotice:
        "You are using a guest session. Connect Telegram or Google later to claim this profile.",
      claimTitle: "Claim your profile",
      claimDescription:
        "Sign in with Telegram or Google to attach the current guest profile to a real account when auth is enabled.",
      claimBadge: "Link ready to claim",
    },
  },
  ru: {
    navbar: {
      links: [
        { label: "Возможности", id: "imkoniyatlar" },
        { label: "Шаблоны", id: "shablonlar" },
        { label: "Как это работает", id: "qanday-ishlaydi" },
        { label: "FAQ", id: "faq" },
      ],
      login: "Вход",
      start: "Начать",
      languageLabel: "Язык",
    },
    hero: {
      badge: "Платформа для создания мини-сайтов",
      typedPhrase: "ваше-имя",
      title: { line1: "Создайте", italic: "свою страницу", line3: "всего за", line4: "несколько минут" },
      description: "Добавьте логотип, ссылки, часы работы, соцсети и адрес — и запустите мини-сайт сразу.",
      primaryCta: "Начать бесплатно",
      secondaryCta: "Посмотреть демо",
      stats: [
        { value: "500+", label: "Пользователи" },
        { value: "4.9★", label: "Рейтинг" },
        { value: "2 мин", label: "Средняя настройка" },
      ],
      profileCards: [
        { name: "Alisher Nazarov", handle: "alisher.uz", bio: "UX-дизайнер и frontend-разработчик. Опыт 5 лет." },
        { name: "Zulfiya's Studio", handle: "zulfiya", bio: "Брендинг и дизайн для малого бизнеса." },
      ],
      floatingReady: "Страница готова!",
      floatingOnline: "Онлайн",
      floatingUptime: "Работает 24/7",
    },
    trust: { caption: "Удобный конструктор страниц для бизнеса, специалистов и брендов" },
    features: {
      eyebrow: "Возможности",
      title: "Всё в одном месте",
      subtitle: "Все нужные инструменты для полного управления страницей",
      items: [
        { title: "Логотип и стиль бренда", desc: "Загрузите логотип, выберите цвета и шрифты, создайте свой стиль." },
        { title: "Ссылки на соцсети", desc: "Добавьте ссылки на Instagram, Telegram, YouTube и другие платформы." },
        { title: "График работы", desc: "Покажите рабочие дни, праздники и выходные подробно." },
        { title: "Ссылки на адрес", desc: "Соберите ссылки Google Maps, Yandex Maps и 2GIS в одном месте." },
        { title: "Телефонные номера", desc: "Добавьте один или несколько номеров с кнопкой быстрого звонка." },
        { title: "Персональная ссылка", desc: "Получите свой адрес вида biosahifa.uz/вашеимя." },
        { title: "Быстрая настройка", desc: "Регистрация и настройка занимают 2–3 минуты. Технические знания не нужны." },
        { title: "Адаптивный дизайн", desc: "Идеально выглядит на смартфонах, планшетах и компьютерах." },
      ],
    },
    carousel: {
      eyebrow: "Как это работает",
      titleLine1: "Как пользоваться",
      titleItalic: "платформой",
      steps: [
        { icon: "🔐", title: "Войдите в систему", text: "Быстро зарегистрируйтесь по email или номеру телефона" },
        { icon: "🖼️", title: "Загрузите логотип", text: "Добавьте логотип компании или личное фото" },
        { icon: "✏️", title: "Заголовок и описание", text: "Кратко и понятно расскажите, кто вы" },
        { icon: "🔗", title: "Социальные сети", text: "Соберите ссылки на все платформы в одном месте" },
        { icon: "🕐", title: "Укажите график", text: "Например: Пн–Пт: 9:00–18:00" },
        { icon: "📍", title: "Ссылки на адрес", text: "Добавьте ссылки Google, Yandex и 2GIS" },
        { icon: "🚀", title: "Опубликуйте страницу", text: "Один клик — и страница сразу онлайн!" },
        { icon: "📲", title: "Поделитесь ссылкой", text: "biosahifa.uz/вашеимя — делитесь где угодно" },
      ],
    },
    templates: {
      eyebrow: "Шаблоны",
      title: "Готовые шаблоны",
      subtitle: "Выберите стиль и настройте его под себя",
      ctaPrimary: "Связаться",
      ctaSecondary: "Смотреть портфолио",
      scrollHint: "↓ Прокрутите, чтобы продолжить",
      items: [
        { name: "Минимал Белый", user: "Aziza Karimova", handle: "aziza.design", bio: "UX/UI дизайнер" },
        { name: "Черный Премиум", user: "Jasur Toshmatov", handle: "jasur.pro", bio: "Фотограф и видеограф" },
        { name: "Цветной Градиент", user: "Malika Umarova", handle: "malika.uz", bio: "SMM-эксперт и блогер" },
        { name: "Бизнес Стиль", user: "NexaCorp", handle: "nexacorp", bio: "IT-компания · Ташкент" },
        { name: "Креатив", user: "Studio Saodat", handle: "saodat.art", bio: "Графический дизайнер и иллюстратор" },
        { name: "Мягкий Пастель", user: "Nilufar Beauty", handle: "nilufar.beauty", bio: "Косметолог и визажист" },
        { name: "Темное Стекло", user: "Cyber Pro", handle: "cyberpro", bio: "Специалист по кибербезопасности" },
        { name: "Bold Creator", user: "UzContent", handle: "uzcontent", bio: "YouTube-автор · 200K подписчиков" },
      ],
    },
    howItWorks: {
      eyebrow: "Процесс",
      title: "Как это работает",
      steps: [
        { n: "01", title: "Зарегистрируйтесь", desc: "Быстрая регистрация по email или телефону. Меньше минуты.", icon: "📝" },
        { n: "02", title: "Добавьте данные", desc: "Укажите логотип, заголовок, описание, телефон, адрес и нужные данные.", icon: "📋" },
        { n: "03", title: "Выберите дизайн", desc: "Выберите один из готовых шаблонов и настройте цвета и шрифты.", icon: "🎨" },
        { n: "04", title: "Поделитесь ссылкой", desc: "biosahifa.uz/вашеимя — вставьте в Instagram bio, визитку или WhatsApp.", icon: "🔗" },
      ],
    },
    cta: {
      titleLine1: "Создайте",
      titleItalic: "свою страницу",
      titleLine3: "сегодня",
      descriptionLine1: "Запустите современный мини-сайт для бизнеса или личного бренда",
      descriptionLine2: "всего за несколько минут.",
      primary: "Начать",
      secondary: "Смотреть демо",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Часто задаваемые вопросы",
      items: [
        { q: "Для чего нужна эта платформа?", a: "BioSahifa помогает создать профессиональный мини-сайт для бизнеса или личного бренда. Контакты, ссылки и график работы — всё на одной странице, удобно искать и делиться." },
        { q: "Сколько времени занимает создание страницы?", a: "В среднем 2–3 минуты. Регистрация, заполнение данных и публикация проходят быстро и просто." },
        { q: "Можно добавить телефон и соцсети?", a: "Да, конечно. Можно добавить ссылки на Instagram, Telegram, YouTube, Facebook, TikTok и другие платформы, а также номера телефонов." },
        { q: "Можно добавить ссылки на карту?", a: "Да. Вы можете добавить ссылки Google Maps, Yandex Maps и 2GIS, чтобы клиент нашёл вас в один клик." },
        { q: "Можно изменить дизайн позже?", a: "Конечно. Страницу можно редактировать в любое время — менять шаблон, цвета и тексты. Изменения применяются сразу." },
        { q: "Страница будет работать на мобильных?", a: "Да, все шаблоны полностью адаптивны и отлично выглядят на смартфонах, планшетах и компьютерах." },
      ],
    },
    footer: {
      description: "Платформа для создания профессиональных мини-сайтов для бизнеса и частных специалистов.",
      platformTitle: "Платформа",
      companyTitle: "Компания",
      platformLinks: ["Возможности", "Шаблоны", "Цены", "Блог"],
      companyLinks: ["О нас", "Контакты", "Условия", "Конфиденциальность"],
      copyright: "© 2025 BioSahifa. Все права защищены.",
    },
    auth: {
      backHome: "Вернуться на главную",
      title: "Вход в систему",
      description: "Войдите в аккаунт и начните создавать свою персональную страницу.",
      loginWithGoogle: "Войти через Google",
      loginWithFacebook: "Войти через Facebook",
      loginWithTelegram: "Войти через Telegram",
      termsPrefix: "Продолжая, вы соглашаетесь с",
      termsLink: "условиями использования",
      and: "и",
      privacyLink: "политикой конфиденциальности",
      termsSuffix: ".",
      samplePage: "Пример страницы",
      sampleRole: "UX Дизайнер · Ташкент",
      sampleButtons: ["Связаться", "Портфолио", "Telegram"],
      yourLink: "Ваша ссылка",
      telegramOpening: "Подготавливаем окно авторизации Telegram...",
      telegramError: "Не удалось открыть Telegram авторизацию. Попробуйте еще раз.",
      telegramCta: "Открыть Telegram бота",
    },
    authCallback: {
      loadingTitle: "Подтверждаем вход через Telegram",
      loadingDescription:
        "Проверяем данные авторизации и подготавливаем вашу сессию.",
      errorTitle: "Вход через Telegram не завершен",
      genericError: "Во время входа через Telegram произошла ошибка.",
      retry: "Вернуться к авторизации",
    },
    onboarding: {
      progressStep: "Шаг {step} из {total}",
      stepBadge: "Шаг {step}",
      back: "Назад",
      skip: "Пропустить",
      continue: "Продолжить →",
      finish: "Завершить 🎉",
      preview: "Предпросмотр",
      link: "Ссылка",
      steps: [
        { id: 1, title: "Откуда вы о нас узнали?", desc: "Где вы впервые узнали о BioSahifa?" },
        { id: 2, title: "Где вы разместите ссылку?", desc: "Можно выбрать одну или несколько платформ." },
        { id: 3, title: "Выберите шаблон", desc: "Выберите подходящий дизайн. Позже его можно изменить." },
        { id: 4, title: "Введите основную информацию", desc: "Эти данные формируют основной вид вашей страницы." },
        { id: 5, title: "Ссылки на соцсети", desc: "Добавьте нужные ссылки. Ненужные поля можно оставить пустыми." },
        { id: 6, title: "Дополнительная информация", desc: "Укажите график работы, адрес и контактные данные." },
      ],
      step1Options: ["Instagram", "Telegram", "Facebook", "YouTube", "Поиск Google", "По рекомендации друзей", "Другое"],
      step2Options: ["Instagram bio", "Профиль Telegram", "TikTok bio", "Описание YouTube", "Страница Facebook", "WhatsApp", "LinkedIn", "Личная визитка", "Бизнес-профиль", "Другое"],
      uploadTitle: "Логотип / Изображение",
      uploadClick: "Нажмите, чтобы загрузить изображение",
      uploadHint: "PNG, JPG, SVG — максимум 2MB",
      remove: "Удалить",
      titleLabel: "Заголовок",
      titlePlaceholder: "Например: Aziza Karimova или MegaZon UZ",
      descriptionLabel: "Описание",
      optional: "необязательно",
      descriptionPlaceholder: "Коротко о себе...",
      socialPlaceholders: {
        Instagram: "instagram.com/ваше-имя",
        Telegram: "t.me/ваше-имя",
        Facebook: "facebook.com/ваше-имя",
        YouTube: "youtube.com/@ваше-имя",
        TikTok: "tiktok.com/@ваше-имя",
        LinkedIn: "linkedin.com/in/ваше-имя",
        Website: "ваш-сайт.uz",
      },
      contactButton: "Связаться",
      workHours: "График работы",
      phone: "Телефон",
      googleMaps: "Google Maps",
      mapsPlaceholder: "Ссылка Google Maps",
      successTitle: "Поздравляем!",
      successDescription: "Ваша страница готова. Теперь вы можете редактировать и управлять ей в панели управления.",
      dashboard: "Перейти в дашборд",
      loadingProfile: "Загружаем сохраненный профиль...",
      saving: "Сохраняем...",
      saveError: "Не удалось сохранить профиль. Попробуйте еще раз.",
    },
    dashboardPage: {
      title: "Дашборд",
      description:
        "Здесь вы видите состояние страницы, можете вернуться к onboarding и подготовить профиль к привязке к аккаунту.",
      loading: "Загружаем дашборд...",
      loadError: "Не удалось загрузить данные дашборда.",
      errorTitle: "Дашборд недоступен",
      retry: "Повторить",
      emptyTitle: "Профиль пока не найден",
      emptyDescription:
        "Сначала завершите onboarding, и затем здесь появится ваш сохраненный профиль.",
      startAction: "Начать onboarding",
      editAction: "Редактировать onboarding",
      claimAction: "Привязать шаблон и аккаунт",
      summaryTitle: "Краткая сводка",
      profileTitle: "Данные профиля",
      platforms: "Платформы",
      phones: "Телефоны",
      socials: "Соцсети",
      websites: "Сайты",
      name: "Название",
      template: "Шаблон",
      workingHours: "Часы работы",
      mapLabel: "Карта",
      notProvided: "Не указано",
      connected: "Подключено",
      guestNotice:
        "Сейчас вы используете гостевую сессию. Позже можно будет войти через Telegram или Google и привязать этот профиль.",
      claimTitle: "Привяжите профиль",
      claimDescription:
        "Войдите через Telegram или Google, чтобы позже прикрепить текущий гостевой профиль к реальному аккаунту.",
      claimBadge: "Ссылка готова к привязке",
    },
  },
};

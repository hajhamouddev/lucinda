/**
 * LUCINDA - Central Storefront Configuration
 *
 * All customer-facing copy, branding, navigation, currency settings,
 * contact details, and feature highlights are centralized here.
 * Modify this file to adjust the entire storefront without editing components.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroStat {
  value: string;
  label: string;
  highlight?: boolean;
}

export interface SiteConfig {
  name: string;
  brandName: string;
  brandInitial: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  dir: "rtl" | "ltr";
  currency: {
    code: string;
    symbol: string;
    position: "before" | "after";
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    workHours: string;
  };
  social: {
    instagram: string;
    snapchat?: string;
    tiktok?: string;
    twitter?: string;
  };
  nav: NavLink[];
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2Prefix: string;
    titleHighlight: string;
    subtitle: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta: {
      label: string;
      href: string;
    };
    stats: HeroStat[];
  };
  catalog: {
    badge: string;
    title: string;
    subtitle: string;
    quickViewPrompt: string;
    sizeSelectButton: string;
  };
  features: {
    freeShippingNotice: string;
    paymentMethodBadge: string;
    returnPolicyNotice: string;
    inStockPill: string;
  };
  footer: {
    brandNote: string;
    copyright: string;
    author: string;
    badges: string[];
  };
}

export const siteConfig: SiteConfig = {
  name: "LUCINDA",
  brandName: "LUCINDA",
  brandInitial: "L",
  tagline: "Haute Couture & Abaya Atelier",
  description:
    "دار لوسيندا للأزياء والعبايات الراقية — تصاميم معاصرة تجمع بين السواد الملكي الخالص، والقصّات المنسدلة بدقة، مع أقمشة كريب يابانية وحرير طبيعي فاخر.",
  url: "https://lucinda.store",
  locale: "ar",
  dir: "rtl",

  currency: {
    code: "USD",
    symbol: "$",
    position: "before",
  },

  contact: {
    phone: "+966 50 123 4567",
    whatsapp: "+966501234567",
    email: "concierge@lucinda.store",
    address: "المملكة العربية السعودية — الرياض / دبي",
    workHours: "خدمة العملاء: يومياً من 10:00 ص حتى 10:00 م",
  },

  social: {
    instagram: "https://instagram.com/lucinda.atelier",
    snapchat: "https://snapchat.com/add/lucinda.atelier",
    tiktok: "https://tiktok.com/@lucinda.atelier",
    twitter: "https://x.com/lucinda_atelier",
  },

  nav: [
    { label: "الرئيسية", href: "#hero" },
    { label: "كتالوج العبايات", href: "#catalog" },
    { label: "معايير الأقمشة والقصّات", href: "#specs" },
  ],

  hero: {
    badge: "مجموعة الموسم الحصرية — خياطة راقية وأقمشة أصيلة",
    titleLine1: "وقارٌ يفيض بالأصالة،",
    titleLine2Prefix: "وهندسةٌ تُتقن ",
    titleHighlight: "أدق التفاصيل",
    subtitle:
      "نبتكر عبايات معاصرة تجمع بين السواد الملكي الخالص، والقصّات المنسدلة بدقة، لتمنح إطلالتكِ هيبةً هادئة وفخامةً لا تخطئها العين، مع دعم كامل للقياسات المتنوعة وخيارات الألوان الراقية.",
    primaryCta: {
      label: "استعراض المجموعة المختارة",
      href: "#catalog",
    },
    secondaryCta: {
      label: "دليل الأقمشة والقصّات",
      href: "#specs",
    },
    stats: [
      { value: "100%", label: "كريب ياباني وحرير معتمد", highlight: false },
      { value: "50 - 60", label: "مقاسات شاملة بدقة الإنش", highlight: false },
      { value: "دفع عند الاستلام", label: "معاينة القطعة قبل السداد", highlight: true },
    ],
  },

  catalog: {
    badge: "التشكيلة المعاصرة",
    title: "كتالوج العبايات والتصاميم الحصرية",
    subtitle: "استعرض كافة التصاميم المتاحة واختر المقاس واللون الملائم لإطلالتك.",
    quickViewPrompt: "انقر لمعاينة المقاسات والألوان",
    sizeSelectButton: "تحديد المقاس",
  },

  features: {
    freeShippingNotice: "شحن سريع مجاني وضمان استرجاع لمدة 30 يوماً.",
    paymentMethodBadge: "الدفع عند الاستلام (COD)",
    returnPolicyNotice: "ضمان الاستبدال وتطابق المقاسات 100%",
    inStockPill: "متوفر للشحن الفوري",
  },

  footer: {
    brandNote: "دار لوسيندا للأزياء — منصة تصميم وتجارة العبايات الفاخرة.",
    copyright: "Copyright (c) 2026 hajhamouddev. All rights reserved.",
    author: "hajhamouddev",
    badges: ["Next.js 16 (Turbopack)", "CSS Logical Properties", "WCAG AA Certified"],
  },
};

export interface ProductColor {
  name: string;
  hex: string;
  inStock?: boolean;
}

export type CategoryKey = "all" | "classic" | "occasions" | "formal" | "daily";

export interface CategoryInfo {
  key: CategoryKey;
  label: string;
  description: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: "classic" | "occasions" | "formal" | "daily";
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  description: string;
  fabric: string;
  cut: string;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  badge?: string;
  details: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  { key: "all", label: "جميع التصاميم", description: "المجموعة الكاملة لعتاد الأناقة والوقار" },
  { key: "classic", label: "عبايات كلاسيك", description: "السواد الملكي الخالص والقصات الأصيلة" },
  { key: "occasions", label: "مناسبات فاخرة", description: "تطريزات متقنة ولمسات حريرية للأمسيات" },
  { key: "formal", label: "إطلالات رسمية", description: "قصّات بليزر ومظهر واثق لبيئات العمل" },
  { key: "daily", label: "تصاميم يومية", description: "أقمشة انسيابية باردة لراحة طوال اليوم" },
];

export const PRODUCTS: Product[] = [
  {
    id: "abaya-royal-classic",
    title: "عباية السواد الملكي الكلاسيكية",
    subtitle: "قصّة كلوش منسدلة من قماش الكريب الياباني الفاخر",
    category: "classic",
    categoryLabel: "عبايات كلاسيك",
    price: 320,
    originalPrice: 390,
    description: "تجسيد للفخامة الهادئة؛ صُممت من قماش كريب إنترنت ياباني معتم بنسبة 100%، يمنحك انسيابية مريحة وملمساً ناعماً لا يتجعد مع الحركة اليومية.",
    fabric: "كريب ياباني ملكي معتم فاخر",
    cut: "قصّة كلوش كاملة A-Line انسيابية",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
    ],
    sizes: ["50", "52", "54", "56", "58", "60"],
    colors: [
      { name: "أسود داكن خالص", hex: "#0c0d10", inStock: true },
      { name: "كحلي ليلي غامق", hex: "#151b29", inStock: true },
      { name: "رمادي فحمي", hex: "#262b35", inStock: true },
    ],
    inStock: true,
    rating: 4.95,
    reviewsCount: 142,
    badge: "الأكثر طلباً",
    details: [
      "قماش كريب ياباني لا يشف ولا يتطلب كي مستمر",
      "أكمام مزمومة بخياطة داخلية مدعمة",
      "طرحة متناسقة مجانية بطرف من نفس خامة العباية",
      "جيوب مخفية انسيابية على الجانبين",
    ],
  },
  {
    id: "abaya-astral-crystal",
    title: "عباية المدار الفلكي للمناسبات",
    subtitle: "تطريز يدوي متقن بخيوط الحرير الأسود وشك بلوري ناعم",
    category: "occasions",
    categoryLabel: "مناسبات فاخرة",
    price: 480,
    originalPrice: 560,
    description: "قطعة صُنعت للأمسيات والمناسبات الكبرى؛ تجمع بين خفة حرير الكريب وشك يدوي راقٍ يوزع البريق بهندسة متزنة غير مبتذلة على الأكمام وحاشية العباية.",
    fabric: "حرير صالونا الكوري مع كريب مغسول",
    cut: "قصّة نصف كلوش ملكية مع فتحة أمامية متراكبة",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
    ],
    sizes: ["52", "54", "56", "58"],
    colors: [
      { name: "أسود فاحم بشك دخاني", hex: "#111215", inStock: true },
      { name: "عنابي باذنجاني ملكي", hex: "#2b1420", inStock: true },
      { name: "زمردي داكن وقور", hex: "#12251d", inStock: false },
    ],
    inStock: true,
    rating: 4.98,
    reviewsCount: 89,
    badge: "إصدار حصري",
    details: [
      "شك بلوري متقن ومثبت يدوياً بخيوط حريرية مضاعفة",
      "أزرار طقطق يابانية مخفية بالكامل",
      "طرحة ليزر بملمس ناعم وشك مطابق لأطراف العباية",
      "تغليف فاخر في صندوق هدايا مخصص",
    ],
  },
  {
    id: "abaya-executive-blazer",
    title: "عباية البليزر المعمارية الرسمية",
    subtitle: "ياقة كلاسيكية محددة بقصّة مستقيمة مخصصة لسيدات الأعمال",
    category: "formal",
    categoryLabel: "إطلالات رسمية",
    price: 360,
    description: "صممت لتمنحك حضوراً رسمياً واثقاً في الاجتماعات وبيئات العمل القيادية؛ مستوحاة من هندسة البليزر مع الحفاظ التام على احتشام ووقار العباية العربية.",
    fabric: "تويد صيفي خفيف مدمج مع قطن معالج",
    cut: "قصّة مستقيمة هندسية (Tailored Structured Cut)",
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    ],
    sizes: ["50", "52", "54", "56", "58"],
    colors: [
      { name: "كحلي مؤسسي غامق", hex: "#17202e", inStock: true },
      { name: "أسود مهيب", hex: "#0e1014", inStock: true },
      { name: "رمادي حجري دافئ", hex: "#43464d", inStock: true },
    ],
    inStock: true,
    rating: 4.88,
    reviewsCount: 64,
    badge: "إطلالة قيادية",
    details: [
      "ياقة كلاسيكية رسمية مبطنة بقماش قطني بارد",
      "أزرار قرنية غير لامعة متباعدة بأبعاد متناسقة",
      "جيوب وظيفية داخلية تتسع للهاتف والبطاقات الشخصية",
      "مقاومة للتجعد لتدوم طوال ساعات الدوام الطويلة",
    ],
  },
  {
    id: "abaya-pure-linen-daily",
    title: "عباية الكتان الطبيعي المريح",
    subtitle: "كتان إيرلندي نقي معالج ببرودة فائقة للأيام المشمسة",
    category: "daily",
    categoryLabel: "تصاميم يومية",
    price: 240,
    originalPrice: 290,
    description: "الخيار الأمثل ليومياتك الصيفية والتنقل الدائم؛ خفيفة، تسمح بمرور الهواء بنسبة 100%، وتتميز بطيات طبيعية تمنح الإطلالة عفوية راقية وبساطة متناهية.",
    fabric: "كتان طبيعي نقي 100% مغسول إنزيمياً",
    cut: "قصّة واسعة مريحة (Relaxed Oversized Fit)",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    ],
    sizes: ["52", "54", "56", "58", "60"],
    colors: [
      { name: "بيج رملي طبيعي", hex: "#c7b59d", inStock: true },
      { name: "زيتي ترابي هادئ", hex: "#3f4638", inStock: true },
      { name: "أسود طبيعي مغسول", hex: "#1c1e22", inStock: true },
    ],
    inStock: true,
    rating: 4.92,
    reviewsCount: 118,
    badge: "مريحة يومياً",
    details: [
      "نسيج كتان نقي مسامي مضاد للحرارة والتعرق",
      "أكمام واسعة قابلة للثني مع حزام داخلي اختياري",
      "غسيل سهل وسريع الجفاف في الهواء الطلق",
      "تصميم عملي مفتوح من الأمام مع طقطق تثبيت علوي",
    ],
  },
  {
    id: "abaya-velvet-silhouette",
    title: "عباية المخمل والحرير النبيل",
    subtitle: "دمج هندسي بين المخمل الكوري الناعم وكريب الحرير الإيطالي",
    category: "occasions",
    categoryLabel: "مناسبات فاخرة",
    price: 520,
    originalPrice: 620,
    description: "إبداع بصري يوازن بين ثقل المخمل الداكن وانسكاب الحرير؛ تدرجات ألوان عميقة تعكس الإضاءة في المناسبات بفخامة لا تُنسى وهيبة واضحة.",
    fabric: "مخمل ديباج ناعم مع حرير كريب إيطالي",
    cut: "قصّة كلوش مضاعف مع شال مخملي متصل",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
    ],
    sizes: ["52", "54", "56", "58"],
    colors: [
      { name: "أسود مخملي كثيف", hex: "#08090b", inStock: true },
      { name: "خمري داكن (Burgundy)", hex: "#35101b", inStock: true },
      { name: "كحلي بترولي عميق", hex: "#0f2330", inStock: true },
    ],
    inStock: true,
    rating: 4.96,
    reviewsCount: 52,
    badge: "مجموعة الشتاء",
    details: [
      "ياقة وأساور من المخمل الكوري الفاخر المانع للتكتل",
      "تبطين داخلي كامل بحرير الساتان لمنع الاحتكاك",
      "شال متناسق مرفق بحواف مخملية مشغولة",
      "إغلاق أمامي مغناطيسي خفي وفائق السلاسة",
    ],
  },
  {
    id: "abaya-minimalist-crepe",
    title: "عباية الكريب الانسيابي المعاصر",
    subtitle: "قصّة نقية بدون زوائد تلائم المشاوير الصباحية والعمل",
    category: "daily",
    categoryLabel: "تصاميم يومية",
    price: 260,
    description: "الجمال يكمن في الاختزال؛ عباية صُممت لمن تقدر الخطوط البسيطة والقصّات الخالية من الحشو، توفر توازناً مثالياً بين الخفة والوقار وسهولة الارتداء.",
    fabric: "كريب ندى الفاخر (خفيف الوزن وبارد)",
    cut: "قصّة مستقيمة A-Line بفتحات جانبية صغيرة",
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
    ],
    sizes: ["50", "52", "54", "56", "58", "60"],
    colors: [
      { name: "رمادي دخاني فاتح", hex: "#4a505b", inStock: true },
      { name: "أسود كربوني مطفأ", hex: "#16181c", inStock: true },
      { name: "زيتي طحلبي معتم", hex: "#2b332c", inStock: true },
    ],
    inStock: true,
    rating: 4.87,
    reviewsCount: 76,
    badge: "جديد",
    details: [
      "قماش كريب ندى غير مجعد وسريع الجفاف",
      "أكمام فرنسية بقصّة مربعة مريحة للمعصم",
      "طرحة ناعمة مطابقة للمقاس واللون",
      "درزات مزدوجة مخفية تضمن متانة فائقة",
    ],
  },
  {
    id: "abaya-slate-executive",
    title: "عباية السوار الرمادي المتقن",
    subtitle: "تطعيم هندسي رمادي دقيق مع ياقة رسمية مقلوبة",
    category: "formal",
    categoryLabel: "إطلالات رسمية",
    price: 380,
    originalPrice: 440,
    description: "مظهر يفيض بالرزانة والاحترافية؛ يتناغم السواد الفاخر مع حواف رمادية صامتة بقصّة متقنة تمنحك إطلالة راقية في المؤتمرات والاجتماعات الرفيعة.",
    fabric: "كريب فرنسي مزدوج النسيج عالي الكثافة",
    cut: "قصّة رسمية منضبطة مع أكمام محددة",
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    ],
    sizes: ["52", "54", "56", "58"],
    colors: [
      { name: "أسود مع إطار رمادي", hex: "#121418", inStock: true },
      { name: "كحلي مع إطار فضي مطفأ", hex: "#18212e", inStock: true },
    ],
    inStock: true,
    rating: 4.91,
    reviewsCount: 43,
    badge: "رسمي حصري",
    details: [
      "حواف رمادية ناعمة مقصوصة بالليزر دون أطراف بارزة",
      "طقطق ياباني خفي على طول العباية",
      "نسيج مقاوم للروائح والحرارة لبيئات العمل الداخلية",
      "طرحة متناسقة بخط رمادي مطابق للأكمام",
    ],
  },
  {
    id: "abaya-timeless-heritage",
    title: "عباية التراث الخالد بنقش السدو",
    subtitle: "لمسات سدو هندسية مدمجة بأناقة معاصرة على قماش كريب فاخر",
    category: "classic",
    categoryLabel: "عبايات كلاسيك",
    price: 340,
    description: "تحية للأصالة والتراث الأصيل بصياغة حديثة تلائم الذوق الرفيع؛ تفاصيل نسيجية مستوحاة من السدو مطرزة بخيوط داكنة متناغمة مع السواد الملكي.",
    fabric: "كريب ملكي ثقيل مع نسيج سدو حريري",
    cut: "قصّة كلوش معتدلة تجمع بين الفخامة والعملية",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
    ],
    sizes: ["50", "52", "54", "56", "58", "60"],
    colors: [
      { name: "أسود بسدو كحلي داكن", hex: "#0f1115", inStock: true },
      { name: "أسود بسدو برونزي معتم", hex: "#1c1917", inStock: true },
    ],
    inStock: true,
    rating: 4.94,
    reviewsCount: 95,
    badge: "أصالة وتراث",
    details: [
      "تطريز سدو هندسي دقيق لا يبهت مع الغسيل المتكرر",
      "قماش كريب ثقيل يمنح العباية ثباتاً وهيبة في الارتداء",
      "أكمام متسعة قليلاً بتطريز محيطي كامل",
      "طرحة مجانية بطرف سدو مطابق",
    ],
  },
];

"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function StorefrontPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isClient, setIsClient] = useState<boolean>(false);
  const { openCart, addItem, totalCount } = useCart();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const products = [
    {
      id: "prod-1",
      title: "سماعات الاستوديو المرجعية",
      subtitle: "صوتيات عازلة ونقية لبيئات العمل المكثف",
      category: "صوتيات احترافية",
      price: 280,
      priceDisplay: "$280",
      description: "صُممت لعزل الضوضاء المحيطة وتوفير دقة صوتية مطلقة دون إرهاق السمع طوال ساعات التركيز الطويلة.",
      tag: "الأكثر طلباً",
    },
    {
      id: "prod-2",
      title: "محطة العمل الميكانيكية المدمجة",
      subtitle: "مفاتيح مخصصة مع شاسيه ألمنيوم مصقول",
      category: "أدوات الإنتاجية",
      price: 340,
      priceDisplay: "$340",
      description: "استجابة لمسية متزنة وهيكل صامت يقلل التشتت الذهني ويمنح الأصابع راحة تامة أثناء الكتابة المستمرة.",
      tag: "إصدار هندسي",
    },
    {
      id: "prod-3",
      title: "وحدة الإضاءة البصرية الموزونة",
      subtitle: "طيف ضوئي طبيعي يطابق حرارة النهار",
      category: "بيئة العمل",
      price: 195,
      priceDisplay: "$195",
      description: "توزيع هندسي للضوء يمنع انعكاس الشاشات ويحمي العينين من الصداع والوهج أثناء فترات العمل المتأخرة.",
      tag: "راحة بصرية",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-canvas-base)] text-[var(--color-text-primary)] transition-colors duration-250">
      {/* 1. HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-canvas-base)]/85 border-b border-[var(--color-border-subtle)] transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-accent-base)] text-[var(--color-accent-contrast)] flex items-center justify-center font-bold text-lg shadow-[var(--shadow-sm)]">
              B
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight block">Baby.eng</span>
              <span className="text-xs text-[var(--color-text-muted)] font-mono -mt-1 block">Storefront Platform</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-text-secondary)]">
            <a href="#hero" className="hover:text-[var(--color-accent-base)] transition-colors">
              الرئيسية
            </a>
            <a href="#products" className="hover:text-[var(--color-accent-base)] transition-colors">
              المنتجات المختارة
            </a>
            <a href="#specs" className="hover:text-[var(--color-accent-base)] transition-colors">
              المعايير الهندسية
            </a>
          </nav>

          {/* Controls: Theme & Cart */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="btn btn-secondary !px-3 !py-2"
              aria-label="تبديل مظهر المتجر بين الفاتح والداكن"
              title="تبديل السمة"
            >
              {theme === "light" ? "🌙 الداكن" : "☀️ الفاتح"}
            </button>

            <button
              onClick={openCart}
              className="btn btn-primary relative !px-4"
              aria-label={`سلة المشتريات، تحتوي على ${totalCount} عناصر`}
            >
              <span>السلة</span>
              <span className="bg-[var(--color-surface-raised)] text-[var(--color-accent-base)] text-xs font-bold px-2 py-0.5 rounded-[var(--radius-full)] shadow-sm">
                {totalCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION (60-30-10 OPTICAL BALANCE) */}
      <section id="hero" className="relative py-24 md:py-32 px-6 overflow-hidden border-b border-[var(--color-border-subtle)]">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[var(--radius-full)] bg-[var(--color-accent-subtle)] text-[var(--color-accent-base)] text-xs font-bold mb-6 border border-[var(--color-accent-base)]/20">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-base)] animate-pulse"></span>
            معمارية الجيل الجديد للمتاجر الإلكترونية
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-[var(--color-text-primary)] mb-6">
            أدوات متقنة صُممت <br className="hidden md:inline" />
            لتمنحك <span className="text-[var(--color-accent-base)]">صفاء الذهن</span> والسيطرة.
          </h1>

          {/* Subtitle with Existential Calm */}
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mb-10">
            نرفض الضوضاء والتصاميم المبتذلة. نبتكر عتاداً مدروساً بعناية فائقة، يخدم كفاءتك اليومية، ويحترم وقتك وانتباهك دون تشتيت.
          </p>

          {/* Hero CTAs */}
          <div className="flex items-center justify-center flex-wrap gap-4 w-full">
            <a href="#products" className="btn btn-primary !text-base !px-8 !py-3 shadow-[var(--shadow-md)]">
              استكشف المجموعة المختارة
            </a>
            <a href="#specs" className="btn btn-outline !text-base !px-6 !py-3">
              المعايير التقنية
            </a>
          </div>

          {/* Metrics / Trust Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-16 pt-10 border-t border-[var(--color-border-subtle)] w-full max-w-2xl text-center">
            <div>
              <div className="font-extrabold text-2xl text-[var(--color-text-primary)]">100%</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">تطابق معايير WCAG AA</div>
            </div>
            <div>
              <div className="font-extrabold text-2xl text-[var(--color-text-primary)]">0.4s</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">زمن استجابة Core Web Vitals</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="font-extrabold text-2xl text-[var(--color-accent-base)]">RTL أصيل</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">خصائص منطقية بدون تكرار</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS GRID */}
      <section id="products" className="py-24 px-6 max-w-7xl mx-auto w-full flex-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-base)] mb-2">
              العتاد الأساسي
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              المنتجات الهندسية المميزة
            </h2>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] max-w-md">
            تمت هندسة كل عنصر ليعمل بانسجام في مساحتك الخاصة، مع ضمان استمرارية الجودة والأداء.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((item) => (
            <article key={item.id} className="card card-interactive flex flex-col justify-between">
              <div>
                {/* Header & Category Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">
                    {item.category}
                  </span>
                  <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-[var(--radius-sm)] bg-[var(--color-accent-subtle)] text-[var(--color-accent-base)]">
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="card-title text-xl font-bold mb-1">
                  {item.title}
                </h3>
                <div className="card-subtitle text-xs mb-4">
                  {item.subtitle}
                </div>

                {/* Description */}
                <p className="card-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Footer with Price and Action Button */}
              <div className="card-footer mt-8 pt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[var(--color-text-muted)] block">السعر الصافي</span>
                  <span className="text-2xl font-extrabold text-[var(--color-text-primary)]">
                    {item.priceDisplay}
                  </span>
                </div>

                <button
                  onClick={() =>
                    addItem({
                      id: item.id,
                      title: item.title,
                      subtitle: item.subtitle,
                      price: item.price,
                      priceDisplay: item.priceDisplay,
                      category: item.category,
                    })
                  }
                  className="btn btn-primary"
                  aria-label={`إضافة ${item.title} إلى سلة التسوق`}
                >
                  إضافة للسلة
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer id="specs" className="border-t border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)] py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--color-text-primary)]">Baby.eng</span>
            <span>— قسم الهندسة والمنتجات الرقمية.</span>
          </div>

          <div className="text-center md:text-start">
            Copyright (c) 2026 Haj Hamoud. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span>Next.js 16 (App Router)</span>
            <span>•</span>
            <span>CSS Logical Properties</span>
            <span>•</span>
            <span>WCAG AA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

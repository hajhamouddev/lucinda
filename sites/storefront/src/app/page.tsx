"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, CATEGORIES, CategoryKey, Product } from "@/data/products";
import { ProductDetailModal } from "@/components/product/ProductDetailModal";
import { siteConfig } from "@/config/site";

export default function StorefrontPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { openCart, totalCount } = useCart();

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const currentCategoryInfo = CATEGORIES.find((c) => c.key === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-canvas-base)] text-[var(--color-text-primary)] transition-colors duration-250">
      {/* 1. HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--color-canvas-base)]/85 border-b border-[var(--color-border-subtle)] transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-accent-base)] text-[var(--color-accent-contrast)] flex items-center justify-center font-bold text-lg shadow-[var(--shadow-sm)] font-mono">
              {siteConfig.brandInitial}
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight block">
                {siteConfig.name}
              </span>
              <span className="text-xs text-[var(--color-text-muted)] font-mono -mt-1 block">
                {siteConfig.tagline}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-text-secondary)]">
            {siteConfig.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[var(--color-accent-base)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Controls: Theme & Cart */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="btn btn-secondary !px-3 !py-2 text-xs"
              aria-label="تبديل مظهر المتجر بين الفاتح والداكن"
              title="تبديل السمة"
            >
              {theme === "light" ? "🌙 الداكن" : "☀️ الفاتح"}
            </button>

            <button
              onClick={openCart}
              className="btn btn-primary relative !px-4"
              aria-label={`حقيبة التسوق، تحتوي على ${totalCount} عناصر`}
            >
              <span>حقيبة التسوق</span>
              <span className="bg-[var(--color-surface-raised)] text-[var(--color-accent-base)] text-xs font-bold px-2 py-0.5 rounded-[var(--radius-full)] shadow-sm font-mono">
                {totalCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section
        id="hero"
        className="relative py-20 md:py-28 px-6 overflow-hidden border-b border-[var(--color-border-subtle)]"
      >
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[var(--radius-full)] bg-[var(--color-accent-subtle)] text-[var(--color-accent-base)] text-xs font-bold mb-6 border border-[var(--color-accent-base)]/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-base)] animate-pulse" />
            <span>{siteConfig.hero.badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.2] text-[var(--color-text-primary)] mb-6">
            {siteConfig.hero.titleLine1} <br className="hidden md:inline" />
            {siteConfig.hero.titleLine2Prefix}
            <span className="text-[var(--color-accent-base)]">
              {siteConfig.hero.titleHighlight}
            </span>
            .
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mb-10">
            {siteConfig.hero.subtitle}
          </p>

          {/* Hero CTAs */}
          <div className="flex items-center justify-center flex-wrap gap-4 w-full">
            <a
              href={siteConfig.hero.primaryCta.href}
              className="btn btn-primary !text-base !px-8 !py-3 shadow-[var(--shadow-md)]"
            >
              {siteConfig.hero.primaryCta.label}
            </a>
            <a
              href={siteConfig.hero.secondaryCta.href}
              className="btn btn-outline !text-base !px-6 !py-3"
            >
              {siteConfig.hero.secondaryCta.label}
            </a>
          </div>

          {/* Value Props Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-16 pt-10 border-t border-[var(--color-border-subtle)] w-full max-w-2xl text-center">
            {siteConfig.hero.stats.map((stat, i) => (
              <div
                key={i}
                className={i === 2 ? "col-span-2 sm:col-span-1" : undefined}
              >
                <div
                  className={`font-extrabold text-2xl font-mono ${
                    stat.highlight
                      ? "text-[var(--color-accent-base)]"
                      : "text-[var(--color-text-primary)]"
                  }`}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--color-text-muted)] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC PRODUCTS CATALOG & CATEGORY TABS */}
      <section
        id="catalog"
        className="py-20 px-6 max-w-7xl mx-auto w-full flex-1"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-base)] mb-2">
              {siteConfig.catalog.badge}
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              {siteConfig.catalog.title}
            </h2>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] max-w-md m-0">
            {currentCategoryInfo?.description || siteConfig.catalog.subtitle}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            const count =
              cat.key === "all"
                ? PRODUCTS.length
                : PRODUCTS.filter((p) => p.category === cat.key).length;

            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-[var(--radius-full)] text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? "bg-[var(--color-accent-base)] text-[var(--color-accent-contrast)] shadow-[var(--shadow-sm)] scale-102"
                    : "bg-[var(--color-surface-raised)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-default)]"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-[var(--radius-full)] font-mono text-xs font-bold ${
                    isActive
                      ? "bg-black/20 text-white"
                      : "bg-[var(--color-canvas-subtle)] text-[var(--color-text-muted)]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const discountPercent = product.originalPrice
              ? Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )
              : null;

            return (
              <article
                key={product.id}
                className="card card-interactive flex flex-col justify-between overflow-hidden group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div>
                  {/* Image Aspect Box */}
                  <div className="relative aspect-[3/4] w-full rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-canvas-subtle)] mb-4 border border-[var(--color-border-subtle)]">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                      {product.badge && (
                        <span className="px-2.5 py-0.5 rounded-[var(--radius-full)] bg-[var(--color-accent-base)] text-[var(--color-accent-contrast)] text-[11px] font-bold shadow-md">
                          {product.badge}
                        </span>
                      )}
                      {discountPercent && (
                        <span className="px-2.5 py-0.5 rounded-[var(--radius-full)] bg-[var(--color-danger-base)] text-white text-[11px] font-bold shadow-md">
                          وفر {discountPercent}%
                        </span>
                      )}
                    </div>

                    {/* Hover Quick Action Pill */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-full py-2 px-3 rounded-[var(--radius-md)] bg-[var(--color-surface-raised)]/95 backdrop-blur-md text-xs font-bold text-center text-[var(--color-text-primary)] shadow-lg border border-[var(--color-border-subtle)]">
                        {siteConfig.catalog.quickViewPrompt}
                      </div>
                    </div>
                  </div>

                  {/* Header & Category + Rating */}
                  <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                    <span className="text-[var(--color-text-muted)] font-medium">
                      {product.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1 text-[var(--color-accent-base)] font-mono font-bold">
                      <span>★</span>
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3 className="card-title text-base sm:text-lg font-bold mb-1 group-hover:text-[var(--color-accent-base)] transition-colors line-clamp-1">
                    {product.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="card-subtitle text-xs text-[var(--color-text-muted)] line-clamp-2 mb-3">
                    {product.subtitle}
                  </p>

                  {/* Fabric Tag */}
                  <div className="text-[11px] text-[var(--color-text-secondary)] bg-[var(--color-canvas-subtle)] px-2.5 py-1 rounded-[var(--radius-sm)] border border-[var(--color-border-subtle)] inline-block mb-3 truncate max-w-full">
                    {product.fabric}
                  </div>

                  {/* Color Swatches Preview */}
                  <div className="flex items-center gap-1.5 mb-2">
                    {product.colors.map((c) => (
                      <span
                        key={c.name}
                        className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-inner inline-block"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                    <span className="text-[10px] text-[var(--color-text-muted)] mr-1">
                      ({product.sizes.length} مقاسات)
                    </span>
                  </div>
                </div>

                {/* Card Footer: Price & CTA */}
                <div className="card-footer mt-4 pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-extrabold text-[var(--color-text-primary)]">
                        {siteConfig.currency.symbol}
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[var(--color-text-muted)] line-through">
                          {siteConfig.currency.symbol}
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[var(--color-success-base)] font-bold block">
                      {siteConfig.features.paymentMethodBadge}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="btn btn-secondary !text-xs !px-3 !py-2 hover:btn-primary"
                    aria-label={`تحديد مقاس وتفاصيل ${product.title}`}
                  >
                    {siteConfig.catalog.sizeSelectButton}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. MODAL: PRODUCT DETAILS & VARIANT SELECTOR */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* 5. FOOTER */}
      <footer
        id="specs"
        className="border-t border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)] py-12 px-6 mt-auto"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--color-text-primary)]">
              {siteConfig.name}
            </span>
            <span>— {siteConfig.footer.brandNote}</span>
          </div>

          <div className="text-center md:text-start">
            {siteConfig.footer.copyright}
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            {siteConfig.footer.badges.map((badge, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>•</span>}
                <span>{badge}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

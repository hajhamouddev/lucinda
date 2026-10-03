"use client";

import React, { useState, useEffect, useRef } from "react";
import { Product, ProductColor } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

function ProductModalContent({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "54");
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product.colors[0] || null
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showSizeGuide) {
          setShowSizeGuide(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSizeGuide, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const currentImage = product.images[selectedImageIndex] || product.images[0];
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;

    addItem(
      {
        id: product.id,
        productId: product.id,
        title: product.title,
        subtitle: product.subtitle,
        price: product.price,
        priceDisplay: `$${product.price}`,
        category: product.categoryLabel,
        selectedSize,
        selectedColor,
        image: currentImage,
      },
      quantity
    );

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      {/* 1. Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-[rgba(9,13,22,0.75)] backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. Modal Window */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-5xl bg-[var(--color-surface-overlay)] border border-[var(--color-border-default)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] overflow-hidden my-auto max-h-[92vh] flex flex-col transition-all"
      >
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-[var(--radius-full)] bg-[var(--color-canvas-base)]/80 backdrop-blur-md border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-canvas-subtle)] flex items-center justify-center transition-colors shadow-sm"
          aria-label="إغلاق نافذة تفاصيل المنتج"
          title="إغلاق"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* RIGHT COLUMN: Gallery (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Main Photo Preview */}
              <div className="relative aspect-[3/4] w-full rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-md)] group">
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Badges on Image */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {product.badge && (
                    <span className="px-3 py-1 rounded-[var(--radius-full)] bg-[var(--color-accent-base)] text-[var(--color-accent-contrast)] text-xs font-bold shadow-md">
                      {product.badge}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="px-3 py-1 rounded-[var(--radius-full)] bg-[var(--color-danger-base)] text-white text-xs font-bold shadow-md">
                      وفر {discountPercent}%
                    </span>
                  )}
                </div>

                {/* Stock Indicator Pill */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-[var(--radius-full)] bg-[var(--color-canvas-base)]/90 backdrop-blur-md border border-[var(--color-border-subtle)] text-xs font-semibold flex items-center gap-1.5 shadow-sm text-[var(--color-text-primary)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-success-base)] animate-pulse" />
                  <span>متوفر للشحن الفوري</span>
                </div>
              </div>

              {/* Thumbnails Row */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative aspect-[3/4] w-20 rounded-[var(--radius-md)] overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImageIndex === idx
                          ? "border-[var(--color-accent-base)] shadow-sm scale-102"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`عرض الصورة رقم ${idx + 1}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* LEFT COLUMN: Details & Variant Selection (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              {/* Header Info */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-[var(--radius-sm)] bg-[var(--color-canvas-subtle)] text-[var(--color-text-muted)] text-xs font-bold">
                    {product.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[var(--color-accent-base)]">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold font-mono">{product.rating}</span>
                    <span className="text-[var(--color-text-muted)]">({product.reviewsCount} تقييم)</span>
                  </div>
                </div>

                <h2 id="product-modal-title" className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-2">
                  {product.title}
                </h2>

                <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed m-0">
                  {product.subtitle}
                </p>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)]">
                <span className="text-3xl font-black text-[var(--color-text-primary)]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[var(--color-text-muted)] line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-[var(--color-success-base)] font-bold mr-auto">
                  شامل الضريبة والشحن السريع
                </span>
              </div>

              {/* Fabric & Cut Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-[var(--radius-md)] bg-[var(--color-surface-raised)] border border-[var(--color-border-subtle)] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--color-accent-subtle)] text-[var(--color-accent-base)] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold text-[var(--color-text-primary)] block">نوع القماش</span>
                    <span className="text-[var(--color-text-secondary)]">{product.fabric}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-[var(--radius-md)] bg-[var(--color-surface-raised)] border border-[var(--color-border-subtle)] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--color-accent-subtle)] text-[var(--color-accent-base)] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold text-[var(--color-text-primary)] block">نوع القصّة</span>
                    <span className="text-[var(--color-text-secondary)]">{product.cut}</span>
                  </div>
                </div>
              </div>

              {/* 1. COLOR SELECTOR */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[var(--color-text-primary)]">
                    اللون المختار:{" "}
                    <span className="text-[var(--color-accent-base)] font-semibold">
                      {selectedColor?.name || "اختر اللون"}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor?.name === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        disabled={c.inStock === false}
                        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-full)] border transition-all text-xs ${
                          isSelected
                            ? "border-[var(--color-accent-base)] bg-[var(--color-accent-subtle)] font-bold text-[var(--color-accent-base)] shadow-sm"
                            : "border-[var(--color-border-default)] bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]"
                        } ${c.inStock === false ? "opacity-40 cursor-not-allowed" : ""}`}
                        title={c.inStock === false ? `${c.name} (غير متوفر)` : c.name}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20 inline-block shadow-inner flex-shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. SIZE SELECTOR WITH SIZE GUIDE MODAL TRIGGER */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[var(--color-text-primary)]">
                    المقاس المعتمد:{" "}
                    <span className="font-mono text-[var(--color-accent-base)] font-extrabold">
                      {selectedSize}
                    </span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-[var(--color-accent-base)] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>دليل المقاسات السريع</span>
                  </button>
                </div>

                {/* Size Pills Grid */}
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((s) => {
                    const isSelected = selectedSize === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`h-11 rounded-[var(--radius-md)] border font-mono font-bold text-sm transition-all flex items-center justify-center ${
                          isSelected
                            ? "bg-[var(--color-accent-base)] text-[var(--color-accent-contrast)] border-[var(--color-accent-base)] shadow-[var(--shadow-sm)]"
                            : "bg-[var(--color-surface-raised)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:border-[var(--color-accent-base)]"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>

                {/* Size Guide Collapsible Box */}
                {showSizeGuide && (
                  <div className="mt-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] text-xs animate-in fade-in duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-[var(--color-text-primary)]">جدول المقاسات المعيارية بالإنش والسنتيمتر:</span>
                      <button
                        onClick={() => setShowSizeGuide(false)}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-center border-collapse">
                        <thead>
                          <tr className="border-b border-[var(--color-border-subtle)] text-[var(--color-text-muted)]">
                            <th className="py-1 px-2 font-semibold">المقاس</th>
                            <th className="py-1 px-2 font-semibold">طول العباية</th>
                            <th className="py-1 px-2 font-semibold">طول الجسم الملائم</th>
                            <th className="py-1 px-2 font-semibold">عرض الصدر</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border-subtle)] font-mono text-[var(--color-text-secondary)]">
                          <tr><td className="py-1.5 font-bold text-[var(--color-accent-base)]">50</td><td>50 in (127cm)</td><td>150 - 153 cm</td><td>21 in</td></tr>
                          <tr><td className="py-1.5 font-bold text-[var(--color-accent-base)]">52</td><td>52 in (132cm)</td><td>154 - 157 cm</td><td>22 in</td></tr>
                          <tr><td className="py-1.5 font-bold text-[var(--color-accent-base)]">54</td><td>54 in (137cm)</td><td>158 - 162 cm</td><td>23 in</td></tr>
                          <tr><td className="py-1.5 font-bold text-[var(--color-accent-base)]">56</td><td>56 in (142cm)</td><td>163 - 167 cm</td><td>24 in</td></tr>
                          <tr><td className="py-1.5 font-bold text-[var(--color-accent-base)]">58</td><td>58 in (147cm)</td><td>168 - 172 cm</td><td>25 in</td></tr>
                          <tr><td className="py-1.5 font-bold text-[var(--color-accent-base)]">60</td><td>60 in (152cm)</td><td>173+ cm</td><td>26 in</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. QUANTITY & ADD TO CART ACTION BAR */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity Stepper */}
                <div className="inline-flex items-center justify-between border border-[var(--color-border-default)] rounded-[var(--radius-md)] bg-[var(--color-surface-raised)] px-2 h-12 w-full sm:w-36">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded flex items-center justify-center font-bold text-base hover:bg-[var(--color-canvas-subtle)] text-[var(--color-text-secondary)]"
                    aria-label="إنقاص الكمية"
                  >
                    -
                  </button>
                  <span className="font-mono font-extrabold text-sm text-[var(--color-text-primary)]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="w-8 h-8 rounded flex items-center justify-center font-bold text-base hover:bg-[var(--color-canvas-subtle)] text-[var(--color-text-secondary)]"
                    aria-label="زيادة الكمية"
                  >
                    +
                  </button>
                </div>

                {/* Main Add Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn btn-primary flex-1 !h-12 !text-base shadow-[var(--shadow-md)]"
                >
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>
                    إضافة للسلة — ${(product.price * quantity).toLocaleString()}
                  </span>
                </button>
              </div>

              {/* Product Feature Bullets */}
              <div className="pt-4 border-t border-[var(--color-border-subtle)]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
                  مواصفات وتفاصيل الحياكة
                </h4>
                <ul className="space-y-2 m-0 p-0 list-none text-xs text-[var(--color-text-secondary)]">
                  {product.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-base)] flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!isOpen || !product) return null;

  return <ProductModalContent key={product.id} product={product} onClose={onClose} />;
}

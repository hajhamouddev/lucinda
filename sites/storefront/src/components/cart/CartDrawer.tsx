"use client";

import React, { useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, subtotal, totalCount, openCheckout } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  // Lock body scroll when drawer is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* 1. Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-[rgba(9,13,22,0.65)] backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* 2. Slide-in Drawer Container (Docked to Right for RTL) */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className={`fixed top-0 bottom-0 right-0 z-50 w-full max-w-md bg-[var(--color-surface-raised)] border-l border-[var(--color-border-subtle)] shadow-[var(--shadow-xl)] flex flex-col transition-transform duration-300 ease-[var(--ease-standard)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-[var(--color-border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 id="cart-drawer-title" className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] m-0">
              سلة التسوق
            </h2>
            <span className="px-2.5 py-0.5 rounded-[var(--radius-full)] bg-[var(--color-accent-subtle)] text-[var(--color-accent-base)] text-xs font-bold font-mono">
              {totalCount}
            </span>
          </div>

          <button
            onClick={closeCart}
            className="btn btn-secondary !p-2 !rounded-[var(--radius-md)]"
            aria-label="إغلاق سلة التسوق"
            title="إغلاق"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-[var(--radius-full)] bg-[var(--color-canvas-subtle)] text-[var(--color-text-muted)] flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                سلتك فارغة حالياً
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] max-w-xs mb-6">
                لم تقم بإضافة أي منتج بعد. تفضل باستعراض المنتجات المتميزة واختر ما يلائم إنتاجيتك.
              </p>
              <button
                onClick={closeCart}
                className="btn btn-primary !text-sm"
              >
                تصفح المنتجات الآن
              </button>
            </div>
          ) : (
            /* Items List */
            <ul className="space-y-4 m-0 p-0 list-none">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] flex gap-4 items-start"
                >
                  {/* Item Icon Placeholder */}
                  <div className="w-14 h-14 rounded-[var(--radius-md)] bg-[var(--color-surface-raised)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-accent-base)] flex-shrink-0">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-[var(--color-text-primary)] truncate m-0">
                        {item.title}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-danger-base)] transition-colors p-1"
                        aria-label={`إزالة ${item.title} من السلة`}
                        title="إزالة"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="text-xs text-[var(--color-text-muted)] mb-3">
                      {item.category || "منتج منصة"}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="inline-flex items-center border border-[var(--color-border-default)] rounded-[var(--radius-md)] bg-[var(--color-surface-raised)] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2.5 py-1 text-sm font-bold hover:bg-[var(--color-canvas-subtle)] text-[var(--color-text-secondary)] transition-colors"
                          aria-label={`إنقاص كمية ${item.title}`}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-mono font-bold text-[var(--color-text-primary)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2.5 py-1 text-sm font-bold hover:bg-[var(--color-canvas-subtle)] text-[var(--color-text-secondary)] transition-colors"
                          aria-label={`زيادة كمية ${item.title}`}
                        >
                          +
                        </button>
                      </div>

                      {/* Total Item Price */}
                      <span className="font-extrabold text-sm text-[var(--color-text-primary)]">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer (Summary & Actions) */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)] space-y-4">
            <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
              <span>المجموع الفرعي:</span>
              <span className="text-2xl font-black text-[var(--color-text-primary)]">
                ${subtotal.toLocaleString()}
              </span>
            </div>

            <div className="text-xs text-[var(--color-text-muted)] flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[var(--color-success-base)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>شحن سريع مجاني وضمان استرجاع لمدة 30 يوماً.</span>
            </div>

            <div className="space-y-2 pt-2">
              <button
                className="btn btn-primary w-full !py-3 !text-base shadow-[var(--shadow-md)]"
                onClick={openCheckout}
              >
                <span>متابعة لإتمام الطلب</span>
                <span className="mr-1">←</span>
              </button>

              <div className="flex items-center justify-between pt-1 text-xs">
                <button
                  onClick={clearCart}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-danger-base)] transition-colors"
                >
                  إفراغ السلة بالكامل
                </button>
                <button
                  onClick={closeCart}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-semibold transition-colors"
                >
                  متابعة التسوق
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

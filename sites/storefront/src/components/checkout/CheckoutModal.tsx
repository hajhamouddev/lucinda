"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";

interface FormErrors {
  fullName?: string;
  phone?: string;
  city?: string;
  address?: string;
}

export function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, items, subtotal, clearCart } = useCart();

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod] = useState("cod"); // Cash on Delivery

  // State
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCheckoutOpen && !isSubmitting) {
        handleModalClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCheckoutOpen, isSubmitting]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCheckoutOpen]);

  const handleModalClose = () => {
    if (orderConfirmed) {
      clearCart();
      setOrderConfirmed(false);
      setFullName("");
      setPhone("");
      setCity("");
      setAddress("");
      setNotes("");
      setErrors({});
    }
    closeCheckout();
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = "يرجى كتابة الاسم الكامل (3 أحرف على الأقل).";
    }

    const cleanPhone = phone.trim().replace(/[\s-]/g, "");
    if (!cleanPhone || cleanPhone.length < 8) {
      newErrors.phone = "يرجى كتابة رقم هاتف صالح للتواصل والتوصيل.";
    }

    if (!city.trim()) {
      newErrors.city = "يرجى إدخال المدينة.";
    }

    if (!address.trim() || address.trim().length < 5) {
      newErrors.address = "يرجى توضيح العنوان التفصيلي (الشارع، الحي، المبنى).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable transactional processing
    setTimeout(() => {
      const generatedId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      clearCart(); // Clear active cart on confirmed placement
    }, 1100);
  };

  if (!isCheckoutOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      {/* 1. Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-[rgba(9,13,22,0.7)] backdrop-blur-md transition-opacity"
        onClick={() => {
          if (!isSubmitting) handleModalClose();
        }}
        aria-hidden="true"
      />

      {/* 2. Modal Container */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-2xl bg-[var(--color-surface-overlay)] border border-[var(--color-border-default)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] overflow-hidden my-8 text-start transition-transform"
      >
        {/* SUCCESS VIEW */}
        {orderConfirmed ? (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-[var(--radius-full)] bg-[var(--color-success-subtle)] text-[var(--color-success-base)] flex items-center justify-center mb-6 shadow-[var(--shadow-sm)] border border-[var(--color-success-base)]/20">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <span className="inline-block px-3 py-1 rounded-[var(--radius-full)] bg-[var(--color-canvas-subtle)] text-xs font-mono font-bold text-[var(--color-text-muted)] mb-3">
              رقم الطلب: {orderId}
            </span>

            <h2 id="checkout-modal-title" className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-3">
              تم استلام طلبك بنجاح!
            </h2>

            <p className="text-[var(--color-text-secondary)] text-sm sm:text-base max-w-lg leading-relaxed mb-8">
              شكراً لاختيارك <strong className="text-[var(--color-text-primary)]">Baby.eng</strong>. يجري الآن تجهيز عتادك بعناية، وسيتصل بك مندوب التوصيل على الرقم{" "}
              <span className="font-mono font-bold dir-ltr inline-block text-[var(--color-text-primary)]">{phone}</span> لتأكيد موعد التسليم والدفع عند الاستلام.
            </p>

            <div className="w-full max-w-md p-4 rounded-[var(--radius-lg)] bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] text-xs text-[var(--color-text-muted)] text-start mb-8 space-y-2">
              <div className="flex justify-between">
                <span>المستلم:</span>
                <span className="font-bold text-[var(--color-text-primary)]">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span>العنوان:</span>
                <span className="font-bold text-[var(--color-text-primary)]">{city} — {address}</span>
              </div>
              <div className="flex justify-between">
                <span>طريقة الدفع:</span>
                <span className="font-bold text-[var(--color-success-base)]">الدفع عند الاستلام (COD)</span>
              </div>
            </div>

            <button
              onClick={handleModalClose}
              className="btn btn-primary !px-8 !py-3 !text-base shadow-[var(--shadow-md)]"
            >
              العودة إلى المتجر
            </button>
          </div>
        ) : (
          /* CHECKOUT FORM VIEW */
          <div>
            {/* Modal Header */}
            <div className="p-6 border-b border-[var(--color-border-subtle)] flex items-center justify-between">
              <div>
                <h2 id="checkout-modal-title" className="text-xl font-bold text-[var(--color-text-primary)] tracking-tight m-0">
                  إتمام الطلب والتوصيل
                </h2>
                <p className="text-xs text-[var(--color-text-muted)] mt-1 m-0">
                  أدخل بيانات الشحن لاستلام طلبيتك والدفع مباشرة عند المعاينة.
                </p>
              </div>

              <button
                onClick={handleModalClose}
                className="btn btn-secondary !p-2 !rounded-[var(--radius-md)]"
                aria-label="إغلاق نافذة إتمام الطلب"
                title="إغلاق"
                disabled={isSubmitting}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-6">
              {/* Order Summary Strip */}
              <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[var(--color-text-muted)] block">إجمالي المنتجات ({items.length})</span>
                  <span className="text-lg font-bold text-[var(--color-text-primary)]">
                    المجموع النهائي: ${subtotal.toLocaleString()}
                  </span>
                </div>
                <span className="inline-block px-3 py-1 rounded-[var(--radius-sm)] bg-[var(--color-success-subtle)] text-[var(--color-success-base)] text-xs font-semibold">
                  شحن مجاني
                </span>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className={`form-group !mb-0 ${errors.fullName ? "has-error" : ""}`}>
                  <label className="form-label" htmlFor="checkout-fullname">
                    الاسم الكامل <span className="required-indicator">*</span>
                  </label>
                  <input
                    type="text"
                    id="checkout-fullname"
                    className="form-input"
                    placeholder="مثال: طارق المحمود"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }}
                    disabled={isSubmitting}
                  />
                  {errors.fullName && <div className="form-error">{errors.fullName}</div>}
                </div>

                {/* Phone */}
                <div className={`form-group !mb-0 ${errors.phone ? "has-error" : ""}`}>
                  <label className="form-label" htmlFor="checkout-phone">
                    رقم الهاتف المحمول <span className="required-indicator">*</span>
                  </label>
                  <input
                    type="tel"
                    id="checkout-phone"
                    className="form-input"
                    placeholder="مثال: 0501234567"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    disabled={isSubmitting}
                  />
                  {errors.phone && <div className="form-error">{errors.phone}</div>}
                </div>

                {/* City */}
                <div className={`form-group !mb-0 ${errors.city ? "has-error" : ""}`}>
                  <label className="form-label" htmlFor="checkout-city">
                    المدينة <span className="required-indicator">*</span>
                  </label>
                  <input
                    type="text"
                    id="checkout-city"
                    className="form-input"
                    placeholder="مثال: دمشق / الرياض / دبي"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (errors.city) setErrors((prev) => ({ ...prev, city: undefined }));
                    }}
                    disabled={isSubmitting}
                  />
                  {errors.city && <div className="form-error">{errors.city}</div>}
                </div>

                {/* Address */}
                <div className={`form-group !mb-0 ${errors.address ? "has-error" : ""}`}>
                  <label className="form-label" htmlFor="checkout-address">
                    العنوان التفصيلي <span className="required-indicator">*</span>
                  </label>
                  <input
                    type="text"
                    id="checkout-address"
                    className="form-input"
                    placeholder="الشارع، الحي، رقم المبنى"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
                    }}
                    disabled={isSubmitting}
                  />
                  {errors.address && <div className="form-error">{errors.address}</div>}
                </div>
              </div>

              {/* Delivery Notes */}
              <div className="form-group !mb-0">
                <label className="form-label" htmlFor="checkout-notes">
                  ملاحظات التوصيل (اختياري)
                </label>
                <input
                  type="text"
                  id="checkout-notes"
                  className="form-input"
                  placeholder="أي تعليمات خاصة للمندوب عند الوصول"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="form-label mb-2 block">طريقة الدفع المعتمدة</label>
                <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface-raised)] border-2 border-[var(--color-accent-base)] flex items-center justify-between shadow-[var(--shadow-sm)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-accent-subtle)] text-[var(--color-accent-base)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[var(--color-text-primary)]">
                        الدفع عند الاستلام (Cash on Delivery)
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)]">
                        عاين منتجاتك وتأكد من سلامتها أولاً ثم سدد القيمة نقداً.
                      </div>
                    </div>
                  </div>
                  <span className="w-5 h-5 rounded-full border-2 border-[var(--color-accent-base)] flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-base)]"></span>
                  </span>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="btn btn-secondary !px-5"
                  disabled={isSubmitting}
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className={`btn btn-primary !px-8 !py-3 !text-base shadow-[var(--shadow-md)] ${
                    isSubmitting ? "is-loading" : ""
                  }`}
                  data-loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  تأكيد وحجز الطلب (${subtotal.toLocaleString()})
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

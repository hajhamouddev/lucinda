# PROJECT_STATE

## Goal (one sentence)
- Establish an End-to-End Web Platform foundation for building professional, high-performance websites and e-commerce stores from scratch using Next.js (App Router), TypeScript, Tailwind CSS, native RTL logical properties, and strict WCAG AA / Core Web Vitals standards.

## Environment (OS, language, frameworks, how it is run/deployed)
- Host: HP OMEN (`hajhamoud-OMEN`)
- OS: Ubuntu 26.04.1 LTS (Resolute Raccoon), Kernel: 7.0.0-34-generic (x86_64)
- Desktop: GNOME (Wayland)
- CPU: Intel Core i7-10750H (6C/12T @ 2.60GHz), RAM: 16 GB, Storage: NVMe SSD 512GB
- Web Stack: Node v24.21.0 (fnm), Bun 1.4.2, npm 11.19.0, Next.js (App Router), TypeScript, Tailwind CSS
- Workspace: `/home/hajhamoud/Documents/projects/web`

## Current status
- Production storefront branded under "LUCINDA" (Haute Couture & Abaya Atelier). All customer-facing copy, branding, navigation, currency, and contact points are centralized in `src/config/site.ts`. Unified MIT License (2026 hajhamouddev) established. Production build and linter pass with 0 errors and 0 warnings. Project state frozen.

## Done (newest first)
- Centralized all storefront copy, metadata, branding, navigation, currency, and contact channels in `src/config/site.ts` under the "LUCINDA" brand identity.
- Refactored `layout.tsx`, `page.tsx`, and `CheckoutModal.tsx` to consume configuration dynamically from `siteConfig`.
- Established unified MIT License (Copyright 2026 hajhamouddev) at repository root and inside storefront package.
- Updated package identity to `"lucinda"` in `package.json` and synchronized `CART_STORAGE_KEY` to `"lucinda_storefront_cart_v1"`.
- Built dynamic product catalog architecture (`src/data/products.ts`) with strict TypeScript types (`Product`, `ProductColor`, `CategoryKey`) and rich specifications for 8 luxury Abaya designs.
- Engineered `ProductDetailModal` (`src/components/product/ProductDetailModal.tsx`) featuring image gallery and thumbnails, size selector (50-60), color swatches, quick reference size guide table, quantity stepper, and variant add-to-cart.
- Updated `CartContext` and `CartDrawer` with variant isolation (`compositeId`) so different sizes/colors of the same product exist as separate line items, rendering size tags, color swatches, and thumbnail images.
- Implemented responsive category filter tabs in `page.tsx` with instant client-side filtering, item count badges, and product cards with hover preview and quick details action.
- Engineered and wired end-to-end Checkout modal (`src/components/checkout/CheckoutModal.tsx`) with form validation, cash-on-delivery payment method, loading state, escape key trap, body scroll lock, and order confirmation receipt (`#ORD-XXXXXX`).
- Integrated `openCheckout` transition from `CartDrawer` to `CheckoutModal`, mounted globally in `Providers.tsx`.
- Implemented `CartContext` checkout state (`isCheckoutOpen`, `openCheckout`, `closeCheckout`).
- Engineered interactive `CartDrawer` with native RTL slide-in animation, empty state, item quantity management (+/-), item removal, keyboard escape trap, and subtotal calculation.
- Implemented `CartContext` with safe client-side localStorage hydration preventing React SSR mismatches.
- Integrated `CartProvider` via `Providers` wrapper in `layout.tsx` and wired Header cart button and product card action triggers.
- Engineered production storefront shell (`sites/storefront/src/app/page.tsx`) with Header, Hero Section (60-30-10 balance), and 3 responsive product cards using component tokens.
- Configured root `layout.tsx` for native RTL, Arabic typography, and linked shared `tokens.css` / `components.css`.
- Configured Turbopack workspace root in `next.config.ts` (`turbopack.root`) allowing zero-copy resolution of shared parent design tokens.
- Built core primitive component system (`components-starter/components.css`) and interactive testbed (`components-starter/preview.html`) supporting Dark/Light themes, RTL/LTR switching, and 6 interaction states.
- Generated foundational `design-system/tokens.css` with 60-30-10 chromatic architecture, fluid typography clamp scaling, 8px spatial grid, and CSS logical properties.
- Structured platform directory taxonomy (`design-system/`, `components-starter/`, `sites/`).
- Established and populated `PROJECT_STATE.md` with platform goal, architectural decisions, and next steps.

## Decisions (with the reason)
- Configured `turbopack.root` in `next.config.ts` to allow Next.js 16 Turbopack to resolve design tokens and components from parent directories safely without file-system boundary errors.
- Next.js (App Router) + TypeScript + Tailwind CSS as the core stack for zero-waterfall server rendering, type safety, and atomic design consistency.
- CSS Logical Properties (`*-inline`, `*-block`, `text-align: start`) enforced across all tokens and components for seamless zero-overhead bi-directional LTR/RTL support.
- Centralized site configuration pattern in `src/config/site.ts` to ensure 100% modularity and allow non-technical re-branding and content adjustments without code edits.
- 60-30-10 color balance using HSL/Hex tokens with Dark/Light modes to maintain WCAG AA contrast (>4.5:1 text, >3:1 UI elements) without optical fatigue.
- 8px mathematical spatial grid and modular scale for typography and spacing.

## Known problems / what failed (and what we already tried)
- None currently.

## Do NOT do (lessons learned)
- Do NOT use hardcoded physical directions (`margin-left`, `padding-right`, `left`, `right`) to avoid RTL layout breaking and code duplication.
- Do NOT use pure black (`#000000`) on white or pure white on black; use tinted darks (`#090d16`, `#0f172a`) to eliminate glare and retina fatigue.
- Do NOT hardcode store titles, currencies, or hero copy directly in components; always read from `src/config/site.ts`.

## Next step (exactly one)
- Project frozen & ready. Future tasks: customize site.ts content, expand catalog, and deploy to production.

## Useful commands
- Run storefront dev server: `cd sites/storefront && npm run dev`
- Build storefront production bundle: `cd sites/storefront && npm run build`
- Preview components in browser: `google-chrome components-starter/preview.html` or `xdg-open components-starter/preview.html`
- Check node & bun versions: `node -v; bun -v; npm -v`

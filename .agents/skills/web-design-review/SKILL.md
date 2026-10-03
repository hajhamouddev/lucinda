---
name: web-design-review
description: Review, build or change web pages, UI and visual design with attention to small details. Use whenever the user asks to review a page or screen, change a layout or design, fix spacing/alignment/typography/colors, check responsiveness, accessibility, SEO or page speed, redesign something, or says a page "looks off". Use it even for small CSS tweaks, because small details are the point.
---

# Web and design review

Work from the real page, not from assumptions. Read the actual HTML/CSS/JS, or ask for a
screenshot or URL. If you can run the page, do it and look at the result.

## 1. Understand first (state in 3 lines)
- Who uses this page and what is the one main action?
- What exactly is wrong or what should change?
- Constraints: framework, existing design system, browsers, devices.

## 2. Check these areas, in this order
**Layout and spacing**
- Consistent spacing scale (for example 4/8/16/24/32). Flag random values.
- Alignment of edges, baselines and grids. Look for 1-2px drifts.
- Nothing overflows at any width. No horizontal scroll.

**Typography**
- Clear hierarchy (h1 > h2 > body). One h1 per page.
- Readable size and line height, sensible line length (around 45-80 characters for body text).
- Font loading: fallback stack, no layout jump when the font loads.

**Color and contrast**
- Text contrast meets WCAG AA (4.5:1 normal text, 3:1 large text and UI parts). Measure it, do not eyeball it.
- Color is never the only carrier of meaning (errors, links, status).
- Dark mode and hover/focus/active/disabled states exist and look right.

**Responsive**
- Check at least: 360, 768, 1024, 1440 px wide. Check landscape on phones.
- Touch targets are large enough and not crowded.
- Images scale, text does not get cut.

**Accessibility**
- Everything works with the keyboard. Visible focus style. Logical tab order.
- Semantic elements, labels on inputs, alt text on meaningful images, lang attribute set.
- Correct direction for Arabic/RTL pages: `dir`, logical CSS properties (margin-inline, padding-inline), mirrored icons where needed, numbers and mixed text rendering correctly.

**Performance**
- Images: right size, modern format, lazy loading below the fold, width/height set.
- Check the current Core Web Vitals targets (LCP, INP, CLS) with `verify-online`, because thresholds can change.
- Remove unused CSS/JS, avoid render-blocking resources.

**SEO and sharing**
- Unique title and meta description, canonical, heading structure, link text, structured data when relevant, Open Graph tags.

**Forms and states**
- Validation messages, empty states, loading states, error states, success states.

**Cross-browser**
- Features used are supported by the target browsers (verify with `verify-online`, for example on MDN or caniuse).

## 3. Report in this shape
For every finding: **Where** (file + line or element) | **Problem** | **Why it matters** | **Fix (exact code)** | **Severity** (blocker / important / polish).
Sort by severity. Finish with a short list of what is already good, so nothing is changed needlessly.

## 4. Rules for changing code
- Change only what was asked. Preserve the existing design language and naming.
- Smallest possible CSS change. Do not add a library for a small problem.
- Show before/after, and tell the user exactly what to look at to confirm it.
- When two designs are possible, give the one recommended option and one alternative, with the trade-off in one line.

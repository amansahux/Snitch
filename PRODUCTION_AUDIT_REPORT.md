# Snitch MERN Production Audit Report

Date: 2026-05-15
Scope: Full Frontend + Backend source audit after safe cleanup pass.

## 1) Production-level mistakes

- No automated tests in either app (`Backend/package.json` has placeholder test script, frontend has no test script).
- No CI quality gate for lint/build/security checks.
- Monolithic frontend bundle remains large (Vite build output: ~1.22 MB minified JS; gzip ~358 KB).
- Mixed conventions and typo-driven naming drift (`varient` across model/route/API) increase long-term maintenance risk.
- Dashboard analytics page is still hardcoded demo data, not backend-driven.

## 2) Security weaknesses

- Auth cookies are issued with `secure: false` in production paths (`Backend/src/utils/sendTokenResponse.js`, `Backend/src/controllers/auth.controller.js`).
- Cookie flags are incomplete (`sameSite` not explicitly set, no domain policy strategy).
- Logout is state-changing `GET /api/auth/logout` instead of `POST`, increasing CSRF surface.
- No rate limiting/abuse protection on auth and payment endpoints.
- No explicit CORS policy configured in `Backend/src/app.js` despite `cors` dependency.
- Privilege-sensitive order status/payment status endpoints are only `authenticateUser`-guarded in routing (`Backend/src/routes/order.routes.js`) and rely on controller-side assumptions.
- Razorpay public key is hardcoded in frontend checkout flow (`Frontend/src/features/cart/pages/CartPage.jsx`).

## 3) Scalability issues

- Limited MongoDB indexing strategy: only one explicit index in `varient.model.js`; high-read paths (orders by user/status/date, product category searches, dashboard aggregations) lack explicit indexes.
- Backend dashboard and seller-order endpoints use heavy multi-collection aggregations without pagination/streaming strategy.
- No API-level response pagination for large list endpoints in several flows.

## 4) Performance bottlenecks

- Client bundle size is high and mostly single-chunk; route-level code splitting is not used.
- Multiple pages still rely on eager global data fetches in `App.jsx`, increasing startup network cost.
- Some expensive UI data shaping is done repeatedly in render path where memoization boundaries could be tighter.
- Dashboard and profile flows contain effect patterns that can trigger redundant calls under dependency changes (lint warnings still present).

## 5) Backend architecture flaws

- Business logic and transport concerns are heavily mixed inside controllers (large methods, email HTML, payment orchestration, state transitions all in one layer).
- Payment verification + stock decrement + cart clear are not wrapped in a DB transaction, so partial failure can leave inconsistent state.
- Validation coverage is uneven: create flows are validated, but several update/state transition routes are weaker.
- Environment config had duplicate key declarations and duplicate required-variable checks (now cleaned), indicating config hygiene drift.

## 6) Frontend architecture flaws

- Feature boundaries exist but reuse is inconsistent; several abandoned dashboard components existed and were detached from routes.
- API layer is fragmented: many separate axios clients with inconsistent credential policies.
- State ownership is sometimes duplicated (derived data mixed with stored data, old unused slices/actions patterns).
- Some pages combine heavy UI and orchestration logic without smaller composable sub-hooks.

## 7) State management issues

- Dashboard slice previously carried unused action/state (`setSellerProducts`) and dead references (now removed).
- Order/cart/profile state flows contain side-effect-heavy handlers where failures are swallowed in places, reducing debuggability.
- Cache behavior is uneven (some hooks cache aggressively, others always refetch, no centralized invalidation policy).

## 8) API design mistakes

- Inconsistent route semantics (`/order/verify-order`, mixed resource naming, GET for logout).
- Inconsistent response handling patterns across frontend services (`safeRequest` returning `undefined` in some services, direct throws in others).
- Checkout address selection is not properly wired end-to-end in request payload flow, causing behavioral mismatch with UI expectation.

## 9) Authentication/security concerns

- Google OAuth callback redirects use hardcoded frontend URL strategy and insecure cookie defaults.
- No refresh-token/session rotation model; single cookie JWT with blacklist-only logout strategy.
- JWT blacklist in Redis stores raw token values directly.

## 10) UX issues blocking real-world readiness

- Analytics dashboard currently displays static fake metrics.
- In some edge cases (network/API failures), user receives generic failure behavior with limited recovery hints.
- Checkout flow has state assumptions that can fail quietly and route users to fallback screens.
- Large initial payload can degrade first-load UX on slower devices.

---

## Ratings (out of 10)

- Frontend Architecture: **6.5/10**  
  Good feature grouping and modern stack, but inconsistent patterns and dead-code accumulation were significant.
- UI/UX Quality: **8.0/10**  
  Strong visual design and responsive presentation; production UX reliability gaps remain.
- Backend Architecture: **5.5/10**  
  Functional but controller-heavy, weak boundary separation, and security hardening gaps.
- Scalability: **5.0/10**  
  Missing indexes/pagination and heavy aggregations without scaling strategy.
- Performance: **5.5/10**  
  Works, but bundle size and eager fetching hurt performance headroom.
- Security: **4.5/10**  
  Cookie hardening, endpoint semantics, and abuse controls need urgent upgrades.
- Production Readiness: **5.0/10**  
  Usable MVP, but not yet robust for high-stakes ecommerce production traffic.
- Code Quality: **6.0/10**  
  Improved after cleanup; still mixed consistency and error-handling discipline.
- Folder Structure: **7.0/10**  
  Mostly understandable, but legacy/dead artifacts had accumulated.
- State Management: **6.0/10**  
  Redux usage is workable; side-effect policy and cache coherence need tightening.
- Overall MERN Engineering Quality: **6.0/10**

## What is blocking true production-grade ecommerce status

- Security hardening is incomplete (cookie policy, CSRF posture, rate limiting, auth endpoint semantics).
- Operational maturity is low (no tests, no CI quality/security pipeline, no observability standard).
- Data and workflow consistency risks remain (payment/order/stock consistency under failures).
- Performance/scalability foundations are underdeveloped (bundle splitting, DB indexes, pagination).

# SAKFLY — 08. Project Structure (Sprint 1)

**Status:** FINAL — reflects the exact file tree generated and verified for Sprint 1 (foundation & authentication).
**Scope:** this document is a structural index only. It lists every file and folder produced in Sprint 1, in its exact location. It contains no code, no implementation detail beyond placement, and introduces no new file, folder, or route not already generated.

---

## 1. Complete Folder Tree

```
sakfly-web/
├── .env.example
├── .eslintrc.json
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
│
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── error.tsx
│   ├── global-error.tsx
│   ├── not-found.tsx
│   │
│   ├── (marketing)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   └── legal/
│   │       ├── privacy/
│   │       │   └── page.tsx
│   │       └── terms/
│   │           └── page.tsx
│   │
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── verify-email/
│   │       └── pending/
│   │           └── page.tsx
│   │
│   ├── (app)/
│   │   ├── layout.tsx
│   │   └── dashboard/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   │
│   └── api/
│       └── bff/
│           └── [...path]/
│               └── route.ts
│
├── components/
│   ├── ui/
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx
│   │   └── tooltip.tsx
│   │
│   ├── patterns/
│   │   ├── alert-banner.tsx
│   │   ├── api-error-state.tsx
│   │   ├── credit-balance-pill.tsx
│   │   ├── empty-state.tsx
│   │   ├── form-field.tsx
│   │   ├── plan-badge.tsx
│   │   └── toaster-provider.tsx
│   │
│   └── layout/
│       ├── brand-mark.tsx
│       ├── marketing-footer.tsx
│       └── marketing-header.tsx
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── login-form.tsx
│   │   │   ├── password-input.tsx
│   │   │   ├── password-strength-meter.tsx
│   │   │   └── register-form.tsx
│   │   ├── hooks/
│   │   │   ├── use-login.ts
│   │   │   └── use-register.ts
│   │   ├── schemas/
│   │   │   ├── login-schema.ts
│   │   │   └── register-schema.ts
│   │   └── services/
│   │       ├── auth-service.ts
│   │       └── session-service.ts
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── mobile-nav.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── topbar.tsx
│   │   │   └── user-menu.tsx
│   │   └── nav-items.ts
│   │
│   └── marketing/
│       ├── components/
│       │   ├── plan-limit-row.tsx
│       │   └── pricing-card.tsx
│       ├── feature-highlights.ts
│       └── plans-data.ts
│
├── lib/
│   ├── api-client.ts
│   ├── env.ts
│   ├── error-copy-registry.ts
│   ├── errors.ts
│   ├── idempotency.ts
│   ├── query-keys.ts
│   ├── redirect.ts
│   └── utils.ts
│
├── hooks/
│   └── use-toast.ts
│
├── store/
│   ├── toast-store.ts
│   └── ui-store.ts
│
├── types/
│   ├── api.ts
│   └── user.ts
│
├── providers/
│   ├── app-providers.tsx
│   ├── query-provider.tsx
│   └── theme-provider.tsx
│
└── middleware.ts
```

---

## 2. Exact File Location Index

Every file generated in Sprint 1, listed with its full repository-relative path. Grouped by top-level concern for traceability.

### 2.1 Root configuration files

| File | Path |
|---|---|
| Environment variable template | `.env.example` |
| ESLint configuration | `.eslintrc.json` |
| Git ignore rules | `.gitignore` |
| Next.js configuration | `next.config.ts` |
| Package manifest | `package.json` |
| PostCSS configuration | `postcss.config.js` |
| Tailwind CSS configuration | `tailwind.config.ts` |
| TypeScript configuration | `tsconfig.json` |
| Route protection middleware | `middleware.ts` |

### 2.2 `app/` — root-level files

| File | Path |
|---|---|
| Root layout (provider tree, fonts, metadata) | `app/layout.tsx` |
| Global stylesheet (design tokens, base styles) | `app/globals.css` |
| Route-segment error boundary | `app/error.tsx` |
| Global crash fallback | `app/global-error.tsx` |
| Not-found state | `app/not-found.tsx` |

### 2.3 `app/(marketing)/` — public marketing routes

| Route | File |
|---|---|
| Marketing shell layout | `app/(marketing)/layout.tsx` |
| `/` (Landing) | `app/(marketing)/page.tsx` |
| `/about` | `app/(marketing)/about/page.tsx` |
| `/contact` | `app/(marketing)/contact/page.tsx` |
| `/pricing` | `app/(marketing)/pricing/page.tsx` |
| `/legal/privacy` | `app/(marketing)/legal/privacy/page.tsx` |
| `/legal/terms` | `app/(marketing)/legal/terms/page.tsx` |

### 2.4 `app/(auth)/` — authentication routes

| Route | File |
|---|---|
| Auth shell layout | `app/(auth)/layout.tsx` |
| `/login` | `app/(auth)/login/page.tsx` |
| `/register` | `app/(auth)/register/page.tsx` |
| `/verify-email/pending` | `app/(auth)/verify-email/pending/page.tsx` |

### 2.5 `app/(app)/` — protected application routes

| Route | File |
|---|---|
| App shell layout (authoritative session check) | `app/(app)/layout.tsx` |
| `/dashboard` | `app/(app)/dashboard/page.tsx` |
| `/dashboard` loading skeleton | `app/(app)/dashboard/loading.tsx` |

### 2.6 `app/api/` — route handlers

| Route | File |
|---|---|
| BFF proxy (catch-all) | `app/api/bff/[...path]/route.ts` |

---

## 3. `app` Directory Structure

```
app/
├── layout.tsx                              Root layout
├── globals.css                             Design tokens + base styles
├── error.tsx                               Route error boundary
├── global-error.tsx                        Global crash fallback
├── not-found.tsx                           404 / indistinguishable-access state
│
├── (marketing)/                            Route group — guest-accessible
│   ├── layout.tsx                          MarketingShellTemplate
│   ├── page.tsx                            / (Landing)
│   ├── about/page.tsx                      /about
│   ├── contact/page.tsx                    /contact
│   ├── pricing/page.tsx                    /pricing
│   └── legal/
│       ├── privacy/page.tsx                /legal/privacy
│       └── terms/page.tsx                  /legal/terms
│
├── (auth)/                                 Route group — guest-only
│   ├── layout.tsx                          AuthShellTemplate
│   ├── login/page.tsx                      /login
│   ├── register/page.tsx                   /register
│   └── verify-email/
│       └── pending/page.tsx                /verify-email/pending
│
├── (app)/                                  Route group — protected
│   ├── layout.tsx                          AppShellTemplate (session gate)
│   └── dashboard/
│       ├── page.tsx                        /dashboard
│       └── loading.tsx                     /dashboard loading state
│
└── api/
    └── bff/
        └── [...path]/
            └── route.ts                    Same-origin BFF proxy
```

---

## 4. `components` Directory Structure

```
components/
├── ui/                                     Atoms — Shadcn-derived primitives
│   ├── avatar.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── checkbox.tsx
│   ├── dropdown-menu.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── separator.tsx
│   ├── skeleton.tsx
│   └── tooltip.tsx
│
├── patterns/                               Molecules / shared organisms
│   ├── alert-banner.tsx
│   ├── api-error-state.tsx
│   ├── credit-balance-pill.tsx
│   ├── empty-state.tsx
│   ├── form-field.tsx
│   ├── plan-badge.tsx
│   └── toaster-provider.tsx
│
└── layout/                                 Cross-page layout chrome
    ├── brand-mark.tsx
    ├── marketing-footer.tsx
    └── marketing-header.tsx
```

---

## 5. `features` Directory Structure

```
features/
├── auth/
│   ├── components/
│   │   ├── login-form.tsx
│   │   ├── password-input.tsx
│   │   ├── password-strength-meter.tsx
│   │   └── register-form.tsx
│   ├── hooks/
│   │   ├── use-login.ts
│   │   └── use-register.ts
│   ├── schemas/
│   │   ├── login-schema.ts
│   │   └── register-schema.ts
│   └── services/
│       ├── auth-service.ts                 Placeholder auth service layer
│       └── session-service.ts              Placeholder session service layer
│
├── dashboard/
│   ├── components/
│   │   ├── mobile-nav.tsx
│   │   ├── sidebar.tsx
│   │   ├── topbar.tsx
│   │   └── user-menu.tsx
│   └── nav-items.ts
│
└── marketing/
    ├── components/
    │   ├── plan-limit-row.tsx
    │   └── pricing-card.tsx
    ├── feature-highlights.ts
    └── plans-data.ts
```

---

## 6. `lib` Directory Structure

```
lib/
├── api-client.ts                           Server-only fetch wrapper (api.sakfly.com)
├── env.ts                                  Centralized environment access
├── error-copy-registry.ts                  Error-code → copy/icon/action lookup
├── errors.ts                               ServiceNotImplementedError
├── idempotency.ts                          Idempotency-key generation
├── query-keys.ts                           React Query key factory
├── redirect.ts                             Safe `next=` redirect validation
└── utils.ts                                `cn()` class-merge helper
```

---

## 7. `providers` Directory Structure

```
providers/
├── app-providers.tsx                       Composed provider tree (root-mounted)
├── query-provider.tsx                      React Query client provider
└── theme-provider.tsx                      Dark mode (next-themes) provider
```

---

## 8. `store` Directory Structure

```
store/
├── toast-store.ts                          Toast queue (Zustand)
└── ui-store.ts                             Sidebar / mobile-nav UI state (Zustand, persisted)
```

---

## 9. `types` Directory Structure

```
types/
├── api.ts                                  ApiError, ApiErrorCode, envelope shapes
└── user.ts                                 AuthenticatedUser, Subscription, PlanCode
```

---

## 10. Supporting Top-Level Directories (not nested under the above)

```
hooks/
└── use-toast.ts                            Sanctioned toast-raising hook
```

---

## 11. Directory Purpose Summary

| Directory | Purpose |
|---|---|
| `app/` | Next.js 15 App Router route tree — pages, layouts, route handlers, middleware entry points |
| `components/ui/` | Shadcn-derived primitives (atoms) — tokenized, unmodified in place |
| `components/patterns/` | Shared molecules/organisms reused across features |
| `components/layout/` | Cross-page chrome (brand mark, marketing header/footer) |
| `features/` | Feature-scoped code (auth, dashboard, marketing) — components, hooks, schemas, services local to one feature |
| `lib/` | Framework-agnostic utilities — API transport, error handling, redirect safety, query keys |
| `hooks/` | Shared, feature-agnostic React hooks |
| `store/` | Zustand stores — client/UI state only, never server-derived data |
| `types/` | Shared TypeScript contracts (API envelopes, user/session shapes) |
| `providers/` | React context/provider composition mounted once at the root |

---

**End of 08-project-structure.md.**

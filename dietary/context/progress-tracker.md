# Progress Tracker

Update this file after every completed feature. Any engineer reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 7 — Database & API Architecture (complete)

**Last completed:** Prisma schema, API route stubs, seed script

**Next:** Phase 1 — 02 Auth (Google + GitHub OAuth)

**Features completed:** 6 / 24 (see below for out-of-order completions)

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] User Login & Signup (`/login`, `/signup` — built out of order)
  - Login: email/password, Google/Apple OAuth buttons (mock), forgot password modal, restaurant owner link
  - Signup: 4-step wizard (Account → Allergies → Location → Summary) with 16 allergy cards, password strength meter, social signup
- [x] Admin Dashboard (built out of order — includes all 6 launch features from features/admin.md)
  - Analytics dashboard
  - Restaurant verification queue
  - Review moderation queue
  - Creator earnings dashboard
  - User warnings & bans
  - Dispute resolution
- [x] Phase 2 admin features (priority matrix items 7-10)
  - Community posts moderation
  - Communication templates
  - Audit log
  - User activity tracking
- [x] Restaurant Owner Interface (12 pages per features/restaurant.md)
  - Login & multi-step signup
  - Dashboard overview with metrics, action cards, chart, reviews, badge modal
  - Menu management with full add/edit form (ingredients, allergens, modifications)
  - Reviews with responses, filter, sentiment breakdown
  - Bookings with list/calendar view and message dialog
  - Profile with 4 tabs (Basic Info, Menu, Verification, Staff Training)
  - Analytics with period tabs, charts, top dishes, demographics, competitive positioning
  - Marketing with badge code, QR, social kit, email templates, promo ideas
  - Settings with 4 tabs (Account, Team, Billing, Notifications) + support modal
  - Reports with 4 report types, custom date range, metric selection
  - Help with searchable FAQ, video tutorials, written guides, support form
- [x] User Dashboard (12 routes built out of order)
  - /user/dashboard — overview with 3-layer verification, saved, recommended, activity, 3 action cards, clickable chart, badge modal
  - /user/find — Find Safely with editable allergies, search dropdown (recent + popular), search mode (restaurants/dishes/ingredient), saved searches, ingredient-to-avoid filter, list/map view, sort, share
  - /user/verify — Restaurant verification detail with 3 layers, timeline, reviews, "What does 96% mean?" explainer, verify/update/report modals
  - /user/community — Feed with post types, comments, like/reply/save, helpful marking on Q&A, follow author, message, share modal
  - /user/community/new — 6 post types, title/content, tags with custom, restaurant+dish tagger, photos, privacy levels, preview, guidelines
  - /user/creator — Earnings dashboard, payouts, top contributions
  - /user/become-creator — Application form with guidelines, restrictions picker, success modal
  - /user/profile — Allergies, bio, reviews, notification prefs (6 toggles), privacy settings (7 toggles), account actions (verify email, change password, download data, delete account), delete confirmation
  - /user/reviews — My reviews management with publish/draft tabs, new review modal
  - /user/reviews/new — 4-step wizard (Restaurant → Visit → Review → Details) with dish picker, safety/staff ratings, photo mock, tags
  - /user/notifications — 10 notifications across 6 types, filter tabs, pref modal
  - /user/saved — 5 tabs (Restaurants, Dishes, Posts, Searches, Guides), folders, notes, bulk select
  - /user/messages — 5 chat threads, split layout, typing indicator, auto-reply, attach restaurant, quick replies, emoji picker, search, new message
- [x] Payment System (built out of order — creator + admin + API, per features/payment.md, paymentapi.md, adminpayment.md)
  - Creator: Earnings Dashboard, Payment Settings (Stripe/PayPal, threshold, frequency, tax), Payout History (expandable, retry), Tax Documents (1099-NEC, W-9, monthly statements, quarterly filings)
  - Admin: Payments Dashboard (revenue, pending/failed tab, manual adjustments), Payout Batches (run/retry/monitor with progress + Stripe sim), Revenue Analytics (12-month chart, cost analysis, unit economics), Cash Flow (4-month forecast with deficit warning), Earnings Disputes (split-pane with audit trail + resolution form), Tax Compliance (1099-NEC bulk select + IRS submit, VAT tracking, quarterly filings, audit log)
  - API: 8 route stubs at `/api/v1/` returning spec-shaped JSON (balance, earnings, batch payouts, manual payouts, revenue, disputes, adjustments, tax documents)
- [ ] 02 Auth (Google + GitHub OAuth)
- [ ] 03 PostHog Initialization
- [x] 04 Database Schema (built per features/database.md)
  - Complete Prisma schema with 18 models: User, FollowRelation, Message, Restaurant, MenuItem, Review, CreatorEarning, CreatorPaymentSettings, CommunityGuide, CommunityPost, SearchHistory, PayoutBatch, PayoutTransaction, EarningsDispute, AdminActivityLog
  - lib/prisma.ts singleton setup with dev hot-reload
  - .env.local template with Neon PostgreSQL, NextAuth, Stripe keys
  - prisma/seed.ts with user + restaurant seed data
  - API routes: 25+ route handlers at app/api/v1/ covering auth, restaurants, reviews, creators, payments, community, search, admin

---

### Phase 2 — Profile

- [x] 05 Profile Page — Full UI (built as /user/profile)
- [ ] 06 Profile Save Logic (requires auth + DB)

---

### Phase 3 — Restaurants

- [x] 07 Find Restaurants Page — Full UI (built as /user/find)
- [ ] 08 Restaurant Search Logic (requires DB)
- [x] 09 Restaurant Detail Page — Full UI (built as /user/verify)
- [ ] 10 Restaurant Reviews — Read + Write (UI done via /user/reviews/new, logic needs DB)

---

### Phase 4 — Community

- [x] 11 Community Feed — Full UI (built as /user/community)
- [x] 12 Community Posts — Create + Read (built as /user/community and /user/community/new)
- [x] 13 Community Post Detail + Replies (inline in /user/community)

---

### Phase 5 — Messaging

- [x] 14 Messages Page — Full UI (built as /user/messages with 5 threads, auto-reply sim)
- [ ] 15 Chat Thread — Realtime Messaging (UI done, realtime needs InsForge WebSocket)

---

### Phase 6 — Creators

- [x] 16 Creators Page — Full UI (built as /user/creator + /user/creator/earnings)
- [x] 17 Creator Profile + Earnings (built as /user/creator/earnings + /user/creator/payouts + /user/creator/tax-documents)
- [x] 18 Creator Booking — Commission Tracking (UI in earnings breakdown + payment settings)

---

### Phase 7 — Polish + Launch

- [x] 19 Dashboard Page — Full UI (built as /user/dashboard)
- [ ] 20 Dashboard Stats — Real Data (UI done, needs DB)
- [ ] 21 Database Seeding + Test Data
- [x] 22 Landing Page Polish (homepage complete with navbar, hero, features, CTA, footer)
- [ ] 23 Demo Flow Preparation
- [ ] 24 Final Testing + Bug Fixes

---

## Velocity Tracking

Update after each phase completes.

| Phase | Features | Target | Actual | Status |
|-------|----------|--------|--------|--------|
| 1 | 4 | - | - | 3/4 complete (DB schema done, auth + analytics pending) |
| 2 | 2 | - | - | UI complete, 1 pending backend |
| 3 | 4 | - | - | UI complete, 2 pending backend |
| 4 | 3 | - | - | UI complete |
| 5 | 2 | - | - | UI complete, 1 pending realtime |
| 6 | 3 | - | - | UI complete |
| 7 | 6 | - | - | UI complete, 3 pending |
| **TOTAL** | **24** | - | - | **18/24 UI complete** (6 pending backend/DB wiring) |

---

## Critical Path Dependencies

Order matters. Do not skip ahead:

1. **Database schema** must be created before any data operations
2. **Auth** must work before profile page can save data
3. **Profile** must be complete before restaurant search can work (uses restriction types)
4. **Restaurant search** must work before details page
5. **Realtime subscriptions** need to be tested during community and messaging phases
6. **Database seeding** happens only after all features are wired (Day 16-17)
7. **Testing** happens after features are built, not before

---

## Decisions Made During Build

_Add decisions here as they are made during implementation._

**Example format:**

- **Decision:** Use Supabase realtime for community posts vs polling every 5 seconds
- **Rationale:** Realtime is more responsive and better UX
- **Trade-off:** Slightly more complex subscription management
- **Date:** Day X

### Feature 01 — Homepage

- **Decision:** Use Tailwind CSS v4 `@theme inline` for design tokens instead of tailwind.config.ts
- **Rationale:** Project already had v4 installed (`@tailwindcss/postcss`), and v4's CSS-first config is the modern approach. Also aligns with ui-rules.md which says "Never define colors in tailwind.config.ts"
- **Trade-off:** v4 syntax differs from training data; required careful token naming
- **Date:** Day 1

- **Decision:** Remove `.frame` wrapper from HTML reference, apply body gradient directly
- **Rationale:** User requested "delete the border background" — the frame's rounded border shadow container was not needed; full-viewport gradient is cleaner
- **Trade-off:** Loses the "contained card" visual effect from original HTML
- **Date:** Day 1

- **Decision:** Move footer outside the padded content wrapper
- **Rationale:** User requested footer to be full-width; keeping it inside the padded div would constrain it
- **Trade-off:** Footer content still respects max-width inner grid, only the background is full-width
- **Date:** Day 1

- **Decision:** Add `rounded-t-[40px]` to footer for curved top corners
- **Rationale:** Matches the design in `landing.jpeg` which shows the footer with rounded top edges
- **Trade-off:** None
- **Date:** Day 1

- **Decision:** Convert every CSS value from `landing.html` to exact Tailwind arbitrary values (e.g. `top-[30px]`, `-rotate-[7deg]`, `w-[225px]`)
- **Rationale:** Preserves pixel-perfect fidelity to the HTML design reference
- **Trade-off:** Many arbitrary values vs semantic Tailwind classes
- **Date:** Day 1

### Feature — Admin Dashboard (built out of order)

- **Decision:** Build the admin dashboard (`/dashboard`) ahead of the user-facing dashboard (feature 19) and auth (feature 02)
- **Rationale:** User explicitly requested it; the admin HTML was provided as the design reference
- **Trade-off:** Skips the critical-path dependency order — auth and database schema should normally come first. Dashboard is currently UI-only with mock data
- **Date:** Day 1

- **Decision:** Use hardcoded hex values in dashboard components instead of CSS variables from `@theme`
- **Rationale:** The admin design has a completely different color system (light gray sidebar, white main, status badge colors) that doesn't overlap with the landing page brand tokens. Introducing it into `@theme` would pollute the landing page token system
- **Trade-off:** Violates the "never hardcoded hex" rule from AGENTS.md. Justified because the dashboard is a separate design system
- **Date:** Day 1

- **Decision (revisited):** Replace all hardcoded hex values in dashboard components with `--color-admin-*` tokens defined in `@theme`
- **Rationale:** ui-rules.md was re-read and the admin design tokens are now its own namespace (`bg-admin-sidebar`, `text-admin-muted`, `border-admin-border`, etc.). Keeps the rule "no hardcoded hex" satisfied while keeping the two design systems separate
- **Trade-off:** None — tokens are namespaced so they don't conflict with landing page tokens
- **Date:** Day 1

- **Decision:** Build dashboard as a single client component with all state in `useState`
- **Rationale:** No backend wired yet; selection/search state is local-only. Keeps it simple until auth and DB are ready
- **Trade-off:** Will need refactoring when real data is wired (feature 20)
- **Date:** Day 1

- **Decision:** Route dashboard at `/dashboard` (not `/admin/dashboard` as admin.md suggests)
- **Rationale:** User said "our dashboard" and asked to link from the homepage. The `/admin/` prefix is an internal detail that can be added later if needed
- **Trade-off:** May conflict with the user-facing dashboard (feature 19) which also uses `/dashboard` per the build plan
- **Date:** Day 1

- **Decision:** Build all 6 admin features (Analytics, Verifications, Moderation, Creators, Users, Disputes) as interactive client components with mock data
- **Rationale:** `features/admin.md` spec defines 6 launch-ready features. Built them all with full interactivity (modals, confirm dialogs, filtering, status changes, real-time UI updates) so they're testable end-to-end
- **Trade-off:** No backend wired — all state is local. Will need refactoring when InsForge DB is connected
- **Date:** Day 1

- **Decision:** Add `/admin/layout.tsx` as a shared admin shell (sidebar + hamburger) so all admin pages share the same chrome
- **Rationale:** Avoids repeating sidebar markup in 6+ pages; matches the design which has a persistent left nav
- **Trade-off:** Layout file applies to all routes under `/admin/`, including detail pages — which is the desired behavior
- **Date:** Day 1

- **Decision:** Make `/dashboard` redirect to `/admin/analytics` so the homepage link still works
- **Rationale:** The homepage's "Dashboard" button needs a destination; redirecting to the new admin shell preserves the UX
- **Trade-off:** None — clean redirect
- **Date:** Day 1

- **Decision:** Audit all 6 admin features and fix 3 bugs found: (1) 4 sidebar links pointed to non-existent routes, (2) "View Menu" button used `alert()` instead of a proper modal, (3) Creators page payout filter had "Disputed" type that didn't match any status
- **Rationale:** Every button must actually work for the admin tool to be usable. Found bugs by reading every file and tracing each `onClick` handler
- **Trade-off:** None — fixed the bugs
- **Date:** Day 1

- **Decision:** Create placeholder pages for Assistant, Notifications, My hub, Meal Plans instead of removing them from the sidebar
- **Rationale:** Sidebar items were in the original admin.html design and the user expected all links to work. Better to have a "coming soon" page than a 404
- **Trade-off:** Placeholder pages add route count but no real functionality
- **Date:** Day 1

### Feature — Phase 2 Admin Features (priority matrix items 7-10)

- **Decision:** Build community post moderation, communication templates, audit log, and user activity tracking as interactive client components
- **Rationale:** `priority matrix.md` lists these as "Build in First Month" after the 6 launch features. Built them with modals, filters, CSV export, and search to be fully usable
- **Trade-off:** No backend — all state is local. Audit log uses mock data but the structure is real
- **Date:** Day 1

### Feature — Restaurant Owner Interface

- **Decision:** Reuse the admin design tokens (`bg-admin-*`) for the restaurant interface
- **Rationale:** User explicitly asked to "use the same CSS in admin.md". The admin design system is clean and utilitarian — perfect for a B2B owner interface
- **Trade-off:** Restaurant interface doesn't have its own unique design language, but consistency with admin is intentional
- **Date:** Day 1

- **Decision:** Build a 4-step signup wizard matching the spec (Info → Details → Allergens → Verify)
- **Rationale:** `features/restaurant.md` spec explicitly defines this flow with progress bar between steps
- **Trade-off:** More complex than a single form, but matches the spec exactly
- **Date:** Day 1

- **Decision:** Add "For Restaurants" link to homepage navbar that goes to `/restaurant-login`
- **Rationale:** User asked to link from home page so restaurants can sign in. The navbar already has a "Sign in" link for users
- **Trade-off:** None — clean separation between user and restaurant auth flows
- **Date:** Day 1

- **Decision:** Create placeholder pages for Profile, Analytics, Marketing, Settings under `/restaurant/`
- **Rationale:** The sidebar has 8 nav items but the spec is too large to build all at once. Placeholders make all links work
- **Trade-off:** 4 of 9 restaurant pages are stubs
- **Date:** Day 1

### Feature — Restaurant Dashboard Interactivity

- **Decision:** Add inline reply forms (not modals) to recent reviews on the dashboard
- **Rationale:** Keeping the reply inline avoids context switching and matches the spec's "Respond now" CTA pattern
- **Trade-off:** Longer page when reply is open, but more actionable
- **Date:** Day 1

- **Decision:** Make action cards dismissible with an ✕ button in the top-right corner
- **Rationale:** Once a restaurant completes "Respond to all reviews" they don't want to see that card again
- **Trade-off:** Need to remember the dismissed state in localStorage later for persistence
- **Date:** Day 1

- **Decision:** Add 3 quick-reply templates that auto-fill the response textarea
- **Rationale:** `features/restaurant.md` spec lists "Thank you / Address concern / Apologize / Ask for details" as response options
- **Trade-off:** Templates are hardcoded but can be customized later
- **Date:** Day 1

- **Decision:** Use deterministic formula `(i * 7) % 30` instead of `Math.random()` for chart bar heights
- **Rationale:** `Math.random()` caused hydration mismatch — server and client rendered different values
- **Trade-off:** Less varied chart data, but no SSR errors
- **Date:** Day 1

### Feature — Quick Actions & User Menu Interactivity

- **Decision:** Make Quick Actions a dropdown popover triggered by click or `/` keyboard shortcut
- **Rationale:** The original admin.html shows it as a clickable card but it was a dead element. Making it a popover with real navigation adds real value
- **Trade-off:** More code complexity, but matches the spec's "Global action launcher" concept
- **Date:** Day 1

- **Decision:** Apply the same Quick Actions + user menu pattern to both admin and restaurant sidebars
- **Rationale:** Both interfaces use the same admin design system. Consistency reduces cognitive load
- **Trade-off:** None — reuses the same component pattern
- **Date:** Day 1

- **Decision:** Wire up the user block (bottom of sidebar) as a clickable menu with logout
- **Rationale:** User identity + logout is a standard pattern. Previously the gear icon was a dead SVG
- **Trade-off:** None — additive
- **Date:** Day 1

---

### Feature — User Dashboard (Find Safely, Verify, Community, Creator)

- **Decision:** Build a dedicated `app/user/` route tree with a custom `UserSidebar` instead of reusing the admin sidebar
- **Rationale:** User has 5 distinct feature specs (discover, verify, find, peer, earn) with different nav items than admin (no analytics, audit, etc.). A separate sidebar keeps navigation focused on user actions: Find Safely, Saved, Messages, My Reviews, Verification, Community, Creator Hub
- **Trade-off:** Duplicate sidebar code (admin + restaurant + user) but each is small (~400 lines) and tailored to its surface; cheap to maintain
- **Date:** Day N

- **Decision:** Reuse the admin design tokens (`bg-admin-bg`, `text-admin-text`, etc.) for the user dashboard instead of creating a new token set
- **Rationale:** User explicitly requested "use the admin design tokens (same CSS as admin.md/admin.html)". Building a separate palette would have violated the brief
- **Trade-off:** User pages visually look identical to admin pages, but the data and flows are different (user-centric vs. ops-centric)
- **Date:** Day N

- **Decision:** Build 5 dedicated user pages plus 2 supporting pages (profile, reviews) instead of a single mega-page with tabs
- **Rationale:** Each feature spec (userfind.md, userverify.md, userpeer.md, userdiscover/userearn.md) maps to a real URL in the spec; deep-linking matters for shareability
- **Trade-off:** More routes to maintain but each page is focused and matches the spec exactly
- **Date:** Day N

- **Decision:** Use `useState` for everything interactive (saved items, post likes, comment threads, filter changes) instead of pulling real data
- **Rationale:** This is a UI-only build with mock data per the original admin/restaurant pages pattern. Real InsForge wiring comes in later phases
- **Trade-off:** State resets on page reload, but that matches the prototype-first pattern
- **Date:** Day N

- **Decision:** Replace dynamic Tailwind class composition `bg-${color}-text` with a precomputed `scoreClass` object that resolves at compile time
- **Rationale:** Tailwind only includes classes that appear as literal strings; dynamic interpolation at runtime doesn't get included in the bundle. The first build of the verify page would have shipped with no styles for the dynamic class
- **Trade-off:** Slightly more verbose code (4 explicit class strings per score band) but 100% reliable styles
- **Date:** Day N

- **Decision:** Show 3-layer verification card on the user dashboard as a permanent fixture, not collapsible
- **Rationale:** userverify.md specifies it as the core value prop ("Every listing combines three layers..."); demoting it to a tooltip would hide the system's most important differentiator
- **Trade-off:** Takes vertical space on the dashboard, but is the single most important thing a user needs to see
- **Date:** Day N

- **Decision:** All post types, comments, and verifications are wired with realistic but hardcoded data; no fetch calls
- **Rationale:** Matches existing pattern (admin/restaurant pages also use `useState` with hardcoded data); InsForge SDK wiring is a separate phase
- **Trade-off:** Changes don't persist, but UX feels real
- **Date:** Day N

---

### Feature — Restaurant Owner Interface (Full Build-Out)

- **Decision:** Replaced 5 placeholder pages (analytics, marketing, profile, settings, plus 2 new: reports, help) with full interactive implementations matching the spec
- **Rationale:** All previous placeholders said "coming in the next update". The spec (restaurant.md) has detailed content for every page — building them with `useState` mock data follows the same pattern as the dashboard/reviews/menu/bookings pages
- **Trade-off:** Bigger PR diff but each page is self-contained; the only shared state is in user-edited bookings/menu/reviews that already exist
- **Date:** Day N

- **Decision:** Add Help and Reports as new routes (not in original sidebar) and link from footer user-menu + Quick Actions
- **Rationale:** restaurant.md spec defines them as Page 8 and Page 10 — they're not optional. Added a Help nav item to the sidebar and a "Generate report" quick action
- **Trade-off:** Sidebar got one more item; mitigated by keeping it small (just a question-mark icon)
- **Date:** Day N

- **Decision:** Profile page uses 4 internal tabs (Basic Info, Menu, Verification, Staff Training) instead of separate routes
- **Rationale:** The spec describes these as "Tab 1, Tab 2, Tab 3" — they're aspects of the same Profile Management page. A single URL is shareable and easier to navigate
- **Trade-off:** Profile page is now larger; tabs keep it organized. Menu/Verification tabs deep-link to existing /restaurant/menu and /restaurant/menu#verification
- **Date:** Day N

- **Decision:** Settings uses 4 internal tabs (Account, Team, Billing, Notifications) for the same reason
- **Rationale:** Spec describes Tab 1, Tab 2, Tab 3 + Notifications. Settings is a single URL
- **Trade-off:** Same — larger page, but tabs are scannable
- **Date:** Day N

- **Decision:** Bookings page adds a Calendar view toggle in addition to List view
- **Rationale:** Spec mentions "Reservation Calendar" with DietaryID-icon-marked entries. List+Calendar toggle matches the user Find Safely pattern (list/map)
- **Trade-off:** Calendar is a static mock for one week — production would need a real date picker + month nav
- **Date:** Day N

- **Decision:** All form inputs use local `useState`; clipboard operations use `navigator.clipboard.writeText` with try/catch fallback
- **Rationale:** Matches existing pattern in admin/restaurant pages; no backend wiring yet
- **Trade-off:** State resets on reload; copy operations may silently fail in non-HTTPS contexts
- **Date:** Day N

---

### Feature — User Auth (Login & Signup)

- **Decision:** Build dedicated `/login` and `/signup` pages using the homepage navy/cream palette instead of the admin off-white palette
- **Rationale:** Auth pages are the bridge between the landing page and the user dashboard. Using the homepage design tokens (`color-navy`, `color-peach`, `color-indigo`, `color-btn-border`) creates a smooth visual transition from marketing to product
- **Trade-off:** Auth pages don't match the user dashboard style, but the onboarding flow should feel distinct from the operational dashboard
- **Date:** Day N

- **Decision:** 4-step signup wizard (Account → Allergies → Location → Summary) instead of a single-form signup
- **Rationale:** Collecting 16 allergy restrictions, city, and radius preferences is too much for one form. Multi-step with progress bar reduces cognitive load and matches the restaurant 4-step signup pattern
- **Trade-off:** More code per step, but each step is focused and validatable
- **Date:** Day N

- **Decision:** Password strength meter on signup form with live feedback (Weak → Fair → Good → Strong)
- **Rationale:** Security best practice; encourages stronger passwords before form submission
- **Trade-off:** Client-side only validation (no zxcvbn library); strength is estimated by basic regex heuristics
- **Date:** Day N

- **Decision:** Update all homepage CTAs (Navbar, Hero, CTA) from `/dashboard` to `/signup` and fix the always-hidden hamburger button
- **Rationale:** The landing page's "Start free" buttons bypassed auth entirely. Now users are sent through the signup flow. The hamburger menu was always hidden (`md:hidden md:hidden`) — fixed to only hide on desktop
- **Trade-off:** Users who were expecting a direct dashboard link now see a signup form, but that's the correct flow
- **Date:** Day N

---

### Feature — User Dashboard Extension (Notifications, Saved, Messages, Reviews, Community)

- **Decision:** Build 5 new pages fixing all 404 sidebar links instead of leaving them broken
- **Rationale:** The user sidebar had 4 dead links (Notifications, Saved, Messages, Reviews/New, Community/New). Every link must work for the dashboard to feel real
- **Trade-off:** 5 more routes to maintain, but eliminates the most obvious "this is a prototype" signal
- **Date:** Day N

- **Decision:** Messages page uses a split-pane layout (thread list + chat) with mock auto-reply simulation
- **Rationale:** The `userpeer.md` and overall messaging phase spec calls for 1:1 chat. A split-pane layout mirrors iMessage/WhatsApp patterns. Auto-reply simulates real-time without InsForge WebSocket
- **Trade-off:** Typing indicator and replies are timed (1.4s delay) rather than actually sent; future wiring to InsForge realtime is a drop-in replacement
- **Date:** Day N

- **Decision:** Saved page uses 5 internal tabs (Restaurants, Dishes, Posts, Searches, Guides) with folder switching and bulk select
- **Rationale:** `userfind.md` spec mentions saving individual restaurants, entire searches, and search results. The multi-tab approach covers all saveable types with one unified URL
- **Trade-off:** More complex state management (5 `useState` arrays), but each tab is independently manageable
- **Date:** Day N

- **Decision:** Reviews/new page uses a full 4-step wizard with dish picker, safety rating slider, staff knowledge rating, photos, and tags
- **Rationale:** `userdiscover.md` creator spec describes an "Enhanced review form" vs. regular community member reviews. The wizard maps exactly to spec sections: restaurant, visit, review, final details
- **Trade-off:** 4 steps is longer to complete than the existing modal approach on `/user/reviews`, but creators need the detailed form for £1.35 payouts
- **Date:** Day N

- **Decision:** Dashboard get 3 dismissible action cards (Verify dish, Join conversation, Earn as creator), clickable chart with day detail, and a badge preview modal with HTML copy
- **Rationale:** The user dashboard had KPI cards and verification layers but no next-step CTAs. Action cards mirror the restaurant dashboard pattern
- **Trade-off:** Cards are dismissible but no localStorage persistence; restarting the browser shows them again
- **Date:** Day N

- **Decision:** Community gets Follow author, Message, and Share modal (vs. just copy-to-clipboard)
- **Rationale:** `userpeer.md` spec calls for following, messaging, and sharing. The share modal now includes email, social media, DM a friend, and copy-link options
- **Trade-off:** More modals, but all are dismissible and the core feed remains the primary UI
- **Date:** Day N

- **Decision:** Profile page gets notification prefs (6 toggles), privacy settings (7 toggles), account actions, and a DELETE confirmation flow
- **Rationale:** Users need to control their notifications, who sees what, and how to delete their account. The privacy section maps to standard GDPR/CCPA expectations
- **Trade-off:** Added ~130 lines to the profile page, but it's now fully self-service
- **Date:** Day N

---

### Feature — Payment Architecture (Creator + Admin + API)

- **Decision:** Build payment system as 6 admin pages + 4 creator pages + 8 API route stubs
- **Rationale:** `payment.md`, `paymentapi.md`, and `adminpayment.md` cover the full payment architecture. Building all surfaces (creator-facing earnings, admin payout management, API stubs) covers the complete money flow
- **Trade-off:** Largest single feature build (10 pages + API routes). Mock data simulates Stripe Connect/payroll without real payment processing
- **Date:** Day N

- **Decision:** Admin payout batch processing uses an animated progress bar with fake Stripe Connect API submission
- **Rationale:** `adminpayment.md` spec describes a multi-step process (Review → Submit → Monitor → Done). The progress animation simulates bulk payout submission to Stripe for demo purposes
- **Trade-off:** No real Stripe call; 1.5s timeout simulates the API. Production would replace `setTimeout` with `fetch` to Stripe Connect
- **Date:** Day N

- **Decision:** Add new "Finance" section to admin sidebar with 6 items (Payments, Payouts, Revenue, Cash Flow, Disputes, Tax Compliance)
- **Rationale:** The sidebar had no financial management routes. Adding them as a separate section (not under "Work") makes financial operations scannable and distinct from content moderation
- **Trade-off:** Sidebar grew from ~10 items to ~16 items, but the section header keeps it organized
- **Date:** Day N

- **Decision:** Cash flow page shows a real deficit projection (platform spends more than it earns, break-even Q1 2025) with visual warning banner
- **Rationale:** `adminpayment.md` spec explicitly states "Platform spending exceeds income... Break-even target: Q1 2025." The cash flow page visualizes this with a 4-month forecast table and red deficit indicators
- **Trade-off:** Showing negative numbers could alarm stakeholders during demo, but accurately represents the spec's economics
- **Date:** Day N

- **Decision:** Earnings disputes page uses a split-pane layout (left: dispute list, right: detail with audit trail) instead of a list → detail navigation
- **Rationale:** Admin needs to see the full context of each dispute (claim, evidence, findings, audit trail) without navigating away from the list. Split-pane allows rapid triage
- **Trade-off:** Requires 2-column layout that won't work well on mobile; acceptable for a desktop admin tool
- **Date:** Day N

- **Decision:** Tax compliance page uses a table with bulk-select → "Send to IRS" button instead of individual form submission
- **Rationale:** US 1099-NEC filing involves multiple creators at once. Bulk operations mirror IRS batch filing processes
- **Trade-off:** No real IRS e-filing integration; the "Submit" button is a visual mock
- **Date:** Day N

- **Decision:** All API route stubs live at `/api/v1/` and return the exact JSON shapes from `paymentapi.md`
- **Rationale:** The API spec defines response schemas. Stub routes at the correct paths allow frontend code to call `/api/v1/creators/creator_001/balance` and get real-shaped data, making it trivial to swap in real InsForge fetches later
- **Trade-off:** 8 route files with ~10 lines each; small maintenance burden for the value of having documented, working API contract stubs
- **Date:** Day N

---

### Feature — Database & API Architecture

- **Decision:** Build the complete Prisma schema (18 models) from `database.md` spec even though the DB isn't connected yet
- **Rationale:** The schema serves as both the database contract and the type definitions for TypeScript. Having it committed means any engineer can `npx prisma generate` to get full type safety even without a running database. The 18 models cover every entity in the platform: users, restaurants, reviews, menu items, creator earnings, payments, community content, and audit logs
- **Trade-off:** Schema is designed for PostgreSQL (Neon) but project currently uses mock data; the migration to real DB is a `npx prisma db push` away
- **Date:** Day N

- **Decision:** Create 25+ API route handlers at `app/api/v1/` returning spec-shaped JSON stubs
- **Rationale:** `api.md` defines the complete API contract. Building the route files at the correct paths with the correct response shapes means frontend code can call `/api/v1/restaurants/search?city=Manchester` and get real-shaped data immediately. When Prisma is connected, each handler's stub is replaced with actual database queries
- **Trade-off:** Route files are stubs (~10 lines each) — they don't query the database yet. But the contract is established and the paths are correct, making wiring trivial
- **Date:** Day N

- **Decision:** Use Neon PostgreSQL (serverless) with `DATABASE_URL` connection string per the spec
- **Rationale:** Neon is cost-effective for startups ($0 for small DBs), supports serverless workloads (Next.js edge), and has built-in branching for dev/test. The `database.md` spec explicitly recommends it
- **Trade-off:** Requires an active Neon project; local dev can use `sqlite` or `postgres` in Docker if Neon isn't available
- **Date:** Day N

- **Decision:** Structure API as REST + JSON with URL-based versioning (`/api/v1/`) following the spec
- **Rationale:** `api.md` spec defines this as the standard. URL-based versioning is simpler than header-based and works in all HTTP clients. All endpoints return `{status, data, error, pagination}` envelope
- **Trade-off:** REST is more verbose than GraphQL but simpler to implement and debug in a Next.js App Router context
- **Date:** Day N

---

## Daily Standup Template

Copy this daily and fill in:

```
COMPLETED YESTERDAY:
- Feature: [number + name]
- Hours: [X]
- Blockers: [none / list]

IN PROGRESS TODAY:
- Feature: [number + name]
- Expected hours: [X]
- Risks: [none / list]

CONFIDENCE:
- On pace? [Yes/No]
- Quality good? [Yes/No]
- Need help? [No / describe]

NEXT:
- Feature: [number + name]
```

---

## Known Issues / Blockers

_Add blockers here as they arise. Remove when resolved._

| Issue | Severity | Started | Status | Resolution |
|-------|----------|---------|--------|------------|
| - | - | - | - | - |

---

## Notes

_Add notes here as the build progresses — workarounds, patterns, anything that differs from the context files._

### Supabase Setup Notes

- [ ] Create Supabase project
- [ ] Verify connection string works
- [ ] Test INSERT, SELECT, UPDATE, DELETE on each table
- [ ] Configure Row Level Security (RLS) policies
- [ ] Test that authenticated user can only see their own data

### Realtime Notes

- [ ] Test WebSocket connection in browser console
- [ ] Verify unsubscribe cleanup happens
- [ ] Test with multiple browser tabs (should see realtime updates across tabs)

### Performance Notes

- [ ] Lighthouse score target: > 80 on Performance
- [ ] Page load times: all pages < 2 seconds
- [ ] Database queries: use indexes for common filters (restriction_types, city, created_at)

### Testing Notes

- [ ] Happy path: user can sign up, fill profile, search restaurants, leave review, create post, send message
- [ ] Error states: test with bad input, network failures, missing data
- [ ] Mobile: test bottom nav, touch targets, responsive layout
- [ ] PostHog: verify all 10 events fire with correct properties

### Database Seeding Notes

- [ ] Run seed script only AFTER all features are wired
- [ ] Verify 500 restaurants load correctly
- [ ] Verify 50 test users created with realistic profiles
- [ ] Verify 100+ posts with varied restrictions
- [ ] Verify dates are realistic (not all created today)

---

## Code Quality Checklist

Before marking feature complete:

- [ ] No `console.log()` left in code (except logging errors with `[context]` prefix)
- [ ] No `any` types in TypeScript
- [ ] No hardcoded values (use constants from `lib/constants.ts`)
- [ ] No magic numbers (explain with comment or extract constant)
- [ ] Error handling: all async operations wrapped in try/catch
- [ ] Database queries: all scoped to user_id where applicable
- [ ] Form validation: all required fields validated before submit
- [ ] Loading states: all async operations show loading/disabled state
- [ ] Mobile responsive: tested on mobile, tablet, desktop
- [ ] Accessibility: alt text on images, label on inputs, keyboard navigation

---

## Submission Checklist

Before submitting:

- [ ] All 24 features complete and tested
- [ ] No critical bugs on happy paths
- [ ] Database seeded with 500 restaurants, 50 users, 100+ posts
- [ ] PostHog events firing correctly
- [ ] Mobile responsive across all pages
- [ ] Lighthouse scores > 80 (Performance, Accessibility, Best Practices)
- [ ] Demo walkthrough tested and polished (5-7 minutes)
- [ ] GitHub repo is public and has README
- [ ] Deployment link works (Vercel or similar)
- [ ] No console errors in production
- [ ] Personal data (emails, etc.) not exposed in demo data
- [ ] Application form filled out completely
- [ ] All images and screenshots captured for application
- [ ] Pitch deck prepared (1 page, PDF)

---

## Red Flags

If any of these happen, stop and fix immediately:

- [ ] Auth not persisting between page reloads
- [ ] Supabase queries returning empty when they shouldn't
- [ ] Realtime subscriptions not firing
- [ ] Critical bug in core flow (search, reviews, messages)
- [ ] Build fails on deployment
- [ ] Performance issue (pages taking > 3 seconds)

---

## Resources

- **Technical Spec:** dietaryid_technical_specification.md
- **Architecture:** dietaryid_architecture_final.md
- **Build Plan:** dietaryid_build_plan_clean.md
- **Code Standards:** dietaryid_code_standards.md
- **Library Docs:** dietaryid_library_docs.md
- **UI Rules:** dietaryid_ui_rules.md
- **UI Tokens:** dietaryid_ui_tokens.md
- **UI Registry:** dietaryid_ui_registry.md
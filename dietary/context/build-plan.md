# DietaryID Build Plan

## Core Principle

Full page UI built with mock data first — verified visually before any logic is written. Then functionality is built and wired to the UI step by step. Every feature must be visible and testable before moving to the next. No invisible backend phases.

---

## Phase 1 — Foundation

### 01 Homepage

Build the complete homepage UI.

**UI:**

- Navbar — logo, Sign In, Sign Up buttons
- Hero section — headline, subheadline, Get Started CTA
- How It Works section — 4-step visual breakdown
- Features section — 3 value props with descriptions
- Testimonial section — 3 quote cards
- Bottom CTA section
- Footer

**Logic:**

- Get Started → /signup if not authenticated, /dashboard if authenticated
- Explore Restaurants → /restaurants

---

### 02 Auth

Supabase authentication — Google and GitHub OAuth.

**UI:**

- Login page — Google OAuth button, GitHub OAuth button
- Signup page — Email input, password, Create Account button

**Logic:**

- Google OAuth via Supabase
- GitHub OAuth via Supabase
- Email/password signup via Supabase
- Session management via Supabase
- Middleware protecting /dashboard, /profile, /restaurants, /community, /messages, /creators
- After login → redirect to /profile if incomplete, /dashboard if complete

---

### 03 PostHog Initialization

Set up PostHog before any events fire.

**Logic:**

- Create lib/posthog-client.ts — PostHog browser client
- Create lib/posthog-server.ts — PostHog server client
- Initialize PostHog in root app layout
- posthog.identify() called after successful login
- posthog.reset() called on logout

---

### 04 Database Schema

All Supabase tables created before any data is written.

**Logic:**

- Create `profiles` table with all columns from architecture.md
- Create `restaurants` table with GIN indexes on restriction_types and city
- Create `restaurant_reviews` table with user/restaurant unique constraint
- Create `community_posts` table with indexes
- Create `community_replies` table with indexes
- Create `direct_messages` table with indexes
- Create `creator_commissions` table with indexes
- Row level security policies on all tables
- Test SELECT, INSERT, UPDATE, DELETE permissions for each table

---

## Phase 2 — Profile Page

### 05 Profile Page — Full UI

Build the complete profile page UI with mock data. No save logic yet.

**UI:**

- Profile completion banner — circular progress indicator, missing field tags
- Profile Information section:
  - Display Name, Email (read-only), Location, Bio textarea
  - Dietary Restrictions checkboxes — Crohn's, IBS, Celiac, Gluten-Free, Lactose Intolerant, Other
  - Dietary Notes textarea
  - Years with Condition dropdown
- Preferences section:
  - Remote Preference radio buttons
  - Preferred Cities tag input
- Social Links section:
  - LinkedIn URL, Instagram URL
- Creator Setup section:
  - "Become a Creator" toggle
  - Creator Bio textarea
  - Creator Specialties checkboxes
- Save Profile button

---

### 06 Profile Save Logic

Wire profile form to Supabase DB.

**Logic:**

- Server Action in actions/profile.ts saves all form fields to profiles table
- is_complete set to true when required fields are filled
- Completion percentage calculated
- Form pre-fills with existing data on return visits
- revalidatePath('/profile') called after save
- PostHog event: `profile_updated`

---

## Phase 3 — Restaurant Discovery

### 07 Find Restaurants Page — Full UI

Build the complete restaurant search page UI with mock data. No API logic yet.

**UI:**

- Search controls card:
  - Restriction Type multiselect dropdown
  - Location input with autocomplete
  - Find Restaurants button
  - Success message area
- Filter bar:
  - Text search input
  - Rating filter dropdown
  - Distance slider
- Restaurants list:
  - Restaurant cards in grid layout
  - Restaurant name, rating, distance, safe for badges, cuisine tags
  - View Details button
  - Pagination

---

### 08 Restaurant Search Logic

Wire search controls to Supabase DB queries.

**Logic:**

- GET /api/restaurants/search receives restrictions, city, query text, filters
- Query Supabase with overlaps and filters
- Cache search results in React state
- Handle empty results gracefully
- PostHog event: `restaurant_search`

---

### 09 Restaurant Detail Page — Full UI

Build the complete restaurant detail page UI. Wire real restaurant data immediately.

**UI:**

- Back to Results link
- Restaurant header:
  - Restaurant name, rating, address, distance
  - Call button, Website button, Menu button
  - Save Restaurant button
- Info cards row — Cuisine, Price Range, Hours
- Safe For badges
- About section
- Reviews section:
  - Filter by restriction type
  - Review cards with user info, rating, review text, safe items, avoid items
  - Load More or pagination
  - Leave Review button
- Creator Recommendations card
- Leave Review button

---

### 10 Restaurant Reviews — Read + Write

Wire reviews to Supabase. Add review form submission.

**UI for review form:**

- Modal or inline form:
  - Your restriction type — radio buttons
  - Rating — 1-5 stars
  - Review text — textarea
  - Safe Items — tag input
  - Items to Avoid — tag input
  - Submit Review button

**Logic:**

- GET /api/restaurants/[id]/reviews — query restaurant_reviews
- POST /api/restaurants/[id]/reviews — server action to insert review
- Validate rating 1-5, review text not empty
- Extract safe_items and avoid_items as arrays
- Update restaurant rating average
- revalidatePath('/restaurants/[id]')
- PostHog events: `review_submitted`, `restaurant_viewed`

---

## Phase 4 — Community

### 11 Community Feed — Full UI

Build the complete community feed page UI with mock data.

**UI:**

- Filter bar:
  - Restriction Type filter
  - Category filter
  - Sort dropdown
- Create Post button
- Posts list:
  - Post cards with user avatar, username, posted time, restriction badge, title, preview text, category tag, engagement icons
  - Infinite scroll or pagination

---

### 12 Community Posts — Create + Read

Wire posts to Supabase. Add post creation form and realtime updates.

**UI for create post modal:**

- Title input
- Content textarea
- Restriction type dropdown
- Category radio buttons
- Post button

**Logic:**

- GET /api/community/posts — query posts with filters and pagination
- Realtime subscription to community_posts table
- POST /api/community/posts — server action to create post
- Validate title and content not empty
- Auto-populate user_id from session
- revalidatePath('/community')
- PostHog events: `post_created`, `community_feed_viewed`

---

### 13 Community Post Detail + Replies

Wire post detail page and replies.

**UI:**

- Full post content
- User info card
- Likes count with Like button
- Replies section:
  - Reply count
  - Reply cards with user info, reply text, likes, timestamp
  - Load More or pagination
  - Reply form with textarea and Post Reply button

**Logic:**

- GET /api/community/posts/[id] — query post + all replies
- Realtime subscription to community_replies
- POST /api/community/posts/[id]/replies — server action
- Validate reply text not empty
- Auto-populate user_id
- Update community_posts.replies_count
- revalidatePath('/community/[id]')
- PostHog event: `reply_created`

---

## Phase 5 — Messaging

### 14 Messages Page — Full UI

Build the complete messages (conversations) page UI with mock data.

**UI:**

- Conversations list:
  - Conversation cards with user avatar, display_name, last message preview, last message time, unread badge
  - Click to open conversation thread
- New Message button

---

### 15 Chat Thread — Realtime Messaging

Wire messaging to Supabase with realtime updates.

**UI:**

- Chat header — user avatar, display_name, Online status
- Message list:
  - Messages from both users, sent on right, received on left
  - Timestamps, read indicator
- Message input:
  - Textarea "Type your message..."
  - Send button

**Logic:**

- GET /api/messages/[userId] — query all messages between users
- Realtime subscription to direct_messages
- POST /api/messages — server action to send message
- Auto-populate from_user_id and to_user_id
- Mark incoming messages as read
- revalidatePath('/messages/[userId]')
- PostHog event: `message_sent`

---

## Phase 6 — Creator Marketplace

### 16 Creators Page — Full UI

Build the complete creators (marketplace) page UI with mock data.

**UI:**

- Filter bar:
  - Restriction Type filter
  - Rating filter
- Creator list in grid:
  - Creator cards with avatar, display_name, creator badge, star rating, bio, location, restriction type, specialties tags, avg earnings, Message button, View Profile button
  - Pagination or infinite scroll

---

### 17 Creator Profile + Earnings

Wire creator profiles and earnings dashboard.

**UI for creator profile:**

- Avatar, display_name, bio
- Star rating, review count
- Specialties tags
- Earnings card (only if viewing own profile):
  - Total earnings, pending earnings
  - Recent commissions list with restaurant, amount, date, status
  - Payout history

**Logic:**

- GET /api/creators/[username] — query creator profile
- GET /api/user/earnings (authenticated) — query creator_commissions for current user if is_creator = true
- Creator earnings calculated from creator_commissions
- Creator rating calculated from reviews

---

### 18 Creator Booking — Commission Tracking

Wire booking button to create commissions.

**UI:**

- On restaurant detail page, creator recommendation card with "Book via Creator's Recommendation" button
- Shows creator will earn £2.50

**Logic:**

- POST /api/restaurants/[id]/book/{creatorId} — server action
- Creates record in creator_commissions
- Sets commission_amount = 2.50, status = 'completed'
- PostHog event: `booking_created`

---

## Phase 7 — Dashboard + Polish

### 19 Dashboard Page — Full UI

Build the complete dashboard page UI with mock data.

**UI:**

- Welcome banner
- Stats cards — Restaurants Found, Reviews Left, Creator Earnings (if creator), Community Posts
- Recent Activity list
- Your Recommendations section (if creator)
- Suggested for You section

---

### 20 Dashboard Stats — Real Data

Wire stats cards to real Supabase data.

**Logic:**

- Restaurants Found — COUNT of restaurant_reviews from current user
- Reviews Left — COUNT of reviews
- Creator Earnings — SUM of commission_amount (if creator)
- Community Posts — COUNT of posts from user
- Recent Activity — query recent restaurants reviewed + posts created, order by timestamp DESC

---

### 21 Database Seeding + Test Data

Populate Supabase with realistic mock data for testing.

**Data to seed:**

- Restaurants: 500+ across 5 UK cities with restriction_types, cuisine, ratings
- Reviews: 1,500+ reviews from test users
- Community: 100+ posts, 50+ replies
- Test Users: 50 accounts with complete profiles, 10 marked as creators

---

### 22 Landing Page Polish

Refine landing page, ensure responsive design, optimize performance.

**Tasks:**

- Test on mobile, tablet, desktop
- Optimize images and lazy loading
- Ensure accessibility
- Fix typography and spacing
- Test auth flows
- Performance audit — target Lighthouse > 80

---

### 23 Demo Flow Preparation

Create a polished walkthrough.

**Walkthrough script:**

1. Show homepage
2. Register with test account
3. Complete profile setup
4. Search for restaurants, filter by restriction type
5. View restaurant reviews from community
6. Browse community posts
7. Message a creator
8. Toggle creator mode, show earnings
9. Show new posts appearing realtime

**Timing:** 5-7 minutes total

---

### 24 Final Testing + Bug Fixes

QA all features end-to-end. Fix critical bugs.

**Test checklist:**

- Auth: signup, login, logout, session persistence
- Search: all filters work, sorting, pagination
- Reviews: create, read, like
- Community: create post, reply, filter, sort
- Messaging: send, receive realtime, read status
- Creators: view profile, view earnings, make booking
- Mobile: responsive, bottom nav works
- Performance: pages load < 2s

---

## Feature Count

| Phase | Features |
|-------|----------|
| Phase 1 — Foundation | 4 |
| Phase 2 — Profile | 2 |
| Phase 3 — Restaurants | 4 |
| Phase 4 — Community | 3 |
| Phase 5 — Messaging | 2 |
| Phase 6 — Creators | 3 |
| Phase 7 — Polish | 6 |
| **Total** | **24** |
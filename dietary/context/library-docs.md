# Project Overview

## About the Project

DietaryID is a full stack community-driven restaurant discovery platform for teenagers and young adults with restricted diets. Users create a profile with their dietary restrictions, search for restaurants safe for their diet, read reviews from peers with the same restrictions, join a supportive community, and connect with creators who earn money by recommending restaurants. The entire platform is built on peer validation — real reviews from real people with real restrictions, not algorithms.

---

## The Problem It Solves

Teenagers with dietary restrictions (Crohn's, IBS, Celiac, etc.) face constant friction eating out. Generic restaurant apps don't understand restricted diets. Online reviews from non-restricted users don't help. Asking "is this safe for me?" requires knowing your body, your restrictions, and what other people with your exact restrictions have eaten successfully.

DietaryID eliminates this friction. Users find restaurants reviewed by peers with identical restrictions, join a community of people who understand their struggles, and connect with creators (experienced users) who know the safest restaurants in their city.

The result: teenagers can eat normally, confidently, and without constant anxiety.

---

## Pages

```
/                  → Homepage
/login             → Login page
/signup            → Signup page
/dashboard         → Stats, recent activity, welcome
/profile           → Profile form, dietary restrictions, preferences
/restaurants       → Search + filters + results list
/restaurants/[id]  → Restaurant detail + reviews + creator recommendations
/community         → Community feed + posts + discussions
/community/[id]    → Post detail + replies
/messages          → Conversations list
/messages/[userId] → Chat thread with user
/creators          → Creator marketplace + leaderboard
/creators/[username] → Creator profile + earnings + specialties
```

---

## Navigation

Top navbar on desktop. Bottom nav on mobile. Four main sections:

**Desktop (Top Navbar):**
```
DietaryID    Search Restaurants    Community    Creators    Messages    Profile
```

**Mobile (Bottom Navigation):**
```
Home    Search    Community    Messages    Profile
```

---

## Core User Flow

### Homepage

- Hero section — "Find Restaurants. Join Your Community. Eat Normally."
- How It Works — 4-step breakdown
- Features section — 3 value props
- Testimonial section
- Bottom CTA — Join Thousands
- Logged in users → redirect to /dashboard
- Logged out users → can explore homepage, CTA redirects to /signup

### Onboarding

- User signs up via Supabase auth (Google or GitHub OAuth)
- On signup → redirect to /profile
- Profile form requires: display_name, location, dietary_restrictions
- Until profile is complete → banner on /dashboard saying "Complete your profile"

### Profile Setup

- User fills profile form — dietary restrictions, location, preferences
- Dietary restrictions — checkboxes: Crohn's, IBS, Celiac, Gluten-Free, Lactose Intolerant, Other
- Location — city, country
- Preferences — remote (local only / any)
- Social links — optional LinkedIn, Instagram
- Can become a creator — toggle switch
- If creator → add bio and specialties (checkboxes)
- Save button → saves to profiles table
- On return visit → form pre-fills with existing data

### Finding Restaurants

- User goes to /restaurants page
- Search controls at top:
  - Restriction type dropdown (pre-filled with user's restrictions)
  - Location input (pre-filled with user's location)
  - Find Restaurants button
- Search triggers:
  - GET /api/restaurants/search with restrictions and city
  - Results appear below (20 per page)
  - Success message: "Found 37 restaurants safe for your diet"
- Restaurant cards show:
  - Name, rating (⭐ 4.5), distance, safe-for badges, cuisine tags
  - View Details button
- Filter options:
  - Rating filter (All / 4.5+ / 4.0+)
  - Distance slider if location set
- Sort options:
  - By rating (default)
  - By newest
  - By distance

### Restaurant Details Page

- Restaurant name, address, phone, website, menu link
- Rating (⭐ 4.5 / 23 reviews)
- Safe for badges — Crohn's, IBS, etc.
- Cuisine tags
- About section — brief description
- Reviews section:
  - Filter by restriction type — All / Crohn's / IBS / etc.
  - Review cards from other users:
    - User avatar + username, rating, review text
    - Safe items list (what they ordered and it was safe)
    - Avoid items list (what caused problems)
    - Helpful count + button
  - Load more or pagination
  - Leave Review button
- Creator Recommendations section:
  - Card showing creators who recommend this restaurant
  - Creator avatar + username, rating
  - "Best Crohn's-friendly place I know" (why they recommend)
  - View Creator Profile button
- Leave Review button at bottom

### Leaving a Review

- Modal form:
  - Your restriction type — radio buttons (auto-filled from profile)
  - Rating — 1-5 stars
  - Review text — textarea
  - Safe items you found — tag input (e.g., "Grilled salmon", "Steamed veg")
  - Items to avoid — tag input (e.g., "Cream sauce", "Spicy curry")
  - Submit Review button
- After submit:
  - Review appears in reviews list
  - Restaurant rating updates
  - User returns to restaurant detail page

### Community Feed

- Posts from other users with same restrictions
- Filter bar:
  - Restriction type filter — All / Crohn's / IBS / etc.
  - Category filter — All / Tips / Restaurant / Advice / Celebrate / Question
  - Sort dropdown — Newest / Most Liked / Most Commented
- Create Post button (prominent)
- Posts list:
  - Post cards with:
    - User avatar + username + creator badge (if creator)
    - Posted time ago
    - Post title
    - Preview text (first 150 chars)
    - Category tag
    - Engagement icons — likes count, replies count
  - Infinite scroll or pagination

### Creating a Post

- Modal form:
  - Title input (max 100 chars)
  - Content textarea (max 1000 chars)
  - Restriction type dropdown (optional, shows current user's primary restriction)
  - Category radio buttons — Tips / Restaurant / Advice / Celebrate / Question
  - Post button
- After post:
  - Post appears at top of community feed
  - All users with that restriction see it
  - Realtime — appears instantly on other users' feeds

### Community Post Detail

- Full post content
- User info card — avatar, username, creator badge, follow button
- Likes count + Like button
- Replies section:
  - Reply count
  - Reply cards with:
    - User avatar + username
    - Reply text
    - Likes count + button
    - Timestamp
  - Load more or pagination
  - Reply form:
    - Textarea "Write your reply..."
    - Post Reply button
- Realtime — new replies appear instantly

### Direct Messaging

- /messages page shows conversations list:
  - Conversation cards with:
    - User avatar + username
    - Last message preview
    - Last message time
    - Unread badge (if unread)
  - Click to open chat thread
- Chat thread page (/messages/[userId]):
  - User avatar + username + Online status
  - Message list (scrollable):
    - Sent messages on right (blue)
    - Received messages on left (gray)
    - Timestamps
    - Read indicator
  - Message input at bottom:
    - Textarea "Type your message..."
    - Send button
  - Realtime — new messages appear instantly

### Creator Marketplace

- /creators page shows creators:
  - Filter by restriction type
  - Filter by rating (All / 4.5+ / 4.0+)
  - Creator cards in grid:
    - Avatar
    - Username + creator badge
    - Star rating (⭐ 4.8 / 127 reviews)
    - Bio (first 100 chars)
    - Location + restriction type
    - Specialties tags
    - Avg earnings display
    - Message button
    - View Profile button
  - Pagination or infinite scroll

### Creator Profile

- Avatar, username, bio
- Star rating + review count
- Specialties tags
- Link to message creator
- If viewing own creator profile:
  - Earnings card:
    - Total earnings: £450.00
    - Pending: £50.00
    - Paid: £400.00
  - Recent commissions list:
    - Restaurant name, amount, date, status (pending/paid)
  - Payout history

### Becoming a Creator

- Toggle in /profile page — "Become a Creator"
- Creator bio field (appears when toggle on)
- Creator specialties checkboxes:
  - Restaurant recommendations
  - Meal planning
  - Social tips
  - Dating advice
  - Career advice
- After enabling:
  - Profile shows "Creator" badge
  - Earnings dashboard available
  - When users book via your recommendations — you earn £2.50 per booking
  - Rating calculated from reviews you receive

### Dashboard

- Welcome banner — "Welcome back, [name]!"
- Incomplete profile banner (if needed)
- Stats bar — 4 cards:
  - Restaurants Found — total restaurants you've reviewed
  - Reviews Left — total reviews you've submitted
  - Creator Earnings (if creator) — total earned
  - Community Posts — total posts you've created
- Recent activity list:
  - "You reviewed Healthy Bowl Co" — 2 hours ago
  - "Found 5 new restaurants" — 1 day ago
  - "Post got 10 likes" — 2 days ago
- Your Recommendations section (if creator):
  - Top restaurants you've recommended
  - How many people booked through you
- Suggested for You section:
  - Restaurants based on your restriction + location
  - "Your perfect matches this week"

---

## Data Architecture

### Profile Data

- Lives in `profiles` table
- Set once during onboarding
- Updated when user edits profile
- Used for:
  - Filtering restaurants by restriction type
  - Personalizing community feed
  - Creator specialties

### Restaurant Data

- Lives in `restaurants` table
- Created when users submit restaurants (or seeded initially)
- Restaurant rating calculated from average review rating
- Restaurant review_count updated when reviews are submitted

### Review Data

- Lives in `restaurant_reviews` table
- One review per user per restaurant (enforced by unique constraint)
- Contains: safe_items array, avoid_items array
- Used to display "What works" and "What to avoid" on detail page

### Community Data

- Posts live in `community_posts` table
- Replies live in `community_replies` table
- Realtime — changes appear instantly on all users' feeds
- Never modified after creation (except likes_count)

### Messaging Data

- Messages live in `direct_messages` table
- Bi-directional — both users see same conversation
- Realtime — new messages appear instantly

### Creator Data

- Creator flag on `profiles` table (is_creator boolean)
- Commissions live in `creator_commissions` table
- One row per booking
- Amount always £2.50, status always "completed"

---

## Features In Scope

- Supabase authentication (Google + GitHub OAuth)
- Profile setup with dietary restrictions, location, preferences
- Restaurant search with filters (restriction type, city, rating, distance)
- Restaurant details page with reviews and safe/avoid items
- Review submission with restriction type, rating, safe items, avoid items
- Community posts creation and reading
- Community replies creation and reading
- Direct messaging between users (realtime)
- Creator marketplace — list and view creators
- Creator enablement — users can toggle creator mode
- Creator earnings dashboard — show total, pending, paid, commissions history
- Creator recommendations — when users book through creator, creator earns £2.50
- Creator ratings — calculated from reviews
- Dashboard with stats, recent activity, suggested restaurants
- Restaurant search results pagination
- Realtime community posts and messages
- PostHog event tracking for all key actions
- All data persisted in Supabase
- Mobile responsive design

---

## Features Out of Scope

- Admin dashboard or moderation tools
- Content flagging or reporting
- User verification or trust badges
- Payment processing or actual payouts
- Email or push notifications
- Notification center in-app
- Follow/unfollow system
- Block/mute users
- Verified creator badges (v2)
- Creator sponsorships or featured listings
- In-app messaging notifications
- Restaurant menu scraping
- Restaurant hours scraping
- Integration with reservation systems (OpenTable, Resy)
- Sharing posts to social media
- User search
- User profiles visible to everyone (private profiles only)
- Groups or team functionality
- Dietary plan recommendations
- Nutritionist integration
- In-app video or media uploads
- Dark mode
- Multiple languages
- Analytics page (charts live on dashboard only)
- Mobile app
- Payment or subscription system
- API access for third parties
- Browser extension

---

## PostHog Events

```typescript
restaurant_search; // { restrictions, city, resultsCount }
restaurant_viewed; // { restaurantId, restriction }
review_submitted; // { restaurantId, rating, restriction }
post_created; // { category, restrictionType }
post_viewed; // { postId, restriction }
reply_created; // { postId }
message_sent; // { toUserId }
creator_booking; // { creatorId, restaurantId }
profile_completed; // { restrictionCount, isCreator }
creator_enabled; // { userId }
```

---

## Target User

A teenager or young adult (14-25) who:

- Has a dietary restriction (Crohn's, IBS, Celiac, etc.)
- Wants to eat at restaurants without constant anxiety
- Wants advice from peers with the same restrictions
- Values community and peer validation over algorithms
- Is comfortable with a mobile-first web application
- May want to earn money helping others (creator path)

---

## Success Criteria

- User can sign up and complete profile in under 3 minutes
- User can search for restaurants and find safe options in their city within 30 seconds
- Restaurant reviews from users with same restriction feel accurate and helpful
- Community posts provide real value (tips, advice, stories, solidarity)
- Creator marketplace shows real earning potential (users see creators earning £50-200/month)
- Messaging works smoothly with realtime updates (messages appear instantly)
- Restaurant search results are relevant and include safe options
- Dashboard shows meaningful stats after first day of use
- All user data persists correctly in Supabase
- PostHog events fire correctly for all key user actions
- UI is visually consistent and mobile-responsive across all pages
- App feels fast (pages load < 2 seconds)
- Community feels safe and supportive (no spam, harassment, or misinformation visible on MVP)
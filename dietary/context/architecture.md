# DietaryID Architecture

## Stack

| Layer                          | Tool                     | Purpose                                          |
| ------------------------------ | ------------------------ | ------------------------------------------------ |
| Framework                      | Next.js 16 (App Router)  | Full stack framework                             |
| Auth + DB + Realtime           | Supabase                 | PostgreSQL, JWT Auth, Realtime subscriptions    |
| Analytics                      | PostHog                  | Event tracking and dashboard charts              |
| Styling                        | Tailwind CSS + shadcn/ui | UI components and styling                        |
| Language                       | TypeScript strict        | Throughout                                       |

---

## Folder Structure

```
/
├── app/
│   ├── layout.tsx                          → Root layout, PostHog provider
│   ├── page.tsx                            → Homepage
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx                   → Login page
│   │   ├── signup/
│   │   │   └── page.tsx                   → Signup page
│   │   └── callback/
│   │       └── page.tsx                   → OAuth callback handler
│   ├── dashboard/
│   │   └── page.tsx                       → Main dashboard
│   ├── profile/
│   │   └── page.tsx                       → Profile form + dietary restrictions
│   ├── restaurants/
│   │   ├── page.tsx                       → Search + filters + results list
│   │   └── [id]/
│   │       └── page.tsx                   → Restaurant detail + reviews
│   ├── community/
│   │   ├── page.tsx                       → Community feed
│   │   └── [postId]/
│   │       └── page.tsx                   → Post detail + replies
│   ├── messages/
│   │   ├── page.tsx                       → Conversations list
│   │   └── [userId]/
│   │       └── page.tsx                   → Chat thread
│   ├── creators/
│   │   ├── page.tsx                       → Creator marketplace
│   │   └── [username]/
│   │       └── page.tsx                   → Creator profile + earnings
│   └── api/
│       ├── restaurants/
│       │   ├── search/route.ts            → Restaurant search endpoint
│       │   └── [id]/reviews/route.ts      → Reviews for restaurant
│       ├── community/
│       │   ├── posts/route.ts             → GET/POST posts
│       │   └── posts/[id]/replies/route.ts → GET/POST replies
│       ├── messages/
│       │   ├── conversations/route.ts     → GET conversations
│       │   └── messages/route.ts          → POST/GET messages
│       └── creators/
│           └── [id]/book/route.ts         → Book creator recommendation
├── actions/
│   ├── profile.ts                         → Profile save + update
│   ├── posts.ts                           → Create/delete community posts
│   ├── replies.ts                         → Create/delete replies
│   ├── messages.ts                        → Send/read messages
│   └── restaurants.ts                     → Submit reviews, save restaurants
├── components/
│   ├── ui/                                → shadcn/ui components only
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── BottomNav.tsx
│   ├── homepage/
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   └── Features.tsx
│   ├── dashboard/
│   │   ├── StatsBar.tsx
│   │   ├── RecentActivity.tsx
│   │   └── AnalyticsCharts.tsx
│   ├── profile/
│   │   ├── ProfileForm.tsx
│   │   ├── RestrictionSelect.tsx
│   │   └── CompletionIndicator.tsx
│   ├── restaurants/
│   │   ├── SearchControls.tsx
│   │   ├── RestaurantList.tsx
│   │   ├── RestaurantCard.tsx
│   │   ├── RestaurantFilters.tsx
│   │   ├── RestaurantDetail.tsx
│   │   ├── ReviewList.tsx
│   │   ├── ReviewForm.tsx
│   │   └── Pagination.tsx
│   ├── community/
│   │   ├── PostsList.tsx
│   │   ├── PostCard.tsx
│   │   ├── PostDetail.tsx
│   │   ├── CreatePost.tsx
│   │   ├── ReplyList.tsx
│   │   └── ReplyForm.tsx
│   ├── messages/
│   │   ├── ConversationList.tsx
│   │   ├── ChatThread.tsx
│   │   └── MessageInput.tsx
│   └── creators/
│       ├── CreatorList.tsx
│       ├── CreatorCard.tsx
│       ├── CreatorProfile.tsx
│       └── EarningsView.tsx
├── lib/
│   ├── supabase-client.ts                 → Supabase browser client instance
│   ├── supabase-server.ts                 → Supabase server client
│   ├── posthog-client.ts                  → PostHog browser client
│   ├── posthog-server.ts                  → PostHog server client
│   └── utils.ts                           → Shared utility functions
├── hooks/
│   ├── useRestaurants.ts                  → Restaurant search + pagination
│   ├── usePosts.ts                        → Community posts + filtering
│   ├── useMessages.ts                     → Real-time message subscription
│   └── useProfile.ts                      → Current user profile
└── types/
    └── index.ts                           → Global TypeScript types
```

---

## System Boundaries

| Folder        | Owns                                                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------------------- |
| `app/`        | Pages and API routes only. No business logic.                                                              |
| `actions/`    | Server Actions for UI-triggered mutations only. Profile save, post create, message send.                  |
| `components/` | UI only. No data fetching logic. No direct DB calls. Data passed via props from pages.                     |
| `lib/`        | Third party client initialisation and shared utilities only.                                              |
| `hooks/`      | React hooks for data fetching + subscriptions. Never call database directly.                              |
| `types/`      | TypeScript types shared across the project.                                                               |

---

## Data Flow

### UI Mutations (Server Actions)

```
User interaction in component
        ↓
Server Action in actions/
        ↓
Supabase DB write
        ↓
PostHog event logged
        ↓
Revalidate or redirect
```

### Restaurant Search (API Routes)

```
User types in SearchControls
        ↓
Debounced fetch to /api/restaurants/search
        ↓
Query: SELECT * FROM restaurants WHERE restriction_types && ARRAY[user_restriction]
        ↓
Results returned + cached in local state
        ↓
User sees results instantly
```

### Community Posts (Realtime)

```
User opens Community Feed
        ↓
Component subscribes via usePosts()
        ↓
Supabase realtime listener attached to posts table
        ↓
New post submitted by another user
        ↓
Realtime event fires — local state updates instantly
        ↓
User sees new post appear without page refresh
```

### Direct Messages (Realtime)

```
User opens chat with another user
        ↓
Component subscribes via useMessages(userId)
        ↓
Supabase realtime listener on direct_messages
        ↓
User sends message via Server Action
        ↓
Message saved + realtime event fires
        ↓
Both sides see message instantly
```

---

## Supabase Database Schema

### `auth.users` (Supabase managed)

Pre-configured by Supabase. No manual schema needed.

### `profiles`

| Column              | Type        | Notes                                        |
| ------------------- | ----------- | -------------------------------------------- |
| id                  | uuid        | References auth.users                        |
| email               | text        |                                              |
| username            | text        | Unique                                       |
| display_name        | text        |                                              |
| avatar_url          | text        |                                              |
| bio                 | text        |                                              |
| location            | text        | City, country                                |
| restriction_types   | text[]      | ['Crohn\'s', 'IBS', 'Celiac']               |
| dietary_notes       | text        | Additional allergies, restrictions           |
| years_with_condition| integer     |                                              |
| is_creator          | boolean     | Default FALSE                                |
| creator_bio         | text        |                                              |
| creator_rating      | float       | Default 0                                    |
| creator_review_count| integer     | Default 0                                    |
| creator_specialties | text[]      | ['Restaurant Recommendations', ...]         |
| total_earnings      | decimal     | Default 0                                    |
| pending_earnings    | decimal     | Default 0                                    |
| remote_preference   | text        | 'any' / 'local_only'                        |
| preferred_cities    | text[]      |                                              |
| linkedin_url        | text        |                                              |
| instagram_url       | text        |                                              |
| is_complete         | boolean     | True when required fields filled             |
| created_at          | timestamptz |                                              |
| updated_at          | timestamptz |                                              |

### `restaurants`

| Column              | Type        | Notes                                        |
| ------------------- | ----------- | -------------------------------------------- |
| id                  | uuid        |                                              |
| name                | text        |                                              |
| address             | text        |                                              |
| city                | text        |                                              |
| lat                 | float       |                                              |
| lng                 | float       |                                              |
| restriction_types   | text[]      | ['Crohn\'s', 'IBS', 'GF']                   |
| cuisine             | text[]      |                                              |
| rating              | float       | Default 0                                    |
| review_count        | integer     | Default 0                                    |
| phone               | text        |                                              |
| website             | text        |                                              |
| menu_url            | text        |                                              |
| created_by_user_id  | uuid        | References profiles                          |
| source              | text        | 'user_submitted' or 'seed_data'             |
| created_at          | timestamptz |                                              |
| updated_at          | timestamptz |                                              |

**Indexes:**
- `idx_restaurants_restriction` — GIN on restriction_types
- `idx_restaurants_city` — ON city

### `restaurant_reviews`

| Column              | Type        | Notes                                        |
| ------------------- | ----------- | -------------------------------------------- |
| id                  | uuid        |                                              |
| restaurant_id       | uuid        | References restaurants                       |
| user_id             | uuid        | References profiles                          |
| restriction_type    | text        |                                              |
| rating              | integer     | 1-5                                          |
| review_text         | text        |                                              |
| safe_items          | text[]      | ["Grilled salmon", "Steamed veg"]           |
| avoid_items         | text[]      | ["Cream sauce", "Spicy"]                    |
| helpful_count       | integer     | Default 0                                    |
| created_at          | timestamptz |                                              |
| updated_at          | timestamptz |                                              |
| **Unique constraint** | (restaurant_id, user_id) | One review per user per restaurant |

**Indexes:**
- `idx_reviews_restaurant` — ON restaurant_id
- `idx_reviews_user` — ON user_id

### `community_posts`

| Column              | Type        | Notes                                        |
| ------------------- | ----------- | -------------------------------------------- |
| id                  | uuid        |                                              |
| user_id             | uuid        | References profiles                          |
| title               | text        |                                              |
| content             | text        |                                              |
| restriction_type    | text        | NULL = all restrictions                      |
| category            | text        | 'Tips', 'Restaurant', 'Advice', 'Celebrate' |
| likes_count         | integer     | Default 0                                    |
| replies_count       | integer     | Default 0                                    |
| created_at          | timestamptz |                                              |
| updated_at          | timestamptz |                                              |

**Indexes:**
- `idx_posts_user` — ON user_id
- `idx_posts_restriction` — ON restriction_type
- `idx_posts_created` — ON created_at DESC

### `community_replies`

| Column              | Type        | Notes                                        |
| ------------------- | ----------- | -------------------------------------------- |
| id                  | uuid        |                                              |
| post_id             | uuid        | References community_posts                   |
| user_id             | uuid        | References profiles                          |
| content             | text        |                                              |
| likes_count         | integer     | Default 0                                    |
| created_at          | timestamptz |                                              |
| updated_at          | timestamptz |                                              |

**Indexes:**
- `idx_replies_post` — ON post_id
- `idx_replies_user` — ON user_id

### `direct_messages`

| Column              | Type        | Notes                                        |
| ------------------- | ----------- | -------------------------------------------- |
| id                  | uuid        |                                              |
| from_user_id        | uuid        | References profiles                          |
| to_user_id          | uuid        | References profiles                          |
| message             | text        |                                              |
| is_read             | boolean     | Default FALSE                                |
| created_at          | timestamptz |                                              |

**Indexes:**
- `idx_messages_from` — ON from_user_id
- `idx_messages_to` — ON to_user_id
- `idx_messages_created` — ON created_at DESC

### `creator_commissions`

| Column              | Type        | Notes                                        |
| ------------------- | ----------- | -------------------------------------------- |
| id                  | uuid        |                                              |
| creator_id          | uuid        | References profiles                          |
| restaurant_id       | uuid        | References restaurants                       |
| booking_user_id     | uuid        | References profiles                          |
| commission_amount   | decimal     | Default 2.50                                 |
| status              | text        | 'pending', 'completed', 'paid'              |
| created_at          | timestamptz |                                              |
| paid_at             | timestamptz |                                              |

**Indexes:**
- `idx_commissions_creator` — ON creator_id
- `idx_commissions_status` — ON status

---

## Authentication

- Provider: Supabase Auth
- Methods: Google OAuth, GitHub OAuth
- Protected routes: /dashboard, /profile, /restaurants, /community, /messages, /creators
- Public routes: /, /login, /signup
- Middleware in middleware.ts checks session on every protected route
- On login → redirect to /profile if incomplete, /dashboard if complete

---

## Supabase Client Pattern

Two separate Supabase clients — never mix them:

```typescript
// lib/supabase-client.ts
// Browser-side — used in client components + hooks
import { createBrowserClient } from "@supabase/ssr";
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// lib/supabase-server.ts
// Server-side — used in API routes, Server Actions
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createSupabaseServer = async () => {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );
};
```

---

## Restaurant Search Pattern

```typescript
// Supabase full-text search + filtering
const { data, error } = await supabase
  .from("restaurants")
  .select("*")
  .overlaps("restriction_types", userRestrictions)
  .eq("city", city)
  .order("rating", { ascending: false })
  .limit(20);
```

---

## Realtime Subscription Pattern

```typescript
// messages/[userId]/page.tsx
import { useMessagesRealtime } from "@/hooks/useMessages";

const [messages, setMessages] = useState<Message[]>([]);

useEffect(() => {
  const subscription = supabase
    .from("direct_messages")
    .on("*", (payload) => {
      if (payload.eventType === "INSERT") {
        setMessages((prev) => [...prev, payload.new as Message]);
      }
    })
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, [userId]);
```

---

## Data Access Pattern

**Server Actions (for mutations):**

```typescript
// actions/posts.ts
"use server";

export async function createPost(formData: FormData) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.from("community_posts").insert({
    user_id: user!.id,
    title: formData.get("title"),
    content: formData.get("content"),
    restriction_type: formData.get("restriction_type"),
    category: formData.get("category"),
  });

  if (error) throw error;
  revalidatePath("/community");
}
```

**Client Hooks (for queries):**

```typescript
// hooks/usePosts.ts
"use client";

export function usePosts(restrictionType?: string) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let query = supabase.from("posts").select("*");
      
      if (restrictionType) {
        query = query.or(
          `restriction_type.is.null,restriction_type.eq.${restrictionType}`,
        );
      }

      const { data } = await query.order("created_at", { ascending: false });
      setPosts(data || []);
    };

    fetchPosts();
  }, [restrictionType]);

  return posts;
}
```

**API Routes (for server-only operations):**

```typescript
// app/api/restaurants/search/route.ts
import { createSupabaseServer } from "@/lib/supabase-server";

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);

  const restrictions = searchParams.getAll("restriction");
  const city = searchParams.get("city");

  const { data } = await supabase
    .from("restaurants")
    .select("*")
    .overlaps("restriction_types", restrictions)
    .eq("city", city);

  return Response.json(data);
}
```

---

## Invariants

Rules the codebase must never violate:

- No business logic in UI. Components render data passed via props.
- Never mix Supabase clients. Browser client in components/hooks. Server client in actions/API routes.
- All Supabase writes use `createSupabaseServer()` in Server Actions + API routes. Never write from browser.
- All database query is scoped to current user. Never select data without `user_id` filter unless public data.
- Reviews must extract `safe_items` and `avoid_items`. Used for recommendations. If missing, prompt user.
- Creator commissions always have amount + status. Default £2.50, status defaults to 'completed'.
- All errors handled gracefully. No unhandled exceptions thrown to user.
- Community posts always have category. Never allow null. Use dropdown on form.
- Direct messages are bi-directional. Both users see same thread. No separate "inbox" + "sent".
- Creator profile requires is_creator = true. Only show earnings/specialties if flag set.
- PostHog events logged for key actions. User signup, restaurant search, post created, message sent.
- Restriction types stored as lowercase arrays. Normalize on insert: `['crohns', 'ibs']`.
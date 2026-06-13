# Code Standards

Implementation rules and conventions for the entire project. The engineer must follow these in every session without exception. These rules prevent pattern drift across sessions.

---

## Engineering Mindset

The engineer on this project operates with these principles:

- **Think before implementing** — understand what is being built and why before writing a single line
- **Read context files first** — never assume, always verify against architecture.md
- **Scope is sacred** — only build what the current feature requires. Never go beyond scope
- **Every feature must be testable** — if it cannot be verified immediately after implementation, it is incomplete
- **Clean over clever** — simple readable code that a junior developer can understand is always preferred
- **One thing at a time** — complete one feature fully before touching the next
- **Failures are expected** — wrap database operations in try/catch, log failures, never let one failure crash everything

---

## TypeScript

- Strict mode enabled in tsconfig.json — no exceptions
- Never use `any` — use `unknown` and narrow the type
- Never use type assertions (`as SomeType`) unless absolutely necessary and commented why
- All function parameters and return types must be explicitly typed
- Use `type` for object shapes and unions — use `interface` only for extendable component props
- All async functions must have proper error handling — never let promises float unhandled
- Use `const` by default — only use `let` when reassignment is necessary

---

## Next.js 16 Conventions

- App Router only — no Pages Router
- React 19 — use React 19 APIs throughout
- All components are Server Components by default
- Only add `"use client"` when the component requires:
  - useState or useReducer
  - useEffect
  - Browser APIs
  - Event listeners
  - Third party client-only libraries (PostHog browser side)
- Never add `"use client"` to layout files unless absolutely required
- Data fetching happens in Server Components — never fetch in Client Components directly
- Route handlers live in `app/api/` — never put business logic directly in route handlers
- Server Actions live in `actions/` — never define Server Actions inline in components
- Caching is uncached by default — all dynamic code runs at request time
- Always read Next.js documentation before implementing any Next.js specific feature

---

## File and Folder Naming

- Folders: kebab-case — `restaurants`, `community-posts`, `creator-dashboard`
- Component files: PascalCase — `RestaurantCard.tsx`, `ReviewForm.tsx`
- Utility files: camelCase — `supabase-client.ts`, `posthog-server.ts`
- Type files: camelCase — `index.ts`
- API route files: always `route.ts`
- Server Action files: camelCase — `profile.ts`, `restaurants.ts`, `posts.ts`
- One component per file — never export multiple components from one file
- Index files only in `components/ui/` — never barrel export from other folders

---

## Component Structure

Every component follows this exact order:

```typescript
"use client"; // only if needed

// 1. External imports
import { useState } from "react";
import { Button } from "@/components/ui/button";

// 2. Internal imports
import { SearchControls } from "@/components/restaurants/SearchControls";

// 3. Type definitions
type Props = {
  restaurantId: string;
  rating: number;
};

// 4. Component
export function ComponentName({ restaurantId, rating }: Props) {
  // state
  // derived values
  // handlers
  // return JSX
}
```

- Never use default exports for components — always named exports
- Props type defined directly above the component — not in a separate types file unless shared
- No inline styles — all styling via Tailwind classes using CSS variables from ui-tokens.md

---

## API Route Handlers

```typescript
// app/api/restaurants/search/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const restrictions = searchParams.getAll("restriction");

    // validate parameters
    if (!city || restrictions.length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing required parameters" },
        { status: 400 },
      );
    }

    const supabase = await createSupabaseServer();
    
    // query database
    const { data, error } = await supabase
      .from("restaurants")
      .select("*")
      .overlaps("restriction_types", restrictions)
      .eq("city", city)
      .order("rating", { ascending: false })
      .limit(20);

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("[restaurants/search]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

- Every route handler has a try/catch
- Every route handler validates the request body/params before processing
- Errors are logged with the route path as prefix: `[restaurants/search]`
- Always return `{ success: boolean, data?: T, error?: string }`
- Never return raw data without the success wrapper

---

## Server Actions

```typescript
// actions/restaurants.ts

"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServer } from "@/lib/supabase-server";

export async function submitReview(formData: ReviewFormData) {
  try {
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    // validate
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      return { success: false, error: "Invalid rating" };
    }

    // write to DB
    const { error } = await supabase
      .from("restaurant_reviews")
      .insert({
        restaurant_id: formData.restaurantId,
        user_id: user.id,
        rating: formData.rating,
        review_text: formData.reviewText,
        safe_items: formData.safeItems,
        avoid_items: formData.avoidItems,
        restriction_type: formData.restrictionType,
      });

    if (error) throw error;

    revalidatePath(`/restaurants/${formData.restaurantId}`);
    return { success: true };
  } catch (error) {
    console.error("[actions/restaurants]", error);
    return { success: false, error: "Failed to submit review" };
  }
}
```

- Every Server Action has a try/catch
- Every Server Action returns `{ success: boolean, error?: string }`
- Always call `revalidatePath` after mutations that affect page data
- Never throw from Server Actions — always return the error
- Always check authentication first with `supabase.auth.getUser()`

---

## Custom Hooks

```typescript
// hooks/useRestaurants.ts

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";

type UseRestaurantsOptions = {
  city?: string;
  restrictions?: string[];
};

export function useRestaurants(options: UseRestaurantsOptions) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase.from("restaurants").select("*");

        if (options.restrictions?.length) {
          query = query.overlaps("restriction_types", options.restrictions);
        }

        if (options.city) {
          query = query.eq("city", options.city);
        }

        const { data, error: err } = await query
          .order("rating", { ascending: false })
          .limit(20);

        if (err) throw err;
        setRestaurants(data || []);
      } catch (err) {
        console.error("[useRestaurants]", err);
        setError(err instanceof Error ? err.message : "Failed to load restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [options.city, options.restrictions?.join(",")]);

  return { restaurants, loading, error };
}
```

- Every hook has error and loading states
- Every hook has proper cleanup (especially for subscriptions)
- Hooks return loading and error states to components
- Never let a hook throw — always return error state

---

## Realtime Subscriptions

```typescript
// hooks/useMessagesRealtime.ts

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

export function useMessagesRealtime(userId: string, otherUserId: string) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Initial fetch
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("direct_messages")
        .select("*")
        .or(`and(from_user_id.eq.${userId},to_user_id.eq.${otherUserId}),and(from_user_id.eq.${otherUserId},to_user_id.eq.${userId})`)
        .order("created_at", { ascending: true });

      setMessages(data || []);
    };

    fetchMessages();

    // Subscribe to realtime
    const subscription = supabase
      .channel(`messages-${userId}-${otherUserId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "direct_messages",
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
        },
      )
      .subscribe();

    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, [userId, otherUserId]);

  return messages;
}
```

- Every subscription has proper unsubscribe in cleanup
- Every subscription filters by the correct user_id
- Subscriptions use channel names to avoid conflicts
- Never leave a subscription active after component unmounts

---

## Error Handling

- Never use empty catch blocks — always log or return error state
- Console errors always include context prefix: `[component/hook/action name]`
- User-facing errors must be human readable — never expose raw error messages
- API errors return `status: 500` with generic message — never expose internals
- Database errors are logged but never shown to user — log and return generic message

```typescript
// Good
try {
  const result = await someAsyncOperation();
} catch (error) {
  console.error("[ComponentName]", error);
  setError("Failed to load restaurants");
}

// Never
try {
  const result = await someAsyncOperation();
} catch (error) {
  // silent failure
}
```

---

## PostHog Events

All PostHog events must use these exact event names. Never invent new event names without updating this list first.

| Event                    | When                                         | Key Properties                    |
| ------------------------ | -------------------------------------------- | --------------------------------- |
| `restaurant_search`      | Search button clicked or auto-search         | restrictions, city, resultsCount  |
| `restaurant_viewed`      | User opens restaurant detail page            | restaurantId, restriction         |
| `review_submitted`       | User submits a review                        | restaurantId, rating              |
| `post_created`           | User creates a community post                | category, restrictionType          |
| `post_viewed`            | User opens a post detail page                | postId, restriction               |
| `reply_created`          | User replies to a post                       | postId                            |
| `message_sent`           | User sends a direct message                  | toUserId                          |
| `creator_booking`        | User books a creator recommendation          | creatorId, restaurantId           |
| `profile_completed`      | User completes profile for first time        | restrictionCount, isCreator       |
| `creator_enabled`        | User enables creator mode                    | userId                            |

Always fire these events with correct properties. These events power the dashboard charts and analytics.

---

## Supabase Client Usage

```typescript
// Browser context — Client Components only
import { supabase } from "@/lib/supabase-client";

// Server context — Server Components, Route Handlers, Server Actions
import { createSupabaseServer } from "@/lib/supabase-server";
const supabase = await createSupabaseServer();
```

- Never use the browser client in server context
- Never use the server client in browser context
- Always await createSupabaseServer() — it reads cookies asynchronously
- Always scope every query to the current user_id — never query without a user filter for private data
- Always check RLS policies are correct before deploying

---

## Database Query Patterns

```typescript
// Search with multiple filters
const { data } = await supabase
  .from("restaurants")
  .select("*")
  .overlaps("restriction_types", userRestrictions)
  .eq("city", city)
  .gte("rating", minRating)
  .order("rating", { ascending: false })
  .limit(20);

// Create with user context
const { data: { user } } = await supabase.auth.getUser();
const { data } = await supabase
  .from("community_posts")
  .insert({
    user_id: user!.id,
    title: formData.title,
    content: formData.content,
  })
  .select();

// Update with checks
const { data, error } = await supabase
  .from("profiles")
  .update({ is_creator: true })
  .eq("id", userId)
  .select();

if (error) throw error;
```

- Always select() after insert/update to get the returned data
- Always check error before using data
- Use .overlaps() for array filters (restriction_types, cuisines)
- Use .eq() for exact matches
- Use .gte(), .lte() for range queries
- Always order results by created_at DESC for time-series data

---

## Environment Variables

All environment variables defined in `.env.local` for development. Never hardcode any key, URL, or secret anywhere in the codebase.

| Variable                        | Used In                |
| ------------------------------- | ---------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | lib/supabase-client.ts |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | lib/supabase-client.ts |
| `SUPABASE_SERVICE_ROLE_KEY`     | lib/supabase-server.ts |
| `NEXT_PUBLIC_POSTHOG_KEY`       | lib/posthog-client.ts  |
| `NEXT_PUBLIC_POSTHOG_HOST`      | lib/posthog-client.ts  |

`NEXT_PUBLIC_` prefix means the variable is exposed to the browser. Never add `NEXT_PUBLIC_` to secret keys like service role key.

---

## Constants

Keep configuration values in one place. Never hardcode these values in components or functions.

```typescript
// lib/constants.ts

export const ITEMS_PER_PAGE = 20;
export const DEFAULT_RESTRICTION_TYPES = [
  "Crohn's",
  "IBS",
  "Celiac",
  "Gluten-Free",
  "Lactose Intolerant",
];
export const CREATOR_COMMISSION = 2.5; // £2.50
export const MIN_RESTAURANT_RATING = 0;
export const MAX_RESTAURANT_RATING = 5;
export const REVIEW_TEXT_MAX_LENGTH = 500;
export const POST_TITLE_MAX_LENGTH = 100;
export const POST_CONTENT_MAX_LENGTH = 1000;
```

Import and use these constants everywhere they are needed. Never hardcode these values.

---

## Import Aliases

Always use the `@/` alias — never use relative imports that go up more than one level.

```typescript
// Correct
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase-client";
import { CREATOR_COMMISSION } from "@/lib/constants";
import { submitReview } from "@/actions/restaurants";

// Never
import { Button } from "../../../components/ui/button";
```

---

## Comments

- No comments explaining what the code does — code must be self-explanatory
- Comments only for why — explaining a non-obvious decision
- Never leave TODO comments in committed code
- Comments for complex database queries explaining the filter logic

```typescript
// Good — explains why
// We filter by restriction_types using overlaps because we need to match ANY
// of the user's restrictions, not all of them
const { data } = await supabase
  .from("restaurants")
  .select("*")
  .overlaps("restriction_types", userRestrictions);

// Bad — explains what (unnecessary)
// Get all restaurants where restriction_types contains any user restriction
const { data } = await supabase
  .from("restaurants")
  .select("*")
  .overlaps("restriction_types", userRestrictions);
```

---

## Dependencies

Never install a new package without a clear reason. Before installing anything check:

1. Does shadcn/ui already have this component?
2. Does Next.js already provide this functionality?
3. Is there a simpler native solution?

Approved dependencies for this project:

- `@supabase/ssr` — Supabase client for Next.js
- `@supabase/supabase-js` — Supabase JS client
- `posthog-js` — PostHog browser client
- `posthog-node` — PostHog server client
- `zod` — Schema validation
- `lucide-react` — Icons
- `tailwindcss` — Styling
- `shadcn/ui` components — UI primitives

Do not install any other packages without strong justification.

---

## Session Management

Always check user session before performing user-scoped operations:

```typescript
// Server Action
export async function saveProfile(formData: ProfileFormData) {
  try {
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    // user is now guaranteed to exist
    await supabase.from("profiles").update(formData).eq("id", user.id);
    
    return { success: true };
  } catch (error) {
    console.error("[actions/profile]", error);
    return { success: false, error: "Failed to save profile" };
  }
}
```

- Always check auth before user-scoped operations
- Use non-null assertion (!) only after auth check
- Never assume user exists — always verify

---

## Testing Checklist

Before considering a feature complete:

- [ ] Component renders without errors
- [ ] All form inputs accept valid data
- [ ] Form validation works (empty fields, invalid ratings, etc)
- [ ] Server Action returns success/error correctly
- [ ] Data appears in database (verified in Supabase)
- [ ] Data appears on screen after mutation
- [ ] Page refresh keeps the data
- [ ] Mobile view is responsive
- [ ] PostHog event fires (check browser console)
- [ ] No console errors or warnings
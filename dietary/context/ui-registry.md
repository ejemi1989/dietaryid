# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes and structure
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components Built

### Layout

#### Navbar

**File:** `components/layout/Navbar.tsx`

**Usage:** Top navigation bar on desktop, links to main sections.

**Structure:**
```typescript
<nav className="border-b border-gray-200 bg-white sticky top-0 z-40">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    {/* Logo */}
    {/* Links */}
  </div>
</nav>
```

**Key Classes:**
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Navigation: `h-16 flex items-center justify-between`
- Border: `border-b border-gray-200`

---

#### Footer

**File:** `components/layout/Footer.tsx`

**Usage:** Footer on all pages with links and copyright.

**Structure:**
```typescript
<footer className="bg-gray-50 border-t border-gray-200 mt-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    {/* Content */}
  </div>
</footer>
```

**Key Classes:**
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Spacing: `py-12 mt-16`

---

#### BottomNav (Mobile)

**File:** `components/layout/BottomNav.tsx`

**Usage:** Mobile-only navigation at bottom of screen.

**Structure:**
```typescript
<nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white md:hidden">
  <div className="flex items-center justify-around h-16">
    {/* Nav items */}
  </div>
</nav>
```

**Key Classes:**
- Container: `fixed bottom-0 left-0 right-0`
- Height: `h-16`
- Mobile only: `md:hidden`

---

### Homepage

#### Navbar

**File:** `components/homepage/Navbar.tsx`

**Usage:** Top navigation bar with logo, nav links, Sign in, Sign up CTA. Mobile hamburger menu.

**Structure:**
```typescript
<nav className="relative z-30 bg-white rounded-[18px] flex items-center justify-between px-3.5 py-2.5 shadow-[var(--shadow-soft)]">
```

**Key Classes:**
- Container: `relative z-30 bg-white rounded-[18px] shadow-[var(--shadow-soft)]`
- Logo badge: `w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-[#ff9a6c] to-[#ff6a8e]`
- Nav links: `text-[var(--color-navy-soft)] text-[14.5px] font-medium px-3.5 py-2 rounded-[10px] hover:bg-[var(--color-nav-hover)]`
- CTA button: `bg-[var(--color-navy)] text-white font-semibold text-[14.5px] px-5.5 py-2.5 rounded-[11px]`

---

#### Hero

**File:** `components/homepage/Hero.tsx`

**Usage:** Landing page hero with headline, floating stat cards, chat card, and CTAs.

**Structure:**
```typescript
<header className="text-center py-[70px] pb-[30px] relative">
  <h1 className="text-[clamp(36px,5.6vw,62px)] font-extrabold leading-[1.12] text-[var(--color-navy)] tracking-[-1.5px]">
  <div className="relative max-w-[920px] mx-auto mt-[50px] min-h-[480px]">
```

**Key Classes:**
- Heading: `text-[clamp(36px,5.6vw,62px)] font-extrabold text-[var(--color-navy)] tracking-[-1.5px]`
- Subtext: `max-w-[520px] mx-auto mt-[22px] text-[16px] leading-[1.6] text-[var(--color-muted)]`
- Chat card: `max-w-[380px] mx-auto bg-[var(--color-chat-bg)] rounded-[24px] shadow-[var(--shadow-chat)]`
- Chat orb: `w-[64px] h-[64px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffb37c,#ff6a8e)] animate-[pulse_3s_ease-in-out_infinite]`
- Chat input: `rounded-full p-[3px] bg-gradient-to-r from-[#ff8a5c] to-[#ff6a8e]`
- Floating cards: `bg-[var(--color-fc-bg)] rounded-[18px] shadow-[var(--shadow-float)]`
- Safety ring: `bg-[conic-gradient(#ff8a5c_0_88%,#f2e4e8_88%_100%)]`
- Primary CTA: `bg-[var(--color-navy)] text-white px-7.5 py-3.5 rounded-[11px]`
- Secondary CTA: `bg-white text-[var(--color-navy)] shadow-[var(--shadow-card)]`

**Float card positions (from HTML):**
- fc-1: `top-[30px] left-[2%] -rotate-[7deg] w-[225px]`
- fc-2: `top-[140px] left-[6%] -rotate-[4deg] w-[210px]`
- fc-3: `bottom-[40px] left-[9%] -rotate-[6deg] w-[215px]`
- fc-4: `top-[15px] right-[4%] rotate-[6deg] w-[200px]`
- fc-5: `bottom-[55px] right-[6%] rotate-[5deg] w-[215px]`

---

#### Partners

**File:** `components/homepage/Partners.tsx`

**Usage:** Partner logo cloud section.

**Key Classes:**
- Container: `text-center py-[30px] pb-[60px]`
- Heading: `text-[22px] font-bold text-[var(--color-navy)] mb-[34px]`
- Logos: `flex justify-center gap-[clamp(24px,5vw,64px)] flex-wrap opacity-55`

---

#### Features

**File:** `components/homepage/Features.tsx`

**Usage:** 3-column feature cards section.

**Key Classes:**
- Section: `py-[70px]`
- Tag: `bg-white border border-[var(--color-tag-border)] rounded-[var(--radius-pill)] px-4 py-1.5 text-[12.5px] font-semibold`
- Heading: `text-[clamp(30px,4vw,44px)] font-extrabold text-[var(--color-navy)] tracking-[-1px]`
- Card: `bg-[var(--color-feature-card)] rounded-[var(--radius-xl)] px-7 py-[30px] shadow-[var(--shadow-card)] hover:-translate-y-1.5`
- Icon: `w-[52px] h-[52px] rounded-[var(--radius-icon)] bg-gradient-to-br text-[24px] text-white`
- Mini stat: `bg-[var(--color-feature-mini)] rounded-[14px] px-4 py-3.5`

---

#### Testimonials

**File:** `components/homepage/Testimonials.tsx`

**Usage:** 3-column testimonial cards.

**Key Classes:**
- Card: `rounded-[var(--radius-lg)] px-[26px] py-7 shadow-[var(--shadow-card)] gap-[18px]`
- t-1: `bg-gradient-to-b from-[#fffdfc] to-[#fdeee8]`
- t-2: `bg-gradient-to-b from-[#eef2ff] to-[#fdeff0]`
- t-3: `bg-gradient-to-b from-[#fffdfc] to-[#eef4ff]`
- Avatar: `w-[42px] h-[42px] rounded-full bg-gradient-to-br text-white font-bold text-[15px]`
- Quote: `text-[13.5px] text-[var(--color-navy-soft)] leading-[1.7]`

---

#### FAQ

**File:** `components/homepage/FAQ.tsx`

**Usage:** FAQ accordion with visual mock card.

**Key Classes:**
- Visual: `bg-[var(--color-faq-visual)] rounded-[var(--radius-lg)] p-9 min-h-[320px]`
- Mock card: `bg-white rounded-[18px] shadow-[var(--shadow-soft)] p-5 max-w-[300px]`
- Mock row: `flex items-center gap-2.5 p-2.5 rounded-[10px] mb-1.5 bg-[var(--color-mock-row)]`
- Badge: `bg-[var(--color-safe-bg)] text-[var(--color-safe-text)] text-[10px] font-bold px-2.5 py-0.5 rounded-[var(--radius-pill)]`
- Accordion item: `border-b border-[var(--color-faq-border)]`
- Question button: `text-[16px] font-semibold text-[var(--color-navy)] py-5 px-1`

---

#### CTA

**File:** `components/homepage/CTA.tsx`

**Usage:** Bottom CTA section with dashboard stats mock.

**Key Classes:**
- Container: `bg-[var(--color-cta-bg)] rounded-[var(--radius-lg)] py-[60px] px-[30px] mt-10`
- Heading: `text-[clamp(28px,4vw,42px)] font-extrabold text-[var(--color-navy)] tracking-[-1px]`
- Dashboard mock: `bg-white rounded-t-[20px] shadow-[var(--shadow-dash)] px-[22px] py-5`
- Stat card: `bg-[var(--color-dash-stat)] rounded-[12px] p-3.5`
- Stat value: `text-[19px] font-extrabold text-[var(--color-navy)]`

---

#### Footer

**File:** `components/homepage/Footer.tsx`

**Usage:** Dark navy footer with brand, product, company, legal links.

**Key Classes:**
- Container: `bg-[var(--color-navy)] text-[var(--color-foot-text)] mt-[80px] py-[54px] pb-7`
- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)] gap-9 max-w-[1100px]`
- Links: `text-[var(--color-foot-link)] text-[13.5px] hover:text-white`
- Bottom border: `border-t border-white/12 pt-5.5`

---

### Profile

#### ProfileForm

**File:** `components/profile/ProfileForm.tsx`

**Usage:** User profile editing form.

**Structure:**
```typescript
<form className="space-y-8">
  <div className="space-y-4">
    <label className="block text-sm font-medium text-gray-900">
      Display Name
    </label>
    <input
      type="text"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
</form>
```

**Key Classes:**
- Form section: `space-y-8`
- Form group: `space-y-4`
- Label: `text-sm font-medium text-gray-900`
- Input: `w-full px-4 py-2 border border-gray-300 rounded-lg`
- Focus: `focus:ring-2 focus:ring-blue-500 focus:border-transparent`

---

#### CompletionIndicator

**File:** `components/profile/CompletionIndicator.tsx`

**Usage:** Show profile completion percentage.

**Structure:**
```typescript
<div className="rounded-lg bg-blue-50 border border-blue-200 p-4 mb-6">
  <div className="flex items-center justify-between mb-2">
    <span className="text-sm font-medium text-gray-900">Profile Completion</span>
    <span className="text-sm font-semibold text-blue-600">65%</span>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
  </div>
  <div className="mt-3 flex flex-wrap gap-2">
    <Badge variant="missing">LOCATION</Badge>
    <Badge variant="missing">PREFERENCES</Badge>
  </div>
</div>
```

**Key Classes:**
- Container: `rounded-lg bg-blue-50 border border-blue-200 p-4`
- Progress bar: `w-full bg-gray-200 rounded-full h-2`
- Fill: `bg-blue-600 h-2 rounded-full`

---

### Restaurants

#### SearchControls

**File:** `components/restaurants/SearchControls.tsx`

**Usage:** Search form for finding restaurants.

**Structure:**
```typescript
<div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Restriction Type
      </label>
      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
        <option>All Restrictions</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Location
      </label>
      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
    </div>
  </div>
  <Button className="w-full md:w-auto">Find Restaurants</Button>
</div>
```

**Key Classes:**
- Container: `bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8`
- Grid: `grid grid-cols-1 md:grid-cols-3 gap-4`

---

#### RestaurantCard

**File:** `components/restaurants/RestaurantCard.tsx`

**Usage:** Restaurant item in list view.

**Structure:**
```typescript
<div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
  <div className="flex items-start justify-between mb-2">
    <h3 className="text-lg font-semibold text-gray-900">
      {restaurant.name}
    </h3>
    <div className="flex items-center gap-1">
      <span className="text-yellow-500">★</span>
      <span className="text-sm font-medium text-gray-900">
        {restaurant.rating.toFixed(1)}
      </span>
    </div>
  </div>
  <p className="text-sm text-gray-600 mb-3">{restaurant.location}</p>
  <div className="flex flex-wrap gap-2 mb-3">
    {restaurant.restrictions.map(r => (
      <Badge key={r}>{r}</Badge>
    ))}
  </div>
  <Button variant="secondary" className="w-full">View Details</Button>
</div>
```

**Key Classes:**
- Container: `border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow`
- Title: `text-lg font-semibold text-gray-900`
- Rating: `flex items-center gap-1`
- Badges: `flex flex-wrap gap-2`

---

#### ReviewForm

**File:** `components/restaurants/ReviewForm.tsx`

**Usage:** Form to submit restaurant review.

**Structure:**
```typescript
<form className="space-y-4 bg-white rounded-lg border border-gray-200 p-6">
  <div>
    <label className="block text-sm font-medium text-gray-900 mb-2">
      Rating
    </label>
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map(rating => (
        <button
          key={rating}
          type="button"
          className="text-3xl text-gray-300 hover:text-yellow-500 transition-colors"
        >
          ★
        </button>
      ))}
    </div>
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-900 mb-2">
      Review
    </label>
    <textarea
      rows={4}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <Button className="w-full">Submit Review</Button>
</form>
```

**Key Classes:**
- Container: `space-y-4 bg-white rounded-lg border border-gray-200 p-6`
- Stars: `text-3xl text-gray-300 hover:text-yellow-500 transition-colors`

---

### Community

#### PostCard

**File:** `components/community/PostCard.tsx`

**Usage:** Community post in feed.

**Structure:**
```typescript
<div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
  <div className="flex items-start gap-3 mb-3">
    <Avatar src={post.author.avatar} />
    <div className="flex-1">
      <h4 className="font-semibold text-gray-900">{post.author.username}</h4>
      <p className="text-xs text-gray-500">{post.createdAt}</p>
    </div>
  </div>
  <h3 className="text-lg font-semibold text-gray-900 mb-2">
    {post.title}
  </h3>
  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
    {post.content}
  </p>
  <div className="flex items-center gap-2 text-xs text-gray-500">
    <span>❤️ {post.likes}</span>
    <span>💬 {post.replies}</span>
  </div>
</div>
```

**Key Classes:**
- Container: `border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow`
- Header: `flex items-start gap-3`
- Title: `text-lg font-semibold text-gray-900`
- Content: `text-gray-600 text-sm line-clamp-2`

---

#### CreatePost

**File:** `components/community/CreatePost.tsx`

**Usage:** Form to create new community post.

**Structure:**
```typescript
<form className="space-y-4 bg-white rounded-lg border border-gray-200 p-6">
  <input
    type="text"
    placeholder="Post title..."
    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-semibold"
  />
  <textarea
    rows={4}
    placeholder="What's on your mind?"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
  />
  <div className="flex gap-4">
    <select className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm">
      <option>Select category...</option>
    </select>
    <Button className="px-6">Post</Button>
  </div>
</form>
```

**Key Classes:**
- Container: `space-y-4 bg-white rounded-lg border border-gray-200 p-6`
- Input: `w-full px-4 py-2 border border-gray-300 rounded-lg`

---

### Messaging

#### ConversationCard

**File:** `components/messages/ConversationCard.tsx`

**Usage:** Conversation item in conversations list.

**Structure:**
```typescript
<div className="flex items-center gap-3 p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
  <Avatar src={conversation.user.avatar} />
  <div className="flex-1 min-w-0">
    <h4 className="font-semibold text-gray-900">
      {conversation.user.username}
    </h4>
    <p className="text-sm text-gray-500 truncate">
      {conversation.lastMessage}
    </p>
  </div>
  <span className="text-xs text-gray-500">
    {conversation.lastMessageTime}
  </span>
</div>
```

**Key Classes:**
- Container: `flex items-center gap-3 p-4 border-b border-gray-200 hover:bg-gray-50`
- Content: `flex-1 min-w-0`
- Truncate: `text-sm text-gray-500 truncate`

---

#### MessageBubble

**File:** `components/messages/MessageBubble.tsx`

**Usage:** Individual message in chat thread.

**Structure:**
```typescript
<div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
  <div
    className={`max-w-xs px-4 py-2 rounded-lg ${
      message.isOwn
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-900'
    }`}
  >
    <p className="text-sm">{message.text}</p>
    <span className={`text-xs mt-1 block ${
      message.isOwn ? 'text-blue-100' : 'text-gray-500'
    }`}>
      {message.time}
    </span>
  </div>
</div>
```

**Key Classes:**
- Container: `flex justify-end mb-4` or `flex justify-start mb-4`
- Own message: `bg-blue-600 text-white`
- Other message: `bg-gray-100 text-gray-900`

---

### Creators

#### CreatorCard

**File:** `components/creators/CreatorCard.tsx`

**Usage:** Creator item in marketplace.

**Structure:**
```typescript
<div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
  <div className="p-4">
    <div className="flex items-start gap-3 mb-3">
      <Avatar src={creator.avatar} size="lg" />
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{creator.username}</h4>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-yellow-500">★</span>
          <span className="text-sm font-medium text-gray-900">
            {creator.rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-500">
            ({creator.reviewCount})
          </span>
        </div>
      </div>
    </div>
    <p className="text-sm text-gray-600 mb-3">{creator.bio}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {creator.specialties.map(s => (
        <Badge key={s} variant="secondary">{s}</Badge>
      ))}
    </div>
  </div>
  <div className="border-t border-gray-200 p-4 flex gap-2">
    <Button variant="secondary" className="flex-1">Message</Button>
    <Button className="flex-1">View Profile</Button>
  </div>
</div>
```

**Key Classes:**
- Container: `border border-gray-200 rounded-lg overflow-hidden hover:shadow-md`
- Header: `flex items-start gap-3`
- Rating: `flex items-center gap-1`
- Footer: `border-t border-gray-200 p-4 flex gap-2`

---

### Dashboard

#### StatsCard

**File:** `components/dashboard/StatsCard.tsx`

**Usage:** Single stat card in dashboard stats bar.

**Structure:**
```typescript
<div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
    </div>
    <div className="text-4xl text-gray-300">{stat.icon}</div>
  </div>
  {stat.trend && (
    <p className={`text-xs mt-3 ${stat.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
      {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}% vs last week
    </p>
  )}
</div>
```

**Key Classes:**
- Container: `bg-white rounded-lg border border-gray-200 shadow-sm p-6`
- Label: `text-sm text-gray-600`
- Value: `text-3xl font-bold text-gray-900`
- Trend: `text-xs text-green-600` or `text-red-600`

---

### Common

#### Button

**File:** `components/ui/button.tsx` (shadcn/ui)

**Variants:**
- `default` — primary action
- `secondary` — less important action
- `destructive` — dangerous action (delete)
- `ghost` — minimal appearance

**Usage:**
```typescript
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
```

**Key Classes:**
- Primary: `bg-blue-600 text-white hover:bg-blue-700`
- Secondary: `border border-gray-300 text-gray-900 hover:bg-gray-50`
- Ghost: `text-gray-900 hover:bg-gray-100`
- Size: `px-4 py-2 text-sm`

---

#### Badge

**File:** `components/ui/badge.tsx` (shadcn/ui variant)

**Variants:**
- `default` — primary badge
- `secondary` — less prominent
- `missing` — highlight missing profile field

**Usage:**
```typescript
<Badge>Crohn's</Badge>
<Badge variant="secondary">Restaurant</Badge>
<Badge variant="missing">LOCATION</Badge>
```

**Key Classes:**
- Default: `bg-blue-100 text-blue-800`
- Secondary: `bg-gray-100 text-gray-800`
- Missing: `bg-red-100 text-red-800`

---

#### Avatar

**File:** `components/ui/avatar.tsx` (shadcn/ui)

**Sizes:**
- `sm` — 32px
- `md` — 40px (default)
- `lg` — 48px

**Usage:**
```typescript
<Avatar src={user.avatar} alt={user.name} />
<Avatar src={user.avatar} size="lg" />
```

**Key Classes:**
- Container: `rounded-full overflow-hidden`
- Image: `w-full h-full object-cover`

---

#### Card

**File:** `components/ui/card.tsx` (shadcn/ui)

**Usage:**
```typescript
<Card>
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

**Key Classes:**
- Container: `rounded-lg border border-gray-200 bg-white shadow-sm`
- Padding: `p-6`

---

## Rules

**Before adding a new component to this registry:**

1. Component file exists and is exported
2. All Tailwind classes documented exactly
3. Component follows ui-rules.md
4. Component uses tokens from ui-tokens.md
5. Component tested at mobile and desktop breakpoints

**When updating a component:**

1. Update this registry at the same time
2. Document exact class changes
3. Update any dependent components

**Colors used in components:**

- Text: `text-gray-900`, `text-gray-600`, `text-gray-500`
- Background: `bg-white`, `bg-gray-50`, `bg-blue-600`, `bg-blue-50`
- Border: `border-gray-200`, `border-gray-300`
- Hover: `hover:bg-gray-50`, `hover:shadow-md`, `hover:border-gray-400`
- Focus: `focus:ring-2 focus:ring-blue-500 focus:border-transparent`

---

### Dashboard (Admin)

#### Sidebar

**File:** `components/dashboard/Sidebar.tsx`

**Usage:** Left navigation panel for the admin dashboard. Brand, quick actions, nav items, user profile.

**Key Classes:**
- Container: `w-[280px] bg-[#f7f7f5] border-r border-[#ececec] flex flex-col py-4 px-[14px]`
- Brand logo: `w-9 h-9 rounded-[9px] bg-[#111] text-white flex items-center justify-center font-bold text-[18px]`
- Quick actions: `bg-white border border-[#ececec] rounded-[10px] py-[11px] px-3`
- Nav item: `flex items-center gap-3 py-[9px] px-[11px] rounded-[9px] text-[14.5px] text-[#333] hover:bg-[#f5f5f4]`
- Active nav: `bg-white font-medium shadow-[0_1px_2px_rgba(0,0,0,0.05)]`
- Section header: `text-[11px] tracking-[0.06em] uppercase text-[#8a8a8a] px-[11px] pt-4 pb-1.5`
- Badge: `bg-[#e6e6e3] rounded-[20px] py-px px-2 text-[12px] text-[#555]`
- NEW tag: `bg-[#ece8ff] text-[#6b4ee0] text-[10px] font-semibold py-0.5 px-1.5 rounded-md`

---

#### StatsBar

**File:** `components/dashboard/StatsBar.tsx`

**Usage:** Top KPI cards row with sparkline charts.

**Key Classes:**
- Container: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-b border-[#ececec] pt-[18px] pb-3 px-7`
- Stat: `px-[18px] border-r border-[#ececec]`
- Label: `text-[14px] text-[#444] flex items-center gap-1.5 mb-2`
- Value: `text-[30px] font-semibold flex items-baseline gap-2`
- Small: `text-[13px] text-[#8a8a8a] font-normal`
- Sparkline: `mt-2.5 h-[34px] w-full`

---

#### Toolbar

**File:** `components/dashboard/Toolbar.tsx`

**Usage:** Filters, search, and customize controls above the table.

**Key Classes:**
- Container: `flex items-center gap-5 py-[14px] px-7 border-b border-[#ececec]`
- Tool button: `flex items-center gap-[7px] text-[14.5px] text-[#444] cursor-pointer bg-none border-none`
- Search input: `border-none outline-none text-[14.5px] bg-none w-[200px]`

---

#### UsersTable

**File:** `components/dashboard/UsersTable.tsx`

**Usage:** Users table with row selection, search filter, and status badges.

**Key Classes:**
- Container: `flex-1 overflow-y-auto relative`
- Table: `w-full border-collapse`
- Header: `sticky top-0 bg-white text-left text-[11.5px] tracking-[0.05em] text-[#8a8a8a] uppercase py-3 px-[14px] border-b border-[#ececec] font-semibold`
- Row: `cursor-pointer hover:bg-[#f5f5f4]`
- Selected row: `bg-[#f4f6fb]`
- Cell: `py-[13px] px-[14px] text-[14.5px] border-b border-[#ececec]`
- Avatar: `w-[30px] h-[30px] rounded-full bg-[#ececec] text-[11px] font-semibold text-[#555]`
- Checkbox: `w-[18px] h-[18px] border-[1.5px] rounded-[5px]` (checked: `bg-[#111] border-[#111]`)
- Status badge: `text-[12.5px] py-[3px] px-[11px] rounded-[7px] inline-block`
  - Active: `bg-[#e3f3e6] text-[#2f7d3e]`
  - New: `bg-[#e4eefb] text-[#2f6bd1]`
  - Non-targeted: `bg-[#eeeeee] text-[#666]`
  - VIP: `bg-[#f7f0d8] text-[#a08a2f]`

---

#### SelectionBar

**File:** `components/dashboard/SelectionBar.tsx`

**Usage:** Fixed bottom bulk action toolbar that appears when rows are selected.

**Key Classes:**
- Container: `fixed bottom-[22px] left-1/2 -translate-x-1/2 bg-admin-selbar-bg text-white flex items-center gap-1 rounded-[14px] py-2 px-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-50`
- Close button: `bg-admin-sel-close rounded-[9px] w-9 h-9 flex items-center justify-center cursor-pointer`
- Count: `px-4 text-[15px] font-medium`
- Action: `w-[38px] h-[38px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-admin-selbar-hover`

---

#### Admin Layout

**File:** `app/admin/layout.tsx`

**Usage:** Shared layout for all admin pages — provides sidebar + hamburger shell.

**Key Classes:**
- Container: `flex h-screen w-screen overflow-x-hidden bg-admin-bg text-admin-text`
- Hamburger: `md:hidden fixed top-3 left-3 z-[60] bg-admin-bg border border-admin-border rounded-[9px] w-[42px] h-[42px]`
- Main: `flex-1 flex flex-col overflow-hidden`

---

#### Admin Modal

**Usage:** Centered modal dialog for confirmations, forms, and actions.

**Key Classes:**
- Backdrop: `fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4`
- Card: `bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[440px] w-full`
- Primary button: `text-[14px] px-4 py-2 rounded-md text-white bg-admin-dark hover:opacity-90`
- Secondary button: `text-[14px] px-4 py-2 rounded-md text-admin-text border border-admin-border hover:bg-admin-hover`

---

## Admin Pages

| Page | Route | File |
|------|-------|------|
| Analytics | `/admin/analytics` | `app/admin/analytics/page.tsx` |
| Users list | `/admin/users` | `app/admin/users/page.tsx` |
| User detail | `/admin/users/[id]` | `app/admin/users/[id]/page.tsx` |
| Restaurant Verification | `/admin/restaurants/verification` | `app/admin/restaurants/verification/page.tsx` |
| Review Moderation | `/admin/moderation/reviews` | `app/admin/moderation/reviews/page.tsx` |
| Creators list | `/admin/creators` | `app/admin/creators/page.tsx` |
| Creator detail | `/admin/creators/[id]` | `app/admin/creators/[id]/page.tsx` |
| Disputes list | `/admin/disputes` | `app/admin/disputes/page.tsx` |
| Dispute detail | `/admin/disputes/[id]` | `app/admin/disputes/[id]/page.tsx` |

All pages share the admin layout (sidebar + hamburger) and use the admin design tokens.

---

## Pending Components

_List components that are planned but not yet built_

- Analytics charts (recharts integration)
- Empty states
- Loading skeletons
- Error states
- Toast notifications

---

## User Dashboard

#### UserSidebar

**File:** `components/dashboard/UserSidebar.tsx`

**Usage:** Left navigation panel for the user dashboard. Brand, quick actions, user nav (Find Safely, Saved, Messages, My Reviews, Verification, Community, Creator Hub), user profile menu with creator/restaurant/admin switcher.

**Key Classes:**
- Container: `w-[280px] bg-admin-sidebar border-r border-admin-border flex flex-col py-4 px-[14px] fixed md:static z-[100] h-full`
- Brand logo: `w-9 h-9 rounded-[9px] bg-admin-dark text-white flex items-center justify-center font-bold text-[18px]`
- Quick actions button: `w-full flex items-center justify-between bg-admin-bg border border-admin-border rounded-[10px] py-[11px] px-3 mb-[14px] text-[14.5px]`
- Nav item: `flex items-center gap-3 py-[9px] px-[11px] rounded-[9px] text-[14.5px] text-admin-nav-text hover:bg-admin-hover`
- Active nav: `bg-admin-bg font-medium shadow-[0_1px_2px_rgba(0,0,0,0.05)]`
- Section header: `text-[11px] tracking-[0.06em] uppercase text-admin-muted px-[11px] pt-4 pb-1.5 font-semibold`
- Badge: `bg-admin-badge-bg rounded-[20px] py-px px-2 text-[12px] text-admin-avatar-text`
- NEW/EARN tag: `bg-admin-tag-bg text-admin-tag-text text-[10px] font-semibold py-0.5 px-1.5 rounded-md`

**Differences from AdminSidebar:**
- Nav items: Find Safely, Notifications, Saved, Messages, My Reviews, Verification, Community, Creator Hub
- Quick actions target user routes (`/user/find`, `/user/community`, etc.)
- User menu includes "Switch to restaurant" and "Switch to admin" for prototyping
- Profile picture: `https://i.pravatar.cc/80?img=12` (different seed from admin's 47)

---

#### User Layout

**File:** `app/user/layout.tsx`

**Usage:** Shared layout for all `/user/*` pages. Sidebar + hamburger shell.

**Key Classes:**
- Container: `flex h-screen w-screen overflow-x-hidden bg-admin-bg text-admin-text`
- Hamburger: `md:hidden fixed top-3 left-3 z-[60] bg-admin-bg border border-admin-border rounded-[9px] w-[42px] h-[42px]`
- Main: `flex-1 flex flex-col overflow-hidden`

**Reuses:** Same shell structure as `app/admin/layout.tsx` and `app/restaurant/layout.tsx`

---

#### Page Header

**Usage:** Standard top header for all user pages.

**Key Classes:**
- Wrapper: `px-[26px] py-6 border-b border-admin-border`
- Title: `text-[24px] font-semibold text-admin-text mb-1`
- Subtitle: `text-[13.5px] text-admin-muted`
- Action row: `flex items-center gap-3 text-[13px] text-admin-muted flex-wrap`

---

#### Stat Card (KPI)

**Usage:** Single stat card in dashboard stat row.

**Key Classes:**
- Container: `bg-admin-bg border border-admin-border rounded-[10px] p-5`
- Header: `flex items-center justify-between mb-1` (with icon on right)
- Label: `text-[12px] text-admin-muted`
- Value: `text-[28px] font-semibold text-admin-text` (or `text-admin-active-text` for positive)
- Description: `text-[12.5px] text-admin-muted mt-1`
- Trend: `text-[12px] mt-1 font-medium text-admin-active-text` (or `text-admin-new-text`, `text-admin-non-text`)

---

#### Safety Verification Card

**Usage:** 3-layer verification card showing Safe Match %.

**Key Classes:**
- Container (high confidence): `bg-admin-active-bg border border-admin-active-text/30 rounded-[10px] p-6 mb-6`
- Big score: `text-[48px] font-bold text-admin-active-text leading-none`
- Layer row: `border border-admin-border rounded-[9px]` (expandable with `border-b` divider)
- Layer icon: `text-[24px]` (📋 menu, 🔍 database, 👥 community)
- Layer label: `text-[15px] font-semibold text-admin-text`
- Weight tag: `text-[11px] text-admin-muted uppercase tracking-wide`
- Layer score: `text-[20px] font-bold text-admin-active-text`
- Progress bar: `w-full h-1.5 bg-admin-border rounded-full` filled with `bg-admin-active-text`

---

#### Allergy Chip

**Usage:** Editable allergy tag in search/dashboard.

**Key Classes:**
- Selected: `text-[13px] px-2.5 py-1 rounded-md bg-admin-active-bg text-admin-active-text font-medium`
- Removable (×): `hover:bg-admin-non-bg hover:text-admin-non-text`
- Addable (+): `text-[12px] px-2 py-0.5 rounded-md border border-admin-border text-admin-nav-text hover:bg-admin-hover`

---

#### Post Type Badge

**Usage:** Post type indicator in community feed.

**Key Classes:**
- Container: `inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-admin-active-bg text-admin-active-text font-medium`
- 7 types: 🍽️ Recommendation, ❓ Question, 💡 Tip, 🎉 Win, ⚠️ Warning, 💪 Support, 📣 Announcement

---

#### Engagement Button Row

**Usage:** Like / Reply / Save / Share / Report buttons on posts and reviews.

**Key Classes:**
- Like (active): `border-admin-non-text bg-admin-non-bg text-admin-non-text`
- Like (default): `border-admin-border text-admin-nav-text hover:bg-admin-hover`
- Save (active): `border-admin-active-text bg-admin-active-bg text-admin-active-text`
- Default: `border-admin-border text-admin-nav-text hover:bg-admin-hover`
- Size: `text-[12.5px] px-2.5 py-1 rounded-md border`

---

#### Creator Earnings Row

**Usage:** Transaction row in creator hub.

**Key Classes:**
- Container: `flex items-center gap-3 p-2.5 rounded-md hover:bg-admin-hover`
- Icon: `text-[18px]` (✍️ review, ✓ verification, 📖 guide, 🔖 booking)
- Description: `text-[13.5px] text-admin-text`
- Date: `text-[11.5px] text-admin-muted`
- Amount: `text-[14px] font-semibold text-admin-active-text`
- Status pending: `text-[11px] text-admin-new-text`
- Status paid: `text-[11px] text-admin-muted`

---

#### Tab Strip

**Usage:** Earnings / Payouts / Top Contributions tabs in creator hub.

**Key Classes:**
- Container: `flex items-center gap-1 mb-4 border-b border-admin-border`
- Active tab: `text-[13px] px-4 py-2.5 -mb-px border-b-2 border-admin-dark text-admin-text font-medium`
- Inactive: `border-transparent text-admin-muted hover:text-admin-text`

---

## Restaurant Pages (Built Out)

| Page | Route | File | Key features |
|------|-------|------|--------------|
| Dashboard | `/restaurant/dashboard` | `app/restaurant/dashboard/page.tsx` | 6 KPI cards, 3 action cards, period-filter chart, reviews with inline reply, badge code modal, suggested improvements |
| Menu | `/restaurant/menu` | `app/restaurant/menu/page.tsx` | Verification progress bar, categorized table, search, full add/edit modal (ingredients, 8-allergen checkboxes, cross-contamination, modifications, safe-for overrides), import modal, delete with confirm |
| Reviews | `/restaurant/reviews` | `app/restaurant/reviews/page.tsx` | 4 summary cards, rating breakdown by allergy type, filter tabs, inline reply with templates |
| Bookings | `/restaurant/bookings` | `app/restaurant/bookings/page.tsx` | 3 summary cards, list/calendar view toggle, confirm/decline/message actions, week calendar with color-coded bookings |
| Profile | `/restaurant/profile` | `app/restaurant/profile/page.tsx` | 4 tabs: Basic Info (with hours), Menu (link), Verification (with batch verify), Staff Training (5 modules with quiz, team tracking) |
| Analytics | `/restaurant/analytics` | `app/restaurant/analytics/page.tsx` | Period tabs (month/quarter/year/custom), 4 KPI cards, clickable daily chart, top dishes, flagged dishes, demographics, feedback themes, competitive positioning |
| Marketing | `/restaurant/marketing` | `app/restaurant/marketing/page.tsx` | Badge with HTML/SVG copy, live QR code, shareable link with social buttons, 3 copy templates, 3 social graphics with download, email template, in-restaurant promotion ideas |
| Settings | `/restaurant/settings` | `app/restaurant/settings/page.tsx` | 4 tabs: Account (restaurant info, password), Team (add/edit/remove with permissions), Billing (plan, payment method, invoices, add card), Notifications (5 toggles), support modal |
| Reports | `/restaurant/reports` | `app/restaurant/reports/page.tsx` | 4 report types (monthly/competitive/customer/custom), custom date range, metric multi-select, generate + download/email/print, recent reports list |
| Help | `/restaurant/help` | `app/restaurant/help/page.tsx` | Searchable FAQ accordion, 3 quick-link cards, written guides list, video tutorials, full support form with priority + method choice |

All restaurant pages share the restaurant layout (sidebar + Quick Actions + user menu) and use the admin design tokens. Every page is interactive with `useState` mock data.

### Interactive Patterns (Restaurant Pages)

1. **Period filter buttons** (analytics) — Month/quarter/year/custom with date pickers appearing for custom
2. **Clickable daily chart** (analytics, dashboard) — Click a bar to see that day's stats, click again to deselect
3. **Full menu add/edit form** (menu) — Tabbed sections: details, ingredients, allergens, cross-contamination, safe-for overrides, modifications
4. **Batch verification** (profile) — Checkbox list to verify multiple items at once
5. **Module quiz with feedback** (profile) — Start module, read material, take quiz, see correct/incorrect feedback
6. **Badge code copy** (marketing) — Copy HTML or SVG, live QR code from qrserver API
7. **Social media download** (marketing) — Click "Download graphic" triggers blob download
8. **Team add modal with permissions** (settings) — Add member, pick role + permissions, send invitation
9. **Add payment method inline** (settings) — Expand to show card form, save or cancel
10. **Support form with full validation** (settings, help) — Type/priority/method/submit, success state
11. **Report generator with metric multi-select** (reports) — Toggle individual metrics before generating
12. **List/calendar view toggle** (bookings) — Calendar shows week with color-coded bookings
13. **Message customer dialog** (bookings) — Modal with textarea, sent confirmation
14. **Search FAQ** (help) — Live filter on FAQ items, accordion expand/collapse

---

## User Pages

| Page | Route | File | Key features |
|------|-------|------|--------------|
| Dashboard | `/user/dashboard` | `app/user/dashboard/page.tsx` | 4 KPI cards, 3-layer verification, recommended, saved, activity, onboarding modal, creator banner |
| Find Safely | `/user/find` | `app/user/find/page.tsx` | Editable allergies, search, filters, list/map view, sort, save, share, no-results state |
| Verify | `/user/verify` | `app/user/verify/page.tsx` | 96% safety card, 3 expandable layers, score calculation breakdown, timeline, rating distribution, reviews |
| Community | `/user/community` | `app/user/community/page.tsx` | 4 stat cards, 7 filter tabs, 7 post types, like/reply/save inline, "Has Celiac like you" badge, helpful marking on Q&A |
| Creator Hub | `/user/creator` | `app/user/creator/page.tsx` | 4 earnings cards, 3 action cards (write/verify/guide), 3 tabs (earnings/payouts/contributions), 3 modals, top contributions grid |
| Become Creator | `/user/become-creator` | `app/user/become-creator/page.tsx` | 5 guidelines, earnings breakdown, application form, success modal |
| Profile | `/user/profile` | `app/user/profile/page.tsx` | Avatar, editable name/city/bio, allergies with severity, recent reviews |
| Reviews | `/user/reviews` | `app/user/reviews/page.tsx` | 4 stat cards, all/published/draft filters, new review modal, delete/publish actions |

All pages share the user layout (UserSidebar + hamburger) and use the admin design tokens.

---

## Interactive Patterns (User Pages)

1. **Onboarding modal** (`/user/dashboard`) — Welcome screen with 3 steps, shown on first visit, dismissable
2. **Creator earnings banner** (`/user/dashboard`) — Persistent CTA, dismissable
3. **3-layer verification expand** (`/user/dashboard`, `/user/verify`) — Click layer to see ingredient/review breakdown
4. **Allergy edit mode** (`/user/find`) — Click "Edit" to add/remove allergies with toggle chips
5. **Safety slider filter** (`/user/find`) — Range slider for min safe match %
6. **Empty results state** (`/user/find`) — Friendly message + "Ask community" CTA
7. **View toggle (list/map)** (`/user/find`) — Two buttons, map shows color-coded match
8. **Post create modal** (`/user/community`) — 7 post type chips, title, content, tag picker
9. **Inline comment thread** (`/user/community`) — Like/reply/mark-helpful per comment, helpful answers pinned
10. **Earnings breakdown tabs** (`/user/creator`) — 3 tabs with progress bars, lifetime stats grid
11. **Creator action modals** (`/user/creator`) — Write review, verify dish, create guide — all with full forms
12. **Application form validation** (`/user/become-creator`) — Submit disabled until at least 1 allergy + 2 checkboxes
13. **Profile edit toggle** (`/user/profile`) — Same view, click Edit to swap fields to inputs
14. **Review status filter** (`/user/reviews`) — All/Published/Draft tabs, draft can be published inline
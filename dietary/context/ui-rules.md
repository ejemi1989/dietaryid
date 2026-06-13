# UI Rules

Concise rules for building DietaryID UI. These rules cover the most important patterns and constraints to keep the UI consistent without over-specifying every detail.

---

## Font

Always import Inter via `next/font/google` in the root layout.

```typescript
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
```

The `--font-sans` variable is already declared in `@theme` in globals.css. Apply the font variable class to the `<html>` tag in root layout. Never use system fonts as the primary font.

---

## Layout

- Page max-width: 1280px, centered
- Main content area padding: 24px on mobile, 32px on desktop (use `px-6 md:px-8`)
- Gap between page sections: 24px
- Header height: 64px, full width, white background, padding 0 24px
- Mobile bottom nav height: 64px, full width, white background with top border
- All pages use top navbar on desktop, bottom nav on mobile

---

## Navbar (Desktop)

Four nav items: Home, Search Restaurants, Community, Messages, Profile (on right).

- Active item: `color: #3B82F6`, font-weight 600, 14px
- Inactive item: `color: #6B7280`, font-weight 500, 14px
- No underline — active state is color change only
- Navbar always white background, full viewport width
- Logo/brand on left with text "DietaryID"

---

## Bottom Nav (Mobile)

Five nav items with icons only (text labels optional on active):

- Home (house icon)
- Search Restaurants (magnifying glass)
- Community (speech bubble)
- Messages (envelope)
- Profile (user circle)

- Active item: `color: #3B82F6`, background: `#EFF6FF`
- Inactive item: `color: #9CA3AF`
- No text labels, icons only

---

## Cards

Every content section lives in a card.

```
background: #FFFFFF
border: 1px solid #E5E7EB
border-radius: 12px
padding: 20px
box-shadow: 0px 1px 2px rgba(0,0,0,0.05)
```

Never use colored card backgrounds — always white. Color goes inside cards via badges, bars, and text, never on the card surface itself.

---

## Typography Hierarchy

Three levels used consistently throughout:

**Section headings** — card titles, page section titles

```
font-size: 18px
font-weight: 600
color: #111827
line-height: 28px
```

**Body / primary content text**

```
font-size: 14px
font-weight: 500
color: #111827
line-height: 20px
```

**Secondary / muted text** — labels, timestamps, subtitles

```
font-size: 13px
font-weight: 400
color: #6B7280
line-height: 18px
```

Stat numbers on dashboard use 28px / weight 700 / color #111827.

---

## Colors

**Primary:**
```
color-blue-600: #2563EB
color-blue-50: #EFF6FF
```

**Neutral:**
```
color-gray-50: #F9FAFB
color-gray-100: #F3F4F6
color-gray-200: #E5E7EB
color-gray-600: #4B5563
color-gray-900: #111827
```

**Semantic:**
```
color-green: #10B981 (success)
color-yellow: #F59E0B (warning)
color-red: #EF4444 (error)
```

Never use Tailwind's built-in color classes. Only use these defined colors.

---

## Badges

All badges use `border-radius: 9999px` (pill shape).

```
padding: 4px 12px
font-size: 12px
font-weight: 600
```

**Restriction badge** (e.g., "Crohn's"):
```
background: #EFF6FF
color: #2563EB
```

**Category badge** (e.g., "Tips", "Restaurant"):
```
background: #F3F4F6
color: #374151
```

**Creator badge**:
```
background: #DBEAFE
color: #1E40AF
```

---

## Buttons

**Primary button:**

```
background: #3B82F6
color: #FFFFFF
border-radius: 8px
padding: 10px 18px
font-size: 14px
font-weight: 600
hover: background #2563EB
disabled: opacity 50%
```

**Secondary button:**

```
background: #FFFFFF
border: 1px solid #E5E7EB
color: #111827
border-radius: 8px
padding: 10px 18px
font-size: 14px
font-weight: 600
hover: background #F9FAFB
```

**Ghost button** (minimal):

```
background: transparent
color: #3B82F6
border: none
padding: 10px 18px
font-size: 14px
font-weight: 500
hover: background #EFF6FF
```

---

## Form Inputs

```
background: #FFFFFF
border: 1px solid #E5E7EB
border-radius: 8px
padding: 10px 12px
font-size: 14px
color: #111827
placeholder color: #9CA3AF
focus: ring-2 ring-offset-0 ring-#3B82F6 border-transparent
```

**Textarea** — same as input but with `min-height: 100px`.

**Select dropdown** — same as input, with arrow icon on right.

---

## Restaurant Card (List View)

Compact card format:

```
border: 1px solid #E5E7EB
border-radius: 10px
padding: 16px
```

- Restaurant name: 16px / weight 600 / color #111827
- Location: 13px / weight 400 / color #6B7280
- Rating: star icon + "4.5" in 14px / weight 600
- Restriction badges below
- Cuisine tags below badges
- "View Details" button at bottom (secondary style, full width)

---

## Review Card

```
border-bottom: 1px solid #E5E7EB
padding: 16px 0
```

- User info on top (avatar + username + time ago)
- Rating stars (x5 or subset)
- Review text: 14px / color #111827
- Safe items: green badge list "Grilled salmon"
- Avoid items: red badge list "Cream sauce"

---

## Post Card (Community)

```
border: 1px solid #E5E7EB
border-radius: 10px
padding: 16px
```

- Author info (avatar + username + creator badge if applicable)
- Posted time: 12px / color #9CA3AF
- Post title: 16px / weight 600 / color #111827
- Preview text: 14px / color #4B5563 / max 2 lines with ellipsis
- Category badge: pill with #F3F4F6 background
- Engagement: "45  12" in 13px / color #6B7280

---

## Message Bubble

**Sent message:**
```
background: #3B82F6
color: #FFFFFF
border-radius: 12px 2px 12px 12px
padding: 12px 16px
max-width: 70%
```

**Received message:**
```
background: #F3F4F6
color: #111827
border-radius: 2px 12px 12px 12px
padding: 12px 16px
max-width: 70%
```

Timestamp below each message: 12px / color #9CA3AF

---

## Creator Card (Marketplace)

```
border: 1px solid #E5E7EB
border-radius: 10px
padding: 16px
```

- Avatar + username + creator badge on top
- Rating: 4.8 (127 reviews) in 14px
- Bio: 13px / color #6B7280
- Specialties: pill badges with #F3F4F6 background
- Bottom: two buttons side-by-side (Message | View Profile)

---

## Dashboard Stats Card

```
background: #FFFFFF
border: 1px solid #E5E7EB
border-radius: 10px
padding: 20px
```

- Label: 12px / weight 400 / color #6B7280
- Value: 28px / weight 700 / color #111827
- Icon on right: 32px, color #E5E7EB
- Trend (if applicable): small green/red text below value

---

## Progress Bar (Profile Completion)

```
height: 6px
border-radius: 9999px
background track: #E5E7EB
fill color: #3B82F6
```

---

## Empty States

Every section that can be empty must have an empty state. Keep it minimal:

- Optional icon (32x32, color #D1D5DB)
- Short descriptive text: 14px / color #6B7280
- CTA button if there's a logical next action (secondary style)

---

## Tables (If Needed)

- Column headers: uppercase, 12px / weight 600, color #6B7280, background #F9FAFB
- Row text: 14px / color #111827
- Row borders: 1px solid #E5E7EB between rows
- Hover state: background #F9FAFB
- No alternating row colors

---

## Spacing Scale

Use these exact spacing values throughout:

```
2px   — micro spacing (gap between badge + text)
4px   — tiny (internal padding in badges)
8px   — small (padding in buttons, form elements)
12px  — medium-small (padding in cards, form labels)
16px  — medium (padding in post cards, message spacing)
20px  — medium-large (padding in large cards)
24px  — large (section gaps, page padding mobile)
32px  — x-large (page padding desktop)
```

Use Tailwind spacing: `px-6 py-4 gap-3 mb-6` etc.

---

## Responsive Design

**Mobile first.** Then add breakpoints:

- `sm: 640px` — landscape phones
- `md: 768px` — tablets
- `lg: 1024px` — desktop
- `xl: 1280px` — large desktop

Example:
```
px-4 sm:px-6 md:px-8  // padding scales up
text-sm md:text-base  // font size increases
grid-cols-1 md:grid-cols-2 lg:grid-cols-3  // column count increases
```

---

## Do Nots

- Never use Tailwind's built-in color classes (`bg-purple-500`, `text-gray-600`) — use project tokens only
- Never define colors in `tailwind.config.ts` — use `@theme` in globals.css
- Never add gradients to card backgrounds
- Never use more than one font weight in a single UI element
- Never show raw error messages to users — always show human readable text
- Never stack more than 2 levels of border radius inside each other
- Never use `position: fixed` for UI elements except navbar/bottom nav
- Never use shadows larger than `shadow-sm`
- Never use multiple borders on a single element
- Never mix serif and sans fonts in the same component
- Never use ALL CAPS for body text (except badges and labels)



## DietaryID Dashboard — UI Rules


1. Visual Theme & Atmosphere
Clean, utilitarian admin dashboard. Neutral warm-gray canvas with minimal chrome. Information-dense tables and stats take priority; the UI stays quiet so data leads. No gradients, no decorative effects — borders and whitespace do all the separation work.

## Key Characteristics:

Warm off-white sidebar (#f7f7f5) against pure white main area
Near-invisible borders (#ececec) for structural separation
Single dark accent (#111) used sparingly for logo, checkboxes, and the floating selection bar
Status communicated through tinted pills (green/blue/gray/yellow), never through icons alone
System font stack throughout — no custom typefaces
Sparklines as single-weight polylines, no fills
---

2. Color Palette & Roles
Surfaces
| Token | Value | Use | |-------|-------|-----| | --bg | #fff | Main content background | | --sidebar-bg | #f7f7f5 | Sidebar and secondary panels | | --hover | #f5f5f4 | Row and nav hover states | | --border | #ececec | All dividers and field borders |

Text
| Token | Value | Use | |-------|-------|-----| | --text | #1a1a1a | Primary body and heading text | | --muted | #8a8a8a | Secondary labels, badges, helper text |

Status Pills
| Status | Background | Text | Use | |--------|-----------|------|-----| | Active | #e3f3e6 | #2f7d3e | Verified, live, confirmed | | New | #e4eefb | #2f6bd1 | Recently added, pending review | | Non-responsive | #eeeeee | #666 | Inactive, unresponsive | | VIP | #f7f0d8 | #a08a2f | High-priority, flagged |

Accent
| Token | Value | Use | |-------|-------|-----| | Dark accent | #111 | Logo mark, checked checkboxes, selection bar | | Tag purple | #ece8ff / #6b4ee0 | "NEW" feature tags only |

---

3. Typography Rules
Font Stack
-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif
Hierarchy
| Role | Size | Weight | Notes | |------|------|--------|-------| | Stat value | 30px | 600 | Inline small muted suffix (13px, 400) | | Brand name | 17px | 600 | Sidebar top | | Body / Nav items | 14.5px | 400–500 | Active nav items get weight 500 | | Table body | 14.5px | 400 | Standard data rows | | Toolbar labels | 14.5px | 400 | Filter buttons, search | | Stat label | 14px | 400 | With inline icon (13px) | | Badges / Counts | 12px | 400–600 | Muted color or pill background | | Keyboard hint | 12px | 400 | Bordered box, muted color | | Section labels | 11px | 600 | Uppercase, 0.06em tracking, muted | | Table headers | 11.5px | 600 | Uppercase, 0.05em tracking, muted | | Feature tags | 10px | 600 | "NEW" pill, purple |

Principles
No custom fonts — system stack only
Uppercase + letter-spacing for section dividers and table headers
Muted color for all metadata; primary color only for data values and active states
Stat values are the largest non-heading elements on the page
---

4. Component Stylings
Sidebar (280px fixed)
Background: --sidebar-bg
Right border: 1px --border
Padding: 16px 14px
Nav items: 9px radius, 9px 11px padding, 1px bottom margin
Active nav item: white background, weight 500, subtle shadow (0 1px 2px rgba(0,0,0,.05))
Nav icons: 18px, stroke #555
Nav badges: right-aligned, 12px, muted; count badges get pill background (#e6e6e3, 20px radius)
User block: margin-top auto, top border, 34px round avatar, 14.5px name
Quick Actions Bar
White background, 1px border, 10px radius
Padding: 11px 12px
14.5px text, keyboard shortcut in bordered 6px-radius box (22px square)
Stats Row
5-column grid, no gap (borders separate)
Bottom border: 1px --border
Padding: 18px 26px 12px
Each stat: 0 18px padding, right border (last child none)
Label: 14px with inline 13px trend icon (green)
Value: 30px/600 with optional muted small suffix
Sparkline: 34px height, single polyline stroke #222 at 1.5px weight
Toolbar
Flex row, 14px 26px padding, bottom border
Tool buttons: 14.5px, icon 16px, no border/background
Search input: borderless, outline none, 200px width
Customize button: margin-left auto
Data Table
Full width, border-collapse
Sticky thead: white background, 11.5px uppercase headers, 12px 14px padding
Body cells: 13px 14px padding, 14.5px text
Row hover: --hover background
Selected row: #f4f6fb background
Checkbox: 18px, 1.5px border #ccc, 5px radius; checked = #111 fill with white stroke icon
Name cell: 30px round avatar (40px gray circle, 11px initials) + 14.5px name
Status pill: 12.5px, 3px 11px padding, 7px radius
Floating Selection Bar
Fixed bottom center (bottom: 22px, left: 50%, translateX -50%)
Background: #1d1d1d, white text
14px radius, 8px 10px padding
Shadow: 0 8px 30px rgba(0,0,0,.3)
Close button: 36px, black background, 9px radius
Count: 15px/500, 0 16px padding
Action buttons: 38px, 9px radius, hover #333
Icons: 18px
Hamburger (mobile)
Fixed top-left (12px, 12px), z-index 60
42px square, white background, 1px border, 9px radius
Icon: 20px, stroke #333, stroke-width 2
---

5. Layout Principles
Structure
Flex row: sidebar (280px fixed, flex-shrink 0) + main (flex 1)
Main: flex column — stats → toolbar → table-wrap (flex 1, overflow-y auto)
Stats: 5-column grid, no gap, border-separated
Sidebar: flex column, user block pushed to bottom with margin-top auto
Spacing
Sidebar padding: 16px 14px
Stats padding: 18px 26px 12px
Toolbar padding: 14px 26px
Table cell padding: 12–13px 14px
Nav item padding: 9px 11px
Border Radius Scale
| Value | Use | |-------|-----| | 5px | Feature tags | | 6px | Keyboard hint boxes | | 7px | Status pills | | 9px | Nav items, quick actions, hamburger, selection bar buttons | | 10px | Quick actions card | | 14px | Selection bar container | | 20px | Count badges | | 50% | Avatars, circular controls |

Responsive Behavior
| Breakpoint | Changes | |-----------|---------| | ≤ 980px | Sidebar becomes fixed overlay (slides from left), hamburger appears, stats collapse to 2-column grid, sparklines hidden on stats 3+, position and city columns hidden |

---

6. Depth & Elevation
| Level | Treatment | Use | |-------|-----------|-----| | Level 0 | Flat surfaces (#fff, #f7f7f5) | All page backgrounds | | Level 1 | 1px border --border | Structural separation, cards, fields | | Level 2 | Subtle shadow 0 1px 2px rgba(0,0,0,.05) | Active nav item only | | Level 3 | Heavy shadow 0 8px 30px rgba(0,0,0,.3) | Floating selection bar |

No gradients. No blur/backdrop-filter. Depth is almost entirely border-led.

---

7. Do's and Don'ts
Do
Keep borders hairline (1px #ececec) — never thicken them
Use status pill colors consistently (green = active, blue = new, gray = non-responsive, yellow = VIP)
Keep the sidebar warm off-white, not pure gray
Use system font stack — no custom web fonts
Let data density speak; don't add padding beyond what's specified
Reserve #111 for the most emphatic interactive elements (logo, checkboxes, selection bar)
Don't
Don't introduce gradients or colored backgrounds beyond status pills
Don't add shadows beyond the two levels defined (active nav + floating bar)
Don't use color for nav icons — keep them stroke #555
Don't round corners beyond 14px (except avatars at 50%)
Don't add icons to status pills — text only
Don't mix warm sidebar tone (#f7f7f5) with cool grays
# UI Tokens — SafeBite (Full System)

---

# 🌐 Page: Landing

---

## 🧩 Navbar

component: navbar
variant: desktop + mobile

props:

* sticky: true
* has_mobile_menu: true

items:

* logo:

  * text: "SafeBite"
  * icon: "🍽️"

* links:

  * Product (#features)
  * Pricing (#pricing)
  * Resources (#resources)
  * Blog (#blog)
  * Sign in (#signin)

* cta:

  * label: "Sign up"
  * action: auth_redirect

---

## 🧩 Hero

component: hero
variant: dashboard-preview

content:

* heading: "Eat normally. Find safely."

* subtext: >
  Discover allergy-safe restaurants and dishes verified by people like you.
  Eat out with confidence, connect with your community, and never second-guess a menu again.

* ctas:

  * primary: "Start free"
  * secondary: "See how it works"

---

## 🧩 Hero Stats (Floating UI)

component: stat_cards
variant: floating

items:

* icon: 🥗
  value: "98%"
  label: "Safe match accuracy on verified dishes"

* icon: 📍
  value: "12,480"
  label: "Allergy-verified restaurants"

* icon: 💬
  value: "+5.9%"
  label: "Community reviews this week"

* value: "4,682"
  label: "Safe dishes found"

* value: "88%"
  label: "Average safety score"

---

## 🧩 AI Search

component: ai_search

props:

* has_input: true
* has_suggestions: true

content:

* placeholder: "Ask SafeBite to find restaurants..."
* suggestion: "Where can I find nut-free Thai food open near me right now?"

---

## 🧩 Partners

component: logo_cloud

items:

* Hotjar
* Loom
* Lattice
* Evernote

---

## 🧩 Features

component: feature_grid
variant: 3-column

items:

* title: "Find Safely"
  icon: search
  description: "Search restaurants filtered by allergy profile."
  stats: "12,480 verified spots"

* title: "Connect with Peers"
  icon: community
  description: "Join a community with shared dietary needs."
  stats: "48k members"

* title: "Earn as Creator"
  icon: monetization
  description: "Review dishes and earn income."
  stats: "$120k+ paid"

---

## 🧩 Testimonials

component: testimonials
variant: cards

items:

* quote: "SafeBite is my favorite tool for celiac life."
  author: "Jake George"
  meta: "Celiac · London"

* quote: "Removes the guesswork completely."
  author: "Steve Armenti"
  meta: "Parent"

* quote: "It pays me and helps my followers."
  author: "Sam Rahmanian"
  meta: "Creator"

---

## 🧩 FAQ

component: faq
variant: accordion

items:

* question: "How does SafeBite verify that food is safe?"
* question: "Is my health data secure?"
* question: "Can I use SafeBite abroad?"
* question: "Is there a free trial?"

---

## 🧩 CTA

component: cta_banner

content:

* heading: "Eat out without fear, starting today!"
* cta: "Start free"

---

## 🧩 Dashboard Preview (Embedded)

component: stat_cards
variant: inline

items:

* "Safe spots saved: 24"
* "Safety score: 88%"
* "Reviews written: 12"
* "Creator earnings: $76"

---

## 🧩 Footer

component: footer
variant: multi-column

columns:

* brand:

  * description: "Helping people eat safely everywhere"

* product:

  * Find Safely
  * Community
  * Creator Program
  * Pricing

* company:

  * About
  * Blog
  * Careers
  * Contact

* legal:

  * Privacy Policy
  * Terms of Service
  * Cookie Policy

---

# 🛠️ Page: Admin / Dashboard

---

## 🧩 Sidebar

component: sidebar
variant: vertical

items:

* Dashboard
* Restaurants
* Reviews
* Users
* Earnings
* Settings

---

## 🧩 Topbar

component: navbar

props:

* has_search: true
* has_notifications: true
* has_profile: true

---

## 🧩 Metrics

component: stat_cards
variant: grid

items:

* label: "Safe spots saved"
  value: 24

* label: "Safety score"
  value: "88%"

* label: "Reviews written"
  value: 12

* label: "Creator earnings"
  value: "$76"

---

## 🧩 Reviews Table

component: table

columns:

* Dish
* Restaurant
* Safety Rating
* Status

rows:

* "Pad Thai" | "Thai House" | "Safe" | "Approved"
* "Pizza" | "Urban Slice" | "Moderate" | "Pending"

---

## 🧩 Activity Feed

component: activity_list

items:

* "New review submitted"
* "Restaurant verified"
* "User joined community"

---

## 🧩 Earnings Chart

component: chart
type: bar

data:

* Jan: 120
* Feb: 240
* Mar: 310

---

## 🧩 Settings

component: form

fields:

* Name
* Email
* Allergy Preferences
* Notifications

---

# ⚙️ System Tokens (Global Logic)

---

## 🧩 Auth State

component: auth_state

states:

* logged_out:

  * primary_cta: "Start free"
  * redirect: login

* logged_in:

  * primary_cta: "Go to Dashboard"
  * redirect: dashboard

---

## 🧩 Search System

component: ai_search_engine

features:

* natural language queries
* allergy filtering
* real-time suggestions
* contextual recommendations

---

## 🧩 Notifications

component: toast

behavior:

* position: bottom-center
* auto-dismiss: true

use_cases:

* search feedback
* auth feedback
* navigation updates

---

## 🧩 Data Model (Implied)

entities:

* user:

  * allergy_profile
  * saved_places
  * reviews
  * earnings

* restaurant:

  * name
  * safety_score
  * verified_status

* review:

  * dish
  * rating
  * notes
  * author

---

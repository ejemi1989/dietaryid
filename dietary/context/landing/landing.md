# Safe Eating App - Homepage Specification

## Page: Homepage (`index.html`)

### Purpose

Landing page for the Safe Eating App that helps users find allergy-safe restaurants, connect with peers, and earn rewards by contributing reviews.

---

## Navigation Bar

### Elements

* App logo ("SafeBite" or Safe Eating App logo)
* Navigation links:

  * Product
  * Pricing
  * Resources
  * Blog
  * Sign In

### Behavior

* Clicking logo → Navigate to homepage (`index.html`)
* Navigation links → Navigate to corresponding pages/sections
* Responsive mobile menu supported

---

## Hero Section

### Headline

**Eat normally. Find safely.**

### Supporting Text

Brief description explaining that users can discover allergy-safe restaurants and dishes verified by the community.

### Primary Actions

#### Start Free Button

Default state:

* Label: `Start free`
* Action: Navigate to `login.html`

Logged-in state:

* Label: `Go to Dashboard`
* Action: Navigate to `dashboard.html`

#### See How It Works Button

* Label: `See how it works`
* Action: Smooth scroll to Features section

---

## Features Section

### Feature Card 1

#### Title

Find Safely

#### Description

Search restaurants and dishes filtered by allergy profile. View verified safety information before ordering.

---

### Feature Card 2

#### Title

Connect with Peers

#### Description

Join a community of people with similar dietary requirements and share experiences.

---

### Feature Card 3

#### Title

Earn as Creator

#### Description

Create reviews, verify menus, and publish local guides while earning rewards.

---

## Testimonials Section

### Testimonial 1

> "SafeBite helped me eat out confidently for the first time in years."

### Testimonial 2

> "Planning meals for my child with allergies is dramatically easier now."

### Testimonial 3

> "I earn money creating safe-eating guides for my city."

Requirements:

* Display 2–3 customer testimonials.
* Include customer name and brief description.

---

## Footer

### Links

* About
* Pricing
* Privacy Policy
* Terms of Service
* Contact

### Behavior

* Each link navigates to its corresponding page.

### Copyright

© SafeBite. All rights reserved.

---

# User Flows

## Flow: Visitor Starts Free

1. User clicks "Start free"
2. Navigate to `login.html`

---

## Flow: User Wants More Information

1. User clicks "See how it works"
2. Page scrolls to Features section

---

## Flow: User Clicks Logo

1. User clicks logo
2. Navigate to homepage (`index.html`)

---

# States

## Default State

When page loads:

* Navigation visible
* Hero section visible
* Feature cards visible
* Testimonials visible
* Footer visible
* All buttons clickable

---

## Logged-In State

Condition:

* User session exists

Changes:

* "Start free" button becomes "Go to Dashboard"
* Navigation CTA becomes Dashboard link
* Clicking CTA navigates to `dashboard.html`

---

# Technical Requirements

* Responsive design for desktop, tablet, and mobile
* Smooth scrolling for internal anchors
* Accessible buttons and navigation
* Semantic HTML structure
* Fast-loading static landing page
* Mobile navigation menu support

---

# File Structure

/pages

* index.html
* login.html
* dashboard.html
* pricing.html
* about.html
* contact.html
* privacy.html
* terms.html

/assets

* logo.svg
* styles.css
* app.js

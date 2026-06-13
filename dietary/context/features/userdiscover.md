# DietaryID Feature: Earn as Creator

## Core Value Proposition

**"Review dishes, verify menus, and create safe-eating guides for your city. Top contributors earn real rewards while helping thousands of others eat out without fear."**

---

## Feature Overview

Top community contributors can become "Creators" and earn money by:
1. Writing restaurant reviews
2. Verifying dish safety
3. Creating city guides
4. Building reputation
5. Earning from recommendations

**Key Differentiator:** Creators are trusted experts within the community. They earn because they help thousands of people eat safely.

---

## Pages: Creator Program

**URL:** `/creators` or "Earn as Creator" section

---

## Creator Hub (For Creators)

**URL:** `/dashboard/creator` (if user is creator)

**Shows on user dashboard for creators:**

### Welcome Section

**Heading:** "Your Creator Hub 🎉"

**Message:** "You've helped thousands eat safely. Keep building your guides and earn real rewards."

### Earnings Overview (Cards)

**4 cards showing this month:**

1. **Total Earned This Month**
   - Large number: "$47.50"
   - Icon: dollar sign
   - Trend: "↑ +$12 from last month"

2. **Bookings/Recommendations**
   - Large number: "8"
   - Icon: bookmark
   - Description: "People followed your recommendations"

3. **Reviews Written**
   - Large number: "24"
   - Icon: star
   - Description: "Verified dishes"

4. **Your Followers**
   - Large number: "347"
   - Icon: people
   - Description: "Trust your recommendations"

### Recent Earnings Activity

**Breakdown of how you earned this month:**

```
Restaurant Reviews Written: $32.50
  - 24 reviews × $1.35 per review

Dishes Verified: $8.50
  - 17 verifications × $0.50 each

City Guide Created: $6.50
  - "Gluten-Free Manchester" guide
  - Helps people trust your guides

Total: $47.50
```

### Creator Stats

**Detailed stats:**

| Metric | Value |
|--------|-------|
| Total Earned (All Time) | $347.20 |
| Reviews Written | 156 |
| Dishes Verified | 89 |
| Followers | 347 |
| Guide You Created | "Gluten-Free Manchester" |
| Community Rating | ⭐ 4.9 (based on feedback) |

### Action Buttons

- **Write a Review** (blue) → new review form
- **Verify a Dish** (blue) → search restaurant then verify dish
- **Create a Guide** (blue) → city guide creator
- **View Your Profile** → public creator profile

### Your Top Contributions

**Showcase:**

```
🏆 Top Reviewed Restaurant
   The Healthy Bowl Co - 23 reviews by you

🌟 Most Helpful Review
   "This restaurant understands Celiac better 
    than any place I've been..." 
   - 142 people found this helpful

📖 Most Useful Guide
   "Gluten-Free Eaters' Guide to Manchester"
   - 1,200+ people saved this

👥 Fastest Growing Follower Base
   +56 followers this month
```

---

## Becoming a Creator

**URL:** `/become-creator` or button in dashboard

### Creator Application (Lightweight)

**Form:**

1. **Your Restriction/Expertise**
   - Multi-select: Celiac, Crohn's, IBS, Nut Allergy, etc.
   - Required: at least one

2. **City(s) You Focus On**
   - Text input: Manchester, London, Glasgow, etc.
   - Optional: can focus on multiple

3. **Why Are You Becoming a Creator?**
   - Text area (250 chars)
   - Example: "I want to help other people with Celiac find safe restaurants in Manchester. I've been to 50+ places and know what to look for."

4. **Commitment**
   - Checkbox: "I commit to writing honest reviews"
   - Checkbox: "I understand DietaryID's creator guidelines"

5. **Apply button**

**Approval process:**
- Instant approval for most (within 1 hour)
- Or 24-hour review by DietaryID team
- Email confirmation: "Welcome to the Creator Program!"

### Creator Guidelines

**Users see before applying:**

1. **Review honestly.** Your reputation is everything.
2. **Verify with restaurants.** Always confirm menu changes.
3. **No fake reviews.** We remove creators who make things up.
4. **Help, don't promote.** You're helping community, not your friends.
5. **Detail matters.** People rely on your specific observations.

---

## Writing Reviews (For Creators)

**Enhanced review form (vs. regular community member):**

**Same as community reviews, PLUS:**

1. **Detailed Dish Analysis**
   - Ingredient breakdown
   - Cross-contamination risk assessment
   - Staff knowledge rating
   - Modifications available

2. **Restaurant Professionalism**
   - How serious they take allergies (1-5 scale)
   - Staff training level (apparent)
   - Menu clarity
   - Procedure for allergy orders

3. **Safe-To-Order Confidence**
   - Sliding scale: 1-10
   - Example: "I'm 9/10 confident. They're very careful. Only reason not 10/10 is kitchen is small."

4. **Specific Details**
   - How you confirmed safety (asked manager? saw label? experience?)
   - Cross-contamination procedures you observed
   - Staff handling of your allergy

5. **Would You Eat Here Again?**
   - Yes / No / Maybe (with notes)

6. **Publish to Your Guide** (if you have a guide)
   - Add to "Gluten-Free Manchester" guide
   - Automatically added to your public guide

**Review impact:**
- Displayed prominently on restaurant page
- Creator badge shows this is from an expert
- Earns review credit ($1.35 per review)

---

## Verifying Dishes

**Streamlined process for creators:**

1. Find restaurant/dish
2. Click "Verify This Dish" 
3. Form appears:
   - Confirm you ordered it
   - Confirm date
   - Star rating (specifically for safety)
   - Detailed notes
   - Confidence level (1-10)
4. Submit
5. Earns: $0.50 per verification

**Why separate from reviews?** Creators can quickly verify multiple dishes at one restaurant without writing full reviews.

---

## Creating City Guides

**Extended content creators can write guides:**

**URL:** `/creators/guides/create`

**Guide creation:**

1. **Guide Title**
   - Example: "The Ultimate Gluten-Free Eater's Guide to Manchester"
   - Max 100 chars

2. **Description**
   - Overview of guide (250 chars)
   - Example: "A complete guide to gluten-free friendly restaurants, bakeries, and cafes in Manchester. Written by someone with Celiac who's tried them all."

3. **Restriction Type**
   - What this guide is for
   - Example: Gluten-Free

4. **City/Region**
   - Where this guide applies
   - Example: Manchester, UK

5. **Add Restaurants**
   - Search and add restaurants from database
   - Add your own reviews/notes for each
   - Organize into sections:
     - "Must-Try Restaurants"
     - "Quick Lunch Spots"
     - "Gluten-Free Bakeries"
     - "Careful with This One"
     - etc.

6. **Pro Tips Section**
   - Write general tips (1000 char limit)
   - Example: "Manchester restaurants are generally good about allergen info. Always confirm cross-contamination procedures with staff."

7. **Where to Avoid**
   - List restaurants that aren't safe (warning section)
   - Why to avoid each
   - Better alternatives

8. **Q&A from Followers**
   - Anticipated questions and answers
   - Update as people ask questions

9. **Last Updated Date**
   - Auto-tracked
   - Shows "Updated 2 days ago"
   - Maintains trust (recent = accurate)

**Action buttons:**
- Save as Draft (gray)
- Publish (blue)
- Preview (blue outline)

**Earnings:**
- Guides earn $6.50 flat per guide created
- Earns ongoing as people save/use guide
- Bonus if guide becomes "Trending Guide"

---

## Creator Profile Page

**URL:** `/creators/[username]` or `/creator-profiles/[id]`

**Viewed by community members:**

### Creator Header

- Creator name (bold, large)
- Creator badge: "✓ Verified Creator"
- Avatar (circle)
- City/Region they focus on
- Restrictions they specialize in: "Celiac Expert" or "Crohn's Guide"
- Follow button
- Message button (contact)

### Creator Stats

- ⭐ Rating: "4.9 stars" (based on review feedback)
- 📝 Reviews written: "156"
- 💾 Dishes verified: "89"
- 👥 Followers: "347"
- 📖 Guides: "1" ("Gluten-Free Manchester")

### Creator Bio

- Short bio (250 chars)
- "I've had Celiac for 8 years and have tried every restaurant in Manchester. I share honest reviews to help others eat safely."

### Featured Guide

**Shows:**
- Guide title
- Description
- Restaurants included: "[N] restaurants"
- Saves: "[N] people saved"
- "Read Full Guide" button

### Recent Reviews

**Shows latest 5 reviews they wrote:**
- Restaurant name
- Review excerpt
- Date
- Rating
- "See full review" link

### Reputation Section

**Builds trust:**
- "Joined Creator Program: Jan 2023"
- "Removed/edited: 0 reviews" (transparency on accuracy)
- "Member feedback: [Quote from someone helped]"
- Average review rating: "4.9 stars"

---

## Earnings & Payouts

### How Creators Earn

**Breakdown:**

| Activity | Earnings |
|----------|----------|
| Restaurant Review | $1.35 |
| Dish Verification | $0.50 |
| City Guide | $6.50 flat + ongoing |
| Recommendation Booking | $0.10 per booking |

**Example:** Creator writes 20 reviews, verifies 10 dishes, creates 1 guide
- 20 × $1.35 = $27
- 10 × $0.50 = $5
- 1 × $6.50 = $6.50
- **Total: $38.50/month**

### Payout Schedule

**Earnings appear in "Creator Wallet":**
- Monthly payouts (15th of each month)
- Minimum $5 to receive payout
- Payment method options:
  - Bank transfer (US, UK, EU)
  - PayPal
  - Stripe
  - Apple Pay (if $100+)

**Transparency:**
- Shows all pending earnings
- Shows all paid out earnings (history)
- Tax documents available (if $20k+ annually)

### Payout Page

```
Your Creator Earnings

Current Balance: $47.50
Last Payout: $127.30 (Sept 15, 2024)
Next Payout: Oct 15, 2024

Earnings This Month:
├─ Restaurant Reviews (24): $32.40
├─ Dish Verifications (17): $8.50
└─ City Guide Earnings: $6.50

Lifetime Earnings: $892.10

Payout Method: Bank Transfer to [account ending 4567]
```

---

## Creator Reputation System

**Building trust:**

### Review Quality

**DietaryID team reviews creator reviews:**
- Are they detailed?
- Are they honest?
- Do they follow guidelines?

**Actions if low quality:**
- Warning: "Your reviews seem less detailed than usual"
- If continues: temporary suspension
- If repeated: removal from creator program

### Follower Feedback

**Followers can rate helpfulness:**
- "Was this review helpful?" button
- Yes/No/Somewhat
- Feedback aggregated

**If review gets low scores:**
- Creator gets notified
- Optional explanation message
- Can edit review if needed

### Community Moderation

**Community can report reviews:**
- "This review seems inaccurate"
- "This restaurant disputes this claim"
- DietaryID investigates
- If false, review removed or marked disputed

---

## Leaderboards (Optional)

**NOT recommended for DietaryID culture**, but optional:

- "Top Reviewers This Month"
- "Most Helpful Guides"
- "Growing Fastest"

**Why optional?** Leaderboards create competition. DietaryID is about support, not ranking.

**Better:** Just recognize creators individually with badges/testimonials.

---

## Creator Support

**Resources for creators:**

- "How to Write a Great Review" guide
- "Common Mistakes" (what to avoid)
- Community moderation guidelines
- Payout FAQ
- Contact support (email)

---

## Copy/Tone

**For Creator Program:**

"Turn your expertise into impact. Every review you write helps hundreds of people eat safely."

"Become a guide for your community. Your knowledge matters."

"You've tried 50+ restaurants. Now help others find the safe ones."

"Earn $1.35 per review. Build your reputation. Help your community."

"Creators are the backbone of DietaryID. You verify what's safe so thousands can eat with confidence."

---

## Summary

**Core Purpose:** Monetize expertise. Reward trusted members who verify restaurants and create guides. Build a sustainable creator economy.

**Key Features:**
1. Creator application (lightweight)
2. Enhanced review writing with detailed analysis
3. Dish verification (quick verification)
4. City guide creation
5. Creator public profiles
6. Earnings dashboard
7. Monthly payouts
8. Reputation system (quality control)
9. Creator badges (trust signals)
10. Leaderboards (optional, community-focused)

**Earnings:**
- Reviews: $1.35 each
- Verifications: $0.50 each
- Guides: $6.50 + ongoing
- Recommendations: $0.10 per booking

**Payment:**
- Monthly payouts
- Multiple payout methods
- Tax documents for serious creators

**Tone:** Appreciative, empowering, transparent

**Outcome:** Expert community members are rewarded. They stay engaged. Quality content improves. Thousands benefit from their knowledge.
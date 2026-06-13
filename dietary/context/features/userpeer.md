# DietaryID Feature: Connect with Peers

## Core Value Proposition

**"Join a community of people with the same dietary needs as you. Share experiences, swap restaurant tips, and get honest answers from people who actually understand your allergies."**

---

## Feature Overview

Community connection is DietaryID's heart. Peers provide validation, support, and practical knowledge. Not expert-driven. Peer-driven.

**Key Differentiator:** Real people with your allergies. Not nutritionists, doctors, or companies. Your people.

---

## Pages: Community Hub

**URL:** `/community` or "Community" tab in navigation

---

## Community Hub (Main Page)

### Header
- Heading: "DietaryID Community"
- Subheading: "Real people, real experiences, real help"
- Member count: "[X] people eating safely together"

### Community Stats (Top Cards)

**4 cards showing:**

1. **Community Members**
   - Large number (e.g., "12,450")
   - Icon: people
   - "Active users eating safely this week"

2. **Posts This Week**
   - Large number (e.g., "847")
   - Icon: chat bubble
   - "Tips, questions, wins, advice"

3. **Restaurants Verified**
   - Large number (e.g., "2,341")
   - Icon: check + fork
   - "By our community"

4. **Reviews Written**
   - Large number (e.g., "14,732")
   - Icon: star
   - "Helping each other eat safely"

### Community Feed (Main Section)

**Heading:** "What's Happening in Your Community"

**Filter tabs:**
- All (default)
- Trending
- Recent
- By restriction type (Celiac, Crohn's, IBS, etc.)
- Questions
- Restaurant recommendations
- Tips & Hacks

**Sort dropdown:**
- Newest first
- Trending (likes, comments)
- Most helpful
- Most recent comments

### Post Cards (In Feed)

**Each post shows:**

```
👤 Sarah M. | Has Celiac
   2 hours ago | Manchester

   TITLE: "Just discovered the best gluten-free 
           pizza place in Manchester!! 🍕"

   CONTENT: "The Healthy Crust on King Street. 
            They have a dedicated oven for 
            gluten-free. Super knowledgeable staff. 
            I've been 3 times and zero reactions. 
            If you're in Manchester, you HAVE to 
            go. 10/10 would recommend."

   CATEGORY: Restaurant Recommendation
   RESTRICTION: Gluten-Free

   ❤️ 142 likes | 💬 23 comments | 🔖 18 saves

   [See full post] [Reply] [Share] [Save]
```

**Post types/categories:**
- 🍽️ **Restaurant Recommendation** — "Just tried this place and it's amazing!"
- 💬 **Question** — "Has anyone tried [Restaurant]?"
- 💡 **Tip/Hack** — "Here's how I handle [situation]"
- 🎉 **Celebration/Win** — "I just successfully ate out and felt great!"
- ⚠️ **Warning** — "Be careful at [Restaurant], had a reaction"
- 💪 **Advice/Support** — "Going through this, here's what helped me"
- 📣 **Announcement** — Community news, new restaurants, events

**Visual indicators:**
- Post type badge (color-coded)
- Restriction type badge
- User restriction matches post restriction → highlight: "Has Celiac like you"
- Emoji in header for easy scanning

### User Actions on Posts

- Click post → opens full post detail page
- Like button → increments likes (count updates)
- Reply button → opens reply form
- Save button → adds to saved posts
- Share button → share with friend or social media
- Report button → flag inappropriate content
- Follow author button (on detail page)

### Comment Thread (Brief View)

**Shows top 2 comments, then "View all [N] comments" link**

```
👤 Mike H. | Has Celiac
   "YES! I was just there last week. The staff 
    really knows their stuff. Worth the trip!"
   ❤️ 34 | Reply

👤 Jordan L. | Has IBS
   "Question - do they have options for IBS? 
    I see they're gluten-free but looking for 
    low-FODMAP options too"
   ❤️ 12 | Reply

[View all 23 comments]
```

---

## Create Post

**Button:** "Share Your Experience" (prominent, blue)

**Modal/Page:**

**Form fields:**

1. **Post Type** (required)
   - Radio buttons for category
   - Restaurant Recommendation
   - Question
   - Tip/Hack
   - Celebration/Win
   - Warning
   - Advice/Support
   - Announcement

2. **Title** (required)
   - Placeholder: "What's on your mind?"
   - Character limit: 100 chars
   - Counter shows remaining

3. **Content** (required)
   - Text area
   - Placeholder: "Share your experience, question, or advice..."
   - Character limit: 2000 chars
   - Formatting options (bold, italic, links)

4. **Restriction Type** (optional)
   - Multi-select from user's restrictions
   - Or "General (for all restrictions)"

5. **Tag a Restaurant** (if restaurant recommendation)
   - Search box: find restaurant
   - Shows restaurant name
   - Adds link to restaurant page

6. **Photo Upload** (optional)
   - Upload meal photos, proof, etc.
   - Drag and drop
   - Max 5 images

7. **Privacy** (optional)
   - Public (all community)
   - Restriction type only
   - Friends only

**Action buttons:**
- Post (blue) - publishes post
- Save as draft (gray)
- Cancel

**States:**
- Filling form
- Saving (spinner)
- Posted (success message)
- Error (validation)

---

## Post Detail Page

**URL:** `/community/[post-id]`

**Shows full post with all comments:**

### Post Header
- Author avatar, name, restriction
- "Follow" button (if not following)
- Timestamp
- Post type category badge
- Restriction type badges

### Post Content
- Full title
- Full text
- Photos (if any)
- Tags (restaurant link, etc.)

### Engagement Stats
- ❤️ [N] likes
- 💬 [N] comments
- 🔖 [N] saves
- Views: "[N] views"

### Action Buttons
- Like button (heart outline)
- Reply button
- Save button
- Share button
- Report button (if inappropriate)

### Full Comment Thread

**All comments shown:**
- Author avatar, name, restriction
- Comment timestamp
- Comment text
- Photos (if any)
- Like count
- Reply count
- Collapse thread option (if replies to replies)

**Add Comment Section:**
- Text input: "Add your comment..."
- Send button
- Character limit: 500 chars

**User Actions:**
- Type comment → text appears
- Click Send → comment posts
- Like comment → heart fills
- Reply to comment → reply form appears
- Report comment → flag inappropriate
- Delete own comment
- Edit own comment

---

## Questions & Answers

**If post type is "Question":**

**Community can mark helpful answers:**
- "Mark as Helpful" button on comments
- Most helpful answer pinned to top
- Encourages good Q&A community

**Example:**
```
❓ Has anyone tried The Healthy Cafe?
   Jordan L. | Has Celiac
   2 days ago

   [3 helpful answers] [12 comments]

   ✓ HELPFUL ANSWER (pinned)
   👤 Sarah M. | Has Celiac
      "Yes! I've been twice. Super careful with 
       cross-contamination. Recommend 100%."
      ✓ Marked helpful by 34 people

   [View all 3 answers]
```

---

## Community Moderation

**Community management:**
- Report button on all content
- Community moderators review flagged posts
- Remove spam, harassment, misinformation
- Warn users if repeated violations
- Ban for severe violations

**User can report:**
- Spam
- Misinformation/false claims
- Harassment
- Inappropriate content
- Off-topic posts

---

## Private Messaging/Direct Connection

**Button on community posts:** "Message [User]"

**Opens direct message conversation:**
- One-on-one private chat
- Share advice, coordinate meal plans, etc.
- Peer support outside public forum

---

## Following & Notifications

**Users can follow peers:**
- "Follow" button on user profile or posts
- Get notifications when they post
- See their activity in your feed
- Can unfollow anytime

**Notifications:**
- Someone liked your post
- Someone commented on your post
- Someone you follow posted
- Someone replied to your comment
- Someone messaged you

---

## Restriction Type Communities

**Sub-communities by restriction (optional):**

**If user has Celiac:**
- Join "Celiac Community" section
- See posts from other Celiac members
- Filter feed to just Celiac-related content
- More targeted advice

**If user has Crohn's:**
- Join "Crohn's Community" section
- Similar targeted experience

**Users can join multiple communities if they have multiple restrictions.**

---

## Community Badges & Recognition

**Optional gamification for engagement:**

**Badges earned:**
- 🌟 **Helpful Contributor** — 10+ comments marked helpful
- 🏆 **Verified Reviewer** — 20+ restaurant reviews
- 💪 **Community Leader** — Active participant, positive influence
- 🔥 **Trending Creator** — Post went viral (500+ likes)
- 🤝 **Friend Maker** — 10+ people followed you

**Show badges on:**
- User profile
- Posts (next to name)
- Leaderboard (optional)

**Don't show:**
- Leaderboards (competitive can hurt supportive community)
- Public XP/points
- Rankings by engagement

**Why?** We want support, not competition. DietaryID is about helping each other, not being "best."

---

## Community Guidelines

**Highlighted to all users:**

1. **Be kind.** We're all figuring this out together.
2. **Share honestly.** Your truth helps others.
3. **Respect privacy.** Don't share others' medical info.
4. **No medical advice.** Share experiences, not prescriptions.
5. **No self-promotion.** DietaryID community for peers, not brands.
6. **No misinformation.** Verify restaurant claims.

---

## Mobile Experience

**Optimized for mobile:**
- Feed scrolls naturally (TikTok-like)
- Tap to like, reply, save
- Bottom action buttons for easy thumb reach
- Swipe to see more options
- Simplified comment threads
- Full screen post view with comments

---

## Copy/Tone

**For Community Feature:**

"Your community gets it. No judgment, just honest advice from people eating safely every day like you."

"Have a question? Ask here. Someone with Celiac (or IBS, or Crohn's) has probably faced the same thing."

"Found a safe restaurant? Tell your community. Your review might be the permission someone needs to try eating out again."

"This restaurant almost made me sick. Warning to others."

"I just successfully ate out and felt AMAZING. 🎉 This community made it possible."

---

## Summary

**Core Purpose:** Peer support and knowledge sharing. Community members validate each other's experiences and help problem-solve.

**Key Features:**
1. Community feed of peer posts
2. Post types (recommendations, questions, tips, celebrations, warnings)
3. Restriction-type filtering
4. Comment threads with helpful marking
5. Direct messaging between peers
6. Following system
7. Badges for helpful contributors
8. Moderation to keep community safe
9. Mobile-friendly scrolling
10. Posts about restaurants, tips, support

**NOT:**
- Expert advice
- Medical information
- Doctors/nutritionists
- Corporate content
- Advertising

**Tone:** Supportive, honest, peer-to-peer, empowering

**Outcome:** Users feel less alone. They get practical advice from people like them. They help others. They build community.
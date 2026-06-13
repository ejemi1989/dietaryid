# DietaryID Restaurant Owner Interface

## Overview

Complete interface for restaurant owners to:
- Claim and manage their restaurant profile
- Verify menu items and allergen information
- Respond to customer reviews
- Track analytics and customer insights
- Manage staff training
- See customer booking flow
- Use marketing tools
- Access support resources

---

## Navigation Structure

```
RESTAURANT OWNER DASHBOARD
├── HOME/OVERVIEW
│   └── Dashboard (main view)
├── PROFILE
│   ├── Restaurant Info
│   ├── Menu Management
│   ├── Allergen Verification
│   └── Staff & Training
├── CUSTOMER INSIGHTS
│   ├── Reviews & Ratings
│   ├── Analytics
│   └── Customer Feedback
├── MARKETING & GROWTH
│   ├── Your Badge & Verification
│   ├── Share Profile
│   ├── Promotions (future)
│   └── Marketing Resources
├── OPERATIONS
│   ├── Booking Requests
│   ├── Customer Messages
│   └── Reservation Calendar
├── SETTINGS
│   ├── Account Settings
│   ├── Team Management
│   ├── Payment Methods
│   └── Notifications
└── HELP & SUPPORT
    ├── Documentation
    ├── Video Tutorials
    ├── Contact Support
    └── FAQ
```

---

## Page 1: Restaurant Owner Login/Signup

**URL:** `/restaurant-login` or `/restaurant/signup`

### Login Page

**Header:**
- "DietaryID for Restaurants"
- Subheading: "Reach allergy-conscious customers & grow your business"

**Login form:**
- Email (text input)
- Password (password input)
- "Forgot password?" link
- "Login" button (blue)
- "Sign up for free" link

**Sign up option:**
- "New restaurant? Create your account"
- Redirects to signup form

### Signup Page

**Step 1: Restaurant Info**
- Restaurant name (text input)
- Restaurant email (text input)
- Your name (text input)
- Your role (dropdown: Owner, Manager, Staff)
- City/Region (text input)
- Password (password input)
- Confirm password

**Step 2: Restaurant Details (after step 1)**
- Restaurant type (dropdown: Fast Casual, Fine Dining, Cafe, Pub, Other)
- Cuisine type (multi-select: Italian, Asian, Mediterranean, etc.)
- Address (text input)
- Phone (text input)
- Website (text input, optional)

**Step 3: Allergen Management Philosophy**
- "Which allergies do you take seriously?" (checkboxes)
  - Celiac/Gluten-free
  - Nut allergies
  - Shellfish allergies
  - Dairy allergies
  - All of above

- "Tell us about your allergen procedures" (text area, optional)
  - Example: "We use dedicated prep areas and utensils for allergen orders"

- "Do you have staff training?" (radio)
  - Yes, comprehensive
  - Yes, basic
  - In progress
  - Not yet

**Step 4: Verify & Launch**
- Review all info
- "Create account" button
- Profile goes live immediately

**After signup:**
- Welcome email with next steps
- Redirect to Dashboard
- Onboarding tooltip: "Next: Verify your menu"

---

## Page 2: Dashboard (Main Overview)

**URL:** `/restaurant/dashboard`

**Location:** First page after login

### Welcome Section

**Greeting:**
"Welcome back, [Restaurant Name] 👋"

**Quick status:**
```
Your Verification Status: ✓ Verified Safe for Celiac, Gluten-Free
Last Updated: Jan 10, 2024
Customer Reach: 2,340 people with allergies in your area
```

### Key Metrics Cards (Top Section)

**4-6 cards showing:**

1. **Profile Views**
   - Large number: "284"
   - Icon: eye
   - Subtext: "People viewed your profile this month"
   - Trend: "↑ +47 from last month"

2. **Average Safety Rating**
   - Score: "4.8★"
   - Icon: star
   - Breakdown: "Safe for Celiac: 4.8, Safe for Gluten-Free: 4.6"
   - Subtext: "From 47 customer reviews"

3. **New Customers from DietaryID**
   - Number: "12"
   - Icon: person + arrow
   - Subtext: "This month"
   - Est. revenue: "$240-360" (based on avg check)

4. **Verified Dishes**
   - Number: "8"
   - Icon: check + fork
   - Subtext: "Menu items verified safe"
   - "Add more" button

5. **Review Sentiment**
   - Positive: "45 reviews"
   - Neutral: "2 reviews"
   - Concerning: "0 reviews"
   - Visual: Green bar (positive), yellow bar (neutral), red bar (concerning)

6. **Booking Requests**
   - Number: "3"
   - Icon: calendar + person
   - Subtext: "Pending responses"
   - "View all" button

### Action Cards (Prominent CTAs)

**Large cards with next steps:**

1. **Next Step: Complete Menu Verification**
   - "Only 8 of 20 menu items verified"
   - Progress bar: "40% complete"
   - "Continue verification" button → goes to menu manager
   - Estimate: "15 minutes to complete"

2. **Quick Action: Respond to New Review**
   - "1 new review from Sarah M. (Celiac)"
   - Review preview: "Excellent cross-contamination procedures!"
   - "Respond" button → goes to review response

3. **Growth Tip: Use Your Badge**
   - "You're now verified safe for Celiac!"
   - "Add this badge to your website or social media"
   - Badge preview (image)
   - "Copy badge code" button → HTML code
   - "View more marketing resources" button

### Analytics Overview Chart

**Line chart showing:**
- Profile views over last 30 days
- Trend going up/down
- Average per day shown
- Hover for details

### Recent Reviews Section

**Last 3 reviews:**
```
👤 Sarah M. | Has Celiac
   ⭐⭐⭐⭐⭐ | 2 days ago
   
   "Excellent cross-contamination procedures. 
    Staff was knowledgeable and took my allergy 
    seriously. Highly recommend!"
   
   [Respond] [Thank them]

👤 Mike H. | Has Gluten-free
   ⭐⭐⭐⭐ | 5 days ago
   
   "Great options, but I'd suggest labeling 
    the gluten-free items more clearly."
   
   [Respond] [Address feedback]

👤 Jordan L. | Nut allergy
   ⭐⭐⭐⭐⭐ | 1 week ago
   
   "Best nut-free restaurant in Manchester. 
    Staff super careful. Worth the trip!"
   
   [Respond]
```

**"View all reviews" link** → goes to reviews page

### Bottom Section: Suggested Improvements

**Based on customer feedback:**
- "3 reviews mention wanting vegan + gluten-free options"
- "2 reviews praise your cross-contamination procedures"
- "Action: Consider expanding vegan menu items"

---

## Page 3: Restaurant Profile Management

**URL:** `/restaurant/profile` or `/restaurant/edit`

### Tab 1: Basic Information

**Form fields:**
- Restaurant name (text input)
- Restaurant type (dropdown)
- Cuisine types (multi-select)
- Address (text input)
- Phone (text input)
- Website (text input)
- Hours (time inputs for each day)
- Description (text area)

**Save button** (blue)

**Success state:** "Profile updated successfully"

---

### Tab 2: Menu Management

**URL:** `/restaurant/menu`

**Heading:** "Menu Management"

**What it shows:**

1. **Menu Items List**
   - Table showing all menu items
   - Columns:
     - Item name
     - Category (Appetizer, Main, Dessert, etc.)
     - Verification status (✓ Verified / ⏳ Pending / ✗ Not verified)
     - Safe for: (Gluten-free ✓, Nut-free ✗, Dairy-free ✓)
     - Actions (Edit, Verify, Delete)

**Example:**
```
APPETIZERS
├─ Grilled Shrimp          ✓ Verified    GF ✓ NF ✗ DF ✓    [Edit] [Verify]
├─ Caesar Salad (GF)       ✓ Verified    GF ✓ NF ✓ DF ?    [Edit]
└─ Bruschetta             ⏳ Pending     GF ✗ NF ✓ DF ✓    [Edit] [Verify]

MAINS
├─ Grilled Salmon         ✓ Verified    GF ✓ NF ✓ DF ✓    [Edit]
├─ Pasta Primavera        ✗ Not verified GF ? NF ? DF ?    [Edit] [Verify]
└─ Steak with Vegetables  ✓ Verified    GF ✓ NF ✓ DF ✗    [Edit]

DESSERTS
└─ Chocolate Cake (GF)    ✓ Verified    GF ✓ NF ✗ DF ✗    [Edit]

+ ADD MENU ITEM
```

2. **Add New Item Button**
   - Blue button: "+ Add Menu Item"
   - Opens form for new item

3. **Import Menu**
   - Option to upload menu PDF/image
   - System helps extract items
   - Alternative to manual entry

### Add/Edit Menu Item Form

**Form fields:**

**Section 1: Item Details**
- Item name (text input, required)
- Category (dropdown: Appetizer, Main, Dessert, Beverage, Side, Other)
- Description (text area, optional)
- Price (number input, optional)

**Section 2: Ingredients** (required)
- List of ingredients
- For each ingredient:
  - Ingredient name (text input)
  - Common allergens it contains (multi-select auto-complete)
  - Add ingredient button
  - Remove ingredient (X)

**Example:**
```
Ingredients for "Grilled Salmon":
├─ Salmon fillets
├─ Olive oil (auto-detected: may contain)
├─ Garlic
├─ Lemon juice
├─ Black pepper
└─ Sea salt
```

**Section 3: Allergen Information** (critical)

**Pre-filled based on ingredients, but editable:**
- Contains Gluten: Yes / No / Possible
- Contains Nuts: Yes / No / Possible
- Contains Shellfish: Yes / No / Possible
- Contains Fish: Yes / No / Possible
- Contains Eggs: Yes / No / Possible
- Contains Dairy: Yes / No / Possible
- Contains Soy: Yes / No / Possible
- Contains Sesame: Yes / No / Possible
- Other allergens: (text input)

**Cross-contamination notes:**
- "This item is prepared in [location] which also prepares [allergen items]"
- "Uses shared fryer with breaded items"
- "Prepared in separate area"

**Section 4: Safe-For Labels** (helpful)

**Based on above, suggests:**
- ✓ Gluten-free (if no gluten)
- ✓ Nut-free (if no nuts)
- ✓ Dairy-free (if no dairy)
- ✓ Vegan (if no animal products)
- etc.

**Restaurant can override if needed.**

**Section 5: Modifications Available**

**Can this be modified for allergies?**
- Yes: (list mods: "Can remove X", "Can use alternative Y")
- No: (reason: "Prepared with X baked in")

**Example:**
```
✓ Can be modified for allergies:
  • Can remove cheese (make dairy-free)
  • Can use olive oil instead of butter
  • Can serve gluten-free bread on request
```

**Form buttons:**
- Save item (blue)
- Save & add another (blue)
- Cancel (gray)
- Delete (red, only on edit)

### Verification Status

**For each item:**
- ✓ Verified — DietaryID confirmed ingredients, approved
- ⏳ Pending — Submitted, awaiting verification
- ✗ Not verified — No verification done
- ⚠️ Needs update — Verification outdated, needs refresh

**What "Verified" means:**
- Ingredients confirmed
- Allergen info accurate
- Cross-contamination noted
- Suitable for DietaryID reviews

---

## Page 4: Allergen Verification

**URL:** `/restaurant/verification`

### Verification Overview

**Heading:** "Menu Verification"

**Status summary:**
```
Your Verification Progress

Verified Items: 8 of 20 (40%)
Pending Review: 2 items
Ready to Verify: 10 items

Next Step: Verify "Pasta Primavera"
Estimate: 5 minutes
```

**Progress bar:**
- Shows visual progress toward full verification
- Color changes as percentage increases (red → yellow → green)

### Items Ready to Verify

**List of items not yet verified:**

For each item:
```
ITEM: Pasta Primavera
Status: Ready to verify
Category: Main course

Ingredients:
├─ Pasta (potential allergen: Gluten)
├─ Tomato sauce
├─ Basil
├─ Garlic
├─ Olive oil
└─ Parmesan cheese (potential allergen: Dairy)

Your allergen info:
✗ Gluten: Contains (pasta)
✗ Dairy: Contains (cheese)
✓ Nut-free: Yes
✓ Gluten-free version available: No

Question: Can this dish be modified for allergies?
○ Yes, modifications available (describe)
○ No, not suitable for modification

[Verify This Item] [Skip for Now]
```

**Click "Verify This Item":**
- Confirms you've reviewed allergen info
- System cross-checks with database
- Item marked as verified
- Next item loads

### Batch Verification

**Option to verify multiple items at once:**
- Checkbox to select multiple items
- "Verify selected items" button
- Shows checklist of items
- "Confirm all accurate" → all marked verified

### Verification Request from DietaryID

**If user requests verification (optional):**
- "Verify with Restaurant Staff" button in app (user side)
- Restaurant gets email: "DietaryID user wants to confirm [item]"
- Restaurant can:
  - Confirm it's safe: ✓
  - Note modifications: "Yes, but only with gluten-free pasta"
  - Say it's not suitable: ✗

---

## Page 5: Reviews & Ratings

**URL:** `/restaurant/reviews`

### Reviews Overview

**Heading:** "Customer Reviews"

**Summary cards:**

```
Your Ratings

Overall: ⭐ 4.8 (47 reviews)
├─ Safe for Celiac: ⭐ 4.8 (23 reviews)
├─ Safe for Gluten-Free: ⭐ 4.6 (12 reviews)
├─ Safe for Nut Allergy: ⭐ 4.9 (8 reviews)
└─ Safe for IBS: ⭐ 4.3 (4 reviews)

Review Sentiment:
├─ Positive: 45 reviews ✓
├─ Neutral: 2 reviews →
└─ Concerning: 0 reviews ✗

Response Rate: 92% (44 of 47 reviews responded)
```

### Filters & Sort

**Filter by:**
- All reviews
- By allergen type (Celiac, Gluten-free, etc.)
- By rating (5★ only, 4★+, All)
- By sentiment (Positive, Neutral, Concerning)
- By response status (Responded, Not responded)

**Sort by:**
- Most recent
- Highest rated
- Lowest rated
- Most helpful

### Reviews List

**Each review card shows:**

```
👤 Sarah M. | Has Celiac
   ⭐⭐⭐⭐⭐ | 2 days ago

   "Excellent cross-contamination procedures. 
    Staff was knowledgeable and took my allergy 
    seriously. Highly recommend!"

   Helpful: 12 people found this helpful

   [✓ Responded: "Thank you Sarah! We appreciate 
              your trust. Hope to see you soon!"]
              
   [Reply Again] [Pin Review] [Report/Hide]
```

**If review is concerning:**

```
👤 Jordan L. | Has Nut Allergy
   ⭐⭐ | 1 week ago

   ⚠️ CONCERNING REVIEW

   "Had a reaction after eating here. 
    Staff said the nuts were 'just a little bit' 
    which wasn't acceptable for my severe allergy."

   Helpful: 8 people found this helpful

   [✗ Not yet responded]

   [Respond Immediately] [Request Info from Customer]
```

### Respond to Review

**Click "Reply" or "Respond Immediately":**

**Modal/Form:**
- Review displayed (read-only)
- Response text area
  - Placeholder: "Thank you for the feedback..."
  - Max 500 characters
- Options:
  - ✓ "Thank you for positive feedback"
  - ✓ "Address concern mentioned"
  - ✗ "Apologize for issue"
  - ? "Ask for more details"

**Response templates (optional):**
- "Thank you for visiting! [customization]"
- "We appreciate the feedback about [specific issue]. We've now [improvement made]."
- "Sorry to hear this. We'd like to make it right. Please DM us."

**Action buttons:**
- Preview response
- Post response (blue)
- Schedule for later (optional)
- Save as draft
- Cancel

**After posting:**
- Response appears under review
- "You responded 2 days ago"
- Badge shows: ✓ Responded
- Can edit response for 24 hours

### Pin Important Review

**"Pin Review" option:**
- Pins helpful reviews to top of list
- Shows under restaurant profile on user app
- Great for showcasing positive feedback

**Example:**
```
👤 Sarah M. | Has Celiac
   ⭐⭐⭐⭐⭐ | 2 days ago
   
   [PINNED] "Excellent cross-contamination procedures..."
```

---

## Page 6: Analytics & Insights

**URL:** `/restaurant/analytics`

### Overview Metrics

**Tabs for different views:**
- This Month (default)
- Last 3 Months
- Last Year
- Custom date range

### Key Metrics Dashboard

**Large numbers showing:**

1. **Profile Views**
   - This month: 284 (+47 from last month)
   - Chart: Daily views over time (line chart)
   - Top traffic days

2. **Customer Reach**
   - How many users have you in their search results: 2,340
   - How many have you in saved restaurants: 156
   - Trend: Growing or stable

3. **Review Metrics**
   - New reviews this month: 8
   - Average rating trend (up/down)
   - Response time (avg hours to respond)

4. **Estimated Customer Value**
   - From DietaryID this month: $432 (est. based on 12 customers × avg check)
   - Trend: Monthly growth rate
   - Projected annual value: $5,184

### Customer Insights

**Dish ratings:**
```
TOP RATED DISHES

1. 🏆 Grilled Salmon
   ⭐ 4.9 (18 reviews)
   Safe for Celiac: ⭐ 4.9
   "Perfectly prepared, staff super careful"
   
2. 🥈 Quinoa Power Bowl
   ⭐ 4.7 (12 reviews)
   Safe for Vegan + Gluten-Free: ⭐ 4.8
   "Delicious and actually safe"
   
3. 🥉 Caesar Salad (GF)
   ⭐ 4.5 (8 reviews)
   Safe for Celiac: ⭐ 4.6
   "Good but wish portion was bigger"

ITEMS NEEDING ATTENTION

⚠️ French Fries
   ⭐ 3.2 (8 reviews)
   ✗ Main issue: Cross-contamination concerns
   Feedback: "Asked about frying oil, staff weren't sure"
   → Recommendation: Clarify frying procedures, train staff
```

### Customer Demographics

**Who's visiting you from DietaryID:**
- Primary allergies: Celiac (60%), Gluten-free (30%), Nut allergy (10%)
- Age range: 25-45 (primary), 18-25 (secondary)
- Group size: Avg 2-3 people
- Frequency: 40% first-time visitors, 60% repeat

### Feedback Themes

**What customers are saying:**
```
POSITIVE THEMES
✓ Staff knowledge (mentioned in 23 reviews)
✓ Cross-contamination procedures (18 reviews)
✓ Menu options (15 reviews)
✓ Cleanliness (12 reviews)

AREAS FOR IMPROVEMENT
→ Want more vegan options (5 reviews)
→ Wish menu was clearer about allergens (4 reviews)
→ Would like dedicated prep area (3 reviews)
→ Pricing slightly high (3 reviews)

ACTION OPPORTUNITIES
💡 "Expand vegan menu items" (based on demand)
💡 "Create allergen-specific menu cards" (ease of ordering)
💡 "Add more low-price options" (accessibility)
```

### Competitive Positioning

**How you compare locally:**

```
SAFETY RATINGS IN YOUR AREA

Your Restaurant:    ⭐ 4.8 (Safe for Celiac)
├─ Competitor A:    ⭐ 4.3
├─ Competitor B:    ⭐ 4.5
└─ Competitor C:    ⭐ 3.9

You're #1 for Celiac-safe options in Manchester!

OPPORTUNITIES
• Nearest competitor (Comp B) has fewer gluten-free items
• No competitors emphasize staff training like you do
• You're rated 0.5★ higher than next best
```

---

## Page 7: Marketing Tools

**URL:** `/restaurant/marketing`

### Your Verification Badge

**Section 1: Display Your Badge**

```
YOUR VERIFICATION BADGE

You are verified safe for:
✓ Celiac/Gluten-free
✓ Nut-free
✓ Dairy-free

Your Badge:
[Image: Circular DietaryID logo with checkmark]

Use this badge on:
├─ Website
├─ Social media
├─ Menu
├─ Window signage
└─ Email marketing
```

**Copy badge code options:**
- HTML code (embed on website)
- Image file (for social media)
- SVG (scalable)

### Marketing Copy Templates

**Use on your website/socials:**

**Template 1: Discovery**
"We're verified safe for Celiac, Nut-free, and Dairy-free diets on DietaryID. [Staff trained in allergen procedures]. Visit us with confidence."

**Template 2: Trust**
"47 customers with Celiac rate us 4.8★ for safety. See our reviews on DietaryID."

**Template 3: Call-to-action**
"Looking for safe dining? We're verified on DietaryID. [Link to your profile]"

**Copy to clipboard** → user can paste

### Social Media Kit

**Ready-to-post content:**

**Graphic 1:**
"Proud to be verified safe for Celiac on @DietaryID! 
Staff trained. Procedures in place. Reviews prove it.
[Logo] Find us on DietaryID: [link]"

**Graphic 2:**
"47 people with Celiac gave us ⭐4.8. 
We take allergies seriously.
See our verified profile on DietaryID."

**Graphic 3:**
"Is eating out stressful with allergies? 
We make it safe. Check us out on DietaryID."

**Download graphics** → PNG files optimized for each platform

### Email Newsletter Template

**For restaurants to send to email list:**

```
Subject: We're now verified on DietaryID!

Hi [Name],

Great news! We're now verified as a safe dining 
destination for people with allergies on DietaryID.

What that means:
✓ Our menu is verified for allergen info
✓ Staff training is documented
✓ Real customers rate our safety

See our profile: [Link]

If you have a food allergy or dietary restriction, 
visit DietaryID to discover verified restaurants 
(including ours!) where you can eat with confidence.

We look forward to serving you safely!

[Restaurant Name]
```

### Share Your Profile

**Copy shareable link:**
- Link format: `dietaryid.com/restaurants/[your-restaurant-id]`
- QR code (for in-restaurant display)
- Social media share buttons

**In-restaurant promotion ideas:**
- Table tent cards: "See our DietaryID reviews: [QR code]"
- Menu insert: "Verified safe on DietaryID"
- Staff training: "Tell customers about our DietaryID profile"

---

## Page 8: Analytics Export

**URL:** `/restaurant/reports`

### Generate Reports

**Report types:**

1. **Monthly Performance Report**
   - Profile views
   - Customer reach
   - Review metrics
   - Top-rated dishes
   - Customer feedback summary
   - Download as PDF

2. **Competitive Analysis Report**
   - How you rank vs. competitors
   - Your strengths vs. their weaknesses
   - Market opportunities
   - Download as PDF

3. **Customer Insights Report**
   - Demographics of your DietaryID customers
   - Allergen breakdowns
   - What they're saying about you
   - Actionable recommendations
   - Download as PDF

4. **Custom Date Range**
   - Pick dates
   - Select metrics to include
   - Generate & download

**Action buttons:**
- Generate report (blue)
- Download as PDF
- Email to team
- Print

---

## Page 9: Settings & Account

**URL:** `/restaurant/settings`

### Tab 1: Account Settings

**Form fields:**
- Email address (text input, can change)
- Password (password input, can change)
- Notification preferences (toggles)
  - Email for new reviews
  - Email for booking requests
  - Weekly performance summary
  - Marketing tips
  - Email when profile viewed

**Save button**

### Tab 2: Team Management

**Heading:** "Manage Your Team"

**Team members list:**
- Name
- Email
- Role (Owner, Manager, Staff)
- Permissions (view only, can respond to reviews, can edit menu, full access)
- Last active date
- Actions (Edit, Remove)

**Add team member:**
- Button: "+ Add Team Member"
- Form: Name, Email, Role, Permissions
- Send invitation email
- "They'll need to accept invitation to get access"

### Tab 3: Payment & Billing

**Payment method:**
- Default payment method shown
- Add/change payment method
- Billing history (if applicable for premium features)

---

## Page 10: Support & Help

**URL:** `/restaurant/help`

### FAQ Section

**Searchable FAQ:**

**Q: How do I claim my restaurant?**
A: Search for your restaurant on DietaryID. Click "Claim this restaurant" and verify ownership via email.

**Q: What does "Verified" mean?**
A: Your menu items have been reviewed and confirmed safe. We cross-check ingredients against allergen databases.

**Q: How long does verification take?**
A: Initial verification takes 30 minutes to set up. We can complete the full verification for you.

**Q: Can I respond to reviews?**
A: Yes! Respond to any review from your dashboard. We recommend responding within 24-48 hours.

**Q: How many customers will I reach?**
A: This depends on your location and offering. Restaurants typically reach 200-500 relevant customers monthly.

**Q: Is this free?**
A: Yes, basic features are free. Premium analytics and tools may be available later.

**More FAQs:** Link to full FAQ page

### Documentation & Guides

**Video tutorials:**
- "How to claim your restaurant" (2 min)
- "How to verify your menu" (5 min)
- "How to respond to reviews" (3 min)
- "How to use marketing tools" (4 min)

**Written guides:**
- "Getting Started as a Restaurant"
- "Allergen Verification Best Practices"
- "How to Train Staff on Allergies"
- "Marketing Your Allergy-Friendly Practices"

### Contact Support

**Support form:**
- Issue type (dropdown: Technical, Account, Menu, Reviews, Other)
- Description (text area)
- Priority (Low, Medium, High)
- Preferred contact method (Email, Phone)
- Phone number (if phone selected)
- Submit button

**Support hours:** "We respond within 24 hours"

**Email:** support@dietaryid.com
**Phone:** +44 (0)161 123 4567
**Chat:** (Live chat hours 9am-5pm)

---

## Page 11: Staff Training Resources

**URL:** `/restaurant/training`

**Heading:** "Train Your Team"

### Training Modules

**Available modules:**

1. **Allergen Basics** (15 min)
   - What are food allergies vs. intolerances?
   - Why are they serious?
   - Legal/liability basics
   - Quiz at end

2. **Menu & Ingredient Knowledge** (20 min)
   - How to read labels
   - Hidden allergens
   - Cross-contamination
   - Your restaurant's specific menu
   - Quiz at end

3. **Customer Communication** (15 min)
   - How to ask about allergies
   - What to say/not say
   - De-escalation if someone has reaction
   - Follow-up after service
   - Role-play scenarios

4. **Procedures & Safety** (20 min)
   - Your restaurant's specific procedures
   - Dedicated prep areas
   - Utensil handling
   - Order verification
   - Incident reporting

5. **DietaryID & Your Profile** (10 min)
   - Why we're on DietaryID
   - What reviews mean
   - How it helps the restaurant
   - How to encourage satisfied customers to review

### Training Tracking

**See which staff have completed training:**
- Staff member name
- Modules completed (checkmarks)
- Completion date
- Quiz score
- Status (Certified, In Progress, Not Started)

**Assign training:**
- Select staff member
- Select modules
- Send via email link
- Track completion

### Certification

**After completing all modules:**
- Staff member gets "DietaryID Certified" badge
- Can display on employee name tag
- Shows customers: "Our staff is trained"

---

## Page 12: Booking & Reservation Management

**URL:** `/restaurant/bookings`

### Booking Requests

**Shows requests from users:**

```
BOOKING REQUESTS (3 pending)

📅 Sarah M. | Celiac
   Date: Saturday, Jan 20 at 7:00 PM
   Party size: 2 people
   Special requests: "Verified gluten-free options"
   Status: Waiting for confirmation
   
   [Confirm] [Decline] [Message]

📅 Mike H. | Gluten-Free
   Date: Friday, Jan 19 at 12:30 PM
   Party size: 4 people
   Special requests: "Separate prep area if possible"
   Status: Waiting for confirmation
   
   [Confirm] [Decline] [Message]

📅 Jordan L. | Nut Allergy
   Date: Sunday, Jan 21 at 6:00 PM
   Party size: 3 people
   Special requests: "Need to discuss allergy procedures"
   Status: Waiting for confirmation
   
   [Confirm] [Decline] [Message]
```

**Actions:**
- [Confirm]: "Booking confirmed" → customer notified
- [Decline]: "Not available" → customer sees message
- [Message]: Send message to customer

### Reservation Calendar

**Visual calendar showing:**
- Bookings from DietaryID (marked with DietaryID icon)
- Other reservations (if integrated)
- Shows party size, customer name, special notes
- Color coded by type/status

---

## Mobile Experience

**For restaurant managers on mobile:**

**Bottom navigation (mobile only):**
- 📊 Dashboard (overview)
- ⭐ Reviews (manage reviews)
- 📋 Menu (quick edit)
- 📅 Bookings (reservations)
- ⚙️ Settings

**Dashboard optimized:**
- Cards stack vertically
- Tap to expand
- Key metrics prominently shown
- Action buttons large (easy touch)
- Swipeable metrics carousel

---

## Key Design Principles

### For Restaurant Owner Interface:

✅ **Action-oriented** — Show what to do next (verify menu, respond to review)
✅ **Data-driven** — Show ROI/impact (customers, revenue, ratings)
✅ **Trust-building** — Highlight customer feedback and ratings
✅ **Mobile-first** — Managers check on-the-go
✅ **Minimal jargon** — Simple, straightforward language
✅ **Motivation** — Show growth and success metrics
✅ **Non-threatening** — Reviews are opportunities, not attacks
✅ **Actionable insights** — "Here's what customers want"

---

## Copy Tone for Restaurant Owners

**Supportive, empowering, business-focused:**

- "You're now reaching customers actively looking for your restaurant"
- "Your staff's training is paying off. Customers notice."
- "Growth opportunity: 5 customers requested vegan options"
- "Congratulations! You're the #1 rated restaurant for Celiac safety in Manchester"
- "This customer appreciated your procedures. Reply and build loyalty."

**NOT:**
- Technical jargon
- Scary language about liability
- Negative framing of reviews
- Complex data dashboards

---

## Summary: Restaurant Owner Features

**Core Sections:**
1. Dashboard — Overview with key metrics
2. Profile Management — Restaurant info, menu, verification
3. Reviews & Ratings — See what customers say, respond
4. Analytics — Understand customer base, measure ROI
5. Marketing Tools — Use badges, share profile, promote
6. Bookings — Manage reservations from app
7. Team Management — Add staff, assign training
8. Support — Help, training resources, documentation
9. Settings — Account, notifications, payments

**Key Metrics Shown:**
- Profile views
- Customer safety ratings by allergy type
- New customers from DietaryID
- Verified menu items %
- Review sentiment & response rate
- Estimated revenue from DietaryID

**Actions Encouraged:**
- Complete menu verification (primary CTA)
- Respond to reviews (engagement)
- Use marketing badge (growth)
- View analytics (understanding)
- Train staff (quality)

**Outcome:** Restaurant owners see DietaryID as a growth tool, not an add-on. They're incentivized to maintain quality because they see data proving it works.
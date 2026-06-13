# DietaryID Feature: Find Safely

## Core Value Proposition

**"Search restaurants and dishes filtered by your exact allergy profile. Every listing is verified by our community and cross-checked against menus, so you always know what's safe before you order."**

---

## Feature Overview

Advanced search tool that filters all restaurants/dishes against user's exact allergies. Results only show items verified safe by community members with matching allergies.

**Key Differentiator:** Not general search. Allergies-specific search. Shows only what's safe for YOU.

---

## Page: Find Safely (Advanced Search)

**URL:** `/find-safely` or `/search`

**Location:** Main navigation, prominent in app

---

## Hero Section

### Header
- Heading: "Find Safely"
- Subheading: "Search restaurants and dishes filtered by your exact allergy profile"
- Icon: Magnifying glass + shield

---

## Search Interface

### Step 1: Confirm Your Allergies

**What it shows:**
- "Your Allergies:"
- User's restrictions displayed as editable tags/chips
  - Example: "Crohn's" "Gluten-free" "Nut-free"
- "Edit" button if user wants to temporarily change search criteria
- Message: "Showing results safe for: [Allergies]"

**Why:** Always confirm we're searching for the right allergies. Users might have multiple profiles or want to search for friends.

### Step 2: Search Parameters

**Section 1: What Are You Looking For?**

**Dropdown/buttons:**
- Restaurants (default)
- Specific dishes
- Restaurants that have [dish type]
  - Example: "Restaurants that have nut-free desserts"
  - "Restaurants with gluten-free pasta"

**Section 2: Cuisine Type (Optional)**

**Multi-select:**
- All cuisines (default)
- Italian
- Asian (with sub-options: Thai, Chinese, Japanese, Korean)
- Mediterranean
- Mexican
- American
- Indian
- French
- Vegetarian/Vegan
- Other

**Section 3: Location**

**Input options:**
- "Current location" (uses GPS) - default
- "Search near: [City name]" (text input)
- "Radius: [5km, 10km, 25km, Any distance]"
- Map view (show on map)

**Example:** "Near Manchester, UK (5km radius)"

**Section 4: Additional Filters (Expandable)**

**Filters:**
- Price range: $ / $$ / $$$ / $$$$
- Rating: 4+ / 4.5+ / 4.8+ / (slider)
- Open now (toggle)
- Has outdoor seating (toggle)
- Vegetarian/Vegan friendly (toggle)
- Recently verified (toggle: last 7 days)
- Has delivery (toggle)
- Accepts reservations (toggle)

**Section 5: Search Type**

**Radio buttons:**
- Nearby restaurants with safe options
- Search by dish name ("gluten-free pasta")
- Search by ingredient to avoid

### Search Bar

**Large search input:**
- Placeholder: "Search restaurants or dishes..."
- Autocomplete suggestions:
  - Recent searches
  - Popular searches near you
  - Specific restaurants
  - Dish types
- Examples: "Italian restaurants", "nut-free desserts", "seafood restaurants"

**Search button (blue, prominent)** - or Enter key triggers search

---

## Search Results Page

**URL:** `/find-safely/results` or `/search/results?cuisine=Italian&allergies=glutenfree`

### Results Header

**Shows search query:**
- "Results for: Italian restaurants with nut-free options"
- "Filtered by: Your allergies (Gluten-free, Nut-free)"
- Results count: "Found 24 restaurants"
- Refinement options: "Modify search" button

### View Toggle

**Two view options:**
- List view (default)
- Map view

### Results Sidebar (Left, Desktop) / Top Filters (Mobile)

**Refine results:**
- Safe match accuracy: slider (50-100%)
- Distance: 1km, 5km, 10km, 25km, Any
- Rating: 4+, 4.5+, 4.8+
- Price: $ / $$ / $$$ / $$$$
- Cuisine: (multi-select, based on initial choice)
- Features: vegetarian, open now, delivery, etc.
- Date verified: This week, This month, Anytime

**Clear filters button** (resets to defaults)

### Sorting Options

**Dropdown:**
- Relevance (default)
- Safe match accuracy (highest first)
- Highest rated (for your allergies)
- Closest to you
- Most recent reviews
- Most verified safe dishes
- Price (low to high)
- Price (high to low)

### Results List (List View)

**Each restaurant result shows:**

```
🏪 The Healthy Bowl Co
   2.3 km away | Open now

   ✓ 94% Safe Match
   Your allergies: Gluten-free ✓ Nut-free ✓ Dairy-free ✓

   ⭐ 4.6 (47 reviews from people like you)

   Safe dishes:
   • Grilled Salmon with Vegetables
   • Quinoa Power Bowl (Vegan)
   • Fruit Salad (No Nuts)
   [+5 more safe dishes]

   Safe for: Crohn's, Celiac, Nut Allergy
   Last verified: 2 days ago

   [Explore]  [Save]
```

**User Actions:**
- Click restaurant name → goes to full restaurant detail
- Click "Explore" button → goes to restaurant page
- Click "Save" (heart) → adds to saved list
- Click safe dish → shows full dish details with reviews
- Click review count → shows all reviews

### Results Map (Map View)

**Shows:**
- Restaurants as pins/markers
- Color coding by safe match accuracy:
  - Green: 90%+
  - Yellow: 70-90%
  - Orange: 50-70%
- Click pin → shows restaurant card with key info
- Click "View Details" on card → full restaurant page

### Empty Results

**If no results found:**
- Friendly message: "No restaurants found matching your search"
- Suggestions:
  - "Try expanding your radius"
  - "Try different cuisines"
  - "Ask the community for hidden gems"
- Button: "Ask Community" → opens post creation to ask peers

### Pagination

- Shows: "Showing 1-10 of 24 results"
- Page numbers
- Previous/Next buttons
- "Load more" option

---

## Search by Dish Name

**If user selects "Search for dishes":**

### Dish Search Results

**Shows matching dishes across restaurants:**

**Each dish result:**
```
🥗 Gluten-Free Pasta Primavera

   Restaurant: The Italian Kitchen
   2.1 km away

   Safe for: Gluten-free ✓ Dairy-free ✓
   ⭐ 4.8 (23 people with Celiac confirmed safe)

   "I ordered this and had zero issues. Staff 
    was knowledgeable about cross-contamination."
    - Sarah M., Has Celiac

   [View Restaurant]  [See Full Reviews]
```

**Actions:**
- Click dish name → shows full dish details + all reviews
- Click restaurant → goes to restaurant page
- View reviews → shows all community reviews of this dish

---

## Search by Ingredient (Advanced)

**For power users - "search to avoid":**

**Input:**
- "I want to avoid: [ingredient input]"
- Multi-select from common allergens
- Add custom ingredients
- "Search restaurants that exclude these"

**Results:**
- Shows restaurants that don't have selected ingredients
- Or at least have staff that can accommodate requests

---

## Saved Searches (Optional)

**Users can save search parameters:**

**Button:** "Save this search"

**Saved searches appear in:**
- Profile/Settings
- Sidebar for quick access
- Can be updated/re-run anytime
- Can set notifications for new matches

---

## Recent Searches

**Shows in search bar dropdown:**
- "Italian restaurants near Manchester"
- "Nut-free desserts"
- "Gluten-free pasta near home"
- "Thai food (Crohn's safe)"

**Actions:**
- Click to re-run search
- X to remove from history
- Clear all history button

---

## Search Tips & Prompts

**Helpful guidance shown:**

**First time:**
- "Tip: Be specific. Search 'Italian restaurants' or 'gluten-free pasta' for better results"
- "Your results are filtered by your allergies. Don't worry about every restaurant having everything - we only show what's safe for YOU"

**No results:**
- "No results? Try these:
  - Expand your search radius
  - Try different cuisines
  - Ask the community"

---

## Smart Auto-Complete

**As user types in search:**

**Suggestions include:**
- Nearby restaurants (if have "safe" dishes)
- Popular dishes in your area (for your allergies)
- User's previous searches
- Trending searches locally

**Example:**
```
User types: "glu"

Suggestions:
- Gluten-free restaurants near you (24)
- Gluten-free pasta (12 verified)
- Gluten-free pizza (8 verified)
- My previous search: "Gluten-free breakfast"
```

---

## Filter Behavior

**Smart filtering:**
- Only show options available for current search
- If searching "Italian", don't show Asian cuisine filter
- If user selects "nut-free", auto-select from nut allergy options
- "Clear filters" button only shows if filters active

---

## Share Search Results

**Button:** "Share these results"

**Options:**
- Copy link (shareable URL)
- Message to friend
- Post to community
- Email results

**Example:** User finds safe restaurants for friend's visit, shares the search results

---

## Save Results

**Multiple options:**
1. Save individual restaurants (heart icon)
2. Save entire search (for future reference)
3. Save search results list (for offline access)

---

## Favorites/Saved List Integration

**From Find Safely results:**
- "Save" button adds to saved restaurants
- View saved restaurants from dashboard
- Quick re-search from saved list

---

## Mobile Experience

**Optimized for mobile:**
- Filters accessible via filter icon (not sidebar)
- Search bar prominent at top
- Results optimized for small screen
- Map view easier on mobile (swipe to see more)
- Tap restaurant card for quick preview
- Full details button for full page

---

## Copy/Tone

**For Find Safely Feature:**

"Search with confidence. Your allergies stay at the center of every search result. See only what's safe for you."

"Every restaurant we show has been verified safe by community members with your exact allergies."

"Can't find what you're looking for? Ask your community."

---

## States

### Initial
- Search form with defaults (user's allergies populated)
- Recent searches shown
- Example searches prompted

### Searching
- Spinner: "Finding safe options..."
- Auto-complete suggestions appearing

### Results Loaded
- Restaurant/dish results displayed
- Filters active and showing selected values
- Results count showing

### No Results
- Friendly message
- Suggestions for refinement
- "Ask community" CTA

### Filtered
- Active filters highlighted
- "Clear filters" option available
- Results count updated

---

## Success Metrics

- Searches performed
- Results clicked
- Restaurants/dishes saved from search
- Conversion (user goes to restaurant)
- Search refinements (how many times user adjusts filters)
- Search satisfaction (rating)

---

## Summary

**Core Purpose:** Users search only for restaurants/dishes safe for their exact allergies. Community-verified results eliminate guesswork.

**Key Features:**
1. Allergies pre-populated (yours or specific search)
2. Multiple search types (restaurants, dishes, by ingredient)
3. Advanced filters (location, cuisine, rating, price, etc.)
4. Safe match accuracy for each result
5. Verified dish counts shown
6. Community reviews emphasizing peer verification
7. List and map views
8. Save searches and results
9. Share with friends
10. Smart auto-complete

**User Need:** "I want to find restaurants safe for me without having to ask every detail."

**Outcome:** User finds restaurants with confidence, sees verification from people like them, eats without anxiety.
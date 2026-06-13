# DietaryID Backend Admin Dashboard

## Page: Users Management Dashboard

### Purpose

Internal administration dashboard for managing DietaryID users, dietary profiles, meal data, allergens, analytics, and team operations.

---

# Layout

The application uses a two-panel layout:

## Left Sidebar

Persistent navigation panel containing:

### Brand Area

* DietaryID logo
* Workspace selector

### Quick Actions

* Global action launcher
* Keyboard shortcut indicator (`/`)

### Main Navigation

* Assistant (NEW)
* Notifications
* My Hub
* Meal Plans

### Work Section

* Dashboard
* Users (active page)
* Recipes
* Allergens
* Finance
* Analytics and Reports
* Documents

### Team Section

* Members
* Tasks
* Time Management

### User Profile Area

Displays:

* User avatar
* User name
* Settings menu

---

# Dashboard Statistics

Top dashboard section containing KPI cards.

## Metrics

### Total Users

* Value displayed
* Trend indicator
* Sparkline chart

### Active Profiles

* Total active profiles
* Percentage indicator
* Sparkline chart

### Flagged Meals

* Number of flagged meals
* Percentage indicator

### Scan Velocity

* Average scan speed
* Status indicator

### Data Health

* Overall platform health percentage

---

# Toolbar

## Filters Button

Allows filtering of users.

## Search Field

Allows searching users by:

* Name
* App
* Diet
* Role
* City
* Status

Search updates results instantly.

## Customize Button

Allows customization of visible columns and dashboard settings.

---

# Users Table

## Columns

### Selection

Checkbox for bulk actions.

### Name

Displays:

* Avatar initials
* Full name

### App / Diet

Associated product or dietary application.

### Role

User role or responsibility.

### City

User location.

### Status

Current user status.

---

# User Status Types

## Active

Color:

* Green

Meaning:

* Active account

---

## New

Color:

* Blue

Meaning:

* Recently onboarded user

---

## Non-targeted

Color:

* Gray

Meaning:

* Not currently included in campaigns

---

## VIP

Color:

* Yellow

Meaning:

* High-value user

---

# Table Interactions

## Row Selection

Users can:

* Select individual rows
* Deselect individual rows
* Select all users
* Clear all selections

Selected rows display highlighted styling.

---

## Bulk Action Bar

Appears when one or more users are selected.

### Display

* Fixed at bottom of screen

### Information

* Number of selected users

### Actions

#### Export

Export selected users.

#### Archive

Archive selected users.

#### Delete

Delete selected users.

#### More

Additional actions menu.

#### Clear Selection

Remove all selections.

---

# Search Behavior

## User Enters Search Query

System searches across:

* Name
* Application
* Diet
* Role
* City
* Status

Results update in real time without page refresh.

---

# Navigation Behavior

## Sidebar Navigation

When a menu item is clicked:

1. Previous active item is deselected.
2. Clicked item becomes active.
3. Corresponding page loads.

---

# Mobile Experience

## Screen Width Below Tablet/Desktop

### Sidebar

* Hidden by default
* Opens using hamburger menu

### Table

Hidden columns:

* Role
* City

### Statistics

* Reflows into smaller responsive cards

---

# States

## Default State

Page load:

* Dashboard statistics visible
* User table populated
* Search available
* Sidebar navigation available

---

## Selection State

Condition:

* One or more users selected

Changes:

* Bulk action toolbar appears
* Selection count displayed

---

## Search State

Condition:

* User enters search query

Changes:

* Non-matching rows hidden
* Matching rows remain visible

---

# Data Model

User Record:

* Name
* App / Diet
* Role
* City
* Status

Status Values:

* Active
* New
* Non-targeted
* VIP

---

# Functional Requirements

* Responsive layout
* Sidebar navigation
* Search filtering
* Bulk row selection
* Select all functionality
* Bulk actions toolbar
* Status badges
* Dashboard KPI cards
* Mobile navigation drawer
* Sticky table headers
* Real-time UI updates

---

# Suggested Routes

/admin/dashboard
/admin/users
/admin/recipes
/admin/allergens
/admin/finance
/admin/reports
/admin/documents
/admin/team/members
/admin/team/tasks
/admin/team/time-management

---

# Future Enhancements

* Pagination
* Server-side search
* User detail drawer
* Advanced filtering
* Sorting by columns
* CSV export
* Bulk status updates
* Audit log
* Role permissions
* Dark mode

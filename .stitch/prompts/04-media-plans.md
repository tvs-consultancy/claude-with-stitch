# Media Plans List Screen

A powerful, data-dense media plans management page with advanced filtering, sorting, and dual view modes. Clean data-table aesthetic with visual richness from status badges and channel tags. Professional SaaS analytics feel with interactive controls.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Light, structured, data-focused with interactive polish
- Page Background: Cool Gray (#f8fafc)
- Surface/Table: Pure White (#ffffff) with 1px border (#e2e8f0) and whisper-soft shadow, softly rounded (12px)
- Table Header Row: Subtle gray wash (#f9fafb) with bottom border
- Table Row Hover: Very subtle gray (#f9fafb at 50% opacity)
- Row Borders: Hairline gray (#f9fafb)
- Primary Accent: Royal Blue (#2563eb) for links, active filters, card channel tags
- Status Badge - Active: Soft green background (#dcfce7) with green text (#15803d)
- Status Badge - Draft: Soft yellow background (#fef9c3) with amber text (#a16207)
- Status Badge - Completed: Soft blue background (#dbeafe) with blue text (#1d4ed8)
- Status Badge - Paused: Soft gray background (#f3f4f6) with gray text (#4b5563)
- Channel Tags (table): Small rounded chips, gray background (#f3f4f6) with gray text (#4b5563)
- Channel Tags (cards): Small rounded chips, blue tint (#eff6ff) with blue text (#2563eb)
- Text Primary: Near Black (#0f172a) for headings and plan names
- Text Secondary: Slate Gray (#64748b) for client names and descriptions
- Text Muted: Light Slate (#94a3b8) for dates and counts
- View Toggle: Pill-shaped container (#f3f4f6), active tab has white background with whisper shadow
- Input Fields: Softly rounded (8px), 1px gray border, focus ring in blue
- Badges: Pill-shaped (rounded-full), 10px horizontal padding, 12px font weight medium
- Cards: Softly rounded (12px), 1px border, hover elevates shadow

**PAGE STRUCTURE:**
1. **Page Header (flex row, space-between):** Left side: "Media Plans" in 24px bold with "Browse and manage all media plans" subtitle. Right side: view mode toggle — pill-shaped segmented control with "Table" and "Cards" options, active tab has white background with subtle shadow
2. **Filter Bar (horizontal flex, gap 12px):** Search input (288px wide) with "Search plans or clients..." placeholder. Status dropdown select with options: All Statuses, Active, Draft, Completed, Paused. Right-aligned result count text "N plans" in muted style
3. **Table View (white rounded card):** Sortable column headers — Plan Name, Client, Date Range, Budget (all clickable with sort arrows ↑↓↕). Plus non-sortable Status and Channels columns. Header text in 12px uppercase tracking-wider medium gray. Body rows: plan name in 14px medium weight, client in 14px secondary gray, date range in 14px muted, budget in 14px semibold, status as colored pill badge, channels as small gray rounded tag chips. Empty state: search emoji, "No plans found", "Try adjusting your search or filters"
4. **Card/Grid View (3-column responsive grid):** Each card: white rounded container with subtle border. Top flex row: plan name (14px semibold) and status pill badge. Client name in 14px secondary. Two detail rows: Budget (label left, bold value right) and Duration (label left, date range right). Bottom section: channel tags in blue-tinted chips, separated by top border. Hover state elevates card shadow. Same empty state as table view

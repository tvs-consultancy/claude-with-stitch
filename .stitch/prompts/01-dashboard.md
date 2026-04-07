# Dashboard Screen

A professional, data-rich media planning dashboard with a persistent dark sidebar and clean content area. Sophisticated SaaS aesthetic with generous whitespace, subtle shadows, and a blue-gray color palette that conveys trust and efficiency.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Light content area with dark sidebar, clean and minimal
- Sidebar Background: Slate Navy (#1e293b) with white text
- Sidebar Active Item: Bright Blue (#3b82f6) background highlight
- Sidebar Hover: Dark Slate (#334155) subtle background
- Content Background: Cool Gray (#f8fafc) for main area
- Surface/Cards: Pure White (#ffffff) with soft border (#e2e8f0) and gentle shadow
- Primary Accent: Royal Blue (#2563eb) for buttons, links, active states
- Primary Hover: Deep Blue (#1d4ed8) for interactive feedback
- Success: Emerald (#10b981) for active status badges
- Warning: Amber (#f59e0b) for draft status badges
- Info: Sky Blue (#60a5fa) for completed badges
- Neutral: Cool Gray (#94a3b8) for paused badges
- Text Primary: Near Black (#0f172a) for headings and values
- Text Secondary: Slate Gray (#64748b) for labels and descriptions
- Text Muted: Light Gray (#94a3b8) for timestamps
- Cards: Rounded (12px), 1px border, subtle elevation
- Badges: Pill-shaped (full-round), colored background tint with matching text
- Tags: Small rounded chips with gray background for channel labels
- Typography: Inter or system-ui, headings 500-700 weight

**Page Structure:**
1. **Sidebar Navigation (fixed left, full height, 256px wide):** Dark slate background. Top section: app logo "MediaPlan Pro" in white bold with "AI-Powered Planning" subtitle in slate-400. Navigation items with emoji icons (📊 Dashboard, 💬 Chat, 📁 Files, 📋 Media Plans) — active item has blue background. Bottom: user avatar circle with name "User" and role "Media Planner"
2. **Page Header (top of content area):** Left-aligned heading "Dashboard" in 24px bold with subtitle "Overview of your media planning activity" in secondary text
3. **Summary Stats Row (4-column grid):** Four white cards with rounded corners. Each card shows: colored dot indicator, label in small gray text, large bold value. Cards: "Active Campaigns: 4" (blue dot), "Total Budget: $2,385,000" (purple dot), "Active Spend: $1,075,000" (green dot), "Draft Plans: 4" (amber dot)
4. **Quick Actions Row (3-column grid):** Three action cards with tinted backgrounds. Each card: emoji icon, title in bold, description in gray. "Start Planning Chat" (blue tint), "Upload Files" (purple tint), "View All Plans" (green tint). Subtle borders matching tint color, hover brightens
5. **Recent Media Plans Table (full-width white card):** Header row: "Recent Media Plans" title on left, "View all →" link in blue on right. Table with 5 rows. Columns: Plan Name (bold, with date range in small gray below), Client, Budget (font-semibold), Status (colored pill badge), Channels (small gray rounded tag chips, max 2 shown with "+N" overflow)

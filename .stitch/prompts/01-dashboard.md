# Dashboard Screen

A precision-calibrated media planning command center. Zinc-neutral editorial backdrop with a single desaturated steel-blue accent. Dense but breathable — data is protagonist, chrome is invisible. Dark sidebar anchors left; light content area fills right with stat cards, quick actions, and a sortable plans table.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Light content area with dark sidebar shell, editorial restraint
- Font Display/Body: Satoshi (geometric humanist, not Inter)
- Font Mono: JetBrains Mono (budgets, dates, metrics, percentages)
- Sidebar Background: Shell Black (#0F1117) — blue-black depth
- Sidebar Hover: Shell Surface (#1A1D27) subtle background
- Sidebar Active: Shell Surface (#1A1D27) with 3px left border in Corsair (#335C81), Shell Bright (#F9FAFB) text
- Sidebar Text: Shell Text (#D1D5DB), Shell Mute (#6B7280) for secondary
- Content Background: Canvas Fog (#FAFAFA) for main area
- Surface/Cards: Pure Surface (#FFFFFF) with 1px Zinc Border (#E4E4E7) at 50% opacity, ambient shadow 0 1px 3px rgba(24,24,27,0.04)
- Primary Accent: Corsair (#335C81) for buttons, links, active states — desaturated steel-blue, not neon
- Primary Hover: Corsair Deep (#264466)
- Accent Wash: Corsair Wash (#EBF0F7) for tinted backgrounds
- Status Active: (#ECFDF5) bg with (#059669) text
- Status Draft: (#FFFBEB) bg with (#B45309) text
- Status Completed: (#EBF0F7) bg with (#335C81) text
- Status Paused: (#F4F4F5) bg with (#52525B) text
- Text Primary: Deep Ink (#18181B) — Zinc-950, never pure black
- Text Secondary: Mid Zinc (#71717A) for labels and descriptions
- Text Muted: Muted Zinc (#A1A1AA) for timestamps and tertiary text
- Cards: 16px corner radius, no divider lines inside, 24px internal padding gap
- Badges: Pill-shaped (9999px radius), 10px horizontal padding, 13px medium weight
- Tags: 6px radius, Ash Wash (#F4F4F5) bg with Mid Zinc text
- Icons: Material Symbols Rounded (weight 300-400, FILL 0) — no emojis anywhere
- Table headers: Ash Wash (#F4F4F5) background row, 13px uppercase 0.05em tracking Mid Zinc
- Table rows: Alternating Canvas Fog / Pure Surface zebra striping, no row divider lines
- Motion: Staggered reveal on card mount (50ms cascade, translateY 8px + opacity, spring ease). Number count-up on stat values (500ms ease-out)

**BANNED:** Emojis, Inter font, pure black (#000), neon/outer glow shadows, 1px row dividers, gradient text, AI cliches, fake round numbers, generic names ("John Doe", "Acme")

**Page Structure:**
1. **Sidebar Navigation (fixed left, full height, 260px wide):** Shell Black background. Top: "MediaPlan Pro" in Satoshi 500 18px Shell Bright, "AI-Powered Planning" in 12px Shell Mute below. Navigation items with Material Symbols Rounded icons (dashboard, chat, folder, description) at 20px in Shell Mute — label in 15px Shell Text. Active "Dashboard" item has Shell Surface bg with 3px Corsair left border, Shell Bright text. Bottom: avatar circle (36px, initials on Corsair background), name "Sarah Chen" in 15px Shell Text, role "Senior Media Planner" in 12px Shell Mute
2. **Page Header (top of content area, left-aligned):** "Dashboard" in Satoshi 600 24px Deep Ink. Below: "Overview of your media planning activity" in 15px Mid Zinc. 32px bottom margin
3. **Summary Stats Row (4-column CSS grid, 24px gap):** Four white cards (16px radius, ambient shadow). Each card: left-aligned 6px colored dot indicator, label in 13px Mid Zinc Satoshi 500, large value in Satoshi 700 36px Deep Ink (budgets in JetBrains Mono). Cards: "Active Campaigns" dot Corsair value "4", "Total Budget" dot #059669 value "$2,385,000" in JetBrains Mono, "Active Spend" dot #B45309 value "$1,075,000" in JetBrains Mono, "Draft Plans" dot Muted Zinc value "4"
4. **Quick Actions Row (3-column CSS grid, 24px gap — vary internal padding to break equal-weight symmetry):** Three cards with tinted backgrounds. Each: Material Symbols icon (24px), title in Satoshi 500 18px Deep Ink, description in 15px Mid Zinc. "Start Planning Chat" (Corsair Wash bg, chat icon), "Upload Media Files" (slightly taller card with more top padding, upload_file icon, #ECFDF5 bg), "View All Plans" (description icon, #F4F4F5 bg). Hover: subtle shadow increase
5. **Recent Media Plans Table (full-width white card, 16px radius):** Header row inside card: "Recent Media Plans" Satoshi 500 18px left, "View all" ghost link in Corsair right. Table with Ash Wash header row. Columns: Plan Name (Satoshi 500 15px Deep Ink, date range in 12px Muted Zinc JetBrains Mono below), Client (15px Mid Zinc), Budget (15px JetBrains Mono 500 Deep Ink), Status (pill badge with semantic colors), Channels (6px radius tags, Ash Wash bg, Mid Zinc text, max 2 with "+N" overflow). 5 data rows with zebra striping Canvas Fog / Pure Surface. Use realistic names: "Meridian Q2 Digital Push", "Voss Automotive Launch", "Hale & Partners Brand Refresh"

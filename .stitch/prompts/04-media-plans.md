# Media Plans List Screen

A data-dense, filterable media plans management page with dual view modes (table and card grid). This is the heaviest data screen — the table must feel scannable and sortable without visual clutter. Status badges provide color-coded scanning. Channel tags add texture. Budgets and dates in monospace for column alignment.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Light, structured, data-focused with interactive polish
- Font Display/Body: Satoshi (geometric humanist, not Inter)
- Font Mono: JetBrains Mono (budgets, date ranges, plan counts)
- Page Background: Canvas Fog (#FAFAFA)
- Surface/Table: Pure Surface (#FFFFFF) with 1px Zinc Border (#E4E4E7) at 50% opacity, ambient shadow, 16px radius
- Table Header Row: Ash Wash (#F4F4F5) background, no bottom border needed — tonal shift defines edge
- Table Row Zebra: Alternating Canvas Fog (#FAFAFA) / Pure Surface (#FFFFFF), no row divider lines
- Table Row Hover: Corsair Wash (#EBF0F7) at 50% opacity
- Primary Accent: Corsair (#335C81) for links, active filters, sort indicators, card channel tags
- Primary Hover: Corsair Deep (#264466)
- Status Badge Active: (#ECFDF5) bg with (#059669) text, pill 9999px radius
- Status Badge Draft: (#FFFBEB) bg with (#B45309) text
- Status Badge Completed: (#EBF0F7) bg with (#335C81) text
- Status Badge Paused: (#F4F4F5) bg with (#52525B) text
- Channel Tags (table): 6px radius, Ash Wash (#F4F4F5) bg, Mid Zinc (#71717A) text
- Channel Tags (cards): 6px radius, Corsair Wash (#EBF0F7) bg, Corsair (#335C81) text
- Text Primary: Deep Ink (#18181B) for headings and plan names
- Text Secondary: Mid Zinc (#71717A) for client names and descriptions
- Text Muted: Muted Zinc (#A1A1AA) for dates and counts
- View Toggle: Ash Wash (#F4F4F5) pill container, active tab Pure Surface with ambient shadow
- Input Fields: 10px radius, Ash Wash fill resting, Corsair border at 40% on focus
- Badges: Pill 9999px radius, 10px horizontal padding, Satoshi 500 13px
- Cards: 16px radius, hover increases shadow depth
- Icons: Material Symbols Rounded — view_list / grid_view for toggle, unfold_more / arrow_upward / arrow_downward for sort — no emojis
- Table column headers: Satoshi 500 13px uppercase 0.05em tracking Mid Zinc
- Motion: Staggered row/card reveal (50ms cascade). Sort transition 200ms. View mode crossfade 150ms

**BANNED:** Emojis, Inter font, pure black (#000), 1px row dividers, neon shadows, 3 equal-weight card columns, fake round budgets, generic client names, AI cliches

**PAGE STRUCTURE:**
1. **Page Header (flex row, space-between):** Left: "Media Plans" Satoshi 600 24px Deep Ink, "Browse and manage all media plans" 15px Mid Zinc below. Right: view mode toggle — pill-shaped segmented control (Ash Wash container, 10px radius), "Table" and "Cards" options with Material Symbols view_list / grid_view icons, active tab has Pure Surface bg with ambient shadow
2. **Filter Bar (horizontal flex, 12px gap, 24px below header):** Search input (288px): Ash Wash fill, 10px radius, Material Symbols search icon 20px inside left, "Search plans or clients..." placeholder in Muted Zinc. Status dropdown select (160px): Ash Wash fill, 10px radius, options All Statuses / Active / Draft / Completed / Paused. Right-aligned: "12 plans" in JetBrains Mono 13px Muted Zinc
3. **Table View (white card, 16px radius, full-width):** Sortable column headers on Ash Wash row — Satoshi 500 13px uppercase 0.05em tracking Mid Zinc. Columns: Plan Name (clickable sort), Client (clickable sort), Date Range (clickable sort), Budget (clickable sort), Status (no sort), Channels (no sort). Sort icons: Material Symbols unfold_more default, arrow_upward/arrow_downward active. Body rows zebra-striped: plan name Satoshi 500 15px Deep Ink (Corsair on hover), client 15px Mid Zinc, date range JetBrains Mono 15px Muted Zinc ("Mar 1 - Jun 30, 2025"), budget JetBrains Mono 500 15px Deep Ink ("$847,500"), status pill badge, channels as 6px tags (Ash Wash bg, max 2 + "+N"). 8-10 rows with realistic data: "Meridian Q2 Digital Push" / Meridian Media Group, "Voss Automotive Launch" / Voss Motors, "Hale Brand Refresh" / Hale & Partners, "Apex Summer Campaign" / Apex Athletics, "Caliber Financial Q3" / Caliber Wealth Advisors, "Fern & Bower Holiday" / Fern & Bower Retail, "Trident Global Rebrand" / Trident Communications, "Lumen Health Awareness" / Lumen Therapeutics
4. **Card Grid View (CSS grid, 24px gap — use varied internal padding or card heights to break equal-weight symmetry):** 3-column grid at desktop, 2-column at 1024px, 1-column at 768px. Each card: Pure Surface, 16px radius, 24px padding. Top row: plan name Satoshi 500 15px Deep Ink and status pill badge. Client name 15px Mid Zinc. Two data rows: "Budget" label Mid Zinc left, value JetBrains Mono 500 Deep Ink right / "Duration" label left, date range JetBrains Mono Muted Zinc right. Bottom: channel tags in Corsair Wash bg / Corsair text, separated from content by 24px gap (no divider line). Hover: shadow depth increases
5. **Empty State (search/filter yields no results):** Centered in table/card area. Material Symbols search_off icon 48px Muted Zinc. "No plans found" Satoshi 500 18px Deep Ink. "Try adjusting your search or filters" 15px Mid Zinc

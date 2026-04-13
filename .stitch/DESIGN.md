# Design System: MediaPlan Pro

## 1. Visual Theme & Atmosphere

A precision-calibrated command center with the quiet authority of a well-appointed trading floor. Zinc neutrals provide an editorial backdrop — clean but never sterile — while a single desaturated steel-blue accent marks decisive action points. The interface breathes through generous negative space and tonal layering rather than structural borders. Data is the protagonist; chrome is invisible.

- **Density:** 7 — Data-rich cockpit. Tables, metrics, multi-column filters, and dense plan listings demand a high-information layout without clutter.
- **Variance:** 5 — Professional asymmetry. Layouts break out of rigid equal-column grids but never feel disordered. Offset card sizes, weighted white-space, and left-anchored hierarchy.
- **Motion:** 5 — Fluid spring-physics transitions on interactive elements. Staggered reveals on data lists. No cinematic choreography — this is a work tool, not a showreel.

---

## 2. Color Palette & Roles

One accent. Zinc neutrals. No warm/cool gray fluctuation — pure Zinc scale throughout.

### Neutrals

| Token | Hex | Role |
|:---|:---|:---|
| **Canvas Fog** | `#FAFAFA` | Page background, recessed areas behind cards |
| **Pure Surface** | `#FFFFFF` | Cards, containers, elevated interactive surfaces |
| **Ash Wash** | `#F4F4F5` | Table header rows, input resting fills, alternating row tint |
| **Zinc Border** | `#E4E4E7` | Structural borders — always at 50-60% opacity, never full |
| **Muted Zinc** | `#A1A1AA` | Tertiary text, placeholders, disabled states, timestamps |
| **Mid Zinc** | `#71717A` | Secondary text, metadata labels, descriptions |
| **Deep Ink** | `#18181B` | Primary text, headings, values — Zinc-950, never pure black |

### Dark Sidebar Shell

| Token | Hex | Role |
|:---|:---|:---|
| **Shell Black** | `#0F1117` | Sidebar background — blue-black depth, not flat black |
| **Shell Surface** | `#1A1D27` | Sidebar hover and active-item backgrounds |
| **Shell Mute** | `#6B7280` | Sidebar secondary text, section labels |
| **Shell Text** | `#D1D5DB` | Sidebar primary text, nav item labels |
| **Shell Bright** | `#F9FAFB` | Sidebar active-item text, logo text |

### Accent (Single — Max 1)

| Token | Hex | Role |
|:---|:---|:---|
| **Corsair Primary** | `#174468` | Deepest accent — used as `primary` in Stitch-generated CSS. Gradient start point, strongest interactive weight |
| **Corsair** | `#335C81` | Primary CTAs, links, active states, focus rings, accent borders. `primary_container` in Stitch. Saturation ~59% — authoritative without neon |
| **Corsair Deep** | `#264466` | Hover and pressed states for primary actions |
| **Corsair Wash** | `#EBF0F7` | Light tint background for active sidebar items, selected rows, accent containers |
| **Corsair Gradient** | `135deg #174468 → #335C81` | CTA button depth gradient. Replaces flat fills on primary action buttons for premium feel |

### Semantic Status Colors

Status colors are functional — they communicate state, not brand. Each has a tinted background + text pairing.

| Status | Background | Text | Use |
|:---|:---|:---|:---|
| **Active** | `#ECFDF5` | `#059669` | Active campaigns, success states, upload complete |
| **Draft** | `#FFFBEB` | `#B45309` | Draft plans, pending states, in-progress uploads |
| **Completed** | `#EBF0F7` | `#335C81` | Completed plans — uses accent tint, not a new color |
| **Paused** | `#F4F4F5` | `#52525B` | Paused/inactive, neutral resting state |
| **Error** | `#FEF2F2` | `#DC2626` | Errors, destructive confirmations, failed uploads |

---

## 3. Typography Rules

Sans-serif pairings exclusively. All numbers in tables, budgets, and metrics use monospace for column alignment.

- **Display & Headlines:** **Geist** — Clean geometric sans-serif with technical precision. Track-tight (`-0.025em` to `-0.01em`). Hierarchy through weight (500 Medium, 600 Semibold, 700 Bold) and color, not size alone. Headlines never exceed `2.25rem/36px`. Stitch generates with Geist as the closest available match to the Satoshi aesthetic originally specified.
- **Body & Labels:** **Geist** — Regular 400 at `0.9375rem/15px`, leading 1.6. Labels use Medium 500 at `0.8125rem/13px` with `0.01em` tracking. Max line width `65ch`.
- **Mono (Data):** **JetBrains Mono** — For budgets, percentages, dates, table numbers, timestamps, and any metric. Regular 400, inherits contextual size. Use whenever a column of numbers must vertically align.
- **Label Mono (Alternate):** **Space Grotesk** — Used in some Stitch-generated screens for label-mono contexts (table headers, counts). Geometric, slightly narrower than Geist at small sizes.

### Type Scale

| Level | Font | Weight | Size | Tracking | Use |
|:---|:---|:---|:---|:---|:---|
| Display Large | Geist | 700 | 2.25rem / 36px | -0.025em | Dashboard hero metrics (Total Budget, ROI) |
| Display | Geist | 700 | 1.875rem / 30px | -0.025em | Page-level KPIs |
| Headline | Geist | 600 | 1.5rem / 24px | -0.02em | Page titles ("Dashboard", "Media Plans") |
| Title | Geist | 500 | 1.125rem / 18px | -0.01em | Card headers, section titles, conversation names |
| Body | Geist | 400 | 0.9375rem / 15px | 0 | Paragraphs, descriptions, chat messages |
| Label | Geist | 500 | 0.8125rem / 13px | 0.01em | Input labels, table column headers, filter labels |
| Caption | Geist | 400 | 0.75rem / 12px | 0 | Timestamps, helper text, metadata |
| Mono | JetBrains Mono | 400 | inherit | 0 | Budgets, dates, percentages, file sizes |

### Typography Rules

- Never use bold for body text. Reserve bold (700) for Display and Headline only.
- Secondary labels use `Mid Zinc` (#71717A). Primary data values use `Deep Ink` (#18181B).
- Accent color (`Corsair`) reserved for interactive text: links, clickable plan names, navigation anchors.
- Table column headers: `Label` scale, uppercase, `0.05em` tracking, `Mid Zinc` color.

---

## 4. Component Stylings

### Cards & Data Containers

- **Shape:** `16px` corner radius. `1px` border in `Zinc Border` at 50% opacity.
- **Shadow:** Two tiers — Cards: `0 1px 3px rgba(24, 24, 27, 0.04)` (whisper). Elevated/hover: `0px 12px 32px rgba(24, 24, 27, 0.06)` (ambient). Shadow color always derived from `Deep Ink`, never pure black.
- **No divider lines inside cards.** Separate header from body using `24px` padding gap or a tonal shift to `Ash Wash`.
- **Stat cards:** Large metric in `Display Large` + `JetBrains Mono`. Label in `Caption` + `Mid Zinc`. Left-aligned colored indicator dot (`6px`, border-radius full) using status color.
- **Table cards:** Full-width white surface. Header row on `Ash Wash` background. No row divider lines — use alternating `Canvas Fog` / `Pure Surface` rows for zebra striping.

### Buttons

- **Primary:** `Corsair Gradient` fill (`linear-gradient(135deg, #174468, #335C81)`), white text, `10px` radius. Hover: `Corsair Deep` flat fill. Active: `-1px` translateY for tactile push. No outer glow, no shadow.
- **Secondary:** `Ash Wash` fill, `Deep Ink` text, `10px` radius. Hover: `Zinc Border` at 80%. No border.
- **Ghost:** Transparent fill, `Corsair` text. Hover: `Corsair Wash` background. For inline actions ("View all", "Clear all").
- **Destructive:** `#FEF2F2` fill, `#DC2626` text. Hover: `#DC2626` fill, white text.
- **Disabled:** 40% opacity on any variant. No separate disabled color.

### Badges (Status Pills)

- **Shape:** Full-round (`9999px` radius), `10px` horizontal padding, `4px` vertical padding.
- **Typography:** `Label` scale (13px Medium).
- **Colors:** Use the semantic status pairs from Section 2 (tinted background + matching text).
- **Never use badges purely for decoration.** Every badge communicates a state.

### Channel Tags

- **Shape:** `6px` radius, `8px` horizontal padding, `2px` vertical padding.
- **Table view:** `Ash Wash` background, `Mid Zinc` text.
- **Card view:** `Corsair Wash` background, `Corsair` text.
- **Overflow:** Show max 2 tags, then `+N` in `Muted Zinc`.

### Input Fields

- **Resting:** `Ash Wash` fill, no border. `Label` scale placeholder in `Muted Zinc`.
- **Focused:** `1px` border in `Corsair` at 40% opacity, subtle inner box-shadow `inset 0 0 0 1px rgba(51, 92, 129, 0.15)`.
- **Label:** Always above input, `Label` scale, `Mid Zinc` color. Never floating.
- **Error:** `1px` border in `#DC2626`, error text below in `Caption` scale.
- **Shape:** `10px` radius. Minimum height `40px` for touch targets.

### Chat Bubbles

- **User messages:** `Corsair` fill, white text. Right-aligned. `16px` radius with bottom-right `4px` (sharp corner indicates sender).
- **Assistant messages:** `Pure Surface` fill, `1px` border in `Zinc Border` at 50%. Left-aligned. `16px` radius with bottom-left `4px`.
- **Timestamps:** Below bubble, `Caption` scale, `Muted Zinc`.

### Upload Zone

- **Resting:** Dashed `2px` border in `Zinc Border`, transparent background, `16px` radius.
- **Drag active:** Dashed `2px` border in `Corsair`, `Corsair Wash` background, `scale(1.01)` transform.
- **Icon:** SVG upload icon, `48px`, `Mid Zinc`. Not an emoji.
- **Progress bar:** `4px` height, full-round, `Ash Wash` track, `Corsair` fill, `300ms ease` transition.

### Loading & Empty States

- **Skeleton loaders:** Match exact layout dimensions of the content they replace. `Ash Wash` base with subtle shimmer animation (left-to-right gradient sweep, `1.5s` infinite).
- **Empty states:** Composed illustration or clean SVG icon (not emoji), title in `Title` scale, description in `Body` + `Mid Zinc`. Centered vertically in container.

---

## 5. Layout Principles

### Sidebar

- Fixed left, full height, `260px` wide.
- `Shell Black` background. Logo area at top: app name in `Title` scale + `Shell Bright`, subtitle in `Caption` + `Shell Mute`.
- Nav items: `Body` scale, `Shell Text` color, `12px` vertical padding, `16px` horizontal padding. Icon left (Material Symbols Rounded, `20px`, `Shell Mute`), label right.
- Active item: `Shell Surface` background, `Corsair` left border `3px`, `Shell Bright` text, icon in `Corsair Wash`.
- Hover: `Shell Surface` at 50% opacity.
- User info at bottom: Avatar circle (`36px`, initials on `Corsair` background), name in `Body` + `Shell Text`, role in `Caption` + `Shell Mute`.

### Content Area

- Left margin: `260px` (sidebar width). Padding: `32px`.
- Max-width: `1400px` for inner content. Centered when viewport exceeds.
- Page header: `Headline` title, `Body` + `Mid Zinc` subtitle. `32px` bottom margin.

### Grid System

- CSS Grid exclusively. No `calc()` percentage hacks.
- Stat cards: `4-column` grid, `24px` gap. Collapse to `2-column` at `1024px`, `1-column` at `768px`.
- Action cards: `3-column` grid, `24px` gap. Never 3 equal-weight cards — vary padding or span to break symmetry.
- Plan cards: `3-column` grid at desktop, `2-column` at tablet, `1-column` at mobile. `24px` gap.
- Chat layout: Conversation sidebar `280px` fixed, message area fills remaining width.

### Responsive Rules

- **Below 768px:** All multi-column layouts collapse to single column. Sidebar becomes a slide-out drawer triggered by hamburger.
- **Touch targets:** All interactive elements minimum `44px` tap target.
- **Typography scaling:** Headlines scale via `clamp(1.25rem, 3vw, 1.5rem)`. Body text minimum `0.875rem`.
- **Spacing:** Vertical section gaps reduce proportionally via `clamp(1.5rem, 4vw, 2rem)`.
- **No horizontal scroll:** Overflow on mobile is a critical failure.

---

## 6. Motion & Interaction

### Spring Physics

Default spring: `stiffness: 100, damping: 20`. This produces a premium, weighty feel — elements settle naturally rather than snapping.

Apply to: page transitions, card hover elevation, sidebar item transitions, modal entry/exit.

### Staggered Reveals

Never mount lists instantly. Use cascade delays for data tables and card grids:
- Base delay: `50ms` per item.
- Max stagger: `300ms` (after 6 items, all remaining mount simultaneously).
- Animation: `translateY(8px)` + `opacity: 0` to resting position, spring-eased.

### Micro-Interactions

- **Stat card values:** Animate number counting on first mount (500ms ease-out).
- **Progress bars:** Smooth width transition, `300ms ease`.
- **Hover states:** `150ms` transition for background color changes.
- **Active/pressed:** Immediate `-1px translateY` for tactile buttons.

### Performance Constraints

- Animate exclusively via `transform` and `opacity`. Never animate `top`, `left`, `width`, `height`.
- All animations must respect `prefers-reduced-motion: reduce` — disable spring physics, stagger, and micro-interactions.
- Skeleton shimmer uses `background-position` animation on a fixed gradient, hardware-accelerated.

---

## 7. Anti-Patterns (Banned)

These are non-negotiable. Violation of any rule produces a generic, AI-detectable output.

### Typography Bans
- **Inter font** — banned. Use Geist (or Space Grotesk for label-mono) exclusively.
- **Generic serif fonts** (Times New Roman, Georgia, Garamond) — banned. This is a dashboard; serifs have no place.
- **Pure black `#000000`** — banned. Use `Deep Ink` (#18181B) for darkest text.
- **Bold body text** — banned. Reserve bold for Display/Headline levels only.

### Color & Visual Bans
- **Neon/outer glow shadows** — banned. Shadows are ambient, derived from `Deep Ink`, ultra-diffused.
- **Oversaturated accents** (saturation > 80%) — banned. `Corsair` at ~59% is the ceiling.
- **Purple accent colors** — banned. No AI purple aesthetic.
- **Gradient text on headers** — banned.
- **1px solid borders to define sections** — banned where tonal background shifts can achieve the same result. Borders exist only at low opacity for card edges and inputs.

### Layout Bans
- **3 equal-width card columns** — banned. Vary weight, span, or internal padding to break the symmetry.
- **Centered hero layouts** — banned. All page headers and key content are left-aligned.
- **Overlapping elements** — banned. Every element occupies its own clean spatial zone.
- **Flexbox `calc()` percentage hacks** — banned. Use CSS Grid.

### Content Bans
- **Emojis anywhere in the UI** — banned. Use Material Symbols Rounded icons (`20px` default, `24px` for feature icons).
- **Generic placeholder names** ("John Doe", "Acme Corp", "Nexus") — banned. Use contextually appropriate names (e.g., real-sounding agency/brand names for a media planning tool).
- **Fake round numbers** (`99.99%`, `$50,000`, `1,000,000`) — banned. Use realistic irregular values (`$2,347,500`, `73.4%`).
- **AI copywriting clich\u00e9s** ("Elevate", "Seamless", "Unleash", "Next-Gen", "Cutting-Edge") — banned.
- **Filler UI text** ("Scroll to explore", "Swipe down", scroll arrows, bouncing chevrons) — banned.
- **`LABEL // YEAR` formatting** ("SYSTEM // 2024", "METRICS // 2025") — banned.
- **Broken Unsplash links** — banned. Use SVG avatars or `picsum.photos` if images are needed.
- **Custom mouse cursors** — banned.
- **Circular loading spinners** — banned. Use skeleton loaders matching content dimensions.

---

## 8. Icon System

Use **Material Symbols Outlined** (variable weight 300-400, optical size 20-24, FILL 0). Note: Stitch generates with the Outlined variant. React components may swap to Rounded if preferred — both share the same icon names.

| Context | Icon | Size |
|:---|:---|:---|
| Sidebar nav | `dashboard`, `chat`, `folder`, `description` | 20px |
| Stat card indicators | Colored dots (CSS), not icons | 6px |
| Quick actions | `add_circle`, `upload_file`, `visibility` | 24px |
| Table sort | `arrow_upward`, `arrow_downward`, `unfold_more` | 16px |
| Chat input send | `send` | 20px |
| Upload zone | `cloud_upload` | 48px |
| Empty states | Contextual SVG illustration or Material Symbol | 48px |

---

## 9. Font Loading

```html
<!-- Geist from Vercel (primary display + body font) -->
<link href="https://cdn.jsdelivr.net/npm/geist@1/dist/fonts/geist-sans/style.css" rel="stylesheet">

<!-- JetBrains Mono from Google Fonts (data/mono) -->
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<!-- Space Grotesk from Google Fonts (label-mono alternate) -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">

<!-- Material Symbols Outlined (icon font) -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300..400,0,0&display=swap" rel="stylesheet">
```

CSS font stacks:
```css
--font-display: 'Geist', system-ui, sans-serif;
--font-body: 'Geist', system-ui, sans-serif;
--font-label-mono: 'Space Grotesk', 'Geist', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Font Migration Note
The taste-design specification originally called for Satoshi (geometric humanist from Fontshare). Stitch's font library does not include Satoshi, so Geist was selected as the closest available match — both are geometric sans-serifs optimized for UI density and screen legibility. When converting to React components, either font is acceptable; Geist is recommended for consistency with the Stitch-generated designs.

---

## 10. Stitch Screen Reference

These are the canonical Corsair Command screens in the Stitch project. Use these IDs when editing or iterating on designs.

**Project:** `projects/15618939690237053755`

| Screen | Screen ID | HTML File ID | Title |
|:---|:---|:---|:---|
| Dashboard | `57a946ffb2894cc38898ebbd17b19dd0` | `1baa4c344064496197a4a5fdd64b42b3` | Dashboard Overview |
| Chat | `17817691f01d44ae8bb6fa0e1b765cf3` | `5f3a3ed3b9864f91a91f39b7e32a320f` | AI Planning Assistant |
| Files | `2a7d7af8550e4a2bac980cc09d106457` | `5f7a952a3b064cf5a4f27dbf80178413` | File Upload & Management |
| Media Plans | `d97949236e68419cae061539bbb43a8f` | `0f1809c73e26439a999c5645b6f7d4ae` | Media Plans Management |

### Stitch CSS Variable Mapping

The generated HTML uses a Tailwind-based token system. Key mappings to this design system:

| Stitch CSS Token | DESIGN.md Token | Hex |
|:---|:---|:---|
| `--color-primary` | Corsair Primary | `#174468` |
| `--color-primary-container` | Corsair | `#335C81` |
| `--color-surface` | Canvas Fog | `#F9F9F9` |
| `--color-surface-container-lowest` | Pure Surface | `#FFFFFF` |
| `--color-surface-container-low` | ~Ash Wash | `#F3F3F3` |
| `--color-inverse-surface` | Shell Black | `#0F1117` (sidebar) |
| `--color-error` | Error | `#BA1A1A` |
| `--color-tertiary` | (Success green) | `#004C33` |

### Ambient Shadow Utility

```css
.ambient-shadow {
  box-shadow: 0px 12px 32px rgba(24, 24, 27, 0.06);
}
```

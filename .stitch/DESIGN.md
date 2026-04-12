# Design System Strategy: The Architect's Blueprint

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Data Editorial."** 

Standard SaaS dashboards often feel like spreadsheets with borders. This system rejects that clinical rigidity. Instead, we treat media planning as a high-stakes narrative. We achieve a "Sophisticated & Trustworthy" vibe by borrowing from high-end architectural journals: expansive white space, intentional asymmetry, and a focus on "tonal layering" rather than structural containment. 

By utilizing a "No-Line" philosophy, we move away from the "boxed-in" feel of traditional dashboards. The UI should feel like a series of meticulously arranged sheets of vellum—layered, translucent, and purposeful. We are not just building a tool; we are building a command center that feels as premium as the media budgets it manages.

---

## 2. Colors: Tonal Depth & The No-Line Rule

This system moves beyond flat color application. We use a sophisticated spectrum of blues and slates to create a sense of infinite depth.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections or containers. 
- **The Alternative:** Define boundaries through background shifts. A `surface-container-low` component should sit on a `surface` background to create a "natural" edge.
- **Why:** Borders add visual noise and "grid-lock" the user's eye. Tonal shifts allow the data to breathe.

### Surface Hierarchy & Nesting
Treat the interface as a physical environment. Importance is dictated by "height" (lightness):
1.  **Base Layer:** `surface` (#f9f9ff) - The vast canvas.
2.  **Sectioning:** `surface-container-low` (#f0f3ff) - Large content blocks.
3.  **Actionable Cards:** `surface-container-lowest` (#ffffff) - The highest "lift" for interactive data points.
4.  **Floating Elements:** `surface-bright` with backdrop-blur - For menus and overlays.

### The "Glass & Gradient" Rule
To prevent a generic "Flat Design" look, use **Signature Textures**:
- **CTA Depth:** Primary buttons should use a subtle linear gradient from `primary` (#004ac6) to `primary_container` (#2563eb) at a 135 degree angle.
- **Glassmorphism:** Use `surface_variant` at 70% opacity with a `20px` backdrop-blur for floating filters or navigation headers. This "frosted glass" effect softens the transition between the dark sidebar and light content.

### Named Color Tokens

| Token | Hex | Role |
|:---|:---|:---|
| `background` | #f9f9ff | Page background |
| `surface` | #f9f9ff | Base canvas |
| `surface-container` | #e7eeff | Mid-level containers |
| `surface-container-low` | #f0f3ff | Section backgrounds |
| `surface-container-lowest` | #ffffff | Cards, elevated surfaces |
| `surface-container-high` | #dee8ff | Emphasized containers |
| `primary` | #004ac6 | Primary actions |
| `primary-container` | #2563eb | Primary containers, accents |
| `secondary` | #505f76 | Secondary actions |
| `secondary-container` | #d0e1fb | Secondary containers |
| `tertiary` | #006242 | Success actions |
| `tertiary-container` | #007d55 | Success containers |
| `error` | #ba1a1a | Error states |
| `error-container` | #ffdad6 | Error backgrounds |
| `on-surface` | #111c2d | Primary text |
| `on-surface-variant` | #434655 | Secondary text |
| `outline` | #737686 | Borders, dividers |
| `outline-variant` | #c3c6d7 | Subtle borders |
| `inverse-surface` | #263143 | Dark sidebar, inverse areas |
| `inverse-primary` | #b4c5ff | Primary on dark surfaces |

---

## 3. Typography: The Editorial Scale

We use a dual-font strategy to balance authority with utility. **Manrope** provides a modern, geometric "Display" feel for high-level metrics, while **Inter** ensures maximum legibility for dense media planning data.

*   **The Display Scale (Manrope):** Use `display-lg` to `headline-sm` for hero metrics (e.g., Total Spend, ROI). This creates an "Editorial" look that feels like a premium report.
*   **The Functional Scale (Inter):** Use `title-md` down to `label-sm` for all interactive elements, inputs, and table data.
*   **The Hierarchy Rule:** Never use bold for body text. Use `on_surface_variant` (#434655) for secondary labels and reserve `primary` (#004ac6) weight for key navigation anchors.

---

## 4. Elevation & Depth: Tonal Layering

Traditional "drop shadows" are often too heavy. This system relies on **Ambient Light** and **Tonal Stacking**.

*   **The Layering Principle:** Instead of shadows, place a `surface_container_lowest` (#ffffff) card on top of a `surface_container` (#e7eeff) background. The 2% shift in brightness is enough for the human eye to perceive a physical layer without the clutter of a shadow.
*   **Ambient Shadows:** For floating Modals or Popovers, use an ultra-diffused shadow:
    - `y: 8px, blur: 24px, color: rgba(17, 28, 45, 0.06)`. 
    - The shadow color is derived from `on_surface` (#111c2d), not pure black, ensuring it looks like a natural occlusion of light.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., in high-contrast modes), use `outline_variant` at 15% opacity. Never use a 100% opaque border.

---

## 5. Components: Refined Primitives

### Cards & Data Containers
- **Visuals:** 12px (`md`) or 16px (`lg`) corner radius. 
- **Rule:** **No Divider Lines.** Separate header from body using a 24px padding gap or a subtle background shift to `surface_container_low`.
- **Context:** Media plans require high density; use "Cell Layering" (subtle fills) to group related data points rather than lines.

### Buttons (The "Jewel" Components)
- **Primary:** Gradient-filled (`primary` to `primary_container`) with white text. 
- **Secondary:** `surface_container_high` background with `primary` text. No border.
- **Tertiary:** Pure text with an 8px "pill" hover state in `surface_container`.

### Pill-Shaped Badges
- **Success:** `tertiary_container` background with `on_tertiary_fixed_variant` text.
- **Warning:** Amber-tinted background with deep amber text.
- **Shape:** Always `full` (9999px) radius to contrast against the `md` (12px) radius of cards.

### Input Fields
- **Default State:** `surface_container_low` fill, no border.
- **Active State:** 1px `primary` ghost-border (20% opacity) and a subtle inner-glow.
- **Labels:** Use `label-md` in `on_surface_variant`.

---

## 6. Do's and Don'ts

### Do:
- **Do** use asymmetrical padding to create "visual rhythm" (e.g., more padding on the left of a header than the right).
- **Do** use `primary_fixed_dim` for "Quiet" interactive icons that shouldn't distract from data.
- **Do** embrace the dark slate sidebar (`inverse_surface`) as a solid anchor against the light, airy content area.

### Don't:
- **Don't** use a 1px divider between table rows. Use a zebra-stripe pattern with `surface_container_lowest` and `surface_container_low`.
- **Don't** use pure black (#000) for text. Use `on_surface` (#111c2d) to maintain a premium, soft-contrast feel.
- **Don't** use "default" blue. Always reference the `primary` (#004ac6) or `primary_container` (#2563eb) tokens to ensure brand cohesion.

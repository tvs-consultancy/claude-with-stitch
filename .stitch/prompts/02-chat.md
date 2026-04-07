# Chat Interface Screen

A sophisticated, real-time AI chat interface for media planning assistance. Split-view layout with a conversation history sidebar and a spacious message area. Clean, messaging-app aesthetic with professional SaaS polish, generous whitespace, and smooth visual hierarchy.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Light, clean, minimal with subtle depth
- Sidebar Background: Pure White (#ffffff) with right border (#e2e8f0)
- Content Background: Cool Gray (#f8fafc) for message area
- Input Bar Background: Pure White (#ffffff) with top border
- Header Background: Pure White (#ffffff) with bottom border
- Primary Accent: Royal Blue (#2563eb) for user message bubbles, active states, and CTA button
- Primary Hover: Deep Blue (#1d4ed8) for button hover
- User Bubble: Royal Blue (#2563eb) background, white text
- Assistant Bubble: Pure White (#ffffff) with 1px border (#e2e8f0), dark text
- Active Conversation: Blue tint (#eff6ff) with 2px left border in Royal Blue
- Text Primary: Near Black (#0f172a) for headings and message content
- Text Secondary: Slate Gray (#64748b) for timestamps and metadata
- Text Muted: Light Slate (#94a3b8) for placeholders and empty states
- Buttons: Softly rounded (12px), primary blue with disabled state at 50% opacity
- Bubbles: Generously rounded (16px) with subtle corner variation (bottom-right sharp for user, bottom-left sharp for assistant)
- Input Field: Softly rounded (12px), 1px gray border, focus ring in blue with 20% opacity

**Page Structure:**
1. **Conversation Sidebar (fixed left, 272px wide, full height):** Top section with full-width "New Conversation" primary blue button (softly rounded). Scrollable conversation list below — each item shows conversation title (truncated, 14px medium weight) and date (12px muted text). Active conversation has blue-tinted background with left blue border accent. Hover state shows subtle gray background (#f9fafb)
2. **Chat Header (sticky top of main area):** Left-aligned conversation title in 16px semibold. Below it, message count in 12px muted text (e.g., "12 messages"). Clean white background with thin bottom border
3. **Message Area (scrollable, flex-grow):** Cool gray background. Messages displayed with generous vertical spacing (16px gap). User messages right-aligned with blue pill-shaped bubbles and white text. Assistant messages left-aligned with white bordered bubbles and dark text. Each message shows timestamp below in 12px muted text. Empty state shows centered chat emoji, "Start the conversation" heading, and "Ask about media planning strategies" subtext
4. **Input Bar (fixed bottom, white background):** Horizontal flex layout with 12px gap. Full-width text input with gray border, "Ask about media planning..." placeholder. Blue "Send" button on right (softly rounded, 14px medium weight). Disabled state when input is empty

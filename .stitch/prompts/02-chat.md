# Chat Interface Screen

A focused, professional AI conversation interface for media planning assistance. Split-view: conversation history sidebar on left, spacious message thread on right. The visual weight sits in the messages — the sidebar is navigational chrome. Satoshi typography, Corsair accent on user bubbles, generous vertical rhythm between messages.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Light, clean, minimal with tonal depth — no heavy borders
- Font Display/Body: Satoshi (geometric humanist, not Inter)
- Font Mono: JetBrains Mono (timestamps, metadata)
- Conversation Sidebar Background: Pure Surface (#FFFFFF) with 1px right border Zinc Border (#E4E4E7) at 50% opacity
- Content Background: Canvas Fog (#FAFAFA) for message area
- Input Bar Background: Pure Surface (#FFFFFF) with 1px top border Zinc Border at 50%
- Header Background: Pure Surface (#FFFFFF) with 1px bottom border Zinc Border at 50%
- Primary Accent: Corsair (#335C81) for user bubbles, active states, send button
- Primary Hover: Corsair Deep (#264466) for button hover
- User Bubble: Corsair (#335C81) fill, white text, 16px radius with bottom-right 4px sharp corner
- Assistant Bubble: Pure Surface (#FFFFFF) with 1px Zinc Border at 50%, Deep Ink text, 16px radius with bottom-left 4px sharp corner
- Active Conversation: Corsair Wash (#EBF0F7) background with 3px left border in Corsair
- Text Primary: Deep Ink (#18181B) for headings and message content
- Text Secondary: Mid Zinc (#71717A) for conversation dates
- Text Muted: Muted Zinc (#A1A1AA) for placeholders and empty state text
- Buttons: 10px radius, Corsair fill primary, no outer glow, -1px translateY on active
- Input Field: 10px radius, Ash Wash (#F4F4F5) fill resting, Corsair border at 40% on focus
- Icons: Material Symbols Rounded — no emojis
- Motion: 150ms hover transitions, spring-eased message entry (translateY 8px + opacity)

**BANNED:** Emojis, Inter font, pure black (#000), neon shadows, gradient text, circular spinners, floating labels, AI cliches

**Page Structure:**
1. **Conversation Sidebar (fixed left within content area, 280px wide, full height):** Top: full-width "New Conversation" button in Corsair fill, white text, Satoshi 500 15px, 10px radius, Material Symbols add icon left. Scrollable conversation list below — each item: conversation title (Satoshi 500 15px Deep Ink, single-line truncated) and date (JetBrains Mono 12px Muted Zinc). Active conversation: Corsair Wash background with 3px Corsair left border. Hover: Canvas Fog background. 8 conversations visible: "Q2 Digital Strategy Review", "Voss Campaign Budget Analysis", "Cross-Channel Attribution Model", "Hale Brand Refresh Brief", "Programmatic Buying Options", "Social Media Mix Optimization", "Meridian Performance Metrics", "Video Production Timeline"
2. **Chat Header (sticky top of message area):** Left-aligned conversation title "Q2 Digital Strategy Review" in Satoshi 500 18px Deep Ink. Below: "14 messages" in 12px Muted Zinc. Clean Pure Surface background, 1px bottom border Zinc Border at 50%
3. **Message Area (scrollable, flex-grow, Canvas Fog background):** Messages with 16px vertical gap. User messages right-aligned: Corsair pill bubble, white Satoshi 15px text, bottom-right corner sharp (4px). Assistant messages left-aligned: Pure Surface bordered bubble, Deep Ink text. Each message has timestamp below in JetBrains Mono 12px Muted Zinc. Show 6-8 messages demonstrating a real media planning conversation about Q2 digital strategy — budget allocation across channels, audience targeting recommendations, timeline considerations. No generic filler content.
4. **Empty State (shown when no conversation selected):** Centered vertically. Material Symbols chat_bubble icon 48px Muted Zinc. "Select a conversation" in Satoshi 500 18px Deep Ink. "Or start a new one to get planning assistance" in 15px Mid Zinc
5. **Input Bar (fixed bottom, Pure Surface background, top border):** Horizontal flex, 12px gap. Full-width text input: Ash Wash fill, 10px radius, "Ask about media planning..." placeholder in Muted Zinc 15px. Corsair "Send" button right: Material Symbols send icon, 10px radius, 40px height. Disabled at 40% opacity when input empty

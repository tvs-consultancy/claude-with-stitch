# File Upload Screen

A clean, functional file management page for uploading and organizing media assets and planning documents. Centered drag-and-drop zone with a structured file list below. The upload zone is the visual anchor — generous padding, clear iconography, obvious affordance. File list is dense but scannable with progress feedback and status indicators.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Light, spacious, interactive feedback through state changes
- Font Display/Body: Satoshi (geometric humanist, not Inter)
- Font Mono: JetBrains Mono (file sizes, percentages, timestamps)
- Page Background: Canvas Fog (#FAFAFA)
- Surface/Cards: Pure Surface (#FFFFFF) with 1px Zinc Border (#E4E4E7) at 50% opacity, ambient shadow 0 1px 3px rgba(24,24,27,0.04)
- Drop Zone Default: Dashed 2px Zinc Border (#E4E4E7), transparent background, 16px radius
- Drop Zone Active/Drag: Dashed 2px Corsair (#335C81), Corsair Wash (#EBF0F7) background, scale(1.01) transform
- Drop Zone Hover: Dashed 2px Zinc Border at 70%, Canvas Fog background
- Primary Accent: Corsair (#335C81) for progress bars, interactive elements
- Primary Hover: Corsair Deep (#264466)
- Success: (#059669) for "Uploaded" status text
- Danger: (#DC2626) for remove buttons and "Clear all" action
- Text Primary: Deep Ink (#18181B) for headings and filenames
- Text Secondary: Mid Zinc (#71717A) for descriptions and metadata
- Text Muted: Muted Zinc (#A1A1AA) for helper text and empty states
- Progress Bar: 4px height, rounded-full, Ash Wash (#F4F4F5) track, Corsair fill, 300ms ease transition
- Cards: 16px radius, no internal divider lines
- Icons: Material Symbols Rounded — cloud_upload for zone, insert_drive_file / image / picture_as_pdf / videocam for file types — no emojis
- Motion: Progress bar smooth width transition. Drop zone scale(1.01) on drag with 150ms spring. Staggered file list reveal (50ms cascade)

**BANNED:** Emojis, Inter font, pure black (#000), circular spinners, neon shadows, generic filenames, fake round percentages

**Page Structure:**
1. **Page Header (left-aligned):** "Files" in Satoshi 600 24px Deep Ink. Below: "Upload and manage media assets & documents" in 15px Mid Zinc. 32px bottom margin
2. **Drag-and-Drop Upload Zone (full-width, centered content):** Large dashed-border container, 48px vertical padding, 16px radius. Material Symbols cloud_upload icon (48px, Mid Zinc) centered. "Drag & drop files here" in Satoshi 500 18px Deep Ink. "or click to browse" in 15px Corsair (link style). "Supports images, PDFs, videos, documents, and spreadsheets" in 12px Muted Zinc. Entire zone clickable. Active drag state: Corsair dashed border, Corsair Wash background, cloud_download icon replaces cloud_upload, scale(1.01)
3. **File List (white card, full-width, 16px radius, 24px margin-top):** Header inside card: "Uploaded Files (6)" Satoshi 500 18px left, "Clear all" ghost button in (#DC2626) text right. File items separated by 24px padding gap (no divider lines). Each row: Material Symbols file type icon (24px, Mid Zinc — image for images, picture_as_pdf for PDFs, videocam for video, insert_drive_file for docs), filename in Satoshi 500 15px Deep Ink (truncated), metadata line with file size in JetBrains Mono 12px Muted Zinc + file type separated by mid-dot, progress bar (if uploading — 4px Ash Wash track, Corsair fill), status text ("Uploaded" in #059669 or "73%" in Mid Zinc using JetBrains Mono), remove button: Material Symbols close icon 16px in Muted Zinc, hover (#DC2626). Realistic filenames: "Q2-media-plan-v3.xlsx" (2.4 MB), "voss-brand-guidelines.pdf" (18.7 MB), "meridian-campaign-assets.zip" (145.2 MB), "social-creative-batch-apr.zip" (67.8 MB uploading 73%), "audience-segments-report.csv" (890 KB), "video-storyboard-draft.mp4" (234.5 MB uploading 31%)
4. **Empty State (when no files):** Centered vertically in card. Material Symbols folder_open icon 48px Muted Zinc. "No files uploaded yet" in Satoshi 500 18px Deep Ink. "Upload files to get started with your media plan" in 15px Mid Zinc

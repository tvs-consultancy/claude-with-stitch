# File Upload Screen

A clean, intuitive file management page for uploading and organizing media assets and documents. Centered drag-and-drop upload zone with a comprehensive file list below. Professional document-management aesthetic with clear visual feedback for upload states and progress.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Light, clean, spacious with interactive feedback
- Page Background: Cool Gray (#f8fafc)
- Surface/Cards: Pure White (#ffffff) with 1px border (#e2e8f0) and whisper-soft shadow
- Drop Zone Default: Dashed 2px border (#e2e8f0), transparent background
- Drop Zone Active: Dashed 2px border Royal Blue (#2563eb), blue tint background (#eff6ff), scale 1.01 transform
- Drop Zone Hover: Dashed 2px border with 40% blue opacity, subtle gray background (#f9fafb)
- Primary Accent: Royal Blue (#2563eb) for progress bars and interactive elements
- Success: Emerald Green (#10b981) for "Uploaded" status text
- Danger: Rose Red (#ef4444) for remove buttons and "Clear all" action
- Text Primary: Near Black (#0f172a) for headings and filenames
- Text Secondary: Slate Gray (#64748b) for descriptions and metadata
- Text Muted: Light Slate (#94a3b8) for helper text and empty states
- Progress Bar: 6px height, rounded-full, gray track (#f1f5f9), blue fill with smooth 300ms transition
- Cards: Softly rounded (12px), 1px border, clean white
- Drop Zone: Very rounded (16px), large padding (48px vertical)

**Page Structure:**
1. **Page Header:** Left-aligned "Files" heading in 24px bold with "Upload and manage media assets & documents" subtitle in secondary text
2. **Drag-and-Drop Upload Zone (centered, full-width):** Large dashed-border container with generous padding. Cloud emoji icon (48px) centered. "Drag & drop files here" in 18px medium weight. "or click to browse" in 14px muted text below. "Supports images, PDFs, videos, documents, spreadsheets and more" in 12px light muted text. Entire zone is clickable. Active drag state: blue border, blue tint background, download-tray emoji replaces cloud, slight scale-up animation
3. **File List (white card, full-width):** Header row with "Uploaded Files (N)" title on left and "Clear all" danger-colored text button on right. Divided list of file items — each row shows: file type emoji icon (24px), filename truncated (14px medium), metadata row (file size and type in 12px muted, separated by dot), progress bar (if uploading), status text ("Uploaded" in green or percentage in gray), and remove "✕" button on far right. Hover state shows subtle gray background
4. **Empty State (when no files):** Centered folder emoji (48px), "No files uploaded yet" in medium weight, "Upload files to get started" in 14px muted text

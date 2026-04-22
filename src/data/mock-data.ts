export interface MediaPlan {
  readonly id: string;
  readonly name: string;
  readonly client: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly budget: number;
  readonly status: 'active' | 'draft' | 'completed' | 'paused';
  readonly channels: string[];
  readonly createdAt: string;
}

export interface ChatMessage {
  readonly id: string;
  readonly role: 'user' | 'assistant';
  readonly content: string;
  readonly timestamp: string;
}

export interface Conversation {
  readonly id: string;
  readonly title: string;
  readonly messages: ChatMessage[];
  readonly createdAt: string;
}

export interface UploadedFile {
  readonly id: string;
  readonly name: string;
  readonly size: number;
  readonly type: string;
  readonly uploadedAt: string;
  readonly progress: number;
}

export const mockMediaPlans: readonly MediaPlan[] = [
  {
    id: '1',
    name: 'Meridian Q2 Digital Push',
    client: 'Meridian Media Group',
    startDate: '2025-03-01',
    endDate: '2025-06-30',
    budget: 847500,
    status: 'active',
    channels: ['Social', 'Search'],
    createdAt: '2025-02-15',
  },
  {
    id: '2',
    name: 'Voss Automotive Launch',
    client: 'Voss Motors',
    startDate: '2025-04-15',
    endDate: '2025-12-31',
    budget: 1245000,
    status: 'active',
    channels: ['OOH', 'TV'],
    createdAt: '2025-03-20',
  },
  {
    id: '3',
    name: 'Hale Brand Refresh',
    client: 'Hale & Partners',
    startDate: '2025-08-01',
    endDate: '2025-09-30',
    budget: 425000,
    status: 'draft',
    channels: ['Display'],
    createdAt: '2025-04-01',
  },
  {
    id: '4',
    name: 'Apex Summer Campaign',
    client: 'Apex Athletics',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    budget: 678300,
    status: 'completed',
    channels: ['Meta', 'OOH'],
    createdAt: '2025-05-10',
  },
  {
    id: '5',
    name: 'Caliber Financial Q3',
    client: 'Caliber Wealth Advisors',
    startDate: '2025-07-01',
    endDate: '2025-09-30',
    budget: 892000,
    status: 'active',
    channels: ['LinkedIn'],
    createdAt: '2025-06-01',
  },
  {
    id: '6',
    name: 'Fern & Bower Holiday',
    client: 'Fern & Bower Retail',
    startDate: '2025-10-01',
    endDate: '2025-12-24',
    budget: 1125000,
    status: 'draft',
    channels: ['TV', 'Digital'],
    createdAt: '2025-07-15',
  },
  {
    id: '7',
    name: 'Trident Global Rebrand',
    client: 'Trident Communications',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    budget: 2348000,
    status: 'paused',
    channels: ['Global'],
    createdAt: '2024-11-01',
  },
  {
    id: '8',
    name: 'Lumen Health Awareness',
    client: 'Lumen Therapeutics',
    startDate: '2025-05-01',
    endDate: '2025-10-31',
    budget: 567600,
    status: 'active',
    channels: ['Radio', 'Local'],
    createdAt: '2025-04-01',
  },
  {
    id: '9',
    name: 'Retail Sync Phase 1',
    client: 'Swift Mart',
    startDate: '2025-03-01',
    endDate: '2025-04-15',
    budget: 320000,
    status: 'active',
    channels: ['Radio', 'Local'],
    createdAt: '2025-02-01',
  },
  {
    id: '10',
    name: 'Global Omni-Channel Q4',
    client: 'Lumina Retail',
    startDate: '2025-10-01',
    endDate: '2025-12-31',
    budget: 2800000,
    status: 'paused',
    channels: ['Global'],
    createdAt: '2025-08-15',
  },
];

export const mockConversations: readonly Conversation[] = [
  {
    id: '1',
    title: 'Q2 Campaign Strategy',
    createdAt: '2025-04-05',
    messages: [
      {
        id: '1a',
        role: 'user',
        content: 'What channels should we focus on for the Meridian Q2 brand awareness campaign?',
        timestamp: '2025-04-05T10:00:00Z',
      },
      {
        id: '1b',
        role: 'assistant',
        content: 'For the Meridian Q2 campaign, I recommend a multi-channel approach focusing on Social Media (Instagram, TikTok), Programmatic Display, and Video (YouTube pre-roll). These channels offer the best reach-to-cost ratio for awareness objectives. Would you like me to break down the budget allocation?',
        timestamp: '2025-04-05T10:00:30Z',
      },
      {
        id: '1c',
        role: 'user',
        content: 'Yes, please suggest a budget split for $847,500.',
        timestamp: '2025-04-05T10:01:00Z',
      },
      {
        id: '1d',
        role: 'assistant',
        content: 'Here\'s a suggested budget allocation for $847,500:\n\n- Social Media: $296,625 (35%) - Paid ads on Instagram & TikTok\n- Video/YouTube: $254,250 (30%) - Pre-roll and in-stream ads\n- Programmatic Display: $169,500 (20%) - Targeted banner ads\n- Influencer Partnerships: $84,750 (10%) - Micro-influencer collaborations\n- Contingency: $42,375 (5%)\n\nThis split prioritizes high-impact visual channels while maintaining flexibility.',
        timestamp: '2025-04-05T10:01:30Z',
      },
    ],
  },
  {
    id: '2',
    title: 'Budget Optimization Tips',
    createdAt: '2025-04-03',
    messages: [
      {
        id: '2a',
        role: 'user',
        content: 'How can I optimize our media budget across the Voss and Apex campaigns?',
        timestamp: '2025-04-03T14:00:00Z',
      },
      {
        id: '2b',
        role: 'assistant',
        content: 'Here are key strategies for cross-campaign budget optimization:\n\n1. **Shared audiences** - Pool remarketing audiences across Voss and Apex\n2. **Frequency capping** - Prevent over-exposure across channels\n3. **Dayparting** - Shift spend to peak engagement windows\n4. **A/B testing** - Allocate 10-15% for testing new creatives\n5. **Attribution modeling** - Use multi-touch to find true ROI per channel',
        timestamp: '2025-04-03T14:00:30Z',
      },
    ],
  },
];

export const assistantResponses: readonly string[] = [
  "That's a great question! Based on current market trends, I'd recommend allocating 40% of your budget to digital channels, 30% to social media, and the remaining 30% split between traditional and emerging media.",
  "For that target demographic, consider focusing on Instagram Reels, TikTok, and YouTube Shorts. Short-form video content has shown 3x higher engagement rates this quarter.",
  "I'd suggest a phased approach: start with awareness campaigns in weeks 1-2, shift to consideration in weeks 3-4, and close with conversion-focused ads in the final weeks.",
  "Looking at your campaign performance data, the display ads are underperforming. I recommend reallocating 15% of that budget to programmatic video instead.",
  "Great plan! To maximize ROI, make sure you have proper UTM tracking on all creative assets and set up conversion events in your analytics platform before launch.",
];

export const mockUploadedFiles: readonly UploadedFile[] = [
  {
    id: '1',
    name: 'Q2-media-plan-v3.xlsx',
    size: 2516582,
    type: 'spreadsheet',
    uploadedAt: '2025-04-10T09:30:00Z',
    progress: 100,
  },
  {
    id: '2',
    name: 'voss-brand-guidelines.pdf',
    size: 19608986,
    type: 'pdf',
    uploadedAt: '2025-04-09T14:15:00Z',
    progress: 100,
  },
  {
    id: '3',
    name: 'meridian-campaign-assets.zip',
    size: 152209818,
    type: 'archive',
    uploadedAt: '2025-04-08T11:00:00Z',
    progress: 100,
  },
  {
    id: '4',
    name: 'social-creative-batch-apr.zip',
    size: 71088538,
    type: 'archive',
    uploadedAt: '2025-04-11T16:45:00Z',
    progress: 73,
  },
  {
    id: '5',
    name: 'audience-segments-report.csv',
    size: 911360,
    type: 'spreadsheet',
    uploadedAt: '2025-04-07T10:20:00Z',
    progress: 100,
  },
  {
    id: '6',
    name: 'video-storyboard-draft.mp4',
    size: 245850931,
    type: 'video',
    uploadedAt: '2025-04-11T17:00:00Z',
    progress: 31,
  },
];

export function formatCurrency(amount: number): string {
  if (!Number.isFinite(amount)) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '—';
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return '—';
  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${fmt(s)} - ${fmt(e)}, ${e.getFullYear()}`;
}

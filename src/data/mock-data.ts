export interface MediaPlan {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: 'active' | 'draft' | 'completed' | 'paused';
  channels: string[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  progress: number;
}

export const mockMediaPlans: MediaPlan[] = [
  {
    id: '1',
    name: 'Q2 Brand Awareness Campaign',
    client: 'Acme Corp',
    startDate: '2026-04-01',
    endDate: '2026-06-30',
    budget: 150000,
    status: 'active',
    channels: ['Social Media', 'Display', 'Video'],
    createdAt: '2026-03-15',
  },
  {
    id: '2',
    name: 'Summer Product Launch',
    client: 'TechStart Inc',
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    budget: 250000,
    status: 'draft',
    channels: ['TV', 'Digital', 'Print'],
    createdAt: '2026-03-20',
  },
  {
    id: '3',
    name: 'Holiday Season Promo',
    client: 'RetailMax',
    startDate: '2026-11-01',
    endDate: '2026-12-31',
    budget: 500000,
    status: 'draft',
    channels: ['TV', 'Radio', 'Social Media', 'Display'],
    createdAt: '2026-03-25',
  },
  {
    id: '4',
    name: 'Spring Fitness Drive',
    client: 'FitLife Gyms',
    startDate: '2026-03-01',
    endDate: '2026-05-31',
    budget: 80000,
    status: 'active',
    channels: ['Social Media', 'Influencer'],
    createdAt: '2026-02-10',
  },
  {
    id: '5',
    name: 'Back to School 2026',
    client: 'EduTech Solutions',
    startDate: '2026-07-15',
    endDate: '2026-09-15',
    budget: 120000,
    status: 'draft',
    channels: ['Digital', 'Social Media', 'Email'],
    createdAt: '2026-04-01',
  },
  {
    id: '6',
    name: 'Annual Brand Refresh',
    client: 'GreenLeaf Foods',
    startDate: '2026-01-01',
    endDate: '2026-03-31',
    budget: 200000,
    status: 'completed',
    channels: ['TV', 'Print', 'Digital'],
    createdAt: '2025-12-01',
  },
  {
    id: '7',
    name: 'New Market Entry - APAC',
    client: 'GlobalTech',
    startDate: '2026-05-01',
    endDate: '2026-10-31',
    budget: 750000,
    status: 'active',
    channels: ['Digital', 'Social Media', 'Display', 'Video'],
    createdAt: '2026-03-01',
  },
  {
    id: '8',
    name: 'App Install Campaign',
    client: 'FinanceApp',
    startDate: '2026-02-01',
    endDate: '2026-04-30',
    budget: 95000,
    status: 'paused',
    channels: ['Mobile', 'Social Media'],
    createdAt: '2026-01-15',
  },
  {
    id: '9',
    name: 'Podcast Sponsorship Series',
    client: 'CloudSync',
    startDate: '2026-04-01',
    endDate: '2026-09-30',
    budget: 60000,
    status: 'active',
    channels: ['Audio', 'Social Media'],
    createdAt: '2026-03-10',
  },
  {
    id: '10',
    name: 'Influencer Partnership Q3',
    client: 'BeautyBrand Co',
    startDate: '2026-07-01',
    endDate: '2026-09-30',
    budget: 180000,
    status: 'draft',
    channels: ['Influencer', 'Social Media', 'Video'],
    createdAt: '2026-04-05',
  },
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Q2 Campaign Strategy',
    createdAt: '2026-04-05',
    messages: [
      {
        id: '1a',
        role: 'user',
        content: 'What channels should we focus on for the Q2 brand awareness campaign?',
        timestamp: '2026-04-05T10:00:00Z',
      },
      {
        id: '1b',
        role: 'assistant',
        content: 'For a Q2 brand awareness campaign, I recommend a multi-channel approach focusing on Social Media (Instagram, TikTok), Programmatic Display, and Video (YouTube pre-roll). These channels offer the best reach-to-cost ratio for awareness objectives. Would you like me to break down the budget allocation?',
        timestamp: '2026-04-05T10:00:30Z',
      },
      {
        id: '1c',
        role: 'user',
        content: 'Yes, please suggest a budget split for $150K.',
        timestamp: '2026-04-05T10:01:00Z',
      },
      {
        id: '1d',
        role: 'assistant',
        content: 'Here\'s a suggested budget allocation for $150K:\n\n- Social Media: $52,500 (35%) - Paid ads on Instagram & TikTok\n- Video/YouTube: $45,000 (30%) - Pre-roll and in-stream ads\n- Programmatic Display: $30,000 (20%) - Targeted banner ads\n- Influencer Partnerships: $15,000 (10%) - Micro-influencer collaborations\n- Contingency: $7,500 (5%)\n\nThis split prioritizes high-impact visual channels while maintaining flexibility.',
        timestamp: '2026-04-05T10:01:30Z',
      },
    ],
  },
  {
    id: '2',
    title: 'Budget Optimization Tips',
    createdAt: '2026-04-03',
    messages: [
      {
        id: '2a',
        role: 'user',
        content: 'How can I optimize my media budget across multiple campaigns?',
        timestamp: '2026-04-03T14:00:00Z',
      },
      {
        id: '2b',
        role: 'assistant',
        content: 'Here are key strategies for cross-campaign budget optimization:\n\n1. **Shared audiences** - Pool remarketing audiences across campaigns\n2. **Frequency capping** - Prevent over-exposure across channels\n3. **Dayparting** - Shift spend to peak engagement windows\n4. **A/B testing** - Allocate 10-15% for testing new creatives\n5. **Attribution modeling** - Use multi-touch to find true ROI per channel',
        timestamp: '2026-04-03T14:00:30Z',
      },
    ],
  },
];

export const assistantResponses = [
  "That's a great question! Based on current market trends, I'd recommend allocating 40% of your budget to digital channels, 30% to social media, and the remaining 30% split between traditional and emerging media.",
  "For that target demographic, consider focusing on Instagram Reels, TikTok, and YouTube Shorts. Short-form video content has shown 3x higher engagement rates this quarter.",
  "I'd suggest a phased approach: start with awareness campaigns in weeks 1-2, shift to consideration in weeks 3-4, and close with conversion-focused ads in the final weeks.",
  "Looking at your campaign performance data, the display ads are underperforming. I recommend reallocating 15% of that budget to programmatic video instead.",
  "Great plan! To maximize ROI, make sure you have proper UTM tracking on all creative assets and set up conversion events in your analytics platform before launch.",
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

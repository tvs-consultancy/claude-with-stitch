import { Link } from 'react-router-dom';
import { mockMediaPlans, formatCurrency } from '../data/mock-data';

const activePlans = mockMediaPlans.filter((p) => p.status === 'active');
const totalBudget = mockMediaPlans.reduce((sum, p) => sum + p.budget, 0);
const activeBudget = activePlans.reduce((sum, p) => sum + p.budget, 0);
const draftCount = mockMediaPlans.filter((p) => p.status === 'draft').length;

const stats = [
  {
    label: 'Active Campaigns',
    value: activePlans.length.toString(),
    dot: 'bg-[#2563eb]',
    trend: '+2 this month',
    icon: '📈',
  },
  {
    label: 'Total Budget',
    value: formatCurrency(totalBudget),
    dot: 'bg-[#8b5cf6]',
    trend: 'Across all plans',
    icon: '💰',
  },
  {
    label: 'Active Spend',
    value: formatCurrency(activeBudget),
    dot: 'bg-[#10b981]',
    trend: `${Math.round((activeBudget / totalBudget) * 100)}% of total`,
    icon: '⚡',
  },
  {
    label: 'Draft Plans',
    value: draftCount.toString(),
    dot: 'bg-[#f59e0b]',
    trend: 'Awaiting approval',
    icon: '📝',
  },
];

const statusColors: Record<string, string> = {
  active: 'bg-[#dcfce7] text-[#15803d]',
  draft: 'bg-[#fef9c3] text-[#a16207]',
  completed: 'bg-[#dbeafe] text-[#1d4ed8]',
  paused: 'bg-[#f3f4f6] text-[#4b5563]',
};

const quickActions = [
  {
    to: '/chat',
    icon: '💬',
    title: 'Start Planning Chat',
    desc: 'Get AI-powered planning advice',
    bg: 'bg-[#2563eb]/5',
    border: 'border-[#2563eb]/15',
    hover: 'hover:bg-[#2563eb]/10 hover:border-[#2563eb]/25',
  },
  {
    to: '/files',
    icon: '📁',
    title: 'Upload Files',
    desc: 'Add media assets & documents',
    bg: 'bg-[#8b5cf6]/5',
    border: 'border-[#8b5cf6]/15',
    hover: 'hover:bg-[#8b5cf6]/10 hover:border-[#8b5cf6]/25',
  },
  {
    to: '/plans',
    icon: '📋',
    title: 'View All Plans',
    desc: 'Browse & manage media plans',
    bg: 'bg-[#10b981]/5',
    border: 'border-[#10b981]/15',
    hover: 'hover:bg-[#10b981]/10 hover:border-[#10b981]/25',
  },
];

export default function Dashboard() {
  return (
    <div className="p-8 max-w-[1400px]">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">Dashboard</h1>
        <p className="text-[#64748b] mt-1 text-sm">Overview of your media planning activity</p>
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className={`w-2 h-2 rounded-full ${stat.dot}`} />
                <span className="text-xs font-medium text-[#64748b] uppercase tracking-wider">{stat.label}</span>
              </div>
              <span className="text-lg">{stat.icon}</span>
            </div>
            <p className="text-[28px] font-bold text-[#0f172a] leading-tight">{stat.value}</p>
            <p className="text-xs text-[#94a3b8] mt-2">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {quickActions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className={`group flex items-center gap-4 p-5 ${action.bg} border ${action.border} rounded-xl ${action.hover} transition-all duration-200`}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">{action.icon}</span>
            <div>
              <p className="font-semibold text-[#0f172a] text-sm">{action.title}</p>
              <p className="text-xs text-[#64748b] mt-0.5">{action.desc}</p>
            </div>
            <svg className="w-4 h-4 text-[#94a3b8] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      {/* Recent Media Plans Table */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e2e8f0]">
          <div>
            <h2 className="text-base font-semibold text-[#0f172a]">Recent Media Plans</h2>
            <p className="text-xs text-[#94a3b8] mt-0.5">Showing latest 5 plans</p>
          </div>
          <Link
            to="/plans"
            className="text-sm text-[#2563eb] hover:text-[#1d4ed8] font-medium flex items-center gap-1 transition-colors"
          >
            View all
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e2e8f0]">
                <th className="text-left text-[11px] font-semibold text-[#64748b] uppercase tracking-wider px-6 py-3">Plan</th>
                <th className="text-left text-[11px] font-semibold text-[#64748b] uppercase tracking-wider px-6 py-3">Client</th>
                <th className="text-left text-[11px] font-semibold text-[#64748b] uppercase tracking-wider px-6 py-3">Budget</th>
                <th className="text-left text-[11px] font-semibold text-[#64748b] uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-[11px] font-semibold text-[#64748b] uppercase tracking-wider px-6 py-3">Channels</th>
              </tr>
            </thead>
            <tbody>
              {mockMediaPlans.slice(0, 5).map((plan, idx) => (
                <tr
                  key={plan.id}
                  className={`hover:bg-[#f8fafc] transition-colors ${idx < 4 ? 'border-b border-[#f1f5f9]' : ''}`}
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#0f172a] text-sm">{plan.name}</p>
                    <p className="text-[11px] text-[#94a3b8] mt-0.5">{plan.startDate} — {plan.endDate}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#64748b]">{plan.client}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#0f172a]">{formatCurrency(plan.budget)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${statusColors[plan.status]}`}>
                      {plan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {plan.channels.slice(0, 2).map((ch) => (
                        <span key={ch} className="text-[11px] bg-[#f3f4f6] text-[#4b5563] px-2 py-0.5 rounded-md font-medium">
                          {ch}
                        </span>
                      ))}
                      {plan.channels.length > 2 && (
                        <span className="text-[11px] text-[#94a3b8] font-medium">+{plan.channels.length - 2}</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

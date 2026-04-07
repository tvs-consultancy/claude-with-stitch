import { Link } from 'react-router-dom';
import { mockMediaPlans, formatCurrency } from '../data/mock-data';

const activePlans = mockMediaPlans.filter((p) => p.status === 'active');
const totalBudget = mockMediaPlans.reduce((sum, p) => sum + p.budget, 0);
const activeBudget = activePlans.reduce((sum, p) => sum + p.budget, 0);

const stats = [
  { label: 'Active Campaigns', value: activePlans.length.toString(), color: 'bg-primary' },
  { label: 'Total Budget', value: formatCurrency(totalBudget), color: 'bg-accent' },
  { label: 'Active Spend', value: formatCurrency(activeBudget), color: 'bg-success' },
  { label: 'Draft Plans', value: mockMediaPlans.filter((p) => p.status === 'draft').length.toString(), color: 'bg-warning' },
];

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  draft: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-blue-100 text-blue-700',
  paused: 'bg-gray-100 text-gray-600',
};

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your media planning activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-2 h-2 rounded-full ${stat.color}`} />
              <span className="text-sm text-gray-500">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link
          to="/chat"
          className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors"
        >
          <span className="text-2xl">💬</span>
          <div>
            <p className="font-medium text-gray-900">Start Planning Chat</p>
            <p className="text-sm text-gray-500">Get AI-powered planning advice</p>
          </div>
        </Link>
        <Link
          to="/files"
          className="flex items-center gap-3 p-4 bg-accent/5 border border-accent/20 rounded-xl hover:bg-accent/10 transition-colors"
        >
          <span className="text-2xl">📁</span>
          <div>
            <p className="font-medium text-gray-900">Upload Files</p>
            <p className="text-sm text-gray-500">Add media assets & documents</p>
          </div>
        </Link>
        <Link
          to="/plans"
          className="flex items-center gap-3 p-4 bg-success/5 border border-success/20 rounded-xl hover:bg-success/10 transition-colors"
        >
          <span className="text-2xl">📋</span>
          <div>
            <p className="font-medium text-gray-900">View All Plans</p>
            <p className="text-sm text-gray-500">Browse & manage media plans</p>
          </div>
        </Link>
      </div>

      {/* Recent Plans Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Media Plans</h2>
          <Link to="/plans" className="text-sm text-primary hover:text-primary-dark font-medium">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Plan</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Client</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Budget</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Channels</th>
              </tr>
            </thead>
            <tbody>
              {mockMediaPlans.slice(0, 5).map((plan) => (
                <tr key={plan.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{plan.name}</p>
                    <p className="text-xs text-gray-400">{plan.startDate} — {plan.endDate}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{plan.client}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(plan.budget)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[plan.status]}`}>
                      {plan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {plan.channels.slice(0, 2).map((ch) => (
                        <span key={ch} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {ch}
                        </span>
                      ))}
                      {plan.channels.length > 2 && (
                        <span className="text-xs text-gray-400">+{plan.channels.length - 2}</span>
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

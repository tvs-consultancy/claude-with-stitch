import { Link } from 'react-router-dom';
import { mockMediaPlans, formatCurrency } from '../data/mock-data';
import Icon from '../components/Icon';

const activePlans = mockMediaPlans.filter((p) => p.status === 'active');
const totalBudget = mockMediaPlans.reduce((sum, p) => sum + p.budget, 0);
const activeBudget = activePlans.reduce((sum, p) => sum + p.budget, 0);
const draftCount = mockMediaPlans.filter((p) => p.status === 'draft').length;

const stats = [
  {
    label: 'Active Campaigns',
    value: activePlans.length.toString(),
    trend: `+1 this month`,
    trendColor: 'text-emerald-600 bg-emerald-100/50',
  },
  {
    label: 'Total Budget',
    value: formatCurrency(totalBudget),
    trend: null,
    trendColor: '',
  },
  {
    label: 'Active Spend',
    value: formatCurrency(activeBudget),
    trend: null,
    trendColor: '',
  },
  {
    label: 'Draft Plans',
    value: draftCount.toString(),
    trend: 'Awaiting review',
    trendColor: 'text-amber-600 bg-amber-100/50',
  },
];

const statusColors: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  draft: 'bg-amber-100 text-amber-700',
  completed: 'bg-blue-100 text-blue-700',
  paused: 'bg-slate-200 text-slate-600',
  planning: 'bg-blue-100 text-blue-700',
};

const planIcons: Record<string, string> = {
  '1': 'rocket_launch',
  '2': 'sunny',
  '3': 'celebration',
  '4': 'fitness_center',
  '5': 'school',
  '6': 'eco',
  '7': 'public',
  '8': 'smartphone',
  '9': 'podcasts',
  '10': 'group',
};

const quickActions = [
  {
    to: '/chat',
    icon: 'chat',
    bgIcon: 'auto_awesome',
    title: 'Start Planning Chat',
    desc: 'Let AI help you optimize your Q4 allocation',
    bg: 'bg-primary',
  },
  {
    to: '/files',
    icon: 'upload_file',
    bgIcon: 'cloud_upload',
    title: 'Upload Files',
    desc: 'Ingest raw media specs and cost sheets',
    bg: 'bg-tertiary-container',
  },
  {
    to: '/plans',
    icon: 'visibility',
    bgIcon: 'list_alt',
    title: 'View All Plans',
    desc: 'Access your full historical archive',
    bg: 'bg-secondary',
  },
];

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Dashboard</h2>
        <p className="text-on-surface-variant font-medium">
          Overview of your media planning activity
        </p>
      </section>

      {/* Stats Row: Tonal Layering */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface-container-low p-1 rounded-xl">
            <div className="bg-surface-container-lowest p-6 rounded-[10px] shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant/70 mb-1">
                {stat.label}
              </p>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-on-surface">{stat.value}</span>
                {stat.trend && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stat.trendColor}`}>
                    {stat.trend}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions: Gradient Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className={`group relative overflow-hidden ${action.bg} p-6 rounded-xl text-left transition-all hover:scale-[1.02] active:scale-[0.98]`}
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Icon name={action.bgIcon} filled className="text-[120px] text-white" />
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-4">
              <Icon name={action.icon} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{action.title}</h3>
            <p className="text-white/70 text-sm">{action.desc}</p>
          </Link>
        ))}
      </div>

      {/* Recent Media Plans Table */}
      <section className="bg-surface-container-low p-1 rounded-xl">
        <div className="bg-surface-container-lowest rounded-[10px] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
            <h3 className="text-xl font-bold text-on-surface">Recent Media Plans</h3>
            <Link to="/plans" className="text-primary text-sm font-semibold hover:underline">
              Export CSV
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">
                    Plan Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">
                    Client
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">
                    Budget
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">
                    Channels
                  </th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {mockMediaPlans.slice(0, 5).map((plan) => (
                  <tr key={plan.id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                          <Icon name={planIcons[plan.id] ?? 'description'} size="sm" />
                        </div>
                        <span className="font-semibold text-on-surface">{plan.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">{plan.client}</td>
                    <td className="px-6 py-4 text-on-surface font-medium">
                      {formatCurrency(plan.budget)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter ${statusColors[plan.status]}`}
                      >
                        {plan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {plan.channels.slice(0, 2).map((ch) => (
                          <span
                            key={ch}
                            className="px-2 py-0.5 bg-surface-container-high rounded text-[10px] font-bold text-secondary"
                          >
                            {ch}
                          </span>
                        ))}
                        {plan.channels.length > 2 && (
                          <span className="text-[10px] text-on-surface-variant">
                            +{plan.channels.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 hover:bg-surface-container-high rounded-full transition-colors">
                        <Icon name="more_vert" className="text-on-surface-variant" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center pb-4">
        <p className="text-xs text-on-surface-variant/40 font-medium">
          MediaPlan Pro &copy; 2024. Enterprise Edition v4.2.1
        </p>
      </footer>
    </div>
  );
}

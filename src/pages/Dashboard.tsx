import { Link } from 'react-router-dom';
import { mockMediaPlans, formatCurrency, formatDateRange } from '../data/mock-data';
import Icon from '../components/Icon';

const activePlans = mockMediaPlans.filter((p) => p.status === 'active');
const totalBudget = mockMediaPlans.reduce((sum, p) => sum + p.budget, 0);
const activeBudget = activePlans.reduce((sum, p) => sum + p.budget, 0);
const draftCount = mockMediaPlans.filter((p) => p.status === 'draft').length;

const stats = [
  {
    label: 'Active Campaigns',
    value: activePlans.length.toString(),
    sub: '+1 from last month',
    subIcon: 'trending_up',
    subColor: 'text-active-text',
    dotColor: 'bg-corsair',
  },
  {
    label: 'Total Budget',
    value: formatCurrency(totalBudget),
    sub: 'Allocated for Q3-Q4',
    subIcon: null,
    subColor: 'text-slate-400',
    dotColor: 'bg-active-text',
  },
  {
    label: 'Active Spend',
    value: formatCurrency(activeBudget),
    sub: 'Current monthly burn',
    subIcon: null,
    subColor: 'text-slate-400',
    dotColor: 'bg-draft-text',
  },
  {
    label: 'Draft Plans',
    value: draftCount.toString(),
    sub: 'Awaiting approval',
    subIcon: null,
    subColor: 'text-slate-400',
    dotColor: 'bg-zinc-400',
  },
] as const;

const statusColors: Readonly<Record<string, string>> = {
  active: 'bg-active-surface text-active-text',
  draft: 'bg-draft-surface text-draft-text',
  completed: 'bg-completed-surface text-completed-text',
  paused: 'bg-paused-surface text-paused-text',
};

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <header className="flex justify-between items-center w-full px-8 py-6 sticky top-0 bg-canvas-fog/80 backdrop-blur-md z-40">
        <div>
          <h2 className="text-2xl font-semibold text-deep-ink">Dashboard</h2>
          <p className="text-sm text-mid-zinc font-normal">
            AI-Powered planning overview and performance metrics.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white border border-zinc-border/50 rounded-lg px-3 py-1.5 shadow-sm">
            <Icon name="search" className="text-muted-zinc text-lg" />
            <input
              className="border-none focus:ring-0 text-sm p-0 w-48 bg-transparent placeholder:text-muted-zinc/60"
              placeholder="Search data..."
              type="text"
            />
          </div>
          <button className="p-2 text-mid-zinc hover:text-corsair transition-transform active:scale-95">
            <Icon name="history" />
          </button>
          <div className="relative p-2 text-mid-zinc hover:text-corsair transition-transform active:scale-95">
            <Icon name="notifications" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error-text rounded-full border-2 border-canvas-fog" />
          </div>
          <div className="h-8 w-px bg-zinc-border/50 mx-2" />
          <button className="px-4 py-2 bg-white border border-zinc-border/50 rounded-lg text-sm font-medium text-mid-zinc hover:bg-slate-50 transition-colors">
            Share
          </button>
          <button className="px-4 py-2 corsair-gradient text-white rounded-lg text-sm font-medium hover:brightness-110 transition-colors shadow-sm">
            Export Data
          </button>
        </div>
      </header>

      {/* Dashboard content */}
      <div className="px-8 pb-12 space-y-8">
        {/* Summary Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-xl border border-zinc-border/50 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-mid-zinc uppercase tracking-wider">
                  {stat.label}
                </span>
                <div className={`h-2 w-2 rounded-full ${stat.dotColor}`} />
              </div>
              <div className="metric-lock text-3xl font-semibold text-deep-ink">
                {stat.value}
              </div>
              <div className={`flex items-center text-[11px] ${stat.subColor} metric-lock`}>
                {stat.subIcon && (
                  <Icon name={stat.subIcon} size="sm" className="mr-1" />
                )}
                {stat.sub}
              </div>
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/chat"
            className="bg-corsair-wash p-8 rounded-xl flex items-center gap-6 group hover:bg-corsair-wash/80 transition-all text-left"
          >
            <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center text-corsair shadow-sm group-hover:scale-110 transition-transform shrink-0">
              <Icon name="chat" size="lg" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-corsair">Start Planning Chat</h3>
              <p className="text-sm text-corsair/70">Let AI suggest your next channel mix</p>
            </div>
          </Link>

          <Link
            to="/files"
            className="bg-active-surface p-8 rounded-xl flex items-center gap-6 group hover:bg-active-surface/80 transition-all text-left min-h-[140px]"
          >
            <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center text-active-text shadow-sm group-hover:scale-110 transition-transform shrink-0">
              <Icon name="upload_file" size="lg" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-active-text">Upload Media Files</h3>
              <p className="text-sm text-active-text/70">Import existing schedules or assets</p>
            </div>
          </Link>

          <Link
            to="/plans"
            className="bg-paused-surface p-8 rounded-xl flex items-center gap-6 group hover:bg-zinc-border transition-all text-left"
          >
            <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center text-mid-zinc shadow-sm group-hover:scale-110 transition-transform shrink-0">
              <Icon name="description" size="lg" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-deep-ink">View All Plans</h3>
              <p className="text-sm text-mid-zinc">Browse historical and draft archives</p>
            </div>
          </Link>
        </section>

        {/* Recent Media Plans Table */}
        <section className="bg-white rounded-xl border border-zinc-border/50 shadow-sm overflow-hidden">
          <div className="px-8 py-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-deep-ink">Recent Media Plans</h3>
            <Link to="/plans" className="text-sm font-medium text-corsair hover:underline">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80">
                  <th className="px-8 py-4 text-[11px] font-semibold text-mid-zinc uppercase tracking-widest">
                    Plan Name
                  </th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-mid-zinc uppercase tracking-widest">
                    Client
                  </th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-mid-zinc uppercase tracking-widest">
                    Budget
                  </th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-mid-zinc uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-mid-zinc uppercase tracking-widest">
                    Channels
                  </th>
                  <th className="px-8 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100/50">
                {mockMediaPlans.slice(0, 5).map((plan, i) => (
                  <tr
                    key={plan.id}
                    className={`hover:bg-slate-50/50 transition-colors ${
                      i % 2 === 1 ? 'bg-slate-50/30' : ''
                    }`}
                  >
                    <td className="px-8 py-5">
                      <div className="font-medium text-deep-ink">{plan.name}</div>
                      <div className="metric-lock text-[10px] text-muted-zinc mt-0.5">
                        {formatDateRange(plan.startDate, plan.endDate)}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-mid-zinc">{plan.client}</td>
                    <td className="px-6 py-5 metric-lock text-sm font-medium text-deep-ink">
                      {formatCurrency(plan.budget)}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${statusColors[plan.status]}`}
                      >
                        {plan.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        {plan.channels.slice(0, 2).map((ch) => (
                          <span
                            key={ch}
                            className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-medium text-mid-zinc"
                          >
                            {ch}
                          </span>
                        ))}
                        {plan.channels.length > 2 && (
                          <span className="text-[10px] text-muted-zinc">
                            +{plan.channels.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-muted-zinc hover:text-corsair transition-colors">
                        <Icon name="more_horiz" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

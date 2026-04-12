import { useState, useMemo } from 'react';
import { mockMediaPlans, formatCurrency } from '../data/mock-data';
import Icon from '../components/Icon';

type ViewMode = 'table' | 'grid';
type StatusFilter = 'all' | 'active' | 'draft' | 'completed' | 'paused';
type SortField = 'name' | 'client' | 'budget' | 'startDate';
type SortDir = 'asc' | 'desc';

const statusColors: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  draft: 'bg-amber-100 text-amber-700',
  completed: 'bg-blue-100 text-blue-700',
  paused: 'bg-slate-200 text-slate-600',
};

export default function MediaPlans() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const filteredPlans = useMemo(() => {
    let plans = [...mockMediaPlans];

    if (search) {
      const q = search.toLowerCase();
      plans = plans.filter(
        (p) => p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      plans = plans.filter((p) => p.status === statusFilter);
    }

    plans.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'budget') cmp = a.budget - b.budget;
      else cmp = (a[sortField] ?? '').localeCompare(b[sortField] ?? '');
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return plans;
  }, [search, statusFilter, sortField, sortDir]);

  function toggleSort(field: SortField) {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortField(field);
      setSortDir('asc');
    }
  }

  const sortableColumns: { field: SortField; label: string }[] = [
    { field: 'name', label: 'Plan Name' },
    { field: 'client', label: 'Client' },
    { field: 'startDate', label: 'Date Range' },
    { field: 'budget', label: 'Budget' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Media Plans</h2>
          <p className="text-on-surface-variant font-medium mt-1">
            Manage and track your media buying strategies
          </p>
        </div>
        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-surface-container-high rounded-lg p-1">
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === 'table'
                ? 'bg-white shadow-sm text-on-surface'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="table_rows" size="sm" />
            Table
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-white shadow-sm text-on-surface'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="grid_view" size="sm" />
            Grid
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Icon
            name="search"
            size="sm"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
          <input
            type="text"
            placeholder="Search plans or clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-surface-container-highest border-none rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/60 w-72 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="px-4 py-2.5 bg-surface-container-highest border-none rounded-xl text-sm text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="completed">Completed</option>
          <option value="paused">Paused</option>
        </select>
        <span className="flex items-center text-xs text-on-surface-variant ml-auto font-medium uppercase tracking-wider">
          {filteredPlans.length} plans total
        </span>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <section className="bg-surface-container-low p-1 rounded-xl">
          <div className="bg-surface-container-lowest rounded-[10px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50">
                    {sortableColumns.map(({ field, label }) => (
                      <th
                        key={field}
                        onClick={() => toggleSort(field)}
                        className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 cursor-pointer hover:text-on-surface select-none transition-colors"
                      >
                        {label}
                        <span className={`ml-1.5 ${sortField === field ? 'text-primary' : 'text-outline-variant'}`}>
                          {sortField === field ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                        </span>
                      </th>
                    ))}
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
                  {filteredPlans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                            <Icon name="description" size="sm" />
                          </div>
                          <span className="font-semibold text-on-surface">{plan.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant text-sm">{plan.client}</td>
                      <td className="px-6 py-4 text-on-surface-variant text-sm">
                        {plan.startDate} — {plan.endDate}
                      </td>
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
            {filteredPlans.length === 0 && (
              <div className="p-16 text-center">
                <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mx-auto mb-4">
                  <Icon name="search_off" size="xl" className="text-on-surface-variant" />
                </div>
                <p className="font-bold text-on-surface">No plans found</p>
                <p className="text-sm text-on-surface-variant mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Card/Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-on-surface text-sm leading-snug pr-2">
                  {plan.name}
                </h3>
                <span
                  className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase shrink-0 ${statusColors[plan.status]}`}
                >
                  {plan.status}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant mb-4">{plan.client}</p>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant text-xs uppercase tracking-wider font-medium">
                    Budget
                  </span>
                  <span className="font-bold text-on-surface">{formatCurrency(plan.budget)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant text-xs uppercase tracking-wider font-medium">
                    Duration
                  </span>
                  <span className="text-on-surface-variant text-xs">
                    {plan.startDate} — {plan.endDate}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-outline-variant/10">
                {plan.channels.map((ch) => (
                  <span
                    key={ch}
                    className="text-[11px] bg-primary-fixed text-primary px-2 py-0.5 rounded-md font-medium"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {filteredPlans.length === 0 && (
            <div className="col-span-full p-16 text-center">
              <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mx-auto mb-4">
                <Icon name="search_off" size="xl" className="text-on-surface-variant" />
              </div>
              <p className="font-bold text-on-surface">No plans found</p>
              <p className="text-sm text-on-surface-variant mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

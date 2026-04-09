import { useState, useMemo } from 'react';
import { mockMediaPlans, formatCurrency } from '../data/mock-data';

type ViewMode = 'table' | 'grid';
type StatusFilter = 'all' | 'active' | 'draft' | 'completed' | 'paused';
type SortField = 'name' | 'client' | 'budget' | 'startDate';
type SortDir = 'asc' | 'desc';

const statusColors: Record<string, string> = {
  active: 'bg-[#dcfce7] text-[#15803d]',
  draft: 'bg-[#fef9c3] text-[#a16207]',
  completed: 'bg-[#dbeafe] text-[#1d4ed8]',
  paused: 'bg-[#f3f4f6] text-[#4b5563]',
};

const statusDots: Record<string, string> = {
  active: 'bg-[#10b981]',
  draft: 'bg-[#f59e0b]',
  completed: 'bg-[#3b82f6]',
  paused: 'bg-[#94a3b8]',
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

  function SortIcon({ field }: { field: SortField }) {
    const isActive = sortField === field;
    return (
      <span className={`inline-flex ml-1.5 ${isActive ? 'text-[#2563eb]' : 'text-[#cbd5e1]'}`}>
        {isActive ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
      </span>
    );
  }

  const sortableColumns: { field: SortField; label: string }[] = [
    { field: 'name', label: 'Plan Name' },
    { field: 'client', label: 'Client' },
    { field: 'startDate', label: 'Date Range' },
    { field: 'budget', label: 'Budget' },
  ];

  return (
    <div className="p-8 max-w-[1400px]">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Media Plans</h1>
          <p className="text-[#64748b] mt-1 text-sm">Browse and manage all media plans</p>
        </div>
        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-[#f3f4f6] rounded-lg p-1">
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === 'table'
                ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-[#0f172a]'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 0v1.5c0 .621-.504 1.125-1.125 1.125" />
            </svg>
            Table
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-[#0f172a]'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            Cards
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative">
          <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search plans or clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm text-[#0f172a] placeholder:text-[#94a3b8] w-72 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm text-[#0f172a] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-colors"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="completed">Completed</option>
          <option value="paused">Paused</option>
        </select>
        <span className="flex items-center text-[11px] text-[#94a3b8] ml-auto font-medium">
          {filteredPlans.length} plan{filteredPlans.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f9fafb] border-b border-[#e2e8f0]">
                  {sortableColumns.map(({ field, label }) => (
                    <th
                      key={field}
                      onClick={() => toggleSort(field)}
                      className="text-left text-[11px] font-semibold text-[#64748b] uppercase tracking-wider px-6 py-3 cursor-pointer hover:text-[#0f172a] select-none transition-colors"
                    >
                      {label}
                      <SortIcon field={field} />
                    </th>
                  ))}
                  <th className="text-left text-[11px] font-semibold text-[#64748b] uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-left text-[11px] font-semibold text-[#64748b] uppercase tracking-wider px-6 py-3">Channels</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlans.map((plan, idx) => (
                  <tr
                    key={plan.id}
                    className={`hover:bg-[#f8fafc] transition-colors ${idx < filteredPlans.length - 1 ? 'border-b border-[#f1f5f9]' : ''}`}
                  >
                    <td className="px-6 py-4 font-medium text-[#0f172a] text-sm">{plan.name}</td>
                    <td className="px-6 py-4 text-sm text-[#64748b]">{plan.client}</td>
                    <td className="px-6 py-4 text-sm text-[#94a3b8]">{plan.startDate} — {plan.endDate}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#0f172a]">{formatCurrency(plan.budget)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${statusColors[plan.status]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDots[plan.status]}`} />
                        {plan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {plan.channels.map((ch) => (
                          <span key={ch} className="text-[11px] bg-[#f3f4f6] text-[#4b5563] px-2 py-0.5 rounded-md font-medium">
                            {ch}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredPlans.length === 0 && (
            <div className="p-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#f1f5f9] flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <p className="font-semibold text-[#0f172a]">No plans found</p>
              <p className="text-sm text-[#94a3b8] mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}

      {/* Card/Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-[#0f172a] text-sm leading-snug pr-2">{plan.name}</h3>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize shrink-0 ${statusColors[plan.status]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDots[plan.status]}`} />
                  {plan.status}
                </span>
              </div>
              <p className="text-sm text-[#64748b] mb-4">{plan.client}</p>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[#94a3b8] text-xs">Budget</span>
                  <span className="font-bold text-[#0f172a]">{formatCurrency(plan.budget)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#94a3b8] text-xs">Duration</span>
                  <span className="text-[#64748b] text-xs">{plan.startDate} — {plan.endDate}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-[#f1f5f9]">
                {plan.channels.map((ch) => (
                  <span key={ch} className="text-[11px] bg-[#eff6ff] text-[#2563eb] px-2 py-0.5 rounded-md font-medium">
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {filteredPlans.length === 0 && (
            <div className="col-span-full p-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#f1f5f9] flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <p className="font-semibold text-[#0f172a]">No plans found</p>
              <p className="text-sm text-[#94a3b8] mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

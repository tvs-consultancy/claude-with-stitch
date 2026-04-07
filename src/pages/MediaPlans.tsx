import { useState, useMemo } from 'react';
import { mockMediaPlans, formatCurrency } from '../data/mock-data';

type ViewMode = 'table' | 'grid';
type StatusFilter = 'all' | 'active' | 'draft' | 'completed' | 'paused';
type SortField = 'name' | 'client' | 'budget' | 'startDate';
type SortDir = 'asc' | 'desc';

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  draft: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-blue-100 text-blue-700',
  paused: 'bg-gray-100 text-gray-600',
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

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="text-xs ml-1">
      {sortField === field ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Plans</h1>
          <p className="text-gray-500 mt-1">Browse and manage all media plans</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'table' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
            }`}
          >
            Cards
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search plans or clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm w-72 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="completed">Completed</option>
          <option value="paused">Paused</option>
        </select>
        <span className="flex items-center text-sm text-gray-400 ml-auto">
          {filteredPlans.length} plan{filteredPlans.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  {[
                    { field: 'name' as SortField, label: 'Plan Name' },
                    { field: 'client' as SortField, label: 'Client' },
                    { field: 'startDate' as SortField, label: 'Date Range' },
                    { field: 'budget' as SortField, label: 'Budget' },
                  ].map(({ field, label }) => (
                    <th
                      key={field}
                      onClick={() => toggleSort(field)}
                      className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3 cursor-pointer hover:text-gray-700 select-none"
                    >
                      {label}
                      <SortIcon field={field} />
                    </th>
                  ))}
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Channels</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlans.map((plan) => (
                  <tr key={plan.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900 text-sm">{plan.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{plan.client}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{plan.startDate} — {plan.endDate}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(plan.budget)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[plan.status]}`}>
                        {plan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {plan.channels.map((ch) => (
                          <span key={ch} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
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
            <div className="p-12 text-center text-gray-400">
              <p className="text-2xl mb-2">🔍</p>
              <p className="font-medium">No plans found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}

      {/* Grid/Card View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-sm leading-snug">{plan.name}</h3>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize shrink-0 ml-2 ${statusColors[plan.status]}`}>
                  {plan.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-3">{plan.client}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Budget</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(plan.budget)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-gray-600">{plan.startDate} — {plan.endDate}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-gray-50">
                {plan.channels.map((ch) => (
                  <span key={ch} className="text-xs bg-primary/5 text-primary px-2 py-0.5 rounded-md">
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {filteredPlans.length === 0 && (
            <div className="col-span-full p-12 text-center text-gray-400">
              <p className="text-2xl mb-2">🔍</p>
              <p className="font-medium">No plans found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

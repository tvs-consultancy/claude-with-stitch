import { useState, useMemo } from 'react';
import { mockMediaPlans, formatCurrency, formatDateRange } from '../data/mock-data';
import type { MediaPlan } from '../data/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Icon from '../components/Icon';

type ViewMode = 'table' | 'cards';
type StatusFilter = 'all' | 'active' | 'draft' | 'completed' | 'paused';

const statusColors: Readonly<Record<MediaPlan['status'], { bg: string; text: string }>> = {
  active: { bg: 'bg-active-surface', text: 'text-active-text' },
  draft: { bg: 'bg-draft-surface', text: 'text-draft-text' },
  completed: { bg: 'bg-completed-surface', text: 'text-completed-text' },
  paused: { bg: 'bg-paused-surface', text: 'text-paused-text' },
};

export default function MediaPlans() {
  const [view, setView] = useState<ViewMode>('table');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return mockMediaPlans.filter((p) => {
      const matchesSearch =
        !q || p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <header className="fixed top-0 right-0 left-[260px] h-16 glass-header bg-canvas-fog/80 flex justify-between items-center px-8 z-40">
        <div className="flex items-center gap-2">
          <span className="text-xs tracking-tight text-mid-zinc">Workspace / </span>
          <span className="text-sm font-semibold tracking-tight text-corsair">Media Plans</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-zinc" size="sm" />
            <Input
              className="h-9 w-64 bg-slate-100 border-none rounded-lg pl-9 pr-4 text-xs focus-visible:ring-2 focus-visible:ring-corsair/20"
              placeholder="Quick search..."
              type="text"
            />
          </div>
          <Button className="corsair-gradient text-white hover:brightness-110">
            Create Plan
          </Button>
        </div>
      </header>

      {/* Page Canvas */}
      <div className="pt-24 pb-12 px-10 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-deep-ink tracking-tight leading-none mb-2">
              Media Plans
            </h2>
            <p className="text-sm text-mid-zinc">
              {filtered.length} Active Plans in Workspace
            </p>
          </div>
          {/* View Toggle */}
          <div className="bg-paused-surface p-1 rounded-xl flex items-center">
            <Button
              variant={view === 'table' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setView('table')}
              className={view === 'table' ? 'bg-white shadow-sm text-deep-ink' : 'text-mid-zinc hover:text-deep-ink'}
            >
              <Icon name="view_list" size="sm" />
              Table
            </Button>
            <Button
              variant={view === 'cards' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setView('cards')}
              className={view === 'cards' ? 'bg-white shadow-sm text-deep-ink' : 'text-mid-zinc hover:text-deep-ink'}
            >
              <Icon name="grid_view" size="sm" />
              Cards
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-zinc" size="sm" />
              <Input
                className="h-10 w-72 bg-paused-surface border-none rounded-lg pl-10 pr-4 text-sm focus-visible:ring-2 focus-visible:ring-corsair/10"
                placeholder="Filter plans by name or client..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="h-10 w-40 bg-paused-surface border-none rounded-lg px-4 text-sm outline-none focus:ring-2 focus:ring-corsair/10 appearance-none text-mid-zinc"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              >
                <option value="all">Status: All</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
              </select>
              <Icon
                name="expand_more"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-zinc pointer-events-none"
                size="sm"
              />
            </div>
          </div>
          <div className="metric-lock text-[13px] text-mid-zinc">
            {filtered.length} plans
          </div>
        </div>

        {/* Table View */}
        {view === 'table' && (
          <Card className="bg-white ring-0 border-0 ambient-shadow rounded-2xl gap-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-paused-surface hover:bg-paused-surface border-b-0">
                  <TableHead className="px-6 py-4">
                    <button className="flex items-center gap-2 text-[13px] font-bold text-mid-zinc uppercase tracking-[0.05em]">
                      PLAN NAME
                      <Icon name="unfold_more" size="sm" />
                    </button>
                  </TableHead>
                  <TableHead className="px-6 py-4">
                    <button className="flex items-center gap-2 text-[13px] font-bold text-mid-zinc uppercase tracking-[0.05em]">
                      CLIENT
                      <Icon name="unfold_more" size="sm" />
                    </button>
                  </TableHead>
                  <TableHead className="px-6 py-4">
                    <span className="text-[13px] font-bold text-mid-zinc uppercase tracking-[0.05em]">
                      DATE RANGE
                    </span>
                  </TableHead>
                  <TableHead className="px-6 py-4">
                    <button className="flex items-center gap-2 text-[13px] font-bold text-mid-zinc uppercase tracking-[0.05em]">
                      BUDGET
                      <Icon name="unfold_more" size="sm" />
                    </button>
                  </TableHead>
                  <TableHead className="px-6 py-4">
                    <span className="text-[13px] font-bold text-mid-zinc uppercase tracking-[0.05em]">
                      STATUS
                    </span>
                  </TableHead>
                  <TableHead className="px-6 py-4">
                    <span className="text-[13px] font-bold text-mid-zinc uppercase tracking-[0.05em]">
                      CHANNELS
                    </span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((plan, i) => {
                  const colors = statusColors[plan.status];
                  return (
                    <TableRow
                      key={plan.id}
                      className={`border-b border-zinc-border/20 hover:bg-corsair-wash/50 ${
                        i % 2 === 1 ? 'bg-canvas-fog' : ''
                      }`}
                    >
                      <TableCell className="px-6 py-4">
                        <span className="text-[15px] font-medium text-deep-ink hover:text-corsair cursor-pointer transition-colors">
                          {plan.name}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-[15px] text-mid-zinc">
                        {plan.client}
                      </TableCell>
                      <TableCell className="px-6 py-4 metric-lock text-[15px] text-muted-zinc">
                        {formatDateRange(plan.startDate, plan.endDate)}
                      </TableCell>
                      <TableCell className="px-6 py-4 metric-lock text-[15px] font-medium text-deep-ink">
                        {formatCurrency(plan.budget)}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge
                          className={`${colors.bg} ${colors.text} border-0 rounded-full text-[13px] font-medium capitalize px-3 py-1 h-auto`}
                        >
                          {plan.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex gap-2">
                          {plan.channels.slice(0, 2).map((ch) => (
                            <Badge
                              key={ch}
                              variant="secondary"
                              className="bg-paused-surface text-mid-zinc border-0 rounded text-[12px] font-medium h-auto"
                            >
                              {ch}
                            </Badge>
                          ))}
                          {plan.channels.length > 2 && (
                            <span className="text-[12px] text-muted-zinc">
                              +{plan.channels.length - 2}
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <Icon name="search_off" className="text-muted-zinc text-[48px] mb-4" size="xl" />
                <p className="text-lg font-medium text-deep-ink">No plans found</p>
                <p className="text-[15px] text-mid-zinc mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </Card>
        )}

        {/* Card View */}
        {view === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((plan) => {
              const colors = statusColors[plan.status];
              return (
                <Card
                  key={plan.id}
                  className="bg-white border-zinc-border/30 ring-0 hover:shadow-lg transition-shadow cursor-pointer rounded-2xl gap-0"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[15px] font-medium text-deep-ink">{plan.name}</span>
                      <Badge
                        className={`${colors?.bg} ${colors?.text} border-0 rounded-full text-[13px] font-medium capitalize px-3 py-1 h-auto`}
                      >
                        {plan.status}
                      </Badge>
                    </div>
                    <p className="text-[15px] text-mid-zinc mb-4">{plan.client}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-mid-zinc">Budget</span>
                        <span className="metric-lock text-sm font-medium text-deep-ink">
                          {formatCurrency(plan.budget)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-mid-zinc">Duration</span>
                        <span className="metric-lock text-sm text-muted-zinc">
                          {formatDateRange(plan.startDate, plan.endDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-6">
                      {plan.channels.map((ch) => (
                        <Badge
                          key={ch}
                          variant="secondary"
                          className="bg-corsair-wash text-corsair border-0 rounded text-[12px] font-medium h-auto"
                        >
                          {ch}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {filtered.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <Icon name="search_off" className="text-muted-zinc text-[48px] mb-4" size="xl" />
                <p className="text-lg font-medium text-deep-ink">No plans found</p>
                <p className="text-[15px] text-mid-zinc mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

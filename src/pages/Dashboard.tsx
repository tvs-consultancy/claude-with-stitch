import { Link } from 'react-router-dom';
import { mockMediaPlans, formatCurrency, formatDateRange } from '../data/mock-data';
import type { MediaPlan } from '../data/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
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
    sub: 'Across all plans',
    subIcon: null,
    subColor: 'text-slate-400',
    dotColor: 'bg-active-text',
  },
  {
    label: 'Active Spend',
    value: formatCurrency(activeBudget),
    sub: 'Total active budget',
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

const statusBadgeVariant: Readonly<Record<MediaPlan['status'], { bg: string; text: string }>> = {
  active: { bg: 'bg-active-surface', text: 'text-active-text' },
  draft: { bg: 'bg-draft-surface', text: 'text-draft-text' },
  completed: { bg: 'bg-completed-surface', text: 'text-completed-text' },
  paused: { bg: 'bg-paused-surface', text: 'text-paused-text' },
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
            <Input
              className="border-none focus-visible:ring-0 focus-visible:border-transparent text-sm p-0 h-auto w-48 bg-transparent placeholder:text-muted-zinc/60"
              placeholder="Search data..."
              type="text"
            />
          </div>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon" className="text-mid-zinc hover:text-corsair" />}
            >
              <Icon name="history" />
            </TooltipTrigger>
            <TooltipContent>History</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon" className="relative text-mid-zinc hover:text-corsair" />}
            >
              <Icon name="notifications" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-text rounded-full border-2 border-canvas-fog" />
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="h-8 mx-2" />
          <Button variant="outline" className="text-mid-zinc">
            Share
          </Button>
          <Button className="corsair-gradient text-white hover:brightness-110 shadow-sm">
            Export Data
          </Button>
        </div>
      </header>

      {/* Dashboard content */}
      <div className="px-8 pb-12 space-y-8">
        {/* Summary Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="bg-white border-zinc-border/50 ring-0 gap-2"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-mid-zinc uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <div className={`h-2 w-2 rounded-full ${stat.dotColor}`} />
                </div>
                <div className="metric-lock text-3xl font-semibold text-deep-ink mt-2">
                  {stat.value}
                </div>
                <div className={`flex items-center text-[11px] ${stat.subColor} metric-lock mt-2`}>
                  {stat.subIcon && (
                    <Icon name={stat.subIcon} size="sm" className="mr-1" />
                  )}
                  {stat.sub}
                </div>
              </CardContent>
            </Card>
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
        <Card className="bg-white border-zinc-border/50 ring-0 shadow-sm gap-0">
          <div className="px-8 py-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-deep-ink">Recent Media Plans</h3>
            <Link to="/plans" className="text-sm font-medium text-corsair hover:underline">
              View all
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                <TableHead className="px-8 py-4 text-[11px] font-semibold text-mid-zinc uppercase tracking-widest">
                  Plan Name
                </TableHead>
                <TableHead className="px-6 py-4 text-[11px] font-semibold text-mid-zinc uppercase tracking-widest">
                  Client
                </TableHead>
                <TableHead className="px-6 py-4 text-[11px] font-semibold text-mid-zinc uppercase tracking-widest">
                  Budget
                </TableHead>
                <TableHead className="px-6 py-4 text-[11px] font-semibold text-mid-zinc uppercase tracking-widest">
                  Status
                </TableHead>
                <TableHead className="px-6 py-4 text-[11px] font-semibold text-mid-zinc uppercase tracking-widest">
                  Channels
                </TableHead>
                <TableHead className="px-8 py-4" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMediaPlans.slice(0, 5).map((plan, i) => {
                const colors = statusBadgeVariant[plan.status];
                return (
                  <TableRow
                    key={plan.id}
                    className={`hover:bg-slate-50/50 ${
                      i % 2 === 1 ? 'bg-slate-50/30' : ''
                    }`}
                  >
                    <TableCell className="px-8 py-5">
                      <div className="font-medium text-deep-ink">{plan.name}</div>
                      <div className="metric-lock text-[10px] text-muted-zinc mt-0.5">
                        {formatDateRange(plan.startDate, plan.endDate)}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-5 text-sm text-mid-zinc">{plan.client}</TableCell>
                    <TableCell className="px-6 py-5 metric-lock text-sm font-medium text-deep-ink">
                      {formatCurrency(plan.budget)}
                    </TableCell>
                    <TableCell className="px-6 py-5">
                      <Badge
                        className={`${colors.bg} ${colors.text} border-0 rounded-full text-[10px] font-bold uppercase tracking-tight px-3 py-1 h-auto`}
                      >
                        {plan.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-5">
                      <div className="flex gap-2">
                        {plan.channels.slice(0, 2).map((ch) => (
                          <Badge
                            key={ch}
                            variant="secondary"
                            className="bg-slate-100 text-mid-zinc border-0 rounded text-[10px] font-medium h-auto"
                          >
                            {ch}
                          </Badge>
                        ))}
                        {plan.channels.length > 2 && (
                          <span className="text-[10px] text-muted-zinc">
                            +{plan.channels.length - 2}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-right">
                      <Button variant="ghost" size="icon-sm" className="text-muted-zinc hover:text-corsair">
                        <Icon name="more_horiz" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

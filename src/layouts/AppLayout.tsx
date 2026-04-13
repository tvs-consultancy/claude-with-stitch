import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import Icon from '../components/Icon';

const navItems = [
  { to: '/', label: 'Dashboard', icon: 'dashboard' },
  { to: '/chat', label: 'Chat', icon: 'chat' },
  { to: '/files', label: 'Files', icon: 'folder' },
  { to: '/plans', label: 'Plans', icon: 'event_note' },
];

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-canvas-fog">
      {/* Sidebar Shell */}
      <aside className="fixed left-0 top-0 h-full w-[260px] bg-shell-black flex flex-col py-6 px-4 z-50">
        <div className="mb-10 px-4">
          <h1 className="text-lg font-medium text-white tracking-tight">MediaPlan Pro</h1>
          <p className="text-xs text-zinc-500 font-normal">AI-Powered Planning</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? 'bg-shell-surface text-white border-l-[3px] border-primary-container font-medium'
                    : 'text-zinc-500 hover:text-white hover:bg-shell-surface group'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    name={item.icon}
                    className={`mr-3 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`}
                  />
                  <span className="text-sm">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-6 space-y-1">
          <Separator className="bg-zinc-800/50 mb-4" />

          <NavLink to="/plans">
            <Button className="w-full bg-primary-container text-white hover:brightness-110 mb-6">
              <Icon name="add" size="sm" />
              New Plan
            </Button>
          </NavLink>

          <Tooltip>
            <TooltipTrigger
              render={<a className="flex items-center px-4 py-2 text-zinc-500 hover:text-white transition-colors" href="#" />}
            >
              <Icon name="settings" size="sm" className="mr-3" />
              <span className="text-sm">Settings</span>
            </TooltipTrigger>
            <TooltipContent side="right">Application settings</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={<a className="flex items-center px-4 py-2 text-zinc-500 hover:text-white transition-colors" href="#" />}
            >
              <Icon name="help" size="sm" className="mr-3" />
              <span className="text-sm">Support</span>
            </TooltipTrigger>
            <TooltipContent side="right">Help & support</TooltipContent>
          </Tooltip>

          {/* Profile Footer */}
          <div className="mt-6 flex items-center px-4 gap-3">
            <Avatar size="lg" className="bg-primary-container">
              <AvatarFallback className="bg-primary-container text-xs font-bold text-white">
                SC
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Sarah Chen</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Lead Planner</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-[260px] flex-1 min-h-screen flex flex-col">
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

import { NavLink, Outlet } from 'react-router-dom';
import Icon from '../components/Icon';

const navItems = [
  { to: '/', label: 'Dashboard', icon: 'dashboard' },
  { to: '/chat', label: 'Chat', icon: 'chat' },
  { to: '/files', label: 'Files', icon: 'folder' },
  { to: '/plans', label: 'Media Plans', icon: 'event_note' },
];

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-surface">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 fixed left-0 top-0 h-screen z-50">
        <div className="px-6 py-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
              <Icon name="analytics" filled className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">MediaPlan Pro</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                AI-Powered Planning
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 mx-2 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <Icon name={item.icon} />
              <span className="tracking-tight">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800 px-2 space-y-1 pb-6">
          <NavLink
            to="/profile"
            className="flex items-center gap-3 mx-2 px-4 py-2 rounded-md text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <Icon name="account_circle" />
            <span className="tracking-tight">Profile</span>
          </NavLink>
          <NavLink
            to="/settings"
            className="flex items-center gap-3 mx-2 px-4 py-2 rounded-md text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <Icon name="settings" />
            <span className="tracking-tight">Settings</span>
          </NavLink>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Glassmorphism header */}
        <header className="sticky top-0 z-40 glass-header bg-slate-50/80 flex items-center justify-between px-8 py-3 shadow-sm">
          <div className="relative w-full max-w-md">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" />
            <input
              className="w-full bg-surface-container-high border-none rounded-full py-1.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/60"
              placeholder="Search plans, assets, or budgets..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-600 hover:text-primary-container transition-colors">
              <Icon name="notifications" />
            </button>
            <button className="p-2 text-slate-600 hover:text-primary-container transition-colors">
              <Icon name="help_outline" />
            </button>
            <div className="h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center border border-outline-variant/10">
              <span className="text-xs font-bold text-on-surface">JD</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

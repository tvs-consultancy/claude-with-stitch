import { NavLink, Outlet } from 'react-router-dom';
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

        <div className="mt-auto pt-6 space-y-1 border-t border-zinc-800/50">
          <NavLink
            to="/plans"
            className="w-full flex items-center justify-center gap-2 bg-primary-container text-white py-2.5 rounded-lg text-sm font-medium mb-6 hover:brightness-110 transition-all"
          >
            <Icon name="add" size="sm" />
            New Plan
          </NavLink>

          <a className="flex items-center px-4 py-2 text-zinc-500 hover:text-white transition-colors" href="#">
            <Icon name="settings" size="sm" className="mr-3" />
            <span className="text-sm">Settings</span>
          </a>
          <a className="flex items-center px-4 py-2 text-zinc-500 hover:text-white transition-colors" href="#">
            <Icon name="help" size="sm" className="mr-3" />
            <span className="text-sm">Support</span>
          </a>

          {/* Profile Footer */}
          <div className="mt-6 flex items-center px-4 gap-3">
            <div className="h-9 w-9 rounded-full bg-primary-container flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-white">SC</span>
            </div>
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

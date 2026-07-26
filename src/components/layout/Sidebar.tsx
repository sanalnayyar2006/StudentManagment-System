import { Link } from 'react-router-dom'
import {
  LayoutGrid,
  Users,
  CreditCard,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { label: 'Students', href: '/students', icon: Users },
  { label: 'Fees', href: '/fees', icon: CreditCard },
  { label: 'Reports', href: '/reports', icon: FileText },
  { label: 'Settings', href: '/settings', icon: Settings },
]

interface SidebarProps {
  activeHref: string
}

export function Sidebar({ activeHref }: SidebarProps) {
  return (
    <aside className="flex w-64 flex-col border-r border-slate-200/60 bg-white min-h-screen">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4F46E5] text-white text-lg font-bold shadow-md shadow-indigo-100">
          M
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-900 leading-tight">MMPS ERP</h1>
          <p className="text-xs font-medium text-slate-400">Admin Portal</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                activeHref === item.href
                  ? 'bg-[#4F46E5] text-white shadow-md shadow-indigo-200'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-slate-100 p-4 space-y-3">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
            alt="Rajesh Kumar"
            className="h-10 w-10 rounded-full object-cover border border-slate-200"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate leading-snug">Rajesh Kumar</p>
            <p className="text-xs text-slate-400 truncate leading-tight">Super Administrator</p>
          </div>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors">
          <LogOut className="h-3.5 w-3.5" />
          Logout Session
        </button>
      </div>
    </aside>
  )
}

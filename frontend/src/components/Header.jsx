import { Bell, User, Menu } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Header({ title, onMenuClick }) {
  const { user } = useAuth()

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-500 hover:text-slate-700"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-slate-600">
          <Bell className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
            <User className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="hidden sm:inline text-sm font-medium text-slate-700">
            {user?.name}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
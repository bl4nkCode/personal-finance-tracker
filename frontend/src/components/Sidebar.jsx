import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Tags, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Sidebar() {
  const { logout } = useAuth()

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
    }`

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col min-h-screen">
      <div className="px-4 py-6">
        <h1 className="text-lg font-semibold">Finance Manager</h1>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        <p className="px-3 text-xs uppercase text-slate-500 mb-1">Main</p>
        <NavLink to="/dashboard" className={linkClasses}>
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>
        <NavLink to="/transactions" className={linkClasses}>
          <ArrowLeftRight className="w-5 h-5" />
          Transactions
        </NavLink>
        <NavLink to="/categories" className={linkClasses}>
          <Tags className="w-5 h-5" />
          Categories
        </NavLink>
      </nav>

      <div className="px-2 py-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
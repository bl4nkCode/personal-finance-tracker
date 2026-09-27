import { Bell, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Header({ title }) {
  const { user } = useAuth()

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-slate-600">
          <Bell className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-slate-700">{user?.name}</span>
        </div>
      </div>
    </header>
  )
}

export default Header
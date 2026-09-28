import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  LogOut,
  Wallet,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();

  const linkClasses = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-emerald-600 text-white shadow-sm shadow-emerald-900/20"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-950 text-white">

      {/* Brand */}
      <div className="border-b border-slate-800/80 px-5 py-6">
        <div className="flex items-center gap-3">

          {/* Logo */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 shadow-lg shadow-emerald-900/20">
            <Wallet className="h-5 w-5 text-white" />
          </div>

          {/* Brand Name */}
          <div>
            <h1 className="text-base font-bold tracking-tight text-white">
              Finance{" "}
              <span className="text-emerald-400">Manager</span>
            </h1>

            <p className="mt-0.5 text-[11px] text-slate-500">
              Personal Finance
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">

        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Main
        </p>

        <div className="space-y-1">

          <NavLink to="/dashboard" className={linkClasses}>
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/transactions" className={linkClasses}>
            <ArrowLeftRight className="h-5 w-5" />
            <span>Transactions</span>
          </NavLink>

          <NavLink to="/categories" className={linkClasses}>
            <Tags className="h-5 w-5" />
            <span>Categories</span>
          </NavLink>

        </div>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-800/80 px-3 py-4">

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>

      </div>
    </aside>
  );
}

export default Sidebar;

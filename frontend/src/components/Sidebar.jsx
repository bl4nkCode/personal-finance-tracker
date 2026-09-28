import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  LogOut,
  Wallet,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();

  const linkClasses = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-emerald-600 text-white shadow-sm shadow-emerald-900/20"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          flex w-64 shrink-0 flex-col
          bg-slate-950 text-white
          shadow-2xl
          transition-transform duration-300 ease-in-out

          lg:sticky
          lg:top-0
          lg:h-screen
          lg:translate-x-0
          lg:shadow-none

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="border-b border-slate-800/80 px-5 py-6">
          <div className="flex items-center justify-between">
            {/* Logo + Brand */}
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 shadow-lg shadow-emerald-900/20">
                <Wallet className="h-5 w-5 text-white" />
              </div>

              {/* Brand Name */}
              <div>
                <h1 className="text-base font-bold tracking-tight text-white">
                  Finance <span className="text-emerald-400">Manager</span>
                </h1>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  Personal Finance
                </p>
              </div>
            </div>

            {/* Close Button - Mobile Only */}
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6">
          {/* Section Title */}
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Main
          </p>

          <div className="space-y-1">
            {/* Dashboard */}
            <NavLink to="/dashboard" className={linkClasses} onClick={onClose}>
              <LayoutDashboard className="h-5 w-5 shrink-0" />
              <span>Dashboard</span>
            </NavLink>

            {/* Transactions */}
            <NavLink
              to="/transactions"
              className={linkClasses}
              onClick={onClose}
            >
              <ArrowLeftRight className="h-5 w-5 shrink-0" />
              <span>Transactions</span>
            </NavLink>

            {/* Categories */}
            <NavLink to="/categories" className={linkClasses} onClick={onClose}>
              <Tags className="h-5 w-5 shrink-0" />
              <span>Categories</span>
            </NavLink>
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-800/80 px-3 py-4">
          <button
            onClick={logout}
            className="
                flex w-full items-center gap-3
                rounded-xl px-3 py-2.5
                text-sm font-medium text-slate-400
                transition-all duration-200
                hover:bg-red-500/10
                hover:text-red-400
              "
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

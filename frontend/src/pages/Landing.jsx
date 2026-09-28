import { Link, Navigate } from 'react-router-dom'
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Tags,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Landing() {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* =========================
          NAVBAR
      ========================= */}
      <nav className="border-b border-slate-100">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600">
              <Wallet className="h-5 w-5 text-white" />
            </div>

            <span className="text-base font-bold tracking-tight">
              Finance{' '}
              <span className="text-emerald-600">
                Manager
              </span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2">

            <Link
              to="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Get Started
            </Link>

          </div>
        </div>
      </nav>


      {/* =========================
          HERO
      ========================= */}
      <main>

        <section className="relative overflow-hidden">

          {/* Background decoration */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-50/70 blur-3xl" />

          <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">

            {/* Small heading */}
            <p className="mb-4 text-sm font-semibold text-emerald-600">
              SIMPLE PERSONAL FINANCE
            </p>

            {/* Main heading */}
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Know where your{' '}
              <span className="text-emerald-600">
                money goes.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Finance Manager helps you track income, manage expenses,
              organize categories, and understand your monthly finances
              without the complexity.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

              <Link
                to="/register"
                className="w-full rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-xl sm:w-auto"
              >
                Start managing your money
              </Link>

              <Link
                to="/login"
                className="w-full rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto"
              >
                Sign In
              </Link>

            </div>

          </div>
        </section>


        {/* =========================
            DASHBOARD PREVIEW
        ========================= */}
        <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-2xl shadow-slate-200/60">

            {/* Fake browser header */}
            <div className="flex h-10 items-center gap-2 border-b border-slate-200 bg-white px-4">

              <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />

              <div className="ml-3 h-5 w-40 rounded-md bg-slate-100" />

            </div>

            {/* Dashboard */}
            <div className="flex min-h-[360px]">

              {/* Mini Sidebar */}
              <div className="hidden w-48 bg-slate-950 p-4 sm:block">

                <div className="mb-8 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600">
                    <Wallet className="h-4 w-4 text-white" />
                  </div>

                  <span className="text-xs font-semibold text-white">
                    Finance Manager
                  </span>
                </div>

                <div className="space-y-2">

                  <div className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white">
                    Dashboard
                  </div>

                  <div className="px-3 py-2 text-xs text-slate-500">
                    Transactions
                  </div>

                  <div className="px-3 py-2 text-xs text-slate-500">
                    Categories
                  </div>

                </div>

              </div>

              {/* Preview Content */}
              <div className="flex-1 p-4 sm:p-6">

                <div className="mb-5">
                  <p className="text-xs text-slate-400">
                    September 2026
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-slate-900">
                    Dashboard
                  </h2>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-3 gap-3">

                  {/* Balance */}
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-[10px] text-slate-400">
                          Monthly Balance
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900">
                          ₱46,000
                        </p>
                      </div>

                      <div className="hidden h-8 w-8 items-center justify-center rounded-lg bg-blue-100 sm:flex">
                        <Wallet className="h-4 w-4 text-blue-600" />
                      </div>

                    </div>
                  </div>

                  {/* Income */}
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-[10px] text-slate-400">
                          Income
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900">
                          ₱86,000
                        </p>
                      </div>

                      <div className="hidden h-8 w-8 items-center justify-center rounded-lg bg-green-100 sm:flex">
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      </div>

                    </div>
                  </div>

                  {/* Expenses */}
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-[10px] text-slate-400">
                          Expenses
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900">
                          ₱40,000
                        </p>
                      </div>

                      <div className="hidden h-8 w-8 items-center justify-center rounded-lg bg-red-100 sm:flex">
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      </div>

                    </div>
                  </div>

                </div>

                {/* Charts Preview */}
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                  {/* Bar Chart */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4">

                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-emerald-600" />

                      <p className="text-xs font-semibold text-slate-700">
                        Income vs Expenses
                      </p>
                    </div>

                    <div className="mt-6 flex h-32 items-end justify-center gap-8">

                      <div className="flex h-full flex-col justify-end">
                        <div className="w-8 rounded-t-md bg-green-500" style={{ height: '85%' }} />
                        <p className="mt-2 text-[9px] text-slate-400">
                          Income
                        </p>
                      </div>

                      <div className="flex h-full flex-col justify-end">
                        <div className="w-8 rounded-t-md bg-red-500" style={{ height: '45%' }} />
                        <p className="mt-2 text-[9px] text-slate-400">
                          Expense
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Category Preview */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4">

                    <div className="flex items-center gap-2">
                      <Tags className="h-4 w-4 text-emerald-600" />

                      <p className="text-xs font-semibold text-slate-700">
                        Expenses by Category
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-center">

                      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-[18px] border-emerald-500">
                        <div className="absolute inset-[-18px] rounded-full border-[18px] border-transparent border-r-amber-400 border-t-red-400" />

                        <span className="text-xs font-bold text-slate-700">
                          ₱40K
                        </span>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </section>


        {/* =========================
            FEATURES
        ========================= */}
        <section className="border-t border-slate-100 bg-slate-50">

          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">

              {/* Feature 1 */}
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                  <Wallet className="h-5 w-5 text-emerald-600" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Know your balance
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  See your monthly income, expenses, and balance in one place.
                </p>
              </div>

              {/* Feature 2 */}
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                  <Tags className="h-5 w-5 text-blue-600" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Stay organized
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Organize transactions using categories that make sense for you.
                </p>
              </div>

              {/* Feature 3 */}
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Understand your spending
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Use simple charts to understand your monthly financial activity.
                </p>
              </div>

            </div>

          </div>
        </section>

      </main>


      {/* =========================
          FOOTER
      ========================= */}
      <footer className="border-t border-slate-100 bg-white">

        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600">
              <Wallet className="h-4 w-4 text-white" />
            </div>

            <span className="text-sm font-semibold text-slate-700">
              Finance Manager
            </span>
          </div>

          <p className="text-xs text-slate-400">
            © 2026 Finance Manager. Track smarter. Spend better.
          </p>

        </div>

      </footer>

    </div>
  )
}

export default Landing
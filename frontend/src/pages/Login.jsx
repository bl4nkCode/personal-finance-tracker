import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Wallet } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 px-4">

      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-50/70 blur-3xl" />

      <div className="relative flex min-h-screen items-center justify-center py-10">

        <div className="w-full max-w-md">

          {/* Brand */}
          <div className="mb-8 flex flex-col items-center">

            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 shadow-lg shadow-emerald-600/20">
                <Wallet className="h-5 w-5 text-white" />
              </div>

              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Finance{' '}
                <span className="text-emerald-600">
                  Manager
                </span>
              </h1>
            </Link>

            <p className="mt-3 text-sm text-slate-500">
              Manage your money with confidence
            </p>

          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-8">

            {/* Header */}
            <div className="mb-7">

              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to continue to your financial dashboard.
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Logging in...' : 'Sign In'}
              </Button>

            </form>

            {/* Register */}
            <div className="mt-7 border-t border-slate-100 pt-6 text-center">

              <p className="text-sm text-slate-500">
                Don't have an account?{' '}

                <Link
                  to="/register"
                  className="font-semibold text-emerald-600 transition-colors hover:text-emerald-700 hover:underline"
                >
                  Create an account
                </Link>
              </p>

            </div>

          </div>

          {/* Back to Home */}
          <div className="mt-5 text-center">

            <Link
              to="/"
              className="text-sm font-medium text-slate-500 transition-colors hover:text-emerald-600"
            >
              ← Back to home
            </Link>

          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-slate-400">
            © 2026 Finance Manager. Track smarter. Spend better.
          </p>

        </div>

      </div>
    </div>
  )
}

export default Login
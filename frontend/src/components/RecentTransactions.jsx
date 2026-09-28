import { Link } from 'react-router-dom'
import Card from './ui/Card'

function RecentTransactions({ transactions }) {
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
        <Link
          to="/transactions"
          className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          View All →
        </Link>
      </div>

      {recent.length === 0 ? (
        <p className="text-sm text-slate-500">No transactions yet.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {recent.map((t) => (
            <li key={t.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {t.description || t.category?.name}
                </p>
                <p className="text-xs text-slate-500">
                  {t.category?.name} • {t.date}
                </p>
              </div>
              <span
                className={`text-sm font-semibold ${
                  t.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {t.type === 'income' ? '+' : '-'}₱{parseFloat(t.amount).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export default RecentTransactions
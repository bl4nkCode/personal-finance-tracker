import { useState, useEffect } from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import api from '../api/axios'
import TransactionForm from '../components/TransactionForm'
import Layout from '../components/Layout'

function Dashboard() {
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [categoryId, setCategoryId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  const [summary, setSummary] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get('/categories')
      setCategories(response.data)
    }

    fetchCategories()
  }, [])

  const fetchTransactions = async () => {
    setLoading(true)
    setError('')

    const params = {}
    if (categoryId) params.category_id = categoryId
    if (startDate) params.start_date = startDate
    if (endDate) params.end_date = endDate

    try {
      const response = await api.get('/transactions', { params })
      setTransactions(response.data)
    } catch (err) {
      setError('Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }

  const fetchSummary = async () => {
    const response = await api.get('/transactions/summary')
    setSummary(response.data)
  }

  useEffect(() => {
    fetchTransactions()
    fetchSummary()
  }, [])

  const handleFilter = (e) => {
    e.preventDefault()
    fetchTransactions()
  }

  const handleAdd = async (data) => {
    await api.post('/transactions', data)
    setShowAddForm(false)
    fetchTransactions()
  }

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setShowAddForm(false)
  }

  const handleUpdate = async (data) => {
    await api.put(`/transactions/${editingTransaction.id}`, data)
    setEditingTransaction(null)
    fetchTransactions()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction?')) return
    await api.delete(`/transactions/${id}`)
    fetchTransactions()
  }

  const getCategoryBreakdown = () => {
    const expenseTotals = {}

    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const name = t.category?.name || 'Uncategorized'
        expenseTotals[name] = (expenseTotals[name] || 0) + parseFloat(t.amount)
      })

    return Object.entries(expenseTotals).map(([name, value]) => ({ name, value }))
  }

  return (
    <Layout title="Dashboard">
      {summary && (
        <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
          <div style={{ border: '1px solid #ccc', padding: '10px 20px' }}>
            <p>Income</p>
            <h2>{summary.income}</h2>
          </div>
          <div style={{ border: '1px solid #ccc', padding: '10px 20px' }}>
            <p>Expense</p>
            <h2>{summary.expense}</h2>
          </div>
          <div style={{ border: '1px solid #ccc', padding: '10px 20px' }}>
            <p>Net</p>
            <h2>{summary.net}</h2>
          </div>
        </div>
      )}

      {summary && (
        <div style={{ width: '100%', maxWidth: '400px', height: '250px', margin: '20px 0' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: 'Income', amount: summary.income },
                { name: 'Expense', amount: summary.expense },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div style={{ width: '100%', maxWidth: '400px', height: '300px', margin: '20px 0' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={getCategoryBreakdown()} dataKey="value" nameKey="name" outerRadius={100} label>
              {getCategoryBreakdown().map((entry, index) => (
                <Cell key={entry.name} fill={['#4f46e5', '#f97316', '#10b981', '#e11d48', '#eab308'][index % 5]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <form onSubmit={handleFilter}>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        <button type="submit">Filter</button>
      </form>

      {!showAddForm && !editingTransaction && (
        <button onClick={() => setShowAddForm(true)}>Add Transaction</button>
      )}

      {showAddForm && (
        <TransactionForm categories={categories} onSubmit={handleAdd} onCancel={() => setShowAddForm(false)} />
      )}

      {editingTransaction && (
        <TransactionForm
          categories={categories}
          initialData={editingTransaction}
          onSubmit={handleUpdate}
          onCancel={() => setEditingTransaction(null)}
        />
      )}

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.category?.name}</td>
              <td>{t.type}</td>
              <td>{t.amount}</td>
              <td>{t.description}</td>
              <td>
                <button onClick={() => handleEdit(t)}>Edit</button>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Dashboard
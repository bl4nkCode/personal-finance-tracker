import { useState, useEffect } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'

const fieldClasses =
  'w-full rounded-lg border border-slate-300 bg-white text-slate-900 px-3 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none'

function TransactionForm({ categories, initialData, onSubmit, onCancel }) {
  const [categoryId, setCategoryId] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (initialData) {
      setCategoryId(initialData.category_id)
      setAmount(initialData.amount)
      setType(initialData.type)
      setDescription(initialData.description || '')
      setDate(initialData.date)
    }
  }, [initialData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      await onSubmit({
        category_id: categoryId,
        amount,
        type,
        description,
        date,
      })
    } catch (err) {
      const message =
        Object.values(err.response?.data?.errors || {})[0]?.[0] ||
        'Something went wrong'
      setError(message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              type === 'expense'
                ? 'border-red-600 bg-red-50 text-red-700'
                : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              type === 'income'
                ? 'border-green-600 bg-green-50 text-green-700'
                : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Income
          </button>
        </div>
      </div>

      <Input
        label="Amount (₱)"
        type="number"
        step="0.01"
        min="0.01"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className={fieldClasses}
          required
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Description"
        type="text"
        placeholder="e.g. Grocery shopping"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Input
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving...' : initialData ? 'Save Changes' : 'Add Transaction'}
        </Button>
      </div>
    </form>
  )
}

export default TransactionForm
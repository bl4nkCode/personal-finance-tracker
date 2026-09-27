import { useState, useEffect } from 'react'

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
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Save'}
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}

export default TransactionForm
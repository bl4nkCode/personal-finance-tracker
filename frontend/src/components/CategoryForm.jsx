import { useState, useEffect } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'

function CategoryForm({ initialData, onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [type, setType] = useState('expense')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setType(initialData.type)
    }
  }, [initialData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      await onSubmit({ name, type })
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

      <Input
        label="Name"
        type="text"
        placeholder="e.g. Groceries"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

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

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving...' : initialData ? 'Save Changes' : 'Add Category'}
        </Button>
      </div>
    </form>
  )
}

export default CategoryForm
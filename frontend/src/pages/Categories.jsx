import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Tag } from 'lucide-react'
import api from '../api/axios'
import Layout from '../components/Layout'
import CategoryForm from '../components/CategoryForm'
import EmptyState from '../components/EmptyState'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'

function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [deletingCategory, setDeletingCategory] = useState(null)
  const [deleteError, setDeleteError] = useState('')
  const [deleting, setDeleting] = useState(false)

  const fetchCategories = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await api.get('/categories')
      setCategories(response.data)
    } catch (err) {
      setError('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleAdd = async (data) => {
    await api.post('/categories', data)
    setShowAddModal(false)
    fetchCategories()
  }

  const handleUpdate = async (data) => {
    await api.put(`/categories/${editingCategory.id}`, data)
    setEditingCategory(null)
    fetchCategories()
  }

  const openDelete = (category) => {
    setDeleteError('')
    setDeletingCategory(category)
  }

  const handleDelete = async () => {
    setDeleting(true)
    setDeleteError('')

    try {
      await api.delete(`/categories/${deletingCategory.id}`)
      setDeletingCategory(null)
      fetchCategories()
    } catch (err) {
      setDeleteError(err.response?.data?.message || 'Failed to delete category')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Layout title="Categories">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Categories</h2>
          <p className="text-sm text-slate-500">
            Manage your income and expense categories.
          </p>
        </div>

        <Button className="flex items-center gap-2" onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </div>
      )}

      {!loading && categories.length === 0 ? (
        <EmptyState
          icon={Tag}
          title="No categories yet"
          description="Create your first category to start organizing your transactions."
          action={
            <Button className="flex items-center gap-2" onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          }
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <ul className="divide-y divide-slate-100">
            {loading &&
              [...Array(4)].map((_, i) => (
                <li key={i} className="flex items-center justify-between px-6 py-4 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200" />
                    <div className="h-4 w-32 rounded bg-slate-200" />
                  </div>
                  <div className="h-5 w-16 rounded-full bg-slate-200" />
                </li>
              ))}

            {!loading &&
              categories.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        c.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    >
                      <Tag
                        className={`w-4 h-4 ${
                          c.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}
                      />
                    </div>
                    <span className="font-medium text-slate-900">{c.name}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge variant={c.type}>{c.type}</Badge>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setEditingCategory(c)}
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                        aria-label="Edit category"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDelete(c)}
                        className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        aria-label="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Category"
      >
        <CategoryForm onSubmit={handleAdd} onCancel={() => setShowAddModal(false)} />
      </Modal>

      <Modal
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        title="Edit Category"
      >
        <CategoryForm
          initialData={editingCategory}
          onSubmit={handleUpdate}
          onCancel={() => setEditingCategory(null)}
        />
      </Modal>

      <Modal
        isOpen={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
        title="Delete category?"
      >
        {deleteError ? (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-600">{deleteError}</p>
          </div>
        ) : (
          <p className="text-sm text-slate-500 mb-6">
            This will permanently delete the category "{deletingCategory?.name}". This
            can't be undone.
          </p>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeletingCategory(null)}>
            {deleteError ? 'Close' : 'Cancel'}
          </Button>
          {!deleteError && (
            <Button variant="danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          )}
        </div>
      </Modal>
    </Layout>
  )
}

export default Categories
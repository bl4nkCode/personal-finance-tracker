import { useState, useEffect } from "react";
import { Plus, Search, Pencil, Trash2, Wallet } from "lucide-react";
import api from "../api/axios";
import Layout from "../components/Layout";
import TransactionForm from "../components/TransactionForm";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import EmptyState from "../components/EmptyState";
import { useToast } from "../context/ToastContext";

const fieldClasses =
  "w-full rounded-lg border border-slate-300 bg-white text-slate-900 px-3 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deletingTransaction, setDeletingTransaction] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get("/categories");
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    setError("");

    const params = {};
    if (categoryId) params.category_id = categoryId;
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    try {
      const response = await api.get("/transactions", { params });
      setTransactions(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [categoryId, startDate, endDate]);

  const visibleTransactions = transactions.filter((t) => {
    const text =
      `${t.description || ""} ${t.category?.name || ""}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const clearFilters = () => {
    setSearch("");
    setCategoryId("");
    setStartDate("");
    setEndDate("");
  };

  const hasFilters = search || categoryId || startDate || endDate;

  const handleAdd = async (data) => {
    await api.post("/transactions", data);
    setShowAddModal(false);
    fetchTransactions();
    showToast("Transaction added successfully.");
  };

  const handleUpdate = async (data) => {
    await api.put(`/transactions/${editingTransaction.id}`, data);
    setEditingTransaction(null);
    fetchTransactions();
    showToast("Transaction updated successfully.");
  };

  const handleDelete = async () => {
    setDeleting(true);

    try {
      await api.delete(`/transactions/${deletingTransaction.id}`);
      fetchTransactions();
      showToast("Transaction deleted.");
    } catch (err) {
      showToast("Unable to delete transaction.", "error");
    } finally {
      setDeleting(false);
      setDeletingTransaction(null);
    }
  };

  return (
    <Layout title="Transactions">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Transactions</h2>
          <p className="text-sm text-slate-500">
            Track and manage your income and expenses.
          </p>
        </div>

        <Button
          className="flex items-center gap-2"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-4 h-4" />
          Add Transaction
        </Button>
      </div>

      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`${fieldClasses} pl-9 placeholder-slate-400`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className={fieldClasses}
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="From"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <Input
            label="To"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <Button variant="secondary" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </Card>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </div>
      )}

      {!loading && visibleTransactions.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title={
            hasFilters ? "No matching transactions" : "No transactions yet"
          }
          description={
            hasFilters
              ? "Try changing or clearing your filters."
              : "Start tracking your finances by adding your first transaction."
          }
          action={
            hasFilters ? (
              <Button variant="secondary" onClick={clearFilters}>
                Clear filters
              </Button>
            ) : (
              <Button
                className="flex items-center gap-2"
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="w-4 h-4" />
                Add Transaction
              </Button>
            )
          }
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Description</th>
                  <th className="px-6 py-3 font-medium">Category</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium text-right">Amount</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading &&
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {[...Array(6)].map((_, j) => (
                        <td key={j} className="px-6 py-4">
                          <div className="h-4 rounded bg-slate-200" />
                        </td>
                      ))}
                    </tr>
                  ))}

                {!loading &&
                  visibleTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-slate-600">{t.date}</td>
                      <td className="px-6 py-4 text-slate-900">
                        {t.description}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {t.category?.name}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={t.type}>{t.type}</Badge>
                      </td>
                      <td
                        className={`px-6 py-4 text-right font-semibold ${
                          t.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {t.type === "income" ? "+" : "-"}₱
                        {parseFloat(t.amount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => setEditingTransaction(t)}
                            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                            aria-label="Edit transaction"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingTransaction(t)}
                            className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                            aria-label="Delete transaction"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Transaction"
      >
        <TransactionForm
          categories={categories}
          onSubmit={handleAdd}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
        title="Edit Transaction"
      >
        <TransactionForm
          categories={categories}
          initialData={editingTransaction}
          onSubmit={handleUpdate}
          onCancel={() => setEditingTransaction(null)}
        />
      </Modal>

      <Modal
        isOpen={!!deletingTransaction}
        onClose={() => setDeletingTransaction(null)}
        title="Delete transaction?"
      >
        <p className="text-sm text-slate-500 mb-6">
          This will permanently delete "
          {deletingTransaction?.description || "this transaction"}". This can't
          be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => setDeletingTransaction(null)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </Layout>
  );
}

export default Transactions;

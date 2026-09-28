import { useState, useEffect } from "react";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "../api/axios";
import Layout from "../components/Layout";
import Card from "../components/ui/Card";
import StatCard from "../components/StatCard";
import RecentTransactions from "../components/RecentTransactions";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  // Load transactions and monthly summary
  useEffect(() => {
    const loadData = async () => {
      try {
        const [transactionsRes, summaryRes] = await Promise.all([
          api.get("/transactions"),
          api.get("/transactions/summary"),
        ]);

        setTransactions(transactionsRes.data);
        setSummary(summaryRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      }
    };

    loadData();
  }, []);

  // Get the expenses for the month returned by the summary API
  const getCategoryBreakdown = () => {
    if (!summary) return [];

    const prefix = `${summary.year}-${String(summary.month).padStart(2, "0")}`;

    const expenseTotals = {};

    transactions
      .filter(
        (transaction) =>
          transaction.type === "expense" && transaction.date.startsWith(prefix),
      )
      .forEach((transaction) => {
        const name = transaction.category?.name || "Uncategorized";

        expenseTotals[name] =
          (expenseTotals[name] || 0) + parseFloat(transaction.amount);
      });

    return Object.entries(expenseTotals).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const breakdown = getCategoryBreakdown();

  // Format month/year
  const getSummaryMonth = () => {
    if (!summary) return "";

    return new Date(summary.year, summary.month - 1).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const summaryMonth = getSummaryMonth();

  return (
    <Layout title="Dashboard">
      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </div>
      )}

      {/* Monthly Summary */}
      {summary && (
        <>
          {/* Month Indicator */}
          <div className="mb-4">
            <p className="text-sm text-slate-500">
              Showing financial summary for{" "}
              <span className="font-semibold text-emerald-600">
                {summaryMonth}
              </span>
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
            {/* Monthly Balance */}
            <StatCard
              title="Monthly Balance"
              value={`₱${summary.net.toLocaleString()}`}
              icon={Wallet}
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
            />

            {/* Monthly Income */}
            <StatCard
              title="Total Income"
              value={`₱${summary.income.toLocaleString()}`}
              icon={TrendingUp}
              iconBg="bg-green-100"
              iconColor="text-green-600"
            />

            {/* Monthly Expenses */}
            <StatCard
              title="Total Expenses"
              value={`₱${summary.expense.toLocaleString()}`}
              icon={TrendingDown}
              iconBg="bg-red-100"
              iconColor="text-red-600"
            />
          </div>
        </>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        {/* Income vs Expenses */}
        <Card>
          <h3 className="text-lg font-semibold text-slate-900">
            Income vs Expenses
          </h3>

          {summary && (
            <p className="mt-1 mb-4 text-sm text-slate-500">{summaryMonth}</p>
          )}

          {summary && (
            <div style={{ width: "100%", height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: "Income",
                      amount: summary.income,
                    },
                    {
                      name: "Expense",
                      amount: summary.expense,
                    },
                  ]}
                >
                  <XAxis dataKey="name" stroke="#94A3B8" />

                  <YAxis stroke="#94A3B8" />

                  <Tooltip
                    formatter={(value) => `₱${Number(value).toLocaleString()}`}
                  />

                  <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                    {/* Income */}
                    <Cell fill="#16A34A" />

                    {/* Expense */}
                    <Cell fill="#DC2626" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        {/* Expenses by Category */}
        <Card>
          <h3 className="text-lg font-semibold text-slate-900">
            Expenses by Category
          </h3>

          {summary && (
            <p className="mt-1 mb-4 text-sm text-slate-500">{summaryMonth}</p>
          )}

          {breakdown.length === 0 ? (
            <p className="text-sm text-slate-500">
              No expenses recorded this month.
            </p>
          ) : (
            <div style={{ width: "100%", height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={breakdown}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                  >
                    {breakdown.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={
                          [
                            "#059669", // Emerald
                            "#10B981", // Green
                            "#34D399", // Light green
                            "#F59E0B", // Amber
                            "#DC2626", // Red
                            "#047857", // Dark emerald
                          ][index % 6]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) => `₱${Number(value).toLocaleString()}`}
                  />

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactions} />
    </Layout>
  );
}

export default Dashboard;

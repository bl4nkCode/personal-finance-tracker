<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TransactionController extends Controller
{
    // GET /api/transactions
    public function index(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'sometimes|integer|exists:categories,id',
            'start_date'  => 'sometimes|date',
            'end_date'    => 'sometimes|date|after_or_equal:start_date',
        ]);

        $query = $request->user()->transactions();

        if ($request->filled('category_id')) {
            $query->where('category_id', $validated['category_id']);
        }

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('date', [$validated['start_date'], $validated['end_date']]);
        } elseif ($request->filled('start_date')) {
            $query->where('date', '>=', $validated['start_date']);
        } elseif ($request->filled('end_date')) {
            $query->where('date', '<=', $validated['end_date']);
        }

        $transactions = $query->with('category')->get();

        return response()->json($transactions);
    }

    // POST /api/transactions
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => [
                'required',
                Rule::exists('categories', 'id')->where('user_id', $request->user()->id),
            ],
            'amount' => 'required|numeric|min:0.01',
            'type' => 'required|in:income,expense',
            'description' => 'nullable|string|max:255',
            'date' => 'required|date',
        ]);

        $transaction = $request->user()->transactions()->create($validated);

        return response()->json($transaction->load('category'), 201);
    }

    // GET /api/transactions/{transaction}
    public function show(Request $request, Transaction $transaction)
    {
        if ($transaction->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($transaction->load('category'));
    }

    // PUT/PATCH /api/transactions/{transaction}
    public function update(Request $request, Transaction $transaction)
    {
        if ($transaction->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $validated = $request->validate([
            'category_id' => [
                'required',
                Rule::exists('categories', 'id')->where('user_id', $request->user()->id),
            ],
            'amount' => 'required|numeric|min:0.01',
            'type' => 'required|in:income,expense',
            'description' => 'nullable|string|max:255',
            'date' => 'required|date',
        ]);

        $transaction->update($validated);

        return response()->json($transaction->load('category'));
    }

    // DELETE /api/transactions/{transaction}
    public function destroy(Request $request, Transaction $transaction)
    {
        if ($transaction->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $transaction->delete();

        return response()->json(['message' => 'Transaction deleted']);
    }


    // Summary endpoint to get total income and expenses for a given month and year
    public function summary(Request $request)
    {
        $validated = $request->validate([
            'month' => 'sometimes|integer|between:1,12',
            'year'  => 'sometimes|integer|digits:4',
        ]);

        $month = $validated['month'] ?? now()->month;
        $year  = $validated['year'] ?? now()->year;

        $totals = $request->user()->transactions()
            ->whereYear('date', $year)
            ->whereMonth('date', $month)
            ->selectRaw('type, SUM(amount) as total')
            ->groupBy('type')
            ->get();

        $income  = $totals->firstWhere('type', 'income')->total ?? 0;
        $expense = $totals->firstWhere('type', 'expense')->total ?? 0;

        return response()->json([
            'month'   => $month,
            'year'    => $year,
            'income'  => (float) $income,
            'expense' => (float) $expense,
            'net'     => (float) $income - (float) $expense,
        ]);
    }
}

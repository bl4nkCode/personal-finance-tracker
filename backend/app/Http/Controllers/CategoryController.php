<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // GET /api/categories
    public function index(Request $request)
    {
        $categories = $request->user()->categories()->get();

        return response()->json($categories);
    }

    // POST /api/categories
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:income,expense',
        ]);

        $category = $request->user()->categories()->create($validated);

        return response()->json($category, 201);
    }

    // GET /api/categories/{category}
    public function show(Request $request, Category $category)
    {
        if ($category->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($category);
    }

    // PUT/PATCH /api/categories/{category}
    public function update(Request $request, Category $category)
    {
        if ($category->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:income,expense',
        ]);

        $category->update($validated);

        return response()->json($category);
    }

    // DELETE /api/categories/{category}
    public function destroy(Request $request, Category $category)
    {
        if ($category->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted']);
    }
}

import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get all expenses for the current user
export const getExpenses = query({
  args: {
    category: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    let query = ctx.db.query("expenses").withIndex("by_user", (q) => q.eq("userId", userId));

    const expenses = await query.collect();

    // Filter by category if provided
    let filteredExpenses = expenses;
    if (args.category) {
      filteredExpenses = filteredExpenses.filter(expense => expense.category === args.category);
    }

    // Filter by date range if provided
    if (args.startDate || args.endDate) {
      filteredExpenses = filteredExpenses.filter(expense => {
        const expenseDate = expense.date;
        if (args.startDate && expenseDate < args.startDate) return false;
        if (args.endDate && expenseDate > args.endDate) return false;
        return true;
      });
    }

    return filteredExpenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
});

// Add a new expense
export const addExpense = mutation({
  args: {
    amount: v.number(),
    category: v.string(),
    note: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("expenses", {
      userId,
      amount: args.amount,
      category: args.category,
      note: args.note,
      date: args.date,
    });
  },
});

// Update an expense
export const updateExpense = mutation({
  args: {
    id: v.id("expenses"),
    amount: v.number(),
    category: v.string(),
    note: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const expense = await ctx.db.get(args.id);
    if (!expense || expense.userId !== userId) {
      throw new Error("Expense not found or unauthorized");
    }

    return await ctx.db.patch(args.id, {
      amount: args.amount,
      category: args.category,
      note: args.note,
      date: args.date,
    });
  },
});

// Delete an expense
export const deleteExpense = mutation({
  args: { id: v.id("expenses") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const expense = await ctx.db.get(args.id);
    if (!expense || expense.userId !== userId) {
      throw new Error("Expense not found or unauthorized");
    }

    return await ctx.db.delete(args.id);
  },
});

// Get expense statistics for dashboard
export const getExpenseStats = query({
  args: { month: v.string() }, // Format: "2024-01"
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const startDate = `${args.month}-01`;
    const endDate = `${args.month}-31`;

    const expenses = await ctx.db
      .query("expenses")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const monthlyExpenses = expenses.filter(expense => 
      expense.date >= startDate && expense.date <= endDate
    );

    const totalSpent = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Group by category
    const categoryTotals: Record<string, number> = {};
    monthlyExpenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    return {
      totalSpent,
      categoryTotals,
      transactionCount: monthlyExpenses.length,
      recentTransactions: monthlyExpenses.slice(0, 5),
    };
  },
});

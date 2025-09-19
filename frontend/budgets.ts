import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get budget for a specific month
export const getBudget = query({
  args: { month: v.string() }, // Format: "2024-01"
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const budget = await ctx.db
      .query("budgets")
      .withIndex("by_user_and_month", (q) => q.eq("userId", userId).eq("month", args.month))
      .unique();

    return budget;
  },
});

// Set or update budget for a month
export const setBudget = mutation({
  args: {
    month: v.string(),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existingBudget = await ctx.db
      .query("budgets")
      .withIndex("by_user_and_month", (q) => q.eq("userId", userId).eq("month", args.month))
      .unique();

    if (existingBudget) {
      return await ctx.db.patch(existingBudget._id, { amount: args.amount });
    } else {
      return await ctx.db.insert("budgets", {
        userId,
        month: args.month,
        amount: args.amount,
      });
    }
  },
});

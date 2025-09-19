import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get all categories for the current user
export const getCategories = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const categories = await ctx.db
      .query("categories")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // Return default categories if none exist
    if (categories.length === 0) {
      return [
        { name: "Food & Dining", color: "#ef4444" },
        { name: "Transportation", color: "#3b82f6" },
        { name: "Shopping", color: "#8b5cf6" },
        { name: "Entertainment", color: "#f59e0b" },
        { name: "Bills & Utilities", color: "#10b981" },
        { name: "Healthcare", color: "#ec4899" },
        { name: "Other", color: "#6b7280" },
      ];
    }

    return categories;
  },
});

// Add a new category
export const addCategory = mutation({
  args: {
    name: v.string(),
    color: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("categories", {
      userId,
      name: args.name,
      color: args.color,
    });
  },
});

// Auto-categorize expense based on keywords
export const suggestCategory = query({
  args: { note: v.string() },
  handler: async (ctx, args) => {
    const note = args.note.toLowerCase();
    
    // Simple keyword-based categorization
    if (note.includes("pizza") || note.includes("restaurant") || note.includes("food") || note.includes("lunch") || note.includes("dinner")) {
      return "Food & Dining";
    }
    if (note.includes("gas") || note.includes("uber") || note.includes("taxi") || note.includes("bus") || note.includes("train")) {
      return "Transportation";
    }
    if (note.includes("amazon") || note.includes("shopping") || note.includes("store") || note.includes("mall")) {
      return "Shopping";
    }
    if (note.includes("movie") || note.includes("concert") || note.includes("game") || note.includes("entertainment")) {
      return "Entertainment";
    }
    if (note.includes("electric") || note.includes("water") || note.includes("internet") || note.includes("phone") || note.includes("bill")) {
      return "Bills & Utilities";
    }
    if (note.includes("doctor") || note.includes("hospital") || note.includes("pharmacy") || note.includes("medical")) {
      return "Healthcare";
    }
    
    return "Other";
  },
});

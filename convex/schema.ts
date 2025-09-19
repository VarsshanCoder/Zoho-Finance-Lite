import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  expenses: defineTable({
    userId: v.id("users"),
    amount: v.number(),
    category: v.string(),
    note: v.string(),
    date: v.string(), // ISO date string
  })
    .index("by_user", ["userId"])
    .index("by_user_and_date", ["userId", "date"])
    .index("by_user_and_category", ["userId", "category"]),

  budgets: defineTable({
    userId: v.id("users"),
    month: v.string(), // Format: "2024-01"
    amount: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_month", ["userId", "month"]),

  categories: defineTable({
    userId: v.id("users"),
    name: v.string(),
    color: v.string(),
  })
    .index("by_user", ["userId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});

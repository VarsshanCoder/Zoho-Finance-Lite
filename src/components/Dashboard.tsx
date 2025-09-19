import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { BudgetProgress } from "./BudgetProgress";
import { CategoryChart } from "./CategoryChart";
import { RecentTransactions } from "./RecentTransactions";
import { StatsCards } from "./StatsCards";

export function Dashboard() {
  const currentMonth = new Date().toISOString().slice(0, 7); // "2024-01"
  const expenseStats = useQuery(api.expenses.getExpenseStats, { month: currentMonth });
  const budget = useQuery(api.budgets.getBudget, { month: currentMonth });

  if (expenseStats === undefined || budget === undefined) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <div className="text-gray-400">
          {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </div>
      </div>

      <StatsCards 
        totalSpent={expenseStats?.totalSpent || 0}
        budget={budget?.amount || 0}
        transactionCount={expenseStats?.transactionCount || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetProgress 
          spent={expenseStats?.totalSpent || 0}
          budget={budget?.amount || 0}
        />
        <CategoryChart categoryTotals={expenseStats?.categoryTotals || {}} />
      </div>

      <RecentTransactions transactions={expenseStats?.recentTransactions || []} />
    </div>
  );
}

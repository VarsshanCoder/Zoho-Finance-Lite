import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

interface Transaction {
  _id: Id<"expenses">;
  amount: number;
  category: string;
  note: string;
  date: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const deleteExpense = useMutation(api.expenses.deleteExpense);

  const handleDelete = async (id: Id<"expenses">) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      await deleteExpense({ id });
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="text-center text-gray-400 py-8">
          No transactions found
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{transaction.note}</span>
                <span className="text-red-400 font-semibold">
                  -${transaction.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-gray-400">{transaction.category}</span>
                <span className="text-sm text-gray-400">
                  {new Date(transaction.date).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => handleDelete(transaction._id)}
                className="p-1 text-gray-400 hover:text-red-400 transition-colors"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

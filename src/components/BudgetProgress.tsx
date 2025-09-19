import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PencilIcon } from "@heroicons/react/24/outline";

interface BudgetProgressProps {
  spent: number;
  budget: number;
}

export function BudgetProgress({ spent, budget }: BudgetProgressProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget.toString());
  const setBudget = useMutation(api.budgets.setBudget);

  const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
  const currentMonth = new Date().toISOString().slice(0, 7);

  const handleSaveBudget = async () => {
    const amount = parseFloat(newBudget);
    if (amount > 0) {
      await setBudget({ month: currentMonth, amount });
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Budget Progress</h3>
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Monthly Budget</label>
            <input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
              placeholder="Enter budget amount"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSaveBudget}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setNewBudget(budget.toString());
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Spent: ${spent.toFixed(2)}</span>
            <span className="text-gray-400">Budget: ${budget.toFixed(2)}</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all duration-300 ${
                percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          <div className="text-center">
            <span className={`text-lg font-semibold ${
              percentage > 100 ? 'text-red-400' : 'text-white'
            }`}>
              {percentage.toFixed(1)}% used
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

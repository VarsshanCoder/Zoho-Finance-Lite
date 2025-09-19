import { CurrencyDollarIcon, ChartBarIcon, ClockIcon } from "@heroicons/react/24/outline";

interface StatsCardsProps {
  totalSpent: number;
  budget: number;
  transactionCount: number;
}

export function StatsCards({ totalSpent, budget, transactionCount }: StatsCardsProps) {
  const remaining = budget - totalSpent;
  const percentageUsed = budget > 0 ? (totalSpent / budget) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Spent</p>
            <p className="text-2xl font-bold text-red-400">${totalSpent.toFixed(2)}</p>
          </div>
          <CurrencyDollarIcon className="w-8 h-8 text-red-400" />
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Budget Remaining</p>
            <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${remaining.toFixed(2)}
            </p>
          </div>
          <ChartBarIcon className="w-8 h-8 text-green-400" />
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Transactions</p>
            <p className="text-2xl font-bold text-blue-400">{transactionCount}</p>
          </div>
          <ClockIcon className="w-8 h-8 text-blue-400" />
        </div>
      </div>
    </div>
  );
}

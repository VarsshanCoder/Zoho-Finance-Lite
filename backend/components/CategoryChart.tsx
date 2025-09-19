interface CategoryChartProps {
  categoryTotals: Record<string, number>;
}

export function CategoryChart({ categoryTotals }: CategoryChartProps) {
  const categories = Object.entries(categoryTotals);
  const total = categories.reduce((sum, [, amount]) => sum + amount, 0);

  const colors = [
    "#ef4444", "#3b82f6", "#8b5cf6", "#f59e0b", 
    "#10b981", "#ec4899", "#6b7280", "#f97316"
  ];

  if (categories.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
        <div className="text-center text-gray-400 py-8">
          No expenses recorded this month
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
      
      <div className="space-y-3">
        {categories.map(([category, amount], index) => {
          const percentage = (amount / total) * 100;
          const color = colors[index % colors.length];
          
          return (
            <div key={category} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-sm text-gray-300">{category}</span>
                </div>
                <span className="text-sm font-semibold">${amount.toFixed(2)}</span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: color
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

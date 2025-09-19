import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export function AddExpense() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const addExpense = useMutation(api.expenses.addExpense);
  const categories = useQuery(api.categories.getCategories);
  const suggestCategory = useQuery(api.categories.suggestCategory, { note });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !note) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await addExpense({
        amount: parseFloat(amount),
        category,
        note,
        date,
      });
      
      // Reset form
      setAmount("");
      setCategory("");
      setNote("");
      setDate(new Date().toISOString().split('T')[0]);
      
      toast.success("Expense added successfully!");
    } catch (error) {
      toast.error("Failed to add expense");
    }
  };

  // Auto-suggest category when note changes
  const handleNoteChange = (value: string) => {
    setNote(value);
    if (value && suggestCategory && !category) {
      setCategory(suggestCategory);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Add New Expense</h2>
      
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => handleNoteChange(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
              placeholder="What did you spend on?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
              required
            >
              <option value="">Select a category</option>
              {categories?.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

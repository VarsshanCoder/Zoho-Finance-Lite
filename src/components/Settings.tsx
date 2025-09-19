import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export function Settings() {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#ef4444");
  
  const categories = useQuery(api.categories.getCategories);
  const addCategory = useMutation(api.categories.addCategory);
  const loggedInUser = useQuery(api.auth.loggedInUser);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategoryName.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    try {
      await addCategory({
        name: newCategoryName.trim(),
        color: newCategoryColor,
      });
      
      setNewCategoryName("");
      setNewCategoryColor("#ef4444");
      toast.success("Category added successfully!");
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  const colorOptions = [
    "#ef4444", "#3b82f6", "#8b5cf6", "#f59e0b",
    "#10b981", "#ec4899", "#6b7280", "#f97316"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold">Settings</h2>

      {/* User Profile */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Profile</h3>
        <div className="space-y-2">
          <p className="text-gray-400">Email: {loggedInUser?.email || "Not available"}</p>
          <p className="text-gray-400">Name: {loggedInUser?.name || "Not set"}</p>
        </div>
      </div>

      {/* Categories Management */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Manage Categories</h3>
        
        {/* Add New Category */}
        <form onSubmit={handleAddCategory} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Category Name</label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
                placeholder="Enter category name"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Color</label>
              <div className="flex gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setNewCategoryColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      newCategoryColor === color ? 'border-white' : 'border-gray-600'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Category
              </button>
            </div>
          </div>
        </form>

        {/* Existing Categories */}
        <div>
          <h4 className="text-md font-medium mb-3">Current Categories</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories?.map((category) => (
              <div
                key={category.name}
                className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg"
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-white">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* App Information */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4">About</h3>
        <div className="space-y-2 text-gray-400">
          <p>Personal Expense & Budget Tracker v1.0</p>
          <p>Track your expenses, manage budgets, and analyze spending patterns.</p>
          <p>Built with React, Convex, and Tailwind CSS.</p>
        </div>
      </div>
    </div>
  );
}

import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { Dashboard } from "./components/Dashboard";
import { AddExpense } from "./components/AddExpense";
import { Reports } from "./components/Reports";
import { Settings } from "./components/Settings";
import { Sidebar } from "./components/Sidebar";
import { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Authenticated>
        <div className="flex">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 ml-64">
            <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Personal Expense Tracker</h1>
              <SignOutButton />
            </header>
            <main className="p-6">
              {activeTab === "dashboard" && <Dashboard />}
              {activeTab === "add-expense" && <AddExpense />}
              {activeTab === "reports" && <Reports />}
              {activeTab === "settings" && <Settings />}
            </main>
          </div>
        </div>
      </Authenticated>

      <Unauthenticated>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-full max-w-md mx-auto p-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">Expense Tracker</h1>
              <p className="text-gray-400">Track your expenses and manage your budget</p>
            </div>
            <SignInForm />
          </div>
        </div>
      </Unauthenticated>

      <Toaster theme="dark" />
    </div>
  );
}

import { 
  ChartBarIcon, 
  PlusIcon, 
  DocumentChartBarIcon, 
  CogIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: ChartBarIcon },
    { id: "add-expense", label: "Add Expense", icon: PlusIcon },
    { id: "reports", label: "Reports", icon: DocumentChartBarIcon },
    { id: "settings", label: "Settings", icon: CogIcon },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700 z-10">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <CurrencyDollarIcon className="w-8 h-8 text-green-500" />
          <span className="text-xl font-bold">ExpenseTracker</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-green-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

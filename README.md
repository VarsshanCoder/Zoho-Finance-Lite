# Personal Expense & Budget Tracker

A modern, full-stack expense tracking application with a dark-themed dashboard UI. Built with React, Convex, and Tailwind CSS.

## Features

### Core Functionality
- **Expense Management**: Add, edit, and delete expenses with amount, category, description, and date
- **Budget Tracking**: Set monthly budgets and track spending progress with visual indicators
- **Dashboard Analytics**: 
  - Budget vs. actual expenses with progress bars
  - Category-wise expense breakdown with color-coded charts
  - Recent transactions overview
  - Key statistics cards

### ✨ Advanced Features
- **Search & Filter**: Filter expenses by category, date range, and search by description
- **Data Export**: Export expense data as CSV files for external analysis
- **Auto-categorization**: Smart category suggestions based on expense descriptions
- **Real-time Updates**: Live dashboard updates using Convex's reactive database
- **User Authentication**: Secure login/signup with Convex Auth

### UI/UX
- **Dark Theme**: Modern dark interface optimized for extended use
- **Sidebar Navigation**: Easy access to Dashboard, Add Expense, Reports, and Settings
- **Responsive Design**: Optimized for both mobile and desktop devices
- **Smooth Animations**: Hover effects and transitions for better user experience
- **Minimalistic Cards**: Clean, rounded card design with proper spacing

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Convex (reactive database with real-time updates)
- **Authentication**: Convex Auth
- **Icons**: Heroicons
- **Notifications**: Sonner (toast notifications)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expense-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up Convex:
```bash
npx convex dev
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # Main dashboard with stats and charts
│   ├── AddExpense.tsx         # Form to add new expenses
│   ├── Reports.tsx            # Expense reports with filters and export
│   ├── Settings.tsx           # User settings and category management
│   ├── Sidebar.tsx            # Navigation sidebar
│   ├── BudgetProgress.tsx     # Budget tracking component
│   ├── CategoryChart.tsx      # Category breakdown visualization
│   ├── RecentTransactions.tsx # Recent expenses list
│   └── StatsCards.tsx         # Dashboard statistics cards
├── App.tsx                    # Main application component
└── index.css                  # Global styles and dark theme

convex/
├── schema.ts                  # Database schema definition
├── expenses.ts                # Expense-related queries and mutations
├── budgets.ts                 # Budget management functions
├── categories.ts              # Category management and auto-suggestion
└── auth.ts                    # Authentication configuration
```

## Usage

### Adding Expenses
1. Navigate to "Add Expense" in the sidebar
2. Fill in the amount, description, category, and date
3. The app will auto-suggest categories based on keywords in the description
4. Click "Add Expense" to save

### Setting Budgets
1. Go to the Dashboard
2. Click the edit icon on the Budget Progress card
3. Enter your monthly budget amount
4. The progress bar will update to show your spending vs. budget

### Viewing Reports
1. Navigate to "Reports" in the sidebar
2. Use filters to search by description, category, or date range
3. View the summary of filtered expenses
4. Export data as CSV using the "Export CSV" button

### Managing Categories
1. Go to "Settings" in the sidebar
2. Add new categories with custom colors
3. View all existing categories

## Demo Data

The app includes default expense categories:
- Food & Dining (Red)
- Transportation (Blue)
- Shopping (Purple)
- Entertainment (Orange)
- Bills & Utilities (Green)
- Healthcare (Pink)
- Other (Gray)

## Auto-categorization Keywords

The app automatically suggests categories based on description keywords:
- **Food & Dining**: pizza, restaurant, food, lunch, dinner
- **Transportation**: gas, uber, taxi, bus, train
- **Shopping**: amazon, shopping, store, mall
- **Entertainment**: movie, concert, game, entertainment
- **Bills & Utilities**: electric, water, internet, phone, bill
- **Healthcare**: doctor, hospital, pharmacy, medical

## 📸 ScreenShots And Demo Video


## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

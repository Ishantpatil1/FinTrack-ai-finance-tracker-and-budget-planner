const Transaction = require("../models/transaction");
const Budget = require("../models/Budget");

const getDashboardData = async (req, res) => {
  try {
    const userId = req.userId;

    // Recent Transactions
    const recentTransactions = await Transaction.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    // Total Income and Expense
    const transactions = await Transaction.find({ userId });
    const totalIncome = transactions
      .filter(t => t.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = transactions
      .filter(t => t.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);

    // Budget Utilization
    const budgets = await Budget.find({ userId });
    const budgetStatus = budgets.map(budget => {
      const spent = transactions
        .filter(t => t.category === budget.category && t.type === "expense")
        .reduce((acc, curr) => acc + curr.amount, 0);
      const remaining = budget.amount - spent;
      return {
        category: budget.category,
        limit: budget.amount,
        spent,
        remaining,
        percentUsed: ((spent / budget.amount) * 100).toFixed(2)
      };
    });

    res.status(200).json({
      totalIncome,
      totalExpense,
      recentTransactions,
      budgetStatus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Dashboard data fetch error", error });
  }
};

module.exports = { getDashboardData };

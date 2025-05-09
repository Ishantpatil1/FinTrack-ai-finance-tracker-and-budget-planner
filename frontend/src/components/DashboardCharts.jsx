// src/components/DashboardCharts.jsx
import React, { useState } from "react";
import {
    PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line
} from 'recharts';

const COLORS = ['#28a745', '#dc3545'];

const DashboardCharts = ({ transactions }) => {
    const [viewMode, setViewMode] = useState("monthly");

    const income = transactions.filter(t => t.type === 'income');
    const expense = transactions.filter(t => t.type === 'expense');

    const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = expense.reduce((acc, curr) => acc + curr.amount, 0);
    const budgetLeft = totalIncome - totalExpense;

    const pieData = [
        { name: 'Income', value: totalIncome },
        { name: 'Expense', value: totalExpense }
    ];

    const groupByPeriod = (txns, mode) => {
        const grouped = {};
        txns.forEach(txn => {
            const date = new Date(txn.date);
            let key = "";
            if (mode === "weekly") {
                const week = Math.ceil(date.getDate() / 7);
                key = `W${week}-${date.toLocaleString('default', { month: 'short' })}`;
            } else if (mode === "monthly") {
                key = date.toLocaleString('default', { month: 'short', year: 'numeric' });
            } else if (mode === "yearly") {
                key = date.getFullYear().toString();
            } else {
                key = date.toISOString().split("T")[0];
            }
            grouped[key] = (grouped[key] || 0) + txn.amount;
        });

        return Object.entries(grouped).map(([period, value]) => ({ period, value }));
    };

    const expenseData = groupByPeriod(expense, viewMode);

    return (
        <div className="row mb-5">
            <div className="col-md-4">
                <div className="card shadow mb-3">
                    <div className="card-body text-center">
                        <h5>Total Income</h5>
                        <p className="text-success">₹{totalIncome}</p>
                    </div>
                </div>
                <div className="card shadow mb-3">
                    <div className="card-body text-center">
                        <h5>Total Expense</h5>
                        <p className="text-danger">₹{totalExpense}</p>
                    </div>
                </div>
                <div className="card shadow mb-3">
                    <div className="card-body text-center">
                        <h5>Difference Income Vs Expense</h5>
                        <p className={budgetLeft >= 0 ? 'text-success' : 'text-danger'}>
                            ₹{budgetLeft}
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <h5 className="text-center">Income vs Expense</h5>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            label
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="col-md-4">
                <h5 className="text-center">Expense Trends</h5>
                <div className="mb-2 text-center">
                    <select value={viewMode} onChange={(e) => setViewMode(e.target.value)} className="form-select">
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="custom">Custom (Date wise)</option>
                    </select>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                    {viewMode === 'yearly' ? (
                        <LineChart data={expenseData}>
                            <XAxis dataKey="period" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#dc3545" strokeWidth={2} />
                        </LineChart>
                    ) : (
                        <BarChart data={expenseData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="period" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#dc3545" />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardCharts;

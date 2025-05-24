import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaChartPie, FaPiggyBank } from 'react-icons/fa';

const BudgetAI = () => {
    const [income, setIncome] = useState('');
    const [fixedExpenses, setFixedExpenses] = useState('');
    const [variableExpenses, setVariableExpenses] = useState('');
    const [suggestion, setSuggestion] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuggestion(null);

        try {
            const res = await axios.post('http://localhost:3000/api/ai-budget-suggestion', {
                income,
                fixedExpenses,
                variableExpenses
            });
            setSuggestion(res.data);
        } catch (err) {
            console.error("AI Budget Error:", err.response?.data || err.message);
            setError('Failed to fetch AI suggestion');
        }
    };

    return (
        <motion.div
            className="container-fluid py-5 px-3 d-flex justify-content-center align-items-center min-vh-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="bg-white p-4 p-md-5 rounded-4 shadow w-100" style={{ maxWidth: '720px' }}>
                <h3 className="text-center mb-4">💡 AI Budget Planner</h3>
                <p className="text-muted text-center">
                    Enter your monthly income and expenses, and our AI will suggest how to divide your budget into
                    <strong> Needs, Wants, and Savings</strong>.
                    <br />
                    <em>Example: If your income is ₹50,000, we'll guide you to spend wisely and save smartly.</em>
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Monthly Income (₹)</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter your income"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Fixed Expenses (₹)</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Rent, bills, etc."
                                value={fixedExpenses}
                                onChange={(e) => setFixedExpenses(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Other Expenses (₹)</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Food, travel, etc."
                                value={variableExpenses}
                                onChange={(e) => setVariableExpenses(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="d-grid mt-4">
                        <button type="submit" className="btn btn-primary btn-lg">
                            🔍 Get AI Suggestion
                        </button>
                    </div>
                </form>

                {error && <div className="alert alert-danger mt-3">{error}</div>}

                {suggestion && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="alert mt-4 bg-light border shadow-sm"
                    >
                        <h5 className="mb-3 text-center">📊 Your AI-Generated Budget Plan</h5>
                        <div className="row text-center">
                            <div className="col-12 col-md-4 mb-3">
                                <FaMoneyBillWave className="text-success fs-3 mb-1" />
                                <div><strong>Needs:</strong> {suggestion.budget?.Needs}</div>
                            </div>
                            <div className="col-12 col-md-4 mb-3">
                                <FaChartPie className="text-warning fs-3 mb-1" />
                                <div><strong>Wants:</strong> {suggestion.budget?.Wants}</div>
                            </div>
                            <div className="col-12 col-md-4 mb-3">
                                <FaPiggyBank className="text-primary fs-3 mb-1" />
                                <div><strong>Savings:</strong> {suggestion.budget?.Savings}</div>
                            </div>
                        </div>
                        <p className="text-start mt-3 text-dark" style={{ whiteSpace: 'pre-line' }}>
                            <strong>💬 Simple Advice:</strong><br />
                            {suggestion.advice
                                ?.replace(/\*\*/g, '')       // Remove bold stars
                                .replace(/^\*\s*/gm, '• ')   // Replace list * with bullet
                                || "Try to reduce wants, increase savings!"}
                        </p>

                    </motion.div>
                )}
            </div>
        </motion.div>
    );

};

export default BudgetAI;

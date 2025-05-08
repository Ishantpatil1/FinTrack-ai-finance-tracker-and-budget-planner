import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Budget = () => {
  const [month, setMonth] = useState('');
  const [amount, setAmount] = useState('');
  const [fetchedBudget, setFetchedBudget] = useState(null);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const now = new Date();
    const defaultMonth = now.toISOString().slice(0, 7);
    setMonth(defaultMonth);
    fetchBudget(defaultMonth);
  }, []);

  const fetchBudget = async (m) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/budget/${m}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFetchedBudget(res.data);
      setMessage('Budget fetched successfully');
    } catch (err) {
      console.error(err);
      setMessage('No budget found');
      setFetchedBudget(null);
    }
  };

  const handleSetBudget = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/budget/set', { month, amount }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      fetchBudget(month);
      setAmount('');
    } catch (err) {
      console.error("Set budget error:", err.response?.data || err.message);
      setMessage('Error setting budget');
    }
  };

  const handleFetchBudget = () => fetchBudget(month);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="my-4 p-4 shadow rounded bg-light"
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">Monthly Budget</h4>
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Close' : 'Add/Update Budget'}
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-3">
            <input
              type="month"
              className="form-control mb-2"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <input
              type="number"
              className="form-control mb-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Budget Amount"
            />
            <div className="d-flex gap-2">
              <button className="btn btn-success" onClick={handleSetBudget}>Set Budget</button>
              <button className="btn btn-secondary" onClick={handleFetchBudget}>Refresh</button>
            </div>
            {message && <p className="mt-3 text-info">{message}</p>}
          </div>
        </motion.div>
      )}

      {fetchedBudget && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="alert alert-info mt-3"
        >
          <h5>Budget Details</h5>
          <p><strong>Month:</strong> {fetchedBudget.month}</p>
          <p><strong>Budget:</strong> ₹{fetchedBudget.amount}</p>
          <p><strong>Spent:</strong> ₹{fetchedBudget.spent}</p>
          <p><strong>Remaining:</strong> ₹{fetchedBudget.remaining}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Budget;

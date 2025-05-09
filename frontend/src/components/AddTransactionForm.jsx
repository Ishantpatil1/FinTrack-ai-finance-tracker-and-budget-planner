import React, { useState } from 'react';
import axios from 'axios';

const AddTransactionForm = ({ fetchTransactions }) => {
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    category: '',
    note: '',
    type: 'income', // Default type
    date: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:3000/api/addnewtransaction',
        newTransaction,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTransactions(); // Re-fetch transactions after adding
      setNewTransaction({ amount: '', category: '', note: '', type: 'income', date: '' }); // Reset form
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h4>Add New Transaction</h4>
      <form onSubmit={handleAddTransaction}>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            name="amount"
            value={newTransaction.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="category"
            value={newTransaction.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            name="note"
            value={newTransaction.note}
            onChange={handleChange}
            placeholder="Note"
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            name="type"
            value={newTransaction.type}
            onChange={handleChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            name="date"
            value={newTransaction.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;

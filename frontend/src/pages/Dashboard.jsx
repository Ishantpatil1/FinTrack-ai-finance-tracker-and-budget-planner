// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import FilterForm from '../components/FilterForm';
import AddTransactionForm from '../components/AddTransactionForm';
import EditTransactionForm from '../components/EditTransactionForm';
import Budget from '../components/Budget';
import DashboardCharts from '../components/DashboardCharts';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [budgetWarning, setBudgetWarning] = useState(null);

  const fetchTransactions = async (applyFilters = false) => {
    const token = localStorage.getItem('token');

    try {
      let url = 'http://localhost:3000/api/transaction';
      if (applyFilters) {
        const queryParams = new URLSearchParams();
        if (type) queryParams.append('type', type);
        if (category) queryParams.append('category', category);
        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);
        url += `?${queryParams.toString()}`;
      }

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTransactions(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch transactions.');
      setLoading(false);
    }
  };

  const handleEditTransaction = async (transactionId, updatedData) => {
    const token = localStorage.getItem('token');

    try {
      await axios.put(
        `http://localhost:3000/api/transaction/${transactionId}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingTransaction(null);
      fetchTransactions();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(
        `http://localhost:3000/api/transaction/${transactionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleFilter = () => {
    setLoading(true);
    fetchTransactions(true);
  };

  const startEditing = (transaction) => {
    setEditingTransaction(transaction);
  };

  const cancelEditing = () => {
    setEditingTransaction(null);
  };

  const checkBudgetStatus = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:3000/api/budget-status', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { overBudget, totalExpense } = res.data;
      if (overBudget) {
        setBudgetWarning(`You've spend ₹${totalExpense} of your budget!`);
      } else {
        setBudgetWarning(null);
      }
    } catch (err) {
      console.error('Failed to check budget status:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    checkBudgetStatus();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">Welcome to Your Dashboard</h2>
        <Budget />
        <DashboardCharts transactions={transactions} />
        <FilterForm
          type={type}
          setType={setType}
          category={category}
          setCategory={setCategory}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          handleFilter={handleFilter}
        />

        <button
          className="btn btn-primary mb-4"
          onClick={() => setShowAddTransactionForm(!showAddTransactionForm)}
        >
          {showAddTransactionForm ? 'Close Form' : 'Add New Transaction'}
        </button>

        {showAddTransactionForm && (
          <AddTransactionForm fetchTransactions={fetchTransactions} />
        )}

        {budgetWarning && (
          <div className="alert alert-warning text-center">
            {budgetWarning}
          </div>
        )}

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          <div className="row">
            {transactions.length === 0 ? (
              <p className="text-center">No transactions found.</p>
            ) : (
              transactions.map((txn) => (
                <div key={txn._id} className="col-md-6 mb-4">
                  <div
                    className={`card shadow border-left-${txn.type === 'income' ? 'success' : 'danger'}`}
                  >
                    <div className="card-body">
                      {editingTransaction && editingTransaction._id === txn._id ? (
                        <EditTransactionForm
                          transaction={txn}
                          onSubmit={handleEditTransaction}
                          onCancel={cancelEditing}
                        />
                      ) : (
                        <>
                          <h5 className="card-title">
                            ₹{txn.amount} - {txn.category}
                          </h5>
                          <p className="card-text">{txn.note || 'No note'}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              {new Date(txn.date).toLocaleDateString()}
                            </small>
                          </p>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => startEditing(txn)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteTransaction(txn._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

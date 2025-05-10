// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import FilterForm from '../components/FilterForm';
import AddTransactionForm from '../components/AddTransactionForm';
import EditTransactionForm from '../components/EditTransactionForm';
import Budget from '../components/Budget';
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#aa66cc', '#33b5e5'];

const Dashboard = () => {
  // const [name, setName] = useState('');
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
  const [activeTab, setActiveTab] = useState('overview');
  const [trendView, setTrendView] = useState('monthly');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

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
        setBudgetWarning(`You've spent ₹${totalExpense} of your budget!`);
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

  const groupBy = (dateStr, view) => {
    const date = new Date(dateStr);
    if (view === 'weekly') {
      const start = new Date(date.setDate(date.getDate() - date.getDay()));
      return `Week of ${start.toLocaleDateString()}`;
    }
    if (view === 'monthly') return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    if (view === 'yearly') return `${date.getFullYear()}`;
    return new Date(dateStr).toLocaleDateString(); // for custom
  };

  const filteredTransactions = transactions.filter(txn => {
    if (trendView !== 'custom') return true;
    if (!customStart || !customEnd) return true;
    const txnDate = new Date(txn.date);
    return txnDate >= new Date(customStart) && txnDate <= new Date(customEnd);
  });

  const chartData = filteredTransactions.reduce((acc, txn) => {
    const key = groupBy(txn.date, trendView);
    const found = acc.find(item => item.date === key);
    if (found) {
      found[txn.type] += txn.amount;
    } else {
      acc.push({
        date: key,
        income: txn.type === 'income' ? txn.amount : 0,
        expense: txn.type === 'expense' ? txn.amount : 0
      });
    }
    return acc;
  }, []);


  const pieData = transactions.reduce((acc, txn) => {
    const found = acc.find(item => item.name === txn.category);
    if (found) {
      found.value += txn.amount;
    } else {
      acc.push({ name: txn.category, value: txn.amount });
    }
    return acc;
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">Welcome to Your Dashboard</h2>
        <Budget />
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

        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'overview' && 'active'}`} onClick={() => setActiveTab('overview')}>Overview</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'trends' && 'active'}`} onClick={() => setActiveTab('trends')}>Trends</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'breakdown' && 'active'}`} onClick={() => setActiveTab('breakdown')}>Breakdown</button>
          </li>
        </ul>

        {activeTab === 'overview' && (
          loading ? (
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
                    <div className={`card shadow border-left-${txn.type === 'income' ? 'success' : 'danger'}`}>
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
                            <button className="btn btn-primary btn-sm me-2" onClick={() => startEditing(txn)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTransaction(txn._id)}>Delete</button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )
        )}

        {activeTab === 'trends' && (
          <>
            <div className="mb-3 d-flex align-items-center gap-3">
              <label htmlFor="trendView">Select View:</label>
              <select
                id="trendView"
                className="form-select w-auto"
                value={trendView}
                onChange={(e) => setTrendView(e.target.value)}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="custom">Custom</option>
              </select>

              {trendView === 'custom' && (
                <>
                  <input
                    type="date"
                    className="form-control"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                  />
                  <input
                    type="date"
                    className="form-control"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                  />
                </>
              )}
            </div>

            <div style={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" fill="#28a745" name="Income" />
                  <Bar dataKey="expense" fill="#dc3545" name="Expense" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === 'breakdown' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer width="50%" height={300}>
              <PieChart>
                <Pie dataKey="value" data={pieData} cx="50%" cy="50%" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTransactions = async () => {
        const token = localStorage.getItem('token');

        try {
            const res = await axios.get('http://localhost:3000/api/transaction', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setTransactions(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch transactions.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">Welcome to Your Dashboard</h2>

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
                  <div className={`card shadow border-left-${txn.type === 'income' ? 'success' : 'danger'}`}>
                    <div className="card-body">
                      <h5 className="card-title">
                        ₹{txn.amount} - {txn.category}
                      </h5>
                      <p className="card-text">{txn.note || 'No note'}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          {new Date(txn.date).toLocaleDateString()}
                        </small>
                      </p>
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
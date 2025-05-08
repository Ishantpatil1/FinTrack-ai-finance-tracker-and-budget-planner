// src/components/EditTransactionForm.jsx
import React, { useState, useEffect } from 'react';

const EditTransactionForm = ({ transaction, onSubmit, onCancel }) => {
  const [editFormData, setEditFormData] = useState({
    amount: '',
    category: '',
    note: '',
    type: '',
    date: '',
  });

  useEffect(() => {
    if (transaction) {
      setEditFormData({
        amount: transaction.amount,
        category: transaction.category,
        note: transaction.note,
        type: transaction.type,
        date: transaction.date.slice(0, 10),
      });
    }
  }, [transaction]);

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const submitEdit = (err) => {
    console.log(err);
    onSubmit(transaction._id, editFormData);
  };

  return (
    <div className="edit-form">
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={editFormData.amount}
          onChange={handleEditFormChange}
          className="form-control"
          placeholder="Amount"
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={editFormData.category}
          onChange={handleEditFormChange}
          className="form-control"
          placeholder="Category"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="note" className="form-label">Note</label>
        <input
          type="text"
          id="note"
          name="note"
          value={editFormData.note}
          onChange={handleEditFormChange}
          className="form-control"
          placeholder="Note"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="type" className="form-label">Transaction Type</label>
        <select
          id="type"
          name="type"
          value={editFormData.type}
          onChange={handleEditFormChange}
          className="form-control"
        >
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="date" className="form-label">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={editFormData.date}
          onChange={handleEditFormChange}
          className="form-control"
        />
      </div>

      <button className="btn btn-success btn-sm me-2" onClick={submitEdit}>
        Save
      </button>
      <button className="btn btn-secondary btn-sm" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default EditTransactionForm;

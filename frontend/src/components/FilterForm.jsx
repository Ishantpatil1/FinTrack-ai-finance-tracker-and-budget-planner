import React from 'react';

const FilterForm = ({ type, setType, category, setCategory, startDate, setStartDate, endDate, setEndDate, handleFilter }) => {
  return (
    <div className="card p-3 mb-4 shadow-sm">
      <div className="row g-3">
        <div className="col-md-3">
          <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Salary">Salary</option>
            <option value="Groceries">Groceries</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Travel">Travel</option>
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleFilter}>
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;

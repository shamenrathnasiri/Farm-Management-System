import React, { useState } from 'react';
import axios from 'axios';

function IncomeForm() {
  const [income, setIncome] = useState({ date: '', source: '', amount: '', notes: '' });

  const handleChange = (e) => setIncome({ ...income, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/income', income);
      alert('Income added!');
      setIncome({ date: '', source: '', amount: '', notes: '' });
    } catch (error) {
      alert('Error adding income');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-32">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 space-y-4 bg-white shadow-lg rounded-2xl"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">Add Income</h2>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Date</label>
          <input
            name="date"
            type="date"
            value={income.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Source</label>
          <input
            name="source"
            placeholder="Source"
            value={income.source}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Amount</label>
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={income.amount}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Notes</label>
          <textarea
            name="notes"
            placeholder="Notes"
            value={income.notes}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white transition duration-200 bg-green-500 rounded-lg hover:bg-green-600"
        >
          Add Income
        </button>
      </form>
    </div>
  );
}

export default IncomeForm;

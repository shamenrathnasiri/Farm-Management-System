import React, { useState } from 'react';
import axios from 'axios';
import {
  FaCalendarAlt,
  FaListAlt,
  FaMoneyBillWave,
  FaStickyNote
} from 'react-icons/fa';

function ExpenseForm() {
  const [expense, setExpense] = useState({ date: '', category: '', amount: '', notes: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => setExpense({ ...expense, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post('http://localhost:5000/api/expense', expense);
      alert('Expense added!');
      setExpense({ date: '', category: '', amount: '', notes: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center mt-32">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 space-y-4 bg-white shadow-lg rounded-2xl"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">Add Expense</h2>

        <div>
          <label className="flex items-center mb-1 text-sm font-medium text-gray-600">
            <FaCalendarAlt className="mr-2 text-green-500" />
            Date
          </label>
          <input
            name="date"
            type="date"
            value={expense.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="flex items-center mb-1 text-sm font-medium text-gray-600">
            <FaListAlt className="mr-2 text-green-500" />
            Category
          </label>
          <input
            name="category"
            placeholder="Category"
            value={expense.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="flex items-center mb-1 text-sm font-medium text-gray-600">
            <FaMoneyBillWave className="mr-2 text-green-500" />
            Amount
          </label>
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={expense.amount}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="flex items-center mb-1 text-sm font-medium text-gray-600">
            <FaStickyNote className="mr-2 text-green-500" />
            Notes
          </label>
          <textarea
            name="notes"
            placeholder="Notes"
            value={expense.notes}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full px-4 py-2 text-white transition duration-200 bg-green-500 rounded-lg hover:bg-green-600"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;

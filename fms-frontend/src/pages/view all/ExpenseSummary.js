import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseSummary = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const fetchFinanceData = async () => {
    try {
      const [incomeRes, expenseRes] = await Promise.all([
        axios.get('http://localhost:5000/api/income'),
        axios.get('http://localhost:5000/api/expense'),
      ]);
      setIncomeList(incomeRes.data);
      setExpenseList(expenseRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const deleteIncome = async (id) => {
    if (!window.confirm('Are you sure you want to delete this income?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/income/${id}`);
      setIncomeList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting income:', error);
      alert('Failed to delete income');
    }
  };

  const deleteExpense = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/expense/${id}`);
      setExpenseList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense');
    }
  };

  const totalIncome = incomeList.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenseList.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="max-w-5xl px-4 py-8 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-center text-green-800">💰 Finance Summary</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          {/* Income Table */}
          <div className="mb-12">
            <h3 className="mb-4 text-xl font-semibold text-green-600">Income</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-300">
                <thead className="bg-green-100">
                  <tr>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Source</th>
                    <th className="px-4 py-2 border">Amount (Rs.)</th>
                    <th className="px-4 py-2 border">Notes</th>
                    <th className="px-4 py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeList.map((item) => (
                    <tr key={item.id} className="hover:bg-green-50">
                      <td className="px-4 py-2 border">{item.date}</td>
                      <td className="px-4 py-2 border">{item.source}</td>
                      <td className="px-4 py-2 border">{item.amount.toFixed(2)}</td>
                      <td className="px-4 py-2 border">{item.notes || '-'}</td>
                      <td className="px-4 py-2 text-center border">
                        <button
                          onClick={() => deleteIncome(item.id)}
                          className="px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="font-semibold bg-green-200">
                    <td colSpan="3" className="px-4 py-2 text-right border">Total Income</td>
                    <td colSpan="2" className="px-4 py-2 border">{totalIncome.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Expense Table */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-red-600">Expense</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-300">
                <thead className="bg-red-100">
                  <tr>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Category</th>
                    <th className="px-4 py-2 border">Amount (Rs.)</th>
                    <th className="px-4 py-2 border">Notes</th>
                    <th className="px-4 py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseList.map((item) => (
                    <tr key={item.id} className="hover:bg-red-50">
                      <td className="px-4 py-2 border">{item.date}</td>
                      <td className="px-4 py-2 border">{item.category}</td>
                      <td className="px-4 py-2 border">{item.amount.toFixed(2)}</td>
                      <td className="px-4 py-2 border">{item.notes || '-'}</td>
                      <td className="px-4 py-2 text-center border">
                        <button
                          onClick={() => deleteExpense(item.id)}
                          className="px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="font-semibold bg-red-200">
                    <td colSpan="3" className="px-4 py-2 text-right border">Total Expense</td>
                    <td colSpan="2" className="px-4 py-2 border">{totalExpense.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Net Balance */}
          <div className="mt-10 text-center">
            <h3 className="text-xl font-bold">
              Net Balance:{' '}
              <span className={totalIncome - totalExpense >= 0 ? 'text-green-600' : 'text-red-600'}>
                Rs. {(totalIncome - totalExpense).toFixed(2)}
              </span>
            </h3>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseSummary;

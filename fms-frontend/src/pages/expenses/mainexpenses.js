import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainExpenses() {

  const navigate = useNavigate();

  return (
    <div className="p-4 mt-32">
      <h1 className="mb-4 text-xl font-bold">Farm Expenses Dashboard</h1>

      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/income')}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Go to Income Form
        </button>

        <button
          onClick={() => navigate('/expense')}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Go to Expense Form
        </button>
      </div>
    </div>
  );
}

export default MainExpenses;

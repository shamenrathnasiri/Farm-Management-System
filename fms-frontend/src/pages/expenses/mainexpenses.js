import React from 'react';
import { useNavigate } from 'react-router-dom';
import FinancePieChart from './FinancePieChart';
import bgimg from '../../images/expensmg.jpg';

function MainExpenses() {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover brightness-50 blur-sm"
        style={{ backgroundImage: `url(${bgimg})` }}
      />
      
      <div className="relative z-10 p-4 mt-32">
        <h1 className="mb-6 text-3xl font-bold text-center text-white drop-shadow-lg">
           Farm Expenses Dashboard
        </h1>

        <div className="flex items-center justify-center mb-10 space-x-6">
          <button
            onClick={() => navigate('/income')}
            className="px-5 py-2.5 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
          >
             Go to Income Form
          </button>

          <button
            onClick={() => navigate('/expense')}
            className="px-5 py-2.5 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            Go to Expense Form
          </button>
        </div>

        <div className="max-w-3xl p-12 mx-auto -mt-4 bg-white shadow-xl rounded-2xl">
          <FinancePieChart />
        </div>
      </div>
    </div>
  );
}

export default MainExpenses;

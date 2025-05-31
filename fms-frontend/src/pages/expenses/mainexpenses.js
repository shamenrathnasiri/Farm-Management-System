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

      <div className="relative z-10 flex flex-col items-center w-full p-8 mt-32 space-y-12 max-w-7xl md:flex-row md:items-start md:space-y-0 md:space-x-16">
        <div className="flex flex-col w-full max-w-xs space-y-6">
          <h1 className="mt-40 mb-6 text-3xl font-bold text-center text-white drop-shadow-lg md:text-left">
            Farm Expenses Dashboard
          </h1>

          <button
            onClick={() => navigate('/income')}
            className="px-5 py-3 text-lg font-semibold text-white transition bg-green-600 rounded-lg hover:bg-green-700"
          >
            Go to Income Form
          </button>

          <button
            onClick={() => navigate('/expense')}
            className="px-5 py-3 text-lg font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-700"
          >
            Go to Expense Form
          </button>
        </div>

        <div className="flex-1 max-w-4xl p-12 shadow-xl rounded-2xl">
          <FinancePieChart />
        </div>
      </div>
    </div>
  );
}

export default MainExpenses;

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/home';
import Addcrop from './pages/crop management/addcrop';
import Stock from './pages/stock/stock';
import Mainexpenses from './pages/expenses/mainexpenses';
import IncomeForm from './pages/expenses/IncomeForm';
import ExpenseForm from './pages/expenses/ExpenseForm';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addcrop" element={<Addcrop />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/mainexpenses" element={<Mainexpenses/>} />
          <Route path="/income" element={<IncomeForm />} />
          <Route path="/expense" element={<ExpenseForm />} />
        </Routes>
      
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/home';
import Addcrop from './pages/crop management/addcrop';
import Stock from './pages/stock/stock';
import Expenses from './pages/expenses/expenses';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addcrop" element={<Addcrop />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      
    </BrowserRouter>
  );
}

export default App;

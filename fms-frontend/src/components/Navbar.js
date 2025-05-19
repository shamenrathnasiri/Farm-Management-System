import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="fixed z-50 transform -translate-x-1/2 top-4 left-1/2">
      <div className="w-[1300px] h-16 bg-teal-700 flex items-center justify-center shadow-md rounded-2xl">
        <nav className="flex space-x-16 font-bold text-white">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/addcrop" className="hover:underline">Crop Management</Link>
          <Link to="/expenses" className="hover:underline">Expense & Income</Link>
          <Link to="/stock" className="hover:underline">Stock Management</Link>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;

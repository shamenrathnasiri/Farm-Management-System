import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button (visible only on small screens) */}
      <div className="fixed z-50 top-4 left-4 sm:hidden">
        <button
          onClick={toggleMenu}
          className="p-3 text-white bg-teal-700 rounded-lg focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Navbar - Desktop (visible on medium screens and up) */}
      <div className="fixed z-40 hidden transform -translate-x-1/2 top-4 left-1/2 sm:block">
        <div className="w-[1300px] h-16 bg-teal-700 flex items-center justify-center shadow-md rounded-2xl">
          <nav className="flex space-x-16 font-bold text-white">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/addcrop" className="hover:underline">Crop Management</Link>
            <Link to="/mainexpenses" className="hover:underline">Expense & Income</Link>
            <Link to="/stock" className="hover:underline">Stock Management</Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu (visible only when open on small screens) */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 sm:hidden" onClick={toggleMenu}></div>
      )}
      <div 
        className={`fixed z-40 top-0 left-0 w-64 h-full bg-teal-700 shadow-lg transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:hidden`}
      >
        <div className="flex flex-col items-start p-6 mt-16 space-y-8">
          <Link 
            to="/" 
            className="w-full py-3 text-xl font-bold text-white hover:underline"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link 
            to="/addcrop" 
            className="w-full py-3 text-xl font-bold text-white hover:underline"
            onClick={toggleMenu}
          >
            Crop Management
          </Link>
          <Link 
            to="/mainexpenses" 
            className="w-full py-3 text-xl font-bold text-white hover:underline"
            onClick={toggleMenu}
          >
            Expense & Income
          </Link>
          <Link 
            to="/stock" 
            className="w-full py-3 text-xl font-bold text-white hover:underline"
            onClick={toggleMenu}
          >
            Stock Management
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
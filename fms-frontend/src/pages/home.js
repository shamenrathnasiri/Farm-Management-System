import React from 'react';
import bg1 from '../images/homebg.jpg';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      
      <div className="absolute inset-0 bg-black opacity-60"></div>

     
      <div className="relative z-10 text-center">
        <h1 className="font-bold text-[45px] text-white mb-6">
          WELCOME TO FARM MANAGEMENT SYSTEM
        </h1>
        <button
          onClick={() => navigate('/viewall')}
          className="px-6 py-2 font-bold text-white bg-teal-600 rounded-md hover:bg-teal-800"
        >
          View All Details
        </button>
      </div>
    </div>
  );
}

export default Home;

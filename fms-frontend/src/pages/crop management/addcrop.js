import React, { useState } from 'react';
import axios from 'axios';
import bgimg from '../../images/cropmg.jpg';

const AddCrop = ({ onCropAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    crop_type: '',
    planted_date: '',
    harvest_date: '',
    quantity: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/crops', formData);
      console.log('Crop added:', response.data);
      onCropAdded?.();
      setFormData({
        name: '',
        crop_type: '',
        planted_date: '',
        harvest_date: '',
        quantity: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error adding crop:', error.response?.data || error.message);
      alert('Error adding crop: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black/60 to-green-900/70" />

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-4xl p-6 mt-24 border shadow-2xl backdrop-blur-md bg-white/60 rounded-xl border-white/30">
        <h2 className=" text-[30px] font-extrabold text-center text-green-800 drop-shadow-md">🌾 Add New Crop</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 md:grid-cols-2">

          {/* Input Field Template */}
          {[
            { label: 'Crop Name', name: 'name', placeholder: 'Enter crop name', type: 'text' },
            { label: 'Crop Type', name: 'crop_type', placeholder: 'Enter crop type', type: 'text' },
            { label: 'Planted Date', name: 'planted_date', type: 'date' },
            { label: 'Harvest Date', name: 'harvest_date', type: 'date' },
            { label: 'Quantity (kg)', name: 'quantity', placeholder: 'Enter quantity', type: 'number' }
          ].map(({ label, name, placeholder, type }) => (
            <div key={name} className="flex flex-col">
              <label className="mb-1 text-sm font-semibold text-gray-800">{label}</label>
              <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required={name !== 'harvest_date'} 
                className="p-3 text-base transition-all border border-gray-300 shadow-inner rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500"
              />
            </div>
          ))}

          {/* Notes */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 text-sm font-semibold text-gray-800">Notes</label>
            <textarea
              name="notes"
              placeholder="Additional notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="p-3 text-base transition-all border border-gray-300 shadow-inner resize-none rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 text-xl font-bold tracking-wide text-white transition duration-300 transform shadow-md bg-gradient-to-r from-green-600 to-green-800 rounded-xl hover:from-green-500 hover:to-green-700 hover:scale-105"
            >
               Add Crop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCrop;

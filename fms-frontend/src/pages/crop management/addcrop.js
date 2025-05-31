import React, { useState } from 'react';
import axios from 'axios';
import bgimg from '../../images/cropmg.jpg';
import { Leaf, CalendarDays, ClipboardList, FileText, BarChart } from 'lucide-react';

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

  const fields = [
    { label: 'Crop Name', name: 'name', placeholder: 'Enter crop name', type: 'text', icon: <Leaf size={16} /> },
    { label: 'Crop Type', name: 'crop_type', placeholder: 'Enter crop type', type: 'text', icon: <ClipboardList size={16} /> },
    { label: 'Planted Date', name: 'planted_date', type: 'date', icon: <CalendarDays size={16} /> },
    { label: 'Harvest Date', name: 'harvest_date', type: 'date', icon: <CalendarDays size={16} /> },
    { label: 'Quantity (kg)', name: 'quantity', placeholder: 'Enter quantity', type: 'number', icon: <BarChart size={16} /> }
  ];

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black/70 to-green-900/80" />

      <div className="relative z-10 w-full max-w-3xl px-6 py-8 mt-16 border shadow-lg bg-white/80 border-white/40 rounded-2xl backdrop-blur-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-green-900 drop-shadow-sm">
          🌱 Add Crop
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {fields.map(({ label, name, placeholder, type, icon }) => (
            <div key={name} className="flex flex-col space-y-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-green-900 select-none">
                {icon}
                {label}
              </label>
              <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required={name !== 'harvest_date'}
                className="w-full px-3 py-2 text-sm text-gray-800 transition-all duration-150 bg-white border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
              />
            </div>
          ))}

          <div className="flex flex-col sm:col-span-2">
            <label className="flex items-center gap-2 mb-1 text-xs font-semibold text-green-900 select-none">
              <FileText size={16} />
              Notes
            </label>
            <textarea
              name="notes"
              placeholder="Add any additional notes about the crop..."
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 text-sm text-gray-800 transition-all duration-150 bg-white border border-gray-300 rounded-lg shadow-inner resize-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
            ></textarea>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full px-5 py-3 text-lg font-semibold text-white transition-transform duration-200 transform rounded-lg shadow-md bg-gradient-to-r from-green-600 to-green-800 hover:scale-105 hover:from-green-500 hover:to-green-700"
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

// src/components/AddCrop.jsx
import React, { useState } from 'react';
import axios from 'axios';

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
      onCropAdded?.(); // Safe check
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
    <div className="max-w-5xl p-10 mx-auto mt-20 bg-white border border-gray-200 shadow-lg rounded-2xl">
      <h2 className="mb-8 text-3xl font-bold text-center text-green-700">Add New Crop</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Crop Name */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-gray-700">Crop Name</label>
          <input
            name="name"
            placeholder="Enter crop name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Crop Type */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-gray-700">Crop Type</label>
          <input
            name="crop_type"
            placeholder="Enter crop type"
            value={formData.crop_type}
            onChange={handleChange}
            required
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Planted Date */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-gray-700">Planted Date</label>
          <input
            name="planted_date"
            type="date"
            value={formData.planted_date}
            onChange={handleChange}
            required
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Harvest Date */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-gray-700">Harvest Date</label>
          <input
            name="harvest_date"
            type="date"
            value={formData.harvest_date}
            onChange={handleChange}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Quantity */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-gray-700">Quantity (kg)</label>
          <input
            name="quantity"
            type="number"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Notes */}
        <div className="flex flex-col col-span-2">
          <label className="mb-1 text-sm font-semibold text-gray-700">Notes</label>
          <textarea
            name="notes"
            placeholder="Additional notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition-colors bg-green-600 rounded-md hover:bg-green-700"
          >
            Add Crop
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCrop;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseSummary from './ExpenseSummary';

function ViewCrop() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/crops');
      setCrops(response.data);
    } catch (error) {
      console.error('Error fetching crops:', error);
      alert('Failed to fetch crops');
    }
  };

  const deleteCrop = async (id) => {
    if (!window.confirm('Are you sure you want to delete this crop?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/crops/${id}`);
      setCrops((prev) => prev.filter((crop) => crop.id !== id));
      alert('Crop deleted successfully');
    } catch (error) {
      console.error('Error deleting crop:', error);
      alert('Failed to delete crop');
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 mt-10 bg-gray-50 sm:px-8">
      <h2 className="mt-8 mb-10 text-3xl font-bold text-center text-green-800">🌾 Crop Summary</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="text-left text-green-800 bg-green-200">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Planted</th>
              <th className="px-6 py-3">Harvest</th>
              <th className="px-6 py-3">Quantity (kg)</th>
              <th className="px-6 py-3">Notes</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {crops.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500">
                  No crops found.
                </td>
              </tr>
            ) : (
              crops.map((crop) => (
                <tr key={crop.id} className="transition hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{crop.name}</td>
                  <td className="px-6 py-4">{crop.crop_type}</td>
                  <td className="px-6 py-4">{crop.planted_date}</td>
                  <td className="px-6 py-4">{crop.harvest_date || 'N/A'}</td>
                  <td className="px-6 py-4">{crop.quantity}</td>
                  <td className="px-6 py-4">{crop.notes || 'None'}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteCrop(crop.id)}
                      className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-16">
        <ExpenseSummary />
      </div>
    </div>
  );
}

export default ViewCrop;

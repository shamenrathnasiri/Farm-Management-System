import React, { useEffect, useState } from "react";
import axios from "axios";

function Stock() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: 0,
    unit: "",
    purchase_date: "",
    expiry_date: "",
    supplier: "",
    min_quantity: 0,
  });

  const [stock, setStock] = useState([]);

  const fetchStock = () => {
    axios.get("http://localhost:5000/api/stock").then((res) => {
      setStock(res.data);
    });
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/stock", form).then(() => {
      setForm({
        name: "",
        category: "",
        quantity: 0,
        unit: "",
        purchase_date: "",
        expiry_date: "",
        supplier: "",
        min_quantity: 0,
      });
      fetchStock();
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/stock/${id}`).then(() => {
      fetchStock();
    });
  };

  return (
    <div className="max-w-6xl p-6 mx-auto mt-16 ">
      <h2 className="mb-4 text-2xl font-bold text-center text-green-700">🌾 Farm Stock Management</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 mb-8 bg-white shadow md:grid-cols-2 rounded-xl">
        <h3 className="col-span-1 text-xl font-semibold text-center text-gray-800 md:col-span-2">Add New Stock</h3>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Quantity</label>
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Unit (kg/ltrs)</label>
          <input
            name="unit"
            placeholder="Unit"
            value={form.unit}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Purchase Date</label>
          <input
            name="purchase_date"
            type="date"
            value={form.purchase_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Expiry Date</label>
          <input
            name="expiry_date"
            type="date"
            value={form.expiry_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Supplier</label>
          <input
            name="supplier"
            placeholder="Supplier"
            value={form.supplier}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Minimum Quantity</label>
          <input
            name="min_quantity"
            type="number"
            placeholder="Min Quantity"
            value={form.min_quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="col-span-1 px-4 py-2 text-white transition bg-green-600 rounded md:col-span-2 hover:bg-green-700"
        >
          Add Stock
        </button>
      </form>

      {/* Stock Table */}
      <h3 className="mb-4 text-xl font-semibold text-gray-800">📋 All Stock Items</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="text-left bg-green-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Purchase Date</th>
              <th className="p-2 border">Expiry Date</th>
              <th className="p-2 border">Supplier</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.category}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">{item.unit}</td>
                <td className="p-2 border">{item.purchase_date}</td>
                <td className="p-2 border">{item.expiry_date}</td>
                <td className="p-2 border">{item.supplier}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 text-white transition bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {stock.length === 0 && (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No stock items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Stock;

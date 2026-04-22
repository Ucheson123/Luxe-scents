import React, { useState } from 'react';

export default function AdminDashboard() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Oud Wood Intense", price: 25000, stock: 3 }
  ]);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '' });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setInventory(inventory.map(item => item.id === editingId ? { ...formData, id: editingId } : item));
      setEditingId(null);
    } else {
      setInventory([...inventory, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: '', price: '', stock: '' });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        
        <header className="bg-gray-900 text-white p-6">
          <h1 className="text-2xl font-bold">Vendor Admin Panel</h1>
          <p className="text-sm text-gray-400">Manage your perfumes and pricing</p>
        </header>

        <div className="p-6">
          {/* Add/Edit Form */}
          <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200 transition-all hover:border-gray-300 shadow-sm">
            <h2 className="font-bold mb-4 text-gray-800">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input 
                type="text" name="name" placeholder="Perfume Name" 
                value={formData.name} onChange={handleInputChange} 
                className="border border-gray-300 p-2 rounded w-full transition-all duration-200 hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required 
              />
              <input 
                type="number" name="price" placeholder="Price (₦)" 
                value={formData.price} onChange={handleInputChange} 
                className="border border-gray-300 p-2 rounded w-full transition-all duration-200 hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required 
              />
              <input 
                type="number" name="stock" placeholder="Stock Level" 
                value={formData.stock} onChange={handleInputChange} 
                className="border border-gray-300 p-2 rounded w-full transition-all duration-200 hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required 
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold w-full md:w-auto transition-all duration-200 hover:bg-blue-700 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 focus:outline-none">
              {editingId ? 'Update Product' : 'Save Product'}
            </button>
          </form>

          {/* Product List */}
          <h2 className="font-bold mb-4 text-gray-800">Current Inventory</h2>
          <div className="space-y-3">
            {inventory.map(item => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300">
                
                {/* Item Details */}
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                  <div className="text-sm text-gray-500 mt-1">
                    <span className="font-medium text-amber-600">₦{Number(item.price).toLocaleString()}</span> 
                    <span className="mx-2">•</span> 
                    <span>Stock: <span className={item.stock < 5 ? "text-red-500 font-bold" : "text-gray-700"}>{item.stock}</span></span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button 
                    onClick={() => handleEdit(item)} 
                    className="bg-yellow-50 text-yellow-800 border border-yellow-300 px-4 py-2 rounded text-sm font-bold flex-1 sm:flex-none transition-all duration-200 hover:bg-yellow-100 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 active:scale-95 focus:outline-none"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded text-sm font-bold flex-1 sm:flex-none transition-all duration-200 hover:bg-red-100 focus:ring-2 focus:ring-red-400 focus:ring-offset-1 active:scale-95 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
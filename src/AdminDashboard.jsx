import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

export default function AdminDashboard() {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', desc: '', img: '' });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // --- CLOUDINARY CONFIG ---
  const uploadPreset = "luxe_scents_preset"; // e.g., luxe_scents_preset
  const dowqcefsg = "dowqcefsg"; // e.g., dxxkxyz

  // Real-time listener for Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "inventory"), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInventory(items);
    });
    return () => unsub();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Upload image directly to Cloudinary
  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    data.append("cloud_name", dowqcefsg);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${dowqcefsg}/image/upload`, {
        method: "POST",
        body: data,
      });
      const uploadedImage = await response.json();
      return uploadedImage.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let finalImgUrl = formData.img || "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=80";

      // If they selected a new file, upload to Cloudinary first
      if (imageFile) {
        finalImgUrl = await uploadToCloudinary(imageFile);
      }

      const productData = {
        name: formData.name,
        price: Number(formData.price),
        stock: Number(formData.stock),
        desc: formData.desc,
        img: finalImgUrl
      };

      if (editingId) {
        await updateDoc(doc(db, "inventory", editingId), productData);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "inventory"), productData);
      }

      // Reset form
      setFormData({ name: '', price: '', stock: '', desc: '', img: '' });
      setImageFile(null);
    } catch (error) {
      console.error("Error saving product: ", error);
      alert("Failed to save product. Check console.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, price: item.price, stock: item.stock, desc: item.desc || '', img: item.img || '' });
    setEditingId(item.id);
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "inventory", id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <header className="bg-gray-900 text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Vendor Admin</h1>
            <p className="text-sm text-gray-400">Database + Cloudinary Active</p>
          </div>
          <span className="bg-green-500 text-xs font-bold px-2 py-1 rounded text-white animate-pulse">Live</span>
        </header>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="font-bold mb-4 text-gray-800">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" name="name" placeholder="Perfume Name" value={formData.name} onChange={handleInputChange} className="border p-2 rounded w-full outline-none focus:ring-2 focus:ring-blue-500" required />
              <input type="number" name="price" placeholder="Price (₦)" value={formData.price} onChange={handleInputChange} className="border p-2 rounded w-full outline-none focus:ring-2 focus:ring-blue-500" required />
              <input type="text" name="desc" placeholder="Short Description" value={formData.desc} onChange={handleInputChange} className="border p-2 rounded w-full outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2" />
              <input type="number" name="stock" placeholder="Stock Level" value={formData.stock} onChange={handleInputChange} className="border p-2 rounded w-full outline-none focus:ring-2 focus:ring-blue-500" required />

              <div className="flex items-center gap-3 border p-2 rounded bg-white md:col-span-2">
                <input type="file" accept="image/*" onChange={handleImageSelect} className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 cursor-pointer" />
                {(imageFile || formData.img) && (
                  <img src={imageFile ? URL.createObjectURL(imageFile) : formData.img} alt="Preview" className="h-10 w-10 object-cover rounded border" />
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
                <button type="submit" disabled={isUploading} className="bg-blue-600 text-white px-4 py-2 rounded font-bold transition-all hover:bg-blue-700 active:scale-95 disabled:bg-blue-300 flex-1 md:flex-none">
                  {isUploading ? 'Uploading...' : (editingId ? 'Update Product' : 'Save Product')}
                </button>
                {editingId && (
                    <button type="button" onClick={() => {setEditingId(null); setFormData({ name: '', price: '', stock: '', desc: '', img: '' }); setImageFile(null);}} className="bg-gray-300 text-gray-800 px-4 py-2 rounded font-bold transition-all hover:bg-gray-400 flex-1 md:flex-none">
                        Cancel
                    </button>
                )}
            </div>
          </form>

          <h2 className="font-bold mb-4 text-gray-800">Current Inventory ({inventory.length})</h2>
          <div className="space-y-3">
            {inventory.map(item => (
              <div key={item.id} className="bg-white border rounded-lg p-4 flex flex-col sm:flex-row justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <img src={item.img} alt={item.name} className="h-16 w-16 object-cover rounded-md border" />
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">{item.name}</h3>
                    <div className="text-sm text-gray-500 mt-1">
                        <span className="font-medium text-amber-600">₦{Number(item.price).toLocaleString()}</span> 
                        <span className="mx-2">•</span> 
                        <span>Stock: <span className={item.stock < 5 ? "text-red-500 font-bold" : "text-gray-700"}>{item.stock}</span></span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0 items-center">
                  <button onClick={() => handleEdit(item)} className="bg-yellow-50 text-yellow-800 border border-yellow-300 px-4 py-2 rounded text-sm font-bold active:scale-95 flex-1 sm:flex-none">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded text-sm font-bold active:scale-95 flex-1 sm:flex-none">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import Storefront from './Storefront';
import AdminDashboard from './AdminDashboard';

function App() {
  const [view, setView] = useState('store');

  return (
    <div className="relative bg-gray-900 min-h-screen">
      {/* Dev Toggle Button */}
      <button 
        onClick={() => setView(view === 'store' ? 'admin' : 'store')} 
        className="fixed bottom-4 right-4 bg-indigo-600 text-white px-5 py-3 rounded-full shadow-lg text-sm font-bold z-50 transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 focus:ring-4 focus:ring-indigo-300 focus:outline-none active:scale-90"
      >
        Switch to {view === 'store' ? 'Admin' : 'Store'}
      </button>

      {view === 'store' ? <Storefront /> : <AdminDashboard />}
    </div>
  );
}

export default App;
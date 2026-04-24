import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Storefront from './Storefront';
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* The main public URL for the buyers */}
        <Route path="/" element={<Storefront />} />
        
        {/* The hidden admin URL for the vendor */}
        {/* Change 'vendor-dashboard-xyz' to anything you want to keep it a secret */}
        <Route path="/shop-owner-dashboard-xyz" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
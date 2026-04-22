import React from 'react';

const products = [
  { 
    id: 1, 
    name: "Oud Wood Intense", 
    price: 25000, 
    desc: "Strong masculine scent", 
    img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=80", 
    stock: 3 
  },
  { 
    id: 2, 
    name: "Vanilla Bloom", 
    price: 18000, 
    desc: "Sweet & fresh", 
    img: "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=500&q=80", 
    stock: 12 
  },
];

export default function Storefront() {
  const vendorWhatsApp = "2348000000000"; // Replace with vendor number

  const orderOnWhatsApp = (product) => {
    const message = `Hi, I want to order ${product.name} – ₦${product.price.toLocaleString()}`;
    const url = `https://wa.me/${vendorWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10 max-w-md mx-auto shadow-2xl sm:border-x">
      {/* Header */}
      <header className="bg-black text-white p-4 sticky top-0 z-50 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-widest">LUXE SCENTS</h1>
        <span className="text-sm">📍 Lagos</span>
      </header>

      {/* Hero Section */}
      <section className="bg-amber-50 p-6 text-center border-b border-amber-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Find Your Signature Scent</h2>
        <p className="text-gray-600 text-sm mb-4">Premium designer alternatives that last 48hrs.</p>
        <button className="bg-black text-white px-6 py-2 rounded-full font-medium w-full transition-all duration-200 hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 active:scale-95 focus:outline-none">
          Take the Scent Quiz
        </button>
      </section>

      {/* Product Grid */}
      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Top Sellers</h3>
          <span className="text-xs text-red-500 font-bold animate-pulse">🔥 Fast Selling</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {products.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
            >
              <img src={item.img} alt={item.name} className="w-full aspect-square object-cover rounded-md mb-2 transition-transform duration-500 group-hover:scale-[1.02]" />
              <h4 className="font-bold text-gray-800 text-sm truncate">{item.name}</h4>
              <p className="text-xs text-gray-500 mb-1">{item.desc}</p>
              <div className="text-amber-600 font-bold text-sm mb-2">₦{item.price.toLocaleString()}</div>
              
              {item.stock < 5 && (
                 <div className="text-[10px] text-red-500 mb-1">Only {item.stock} left!</div>
              )}

              <button 
                onClick={() => orderOnWhatsApp(item)}
                className="bg-green-500 text-white text-sm font-bold py-2 w-full rounded transition-all duration-200 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-95 focus:outline-none"
              >
                Order on WhatsApp
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
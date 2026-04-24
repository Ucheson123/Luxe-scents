import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Storefront() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const vendorWhatsApp = "2348000000000"; // Replace with vendor number

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "inventory"), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const orderOnWhatsApp = (product) => {
    const message = `Hi, I want to order:\n\n🛍 Product: ${product.name}\n💰 Price: ₦${Number(product.price).toLocaleString()}\n📍 Location: \n\nPlease how soon can I get it?`;
    const url = `https://wa.me/${vendorWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10 max-w-md mx-auto shadow-2xl sm:border-x">
      <header className="bg-black text-white p-4 sticky top-0 z-50 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-widest">LUXE SCENTS</h1>
        <span className="text-sm">📍 Lagos</span>
      </header>

      <section className="bg-amber-50 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Find Your Signature Scent</h2>
        <p className="text-gray-600 text-sm mb-4">Premium designer alternatives that last 48hrs.</p>
        <button className="bg-black text-white px-6 py-2 rounded-full font-medium w-full transition-all active:scale-95">
          Take the Scent Quiz
        </button>
      </section>

      <div className="bg-white py-3 border-y border-gray-200 flex justify-around text-[11px] sm:text-xs font-bold text-gray-700 shadow-sm mb-4">
        <span className="flex items-center gap-1">✅ 50+ Buyers</span>
        <span className="flex items-center gap-1">🚚 Fast Delivery</span>
        <span className="flex items-center gap-1">💵 Pay on Delivery</span>
      </div>

      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Top Sellers</h3>
          <span className="text-xs text-red-500 font-bold animate-pulse">🔥 Fast Selling</span>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading live inventory...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 py-10">Store is currently updating inventory...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {products.map((item) => (
              <div key={item.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1 group flex flex-col h-full">
                <img src={item.img} alt={item.name} className="w-full aspect-square object-cover rounded-md mb-2" />
                <h4 className="font-bold text-gray-800 text-sm truncate">{item.name}</h4>
                <p className="text-xs text-gray-500 mb-1 flex-grow">{item.desc || "Premium fragrance"}</p>
                <div className="text-amber-600 font-bold text-sm mb-2">₦{Number(item.price).toLocaleString()}</div>
                
                {item.stock > 0 && item.stock < 5 && <div className="text-[10px] text-red-500 mb-1 font-bold">Only {item.stock} left!</div>}
                {item.stock <= 0 && <div className="text-[10px] text-gray-500 mb-1 font-bold">Out of stock</div>}

                <button 
                  onClick={() => orderOnWhatsApp(item)}
                  disabled={item.stock <= 0}
                  className={`text-white text-sm font-bold py-2 w-full rounded mt-auto active:scale-95 ${item.stock <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                >
                  {item.stock <= 0 ? 'Sold Out' : 'Order on WhatsApp'}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
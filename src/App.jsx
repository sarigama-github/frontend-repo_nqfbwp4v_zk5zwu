import { useCallback, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedGrid from './components/FeaturedGrid';
import ShopGrid from './components/ShopGrid';
import CartCheckout from './components/CartCheckout';
import AdminSection from './components/AdminSection';
import Footer from './components/Footer';

export default function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = useCallback((item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  }, []);

  const handleRemove = useCallback((id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-[Poppins,Inter,ui-sans-serif]">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <FeaturedGrid />
        <ShopGrid onAddToCart={handleAddToCart} />
        <CartCheckout cart={cart} onRemove={handleRemove} />
        <AdminSection />
        {/* About & Contact */}
        <section id="about" className="py-16 sm:py-20 bg-gradient-to-b from-black via-zinc-900/30 to-black">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 text-transparent bg-clip-text mb-4">
              About Us
            </h3>
            <p className="text-zinc-300 leading-relaxed">
              VIYAN FASHION WORLD curates premium women’s dresses with a modern, luxurious touch. We focus on precision tailoring, exquisite fabrics, and limited-time collections that make every piece special.
            </p>
          </div>
        </section>
        <section id="contact" className="py-12 bg-black">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold text-yellow-300 mb-3">Contact</h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="https://wa.me/" target="_blank" className="px-4 py-2 rounded-full border border-yellow-700/60 text-yellow-300 hover:bg-yellow-700/10">WhatsApp</a>
              <a href="https://instagram.com/" target="_blank" className="px-4 py-2 rounded-full border border-yellow-700/60 text-yellow-300 hover:bg-yellow-700/10">Instagram</a>
              <a href="mailto:contact@viyanfashionworld.com" className="px-4 py-2 rounded-full border border-yellow-700/60 text-yellow-300 hover:bg-yellow-700/10">Email</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

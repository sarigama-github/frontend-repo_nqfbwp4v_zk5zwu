import { useEffect, useMemo, useState } from 'react';

const products = [
  {
    id: 'p1',
    name: 'Regal Gold Sequin Gown',
    price: 18999,
    discount: 30,
    endsInMinutes: 240, // 4h
    img: 'https://images.unsplash.com/photo-1542060748-10c28b62716b?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'p2',
    name: 'Midnight Velvet Dress',
    price: 13999,
    discount: 20,
    endsInMinutes: 360,
    img: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'p3',
    name: 'Satin Halo Midi',
    price: 10999,
    discount: 25,
    endsInMinutes: 180,
    img: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'p4',
    name: 'Opulent Tulle Dress',
    price: 15999,
    discount: 35,
    endsInMinutes: 120,
    img: 'https://images.unsplash.com/photo-1542060748-10c28b62716b?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'p5',
    name: 'Noir Column Gown',
    price: 17999,
    discount: 15,
    endsInMinutes: 600,
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'p6',
    name: 'Celeste Draped Maxi',
    price: 14999,
    discount: 28,
    endsInMinutes: 480,
    img: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop',
  },
];

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);
}

function useCountdown(minutes) {
  const end = useMemo(() => Date.now() + minutes * 60 * 1000, [minutes]);
  const [left, setLeft] = useState('');
  useEffect(() => {
    const id = setInterval(() => {
      const ms = end - Date.now();
      const sec = Math.max(0, Math.floor(ms / 1000));
      const h = String(Math.floor(sec / 3600)).padStart(2, '0');
      const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
      const s = String(sec % 60).padStart(2, '0');
      setLeft(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(id);
  }, [end]);
  return left;
}

export default function ShopGrid({ onAddToCart }) {
  return (
    <section className="bg-black py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <h3 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 text-transparent bg-clip-text">Shop Dresses</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, onAddToCart }) {
  const timeLeft = useCountdown(product.endsInMinutes);
  const discounted = Math.round(product.price * (1 - product.discount / 100));

  return (
    <div className="group rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40 hover:border-yellow-700/60 transition-colors">
      <div className="aspect-[4/5] overflow-hidden">
        <img src={product.img} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <h4 className="text-zinc-100 font-medium">{product.name}</h4>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-yellow-300 font-semibold">{formatINR(discounted)}</span>
          <span className="text-zinc-500 line-through text-sm">{formatINR(product.price)}</span>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-yellow-700/20 text-yellow-300">-{product.discount}%</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-yellow-300/90">
          <span>Offer ends in</span>
          <span className="font-mono">{timeLeft}</span>
        </div>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => onAddToCart?.({ id: product.id, name: product.name, price: discounted, img: product.img })}
            className="flex-1 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold shadow-[0_0_18px_rgba(234,179,8,0.45)] hover:shadow-[0_0_30px_rgba(234,179,8,0.75)] transition-shadow"
          >
            Add to Cart
          </button>
          <a href="#checkout" className="px-4 py-2 rounded-full border border-yellow-700/60 text-yellow-300 hover:bg-yellow-700/10">Buy</a>
        </div>
      </div>
    </div>
  );
}

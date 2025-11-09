import { useEffect, useState } from 'react';

const sample = [
  {
    id: '1',
    name: 'Aurora Silk Gown',
    price: 15999,
    discount: 25,
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Noir Velvet Dress',
    price: 12999,
    discount: 30,
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Gilded Evening Suit',
    price: 18999,
    discount: 20,
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Celeste Satin Midi',
    price: 9999,
    discount: 35,
    img: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop',
  },
];

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function FeaturedGrid() {
  const [endsAt] = useState(() => Date.now() + 1000 * 60 * 60 * 24); // 24h
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const id = setInterval(() => {
      const ms = endsAt - Date.now();
      const sec = Math.max(0, Math.floor(ms / 1000));
      const h = String(Math.floor(sec / 3600)).padStart(2, '0');
      const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
      const s = String(sec % 60).padStart(2, '0');
      setTimeLeft(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  return (
    <section id="shop" className="relative bg-black py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <h3 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 text-transparent bg-clip-text">
            Featured & Trending
          </h3>
          <div className="text-sm text-yellow-300/90">Offer ends in {timeLeft}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sample.map((p) => {
            const discounted = Math.round(p.price * (1 - p.discount / 100));
            return (
              <a key={p.id} href={`#product-${p.id}`} className="group rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40 hover:border-yellow-700/60 transition-colors">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={p.img} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h4 className="text-zinc-100 font-medium">{p.name}</h4>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-yellow-300 font-semibold">{formatINR(discounted)}</span>
                    <span className="text-zinc-500 line-through text-sm">{formatINR(p.price)}</span>
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-yellow-700/20 text-yellow-300">
                      -{p.discount}%
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

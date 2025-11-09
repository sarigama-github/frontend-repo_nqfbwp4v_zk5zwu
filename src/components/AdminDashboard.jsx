import { useEffect, useMemo, useState } from 'react';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function AdminDashboard({ token }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const backend = import.meta.env.VITE_BACKEND_URL;

  const fetchSettings = async () => {
    const res = await fetch(`${backend}/api/admin/settings?token=${token}`);
    const data = await res.json();
    setSettings(data);
  };
  const fetchProducts = async () => {
    const res = await fetch(`${backend}/api/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchSettings();
    fetchProducts();
  }, []);

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      const body = {
        username: form.get('username') || undefined,
        password: form.get('password') || undefined,
        upi_id: form.get('upi_id') || undefined,
        logo_url: form.get('logo_url') || undefined,
      };
      const res = await fetch(`${backend}/api/admin/settings?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Update failed');
      await fetchSettings();
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      const payload = {
        name: form.get('name'),
        description: form.get('description') || undefined,
        images: (form.get('images') || '').split(',').map(s => s.trim()).filter(Boolean),
        price: Number(form.get('price')),
        discount_percent: Number(form.get('discount_percent') || 0),
        sizes: (form.get('sizes') || '').split(',').map(s => s.trim()).filter(Boolean),
        offer_minutes: form.get('offer_minutes') ? Number(form.get('offer_minutes')) : undefined,
        is_active: true,
      };
      const res = await fetch(`${backend}/api/admin/products?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Create failed');
      e.currentTarget.reset();
      await fetchProducts();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${backend}/api/admin/products/${id}?token=${token}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      await fetchProducts();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black py-16 sm:py-20 border-t border-zinc-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 text-transparent bg-clip-text mb-6">Admin Dashboard</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6 lg:col-span-1">
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40">
              <h4 className="text-yellow-300 font-semibold mb-4">Settings</h4>
              {settings && (
                <form onSubmit={handleUpdateSettings} className="space-y-3">
                  <div>
                    <label className="block text-sm text-zinc-300 mb-1">Username</label>
                    <input name="username" defaultValue={settings.username} className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 text-zinc-100" />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-300 mb-1">New Password</label>
                    <input name="password" type="password" placeholder="••••••••" className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 text-zinc-100" />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-300 mb-1">UPI ID</label>
                    <input name="upi_id" defaultValue={settings.upi_id} className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 text-zinc-100" />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-300 mb-1">Logo URL</label>
                    <input name="logo_url" defaultValue={settings.logo_url || ''} className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 text-zinc-100" />
                  </div>
                  <button disabled={loading} className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold">Save Settings</button>
                </form>
              )}
            </div>

            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40">
              <h4 className="text-yellow-300 font-semibold mb-4">Add Product</h4>
              <form onSubmit={handleCreateProduct} className="space-y-3">
                <input name="name" placeholder="Name" required className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 text-zinc-100" />
                <textarea name="description" placeholder="Description" className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 text-zinc-100" />
                <input name="images" placeholder="Image URLs (comma separated)" className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 text-zinc-100" />
                <input name="price" type="number" placeholder="Price (INR)" required className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 text-zinc-100" />
                <input name="discount_percent" type="number" placeholder="Discount %" className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 text-zinc-100" />
                <input name="sizes" placeholder="Sizes (comma separated)" className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 text-zinc-100" />
                <input name="offer_minutes" type="number" placeholder="Offer minutes" className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 text-zinc-100" />
                <button disabled={loading} className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold">Create</button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40">
            <h4 className="text-yellow-300 font-semibold mb-4">Products</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {products.map((p) => (
                <div key={p.id} className="rounded-xl border border-zinc-800 bg-black/40 overflow-hidden">
                  {p.images?.[0] && (
                    <img src={p.images[0]} alt={p.name} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-4">
                    <div className="font-medium text-zinc-100">{p.name}</div>
                    <div className="text-sm text-zinc-400 line-clamp-2">{p.description}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-yellow-300 font-semibold">{formatINR(Math.round(p.price * (1 - (p.discount_percent||0)/100)))}</span>
                      <span className="text-zinc-500 line-through text-xs">{formatINR(p.price)}</span>
                      {p.discount_percent ? (
                        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-yellow-700/20 text-yellow-300">-{p.discount_percent}%</span>
                      ) : null}
                    </div>
                    <div className="mt-3 flex justify-between">
                      <button onClick={() => handleDelete(p.id)} className="text-xs px-3 py-1.5 rounded-full border border-yellow-700/60 text-yellow-300 hover:bg-yellow-700/10">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

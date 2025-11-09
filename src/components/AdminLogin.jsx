import { useState } from 'react';

export default function AdminLogin({ onLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      onLoggedIn?.(data.token);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40">
      <h3 className="text-xl font-semibold text-yellow-300 mb-4">Admin Login</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-zinc-300 mb-1">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black border border-zinc-800 text-zinc-100 focus:outline-none focus:border-yellow-600"
            placeholder="viyan fashion world"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black border border-zinc-800 text-zinc-100 focus:outline-none focus:border-yellow-600"
            placeholder="viyan@2023"
            required
          />
        </div>
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-5 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold shadow-[0_0_22px_rgba(234,179,8,0.45)] hover:shadow-[0_0_40px_rgba(234,179,8,0.75)] transition-shadow disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminSection() {
  const [token, setToken] = useState('');

  return (
    <section id="admin" className="bg-black py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!token ? (
          <AdminLogin onLoggedIn={setToken} />
        ) : (
          <AdminDashboard token={token} />
        )}
      </div>
    </section>
  );
}

import { ShoppingCart, User, Settings } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-b border-zinc-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 ring-2 ring-yellow-500/40 shadow-[0_0_20px_rgba(234,179,8,0.45)]" />
          <div className="leading-tight">
            <p className="text-xs tracking-[0.3em] text-zinc-300">VIYAN</p>
            <h1 className="text-lg font-semibold tracking-wide bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 text-transparent bg-clip-text">
              FASHION WORLD
            </h1>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-medium shadow-[0_0_20px_rgba(234,179,8,0.35)] hover:shadow-[0_0_35px_rgba(234,179,8,0.65)] transition-shadow">
            Shop Now
          </button>
          <button className="p-2 rounded-full border border-zinc-800 text-zinc-200 hover:border-yellow-600 hover:text-yellow-400 transition-colors" aria-label="Cart">
            <ShoppingCart size={20} />
          </button>
          <button className="p-2 rounded-full border border-zinc-800 text-zinc-200 hover:border-yellow-600 hover:text-yellow-400 transition-colors" aria-label="Account">
            <User size={20} />
          </button>
          <button className="p-2 rounded-full border border-zinc-800 text-zinc-200 hover:border-yellow-600 hover:text-yellow-400 transition-colors" aria-label="Admin">
            <Settings size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}

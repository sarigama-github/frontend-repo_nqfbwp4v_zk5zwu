export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 ring-2 ring-yellow-500/40 shadow-[0_0_20px_rgba(234,179,8,0.45)]" />
          <div className="leading-tight">
            <p className="text-xs tracking-[0.3em] text-zinc-300">VIYAN</p>
            <h2 className="text-lg font-semibold tracking-wide bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 text-transparent bg-clip-text">
              FASHION WORLD
            </h2>
          </div>
        </div>
        <div className="text-zinc-400 text-sm">
          <p>Luxury couture for every occasion. Crafted with precision and elegance.</p>
        </div>
        <div className="flex sm:justify-end gap-4 text-sm">
          <a href="https://wa.me/" target="_blank" className="text-zinc-300 hover:text-yellow-300">WhatsApp</a>
          <a href="https://instagram.com/" target="_blank" className="text-zinc-300 hover:text-yellow-300">Instagram</a>
          <a href="mailto:contact@viyanfashionworld.com" className="text-zinc-300 hover:text-yellow-300">Email</a>
        </div>
      </div>
      <div className="border-t border-zinc-800 py-4 text-center text-xs text-zinc-500">© {new Date().getFullYear()} VIYAN FASHION WORLD. All rights reserved.</div>
    </footer>
  );
}

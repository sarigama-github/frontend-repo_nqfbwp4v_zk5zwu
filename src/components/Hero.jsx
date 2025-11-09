import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-[88vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/JqBuM4DcZiGXqO-1/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Overlay gradients for luxe glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-300 text-transparent bg-clip-text drop-shadow"
          >
            VIYAN FASHION WORLD
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-4 text-zinc-300 max-w-xl"
          >
            Luxury women's couture with modern silhouettes. Discover limited-time offers on our most desired dresses.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#shop" className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold shadow-[0_0_25px_rgba(234,179,8,0.45)] hover:shadow-[0_0_45px_rgba(234,179,8,0.75)] transition-shadow">
              Shop Now
            </a>
            <a href="#about" className="px-6 py-3 rounded-full border border-yellow-700/60 text-yellow-300 hover:bg-yellow-700/10 transition-colors">
              About Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

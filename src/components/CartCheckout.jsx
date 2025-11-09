import { useMemo } from 'react';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function CartCheckout({ cart, upiId = 'viyan@upi', onRemove }) {
  const totals = useMemo(() => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const discount = 0; // already discounted prices used
    const total = subtotal - discount;
    return { subtotal, discount, total };
  }, [cart]);

  return (
    <section id="checkout" className="bg-black py-16 sm:py-20 border-t border-zinc-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 text-transparent bg-clip-text mb-6">Cart & Checkout</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.length === 0 && (
              <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 text-zinc-300">Your cart is empty.</div>
            )}
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-800 bg-zinc-900/40">
                <img src={item.img} alt={item.name} className="h-20 w-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="text-zinc-100 font-medium">{item.name}</div>
                  <div className="text-yellow-300">{formatINR(item.price)}</div>
                </div>
                <div className="text-sm text-zinc-400">Qty: {item.qty}</div>
                <button onClick={() => onRemove?.(item.id)} className="text-xs px-3 py-1 rounded-full border border-yellow-700/60 text-yellow-300 hover:bg-yellow-700/10">Remove</button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40">
              <div className="flex justify-between text-sm text-zinc-300">
                <span>Subtotal</span>
                <span>{formatINR(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-zinc-300 mt-2">
                <span>Discounts</span>
                <span>-{formatINR(totals.discount)}</span>
              </div>
              <div className="border-t border-zinc-800 my-4" />
              <div className="flex justify-between text-lg text-yellow-300 font-semibold">
                <span>Total</span>
                <span>{formatINR(totals.total)}</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40">
              <h4 className="text-yellow-300 font-semibold mb-3">UPI Payment</h4>
              <p className="text-sm text-zinc-300">Pay using UPI to the following ID and share the reference on WhatsApp/Email:</p>
              <div className="mt-3 px-4 py-2 rounded-full bg-black border border-yellow-700/60 text-yellow-300 inline-block select-all">
                {upiId}
              </div>
              <button className="mt-4 w-full px-5 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold shadow-[0_0_22px_rgba(234,179,8,0.45)] hover:shadow-[0_0_40px_rgba(234,179,8,0.75)] transition-shadow">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

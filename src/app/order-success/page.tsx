import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />
      <div className="max-w-lg mx-auto px-4 py-24 text-center animate-fade-in">
        <div className="text-8xl mb-6 animate-bounce-slow">🎉</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Order Placed!</h1>
        <p className="text-gray-500 mb-2">
          Thank you for your order. We'll start preparing your fresh dairy products right away!
        </p>
        <p className="text-amber-600 font-medium mb-8">
          Expected delivery: Today within 2–4 hours 🚚
        </p>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 mb-8 text-left">
          <h2 className="font-bold text-gray-700 mb-3">What happens next?</h2>
          <div className="space-y-3">
            {[
              { step: '1', label: 'Order Confirmed',    desc: 'We received your order',            done: true  },
              { step: '2', label: 'Preparing',          desc: 'Packing your fresh dairy products', done: false },
              { step: '3', label: 'Out for Delivery',   desc: 'On the way to your address',        done: false },
              { step: '4', label: 'Delivered',          desc: 'Enjoy your fresh products!',        done: false },
            ].map(s => (
              <div key={s.step} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                                 ${s.done ? 'bg-green-500 text-white' : 'bg-amber-100 text-amber-600'}`}>
                  {s.done ? '✓' : s.step}
                </div>
                <div>
                  <p className="font-medium text-gray-700 text-sm">{s.label}</p>
                  <p className="text-gray-400 text-xs">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop"
            className="px-8 py-3 bg-amber-500 text-white rounded-2xl font-semibold
                       hover:bg-amber-600 transition">
            Continue Shopping
          </Link>
          <Link href="/"
            className="px-8 py-3 bg-white text-amber-700 rounded-2xl font-semibold
                       border border-amber-200 hover:bg-amber-50 transition">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

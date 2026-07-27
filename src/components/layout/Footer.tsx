import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl text-white mb-3">
            <span>🥛</span> MilkMart
          </div>
          <p className="text-amber-300 text-sm leading-relaxed">
            Fresh dairy products delivered to your door every day. Farm to table quality you can trust.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <div className="space-y-2 text-sm">
            <Link href="/"      className="block hover:text-white transition">Home</Link>
            <Link href="/shop"  className="block hover:text-white transition">Shop</Link>
            <Link href="/cart"  className="block hover:text-white transition">Cart</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-3">Categories</h3>
          <div className="space-y-2 text-sm">
            <p>🥛 Fresh Milk</p>
            <p>🌿 Organic</p>
            <p>🍓 Flavored</p>
            <p>🧈 Butter & Cream</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-3">Contact</h3>
          <div className="space-y-2 text-sm">
            <p>📞 0300-1234567</p>
            <p>📧 info@milkmart.pk</p>
            <p>📍 Lahore, Pakistan</p>
            <p>🕐 Daily 6am – 10pm</p>
          </div>
        </div>
      </div>
      <div className="border-t border-amber-800 text-center py-4 text-amber-400 text-xs">
        © 2026 MilkMart. All rights reserved.
      </div>
    </footer>
  )
}

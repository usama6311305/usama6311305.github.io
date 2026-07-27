import Link        from 'next/link'
import Navbar       from '@/components/layout/Navbar'
import Footer       from '@/components/layout/Footer'
import ProductCard  from '@/components/shop/ProductCard'
import { products } from '@/lib/data'
import { ArrowRight, Truck, Shield, Clock, Leaf } from 'lucide-react'

export default function HomePage() {
  const featured = products.filter(p => p.badge === 'bestseller' || p.badge === 'new').slice(0, 4)

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)' }}
               className="py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-amber-200 text-amber-800 text-sm font-semibold
                             px-4 py-1.5 rounded-full mb-4">
              🌟 Fresh Daily Delivery
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900 leading-tight mb-4">
              Pure & Fresh<br />
              <span className="text-amber-600">Dairy Products</span>
            </h1>
            <p className="text-amber-800 text-lg mb-8 max-w-md">
              Farm-fresh milk, cream, butter and more — delivered straight to your doorstep every morning.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link href="/shop"
                className="flex items-center justify-center gap-2 bg-amber-600 text-white
                           px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-amber-700
                           transition active:scale-95">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link href="/signup"
                className="flex items-center justify-center gap-2 bg-white text-amber-700
                           px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-amber-50
                           transition border border-amber-200">
                Get Started
              </Link>
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-[140px] leading-none animate-bounce-slow">🥛</div>
            <div className="flex justify-center gap-4 mt-4">
              <span className="text-5xl">🧈</span>
              <span className="text-5xl">🍦</span>
              <span className="text-5xl">🫙</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Truck size={28} />,   title: 'Free Delivery',    desc: 'On orders above Rs 500',  color: 'text-blue-500',   bg: 'bg-blue-50'   },
            { icon: <Clock size={28} />,   title: 'Daily Fresh',      desc: 'Collected every morning', color: 'text-green-500',  bg: 'bg-green-50'  },
            { icon: <Shield size={28} />,  title: '100% Pure',        desc: 'No additives or hormones',color: 'text-amber-500',  bg: 'bg-amber-50'  },
            { icon: <Leaf size={28} />,    title: 'Organic Options',  desc: 'Certified organic range', color: 'text-emerald-500',bg: 'bg-emerald-50'},
          ].map(f => (
            <div key={f.title} className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-md transition">
              <div className={`inline-flex p-3 rounded-xl ${f.bg} ${f.color} mb-3`}>{f.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="py-14 px-4 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
              <p className="text-gray-500 mt-1">Our most loved dairy products</p>
            </div>
            <Link href="/shop"
              className="flex items-center gap-1.5 text-amber-600 font-medium hover:gap-3 transition-all">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-4 bg-amber-600">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: '5,000+', label: 'Happy Customers' },
            { value: '12',     label: 'Products'         },
            { value: '50+',    label: 'Farm Partners'    },
            { value: '4.8★',   label: 'Average Rating'   },
          ].map(s => (
            <div key={s.label}>
              <div className="text-4xl font-bold mb-1">{s.value}</div>
              <div className="text-amber-200 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Ready to order?</h2>
        <p className="text-gray-500 mb-8">Create an account and get your first order delivered today!</p>
        <Link href="/signup"
          className="inline-flex items-center gap-2 bg-amber-500 text-white px-10 py-4
                     rounded-2xl font-semibold text-lg hover:bg-amber-600 transition active:scale-95">
          Create Free Account <ArrowRight size={20} />
        </Link>
      </section>

      <Footer />
    </div>
  )
}

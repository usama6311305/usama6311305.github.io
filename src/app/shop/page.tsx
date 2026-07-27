'use client'

import { useState }    from 'react'
import Navbar           from '@/components/layout/Navbar'
import Footer           from '@/components/layout/Footer'
import ProductCard      from '@/components/shop/ProductCard'
import { products, categories } from '@/lib/data'
import { Search, SlidersHorizontal } from 'lucide-react'

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating'

export default function ShopPage() {
  const [category, setCategory] = useState('all')
  const [search,   setSearch]   = useState('')
  const [sort,     setSort]     = useState<SortOption>('default')
  const [showOnly, setShowOnly] = useState<'all' | 'instock'>('all')

  const filtered = products
    .filter(p => category === 'all' || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => showOnly === 'all' || p.inStock)
    .sort((a, b) => {
      if (sort === 'price-asc')  return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating')     return b.rating - a.rating
      return 0
    })

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">Our Products</h1>
          <p className="text-amber-100">Fresh dairy delivered daily · {products.length} products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-3
                          border border-amber-100 shadow-sm">
            <Search size={18} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3
                          border border-amber-100 shadow-sm">
            <SlidersHorizontal size={16} className="text-gray-400" />
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              className="outline-none text-sm text-gray-700 bg-transparent"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
          <button
            onClick={() => setShowOnly(s => s === 'all' ? 'instock' : 'all')}
            className={`px-4 py-3 rounded-xl text-sm font-medium border transition
              ${showOnly === 'instock'
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-white text-gray-600 border-amber-100 hover:border-amber-300'}`}
          >
            {showOnly === 'instock' ? '✅ In Stock Only' : 'In Stock Only'}
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
                          whitespace-nowrap transition
                          ${category === c.id
                            ? 'bg-amber-500 text-white'
                            : 'bg-white text-gray-600 hover:bg-amber-50 border border-amber-100'}`}
            >
              <span>{c.emoji}</span> {c.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-gray-500 text-sm mb-4">{filtered.length} products found</p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-medium">No products found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

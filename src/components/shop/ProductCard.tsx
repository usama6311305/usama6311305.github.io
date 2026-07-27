'use client'

import { Product }      from '@/types'
import { useCartStore } from '@/lib/store'
import { ShoppingCart, Star, Plus, Check } from 'lucide-react'
import { useState } from 'react'

const badgeStyles: Record<string, string> = {
  bestseller: 'bg-amber-500 text-white',
  new:        'bg-green-500 text-white',
  organic:    'bg-emerald-600 text-white',
  sale:       'bg-red-500 text-white',
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore(s => s.addItem)
  const [added, setAdded] = useState(false)

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : null

  function handleAdd() {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden
                     card-hover flex flex-col ${!product.inStock ? 'opacity-60' : ''}`}>
      {/* Image area */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-100 p-8 text-center relative">
        <span className="text-6xl">{product.emoji}</span>

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full
                            ${badgeStyles[product.badge]}`}>
            {product.badge.toUpperCase()}
          </span>
        )}

        {/* Out of stock */}
        {!product.inStock && (
          <span className="absolute top-3 right-3 bg-gray-500 text-white text-xs
                           font-bold px-2 py-1 rounded-full">
            OUT OF STOCK
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-800 text-sm leading-snug">{product.name}</h3>
        </div>

        <p className="text-gray-500 text-xs mb-2 line-clamp-2 flex-1">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
          <span className="text-xs text-gray-400 ml-auto">{product.unit}</span>
        </div>

        {/* Price + Add button */}
        <div className="flex items-center justify-between">
          <div>
            {discountedPrice ? (
              <div>
                <span className="font-bold text-amber-700 text-lg">
                  Rs {Math.round(discountedPrice)}
                </span>
                <span className="text-xs text-gray-400 line-through ml-1">Rs {product.price}</span>
              </div>
            ) : (
              <span className="font-bold text-amber-700 text-lg">Rs {product.price}</span>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium
                        transition-all duration-200
                        ${added
                          ? 'bg-green-500 text-white'
                          : 'bg-amber-500 text-white hover:bg-amber-600 active:scale-95'}
                        disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
          >
            {added ? <Check size={16} /> : <Plus size={16} />}
            {added ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

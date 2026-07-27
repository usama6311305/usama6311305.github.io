'use client'

import Link            from 'next/link'
import Navbar          from '@/components/layout/Navbar'
import Footer          from '@/components/layout/Footer'
import { useCartStore } from '@/lib/store'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCartStore()
  const cartTotal = total()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-amber-50">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <p className="text-7xl mb-6">🛒</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Add some fresh dairy products to get started!</p>
          <Link href="/shop"
            className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-3
                       rounded-2xl font-semibold hover:bg-amber-600 transition">
            <ShoppingBag size={18} /> Browse Products
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Shopping Cart ({items.length} items)</h1>
          <button onClick={clearCart}
            className="text-sm text-red-400 hover:text-red-600 transition flex items-center gap-1">
            <Trash2 size={14} /> Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-3">
            {items.map(item => {
              const price = item.product.discount
                ? item.product.price * (1 - item.product.discount / 100)
                : item.product.price
              return (
                <div key={item.product.id}
                  className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-amber-100">
                  {/* Emoji */}
                  <div className="bg-amber-50 rounded-xl p-4 text-4xl shrink-0">
                    {item.product.emoji}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">{item.product.name}</h3>
                    <p className="text-gray-400 text-xs">{item.product.unit}</p>
                    <p className="text-amber-600 font-bold mt-1">Rs {Math.round(price)}</p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center
                                 hover:bg-amber-200 transition text-amber-700">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-semibold text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center
                                 hover:bg-amber-200 transition text-amber-700">
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right shrink-0 min-w-[70px]">
                    <p className="font-bold text-gray-800">Rs {Math.round(price * item.quantity)}</p>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-400 hover:text-red-600 transition mt-1">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 sticky top-20">
              <h2 className="font-bold text-gray-800 text-lg mb-4">Order Summary</h2>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs {Math.round(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={cartTotal >= 500 ? 'text-green-600 font-medium' : ''}>
                    {cartTotal >= 500 ? 'FREE' : 'Rs 80'}
                  </span>
                </div>
                {cartTotal < 500 && (
                  <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
                    Add Rs {Math.round(500 - cartTotal)} more for free delivery!
                  </p>
                )}
              </div>

              <div className="border-t border-amber-100 pt-4 mb-4">
                <div className="flex justify-between font-bold text-lg text-gray-800">
                  <span>Total</span>
                  <span className="text-amber-700">
                    Rs {Math.round(cartTotal + (cartTotal >= 500 ? 0 : 80))}
                  </span>
                </div>
              </div>

              <Link href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white
                           py-3 rounded-xl font-semibold hover:bg-amber-600 transition active:scale-95">
                Checkout <ArrowRight size={18} />
              </Link>

              <Link href="/shop"
                className="w-full flex items-center justify-center mt-3 text-sm text-amber-600
                           hover:text-amber-700 transition">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

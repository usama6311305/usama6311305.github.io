'use client'

import { useState }     from 'react'
import { useRouter }    from 'next/navigation'
import Navbar           from '@/components/layout/Navbar'
import { useCartStore } from '@/lib/store'
import { CreditCard, Smartphone, Banknote, ChevronRight } from 'lucide-react'

type PayMethod = 'cash' | 'card' | 'jazzcash' | 'easypaisa'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCartStore()
  const cartTotal = total()
  const delivery  = cartTotal >= 500 ? 0 : 80
  const grandTotal = cartTotal + delivery

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '',
  })
  const [payment, setPayment] = useState<PayMethod>('cash')
  const [loading, setLoading] = useState(false)
  const [errors,  setErrors]  = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    if (!form.phone.trim())   e.phone   = 'Phone is required'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city.trim())    e.city    = 'City is required'
    return e
  }

  async function handleOrder() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    setLoading(true)
    await new Promise(r => setTimeout(r, 1500)) // simulate API call
    clearCart()
    router.push('/order-success')
  }

  const payMethods = [
    { id: 'cash',      label: 'Cash on Delivery', icon: <Banknote size={20} />,    desc: 'Pay when delivered' },
    { id: 'card',      label: 'Credit / Debit Card', icon: <CreditCard size={20} />, desc: 'Visa, Mastercard' },
    { id: 'jazzcash',  label: 'JazzCash',          icon: <Smartphone size={20} />,  desc: 'Mobile wallet'     },
    { id: 'easypaisa', label: 'EasyPaisa',         icon: <Smartphone size={20} />,  desc: 'Mobile wallet'     },
  ]

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 space-y-4">
            {/* Delivery info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                📦 Delivery Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'name',    label: 'Full Name',    placeholder: 'Ahmed Ali',            type: 'text'  },
                  { key: 'email',   label: 'Email',        placeholder: 'ahmed@gmail.com',       type: 'email' },
                  { key: 'phone',   label: 'Phone Number', placeholder: '03001234567',           type: 'tel'   },
                  { key: 'city',    label: 'City',         placeholder: 'Lahore',                type: 'text'  },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none
                                  transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100
                                  ${errors[f.key] ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {errors[f.key] && <p className="text-red-500 text-xs mt-1">{errors[f.key]}</p>}
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                  <textarea
                    placeholder="House No, Street, Area..."
                    value={form.address}
                    onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                    rows={2}
                    className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none resize-none
                                transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100
                                ${errors.address ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
              <h2 className="font-bold text-gray-800 mb-4">💳 Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {payMethods.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setPayment(m.id as PayMethod)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition
                      ${payment === m.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-200'}`}
                  >
                    <div className={`${payment === m.id ? 'text-amber-600' : 'text-gray-400'}`}>
                      {m.icon}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${payment === m.id ? 'text-amber-700' : 'text-gray-700'}`}>
                        {m.label}
                      </p>
                      <p className="text-xs text-gray-400">{m.desc}</p>
                    </div>
                    {payment === m.id && (
                      <div className="ml-auto w-4 h-4 bg-amber-500 rounded-full flex items-center
                                      justify-center text-white text-xs">✓</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 sticky top-20">
              <h2 className="font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {items.map(i => (
                  <div key={i.product.id} className="flex items-center gap-2 text-sm">
                    <span>{i.product.emoji}</span>
                    <span className="flex-1 text-gray-600 truncate">{i.product.name}</span>
                    <span className="text-gray-500 shrink-0">×{i.quantity}</span>
                    <span className="font-medium shrink-0">Rs {i.product.price * i.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-amber-100 pt-3 space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span><span>Rs {Math.round(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? 'text-green-600 font-medium' : ''}>
                    {delivery === 0 ? 'FREE' : `Rs ${delivery}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-800 pt-2 border-t border-amber-100">
                  <span>Total</span>
                  <span className="text-amber-700">Rs {Math.round(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleOrder}
                disabled={loading || items.length === 0}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-amber-500 text-white
                           py-3 rounded-xl font-semibold hover:bg-amber-600 transition active:scale-95
                           disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Placing Order...
                  </span>
                ) : (
                  <>Place Order <ChevronRight size={18} /></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

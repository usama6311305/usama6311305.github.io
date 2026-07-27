'use client'

import { useState }  from 'react'
import Link          from 'next/link'
import Navbar        from '@/components/layout/Navbar'
import { products as initialProducts } from '@/lib/data'
import { Product }   from '@/types'
import { ArrowLeft, Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'

export default function AdminProductsPage() {
  const [prods, setProds] = useState<Product[]>(initialProducts)
  const [editing, setEditing] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)

  function toggleStock(id: string) {
    setProds(prev => prev.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p))
  }

  function deleteProduct(id: string) {
    if (confirm('Delete this product?')) {
      setProds(prev => prev.filter(p => p.id !== id))
    }
  }

  function handleEdit(p: Product) {
    setEditing(p)
    setShowForm(true)
  }

  function handleSave(updated: Product) {
    if (editing) {
      setProds(prev => prev.map(p => p.id === updated.id ? updated : p))
    } else {
      setProds(prev => [...prev, { ...updated, id: Date.now().toString() }])
    }
    setShowForm(false)
    setEditing(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard"
              className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition">
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Products ({prods.length})</h1>
          </div>
          <button
            onClick={() => { setEditing(null); setShowForm(true) }}
            className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-xl
                       text-sm font-medium hover:bg-amber-600 transition">
            <Plus size={16} /> Add Product
          </button>
        </div>

        {/* Product table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Product', 'Category', 'Price', 'Unit', 'Stock', 'Rating', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {prods.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{p.emoji}</span>
                        <div>
                          <p className="font-medium text-gray-800">{p.name}</p>
                          {p.badge && (
                            <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full capitalize">
                              {p.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize text-gray-600">{p.category}</td>
                    <td className="px-4 py-3 font-bold text-amber-700">Rs {p.price}</td>
                    <td className="px-4 py-3 text-gray-600">{p.unit}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleStock(p.id)}
                        className={`flex items-center gap-1.5 text-xs font-medium transition
                          ${p.inStock ? 'text-green-600' : 'text-red-400'}`}>
                        {p.inStock
                          ? <><ToggleRight size={18} /> In Stock</>
                          : <><ToggleLeft size={18} /> Out of Stock</>}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-yellow-500">★</span> {p.rating}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(p)}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {showForm && (
        <ProductFormModal
          product={editing}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditing(null) }}
        />
      )}
    </div>
  )
}

function ProductFormModal({
  product, onSave, onClose,
}: {
  product: Product | null
  onSave: (p: Product) => void
  onClose: () => void
}) {
  const [form, setForm] = useState<Partial<Product>>(product ?? {
    name: '', description: '', price: 0, unit: '1 Liter',
    category: 'fresh', emoji: '🥛', inStock: true, rating: 4.5, reviews: 0,
  })

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="font-bold text-gray-800 text-lg mb-4">
          {product ? 'Edit Product' : 'Add Product'}
        </h2>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {[
            { key: 'name',        label: 'Name',        type: 'text'   },
            { key: 'description', label: 'Description', type: 'text'   },
            { key: 'price',       label: 'Price (Rs)',  type: 'number' },
            { key: 'unit',        label: 'Unit',        type: 'text'   },
            { key: 'emoji',       label: 'Emoji',       type: 'text'   },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs font-medium text-gray-600 mb-1">{f.label}</label>
              <input
                type={f.type}
                value={form[f.key as keyof Product] as string ?? ''}
                onChange={e => setForm(p => ({ ...p, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none
                           focus:border-amber-400 transition"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
            <select
              value={form.category}
              onChange={e => setForm(p => ({ ...p, category: e.target.value as Product['category'] }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none">
              {['fresh', 'organic', 'flavored', 'cream', 'butter', 'yogurt'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium
                       text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={() => onSave(form as Product)}
            className="flex-1 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-medium
                       hover:bg-amber-600 transition">
            Save Product
          </button>
        </div>
      </div>
    </div>
  )
}

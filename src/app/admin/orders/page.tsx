'use client'

import { useState }   from 'react'
import Link           from 'next/link'
import Navbar         from '@/components/layout/Navbar'
import { mockOrders } from '@/lib/data'
import { ArrowLeft, Search } from 'lucide-react'

const statusColors: Record<string, string> = {
  pending:    'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirmed:  'bg-blue-100 text-blue-700 border-blue-200',
  delivering: 'bg-purple-100 text-purple-700 border-purple-200',
  delivered:  'bg-green-100 text-green-700 border-green-200',
  cancelled:  'bg-red-100 text-red-700 border-red-200',
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = orders
    .filter(o => filter === 'all' || o.status === filter)
    .filter(o =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase())
    )

  function updateStatus(id: string, status: string) {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: status as typeof o.status } : o))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/dashboard"
            className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-2.5
                          border border-gray-200 shadow-sm">
            <Search size={16} className="text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search orders or customers..."
              className="flex-1 outline-none text-sm text-gray-700"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'confirmed', 'delivering', 'delivered'].map(s => (
              <button key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition capitalize
                  ${filter === s ? 'bg-amber-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Order ID', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-mono font-bold text-amber-700">{order.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">{order.customer.name}</p>
                      <p className="text-gray-400 text-xs">{order.customer.city}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{order.items.length} items</td>
                    <td className="px-4 py-3 font-bold text-gray-800">Rs {order.total}</td>
                    <td className="px-4 py-3">
                      <span className="capitalize text-gray-600">{order.payment.method}</span>
                      <br />
                      <span className={`text-xs ${order.payment.status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {order.payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border capitalize
                                        ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none
                                   focus:border-amber-400 bg-white text-gray-700"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="delivering">Delivering</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-4xl mb-2">📭</p>
              <p>No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

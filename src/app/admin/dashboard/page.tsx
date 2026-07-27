'use client'

import Link             from 'next/link'
import Navbar           from '@/components/layout/Navbar'
import { mockOrders, products } from '@/lib/data'
import { ShoppingBag, Users, TrendingUp, Package, ArrowRight, CheckCircle, Clock, Truck } from 'lucide-react'

const statusConfig = {
  pending:    { label: 'Pending',    color: 'bg-yellow-100 text-yellow-700', icon: <Clock size={14} />       },
  confirmed:  { label: 'Confirmed',  color: 'bg-blue-100 text-blue-700',    icon: <CheckCircle size={14} /> },
  delivering: { label: 'Delivering', color: 'bg-purple-100 text-purple-700',icon: <Truck size={14} />       },
  delivered:  { label: 'Delivered',  color: 'bg-green-100 text-green-700',  icon: <CheckCircle size={14} /> },
  cancelled:  { label: 'Cancelled',  color: 'bg-red-100 text-red-700',      icon: null                      },
}

export default function AdminDashboard() {
  const totalRevenue = mockOrders.reduce((s, o) => s + o.total, 0)
  const inStock      = products.filter(p => p.inStock).length

  const stats = [
    { label: 'Total Orders',   value: mockOrders.length, icon: <ShoppingBag size={24} />, color: 'bg-blue-500',   trend: '+12%'  },
    { label: 'Revenue (PKR)',  value: `Rs ${totalRevenue.toLocaleString()}`, icon: <TrendingUp size={24} />, color: 'bg-green-500',  trend: '+8%'   },
    { label: 'Products',       value: products.length,   icon: <Package size={24} />,    color: 'bg-amber-500',  trend: `${inStock} in stock` },
    { label: 'Customers',      value: 142,               icon: <Users size={24} />,      color: 'bg-purple-500', trend: '+5 today'  },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">Welcome back! Here's what's happening.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/products"
              className="px-4 py-2 bg-amber-500 text-white rounded-xl text-sm font-medium
                         hover:bg-amber-600 transition">
              Manage Products
            </Link>
            <Link href="/admin/orders"
              className="px-4 py-2 bg-white text-gray-700 rounded-xl text-sm font-medium
                         border border-gray-200 hover:bg-gray-50 transition">
              View Orders
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className={`${s.color} text-white p-2.5 rounded-xl`}>{s.icon}</div>
                <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
                  {s.trend}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Recent Orders</h2>
              <Link href="/admin/orders"
                className="text-amber-600 text-sm flex items-center gap-1 hover:gap-2 transition-all">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {mockOrders.map(order => {
                const cfg = statusConfig[order.status as keyof typeof statusConfig]
                return (
                  <div key={order.id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition">
                    <div className="bg-amber-100 text-amber-700 font-bold text-xs px-2 py-1 rounded-lg shrink-0">
                      {order.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm">{order.customer.name}</p>
                      <p className="text-gray-400 text-xs">{order.items.length} items · {order.customer.city}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-gray-800 text-sm">Rs {order.total}</p>
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${cfg.color}`}>
                        {cfg.icon} {cfg.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top products */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-gray-800 mb-4">Top Products</h2>
            <div className="space-y-3">
              {products.filter(p => p.badge === 'bestseller' || p.rating >= 4.8).slice(0, 5).map(p => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-2xl">{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{p.name}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-xs">★</span>
                      <span className="text-xs text-gray-400">{p.rating} ({p.reviews})</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-amber-700 shrink-0">Rs {p.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

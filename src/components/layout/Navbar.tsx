'use client'

import Link             from 'next/link'
import { usePathname }  from 'next/navigation'
import { useCartStore, useAuthStore } from '@/lib/store'
import { ShoppingCart, User, LogOut, LayoutDashboard, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const pathname  = usePathname()
  const count     = useCartStore(s => s.count)()
  const { user, logout } = useAuthStore()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/',      label: 'Home'     },
    { href: '/shop',  label: 'Shop'     },
    { href: '/cart',  label: 'Cart'     },
  ]

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-amber-700">
          <span className="text-2xl">🥛</span>
          <span>MilkMart</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition
                ${pathname === l.href
                  ? 'bg-amber-100 text-amber-700'
                  : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700'}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <Link href="/cart" className="relative p-2 rounded-xl hover:bg-amber-50 transition">
            <ShoppingCart size={22} className="text-gray-600" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs
                               rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              {user.role === 'admin' && (
                <Link href="/admin/dashboard"
                  className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 text-white
                             rounded-xl text-sm font-medium hover:bg-amber-600 transition">
                  <LayoutDashboard size={16} />
                  Admin
                </Link>
              )}
              <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-xl">
                <User size={16} className="text-amber-600" />
                <span className="text-sm text-amber-700 font-medium">{user.name}</span>
              </div>
              <button onClick={logout}
                className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link href="/login"
                className="px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50 rounded-xl transition">
                Login
              </Link>
              <Link href="/signup"
                className="px-4 py-2 text-sm font-medium bg-amber-500 text-white rounded-xl
                           hover:bg-amber-600 transition">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile menu */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-amber-50 transition">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-amber-100 px-4 py-3 space-y-1">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-amber-50">
              {l.label}
            </Link>
          ))}
          {!user ? (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded-xl text-sm text-amber-700 hover:bg-amber-50">
                Login
              </Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded-xl text-sm bg-amber-500 text-white text-center">
                Sign Up
              </Link>
            </>
          ) : (
            <button onClick={() => { logout(); setMenuOpen(false) }}
              className="w-full text-left px-4 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  )
}

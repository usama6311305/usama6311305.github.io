'use client'

import { useState }    from 'react'
import Link            from 'next/link'
import { useRouter }   from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import { Eye, EyeOff, LogIn } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const login  = useAuthStore(s => s.login)

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleLogin() {
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const ok = login(email, password)
    setLoading(false)
    if (ok) {
      router.push(email === 'admin@milkshop.com' ? '/admin/dashboard' : '/')
    } else {
      setError('Invalid email or password. (Password must be 6+ characters)')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <span className="text-6xl">🥛</span>
            <span className="text-2xl font-bold text-amber-700">MilkMart</span>
          </Link>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 border border-amber-100">
          <h1 className="text-xl font-bold text-gray-800 mb-6">Welcome back!</h1>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4 border border-red-200">
              {error}
            </div>
          )}

          {/* Admin hint */}
          <div className="bg-amber-50 text-amber-700 text-xs px-3 py-2 rounded-xl mb-4 border border-amber-200">
            <strong>Admin login:</strong> admin@milkshop.com / admin123
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none
                           focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm outline-none
                             focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                />
                <button onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white
                         py-3 rounded-xl font-semibold hover:bg-amber-600 transition active:scale-95
                         disabled:bg-amber-300 disabled:cursor-not-allowed"
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                : <><LogIn size={18} /> Sign In</>}
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-amber-600 font-medium hover:underline">
              Sign up free
            </Link>
          </p>
        </div>

        <p className="text-center mt-4">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">← Back to Home</Link>
        </p>
      </div>
    </div>
  )
}

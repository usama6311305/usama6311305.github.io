'use client'

import { useState }    from 'react'
import Link            from 'next/link'
import { useRouter }   from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import { Eye, EyeOff, UserPlus } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const login  = useAuthStore(s => s.login)

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim())                    e.name     = 'Name is required'
    if (!form.email.includes('@'))            e.email    = 'Valid email is required'
    if (form.password.length < 6)            e.password = 'Password must be 6+ characters'
    if (form.password !== form.confirm)      e.confirm  = 'Passwords do not match'
    return e
  }

  async function handleSignup() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    login(form.email, form.password)
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <span className="text-6xl">🥛</span>
            <span className="text-2xl font-bold text-amber-700">MilkMart</span>
          </Link>
          <p className="text-gray-500 mt-2">Create your free account</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 border border-amber-100">
          <h1 className="text-xl font-bold text-gray-800 mb-6">Get started!</h1>

          <div className="space-y-4">
            {[
              { key: 'name',  label: 'Full Name', placeholder: 'Ahmed Ali',       type: 'text'     },
              { key: 'email', label: 'Email',      placeholder: 'your@email.com',  type: 'email'    },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition
                              focus:border-amber-400 focus:ring-2 focus:ring-amber-100
                              ${errors[f.key] ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors[f.key] && <p className="text-red-500 text-xs mt-1">{errors[f.key]}</p>}
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Min 6 characters"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  className={`w-full border rounded-xl px-4 py-3 pr-10 text-sm outline-none transition
                              focus:border-amber-400 focus:ring-2 focus:ring-amber-100
                              ${errors.password ? 'border-red-400' : 'border-gray-200'}`}
                />
                <button onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Repeat password"
                value={form.confirm}
                onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))}
                className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition
                            focus:border-amber-400 focus:ring-2 focus:ring-amber-100
                            ${errors.confirm ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
            </div>

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white
                         py-3 rounded-xl font-semibold hover:bg-amber-600 transition active:scale-95
                         disabled:bg-amber-300 disabled:cursor-not-allowed"
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                : <><UserPlus size={18} /> Create Account</>}
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-amber-600 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

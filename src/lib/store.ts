import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem:    (product: Product) => void
  removeItem: (productId: string) => void
  updateQty:  (productId: string, qty: number) => void
  clearCart:  () => void
  total:      () => number
  count:      () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const existing = get().items.find(i => i.product.id === product.id)
        if (existing) {
          set({ items: get().items.map(i =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )})
        } else {
          set({ items: [...get().items, { product, quantity: 1 }] })
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter(i => i.product.id !== productId) })
      },

      updateQty: (productId, qty) => {
        if (qty <= 0) {
          get().removeItem(productId)
          return
        }
        set({ items: get().items.map(i =>
          i.product.id === productId ? { ...i, quantity: qty } : i
        )})
      },

      clearCart: () => set({ items: [] }),

      total: () => get().items.reduce((sum, i) => {
        const price = i.product.discount
          ? i.product.price * (1 - i.product.discount / 100)
          : i.product.price
        return sum + price * i.quantity
      }, 0),

      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'milk-shop-cart' }
  )
)

// Auth store
interface AuthStore {
  user: { name: string; email: string; role: 'customer' | 'admin' } | null
  login:  (email: string, password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,

      login: (email, password) => {
        // Mock auth — admin credentials
        if (email === 'admin@milkshop.com' && password === 'admin123') {
          set({ user: { name: 'Shop Admin', email, role: 'admin' } })
          return true
        }
        // Any other email = customer
        if (email && password.length >= 6) {
          set({ user: { name: email.split('@')[0], email, role: 'customer' } })
          return true
        }
        return false
      },

      logout: () => set({ user: null }),
    }),
    { name: 'milk-shop-auth' }
  )
)

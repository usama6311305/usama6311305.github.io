export interface Product {
  id: string
  name: string
  description: string
  price: number          // PKR
  unit: string           // e.g. "1 Liter", "500ml"
  category: 'fresh' | 'flavored' | 'organic' | 'cream' | 'butter' | 'yogurt'
  emoji: string
  inStock: boolean
  badge?: 'bestseller' | 'new' | 'organic' | 'sale'
  discount?: number      // percentage
  rating: number
  reviews: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  customer: CustomerInfo
  payment: PaymentInfo
  status: 'pending' | 'confirmed' | 'delivering' | 'delivered' | 'cancelled'
  total: number
  createdAt: string
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: string
  city: string
}

export interface PaymentInfo {
  method: 'cash' | 'card' | 'jazzcash' | 'easypaisa'
  status: 'pending' | 'paid' | 'failed'
}

export interface User {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
}

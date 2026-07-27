import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MilkMart — Fresh Dairy Delivered',
  description: 'Order fresh milk, cream, butter and dairy products online. Delivered to your door daily.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-amber-50 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}

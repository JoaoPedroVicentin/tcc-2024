import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/utils/providers'
import ProgressBar from '@/components/progressBar'
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dados Abertos',
  description: 'Dados abertos da Câmara dos Deputados',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ProgressBar />
        <Providers>
          <div className="relative min-h-screen lg:grid lg:grid-cols-app">
            <Sidebar />

            <main className="lg:col-start-2 lg:w-auto">
              <Navbar />
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}

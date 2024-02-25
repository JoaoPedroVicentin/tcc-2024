import React from 'react'
import Sidebar from '../../components/sidebar'

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-screen lg:grid lg:grid-cols-app">
      <Sidebar />

      <main className="max-w-screen px-4 pb-12 pt-24 lg:col-start-2 lg:w-auto lg:px-8 lg:pt-8">
        {children}
      </main>
    </div>
  )
}

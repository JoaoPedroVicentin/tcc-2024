import React from 'react'
import Sidebar from '../../components/sidebar'

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-screen lg:grid lg:grid-cols-app">
      <Sidebar />

      <main className="max-w-screen lg:p-section lg:col-start-2 lg:w-auto">
        {children}
      </main>
    </div>
  )
}

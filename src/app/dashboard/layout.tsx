import React from 'react'
import Sidebar from '../components/sidebar'

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="lg:grid-cols-app relative min-h-screen lg:grid">
      <Sidebar />

      <main className="max-w-screen px-4 pb-12 pt-24 lg:col-start-2 lg:w-auto lg:px-8 lg:pt-8">
        {children}
      </main>
    </div>
  )
}

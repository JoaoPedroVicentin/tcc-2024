'use client'
import React from 'react'
import Sidebar from '../../components/sidebar'
import Navbar from '@/components/navbar'

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-screen lg:grid lg:grid-cols-app">
      <Sidebar />

      <main className="lg:col-start-2 lg:w-auto">
        <Navbar />
        {children}
      </main>
    </div>
  )
}

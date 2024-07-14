'use client'
import { List } from '@phosphor-icons/react'
import Logo from '../svgs/Logo'
import { useContext } from 'react'
import { DashboardContext } from '@/context/DashboardContext'

export default function Navbar() {
  const { setSidebarIsOpen } = useContext(DashboardContext)

  return (
    <div className="flex justify-between p-4 lg:hidden">
      <div className="flex items-end gap-4">
        <Logo />
        <p className="text-lg font-bold">Dados Abertos</p>
      </div>
      <button type="button" onClick={() => setSidebarIsOpen(true)}>
        <List size={28} />
      </button>
    </div>
  )
}

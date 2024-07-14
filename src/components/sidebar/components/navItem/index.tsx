'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DashboardContext } from '@/context/DashboardContext'
import { INavItemProps } from './interface/navItemProps.interface'

export default function NavItem({ link, title, icon: Icon }: INavItemProps) {
  const path = usePathname()

  const linkIsActive = path.includes(link)

  const { setSidebarIsOpen } = useContext(DashboardContext)

  return (
    <Link
      href={link}
      onClick={() => setSidebarIsOpen(false)}
      className={`flex cursor-pointer items-end gap-4 px-4 py-3 transition duration-150 ease-in-out hover:bg-theme-green-100 ${linkIsActive && 'border-l-8 border-theme-black-50 bg-theme-green-100'}`}
    >
      <Icon size={26} weight="fill" />
      <span className="truncate">{title}</span>
    </Link>
  )
}

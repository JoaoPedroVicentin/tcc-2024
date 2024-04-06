'use client'
import React from 'react'
import { Icon } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface INavItemProps {
  title: string
  link: string
  icon: Icon
}

export default function NavItem({ link, title, icon: Icon }: INavItemProps) {
  const path = usePathname()

  const linkIsActive = path.includes(link)

  return (
    <Link
      href={link}
      className={`flex cursor-pointer items-end gap-4 px-4 py-3 transition duration-150 ease-in-out hover:bg-theme-green-100 ${linkIsActive && 'border-theme-black-50 border-l-8 bg-theme-green-100'}`}
    >
      <Icon size={26} weight="fill" />
      <span className="truncate">{title}</span>
    </Link>
  )
}

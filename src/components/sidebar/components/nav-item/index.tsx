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
    <li
      className={`flex cursor-pointer items-end gap-4 px-4 py-3 transition duration-150 ease-in-out hover:bg-theme-green-200 ${linkIsActive && 'border-l-8 border-theme-black bg-theme-green-200'}`}
    >
      <Icon size={26} weight="fill" />
      <Link href={link} className="truncate">
        {title}
      </Link>
    </li>
  )
}

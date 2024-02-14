'use client'
import React from 'react'
import { Icon } from '@phosphor-icons/react'
import Link from 'next/link'

interface INavItemProps {
  title: string
  link: string
  icon: Icon
}

export default function NavItem({ link, title, icon: Icon }: INavItemProps) {
  return (
    <li className="hover:bg-theme-green-200 flex cursor-pointer items-end gap-4 px-4 py-3 transition duration-150 ease-in-out">
      <Icon size={26} weight="fill" />
      <Link href={link} className="truncate">
        {title}
      </Link>
    </li>
  )
}

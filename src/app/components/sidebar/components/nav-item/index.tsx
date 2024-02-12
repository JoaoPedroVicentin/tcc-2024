import { User } from 'lucide-react'
import React from 'react'

interface INavItemProps {
  title: string
  link: string
}

export default function NavItem({ link, title }: INavItemProps) {
  return (
    <li className="flex items-end gap-4 bg-theme-green-200 px-4 py-2">
      <User strokeWidth={3} />
      <a href={link}>{title}</a>
    </li>
  )
}

import React from 'react'
import Logo from '../svgs/Logo'
import NavItem from './components/nav-item'

export default function Sidebar() {
  return (
    <aside className="scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-300 fixed left-0 right-0 top-0 z-20 flex flex-col gap-6 overflow-hidden border-b border-zinc-200 bg-white p-4 data-[state=open]:bottom-0 lg:bottom-0 lg:right-auto lg:h-auto lg:w-72 lg:overflow-auto lg:border-b-0 lg:border-r lg:px-5 lg:py-8">
      <div className="flex items-end gap-4">
        <Logo />
        <p className="text-lg">Dados Abertos</p>
      </div>

      <nav>
        <ul className="flex flex-col gap-4">
          <NavItem title="Deputados" link="#" />
          <NavItem title="Proposições" link="#" />
          <NavItem title="Eventos" link="#" />
          <NavItem title="Partidos" link="#" />
          <NavItem title="Frentes Parlamentares" link="#" />
          <NavItem title="Blocos Partidários" link="#" />
          <NavItem title="Votações" link="#" />
          <NavItem title="Fórum" link="#" />
        </ul>
      </nav>
      <div></div>
    </aside>
  )
}

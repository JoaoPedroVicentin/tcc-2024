'use client'
import React from 'react'
import Logo from '../svgs/Logo'
import NavItem from './components/nav-item'
import {
  Calendar,
  Chats,
  Files,
  Flag,
  Ticket,
  Users,
  UsersFour,
  UsersThree,
} from '@phosphor-icons/react'
import { internalRoutes } from '@/configs/internalRoutes'

export default function Sidebar() {
  return (
    <aside className="fixed left-0 right-0 top-0 z-20 flex flex-col gap-6 overflow-hidden border-b border-zinc-200 bg-white p-4 data-[state=open]:bottom-0 lg:bottom-0 lg:right-auto lg:h-auto lg:w-72 lg:overflow-auto lg:border-b-0 lg:border-r lg:px-5 lg:py-8">
      <div className="flex items-end gap-4 px-4">
        <Logo />
        <p className="text-lg font-bold">Dados Abertos</p>
      </div>

      <nav>
        <ul className="flex flex-col gap-4">
          <NavItem
            title="Deputados"
            link={internalRoutes.deputados}
            icon={Users}
          />
          <NavItem
            title="Proposições"
            link={internalRoutes.proposicoes}
            icon={Files}
          />
          <NavItem
            title="Eventos"
            link={internalRoutes.eventos}
            icon={Calendar}
          />
          <NavItem
            title="Partidos"
            link={internalRoutes.partidos}
            icon={Flag}
          />
          <NavItem
            title="Frentes Parlamentares"
            link={internalRoutes.frentesParlamentares}
            icon={UsersThree}
          />
          <NavItem
            title="Blocos Partidários"
            link={internalRoutes.blocosPartidarios}
            icon={UsersFour}
          />
          <NavItem
            title="Votações"
            link={internalRoutes.votacoes}
            icon={Ticket}
          />
          <NavItem title="Fórum" link="#" icon={Chats} />
        </ul>
      </nav>
    </aside>
  )
}

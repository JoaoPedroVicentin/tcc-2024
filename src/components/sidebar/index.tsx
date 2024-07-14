'use client'
import React, { useContext } from 'react'
import Logo from '../svgs/Logo'
import NavItem from './components/navItem'
import {
  Calendar,
  Files,
  Flag,
  Gavel,
  Ticket,
  Users,
  UsersFour,
  UsersThree,
  X,
} from '@phosphor-icons/react'
import { internalRoutes } from '@/configs/internalRoutes'
import { DashboardContext } from '@/context/DashboardContext'

export default function Sidebar() {
  const { sidebarIsOpen, setSidebarIsOpen } = useContext(DashboardContext)

  return (
    <aside
      className={`fixed bottom-0 left-0 right-0 top-0 z-20 flex-col gap-6 overflow-hidden border-b border-zinc-200 bg-white p-4 lg:bottom-0 lg:right-auto lg:flex lg:h-auto lg:w-72 lg:overflow-auto lg:border-b-0 lg:border-r lg:p-sidebar ${
        sidebarIsOpen ? 'flex' : 'hidden'
      }`}
    >
      <div className="flex justify-between">
        <div className="flex items-end gap-4">
          <Logo />
          <p className="text-lg font-bold">Dados Abertos</p>
        </div>
        <button className="lg:hidden" onClick={() => setSidebarIsOpen(false)}>
          <X size={28} />
        </button>
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
          <NavItem title="Órgãos" link={internalRoutes.orgaos} icon={Gavel} />
          {/* <NavItem title="Fórum" link="#" icon={Chats} /> */}
        </ul>
      </nav>
    </aside>
  )
}

import { createContext, ReactNode, useState } from 'react'
import { IDashboardContextData } from './interface/dashboardContextData.interface'

export const DashboardContext = createContext({} as IDashboardContextData)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true)

  return (
    <DashboardContext.Provider value={{ sidebarIsOpen, setSidebarIsOpen }}>
      {children}
    </DashboardContext.Provider>
  )
}

import { Dispatch, SetStateAction } from 'react'

export interface IDashboardContextData {
  sidebarIsOpen: boolean
  setSidebarIsOpen: Dispatch<SetStateAction<boolean>>
}

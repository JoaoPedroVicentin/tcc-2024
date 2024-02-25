import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetPartidosReturn {
  dados: {
    id: number
    sigla: string
    nome: string
    uri: string
  }[]
  links: ILinksReturn[]
}

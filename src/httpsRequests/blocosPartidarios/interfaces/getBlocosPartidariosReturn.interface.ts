import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetBlocosPartidariosReturn {
  dados: {
    id: number
    idLegislatura: number
    nome: string
    uri: string
  }[]
  links: ILinksReturn[]
}

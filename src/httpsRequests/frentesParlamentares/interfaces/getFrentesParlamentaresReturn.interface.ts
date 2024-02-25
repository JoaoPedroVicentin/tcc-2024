import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetFrentesParlamentaresReturn {
  dados: {
    id: number
    idLegislatura: number
    titulo: string
    uri: string
  }[]
  links: ILinksReturn[]
}

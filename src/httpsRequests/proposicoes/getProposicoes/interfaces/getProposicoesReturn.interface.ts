import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetProposicoesReturn {
  dados: {
    id: number
    uri: string
    numero: number
    siglaTipo: string
    codTipo: string
    ano: string
    ementa: string
  }[]
  links: ILinksReturn[]
}

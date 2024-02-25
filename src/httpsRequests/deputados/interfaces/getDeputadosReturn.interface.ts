import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetDeputadosReturn {
  dados: {
    id: number
    uri: string
    nome: string
    siglaPartido: string
    uriPartido: string
    siglaUf: string
    idLegislatura: number
    urlFoto: string
    email: string
  }[]
  links: ILinksReturn[]
}

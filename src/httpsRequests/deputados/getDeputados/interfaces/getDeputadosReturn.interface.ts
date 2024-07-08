import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IDeputadoData {
  id: number
  uri: string
  nome: string
  siglaPartido: string
  uriPartido: string
  siglaUf: string
  idLegislatura: number
  urlFoto: string
  email: string
}

export interface IGetDeputadosReturn {
  dados: IDeputadoData[]
  links: ILinksReturn[]
}

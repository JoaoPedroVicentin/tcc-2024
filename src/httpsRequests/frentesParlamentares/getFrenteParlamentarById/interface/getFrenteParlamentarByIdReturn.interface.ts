import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetFrenteParlamentarByIdReturn {
  dados: {
    coordenador: {
      email: string
      id: number
      idLegislatura: number
      nome: string
      siglaPartido: string
      siglaUf: string
      uri: string
      uriPartido: string
      urlFoto: string
    }
    email: string
    id: number
    idLegislatura: number
    idSituacao: number
    keywords: string
    situacao: string
    telefone: string
    titulo: string
    uri: string
    urlDocumento: string
    urlWebsite: string
  }
  links: ILinksReturn[]
}

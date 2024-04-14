import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetFrenteParlamentarByIdReturn {
  dados: {
    coordenador: {
      email: string | null
      id: number
      idLegislatura: number
      nome: string | null
      siglaPartido: string | null
      siglaUf: string | null
      uri: string | null
      uriPartido: string | null
      urlFoto: string | null
    }
    email: string | null
    id: number
    idLegislatura: number
    idSituacao: number | null
    keywords: string | null
    situacao: string
    telefone: string | null
    titulo: string
    uri: string
    urlDocumento: string
    urlWebsite: string | null
  }
  links: ILinksReturn[]
}

import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetPartidoByIdReturn {
  dados: {
    id: number
    sigla: string
    nome: string
    uri: string
    status: {
      data: string
      idLegislatura: string
      situacao: string
      totalPosse: string
      totalMembros: string
      uriMembros: string
      lider: {
        uri: string
        nome: string
        siglaPartido: string
        uriPartido: string
        uf: string
        idLegislatura: number
        urlFoto: string
      }
    }
    numeroEleitoral: string | null
    urlLogo: string | null
    urlWebSite: string | null
    urlFacebook: string | null
  }
  links: ILinksReturn[]
}

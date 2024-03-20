import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetHistoricoDeputadoReturn {
  dados: {
    id: number
    uri: string
    nome: string
    nomeEleitoral: string
    siglaPartido: string
    uriPartido: string
    siglaUf: string
    idLegislatura: number
    email: string | null
    urlFoto: string
    dataHora: string
    situacao: string
    condicaoEleitoral: string
    descricaoStatus: string
  }[]
  links: ILinksReturn
}

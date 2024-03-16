import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetVotacoesReturn {
  dados: {
    id: string
    uri: string
    data: string
    dataHoraRegistro: string
    siglaOrgao: string
    uriOrgao: string
    uriEvento: string
    proposicaoObjeto: string | null
    uriProposicaoObjeto: string | null
    descricao: string
    aprovacao: number | null
  }[]
  links: ILinksReturn[]
}

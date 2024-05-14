import { IVotacaoData } from '@/httpsRequests/votacoes/getVotacoes/interfaces/votacaoData.interface'
import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetVotacoesProposicaoReturn {
  dados: IVotacaoData[]
  links: ILinksReturn[]
}

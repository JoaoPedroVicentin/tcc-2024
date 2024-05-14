import { ILinksReturn } from '@/interfaces/linksReturn.interface'
import { IVotacaoData } from './votacaoData.interface'

export interface IGetVotacoesReturn {
  dados: IVotacaoData[]
  links: ILinksReturn[]
}

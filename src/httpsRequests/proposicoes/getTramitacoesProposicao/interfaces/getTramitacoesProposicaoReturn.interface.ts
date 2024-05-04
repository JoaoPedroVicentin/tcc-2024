import { ILinksReturn } from '@/interfaces/linksReturn.interface'
import { ITramitacaoData } from './tramitacaoData.interface'

export interface IGetTramitacoesProposicaoReturn {
  dados: ITramitacaoData[]
  links: ILinksReturn[]
}

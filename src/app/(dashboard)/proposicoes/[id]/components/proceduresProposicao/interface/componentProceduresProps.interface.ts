import { IGetTramitacoesProposicaoReturn } from '@/httpsRequests/proposicoes/getTramitacoesProposicao/interfaces/getTramitacoesProposicaoReturn.interface'

export interface IComponentProceduresProps {
  isLoading: boolean
  tramitacoes?: IGetTramitacoesProposicaoReturn
}

import { IGetTramitacoesProposicaoReturn } from '@/httpsRequests/proposicoes/getTramitacoesProposicao/interfaces/getTramitacoesProposicaoReturn.interface'

export interface ITableProceduresProps {
  isLoading: boolean
  tramitacoes?: IGetTramitacoesProposicaoReturn
}

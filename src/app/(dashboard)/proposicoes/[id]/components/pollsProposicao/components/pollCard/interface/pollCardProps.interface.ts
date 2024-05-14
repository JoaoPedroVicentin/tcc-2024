import { IVotacaoData } from '@/httpsRequests/votacoes/getVotacoes/interfaces/votacaoData.interface'

export interface IPollCardProps {
  id: number
  poll: IVotacaoData
}

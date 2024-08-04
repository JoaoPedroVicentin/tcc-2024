import { IVotacaoData } from '@/httpsRequests/votacoes/getVotacoes/interfaces/votacaoData.interface'

export interface IPollCardProps {
  id: number | string
  poll: IVotacaoData
  isEventoPage: boolean
}

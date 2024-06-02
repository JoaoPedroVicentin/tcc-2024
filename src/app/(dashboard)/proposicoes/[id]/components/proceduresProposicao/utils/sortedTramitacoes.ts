import { ITramitacaoData } from '@/httpsRequests/proposicoes/getTramitacoesProposicao/interfaces/tramitacaoData.interface'

export function sortedTramitacoes(tramitacoes: ITramitacaoData[]) {
  return (
    tramitacoes &&
    tramitacoes.sort((a, b) => {
      const dateA = new Date(a.dataHora).getTime()
      const dateB = new Date(b.dataHora).getTime()
      return dateB - dateA
    })
  )
}

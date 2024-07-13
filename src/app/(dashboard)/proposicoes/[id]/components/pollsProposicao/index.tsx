import Title from '@/components/title'
import { IProposicaoSectionProps } from '../../interface/proposicaoSectionProps.interface'
import { Ticket } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { WrapperSection } from '@/components/wrapperSection'
import { getVotacoesProposicao } from '@/httpsRequests/proposicoes/getVotacoesProposicao'
import { useState } from 'react'
import { IFilterGetVotacoesProposicaoParams } from '@/httpsRequests/proposicoes/getVotacoesProposicao/interfaces/filterGetVotacoesProposicaoParams.interface'
import { PollCard } from './components/pollCard'
import * as Table from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { IVotacaoData } from '@/httpsRequests/votacoes/getVotacoes/interfaces/votacaoData.interface'
import PaginationList from '@/components/paginationList'

export function PollsProposicao({ proposicao }: IProposicaoSectionProps) {
  const filters: IFilterGetVotacoesProposicaoParams = {
    ordenarPor: 'dataHoraRegistro',
  }

  const [currentPage, setCurrentPage] = useState<number>(1)

  const { id } = proposicao

  const { data: votacoes, isLoading } = useQuery({
    queryKey: ['pollsProposicao', id, filters],
    queryFn: () => getVotacoesProposicao(id),
  })

  function splitIntoSubarrays(
    data: IVotacaoData[],
    maxLength: number = 4,
  ): IVotacaoData[][] {
    const subarrays: IVotacaoData[][] = []
    for (let i = 0; i < data.length; i += maxLength) {
      const subarray = data.slice(i, i + maxLength)
      subarrays.push(subarray)
    }
    return subarrays
  }

  const votacoesPages = votacoes && splitIntoSubarrays(votacoes.data.dados)

  const hasVotacoes = !!(
    !isLoading &&
    votacoesPages &&
    votacoesPages[currentPage - 1] &&
    votacoesPages[currentPage - 1].length > 0
  )

  return (
    <WrapperSection>
      <Title text="Votações" icon={Ticket} />

      {isLoading || hasVotacoes ? (
        <div className="grid max-h-[718px] grid-cols-3 gap-6 overflow-y-scroll pr-6 2xl:grid-cols-4">
          {!isLoading
            ? hasVotacoes &&
              votacoesPages[currentPage - 1].map((votacao) => {
                return (
                  <PollCard
                    key={votacao.id}
                    id={id}
                    poll={votacao}
                    isEventoPage={false}
                  />
                )
              })
            : Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="h-96 flex-1" />
              ))}
        </div>
      ) : (
        <Table.DataEmpty />
      )}
      {hasVotacoes && (
        <PaginationList
          pageIndex={currentPage}
          setPageIndex={(index) => setCurrentPage(index)}
          lastPage={votacoesPages.length}
        />
      )}
    </WrapperSection>
  )
}

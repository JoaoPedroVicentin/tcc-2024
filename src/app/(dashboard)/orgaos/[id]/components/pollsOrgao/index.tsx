import Title from '@/components/title'
import { Ticket } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { WrapperSection } from '@/components/wrapperSection'
import { useState } from 'react'
import * as Table from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { IVotacaoData } from '@/httpsRequests/votacoes/getVotacoes/interfaces/votacaoData.interface'
import PaginationList from '@/components/paginationList'
import { IOrgaoSectionProps } from '../../interface/orgaoSectionProps.interface'
import { IFilterGetVotacoesOrgaoParams } from '@/httpsRequests/orgaos/getVotacoesOrgao/interfaces/filterGetVotacoesOrgaoParams.interface'
import { getVotacoesOrgao } from '@/httpsRequests/orgaos/getVotacoesOrgao'
import { PollCard } from '@/app/(dashboard)/proposicoes/[id]/components/pollsProposicao/components/pollCard'

export function PollsOrgao({ orgao }: IOrgaoSectionProps) {
  const filters: IFilterGetVotacoesOrgaoParams = {
    ordenarPor: 'dataHoraRegistro',
  }

  const [currentPage, setCurrentPage] = useState<number>(1)

  const { id } = orgao

  const { data: votacoes, isLoading } = useQuery({
    queryKey: ['pollsOrgao', id, filters],
    queryFn: () => getVotacoesOrgao(id.toString()),
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
    <WrapperSection className="bg-theme-white-50">
      <Title text="Votações" icon={Ticket} />

      {isLoading || hasVotacoes ? (
        <div className="flex flex-wrap gap-6 overflow-y-scroll pr-6">
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
        <Table.DataEmpty className="relative top-0" />
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

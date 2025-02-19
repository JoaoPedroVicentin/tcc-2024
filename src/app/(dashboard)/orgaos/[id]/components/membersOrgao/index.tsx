import Title from '@/components/title'
import { UsersThree } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { WrapperSection } from '@/components/wrapperSection'
import { IDeputadoData } from '@/httpsRequests/deputados/getDeputados/interfaces/getDeputadosReturn.interface'
import { useState } from 'react'
import * as Table from '@/components/ui/table'
import PaginationList from '@/components/paginationList'
import { Skeleton } from '@/components/ui/skeleton'
import { IOrgaoSectionProps } from '../../interface/orgaoSectionProps.interface'
import { getMembrosOrgao } from '@/httpsRequests/orgaos/getMembrosOrgao'
import { DeputadoCard } from '@/app/(dashboard)/eventos/[id]/components/deputadosEvento/components/deputadoCard'

export function MembersOrgao({ orgao }: IOrgaoSectionProps) {
  const { id } = orgao

  const [currentPage, setCurrentPage] = useState<number>(1)

  const { data: deputados, isLoading } = useQuery({
    queryKey: ['membrosOrgao', id],
    queryFn: () => getMembrosOrgao(id.toString()),
  })

  function splitIntoSubarrays(
    data: IDeputadoData[],
    maxLength: number = 12,
  ): IDeputadoData[][] {
    const subarrays: IDeputadoData[][] = []
    for (let i = 0; i < data.length; i += maxLength) {
      const subarray = data.slice(i, i + maxLength)
      subarrays.push(subarray)
    }
    return subarrays
  }

  const deputadosPages = deputados && splitIntoSubarrays(deputados.data.dados)

  const hasDeputados = !!(
    !isLoading &&
    deputadosPages &&
    deputadosPages[currentPage - 1] &&
    deputadosPages[currentPage - 1].length > 0
  )

  return (
    <WrapperSection className="bg-theme-white-50">
      <Title text="Membros" icon={UsersThree} />

      {isLoading || hasDeputados ? (
        <div className="grid max-h-[718px] grid-cols-4 gap-12 overflow-y-scroll pr-6">
          {!isLoading
            ? hasDeputados &&
              deputadosPages[currentPage - 1].map((deputado) => {
                return <DeputadoCard key={deputado.id} deputado={deputado} />
              })
            : Array.from({ length: 12 }, (_, index) => (
                <Skeleton key={index} className="h-28 flex-1" />
              ))}
        </div>
      ) : (
        <Table.DataEmpty className="relative top-0" />
      )}
      {hasDeputados && (
        <PaginationList
          pageIndex={currentPage}
          setPageIndex={(index) => setCurrentPage(index)}
          lastPage={deputadosPages.length}
        />
      )}
    </WrapperSection>
  )
}

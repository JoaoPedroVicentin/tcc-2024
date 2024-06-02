import { FileSearch } from '@phosphor-icons/react'
import * as Table from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import PaginationList from '@/components/paginationList'
import { format } from 'date-fns'
import { useState } from 'react'
import { ITramitacaoData } from '@/httpsRequests/proposicoes/getTramitacoesProposicao/interfaces/tramitacaoData.interface'
import { IComponentProceduresProps } from '../../interface/componentProceduresProps.interface'
import { sortedTramitacoes } from '../../utils/sortedTramitacoes'

export function TableProcedures({
  isLoading,
  tramitacoes,
}: IComponentProceduresProps) {
  const [currentPage, setCurrentPage] = useState<number>(1)

  function splitIntoSubarrays(
    data: ITramitacaoData[],
    maxLength: number = 10,
  ): ITramitacaoData[][] {
    const sortedData = sortedTramitacoes(data)

    const result: ITramitacaoData[][] = []

    for (let i = 0; i < sortedData.length; i += maxLength) {
      result.push(sortedData.slice(i, i + maxLength))
    }

    return result
  }

  const tramitacoesPages = tramitacoes && splitIntoSubarrays(tramitacoes.dados)

  const hasTramitacoes = !!(
    !isLoading &&
    tramitacoesPages &&
    tramitacoesPages[currentPage - 1] &&
    tramitacoesPages[currentPage - 1].length > 0
  )

  return (
    <Table.Root>
      <Table.Header className="border-b-2 border-theme-black-50 text-base">
        <Table.Row>
          <Table.Head>Data</Table.Head>
          <Table.Head>Órgão</Table.Head>
          <Table.Head>Despacho</Table.Head>
          <Table.Head>Documento</Table.Head>
        </Table.Row>
      </Table.Header>
      {isLoading || hasTramitacoes ? (
        <Table.Body>
          {!isLoading
            ? hasTramitacoes &&
              tramitacoesPages[currentPage - 1].map((tramitacao, index) => (
                <Table.Row
                  key={index}
                  className="items-center text-base hover:bg-theme-black-50 hover:text-white"
                >
                  <Table.Cell>
                    {format(tramitacao.dataHora, 'dd/MM/yy')}
                  </Table.Cell>
                  <Table.Cell>{tramitacao.siglaOrgao}</Table.Cell>
                  <Table.Cell className="max-w-[50ch] overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {tramitacao.despacho}
                  </Table.Cell>
                  <Table.Cell>
                    {tramitacao.url ? (
                      <Link href={tramitacao.url}>
                        <FileSearch size={24} weight="fill" />
                      </Link>
                    ) : (
                      <p>---</p>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))
            : Array.from({ length: 10 }, (_, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Skeleton className="h-10 flex-1" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton className="h-10 flex-1" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton className="h-10 flex-1" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton className="h-10 flex-1" />
                  </Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
      ) : (
        <Table.Caption>
          <Table.DataEmpty />
        </Table.Caption>
      )}
      {hasTramitacoes && (
        <>
          <Table.Caption>
            <PaginationList
              pageIndex={currentPage}
              setPageIndex={(index) => setCurrentPage(index)}
              lastPage={tramitacoesPages.length}
            />
          </Table.Caption>
          <Table.Caption>Listagem das tramitações da proposição</Table.Caption>
        </>
      )}
    </Table.Root>
  )
}

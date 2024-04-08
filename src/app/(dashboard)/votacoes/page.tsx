'use client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import * as Table from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import PaginationList from '@/components/paginationList'
import { IFilterGetVotacoesParams } from '@/httpsRequests/votacoes/getVotacoes/interfaces/filterGetVotacoesParams.interface'
import { getVotacoes } from '@/httpsRequests/votacoes/getVotacoes'
import { format } from 'date-fns'
import Link from 'next/link'
import { Info } from '@phosphor-icons/react'
import { internalRoutes } from '@/configs/internalRoutes'

export default function Votacoes() {
  const defaultFilters: IFilterGetVotacoesParams = {
    pagina: '1',
    itens: '10',
  }

  const [filters, setFilters] =
    useState<IFilterGetVotacoesParams>(defaultFilters)

  const { pagina } = filters

  const { data: votacoes, isLoading } = useQuery({
    queryKey: ['votacoes', filters],
    queryFn: () => getVotacoes(filters),
  })

  const lastPage = votacoes?.data.links
    .find((link) => link.rel === 'last')
    ?.href.match(VALIDATIONS_REGEX.GET_INDEX_PAGE)

  return (
    <div className="h-full p-section">
      <div className="mb-6">
        <h1 className="text-5xl font-light">Votações</h1>
      </div>

      <div className="mb-4 grid grid-cols-4 gap-6"></div>

      <Table.Root>
        <Table.Header className="border-b-2 border-theme-black-50 text-base">
          <Table.Row>
            <Table.Head>Proposição</Table.Head>
            <Table.Head>Descrição</Table.Head>
            <Table.Head>Horário de registro</Table.Head>
            <Table.Head>Órgão</Table.Head>
            <Table.Head>Ver página</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading
            ? Array.from({ length: 10 }, (_, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Skeleton className="h-14 flex-1" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton className="h-14 flex-1" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton className="h-14 flex-1" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton className="h-14 flex-1" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton className="h-14 flex-1" />
                  </Table.Cell>
                </Table.Row>
              ))
            : votacoes &&
              votacoes.data.dados.map((votacao, index) => (
                <Table.Row
                  key={index}
                  className="items-center text-base hover:bg-theme-black-50 hover:text-white"
                >
                  <Table.Cell>
                    {votacao.proposicaoObjeto
                      ? votacao.proposicaoObjeto
                      : '---'}
                  </Table.Cell>
                  <Table.Cell className="max-w-[50ch] overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {votacao.descricao}
                  </Table.Cell>
                  <Table.Cell>
                    {votacao.dataHoraRegistro
                      ? format(votacao.dataHoraRegistro, 'dd/MM/yyyy - HH:mm')
                      : '---'}
                  </Table.Cell>
                  <Table.Cell>{votacao.siglaOrgao}</Table.Cell>
                  <Table.Cell>
                    <Link href={internalRoutes.votacaoById(votacao.id)}>
                      <Info size={20} weight="duotone" />
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
        <Table.Caption>
          {lastPage && (
            <PaginationList
              pageIndex={Number(pagina)}
              setPageIndex={(index) =>
                setFilters((prevState) => ({
                  ...prevState,
                  pagina: String(index),
                }))
              }
              lastPage={Number(lastPage[1])}
            />
          )}
        </Table.Caption>
        {!isLoading && votacoes && votacoes.data.dados.length <= 0 ? (
          <Table.Caption>
            <Table.DataEmpty />
          </Table.Caption>
        ) : (
          <Table.Caption>Listagem das Votações</Table.Caption>
        )}
      </Table.Root>
    </div>
  )
}

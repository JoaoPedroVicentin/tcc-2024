'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import * as Table from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Info } from '@phosphor-icons/react'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import PaginationList from '@/components/paginationList'
import { IFilterGetFrentesParlamentaresParams } from '@/httpsRequests/frentesParlamentares/getFrentesParlamentares/interfaces/filterGetFrentesParlamentaresParams.interface'
import { getFrentesParlamentares } from '@/httpsRequests/frentesParlamentares/getFrentesParlamentares'
import Link from 'next/link'
import { internalRoutes } from '@/configs/internalRoutes'

export default function FrentesParlamentares() {
  const defaultFilters: IFilterGetFrentesParlamentaresParams = {
    pagina: '1',
    itens: '10',
  }

  const [filters, setFilters] =
    useState<IFilterGetFrentesParlamentaresParams>(defaultFilters)

  const { pagina } = filters

  const { data: frentes, isLoading } = useQuery({
    queryKey: ['frentesParlamentares', filters],
    queryFn: () => getFrentesParlamentares(filters),
  })

  const lastPage = frentes?.data.links
    .find((link) => link.rel === 'last')
    ?.href.match(VALIDATIONS_REGEX.GET_INDEX_PAGE)

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-5xl font-light">Frentes Parlamentares</h1>
      </div>

      <Table.Root>
        <Table.Header className="border-b-2 border-theme-gray-100 text-base">
          <Table.Row>
            <Table.Head>Título</Table.Head>
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
                </Table.Row>
              ))
            : frentes &&
              frentes.data.dados.map((frente, index) => (
                <Table.Row
                  key={index}
                  className="items-center text-base hover:bg-theme-gray-100 hover:text-white"
                >
                  <Table.Cell>{frente.titulo}</Table.Cell>
                  <Table.Cell>
                    <Link
                      href={internalRoutes.frenteParlamentarById(frente.id)}
                    >
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
        <Table.Caption>Listagem das Frentes Parlamentares</Table.Caption>
      </Table.Root>
    </div>
  )
}

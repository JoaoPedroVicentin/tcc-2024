'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import * as Table from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Info } from '@phosphor-icons/react'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import PaginationList from '@/components/paginationList'
import { IFilterGetPartidosParams } from '@/httpsRequests/partidos/getPartidos/interfaces/filterGetPartidosParams.interface'
import Link from 'next/link'
import { internalRoutes } from '@/configs/internalRoutes'
import { getPartidos } from '@/httpsRequests/partidos/getPartidos'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LEGISLATURAS } from '@/constants/legislaturas'

export default function Partidos() {
  const defaultFilters: IFilterGetPartidosParams = {
    pagina: '1',
    itens: '10',
    idLegislatura: '57',
  }

  const [filters, setFilters] =
    useState<IFilterGetPartidosParams>(defaultFilters)

  const { pagina, idLegislatura } = filters

  const { data: partidos, isLoading } = useQuery({
    queryKey: ['partidos', filters],
    queryFn: () => getPartidos(filters),
  })

  const lastPage = partidos?.data.links
    .find((link) => link.rel === 'last')
    ?.href.match(VALIDATIONS_REGEX.GET_INDEX_PAGE)

  function handleSetLegislatura(value: string) {
    setFilters((prevState) => ({
      ...prevState,
      pagina: '1',
      idLegislatura: value,
    }))
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-5xl font-light">Partidos</h1>
      </div>

      <div className="mb-4 grid grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Legislatura</label>
          <Select onValueChange={handleSetLegislatura} value={idLegislatura}>
            <SelectTrigger>
              <SelectValue placeholder="Pesquisar por legislatura" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Legislaturas</SelectLabel>
                {LEGISLATURAS.slice(0, 2).map((legislatura, index) => {
                  const startDate = new Date(
                    legislatura.dataInicio,
                  ).getFullYear()
                  const endDate = new Date(legislatura.dataFim).getFullYear()

                  return (
                    <SelectItem key={index} value={legislatura.id}>
                      {startDate} - {endDate}
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table.Root>
        <Table.Header className="border-b-2 border-theme-gray-100 text-base">
          <Table.Row>
            <Table.Head>Nome</Table.Head>
            <Table.Head>Sigla</Table.Head>
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
                </Table.Row>
              ))
            : partidos &&
              partidos.data.dados.map((partido, index) => (
                <Table.Row
                  key={index}
                  className="items-center text-base hover:bg-theme-gray-100 hover:text-white"
                >
                  <Table.Cell>{partido.nome}</Table.Cell>
                  <Table.Cell>{partido.sigla}</Table.Cell>
                  <Table.Cell>
                    <Link href={internalRoutes.partidosById(partido.id)}>
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
        {!isLoading && partidos && partidos.data.dados.length <= 0 ? (
          <Table.Caption>
            <Table.DataEmpty />
          </Table.Caption>
        ) : (
          <Table.Caption>Listagem dos Partidos</Table.Caption>
        )}
      </Table.Root>
    </div>
  )
}

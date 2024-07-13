'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import * as Table from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import PaginationList from '@/components/paginationList'
import { getBlocosPartidarios } from '@/httpsRequests/blocosPartidarios/getBlocosPartidarios'
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
import { IFilterGetBlocosPartidariosParams } from '@/httpsRequests/blocosPartidarios/getBlocosPartidarios/interfaces/filterGetBlocosPartidariosParams.interface'
import { WrapperList } from '@/components/wrapperList'
import { Header } from '@/components/header'
import { UsersFour } from '@phosphor-icons/react'

export default function BlocosPartidarios() {
  const defaultFilters: IFilterGetBlocosPartidariosParams = {
    pagina: '1',
    itens: '10',
    idLegislatura: '57',
  }

  const [filters, setFilters] =
    useState<IFilterGetBlocosPartidariosParams>(defaultFilters)

  const { pagina, idLegislatura } = filters

  const { data: blocos, isLoading } = useQuery({
    queryKey: ['blocosPartidarios', filters],
    queryFn: () => getBlocosPartidarios(filters),
  })

  const lastPage = blocos?.data.links
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
    <WrapperList>
      <Header text="Blocos Partidários" icon={UsersFour} />

      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Legislatura</label>
          <Select
            onValueChange={handleSetLegislatura}
            value={String(idLegislatura)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pesquisar por legislatura" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Legislaturas</SelectLabel>
                {LEGISLATURAS.slice(0, 4).map((legislatura, index) => {
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

      <Table.Root className="pb-0">
        <Table.Header className="border-b-2 border-theme-black-50 text-base">
          <Table.Row>
            <Table.Head>Nome</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading
            ? Array.from({ length: 10 }, (_, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Skeleton className="h-10 flex-1" />
                  </Table.Cell>
                </Table.Row>
              ))
            : blocos &&
              blocos.data.dados.map((bloco, index) => (
                <Table.Row
                  key={index}
                  className="items-center text-base hover:bg-theme-black-50 hover:text-white"
                >
                  <Table.Cell>{bloco.nome}</Table.Cell>
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
        {!isLoading && blocos && blocos.data.dados.length <= 0 ? (
          <Table.DataEmpty />
        ) : (
          <Table.Caption>Listagem dos Blocos Partidários</Table.Caption>
        )}
      </Table.Root>
    </WrapperList>
  )
}

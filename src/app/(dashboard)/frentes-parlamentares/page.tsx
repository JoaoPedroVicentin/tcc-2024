'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import * as Table from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowSquareOut, UsersThree } from '@phosphor-icons/react'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import PaginationList from '@/components/paginationList'
import { IFilterGetFrentesParlamentaresParams } from '@/httpsRequests/frentesParlamentares/getFrentesParlamentares/interfaces/filterGetFrentesParlamentaresParams.interface'
import { getFrentesParlamentares } from '@/httpsRequests/frentesParlamentares/getFrentesParlamentares'
import Link from 'next/link'
import { internalRoutes } from '@/configs/internalRoutes'
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
import { WrapperList } from '@/components/wrapperList'
import { Header } from '@/components/header'

export default function FrentesParlamentares() {
  const defaultFilters: IFilterGetFrentesParlamentaresParams = {
    pagina: '1',
    itens: '10',
    idLegislatura: '57',
  }

  const [filters, setFilters] =
    useState<IFilterGetFrentesParlamentaresParams>(defaultFilters)

  const { pagina, idLegislatura } = filters

  const { data: frentes, isLoading } = useQuery({
    queryKey: ['frentesParlamentares', filters],
    queryFn: () => getFrentesParlamentares(filters),
  })

  const lastPage = frentes?.data.links
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
      <Header text="Frentes Parlamentares" icon={UsersThree} />

      <div className="grid grid-cols-4 gap-6">
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
      <Table.Root className="pb-0">
        <Table.Header className="border-b-2 border-theme-black-50 text-base">
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
                    <Skeleton className="h-10 flex-1" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton className="h-10 flex-1" />
                  </Table.Cell>
                </Table.Row>
              ))
            : frentes &&
              frentes.data.dados.map((frente, index) => (
                <Table.Row
                  key={index}
                  className="items-center text-base hover:bg-theme-black-50 hover:text-white"
                >
                  <Table.Cell>{frente.titulo}</Table.Cell>
                  <Table.Cell>
                    <Link
                      href={internalRoutes.frenteParlamentarById(frente.id)}
                    >
                      <ArrowSquareOut size={24} />
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
        {!isLoading && frentes && frentes.data.dados.length <= 0 ? (
          <Table.DataEmpty />
        ) : (
          <Table.Caption>Listagem das Frentes Parlamentares</Table.Caption>
        )}
      </Table.Root>
    </WrapperList>
  )
}

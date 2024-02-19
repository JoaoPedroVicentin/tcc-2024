'use client'
import { getDeputados } from '@/httpsRequests/getDeputados'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import * as Table from '@/components/ui/table'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { Info } from '@phosphor-icons/react'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import PaginationList from '@/components/paginationList'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SIGLAS_UF } from '@/constants/siglasUf'
import { PARTIDOS } from '@/constants/partidos'

export default function Deputados() {
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [searchName, setSearchName] = useState<string>()
  const [siglaUf, setSiglaUf] = useState<string>()
  const [partido, setPartido] = useState<string>()

  const { data: deputados, isLoading } = useQuery({
    queryKey: ['deputados', pageIndex, searchName, siglaUf, partido],
    queryFn: () =>
      getDeputados({
        itens: '10',
        pagina: String(pageIndex),
        nome: searchName,
        siglaUf,
        siglaPartido: partido,
      }),
  })

  function handleSearchName(value: string) {
    const isValid = VALIDATIONS_REGEX.MIN_3_CHARACTERES.test(value)

    if (isValid) {
      setSearchName(value)
    } else if (value === '') {
      setSearchName(undefined)
    }
  }

  const lastPage = deputados?.data.links
    .find((link) => link.rel === 'last')
    ?.href.match(VALIDATIONS_REGEX.GET_INDEX_PAGE)

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-5xl font-light">Deputados</h1>
      </div>

      <div className="grid-cols-4 mb-4 grid gap-6">
        <Input
          type="email"
          id="email"
          placeholder="Pesquisar por nome"
          onChange={(e) => handleSearchName(e.target.value)}
        />
        <Select onValueChange={(e) => setSiglaUf(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Pesquisar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Estados</SelectLabel>
              {SIGLAS_UF.map((estado, index) => {
                return (
                  <SelectItem key={index} value={estado.sigla}>
                    {estado.nome}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={(e) => setPartido(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Pesquisar por partidos" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Estados</SelectLabel>
              {PARTIDOS.map((partido, index) => {
                return (
                  <SelectItem key={index} value={partido.sigla}>
                    {`${partido.sigla} - ${partido.nome}`}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Table.Root>
        <Table.Header className="border-b-2 border-theme-gray-100 text-base">
          <Table.Row>
            <Table.Head>Nome</Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head>Partido</Table.Head>
            <Table.Head>UF</Table.Head>
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
            : deputados &&
              deputados.data.dados.map((deputado, index) => (
                <Table.Row
                  key={index}
                  className="items-center text-base hover:bg-theme-gray-100 hover:text-white"
                >
                  <Table.Cell className="flex items-center gap-4">
                    <Image
                      src={deputado.urlFoto}
                      alt={deputado.nome}
                      width={35}
                      height={35}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    {deputado.nome}
                  </Table.Cell>
                  <Table.Cell>{deputado.email}</Table.Cell>
                  <Table.Cell>{deputado.siglaPartido}</Table.Cell>
                  <Table.Cell>{deputado.siglaUf}</Table.Cell>
                  <Table.Cell>
                    <Info size={20} weight="duotone" />
                  </Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
        <Table.Caption>
          {lastPage && (
            <PaginationList
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              lastPage={Number(lastPage[1])}
            />
          )}
        </Table.Caption>
        <Table.Caption>Listagem dos deputados federais</Table.Caption>
      </Table.Root>
    </div>
  )
}

'use client'
import { getDeputados } from '@/httpsRequests/deputados/getDeputados'
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
import { IFilterGetDeputadosParams } from '@/httpsRequests/deputados/interfaces/filterGetDeputadosParams.interface'

export default function Deputados() {
  const defaultFilters: IFilterGetDeputadosParams = {
    nome: '',
    siglaUf: '',
    siglaPartido: '',
    pagina: '1',
    itens: '10',
  }

  const [filters, setFilters] =
    useState<IFilterGetDeputadosParams>(defaultFilters)

  const { pagina, siglaUf, siglaPartido } = filters

  const { data: deputados, isLoading } = useQuery({
    queryKey: ['deputados', filters],
    queryFn: () => getDeputados(filters),
  })

  function handleSetNome(value: string) {
    const isValid = VALIDATIONS_REGEX.MIN_3_CHARACTERES.test(value)

    if (isValid) {
      setFilters((prevState) => ({
        ...prevState,
        pagina: '1',
        nome: value,
      }))
    } else if (value === '') {
      setFilters((prevState) => ({
        ...prevState,
        nome: value,
      }))
    }
  }

  function handleSetSiglaUf(value: string) {
    if (value === 'null') {
      setFilters((prevState) => ({
        ...prevState,
        pagina: '1',
        siglaUf: '',
      }))
    } else {
      setFilters((prevState) => ({
        ...prevState,
        pagina: '1',
        siglaUf: value,
      }))
    }
  }

  function handleSetPartido(value: string) {
    if (value === 'null') {
      setFilters((prevState) => ({
        ...prevState,
        pagina: '1',
        siglaPartido: '',
      }))
    } else {
      setFilters((prevState) => ({
        ...prevState,
        pagina: '1',
        siglaPartido: value,
      }))
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
          type="text"
          placeholder="Pesquisar por nome"
          onChange={(e) => handleSetNome(e.target.value)}
        />
        <div>
          <Select onValueChange={handleSetSiglaUf} value={siglaUf}>
            <SelectTrigger>
              <SelectValue placeholder="Pesquisar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="null">Sem Filtro</SelectItem>
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
        </div>

        <Select onValueChange={handleSetPartido} value={siglaPartido}>
          <SelectTrigger>
            <SelectValue placeholder="Pesquisar por partidos" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="null">Sem Filtro</SelectItem>
              <SelectLabel>Partidos</SelectLabel>
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
        <Table.Caption>Listagem dos deputados federais</Table.Caption>
      </Table.Root>
    </div>
  )
}

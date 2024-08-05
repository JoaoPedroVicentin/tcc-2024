'use client'
import { getDeputados } from '@/httpsRequests/deputados/getDeputados'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import * as Table from '@/components/ui/table'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowSquareOut, Users } from '@phosphor-icons/react'
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
import { getPartidos } from '@/httpsRequests/partidos/getPartidos'
import Link from 'next/link'
import { internalRoutes } from '@/configs/internalRoutes'
import { Header } from '@/components/header'
import { WrapperList } from '@/components/wrapperList'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function Deputados() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const params = new URLSearchParams(searchParams.toString())

  const { nome, pagina, siglaUf, siglaPartido } = Object.fromEntries(
    params.entries(),
  )

  const { data: deputados, isLoading: isLoadingDeputados } = useQuery({
    queryKey: ['deputados', params.toString()],
    queryFn: () =>
      getDeputados({
        pagina,
        siglaUf,
        siglaPartido,
        itens: '10',
        idLegislatura: '57',
        nome,
      }),
  })

  const { data: partidos, isLoading: isLoadingPartidos } = useQuery({
    queryKey: ['partidos'],
    queryFn: () => getPartidos({ itens: '100' }),
  })

  const isLoading = !!(isLoadingDeputados || isLoadingPartidos)

  function handleSetParam(field: string, value: string) {
    if (value && value !== 'null') {
      params.set(field, value)
    } else {
      params.delete(field)
    }

    params.set('pagina', '1')

    router.replace(`${internalRoutes.deputados}?${params.toString()}`)
  }

  const handleSetParamName = useDebouncedCallback((value: string) => {
    if (value) {
      params.set('nome', value)
    } else {
      params.delete('nome')
    }

    params.set('pagina', '1')

    router.replace(`${internalRoutes.deputados}?${params.toString()}`)
  }, 500)

  function handleSetPage(value: string) {
    params.set('pagina', value)

    router.replace(`${internalRoutes.deputados}?${params.toString()}`)
  }

  const lastPage = deputados?.data.links
    .find((link) => link.rel === 'last')
    ?.href.match(VALIDATIONS_REGEX.GET_INDEX_PAGE)

  const hasData = !(!isLoading && deputados && deputados.data.dados.length <= 0)

  return (
    <WrapperList>
      <Header text="Deputados" icon={Users} />

      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Nome</label>
          <Input
            type="text"
            placeholder="Pesquisar por nome"
            onChange={(e) => handleSetParamName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Partido</label>
          <Select
            onValueChange={(e) => handleSetParam('siglaPartido', e)}
            value={siglaPartido}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pesquisar por partidos" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="null">Sem Filtro</SelectItem>
                <SelectLabel>Partidos</SelectLabel>
                {partidos &&
                  partidos.data.dados.map((partido, index) => {
                    return (
                      <SelectItem
                        key={index}
                        value={partido.sigla
                          .normalize('NFD')
                          .replace(VALIDATIONS_REGEX.REMOVE_ACCENTS, '')}
                      >
                        {`${partido.sigla} - ${partido.nome}`}
                      </SelectItem>
                    )
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Estado</label>
          <Select
            onValueChange={(e) => handleSetParam('siglaUf', e)}
            value={siglaUf}
          >
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
      </div>

      <Table.Root className="pb-0">
        <Table.Header className="border-b-2 border-theme-black-50 text-base">
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
                  <Table.Cell>
                    <Skeleton className="h-10 flex-1" />
                  </Table.Cell>
                </Table.Row>
              ))
            : deputados &&
              deputados.data.dados.map((deputado, index) => (
                <Table.Row
                  key={index}
                  className="items-center text-base hover:bg-theme-black-50 hover:text-white"
                >
                  <Table.Cell className="flex items-center gap-4">
                    <Image
                      src={deputado.urlFoto}
                      alt={deputado.nome}
                      width={35}
                      height={35}
                      className="h-10 w-10 object-cover"
                    />
                    {deputado.nome}
                  </Table.Cell>
                  <Table.Cell>
                    {deputado.email ? deputado.email : '---'}
                  </Table.Cell>
                  <Table.Cell>{deputado.siglaPartido}</Table.Cell>
                  <Table.Cell>{deputado.siglaUf}</Table.Cell>
                  <Table.Cell>
                    <Link href={internalRoutes.deputadoById(deputado.id)}>
                      <ArrowSquareOut size={24} />
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
        <Table.Caption>
          {lastPage && (
            <PaginationList
              pageIndex={pagina ? Number(pagina) : 1}
              setPageIndex={(index) => handleSetPage(String(index))}
              lastPage={Number(lastPage[1])}
            />
          )}
        </Table.Caption>

        {!hasData ? (
          <Table.DataEmpty />
        ) : (
          <Table.Caption>Listagem dos Deputados</Table.Caption>
        )}
      </Table.Root>
    </WrapperList>
  )
}

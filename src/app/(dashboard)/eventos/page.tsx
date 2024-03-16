'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import * as Table from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import PaginationList from '@/components/paginationList'
import { format } from 'date-fns'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IFilterGetEventosParams } from '@/httpsRequests/eventos/getEventos/interface/filterGetEventosParams.interface'
import { getEventos } from '@/httpsRequests/eventos/getEventos'
import { SITUACOES_EVENTO } from '@/constants/eventos/situacoesEvento'
import { TIPOS_EVENTO } from '@/constants/eventos/tiposEvento'
import Link from 'next/link'
import { Info } from '@phosphor-icons/react'
import { internalRoutes } from '@/configs/internalRoutes'

export default function Eventos() {
  const defaultFilters: IFilterGetEventosParams = {
    pagina: '1',
    itens: '10',
  }

  const [filters, setFilters] =
    useState<IFilterGetEventosParams>(defaultFilters)

  const { pagina, codSituacao, codTipoEvento } = filters

  const { data: eventos, isLoading } = useQuery({
    queryKey: ['eventos', filters],
    queryFn: () => getEventos(filters),
  })

  const lastPage = eventos?.data.links
    .find((link) => link.rel === 'last')
    ?.href.match(VALIDATIONS_REGEX.GET_INDEX_PAGE)

  function handleSetTipoEvento(value: string) {
    if (value === 'null') {
      setFilters((prevState) => ({
        ...prevState,
        pagina: '1',
        codTipoEvento: undefined,
      }))
    } else {
      setFilters((prevState) => ({
        ...prevState,
        pagina: '1',
        codTipoEvento: value,
      }))
    }
  }

  function handleSetSituacao(value: string) {
    if (value === 'null') {
      setFilters((prevState) => ({
        ...prevState,
        pagina: '1',
        codSituacao: undefined,
      }))
    } else {
      setFilters((prevState) => ({
        ...prevState,
        pagina: '1',
        codSituacao: value,
      }))
    }
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-5xl font-light">Eventos</h1>
      </div>

      <div className="mb-4 grid grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Tipo do evento</label>
          <Select onValueChange={handleSetTipoEvento} value={codTipoEvento}>
            <SelectTrigger>
              <SelectValue placeholder="Pesquisar por tipo do evento" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="null">Sem Filtro</SelectItem>
                <SelectLabel>Tipo do evento</SelectLabel>
                {TIPOS_EVENTO.map((tipo, index) => {
                  return (
                    <SelectItem key={index} value={tipo.cod}>
                      {tipo.nome}
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Situação</label>
          <Select onValueChange={handleSetSituacao} value={codSituacao}>
            <SelectTrigger>
              <SelectValue placeholder="Pesquisar por situação" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="null">Sem Filtro</SelectItem>
                <SelectLabel>Situação</SelectLabel>
                {SITUACOES_EVENTO.map((situacao, index) => {
                  return (
                    <SelectItem key={index} value={situacao.cod}>
                      {situacao.nome}
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
            <Table.Head>Descrição</Table.Head>
            <Table.Head>Local</Table.Head>
            <Table.Head>Data</Table.Head>
            <Table.Head>Início / Encerramento</Table.Head>
            <Table.Head>Situação</Table.Head>
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
                  <Table.Cell>
                    <Skeleton className="h-14 flex-1" />
                  </Table.Cell>
                </Table.Row>
              ))
            : eventos &&
              eventos.data.dados.map((evento, index) => (
                <Table.Row
                  key={index}
                  className="items-center text-base hover:bg-theme-gray-100 hover:text-white"
                >
                  <Table.Cell className="max-w-[50ch] overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {evento.descricao}
                  </Table.Cell>
                  <Table.Cell>
                    {evento.localCamara.nome ? evento.localCamara.nome : '---'}
                  </Table.Cell>
                  <Table.Cell>
                    {format(evento.dataHoraInicio, 'dd/MM/yyyy')}
                  </Table.Cell>
                  <Table.Cell>
                    {format(evento.dataHoraInicio, 'HH:mm')}
                    {' / '}
                    {evento.dataHoraFim
                      ? format(evento.dataHoraFim, 'HH:mm')
                      : '---'}
                  </Table.Cell>
                  <Table.Cell>{evento.situacao}</Table.Cell>
                  <Table.Cell>
                    <Link href={internalRoutes.eventoById(evento.id)}>
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
        {!isLoading && eventos && eventos.data.dados.length <= 0 ? (
          <Table.Caption>
            <Table.DataEmpty />
          </Table.Caption>
        ) : (
          <Table.Caption>Listagem dos Eventos</Table.Caption>
        )}
      </Table.Root>
    </div>
  )
}

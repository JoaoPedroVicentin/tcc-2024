'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useMemo, useState } from 'react'
import * as Table from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowSquareOut, Files } from '@phosphor-icons/react'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import PaginationList from '@/components/paginationList'
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
import { IFilterGetProposicoesParams } from '@/httpsRequests/proposicoes/getProposicoes/interfaces/filterGetProposicoesParams.interface'
import { getProposicoes } from '@/httpsRequests/proposicoes/getProposicoes'
import { TIPOS_PROPOSICAO } from '@/constants/proposicoes/tiposProposicao'
import { IConstantsData } from '@/interfaces/constantsData.interface'
import { TEMA_PROPOSICAO } from '@/constants/proposicoes/temaProposicao'
import { yearsBetweenCurrentYearAnd2019 } from '@/utils/yearsBetweenCurrentYearAnd2019'
import { Header } from '@/components/header'
import { WrapperList } from '@/components/wrapperList'

export default function Proposicoes() {
  const defaultFilters: IFilterGetProposicoesParams = {
    pagina: '1',
    itens: '10',
    ano: '2024',
  }

  const [filters, setFilters] =
    useState<IFilterGetProposicoesParams>(defaultFilters)

  const { pagina, ano, siglaTipo, codTema } = filters

  const { data: proposicoes, isLoading } = useQuery({
    queryKey: ['proposicoes', filters],
    queryFn: () => getProposicoes(filters),
  })

  const lastPage = proposicoes?.data.links
    .find((link) => link.rel === 'last')
    ?.href.match(VALIDATIONS_REGEX.GET_INDEX_PAGE)

  function handleSetAno(value: string) {
    setFilters((prevState) => ({
      ...prevState,
      pagina: '1',
      ano: value,
    }))
  }

  function handleSetTipo(value: string) {
    if (value === 'null') {
      setFilters((prevState) => ({
        ...prevState,
        pagina: '1',
        siglaTipo: undefined,
      }))
    } else {
      setFilters((prevState) => ({
        ...prevState,
        pagina: '1',
        siglaTipo: value,
      }))
    }
  }

  function handleSetTema(value: string) {
    if (value === 'null') {
      setFilters((prevState) => ({
        ...prevState,
        pagina: '1',
        codTema: undefined,
      }))
    } else {
      setFilters((prevState) => ({
        ...prevState,
        pagina: '1',
        codTema: value,
      }))
    }
  }

  function useFilteredTiposProposicao(
    constantsData: IConstantsData[],
  ): IConstantsData[] {
    const filteredTiposProposicao: IConstantsData[] = useMemo(() => {
      const siglasFound: string[] = []
      const filteredData = constantsData.filter((item) => {
        if (item.sigla && !siglasFound.includes(item.sigla)) {
          siglasFound.push(item.sigla)
          return true
        }
        return false
      })

      filteredData.sort((a, b) => {
        if (a.sigla && b.sigla) {
          return a.sigla.localeCompare(b.sigla)
        }
        return 0
      })

      return filteredData
    }, [constantsData])

    return filteredTiposProposicao
  }

  return (
    <WrapperList>
      <Header text="Proposições" icon={Files} />

      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Ano</label>
          <Select onValueChange={handleSetAno} value={ano}>
            <SelectTrigger>
              <SelectValue placeholder="Pesquisar por ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Ano</SelectLabel>
                {yearsBetweenCurrentYearAnd2019().map((ano, index) => {
                  return (
                    <SelectItem key={index} value={String(ano)}>
                      {ano}
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Tipo</label>
          <Select onValueChange={handleSetTipo} value={siglaTipo}>
            <SelectTrigger>
              <SelectValue placeholder="Pesquisar pelo tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="null">Sem Filtro</SelectItem>
                <SelectLabel>Tipo</SelectLabel>
                {useFilteredTiposProposicao(TIPOS_PROPOSICAO).map(
                  (tipo, index) => {
                    if (tipo.sigla) {
                      return (
                        <SelectItem key={index} value={tipo.sigla}>
                          {tipo.sigla} - {tipo.nome}
                        </SelectItem>
                      )
                    } else {
                      return null
                    }
                  },
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Tema</label>
          <Select onValueChange={handleSetTema} value={codTema}>
            <SelectTrigger>
              <SelectValue placeholder="Pesquisar por tema" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="null">Sem Filtro</SelectItem>
                <SelectLabel>Tema</SelectLabel>
                {TEMA_PROPOSICAO.map((tema, index) => {
                  return (
                    <SelectItem key={index} value={tema.cod}>
                      {tema.nome}
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
            <Table.Head>Proposição</Table.Head>
            <Table.Head>Ementa</Table.Head>
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
                </Table.Row>
              ))
            : proposicoes &&
              proposicoes.data.dados.map((proposicao, index) => (
                <Table.Row
                  key={index}
                  className="items-center text-base hover:bg-theme-black-50 hover:text-white"
                >
                  <Table.Cell>
                    {proposicao.siglaTipo} {proposicao.numero}/{proposicao.ano}
                  </Table.Cell>
                  <Table.Cell className="max-w-[50ch] overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {proposicao.ementa}
                  </Table.Cell>
                  <Table.Cell>
                    <Link href={internalRoutes.proposicaoById(proposicao.id)}>
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

        {!isLoading && proposicoes && proposicoes.data.dados.length <= 0 ? (
          <Table.Caption>
            <Table.DataEmpty />
          </Table.Caption>
        ) : (
          <Table.Caption>Listagem das Proposições</Table.Caption>
        )}
      </Table.Root>
    </WrapperList>
  )
}

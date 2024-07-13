'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import * as Table from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import PaginationList from '@/components/paginationList'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IFilterGetOrgaosParams } from '@/httpsRequests/orgaos/getOrgaos/interfaces/filterGetOrgaosParams.interface'
import { getOrgaos } from '@/httpsRequests/orgaos/getOrgaos'
import Link from 'next/link'
import { internalRoutes } from '@/configs/internalRoutes'
import { ArrowSquareOut, Gavel } from '@phosphor-icons/react'
import { TIPOS_ORGAO } from '@/constants/orgaos/tiposOrgao'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/header'
import { WrapperList } from '@/components/wrapperList'

export default function Orgaos() {
  const defaultFilters: IFilterGetOrgaosParams = {
    pagina: '1',
    itens: '10',
  }

  const [filters, setFilters] = useState<IFilterGetOrgaosParams>(defaultFilters)

  const { pagina, codTipoOrgao } = filters

  const { data: orgaos, isLoading } = useQuery({
    queryKey: ['orgaos', filters],
    queryFn: () => getOrgaos(filters),
  })

  const lastPage = orgaos?.data.links
    .find((link) => link.rel === 'last')
    ?.href.match(VALIDATIONS_REGEX.GET_INDEX_PAGE)

  function handleSetSigla(value: string) {
    setFilters((prevState) => ({
      ...prevState,
      pagina: '1',
      sigla: value,
    }))
  }

  function handleSetTipoOrgao(value: string) {
    if (value === 'null') {
      setFilters((prevState) => ({
        ...prevState,
        pagina: '1',
        codTipoOrgao: undefined,
      }))
    } else {
      setFilters((prevState) => ({
        ...prevState,
        pagina: '1',
        codTipoOrgao: value,
      }))
    }
  }

  return (
    <WrapperList>
      <Header text="Órgãos" icon={Gavel} />

      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Sigla</label>
          <Input
            type="text"
            placeholder="Pesquisar pela sigla"
            onChange={(e) => handleSetSigla(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Tipo</label>
          <Select onValueChange={handleSetTipoOrgao} value={codTipoOrgao}>
            <SelectTrigger>
              <SelectValue placeholder="Pesquisar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="null">Sem Filtro</SelectItem>
                <SelectLabel>Tipo</SelectLabel>
                {TIPOS_ORGAO.map((tipo, index) => {
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
      </div>

      <Table.Root className="pb-0">
        <Table.Header className="border-b-2 border-theme-black-50 text-base">
          <Table.Row>
            <Table.Head>Nome</Table.Head>
            <Table.Head>Sigla</Table.Head>
            <Table.Head>Apelido</Table.Head>
            <Table.Head>Tipo</Table.Head>
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
            : orgaos &&
              orgaos.data.dados.map((orgao, index) => (
                <Table.Row
                  key={index}
                  className="items-center text-base hover:bg-theme-black-50 hover:text-white"
                >
                  <Table.Cell className=" max-w-[50ch] overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {orgao.nomeResumido ? orgao.nomeResumido : orgao.nome}
                  </Table.Cell>
                  <Table.Cell>{orgao.sigla}</Table.Cell>
                  <Table.Cell>{orgao.apelido}</Table.Cell>
                  <Table.Cell>{orgao.tipoOrgao}</Table.Cell>
                  <Table.Cell>
                    <Link href={internalRoutes.orgaoById(orgao.id)}>
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
        {!isLoading && orgaos && orgaos.data.dados.length <= 0 ? (
          <Table.DataEmpty />
        ) : (
          <Table.Caption>Listagem dos Órgãos</Table.Caption>
        )}
      </Table.Root>
    </WrapperList>
  )
}

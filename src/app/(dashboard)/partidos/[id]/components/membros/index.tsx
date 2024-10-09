'use client'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowSquareOut, UserList } from '@phosphor-icons/react'
import PaginationList from '@/components/paginationList'
import { getDeputados } from '@/httpsRequests/deputados/getDeputados'
import { IFilterGetDeputadosParams } from '@/httpsRequests/deputados/getDeputados/interfaces/filterGetDeputadosParams.interface'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import { internalRoutes } from '@/configs/internalRoutes'
import * as Table from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import Title from '@/components/title'
import { WrapperSection } from '@/components/wrapperSection'

export default function MembrosPartido({
  siglaPartido,
}: {
  siglaPartido: string
}) {
  const defaultFilters: IFilterGetDeputadosParams = {
    nome: '',
    siglaUf: '',
    siglaPartido: siglaPartido
      .normalize('NFD')
      .replace(VALIDATIONS_REGEX.REMOVE_ACCENTS, ''),
    pagina: '1',
    itens: '10',
  }

  const [filters, setFilters] =
    useState<IFilterGetDeputadosParams>(defaultFilters)
  const { pagina } = filters

  const { data: deputados, isLoading } = useQuery({
    queryKey: ['deputadosByPartido', filters],
    queryFn: () => getDeputados(filters),
  })

  const lastPage = deputados?.data.links
    .find((link) => link.rel === 'last')
    ?.href.match(VALIDATIONS_REGEX.GET_INDEX_PAGE)

  return (
    <WrapperSection>
      <Title text="Membros" icon={UserList} />

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

        {!isLoading && deputados && deputados.data.dados.length <= 0 ? (
          <Table.DataEmpty />
        ) : (
          <Table.Caption>Lista dos Deputados</Table.Caption>
        )}
      </Table.Root>
    </WrapperSection>
  )
}

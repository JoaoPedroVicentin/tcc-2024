import PaginationList from '@/components/paginationList'
import { getDeputados } from '@/httpsRequests/deputados/getDeputados'
import { IFilterGetDeputadosParams } from '@/httpsRequests/deputados/interfaces/filterGetDeputadosParams.interface'
import { useQuery } from '@tanstack/react-query'
import * as Table from '@/components/ui/table'
import React, { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { Info, UserList } from '@phosphor-icons/react'
import { VALIDATIONS_REGEX } from '@/utils/regex'

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
    <div>
      <div className="my-5 flex items-center gap-2 bg-zinc-100 p-base text-black">
        <UserList size={26} weight="fill" />
        <h1 className="text-2xl font-normal">Membros</h1>
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

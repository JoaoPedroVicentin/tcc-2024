'use client'
import { getDeputados } from '@/httpsRequests/getDeputados'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import * as Table from '@/components/ui/table'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { Info } from '@phosphor-icons/react'
import * as Pagination from '@/components/ui/pagination'

export default function Deputados() {
  const [pageIndex, setPageIndex] = useState<number>(1)

  const { data: deputados, isLoading } = useQuery({
    queryKey: ['deputados', pageIndex],
    queryFn: () => getDeputados({ itens: '10', pagina: String(pageIndex) }),
  })

  return (
    <div className="h-full">
      <div className="mb-12">
        <h1 className="text-5xl font-light">Deputados</h1>
      </div>

      <Table.Root>
        <Table.Header className="border-theme-gray-100 border-b-2 text-base">
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
                  className="hover:bg-theme-gray-100 items-center text-base hover:text-white"
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
          <Pagination.Root className="flex-1">
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  href="#"
                  className="cursor-not-allowed"
                  onClick={() => setPageIndex(pageIndex - 1)}
                />
              </Pagination.Item>
              {pageIndex > 1 && (
                <Pagination.Item>
                  <Pagination.Link href="#">{pageIndex - 1}</Pagination.Link>
                </Pagination.Item>
              )}
              <Pagination.Item>
                <Pagination.Link href="#" isActive>
                  {pageIndex}
                </Pagination.Link>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Link href="#">{pageIndex + 1}</Pagination.Link>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Ellipsis />
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Next
                  href="#"
                  onClick={() => setPageIndex(pageIndex + 1)}
                />
              </Pagination.Item>
            </Pagination.Content>
          </Pagination.Root>
        </Table.Caption>
        <Table.Caption>Listagem dos deputados federais</Table.Caption>
      </Table.Root>
    </div>
  )
}

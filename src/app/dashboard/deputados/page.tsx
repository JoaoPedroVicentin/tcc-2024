'use client'
import { getDeputados } from '@/httpsRequests/getDeputados'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import * as Table from '@/components/ui/table'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

export default function Deputados() {
  const { data: deputados, isLoading } = useQuery({
    queryKey: ['deputados'],
    queryFn: () => getDeputados({ itens: '10', pagina: '1' }),
  })

  return (
    <div className="h-full">
      <div className="mb-12">
        <h1 className="text-5xl font-light">Deputados</h1>
      </div>

      <Table.Root>
        <Table.Caption>Listagem dos deputados federais</Table.Caption>
        <Table.Header className="border-theme-gray-100 border-b-2 text-base">
          <Table.Row>
            <Table.Head>Nome</Table.Head>
            <Table.Head>Partido</Table.Head>
            <Table.Head>UF</Table.Head>
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
                </Table.Row>
              ))
            : deputados &&
              deputados.data.map((deputado, index) => (
                <Table.Row
                  key={index}
                  className="hover:bg-theme-gray-100 text-base hover:text-white"
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
                  <Table.Cell>{deputado.siglaPartido}</Table.Cell>
                  <Table.Cell>{deputado.siglaUf}</Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

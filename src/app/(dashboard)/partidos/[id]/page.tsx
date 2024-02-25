'use client'
import { getPartidoById } from '@/httpsRequests/partidos/getPartidoById'
import { IRouteByIdProps } from '@/interfaces/routeByIdProps.interface'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MembrosPartido from './components/membros'

export default function PartidoById({ params: { id } }: IRouteByIdProps) {
  const { data: partido, isLoading } = useQuery({
    queryKey: ['partidoById'],
    queryFn: () => getPartidoById(id),
  })

  if (!isLoading && partido)
    return (
      <div className="h-full">
        <div className="mb-6">
          <h1 className="text-5xl font-light">
            {partido.data.dados.nome} - {partido.data.dados.sigla}
          </h1>
        </div>

        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Dados Gerais</TabsTrigger>
            <TabsTrigger value="members">Membros</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="members">
            <MembrosPartido siglaPartido={partido.data.dados.sigla} />
          </TabsContent>
        </Tabs>
      </div>
    )
}

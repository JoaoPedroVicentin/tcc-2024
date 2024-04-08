'use client'
import { IRouteByIdProps } from '@/interfaces/routeByIdProps.interface'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getDeputadoById } from '@/httpsRequests/deputados/getDeputadoById'
import { getProfissoesDeputado } from '@/httpsRequests/deputados/getProfissoesDeputado'
import { HeaderDeputado } from './components/headerDeputado'
import { AboutDeputado } from './components/aboutDeputado'

export default function DeputadoById({ params: { id } }: IRouteByIdProps) {
  const { data: deputado, isLoading: isLoadingDeputado } = useQuery({
    queryKey: ['deputadoById', id],
    queryFn: () => getDeputadoById(id),
  })

  const { data: profissoes, isLoading: isLoadingProfissoes } = useQuery({
    queryKey: ['profissoesDeputadoById', id],
    queryFn: () => getProfissoesDeputado(id),
  })

  const isLoading = !!(isLoadingDeputado || isLoadingProfissoes)

  if (!isLoading && deputado) {
    return (
      <main className="flex h-full flex-col">
        <HeaderDeputado deputado={deputado.data.dados} />
        <AboutDeputado
          deputado={deputado.data.dados}
          profissoes={profissoes?.data.dados}
        />
      </main>
    )
  }
}

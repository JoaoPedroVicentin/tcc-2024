'use client'
import { IRouteByIdProps } from '@/interfaces/routeByIdProps.interface'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getDeputadoById } from '@/httpsRequests/deputados/getDeputadoById'
import { HeaderDeputado } from './components/headerDeputado'
import { AboutDeputado } from './components/aboutDeputado'
import { ExpensesDeputado } from './components/expensesDeputado'
import { FrentesDeputado } from './components/frentesDeputado'
import { PrositionsDeputado } from './components/propositionsDeputado'
import { SpeechesDeputado } from './components/speechesDeputado'

export default function DeputadoById({ params: { id } }: IRouteByIdProps) {
  const { data: deputado, isLoading } = useQuery({
    queryKey: ['deputadoById', id],
    queryFn: () => getDeputadoById(id),
  })

  if (!isLoading && deputado) {
    return (
      <main className="flex h-full flex-col">
        <HeaderDeputado deputado={deputado.data.dados} />
        <AboutDeputado deputado={deputado.data.dados} />
        <ExpensesDeputado deputado={deputado.data.dados} />
        <PrositionsDeputado deputado={deputado.data.dados} />
        <SpeechesDeputado deputado={deputado.data.dados} />
        <FrentesDeputado deputado={deputado.data.dados} />
      </main>
    )
  }
}

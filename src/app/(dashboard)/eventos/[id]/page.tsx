'use client'
import { getEventoById } from '@/httpsRequests/eventos/getEventosById'
import { IRouteByIdProps } from '@/interfaces/routeByIdProps.interface'
import { useQuery } from '@tanstack/react-query'
import { HeaderEvento } from './components/headerEvento'
import { PollsEvento } from './components/pollsEvento'
import { DeputadosEvento } from './components/deputadosEvento'

export default function EventoById({ params: { id } }: IRouteByIdProps) {
  const { data: evento, isLoading } = useQuery({
    queryKey: ['eventoById', id],
    queryFn: () => getEventoById(id),
  })

  if (!isLoading && evento) {
    return (
      <main className="flex h-full flex-col">
        <HeaderEvento evento={evento.data.dados} />
        <DeputadosEvento evento={evento.data.dados} />
        <PollsEvento evento={evento.data.dados} />
      </main>
    )
  }
}

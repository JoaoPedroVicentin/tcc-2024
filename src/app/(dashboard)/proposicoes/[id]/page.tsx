'use client'
import { getProposicaoById } from '@/httpsRequests/proposicoes/getProposicaoById'
import { IRouteByIdProps } from '@/interfaces/routeByIdProps.interface'
import { useQuery } from '@tanstack/react-query'
import { HeaderProposicao } from './components/headerProposicao'
import { AboutProposicao } from './components/aboutProposicao'
import { RelatedProposicao } from './components/relatedProposicao'

export default function ProposicaoById({ params: { id } }: IRouteByIdProps) {
  const { data: proposicao, isLoading } = useQuery({
    queryKey: ['proposicaoById', id],
    queryFn: () => getProposicaoById(id),
  })

  if (!isLoading && proposicao) {
    return (
      <main className="flex h-full flex-col">
        <HeaderProposicao proposicao={proposicao.data.dados} />
        <AboutProposicao proposicao={proposicao.data.dados} />
        <RelatedProposicao proposicao={proposicao.data.dados} />
      </main>
    )
  }
}

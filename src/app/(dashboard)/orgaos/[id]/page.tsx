'use client'
import { getOrgaoById } from '@/httpsRequests/orgaos/getOrgaoById'
import { useQuery } from '@tanstack/react-query'
import { MembersOrgao } from './components/membersOrgao'
import { PollsOrgao } from './components/pollsOrgao'
import { HeaderOrgao } from './components/headerOrgao'
import { EventosOrgao } from './components/eventosOrgao'

export default function OrgaoById({
  params: { id },
}: {
  params: {
    id: string
  }
}) {
  const { data: orgao, isLoading } = useQuery({
    queryKey: ['orgaoById', id],
    queryFn: () => getOrgaoById(id),
  })

  if (!isLoading && orgao) {
    return (
      <main className="flex h-full flex-col">
        <HeaderOrgao orgao={orgao.data.dados} />
        <MembersOrgao orgao={orgao.data.dados} />
        <EventosOrgao orgao={orgao.data.dados} />
        <PollsOrgao orgao={orgao.data.dados} />
      </main>
    )
  }
}

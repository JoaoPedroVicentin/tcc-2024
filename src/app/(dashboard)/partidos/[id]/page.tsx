'use client'
import { getPartidoById } from '@/httpsRequests/partidos/getPartidoById'
import { IRouteByIdProps } from '@/interfaces/routeByIdProps.interface'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import MembrosPartido from './components/membros'
import { CrownSimple, Flag } from '@phosphor-icons/react'
import Title from '@/components/title'
import { WrapperSection } from '@/components/wrapperSection'
import { Header } from '@/components/header'
import { DeputadoCard } from '../../eventos/[id]/components/deputadosEvento/components/deputadoCard'
import { VALIDATIONS_REGEX } from '@/utils/regex'

export default function PartidoById({ params: { id } }: IRouteByIdProps) {
  const { data: partido, isLoading } = useQuery({
    queryKey: ['partidoById', id],
    queryFn: () => getPartidoById(id),
  })

  const idLider =
    partido &&
    partido?.data.dados.status.lider.uri.match(VALIDATIONS_REGEX.GER_ID_FOR_URL)

  const hasLider = !!(idLider && idLider[1])

  if (!isLoading && partido)
    return (
      <main className="flex h-full flex-col">
        <WrapperSection>
          <Header text="Partido" icon={Flag} />
          <h1 className="text-5xl font-light">
            {partido.data.dados.sigla} - {partido.data.dados.nome}
          </h1>
        </WrapperSection>
        {hasLider && (
          <WrapperSection className="bg-theme-white-50">
            <Title text="Líder" icon={CrownSimple} />

            <DeputadoCard
              className="w-fit"
              deputado={{
                id: Number(idLider[1]),
                email: '',
                nome: partido.data.dados.status.lider.nome,
                idLegislatura: partido.data.dados.status.lider.idLegislatura,
                siglaPartido: partido.data.dados.status.lider.siglaPartido,
                siglaUf: partido.data.dados.status.lider.uf,
                uri: partido.data.dados.status.lider.uri,
                uriPartido: partido.data.dados.status.lider.uriPartido,
                urlFoto: partido.data.dados.status.lider.urlFoto,
              }}
            />
          </WrapperSection>
        )}
        <MembrosPartido siglaPartido={partido.data.dados.sigla} />
      </main>
    )
}

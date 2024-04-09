'use client'
import { getPartidoById } from '@/httpsRequests/partidos/getPartidoById'
import { IRouteByIdProps } from '@/interfaces/routeByIdProps.interface'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import MembrosPartido from './components/membros'
import Image from 'next/image'
import { CrownSimple, Info } from '@phosphor-icons/react'
import Title from '@/components/title'

export default function PartidoById({ params: { id } }: IRouteByIdProps) {
  const { data: partido, isLoading } = useQuery({
    queryKey: ['partidoById', id],
    queryFn: () => getPartidoById(id),
  })

  if (!isLoading && partido)
    return (
      <div className="flex h-full flex-col gap-5 p-section">
        <div>
          <h1 className="text-5xl font-light">
            {partido.data.dados.nome} - {partido.data.dados.sigla}
          </h1>
        </div>

        <Title text="Líder" icon={CrownSimple} />

        <div className="flex items-end gap-2">
          <Image
            className="rounded-md"
            src={partido.data.dados.status.lider.urlFoto}
            width={100}
            height={75}
            alt={partido.data.dados.status.lider.nome}
          />
          <div className="flex h-full w-fit flex-col justify-between gap-2">
            <p className="text-xl">{partido.data.dados.status.lider.nome}</p>
            <p className="text-xl">
              {partido.data.dados.status.lider.siglaPartido} -{' '}
              {partido.data.dados.status.lider.uf}
            </p>
            <button
              type="button"
              className="flex w-fit items-center justify-center gap-2 border-2 border-theme-green-100 bg-theme-green-100 p-base font-bold text-black transition hover:border-theme-black-50"
            >
              <Info size={20} weight="bold" />
              Saber mais
            </button>
          </div>
        </div>

        <MembrosPartido siglaPartido={partido.data.dados.sigla} />
      </div>
    )
}

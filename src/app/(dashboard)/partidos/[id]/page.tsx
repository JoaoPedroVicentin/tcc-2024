'use client'
import { getPartidoById } from '@/httpsRequests/partidos/getPartidoById'
import { IRouteByIdProps } from '@/interfaces/routeByIdProps.interface'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import MembrosPartido from './components/membros'
import Image from 'next/image'
import { CrownSimple, Info } from '@phosphor-icons/react'

export default function PartidoById({ params: { id } }: IRouteByIdProps) {
  const { data: partido, isLoading } = useQuery({
    queryKey: ['partidoById', id],
    queryFn: () => getPartidoById(id),
  })

  if (!isLoading && partido)
    return (
      <div className="flex h-full flex-col gap-5">
        <div>
          <h1 className="text-5xl font-light">
            {partido.data.dados.nome} - {partido.data.dados.sigla}
          </h1>
        </div>

        <div>
          <div className="p-base my-5 flex items-center gap-2 bg-zinc-100 text-black">
            <CrownSimple size={26} weight="fill" />
            <h1 className="text-2xl font-normal">Líder</h1>
          </div>

          <div className="flex items-end gap-2">
            <Image
              src={partido.data.dados.status.lider.urlFoto}
              width={100}
              height={75}
              alt={partido.data.dados.status.lider.nome}
            />
            <div className="flex flex-col gap-2">
              <p className="text-xl">{partido.data.dados.status.lider.nome}</p>
              <p className="text-xl">{partido.data.dados.status.lider.uf}</p>
              <button
                type="button"
                className="p-base flex w-fit items-center justify-center gap-2 bg-black font-bold text-white transition hover:bg-theme-green-200 hover:text-black"
              >
                <Info size={20} weight="bold" />
                Saber mais
              </button>
            </div>
          </div>
        </div>

        <MembrosPartido siglaPartido={partido.data.dados.sigla} />
      </div>
    )
}

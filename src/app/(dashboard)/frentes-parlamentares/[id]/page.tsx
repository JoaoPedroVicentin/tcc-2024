'use client'
import { IRouteByIdProps } from '@/interfaces/routeByIdProps.interface'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getFrenteParlamentarById } from '@/httpsRequests/frentesParlamentares/getFrenteParlamentarById'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import {
  EnvelopeSimple,
  FileText,
  Info,
  Person,
  Phone,
  PhoneDisconnect,
  Steps,
} from '@phosphor-icons/react'
import Link from 'next/link'
import Image from 'next/image'

export default function FrenteParlamentarById({
  params: { id },
}: IRouteByIdProps) {
  const { data: frente, isLoading } = useQuery({
    queryKey: ['frentesParlamentaresById', id],
    queryFn: () => getFrenteParlamentarById(id),
  })

  function isDateValid(dateString: string): boolean {
    const [day, month, year] = dateString.split('/')
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    return (
      date.getDate() === parseInt(day, 10) &&
      date.getMonth() === parseInt(month, 10) - 1 &&
      date.getFullYear() === parseInt(year, 10)
    )
  }

  if (!isLoading && frente) {
    const parts = frente.data.dados.situacao
      .split(VALIDATIONS_REGEX.IS_DATE_VALID)
      .filter(Boolean)

    const validParts = parts.filter((part, index) => {
      if (index % 2 === 0) {
        const date = part.trim()
        return isDateValid(date)
      }
      return true
    })
    return (
      <div className="flex h-full flex-col gap-10">
        <div>
          <h1 className="text-5xl font-light">{frente.data.dados.titulo}</h1>
        </div>

        <Link
          href={frente.data.dados.urlDocumento}
          target="_blank"
          className="p-base flex w-fit items-center justify-center gap-2 border-2 border-theme-green-200 bg-theme-green-200 font-bold text-black transition hover:border-theme-black"
        >
          <FileText size={20} weight="bold" />
          Ver documento
        </Link>

        <div className="flex flex-col gap-2">
          <div className="p-base mb-5 flex  items-center gap-2 bg-zinc-100 text-black">
            <Person size={26} weight="fill" />
            <h1 className="text-2xl font-normal">Coordenador</h1>
          </div>

          <div className="flex items-end gap-2">
            <Image
              src={frente.data.dados.coordenador.urlFoto}
              width={100}
              height={75}
              alt={frente.data.dados.coordenador.nome}
            />
            <div className="flex flex-col gap-2">
              <p className="text-xl">{frente.data.dados.coordenador.nome}</p>
              <p className="text-xl">
                {frente.data.dados.coordenador.siglaPartido} -{' '}
                {frente.data.dados.coordenador.siglaUf}
              </p>
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

        <div>
          <div className="flex flex-col gap-2">
            <div className="p-base mb-5 flex items-center gap-2 bg-zinc-100 text-black">
              <Steps size={26} weight="fill" />
              <h1 className="text-2xl font-normal">Situação</h1>
            </div>
            {validParts.map((parte, index) => {
              if (index % 2 === 0) {
                return (
                  <div
                    key={index}
                    className="p-base flex flex-col gap-2 bg-zinc-50"
                  >
                    <p className="text-lg">{validParts[index + 1]}</p>
                    <p>{parte}</p>
                  </div>
                )
              } else return null
            })}
          </div>
        </div>

        <div>
          <div className="p-base mb-5 flex items-center gap-2 bg-zinc-100 text-black">
            <PhoneDisconnect size={26} weight="fill" />
            <h1 className="text-2xl font-normal">Contato</h1>
          </div>
          <div className="p-base flex items-center gap-2">
            <Phone size={24} weight="fill" />
            <p className="text-lg">{frente.data.dados.telefone}</p>
          </div>
          <div className="p-base flex items-center gap-2">
            <EnvelopeSimple size={24} weight="fill" />
            <p className="text-lg">{frente.data.dados.email}</p>
          </div>
        </div>
      </div>
    )
  }
}

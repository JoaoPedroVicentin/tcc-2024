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

        {frente.data.dados.urlDocumento && (
          <Link
            href={frente.data.dados.urlDocumento}
            className="hover:border-theme-black-50 flex w-fit items-center justify-center gap-2 border-2 border-theme-green-100 bg-theme-green-100 p-base font-bold text-black transition"
          >
            <FileText size={20} weight="bold" />
            Ver documento
          </Link>
        )}

        {frente.data.dados.coordenador && (
          <div className="flex flex-col gap-2">
            <div className="mb-5 flex items-center  gap-2 bg-zinc-100 p-base text-black">
              <Person size={26} weight="fill" />
              <h1 className="text-2xl font-normal">Coordenador</h1>
            </div>

            <div className="flex items-end gap-2">
              <Image
                className="rounded-md"
                src={frente.data.dados.coordenador.urlFoto}
                width={100}
                height={75}
                alt={frente.data.dados.coordenador.nome}
              />
              <div className="flex h-full w-fit flex-col justify-between gap-2">
                <p className="text-xl">{frente.data.dados.coordenador.nome}</p>
                <p className="text-xl">
                  {frente.data.dados.coordenador.siglaPartido} -{' '}
                  {frente.data.dados.coordenador.siglaUf}
                </p>
                <button
                  type="button"
                  className="hover:border-theme-black-50 flex w-fit items-center justify-center gap-2 border-2 border-theme-green-100 bg-theme-green-100 p-base font-bold text-black transition"
                >
                  <Info size={20} weight="bold" />
                  Saber mais
                </button>
              </div>
            </div>
          </div>
        )}

        {frente.data.dados.situacao && (
          <div>
            <div className="flex flex-col gap-2">
              <div className="mb-5 flex items-center gap-2 bg-zinc-100 p-base text-black">
                <Steps size={26} weight="fill" />
                <h1 className="text-2xl font-normal">Situação</h1>
              </div>
              {validParts.reverse().map((parte, index) => {
                if (index % 2 === 0) {
                  return (
                    <div
                      key={index}
                      className="flex flex-col gap-2 bg-zinc-50 p-base"
                    >
                      <p className="text-lg">{validParts[index + 1]}</p>
                      <p>{parte}</p>
                    </div>
                  )
                } else return null
              })}
            </div>
          </div>
        )}

        {!!(frente.data.dados.email || frente.data.dados.telefone) && (
          <div>
            <div className="mb-5 flex items-center gap-2 bg-zinc-100 p-base text-black">
              <PhoneDisconnect size={26} weight="fill" />
              <h1 className="text-2xl font-normal">Contato</h1>
            </div>
            {frente.data.dados.telefone && (
              <div className="flex items-center gap-2 p-base">
                <Phone size={24} weight="fill" />
                <p className="text-lg">{frente.data.dados.telefone}</p>
              </div>
            )}
            {frente.data.dados.email && (
              <div className="flex items-center gap-2 p-base">
                <EnvelopeSimple size={24} weight="fill" />
                <p className="text-lg">{frente.data.dados.email}</p>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

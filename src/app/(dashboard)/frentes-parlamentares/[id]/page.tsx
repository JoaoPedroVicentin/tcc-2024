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
  UsersThree,
} from '@phosphor-icons/react'
import Image from 'next/image'
import { Button } from '@/components/button'
import { LinkButton } from '@/components/link'
import Title from '@/components/title'
import InfoComponent from '@/components/info'
import { hasNonNullFields } from '@/utils/haxNonNullFields'
import { WrapperSection } from '@/components/wrapperSection'
import { Header } from '@/components/header'

export default function FrenteParlamentarById({
  params: { id },
}: IRouteByIdProps) {
  const { data: frente, isLoading } = useQuery({
    queryKey: ['frenteParlamentarById', id],
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

    const { coordenador } = frente.data.dados
    const coordenadorValido = hasNonNullFields(coordenador)

    return (
      <WrapperSection>
        <Header text="Frente Parlamentar" icon={UsersThree} />
        <h1>{frente.data.dados.titulo}</h1>

        {frente.data.dados.urlDocumento && (
          <LinkButton
            href={frente.data.dados.urlDocumento}
            leftIcon={FileText}
            text="Documento"
            variant="alternative"
          />
        )}

        {coordenadorValido && (
          <div className="flex flex-col gap-2">
            <Title text="Coordenador" icon={Person} />

            <div className="flex items-end gap-2">
              {coordenador.urlFoto && coordenador.nome && (
                <Image
                  className="rounded-md"
                  src={coordenador.urlFoto}
                  width={100}
                  height={75}
                  alt={coordenador.nome}
                />
              )}
              <div className="flex h-full w-fit flex-col justify-between gap-2">
                <p className="text-xl">{coordenador.nome}</p>
                {coordenador.siglaPartido && coordenador.siglaUf && (
                  <p className="text-xl">
                    {coordenador.siglaPartido} - {coordenador.siglaUf}
                  </p>
                )}
                <Button leftIcon={Info} text="Saber mais" variant="default" />
              </div>
            </div>
          </div>
        )}

        {frente.data.dados.situacao && (
          <div>
            <div className="flex flex-col gap-2">
              <Title text="Situação" icon={Steps} />
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
          <div className="flex flex-col gap-4">
            <Title text="Contato" icon={PhoneDisconnect} />
            {frente.data.dados.telefone && (
              <InfoComponent
                icon={Phone}
                label="Telefone"
                value={frente.data.dados.telefone}
              />
            )}
            {frente.data.dados.email && (
              <InfoComponent
                icon={EnvelopeSimple}
                label="Email"
                value={frente.data.dados.email}
              />
            )}
          </div>
        )}
      </WrapperSection>
    )
  }
}

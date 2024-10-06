'use client'
import { IRouteByIdProps } from '@/interfaces/routeByIdProps.interface'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getFrenteParlamentarById } from '@/httpsRequests/frentesParlamentares/getFrenteParlamentarById'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import {
  Check,
  EnvelopeSimple,
  FileText,
  Person,
  Phone,
  PhoneDisconnect,
  Steps,
  UsersThree,
} from '@phosphor-icons/react'
import { LinkButton } from '@/components/link'
import Title from '@/components/title'
import InfoComponent from '@/components/info'
import { hasNonNullFields } from '@/utils/haxNonNullFields'
import { WrapperSection } from '@/components/wrapperSection'
import { Header } from '@/components/header'
import { DeputadoCard } from '../../eventos/[id]/components/deputadosEvento/components/deputadoCard'

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

    const hasContact = !!(frente.data.dados.email || frente.data.dados.telefone)

    return (
      <main className="flex h-full flex-col">
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
        </WrapperSection>

        {!!(coordenadorValido || hasContact) && (
          <WrapperSection
            className="bg-theme-white-50"
            classNameChildren="flex flex-wrap"
          >
            {coordenadorValido && (
              <div className="flex w-fit flex-1 flex-col gap-4">
                <Title text="Coordenador" icon={Person} />

                <DeputadoCard
                  className="w-fit"
                  deputado={{
                    id: coordenador.id,
                    email: coordenador.email ?? '',
                    nome: coordenador.nome ?? '',
                    idLegislatura: coordenador.idLegislatura,
                    siglaPartido: coordenador.siglaPartido ?? '',
                    siglaUf: coordenador.siglaUf ?? '',
                    uri: coordenador.uri ?? '',
                    uriPartido: coordenador.uriPartido ?? '',
                    urlFoto: coordenador.urlFoto ?? '',
                  }}
                />
              </div>
            )}

            {hasContact && (
              <div className="flex w-fit flex-1 flex-col gap-4">
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
        )}

        {frente.data.dados.situacao && (
          <WrapperSection>
            <Title text="Situação" icon={Steps} />
            <div>
              {validParts.reverse().map((parte, index) => {
                const isLastItem = !!(
                  validParts.length - 1 === index ||
                  validParts.length - 2 === index
                )

                if (index % 2 === 0) {
                  return (
                    <div key={index} className="relative flex gap-5">
                      <div className="flex flex-1 gap-3">
                        <div className="flex flex-col items-center">
                          <div className="flex w-fit items-center justify-center rounded-full bg-theme-green-100 p-1.5">
                            <Check size={12} />
                          </div>
                          {!isLastItem && (
                            <div className="h-full w-1 bg-theme-green-100" />
                          )}
                        </div>
                        <div className="mb-5 flex flex-1 flex-col gap-5 border-b border-theme-gray-100 pb-5">
                          <li className="line-clamp-3 ">
                            {validParts[index + 1]} {parte}
                          </li>
                        </div>
                      </div>
                    </div>
                  )
                } else return null
              })}
            </div>
          </WrapperSection>
        )}
      </main>
    )
  }
}

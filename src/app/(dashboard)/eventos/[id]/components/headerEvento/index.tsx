import {
  ArrowSquareOut,
  Building,
  Calendar,
  CalendarBlank,
  Clock,
  Gavel,
  Info,
  TextAlignLeft,
  YoutubeLogo,
} from '@phosphor-icons/react'
import { Header } from '@/components/header'
import { WrapperSection } from '@/components/wrapperSection'
import { IEventoSectionProps } from '../../interface/eventoSectionProps.interface'
import { LinkButton } from '@/components/link'
import { internalRoutes } from '@/configs/internalRoutes'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import InfoComponent from '@/components/info'
import { format } from 'date-fns'
import { Button } from '@/components/button'
import { useState } from 'react'

export function HeaderEvento({ evento }: IEventoSectionProps) {
  const [typeDataVisualization, setTypeDataVisualization] = useState<
    'infos' | 'description'
  >('infos')

  function checkButtonState(
    type: 'infos' | 'description',
  ): 'alternative' | 'ghost' {
    if (typeDataVisualization === type) {
      return 'alternative'
    } else {
      return 'ghost'
    }
  }

  const descricaoFormatada =
    evento &&
    evento.descricao
      .split('\r\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

  function getEmbedUrl(url: string) {
    const videoId = url.split('v=')[1]
    return `https://www.youtube.com/embed/${videoId}`
  }

  const horario = format(evento.dataHoraInicio, 'HH:mm')

  const data = format(evento.dataHoraInicio, 'dd/MM/yy')

  const { sala, andar, nome, predio } = evento.localCamara

  let localInfo = ''

  localInfo += nome || ''

  localInfo += predio ? `Prédio ${predio}` : ''

  localInfo += sala ? `, Sala ${sala}` : ''

  localInfo += andar ? `, Andar ${andar}` : ''

  return (
    <WrapperSection>
      <Header text="Evento" icon={Calendar} />
      <h1>{descricaoFormatada[0]}</h1>

      {descricaoFormatada.length > 1 && (
        <div className="flex gap-4">
          <Button
            type="button"
            onClick={() => setTypeDataVisualization('infos')}
            variant={checkButtonState('infos')}
            leftIcon={Info}
            weight="fill"
          />
          <Button
            type="button"
            onClick={() => setTypeDataVisualization('description')}
            variant={checkButtonState('description')}
            leftIcon={TextAlignLeft}
          />
        </div>
      )}

      <div className="grid h-fit grid-cols-event gap-6 overflow-hidden">
        <div className="relative">
          <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col gap-4 overflow-auto">
            <h2>{evento.descricaoTipo}</h2>
            <div className="flex items-center gap-2 bg-theme-black-50 px-3 py-2 text-white">
              <Gavel size={20} weight="fill" />
              <p>{evento.orgaos[0].sigla}</p>
            </div>
            {typeDataVisualization === 'infos' &&
              evento.requerimentos.length > 0 &&
              evento.requerimentos.map(({ titulo, uri }) => {
                const idProposicao = uri?.match(
                  VALIDATIONS_REGEX.GER_ID_FOR_URL,
                )
                const hasOtherProposicao = !!(idProposicao && idProposicao[1])

                if (hasOtherProposicao) {
                  return (
                    <div
                      key={uri}
                      className="flex items-center justify-between"
                    >
                      <h3>{titulo}</h3>
                      <LinkButton
                        href={internalRoutes.proposicaoById(
                          Number(idProposicao[1]),
                        )}
                        leftIcon={ArrowSquareOut}
                      />
                    </div>
                  )
                } else {
                  return null
                }
              })}
            <div className="h-px w-full bg-theme-gray-50" />

            {typeDataVisualization === 'infos' ? (
              <div className="flex flex-1 flex-col gap-4">
                <InfoComponent icon={CalendarBlank} label="Data" value={data} />
                <InfoComponent icon={Clock} label="Horário" value={horario} />
                <InfoComponent
                  icon={Building}
                  label="Local"
                  value={localInfo}
                />
              </div>
            ) : (
              <ul className="flex list-none flex-col gap-2 overflow-y-scroll pr-2">
                {descricaoFormatada.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            )}

            {evento.urlRegistro && (
              <LinkButton
                href={evento.urlRegistro}
                text="Ver no Youtube"
                leftIcon={YoutubeLogo}
                variant="alternative"
              />
            )}
          </div>
        </div>
        {evento.urlRegistro && (
          <iframe
            src={getEmbedUrl(evento.urlRegistro)}
            title={evento.descricaoTipo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="aspect-video w-full"
          ></iframe>
        )}
      </div>
    </WrapperSection>
  )
}

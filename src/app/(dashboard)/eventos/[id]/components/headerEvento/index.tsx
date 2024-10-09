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
import { SITUACOES_EVENTO } from '@/constants/eventos/situacoesEvento'

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

  const eventHasEnded = !!(
    evento.situacao === SITUACOES_EVENTO[3].nome ||
    evento.situacao === SITUACOES_EVENTO[6].nome ||
    evento.situacao === SITUACOES_EVENTO[7].nome ||
    evento.situacao === SITUACOES_EVENTO[8].nome
  )

  const situacaoEvento = SITUACOES_EVENTO.find(
    (situacao) => situacao.nome === evento.situacao,
  )

  return (
    <WrapperSection>
      <Header
        text="Evento"
        icon={Calendar}
        info={
          <p className="text-sm text-black">
            Na seção inicial, são apresentados um resumo das informações sobre o
            evento, com o título representando sua descrição.
            <br /> Logo acima, é exibida sua situação atual, como, por exemplo,
            se já foi encerrado ou não. Também são mostrados o tipo do evento,
            data, horário, local de realização e a sigla do órgão que coordenou
            o evento. <br />
            Se alguma proposição foi debatida durante o evento, o link para sua
            página é exibido ao lado de seu título. Ao lado dessas informações,
            há o vídeo completo do evento, disponibilizado no canal oficial da
            Câmara dos Deputados no YouTube.
            <br /> Além disso, há um link no canto inferior esquerdo da seção
            que redireciona o usuário para assistir o vídeo diretamente na
            plataforma.
          </p>
        }
      />

      <h1>{descricaoFormatada[0]}</h1>

      {situacaoEvento && (
        <InfoComponent
          icon={situacaoEvento.icon}
          label="Situação"
          value={situacaoEvento.nome}
        />
      )}

      {eventHasEnded && descricaoFormatada.length > 1 && (
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

      {eventHasEnded && (
        <div className="flex flex-col gap-6 lg:grid lg:h-fit lg:grid-cols-event lg:overflow-hidden">
          <div className="relative">
            <div className="flex flex-col gap-4 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:top-0 lg:overflow-auto">
              <h2>{evento.descricaoTipo}</h2>

              <div className="flex items-center gap-2 bg-theme-black-50 px-3 py-2 text-white">
                <Gavel size={20} weight="fill" />
                {evento.orgaos.map((orgao) => (
                  <p key={orgao.id}>{orgao.sigla}</p>
                ))}
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
                <div className="flex flex-1 flex-wrap gap-4 overflow-y-auto lg:flex-col">
                  <div>
                    <InfoComponent
                      icon={CalendarBlank}
                      label="Data"
                      value={data}
                    />
                  </div>
                  <div>
                    <InfoComponent
                      icon={Clock}
                      label="Horário"
                      value={horario}
                    />
                  </div>
                  <div>
                    <InfoComponent
                      icon={Building}
                      label="Local"
                      value={localInfo}
                    />
                  </div>
                </div>
              ) : (
                <ul className="flex flex-1 list-none flex-col gap-2 overflow-y-auto pr-2">
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
      )}
    </WrapperSection>
  )
}

import InfoComponent from '@/components/info'
import { LinkButton } from '@/components/link'
import {
  ArrowSquareOut,
  Calendar,
  CalendarBlank,
  Clock,
  Gavel,
} from '@phosphor-icons/react'
import { IPollCardProps } from './interface/pollCardProps.interface'
import { format } from 'date-fns'
import { checkString } from '@/utils/checkString'
import { STATUS_VOTACAO } from './constant/statusVotacao.constant'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import { internalRoutes } from '@/configs/internalRoutes'

export function PollCard({ id, poll, isEventoPage }: IPollCardProps) {
  const {
    aprovacao,
    dataHoraRegistro,
    descricao,
    proposicaoObjeto,
    siglaOrgao,
    uriProposicaoObjeto,
    uriEvento,
  } = poll

  const horario = format(dataHoraRegistro, 'HH:mm')
  const data = format(dataHoraRegistro, 'dd/MM/yy')

  const statusVotacao =
    aprovacao !== null ? STATUS_VOTACAO[aprovacao] : STATUS_VOTACAO.NULL

  const idProposicao = uriProposicaoObjeto?.match(
    VALIDATIONS_REGEX.GER_ID_FOR_URL,
  )

  const idEvento = uriEvento?.match(VALIDATIONS_REGEX.GER_ID_FOR_URL)

  const hasOtherProposicao = !!(
    idProposicao &&
    idProposicao[1] &&
    Number(idProposicao[1]) !== id
  )

  const hasEvento = !!(idEvento && idEvento[1])

  return (
    <div className="flex w-72 flex-col gap-4 border border-theme-gray-50 bg-theme-white-50 px-4 py-5 lg:min-w-[325px]">
      <div
        className={
          statusVotacao.className
            ? statusVotacao.className
            : 'flex items-center gap-2 border border-theme-red-100 bg-theme-red-50 px-3 py-2 text-theme-black-50'
        }
      >
        <statusVotacao.icon size={20} weight="fill" />
        <p>{statusVotacao.text}</p>
      </div>

      <div className="flex items-center gap-2 bg-theme-black-50 px-3 py-2 text-white">
        <Gavel size={20} weight="fill" />
        <p>{siglaOrgao}</p>
      </div>

      {hasOtherProposicao && (
        <div className="flex flex-wrap items-center justify-between gap-1">
          <h3>{proposicaoObjeto}</h3>
          <LinkButton
            href={internalRoutes.proposicaoById(Number(idProposicao[1]))}
            leftIcon={ArrowSquareOut}
          />
        </div>
      )}

      <div className="h-px w-full bg-theme-gray-50" />

      <div className="flex flex-1">
        <div className="flex h-fit min-h-24">
          <p className="line-clamp-[8]">{checkString(descricao)}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <InfoComponent icon={CalendarBlank} label="Data" value={data} />
        <InfoComponent icon={Clock} label="Horário" value={horario} />
      </div>

      <div className="h-px w-full bg-theme-gray-50" />

      <div className="flex flex-wrap gap-3">
        {!isEventoPage && hasEvento && (
          <LinkButton
            href={internalRoutes.eventoById(Number(idEvento[1]))}
            variant="alternative"
            leftIcon={Calendar}
            text="Evento"
            className="w-full"
          />
        )}
        {/* <LinkButton
          href="#"
          variant="alternative"
          leftIcon={Ticket}
          text="Votação"
          className="w-full"
        /> */}
      </div>
    </div>
  )
}

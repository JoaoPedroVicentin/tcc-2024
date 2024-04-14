import InfoComponent from '@/components/info'
import { ISpeechCardProps } from './interface/speechCardProps.interface'
import { Button } from '@/components/button'
import { CalendarBlank, Clock, FrameCorners } from '@phosphor-icons/react'

export function SpeechCard({
  typeSpeech,
  faseEvent,
  summary,
}: ISpeechCardProps) {
  const { titulo, dataHoraInicio, dataHoraFim } = faseEvent

  return (
    <div className="flex flex-col gap-4 border border-theme-gray-50 bg-theme-white-50 px-4 py-5">
      <div className="flex items-center bg-theme-black-50 p-2 text-white">
        <p className="font-medium">{titulo}</p>
      </div>
      <div>
        <h3 className="truncate">{typeSpeech}</h3>
      </div>
      <div className="h-px w-full bg-theme-gray-50" />
      <div className="flex h-full min-h-24">
        <p className="line-clamp-6">{summary}</p>
      </div>
      {!!(dataHoraInicio || dataHoraFim) && (
        <div className="flex gap-3">
          {dataHoraInicio && (
            <InfoComponent
              icon={CalendarBlank}
              label="Data"
              value={dataHoraInicio}
            />
          )}
          {dataHoraFim && (
            <InfoComponent icon={Clock} label="Horário" value={dataHoraFim} />
          )}
        </div>
      )}
      <div className="h-px w-full bg-theme-gray-50" />
      <Button
        text="Ver detalhes"
        leftIcon={FrameCorners}
        variant="alternative"
        weight="fill"
      />
    </div>
  )
}

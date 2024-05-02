import InfoComponent from '@/components/info'
import { ISpeechCardProps } from './interface/speechCardProps.interface'
import { Button } from '@/components/button'
import { CalendarBlank, Clock, FrameCorners } from '@phosphor-icons/react'
import { checkString } from '@/utils/checkString'

export function SpeechCard({
  typeSpeech,
  data,
  horario,
  titulo,
  summary,
  onClick,
}: ISpeechCardProps) {
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
        <p className="line-clamp-6">{checkString(summary)}</p>
      </div>

      <div className="flex w-full gap-3">
        <InfoComponent icon={CalendarBlank} label="Data" value={data} />

        <InfoComponent icon={Clock} label="Horário" value={horario} />
      </div>

      <div className="h-px w-full bg-theme-gray-50" />
      <Button
        text="Ver detalhes"
        leftIcon={FrameCorners}
        variant="alternative"
        weight="fill"
        type="button"
        onClick={onClick}
        className="w-auto"
      />
    </div>
  )
}

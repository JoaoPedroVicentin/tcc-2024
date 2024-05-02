import InfoComponent from '@/components/info'
import Title from '@/components/title'
import * as Dialog from '@/components/ui/dialog'
import {
  CalendarBlank,
  Clock,
  MicrophoneStage,
  SpeakerHigh,
  TextAlignLeft,
  X,
  YoutubeLogo,
} from '@phosphor-icons/react'
import { IModalSpeechProps } from './interface/modalSpeechProps.interface'
import { LinkButton } from '@/components/link'
import { checkString } from '@/utils/checkString'

export function ModalSpeech({ speech, isOpen, onClose }: IModalSpeechProps) {
  const {
    data,
    horario,
    sumario,
    tipoDiscurso,
    urlVideo,
    urlAudio,
    transcricao,
    urlTexto,
    titulo,
  } = speech

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content className="flex flex-col">
        <Dialog.Header>
          <Dialog.Title className="flex justify-between">
            <Title text="Discurso" icon={MicrophoneStage} />
            <Dialog.Close onClick={onClose}>
              <X size={32} />
            </Dialog.Close>
          </Dialog.Title>
        </Dialog.Header>
        <Dialog.Description className="grid h-full grid-cols-modalSpeech gap-6 overflow-hidden">
          <div className="flex h-auto flex-col gap-4 overflow-y-scroll">
            <div className="flex items-center bg-theme-black-50 p-2 text-white">
              <p className="font-medium">{titulo}</p>
            </div>
            <div>
              <h3 className="truncate">{tipoDiscurso}</h3>
            </div>
            <div className="h-px w-full bg-theme-gray-50" />
            <div className="h-full overflow-y-scroll">
              <p className="pr-2 text-sm font-normal text-black">
                {checkString(sumario)}
              </p>
            </div>
            <div className="h-px w-full bg-theme-gray-50" />

            <div className="flex flex-col gap-3">
              <InfoComponent icon={CalendarBlank} label="Data" value={data} />
              <InfoComponent icon={Clock} label="Horário" value={horario} />
            </div>
            <div className="flex flex-col gap-3">
              {urlAudio && (
                <LinkButton
                  text="Áudio"
                  href={urlAudio}
                  leftIcon={SpeakerHigh}
                  variant="alternative"
                  weight="fill"
                />
              )}
              {urlTexto && (
                <LinkButton
                  text="Ver documento"
                  href={urlTexto}
                  leftIcon={TextAlignLeft}
                  variant="alternative"
                  weight="bold"
                  className="w-auto"
                />
              )}
            </div>
          </div>
          <div className="flex h-auto flex-col gap-4 overflow-y-scroll">
            {urlVideo && (
              <>
                <iframe
                  src={urlVideo}
                  title={titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="aspect-video w-full"
                ></iframe>
                <LinkButton
                  text="Ver no Youtube"
                  href={urlVideo}
                  leftIcon={YoutubeLogo}
                  variant="alternative"
                  weight="fill"
                />
              </>
            )}
            <p className="h-auto overflow-y-scroll pr-2 text-sm font-normal text-black">
              {transcricao}
            </p>
          </div>
        </Dialog.Description>
      </Dialog.Content>
      <Dialog.Overlay onClick={onClose} />
    </Dialog.Root>
  )
}

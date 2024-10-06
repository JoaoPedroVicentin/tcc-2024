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
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay />
      <Dialog.Content className="flex flex-col">
        <Dialog.Header>
          <div className="flex items-center justify-between">
            <Title text="Discurso" icon={MicrophoneStage} />
            <Dialog.Close asChild>
              <button onClick={onClose}>
                <X size={32} />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Header>
        <div className=" flex h-full flex-col gap-6 overflow-hidden lg:grid lg:grid-cols-modalSpeech">
          <div className="flex h-auto flex-col gap-4 lg:overflow-y-scroll">
            <div className="flex items-center bg-theme-black-50 p-2 text-white">
              <p className="font-medium">{titulo}</p>
            </div>
            <div>
              <h3 className="truncate">{tipoDiscurso}</h3>
            </div>
            <div className="h-px w-full bg-theme-gray-50" />
            <div className="lg:h-full lg:overflow-y-scroll">
              <p className="pr-2 text-sm font-normal text-black">
                {checkString(sumario)}
              </p>
            </div>
            <div className="h-px w-full bg-theme-gray-50" />
            <div className="hidden gap-3 lg:flex lg:flex-col">
              <InfoComponent icon={CalendarBlank} label="Data" value={data} />
              <InfoComponent icon={Clock} label="Horário" value={horario} />
            </div>
            <div className="hidden flex-col gap-3 lg:flex">
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
            <Dialog.Description className="h-auto overflow-y-scroll pr-2 text-sm font-normal text-black">
              {transcricao}
            </Dialog.Description>
          </div>
          <div className="flex gap-3 lg:hidden lg:flex-col">
            <InfoComponent icon={CalendarBlank} label="Data" value={data} />
            <InfoComponent icon={Clock} label="Horário" value={horario} />
          </div>
          <div className="flex flex-col gap-3 lg:hidden">
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
      </Dialog.Content>
    </Dialog.Root>
  )
}

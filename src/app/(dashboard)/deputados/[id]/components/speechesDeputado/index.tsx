import {
  CalendarBlank,
  Clock,
  MicrophoneStage,
  SpeakerHigh,
  TextAlignLeft,
  X,
  YoutubeLogo,
} from '@phosphor-icons/react'
import { IDeputadoSectionProps } from '../../interface/deputadoSectionProps.interface'
import Title from '@/components/title'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import * as Table from '@/components/ui/table'
import { yearsBetweenCurrentYearAnd2019 } from '@/utils/yearsBetweenCurrentYearAnd2019'
import { useQuery } from '@tanstack/react-query'
import { getDiscursosDeputado } from '@/httpsRequests/deputados/getDiscursosDeputado'
import { IFilterGetDiscursosDeputadoParams } from '@/httpsRequests/deputados/getDiscursosDeputado/interfaces/filterGetDiscursosDeputadoParams.interface'
import { useState } from 'react'
import { SpeechCard } from './components/speechCard'
import { Skeleton } from '@/components/ui/skeleton'
import PaginationList from '@/components/paginationList'
import { IGetDiscursosDeputadoReturn } from '@/httpsRequests/deputados/getDiscursosDeputado/interfaces/getDiscursosDeputadoReturn.interface'
import * as Dialog from '@/components/ui/dialog'
import InfoComponent from '@/components/info'
import { Button } from '@/components/button'

export function SpeechesDeputado({ deputado }: IDeputadoSectionProps) {
  const defaultFilters: IFilterGetDiscursosDeputadoParams = {
    ano: '2024',
  }

  const [filters, setFilters] =
    useState<IFilterGetDiscursosDeputadoParams>(defaultFilters)

  const [currentPage, setCurrentPage] = useState<number>(1)

  const { ano } = filters

  const { data: discursos, isLoading } = useQuery({
    queryKey: ['discursosById', filters, deputado],
    queryFn: () => getDiscursosDeputado(deputado.id, filters),
  })

  function splitIntoSubarrays(
    data: IGetDiscursosDeputadoReturn['dados'],
    maxLength: number = 4,
  ): IGetDiscursosDeputadoReturn['dados'][] {
    const subarrays: IGetDiscursosDeputadoReturn['dados'][] = []
    for (let i = 0; i < data.length; i += maxLength) {
      const subarray = data.slice(i, i + maxLength)
      subarrays.push(subarray)
    }
    console.log(data)
    console.log(subarrays)
    return subarrays
  }

  const discursosPages = discursos && splitIntoSubarrays(discursos.data.dados)

  const hasDiscursos = !!(
    !isLoading &&
    discursosPages &&
    discursosPages[currentPage - 1] &&
    discursosPages[currentPage - 1].length > 0
  )

  function handleSetAno(value: string) {
    setFilters((prevState) => ({
      ...prevState,
      ano: value,
    }))
    setCurrentPage(1)
  }

  return (
    <section className="border-b border-theme-gray-100 p-section">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-9">
        <Title text="Discursos" icon={MicrophoneStage} />

        <div className="grid grid-cols-4 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Ano</label>
            <Select onValueChange={handleSetAno} value={ano}>
              <SelectTrigger>
                <SelectValue placeholder="Pesquisar por ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Ano</SelectLabel>
                  {yearsBetweenCurrentYearAnd2019().map((ano, index) => {
                    return (
                      <SelectItem key={index} value={String(ano)}>
                        {ano}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading || hasDiscursos ? (
          <div className="grid max-h-[718px] grid-cols-4 gap-6 overflow-y-scroll pr-6">
            {!isLoading
              ? hasDiscursos &&
                discursosPages[currentPage - 1].map((discurso, index) => (
                  <SpeechCard
                    key={index}
                    faseEvent={discurso.faseEvento}
                    summary={discurso.sumario}
                    typeSpeech={discurso.tipoDiscurso}
                  />
                ))
              : Array.from({ length: 4 }, (_, index) => (
                  <Skeleton key={index} className="h-96 flex-1" />
                ))}
          </div>
        ) : (
          <Table.Caption>
            <Table.DataEmpty />
          </Table.Caption>
        )}
        {hasDiscursos && (
          <PaginationList
            pageIndex={currentPage}
            setPageIndex={(index) => setCurrentPage(index)}
            lastPage={discursosPages.length}
          />
        )}
      </div>

      <Dialog.Root>
        <Dialog.Trigger>Open</Dialog.Trigger>
        <Dialog.Content className="flex flex-col">
          <Dialog.Header>
            <Dialog.Title className="flex justify-between">
              <Title text="Discurso" icon={MicrophoneStage} />
              <Dialog.Close>
                <X size={32} />
              </Dialog.Close>
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Description className="grid-cols-modalSpeech grid gap-6 overflow-hidden">
            <div className="flex h-full flex-col gap-4">
              <div className="flex items-center bg-theme-black-50 p-2 text-white">
                <p className="font-medium">ORDEM DO DIA</p>
              </div>
              <div>
                <h3 className="truncate">Encaminhamento de votação</h3>
              </div>
              <div className="h-px w-full bg-theme-gray-50" />
              <div className="flex h-auto">
                <p className="text-sm font-normal text-black">
                  Encaminhamento da votação do requerimento de retirada de pauta
                  da Medida Provisória nº 1.150, de 2022, sobre a alteração da
                  Lei nº 12.651, de 2012, com vista à regulamentação dos prazos
                  e condições de adesão ao Programa de Regularização Ambiental -
                  PRA; e da Lei nº 11.428, de 2006.
                </p>
              </div>
              <div className="h-px w-full bg-theme-gray-50" />
              <div className="flex flex-col gap-3">
                <Button
                  text="Áudio"
                  leftIcon={SpeakerHigh}
                  variant="alternative"
                  weight="fill"
                />
                <Button
                  text="Ver documento"
                  leftIcon={TextAlignLeft}
                  variant="alternative"
                  weight="bold"
                />
              </div>
              <div className="flex flex-col gap-3">
                <InfoComponent
                  icon={CalendarBlank}
                  label="Data"
                  value="30/03/204"
                />
                <InfoComponent icon={Clock} label="Horário" value="18:45" />
              </div>
            </div>
            <div className="flex h-auto flex-col gap-4 overflow-y-scroll">
              <iframe
                src="https://www.youtube.com/embed/whnli9mJLYg?si=hJ-vjHex8NeDMVas"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="aspect-video w-full"
              ></iframe>
              <Button
                text="Ver no Youtube"
                leftIcon={YoutubeLogo}
                variant="alternative"
                weight="fill"
              />
              <p className="h-auto overflow-y-scroll pr-2 text-sm font-normal text-black">
                O SR. KIM KATAGUIRI (Bloco/UNIÃO - SP) - Obrigado, Sr.
                Presidente. Quero fazer um breve relato, o de que o setor que
                nós estamos defendendo nesta sessão, Deputada Renata Abreu, que
                é diretamente responsável por todo esse benefício que foi
                causado ao nosso País, gerou mais de 200 mil empregos no ano
                passado e dezenas de bilhões de reais, tanto no turismo
                internacional quanto nos bares e nos restaurantes, nos hotéis,
                nos parques. Não é nenhum favor o que o Governo Federal faz a
                esse setor. Pelo contrário. É esse setor que presta um serviço
                fundamental, essencial ao nosso País. Por isso, nós vamos, por
                maioria esmagadora, derrotar esta medida provisória. (Palmas.) E
                mais: se houver qualquer tentativa de cercear os direitos do
                setor de se recuperar, de cercear o direito que o setor tem de
                trabalhar, de gerar emprego e de gerar renda, eu proponho a
                todos os colegas que paralisemos, que barremos todos os
                trabalhos na Câmara dos Deputados, até que seja garantida a
                manutenção do PERSE. Obrigado, Sr. Presidente.
              </p>
            </div>
          </Dialog.Description>
        </Dialog.Content>
        <Dialog.Overlay />
      </Dialog.Root>
    </section>
  )
}

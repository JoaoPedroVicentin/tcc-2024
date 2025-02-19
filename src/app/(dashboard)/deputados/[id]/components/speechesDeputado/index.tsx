import { MicrophoneStage } from '@phosphor-icons/react'
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
import { ModalSpeech } from './components/modalSpeech'
import { IModalSpeechProps } from './components/modalSpeech/interface/modalSpeechProps.interface'
import { useDisclosure } from '@/hooks/useDisclosure'
import { format } from 'date-fns'
import { WrapperSection } from '@/components/wrapperSection'

export function SpeechesDeputado({ deputado }: IDeputadoSectionProps) {
  const [thisSpeech, setThisSpeech] = useState<
    IModalSpeechProps['speech'] | null
  >(null)

  const { isOpen, onClose, onOpen } = useDisclosure()

  const defaultFilters: IFilterGetDiscursosDeputadoParams = {
    ano: '2024',
    ordem: 'DESC',
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
    <WrapperSection>
      <Title
        text="Discursos"
        icon={MicrophoneStage}
        info={
          <p className="text-sm text-black">
            Nessa seção, são exibidos cartões com informações sobre discursos
            realizados pelo deputado em eventos específicos na Câmara. <br /> As
            informações contidas nos cartões incluem um breve resumo do tema
            abordado, data e horário, além de um botão para abrir uma janela com
            o discurso na íntegra. <br /> Se disponível, também é exibido um
            vídeo da gravação do discurso publicado pelo canal oficial da Câmara
            dos Deputados no YouTube. No entanto, essas gravações são raramente
            disponibilizadas pela API
          </p>
        }
      />

      <div className="flex flex-wrap gap-6">
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
        <div className="flex flex-wrap gap-6 overflow-y-scroll pr-6">
          {!isLoading
            ? hasDiscursos &&
              discursosPages[currentPage - 1].map((discurso, index) => {
                const horario =
                  discurso.dataHoraInicio &&
                  format(discurso.dataHoraInicio, 'HH:mm')

                const data =
                  discurso.dataHoraInicio &&
                  format(discurso.dataHoraInicio, 'dd/MM/yy')

                return (
                  <SpeechCard
                    key={index}
                    data={data}
                    horario={horario}
                    titulo={discurso.faseEvento.titulo}
                    summary={discurso.sumario}
                    typeSpeech={discurso.tipoDiscurso}
                    onClick={() => {
                      setThisSpeech({
                        ...discurso,
                        titulo: discurso.faseEvento.titulo,
                        data,
                        horario,
                      })
                      onOpen()
                    }}
                  />
                )
              })
            : Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="h-96 flex-1" />
              ))}
        </div>
      ) : (
        <Table.Caption>
          <Table.DataEmpty className="relative top-0" />
        </Table.Caption>
      )}
      {hasDiscursos && (
        <PaginationList
          pageIndex={currentPage}
          setPageIndex={(index) => setCurrentPage(index)}
          lastPage={discursosPages.length}
        />
      )}
      {thisSpeech && (
        <ModalSpeech speech={thisSpeech} isOpen={isOpen} onClose={onClose} />
      )}
    </WrapperSection>
  )
}

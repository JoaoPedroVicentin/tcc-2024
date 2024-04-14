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
import { yearsBetweenCurrentYearAnd2019 } from '@/utils/yearsBetweenCurrentYearAnd2019'
import { useQuery } from '@tanstack/react-query'
import { getDiscursosDeputado } from '@/httpsRequests/deputados/getDiscursosDeputado'
import { IFilterGetDiscursosDeputadoParams } from '@/httpsRequests/deputados/getDiscursosDeputado/interfaces/filterGetDiscursosDeputadoParams.interface'
import { useState } from 'react'
import { SpeechCard } from './components/speechCard'
import { Skeleton } from '@/components/ui/skeleton'
import * as Table from '@/components/ui/table'

export function SpeechesDeputado({ deputado }: IDeputadoSectionProps) {
  const defaultFilters: IFilterGetDiscursosDeputadoParams = {
    ano: '2024',
  }

  const [filters, setFilters] =
    useState<IFilterGetDiscursosDeputadoParams>(defaultFilters)

  const { ano } = filters

  const { data: discursos, isLoading } = useQuery({
    queryKey: ['discursosById', filters, deputado],
    queryFn: () => getDiscursosDeputado(deputado.id, filters),
  })

  function handleSetAno(value: string) {
    setFilters((prevState) => ({
      ...prevState,
      ano: value,
    }))
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

        {isLoading ||
        !!(!isLoading && discursos && discursos.data.dados.length > 0) ? (
          <div className="grid max-h-[718px] grid-cols-4 gap-6 overflow-y-scroll pr-6">
            {!isLoading
              ? discursos &&
                discursos.data.dados.map((discurso, index) => (
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
      </div>
    </section>
  )
}

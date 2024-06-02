import Title from '@/components/title'
import { ArrowSquareOut, UsersThree } from '@phosphor-icons/react'
import * as Table from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { internalRoutes } from '@/configs/internalRoutes'
import Link from 'next/link'
import { getFrentesDeputado } from '@/httpsRequests/deputados/getFrentesDeputado'
import { IDeputadoSectionProps } from '../../interface/deputadoSectionProps.interface'
import { useQuery } from '@tanstack/react-query'
import { IGetFrentesDeputadoReturn } from '@/httpsRequests/deputados/getFrentesDeputado/interface/getFrentesDeputadoReturn.interface'
import PaginationList from '@/components/paginationList'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LEGISLATURAS } from '@/constants/legislaturas'
import { WrapperSection } from '@/components/wrapperSection'

export function FrentesDeputado({ deputado }: IDeputadoSectionProps) {
  const { data: frentes, isLoading } = useQuery({
    queryKey: ['frentesDeputado', deputado],
    queryFn: () => getFrentesDeputado(deputado.id),
  })

  const [filters, setFilters] = useState<{
    page: number
    idLegislatura: number
  }>({ page: 1, idLegislatura: 57 })

  const { page, idLegislatura } = filters

  const currentPage = page - 1

  function splitIntoSubarrays(
    data: IGetFrentesDeputadoReturn['dados'],
    maxLength: number = 10,
  ): IGetFrentesDeputadoReturn['dados'][] {
    const result: IGetFrentesDeputadoReturn['dados'][] = []

    const filteredData = idLegislatura
      ? data.filter((item) => item.idLegislatura === idLegislatura)
      : data

    for (let i = 0; i < filteredData.length; i += maxLength) {
      result.push(filteredData.slice(i, i + maxLength))
    }

    return result
  }

  const frentesPages = frentes && splitIntoSubarrays(frentes.data.dados)

  function handleSetLegislatura(value: string) {
    setFilters((prevState) => ({
      ...prevState,
      page: 1,
      idLegislatura: Number(value),
    }))
  }

  return (
    <WrapperSection className="bg-theme-white-50">
      <Title text="Frentes parlamentares" icon={UsersThree} />

      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Legislatura</label>
          <Select
            onValueChange={handleSetLegislatura}
            value={String(idLegislatura)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pesquisar por legislatura" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Legislaturas</SelectLabel>
                {LEGISLATURAS.slice(0, 2).map((legislatura, index) => {
                  const startDate = new Date(
                    legislatura.dataInicio,
                  ).getFullYear()
                  const endDate = new Date(legislatura.dataFim).getFullYear()

                  return (
                    <SelectItem key={index} value={legislatura.id}>
                      {startDate} - {endDate}
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table.Root>
        <Table.Header className="border-b-2 border-theme-black-50 text-base">
          <Table.Row>
            <Table.Head>Título</Table.Head>
            <Table.Head>Ver página</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading
            ? Array.from({ length: 10 }, (_, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Skeleton className="h-10 flex-1" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton className="h-10 flex-1" />
                  </Table.Cell>
                </Table.Row>
              ))
            : frentesPages &&
              frentesPages[currentPage] &&
              frentesPages[currentPage].map((frente, index) => (
                <Table.Row
                  key={index}
                  className="items-center text-base hover:bg-theme-black-50 hover:text-white"
                >
                  <Table.Cell>{frente.titulo}</Table.Cell>
                  <Table.Cell>
                    <Link
                      href={internalRoutes.frenteParlamentarById(frente.id)}
                    >
                      <ArrowSquareOut size={24} />
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
        {!isLoading && (
          <>
            {frentesPages && !frentesPages[currentPage] ? (
              <Table.Caption>
                <Table.DataEmpty />
              </Table.Caption>
            ) : (
              <>
                {frentesPages && (
                  <Table.Caption>
                    <PaginationList
                      pageIndex={page}
                      setPageIndex={(index) =>
                        setFilters((prevState) => ({
                          ...prevState,
                          page: index,
                        }))
                      }
                      lastPage={frentesPages.length}
                    />
                  </Table.Caption>
                )}

                <Table.Caption>
                  Listagem das Frentes Parlamentares{' '}
                  {deputado.sexo === 'M' ? 'do deputado' : 'da deputada'}{' '}
                  {deputado.ultimoStatus.nomeEleitoral}
                </Table.Caption>
              </>
            )}
          </>
        )}
      </Table.Root>
    </WrapperSection>
  )
}

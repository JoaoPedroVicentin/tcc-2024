import Title from '@/components/title'
import { IProposicaoSectionProps } from '../../interface/proposicaoSectionProps.interface'
import { ArrowSquareOut, Files } from '@phosphor-icons/react'
import { getRelatedProposicao } from '@/httpsRequests/proposicoes/getRelatedProposicao'
import { useQuery } from '@tanstack/react-query'
import * as Table from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TIPOS_PROPOSICAO } from '@/constants/proposicoes/tiposProposicao'
import { IConstantsData } from '@/interfaces/constantsData.interface'
import { useMemo, useState } from 'react'
import PaginationList from '@/components/paginationList'
import Link from 'next/link'
import { internalRoutes } from '@/configs/internalRoutes'
import { Skeleton } from '@/components/ui/skeleton'
import { IGetProposicoesReturn } from '@/httpsRequests/proposicoes/getProposicoes/interfaces/getProposicoesReturn.interface'
import { WrapperSection } from '@/components/wrapperSection'

export function RelatedProposicao({ proposicao }: IProposicaoSectionProps) {
  const [filters, setFilters] = useState<{
    page: number
    tipo?: string
  }>({ page: 1 })

  const { page, tipo } = filters

  const currentPage = page - 1

  const { data: proposicoes, isLoading } = useQuery({
    queryKey: ['relatedProposicao', proposicao, tipo],
    queryFn: () => getRelatedProposicao(proposicao.id),
  })

  function splitIntoSubarrays(
    data: IGetProposicoesReturn['dados'],
    maxLength: number = 10,
  ): IGetProposicoesReturn['dados'][] {
    const result: IGetProposicoesReturn['dados'][] = []

    const filteredData = tipo
      ? data.filter((item) => item.codTipo === tipo)
      : data

    for (let i = 0; i < filteredData.length; i += maxLength) {
      result.push(filteredData.slice(i, i + maxLength))
    }

    return result
  }

  const proposicoesPages =
    proposicoes && splitIntoSubarrays(proposicoes.data.dados)

  function handleSetTipo(value: string) {
    if (value === 'null') {
      setFilters({
        page: 1,
        tipo: undefined,
      })
    } else {
      setFilters({
        page: 1,
        tipo: value,
      })
    }
  }

  function useFilteredTiposProposicao(
    constantsData: IConstantsData[],
  ): IConstantsData[] {
    const filteredTiposProposicao: IConstantsData[] = useMemo(() => {
      const siglasFound: string[] = []
      const filteredData = constantsData.filter((item) => {
        if (item.sigla && !siglasFound.includes(item.sigla)) {
          siglasFound.push(item.sigla)
          return true
        }
        return false
      })

      filteredData.sort((a, b) => {
        if (a.sigla && b.sigla) {
          return a.sigla.localeCompare(b.sigla)
        }
        return 0
      })

      return filteredData
    }, [constantsData])

    return filteredTiposProposicao
  }

  return (
    <WrapperSection>
      <Title text="Proposições relacionadas" icon={Files} />

      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Tipo</label>
          <Select onValueChange={handleSetTipo} value={tipo}>
            <SelectTrigger>
              <SelectValue placeholder="Pesquisar pelo tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="null">Sem Filtro</SelectItem>
                <SelectLabel>Tipo</SelectLabel>
                {useFilteredTiposProposicao(TIPOS_PROPOSICAO).map((tipo) => {
                  if (tipo.cod) {
                    return (
                      <SelectItem key={tipo.cod} value={tipo.cod}>
                        {tipo.sigla} - {tipo.nome}
                      </SelectItem>
                    )
                  } else {
                    return null
                  }
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table.Root>
        <Table.Header className="border-b-2 border-theme-black-50 text-base">
          <Table.Row>
            <Table.Head>Proposição</Table.Head>
            <Table.Head>Ementa</Table.Head>
            <Table.Head>Ver página</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading
            ? Array.from({ length: 10 }, (_, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Skeleton className="h-14 flex-1" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton className="h-14 flex-1" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton className="h-14 flex-1" />
                  </Table.Cell>
                </Table.Row>
              ))
            : proposicoesPages &&
              proposicoesPages[currentPage] &&
              proposicoesPages[currentPage]
                .reverse()
                .map((relatedProposicao, index) => (
                  <Table.Row
                    key={index}
                    className="items-center text-base hover:bg-theme-black-50 hover:text-white"
                  >
                    <Table.Cell>
                      {relatedProposicao.siglaTipo} {relatedProposicao.numero}/
                      {relatedProposicao.ano}
                    </Table.Cell>
                    <Table.Cell className="max-w-[50ch] overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {relatedProposicao.ementa}
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        href={internalRoutes.proposicaoById(
                          relatedProposicao.id,
                        )}
                      >
                        <ArrowSquareOut size={24} />
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
        </Table.Body>
        {!isLoading && (
          <>
            {proposicoesPages && !proposicoesPages[currentPage] ? (
              <Table.Caption>
                <Table.DataEmpty />
              </Table.Caption>
            ) : (
              <Table.Footer>
                {proposicoesPages && (
                  <Table.Caption>
                    <PaginationList
                      pageIndex={page}
                      setPageIndex={(index) =>
                        setFilters((prevState) => ({
                          ...prevState,
                          page: index,
                        }))
                      }
                      lastPage={proposicoesPages.length}
                    />
                  </Table.Caption>
                )}
                <Table.Caption>
                  Listagem das Proposições Relacionas
                </Table.Caption>
              </Table.Footer>
            )}
          </>
        )}
      </Table.Root>
    </WrapperSection>
  )
}

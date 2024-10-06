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
import { ArrowSquareOut, Files } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { IDeputadoSectionProps } from '../../interface/deputadoSectionProps.interface'
import { Skeleton } from '@/components/ui/skeleton'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import PaginationList from '@/components/paginationList'
import Link from 'next/link'
import { TIPOS_PROPOSICAO } from '@/constants/proposicoes/tiposProposicao'
import { TEMA_PROPOSICAO } from '@/constants/proposicoes/temaProposicao'
import { internalRoutes } from '@/configs/internalRoutes'
import { IFilterGetProposicoesParams } from '@/httpsRequests/proposicoes/getProposicoes/interfaces/filterGetProposicoesParams.interface'
import { getProposicoes } from '@/httpsRequests/proposicoes/getProposicoes'
import { IConstantsData } from '@/interfaces/constantsData.interface'
import { WrapperSection } from '@/components/wrapperSection'

export function PrositionsDeputado({ deputado }: IDeputadoSectionProps) {
  const defaultFilters: IFilterGetProposicoesParams = {
    pagina: '1',
    itens: '10',
    ano: '2024',
    idDeputadoAutor: String(deputado.id),
  }

  const [filters, setFilters] =
    useState<IFilterGetProposicoesParams>(defaultFilters)

  const { pagina, ano, siglaTipo, codTema } = filters

  const { data: proposicoes, isLoading } = useQuery({
    queryKey: ['proposicoesById', filters],
    queryFn: () => getProposicoes(filters),
  })

  const lastPage = proposicoes?.data.links
    .find((link) => link.rel === 'last')
    ?.href.match(VALIDATIONS_REGEX.GET_INDEX_PAGE)

  function handleSetAno(value: string) {
    setFilters((prevState) => ({
      ...prevState,
      pagina: '1',
      ano: value,
    }))
  }

  function handleSetTipo(value: string) {
    setFilters((prevState) => ({
      ...prevState,
      pagina: '1',
      siglaTipo: value === 'null' ? undefined : value,
    }))
  }

  function handleSetTema(value: string) {
    setFilters((prevState) => ({
      ...prevState,
      pagina: '1',
      codTema: value === 'null' ? undefined : value,
    }))
  }

  function useFilteredTiposProposicao(
    constantsData: IConstantsData[],
  ): IConstantsData[] {
    const siglasFound: string[] = []

    return constantsData.filter((item) => {
      if (item.sigla && !siglasFound.includes(item.sigla)) {
        siglasFound.push(item.sigla)
        return true
      }
      return false
    })
  }

  return (
    <WrapperSection className="bg-theme-white-50">
      <Title text="Proposições" icon={Files} />

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
                {yearsBetweenCurrentYearAnd2019().map((ano, index) => (
                  <SelectItem key={index} value={String(ano)}>
                    {ano}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Tipo</label>
          <Select onValueChange={handleSetTipo} value={siglaTipo}>
            <SelectTrigger>
              <SelectValue placeholder="Pesquisar pelo tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="null">Sem Filtro</SelectItem>
                <SelectLabel>Tipo</SelectLabel>
                {useFilteredTiposProposicao(TIPOS_PROPOSICAO).map(
                  (tipo, index) =>
                    tipo.sigla && (
                      <SelectItem key={index} value={tipo.sigla}>
                        {tipo.sigla} - {tipo.nome}
                      </SelectItem>
                    ),
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Tema</label>
          <Select onValueChange={handleSetTema} value={codTema}>
            <SelectTrigger>
              <SelectValue placeholder="Pesquisar por tema" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="null">Sem Filtro</SelectItem>
                <SelectLabel>Tema</SelectLabel>
                {TEMA_PROPOSICAO.map((tema, index) => (
                  <SelectItem key={index} value={tema.cod}>
                    {tema.nome}
                  </SelectItem>
                ))}
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
                    <Skeleton className="h-10 flex-1" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton className="h-10 flex-1" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton className="h-10 flex-1" />
                  </Table.Cell>
                </Table.Row>
              ))
            : proposicoes &&
              proposicoes.data.dados.map((proposicao, index) => (
                <Table.Row
                  key={index}
                  className="items-center text-base hover:bg-theme-black-50 hover:text-white"
                >
                  <Table.Cell>
                    {proposicao.siglaTipo} {proposicao.numero}/{proposicao.ano}
                  </Table.Cell>
                  <Table.Cell className="max-w-[50ch] overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {proposicao.ementa}
                  </Table.Cell>
                  <Table.Cell>
                    <Link href={internalRoutes.proposicaoById(proposicao.id)}>
                      <ArrowSquareOut size={24} />
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
        {!isLoading &&
          (proposicoes && proposicoes.data.dados.length <= 0 ? (
            <Table.Caption>
              <Table.DataEmpty />
            </Table.Caption>
          ) : (
            <>
              <Table.Caption>
                {lastPage && (
                  <PaginationList
                    pageIndex={Number(pagina)}
                    setPageIndex={(index) =>
                      setFilters((prevState) => ({
                        ...prevState,
                        pagina: String(index),
                      }))
                    }
                    lastPage={Number(lastPage[1])}
                  />
                )}
              </Table.Caption>

              <Table.Caption>
                Listagem das proposições{' '}
                {deputado.sexo === 'M' ? 'do deputado' : 'da deputada'}{' '}
                {deputado.ultimoStatus.nomeEleitoral}
              </Table.Caption>
            </>
          ))}
      </Table.Root>
    </WrapperSection>
  )
}

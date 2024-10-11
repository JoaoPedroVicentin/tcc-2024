'use client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import * as Table from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import PaginationList from '@/components/paginationList'
import { IFilterGetVotacoesParams } from '@/httpsRequests/votacoes/getVotacoes/interfaces/filterGetVotacoesParams.interface'
import { getVotacoes } from '@/httpsRequests/votacoes/getVotacoes'
import { format, parseISO } from 'date-fns'
import { WrapperList } from '@/components/wrapperList'
import { Header } from '@/components/header'
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
import { ArrowSquareOut, Ticket } from '@phosphor-icons/react'
import Link from 'next/link'
import { internalRoutes } from '@/configs/internalRoutes'

export default function Votacoes() {
  const currentYear = new Date().getFullYear()

  const defaultFilters: IFilterGetVotacoesParams = {
    pagina: '1',
    itens: '10',
    dataInicio: `${currentYear}-01-01`,
    dataFim: `${currentYear}-12-31`,
    ordenarPor: 'idProposicaoObjeto',
  }

  const [filters, setFilters] =
    useState<IFilterGetVotacoesParams>(defaultFilters)

  const { pagina, dataInicio } = filters

  const { data: votacoes, isLoading } = useQuery({
    queryKey: ['votacoes', filters],
    queryFn: () => getVotacoes(filters),
  })

  function handleSetAno(value: string) {
    setFilters((prevState) => ({
      ...prevState,
      pagina: '1',
      dataInicio: `${value}-01-01`,
      dataFim: `${value}-12-31`,
    }))
  }

  const lastPage = votacoes?.data.links
    .find((link) => link.rel === 'last')
    ?.href.match(VALIDATIONS_REGEX.GET_INDEX_PAGE)

  return (
    <WrapperList>
      <Header
        text="Votações"
        icon={Ticket}
        info={
          <p className="text-sm text-black">
            A página de votações exibe uma lista das votações realizadas. As
            informações apresentadas para cada votação incluem a proposição
            relacionada, se houver, a descrição, data, horário e o órgão
            responsável pela coordenação da votação.
            <br /> Você pode filtrar essa lista por ano.
          </p>
        }
      />

      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Ano</label>
          <Select
            onValueChange={handleSetAno}
            value={format(parseISO(dataInicio), 'yyyy')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar pelo ano" />
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

      <Table.Root className="pb-0">
        <Table.Header className="border-b-2 border-theme-black-50 text-base">
          <Table.Row>
            <Table.Head className="flex items-center gap-2">
              Proposição
              <ArrowSquareOut size={20} />
            </Table.Head>
            <Table.Head>Descrição</Table.Head>
            <Table.Head>Data</Table.Head>
            <Table.Head>Horário</Table.Head>
            <Table.Head>Órgão</Table.Head>
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
                  <Table.Cell>
                    <Skeleton className="h-10 flex-1" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton className="h-10 flex-1" />
                  </Table.Cell>
                </Table.Row>
              ))
            : votacoes &&
              votacoes.data.dados.map((votacao, index) => {
                const idProposicao = votacao.uriProposicaoObjeto?.match(
                  VALIDATIONS_REGEX.GER_ID_FOR_URL,
                )

                const hasProposicao = !!(idProposicao && idProposicao[1])
                return (
                  <Table.Row
                    key={index}
                    className="items-center text-base hover:bg-theme-black-50 hover:text-white"
                  >
                    <Table.Cell>
                      {hasProposicao ? (
                        <Link
                          href={internalRoutes.proposicaoById(
                            Number(idProposicao[1]),
                          )}
                          className="flex items-center"
                        >
                          {votacao.proposicaoObjeto}
                        </Link>
                      ) : (
                        <p>{'---'}</p>
                      )}
                    </Table.Cell>
                    <Table.Cell className="max-w-[50ch] overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {votacao.descricao}
                    </Table.Cell>
                    <Table.Cell>
                      {format(votacao.dataHoraRegistro, 'dd/MM/yyyy')}
                    </Table.Cell>
                    <Table.Cell>
                      {format(votacao.dataHoraRegistro, 'HH:mm')}
                    </Table.Cell>
                    <Table.Cell>{votacao.siglaOrgao}</Table.Cell>
                  </Table.Row>
                )
              })}
        </Table.Body>
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
        {!isLoading && votacoes && votacoes.data.dados.length <= 0 ? (
          <Table.DataEmpty />
        ) : (
          <Table.Caption>Lista das Votações</Table.Caption>
        )}
      </Table.Root>
    </WrapperList>
  )
}

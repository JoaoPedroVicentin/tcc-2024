import InfoComponent from '@/components/info'
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
import { getDespesasDeputado } from '@/httpsRequests/deputados/getDespesasDeputado'
import { yearsBetweenCurrentYearAnd2019 } from '@/utils/yearsBetweenCurrentYearAnd2019'
import { FileMagnifyingGlass, HandCoins, Money } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { IDeputadoSectionProps } from '../../interface/deputadoSectionProps.interface'
import { IFilterGetDespesasDeputadoParams } from '@/httpsRequests/deputados/getDespesasDeputado/interfaces/filterGetDespesasDeputadoParams.interface'
import { pastMonths } from '@/utils/pastMonths'
import { Skeleton } from '@/components/ui/skeleton'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import PaginationList from '@/components/paginationList'
import Link from 'next/link'
import { format } from 'date-fns'

export function ExpensesDeputados({ deputado }: IDeputadoSectionProps) {
  const defaultFilters: IFilterGetDespesasDeputadoParams = {
    pagina: '1',
    itens: '100',
    ano: '2024',
    mes: '1',
  }

  const [filters, setFilters] =
    useState<IFilterGetDespesasDeputadoParams>(defaultFilters)

  const { ano, mes, pagina } = filters

  const { data: despesas, isLoading } = useQuery({
    queryKey: ['profissoesDeputadoById', deputado.id, filters],
    queryFn: () => getDespesasDeputado(deputado.id, filters),
  })

  const lastPage = despesas?.data.links
    .find((link) => link.rel === 'last')
    ?.href.match(VALIDATIONS_REGEX.GET_INDEX_PAGE)

  function handleSetAno(value: string) {
    setFilters((prevState) => ({
      ...prevState,
      pagina: '1',
      mes: '1',
      ano: value,
    }))
  }

  function handleSetMes(value: string) {
    setFilters((prevState) => ({
      ...prevState,
      pagina: '1',
      mes: value,
    }))
  }

  const totalExpenses =
    despesas &&
    despesas.data.dados
      .reduce((total, despesa) => total + despesa.valorLiquido, 0)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })

  return (
    <section className="border-b border-theme-gray-100 p-section">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-9">
        <Title text="Despesas" icon={HandCoins} />

        <div className="mb-4 grid grid-cols-4 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Ano</label>
            <Select onValueChange={handleSetAno} value={ano}>
              <SelectTrigger>
                <SelectValue placeholder="Filtra pelo ano" />
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
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Mês</label>
            <Select onValueChange={handleSetMes} value={mes}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar pelo mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Mês</SelectLabel>
                  {pastMonths(ano).map((mes, index) => {
                    return (
                      <SelectItem key={index} value={mes.value}>
                        {mes.month}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {totalExpenses && (
          <InfoComponent
            icon={Money}
            label="Total de gastos nesse período"
            value={String(totalExpenses)}
          />
        )}

        <Table.Root>
          <Table.Header className="border-b-2 border-theme-black-50 text-base">
            <Table.Row>
              <Table.Head>Tipo da despesa</Table.Head>
              <Table.Head>Data</Table.Head>
              <Table.Head>Valor</Table.Head>
              <Table.Head>Nome do fornecedor</Table.Head>
              <Table.Head>Documento</Table.Head>
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
                    <Table.Cell>
                      <Skeleton className="h-14 flex-1" />
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton className="h-14 flex-1" />
                    </Table.Cell>
                  </Table.Row>
                ))
              : despesas &&
                despesas.data.dados.map((despesa, index) => (
                  <Table.Row
                    key={index}
                    className="items-center text-base hover:bg-theme-black-50 hover:text-white"
                  >
                    <Table.Cell>{despesa.tipoDespesa}</Table.Cell>
                    <Table.Cell>
                      {format(despesa.dataDocumento, 'dd/MM/yyyy')}
                    </Table.Cell>
                    <Table.Cell>
                      {despesa.valorLiquido.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </Table.Cell>
                    <Table.Cell>{despesa.nomeFornecedor}</Table.Cell>
                    <Table.Cell>
                      {despesa.urlDocumento ? (
                        <Link
                          href={despesa.urlDocumento}
                          className="bg-red-400"
                        >
                          <FileMagnifyingGlass size={24} weight="fill" />
                        </Link>
                      ) : (
                        '---'
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
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

          {!isLoading && despesas && despesas.data.dados.length <= 0 ? (
            <Table.Caption>
              <Table.DataEmpty />
            </Table.Caption>
          ) : (
            <Table.Caption>
              Listagem das despesas{' '}
              {deputado.sexo === 'M' ? 'do deputado' : 'da deputada'}{' '}
              {deputado.ultimoStatus.nomeEleitoral}
            </Table.Caption>
          )}
        </Table.Root>
      </div>
    </section>
  )
}

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
import PaginationList from '@/components/paginationList'
import Link from 'next/link'
import { format } from 'date-fns'
import { IGetDespesasDeputadoReturn } from '@/httpsRequests/deputados/getDespesasDeputado/interfaces/getDespesasDeputadoReturn.interface'
import { WrapperSection } from '@/components/wrapperSection'

export function ExpensesDeputado({ deputado }: IDeputadoSectionProps) {
  const defaultFilters: IFilterGetDespesasDeputadoParams = {
    pagina: '1',
    itens: '1000',
    ano: '2024',
    mes: '1',
  }

  const [filters, setFilters] =
    useState<IFilterGetDespesasDeputadoParams>(defaultFilters)

  const { ano, mes, pagina } = filters

  const currentPage = Number(pagina) - 1

  const { data: despesas, isLoading } = useQuery({
    queryKey: ['profissoesDeputadoById', deputado.id, ano, mes],
    queryFn: () => getDespesasDeputado(deputado.id, filters),
  })

  function splitIntoSubarrays(
    data: IGetDespesasDeputadoReturn['dados'],
    maxLength: number = 10,
  ): IGetDespesasDeputadoReturn['dados'][] {
    const result: IGetDespesasDeputadoReturn['dados'][] = []

    for (let i = 0; i < data.length; i += maxLength) {
      result.push(data.slice(i, i + maxLength))
    }

    return result
  }

  const despesasPages = despesas && splitIntoSubarrays(despesas.data.dados)

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
    <WrapperSection>
      <Title
        text="Despesas"
        icon={HandCoins}
        info={
          <p className="text-sm text-black">
            Nesta seção, é exibida uma lista com todos os gastos realizados pelo
            deputado utilizando sua cota parlamentar. <br /> As informações
            exibidas para cada despesa incluem o tipo de despesa, data, valor,
            fornecedor e, se disponível, um link para a nota fiscal eletrônica.{' '}
            <br /> Você pode filtrar essa lista por ano e mês da despesa, e logo
            abaixo dos filtros, é exibido o valor total dos gastos realizados
            durante o período selecionado.
          </p>
        }
      />

      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Ano</label>
          <Select onValueChange={handleSetAno} value={ano}>
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
            : despesasPages &&
              despesasPages[currentPage] &&
              despesasPages[currentPage].map((despesa, index) => (
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
                      <Link href={despesa.urlDocumento}>
                        <FileMagnifyingGlass size={24} weight="fill" />
                      </Link>
                    ) : (
                      '---'
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
        {!isLoading && (
          <>
            {despesasPages && !despesasPages[currentPage] ? (
              <Table.Caption>
                <Table.DataEmpty />
              </Table.Caption>
            ) : (
              <>
                {despesasPages && (
                  <Table.Caption>
                    <PaginationList
                      pageIndex={currentPage + 1}
                      setPageIndex={(index) =>
                        setFilters((prevState) => ({
                          ...prevState,
                          pagina: String(index),
                        }))
                      }
                      lastPage={despesasPages.length}
                    />
                  </Table.Caption>
                )}
                <Table.Caption>
                  Lista das Despesas{' '}
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

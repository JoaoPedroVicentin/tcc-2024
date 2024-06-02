import { Button } from '@/components/button'
import { IComponentProceduresProps } from '../../interface/componentProceduresProps.interface'
import { sortedTramitacoes } from '../../utils/sortedTramitacoes'
import { ITramitacaoData } from '@/httpsRequests/proposicoes/getTramitacoesProposicao/interfaces/tramitacaoData.interface'
import { CaretDoubleDown, CaretDoubleUp, Check } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { Fragment, useState } from 'react'
import * as Table from '@/components/ui/table'
import Link from 'next/link'
import { ITramitacaoFormattedData } from './interface/tramitacaoFormattedData.interface'

export function ListProcedures({ tramitacoes }: IComponentProceduresProps) {
  function formattedTramitacoes(
    tramitacoes: ITramitacaoData[],
  ): ITramitacaoFormattedData[] {
    const sortedData = sortedTramitacoes(tramitacoes)

    const groupedByDate = sortedData.reduce(
      (acc, curr) => {
        const data = format(curr.dataHora, 'dd/MM/yy')

        if (!acc[data]) {
          acc[data] = {}
        }

        if (!acc[data][curr.siglaOrgao]) {
          acc[data][curr.siglaOrgao] = []
        }

        acc[data][curr.siglaOrgao].push({
          hora: format(curr.dataHora, 'HH:mm'),
          sequencia: curr.sequencia,
          uriOrgao: curr.uriOrgao,
          uriUltimoRelator: curr.uriUltimoRelator,
          regime: curr.regime,
          descricaoTramitacao: curr.descricaoTramitacao,
          codTipoTramitacao: curr.codTipoTramitacao,
          descricaoSituacao: curr.descricaoSituacao,
          codSituacao: curr.codSituacao,
          despacho: curr.despacho,
          url: curr.url,
          ambito: curr.ambito,
          apreciacao: curr.apreciacao,
        })

        return acc
      },
      {} as Record<
        string,
        Record<
          string,
          {
            hora: string
            sequencia: number
            uriOrgao: string
            uriUltimoRelator: string | null
            regime: string
            descricaoTramitacao: string
            codTipoTramitacao: string
            descricaoSituacao: string | null
            codSituacao: number | null
            despacho: string
            url: string | null
            ambito: string
            apreciacao: string
          }[]
        >
      >,
    )

    const tramitesFormatted = Object.entries(groupedByDate).map(
      ([data, orgaos]) => ({
        data,
        tramites: Object.entries(orgaos).map(([siglaOrgao, orgaoTramites]) => ({
          siglaOrgao,
          orgaoTramites,
        })),
      }),
    )

    return tramitesFormatted
  }

  const resultTramitacoes = 
  tramitacoes && formattedTramitacoes(tramitacoes.dados)

  const [isFullContent, setIsFullContent] = useState<boolean>(
    !!(resultTramitacoes && resultTramitacoes.length <= 4),
  )

  const resultTramitacoesMap = isFullContent
    ? resultTramitacoes
    : resultTramitacoes?.slice(0, 4)

  return (
    <div className="relative flex flex-col gap-9 pb-12">
      <div className="flex h-fit flex-col">
        {resultTramitacoesMap && resultTramitacoesMap.length > 0 ? (
          resultTramitacoesMap.map(({ data, tramites }, index) => {
            const isLastItem = !!(
              resultTramitacoes && resultTramitacoes.length - 1 === index
            )

            return (
              <div key={index} className="relative flex gap-5 ">
                <div className="flex gap-3 ">
                  <div className="flex flex-col items-center">
                    <div className="flex w-fit items-center justify-center rounded-full bg-theme-green-100 p-1.5">
                      <Check size={12} />
                    </div>
                    {!isLastItem && (
                      <div className="h-full w-1 bg-theme-green-100" />
                    )}
                  </div>
                  {data}
                </div>
                <div className="flex w-full flex-col">
                  {tramites.map(
                    ({ siglaOrgao, orgaoTramites }, indexTramite) => {
                      return (
                        <div
                          key={indexTramite}
                          className="mb-5 flex w-full flex-col gap-5 border-b border-theme-gray-100 pb-5"
                        >
                          <h3>{siglaOrgao}</h3>
                          {orgaoTramites.map(
                            ({ despacho, url, hora }, indexOrgao) => {
                              return (
                                <Fragment key={indexOrgao}>
                                  {url ? (
                                    <Link href={url} className="w-fit">
                                      <li className="underline decoration-solid">
                                        {hora} - {despacho}
                                      </li>
                                    </Link>
                                  ) : (
                                    <li>
                                      {hora} - {despacho}
                                    </li>
                                  )}
                                </Fragment>
                              )
                            },
                          )}
                        </div>
                      )
                    },
                  )}
                </div>
              </div>
            )
          })
        ) : (
          <Table.DataEmpty />
        )}
      </div>
      {resultTramitacoes && resultTramitacoes.length > 4 && (
        <div className="translate-y-2/1 absolute bottom-0 right-1/2 translate-x-1/2">
          <Button
            type="button"
            onClick={() => setIsFullContent((prevState) => !prevState)}
            leftIcon={!isFullContent ? CaretDoubleDown : CaretDoubleUp}
          />
        </div>
      )}
    </div>
  )
}

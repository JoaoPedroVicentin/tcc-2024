import Title from '@/components/title'
import { IProposicaoSectionProps } from '../../interface/proposicaoSectionProps.interface'
import InfoComponent from '@/components/info'
import {
  ArrowSquareOut,
  ClipboardText,
  FileText,
  Signpost,
} from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { getAutoresProposicao } from '@/httpsRequests/proposicoes/getAutoresProposicao'
import { getTemasProposicao } from '@/httpsRequests/proposicoes/getTemasProposicao'
import { ITemaData } from '@/httpsRequests/proposicoes/getTemasProposicao/interfaces/temaData.interface'
import { LinkButton } from '@/components/link'
import { VALIDATIONS_REGEX } from '@/utils/regex'
import { internalRoutes } from '@/configs/internalRoutes'

export function AboutProposicao({ proposicao }: IProposicaoSectionProps) {
  const {
    id,
    descricaoTipo,
    statusProposicao: { descricaoSituacao },
  } = proposicao

  const { data: temas, isLoading: isLoadingTemas } = useQuery({
    queryKey: ['temasProposicao', id],
    queryFn: () => getTemasProposicao(id),
  })

  const { data: autores, isLoading: isLoadingAutores } = useQuery({
    queryKey: ['autoresProposicao', id],
    queryFn: () => getAutoresProposicao(id),
  })

  function concatTemas(temas: ITemaData[]): string {
    const temasArray: string[] = temas.map((thisTema) => thisTema.tema)

    return temasArray.join('; ')
  }

  const temasFormat = temas && concatTemas(temas.data.dados)

  const isLoading = !!(isLoadingTemas && isLoadingAutores)

  if (!isLoading) {
    return (
      <section className="border-b border-theme-gray-100 bg-theme-white-50 p-section">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-9">
          <div className="flex flex-col gap-5">
            <Title text="Sobre" />
            <InfoComponent
              label="Tipo de proposição"
              value={descricaoTipo}
              icon={FileText}
            />
            <InfoComponent
              label="Situação"
              value={descricaoSituacao}
              icon={Signpost}
            />
            {temasFormat && (
              <InfoComponent
                label="Temas"
                value={concatTemas(temas.data.dados)}
                icon={ClipboardText}
              />
            )}
          </div>

          {autores && autores.data.dados.length > 0 && (
            <div className="flex flex-col gap-5">
              <Title text="Autores" />

              <div className="flex gap-5">
                {autores.data.dados.map((autor) => {
                  const idAutor = autor.uri.match(
                    VALIDATIONS_REGEX.GER_ID_FOR_URL,
                  )

                  if (idAutor && idAutor[1]) {
                    const isDeputado = autor.codTipo === 10000

                    return (
                      <LinkButton
                        key={autor.uri}
                        href={internalRoutes.deputadoById(Number(idAutor[1]))}
                        aria-disabled={!isDeputado}
                        text={autor.nome}
                        rightIcon={isDeputado ? ArrowSquareOut : undefined}
                      />
                    )
                  } else {
                    return null
                  }
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }
}

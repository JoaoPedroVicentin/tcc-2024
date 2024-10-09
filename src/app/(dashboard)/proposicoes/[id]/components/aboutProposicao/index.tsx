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
import { WrapperSection } from '@/components/wrapperSection'

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
      <WrapperSection className="bg-theme-white-50">
        <div className="flex flex-col gap-5">
          <Title
            text="Sobre"
            info={
              <p className="text-sm text-black">
                Informações gerais sobre a proposição específica, como seu tipo,
                situação atual, temas abordados, autores, e logo acima, um botão
                que redireciona para o documento oficial completo da proposição.
              </p>
            }
          />
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

            <div className="flex flex-wrap gap-5">
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
                      text={autor.nome}
                      disabled={!isDeputado}
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
      </WrapperSection>
    )
  }
}

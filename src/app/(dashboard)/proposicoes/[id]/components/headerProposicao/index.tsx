import { Header } from '@/components/header'
import { IProposicaoSectionProps } from '../../interface/proposicaoSectionProps.interface'
import { FileText } from '@phosphor-icons/react'
import { LinkButton } from '@/components/link'
import { WrapperSection } from '@/components/wrapperSection'

export function HeaderProposicao({ proposicao }: IProposicaoSectionProps) {
  const sigla = `${proposicao.siglaTipo} ${proposicao.numero}/${proposicao.ano}`

  return (
    <WrapperSection>
      <Header text="Proposição" icon={FileText} />
      <h1>{sigla}</h1>
      <h2>{proposicao.ementa}</h2>
      {proposicao.urlInteiroTeor && (
        <LinkButton
          href={proposicao.urlInteiroTeor}
          text="Documento"
          leftIcon={FileText}
          variant="alternative"
        />
      )}
    </WrapperSection>
  )
}

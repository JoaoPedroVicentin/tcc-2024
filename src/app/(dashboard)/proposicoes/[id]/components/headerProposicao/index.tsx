import { Header } from '@/components/header'
import { IProposicaoSectionProps } from '../../interface/proposicaoSectionProps.interface'
import { FileText } from '@phosphor-icons/react'
import { LinkButton } from '@/components/link'

export function HeaderProposicao({ proposicao }: IProposicaoSectionProps) {
  const sigla = `${proposicao.siglaTipo} ${proposicao.numero}/${proposicao.ano}`

  return (
    <section className="border-b border-theme-gray-100 p-section">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-9">
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
      </div>
    </section>
  )
}

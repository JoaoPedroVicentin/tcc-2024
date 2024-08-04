import { WrapperSection } from '@/components/wrapperSection'
import { Building, Gavel } from '@phosphor-icons/react'
import { IOrgaoSectionProps } from '../../interface/orgaoSectionProps.interface'
import InfoComponent from '@/components/info'
import { Header } from '@/components/header'

export function HeaderOrgao({ orgao }: IOrgaoSectionProps) {
  return (
    <WrapperSection>
      <Header text="Órgão" icon={Gavel} />
      <h1>
        {orgao.nome} - {orgao.sigla}
      </h1>

      <div className="grid grid-cols-5 gap-4">
        <InfoComponent
          icon={Gavel}
          label="Tipo do órgão"
          value={orgao.tipoOrgao}
        />
        <InfoComponent icon={Building} label="Local" value={orgao.sala} />
      </div>
    </WrapperSection>
  )
}

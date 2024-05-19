import Title from '@/components/title'
import { IProposicaoSectionProps } from '../../interface/proposicaoSectionProps.interface'
import { ListChecks, Rows, Steps } from '@phosphor-icons/react'
import { WrapperSection } from '@/components/wrapperSection'
import { Button } from '@/components/button'
import { useState } from 'react'
import { getTramitacoesProposicao } from '@/httpsRequests/proposicoes/getTramitacoesProposicao'
import { useQuery } from '@tanstack/react-query'
import { TableProcedures } from './components/tableProcedures'

export function ProceduresProposicao({ proposicao }: IProposicaoSectionProps) {
  const { id } = proposicao

  const { data: tramitacoes, isLoading } = useQuery({
    queryKey: ['proceduresProposicao', id],
    queryFn: () => getTramitacoesProposicao(id),
  })

  const [typeDataVisualization, setTypeDataVisualization] = useState<
    'list' | 'table'
  >('table')

  function checkButtonState(type: 'list' | 'table'): 'default' | 'ghost' {
    if (typeDataVisualization === type) {
      return 'default'
    } else {
      return 'ghost'
    }
  }

  return (
    <WrapperSection className="bg-theme-white-50">
      <Title text="Tramitações" icon={Steps} />

      <div className="flex gap-4">
        <Button
          type="button"
          onClick={() => setTypeDataVisualization('list')}
          variant={checkButtonState('list')}
          leftIcon={ListChecks}
        />
        <Button
          type="button"
          onClick={() => setTypeDataVisualization('table')}
          variant={checkButtonState('table')}
          leftIcon={Rows}
        />
      </div>

      {typeDataVisualization === 'table' ? (
        <TableProcedures
          isLoading={isLoading}
          tramitacoes={tramitacoes?.data}
        />
      ) : (
        <p>Listagem</p>
      )}
    </WrapperSection>
  )
}

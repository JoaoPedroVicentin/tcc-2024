import Title from '@/components/title'
import { IProposicaoSectionProps } from '../../interface/proposicaoSectionProps.interface'
import { ListChecks, Rows, Steps } from '@phosphor-icons/react'
import { WrapperSection } from '@/components/wrapperSection'
import { Button } from '@/components/button'
import { useState } from 'react'
import { getTramitacoesProposicao } from '@/httpsRequests/proposicoes/getTramitacoesProposicao'
import { useQuery } from '@tanstack/react-query'
import { TableProcedures } from './components/tableProcedures'
import { ListProcedures } from './components/listProcedures'

export function ProceduresProposicao({ proposicao }: IProposicaoSectionProps) {
  const { id } = proposicao

  const { data: tramitacoes, isLoading } = useQuery({
    queryKey: ['proceduresProposicao', id],
    queryFn: () => getTramitacoesProposicao(id),
  })

  const [typeDataVisualization, setTypeDataVisualization] = useState<
    'list' | 'table'
  >('list')

  function checkButtonState(type: 'list' | 'table'): 'alternative' | 'ghost' {
    if (typeDataVisualization === type) {
      return 'alternative'
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
        <ListProcedures isLoading={isLoading} tramitacoes={tramitacoes?.data} />
      )}
    </WrapperSection>
  )
}

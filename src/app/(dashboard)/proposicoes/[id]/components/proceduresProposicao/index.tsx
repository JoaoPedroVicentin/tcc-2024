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
      <Title
        text="Tramitações"
        icon={Steps}
        info={
          <p className="text-sm text-black">
            Nesta seção, é exibido todo o histórico das tramitações da
            proposição, desde sua apresentação até a situação atual.
            <br /> No histórico, podem ser visualizados a data e o horário de
            cada tramitação, a descrição e o órgão que realizou o despacho. As
            tramitações podem ser vistas em dois modos: lista e timeline.
            <br /> Se disponível, a descrição da tramitação é sublinhada para
            indicar um link de redirecionamento para o documento correspondente
            no modo timeline, ou através de um ícone no modo lista.
          </p>
        }
      />

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

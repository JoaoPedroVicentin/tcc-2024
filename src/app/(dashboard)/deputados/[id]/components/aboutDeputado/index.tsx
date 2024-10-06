import InfoComponent from '@/components/info'
import Title from '@/components/title'
import {
  Building,
  Cake,
  Envelope,
  IdentificationCard,
  Info,
  MapPinLine,
  Phone,
  ReadCvLogo,
  Student,
} from '@phosphor-icons/react'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { getProfissoesDeputado } from '@/httpsRequests/deputados/getProfissoesDeputado'
import { IDeputadoSectionProps } from '../../interface/deputadoSectionProps.interface'
import { WrapperSection } from '@/components/wrapperSection'

export function AboutDeputado({ deputado }: IDeputadoSectionProps) {
  const { data: profissoes, isLoading } = useQuery({
    queryKey: ['profissoesDeputadoById', deputado.id],
    queryFn: () => getProfissoesDeputado(deputado.id),
  })

  const {
    ultimoStatus: {
      gabinete: { andar, email, predio, sala, telefone },
    },
    dataNascimento,
    escolaridade,
    municipioNascimento,
    nomeCivil,
    ufNascimento,
  } = deputado

  let gabineteInfo = ''

  gabineteInfo += predio ? `Prédio ${predio}` : ''

  gabineteInfo += sala ? `, Sala ${sala}` : ''

  gabineteInfo += andar ? `, Andar ${andar}` : ''

  const deputyTeachers =
    profissoes &&
    profissoes.data.dados.map((profissao) => profissao.titulo).join(', ')

  const hasContact = !!(gabineteInfo !== '' || email || telefone)

  if (!isLoading) {
    return (
      <WrapperSection className="bg-theme-white-50">
        <Title text="Resumo" icon={Info} />
        <div className="flex flex-col gap-4">
          <Title text="Sobre" />
          <div className="flex flex-wrap gap-8">
            <InfoComponent
              icon={IdentificationCard}
              label="Nome civil"
              value={nomeCivil}
            />
            <InfoComponent
              icon={Cake}
              label="Nascimento"
              value={format(dataNascimento, 'dd/MM/yyyy')}
            />
            <InfoComponent
              icon={MapPinLine}
              label="Naturalidade"
              value={`${municipioNascimento} • ${ufNascimento}`}
            />
            <InfoComponent
              icon={Student}
              label="Escolaridade"
              value={escolaridade}
            />
            {deputyTeachers && (
              <InfoComponent
                icon={ReadCvLogo}
                label="Profissões"
                value={deputyTeachers}
              />
            )}
          </div>
        </div>
        {hasContact && (
          <div className="flex flex-col gap-4">
            <Title text="Contato" />
            <div className="flex flex-wrap gap-8">
              {gabineteInfo !== 'Gabinete' && (
                <InfoComponent
                  label="Gabinete"
                  value={gabineteInfo}
                  icon={Building}
                />
              )}
              {telefone && (
                <InfoComponent icon={Phone} label="Telefone" value={telefone} />
              )}
              {email && (
                <InfoComponent icon={Envelope} label="Email" value={email} />
              )}
            </div>
          </div>
        )}
      </WrapperSection>
    )
  }
}

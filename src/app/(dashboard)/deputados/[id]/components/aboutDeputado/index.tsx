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
import { IAboutDeputadoProps } from './interface/aboutDeputadoProps.interface'

export function AboutDeputado({ deputado, profissoes }: IAboutDeputadoProps) {
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

  let gabineteInfo = 'Gabinete'

  gabineteInfo += predio ? ` Prédio ${predio}` : ''

  gabineteInfo += sala ? `, Sala ${sala}` : ''

  gabineteInfo += andar ? `, Andar ${andar}` : ''

  const deputyTeachers =
    profissoes && profissoes.map((profissao) => profissao.titulo).join(', ')

  const hasContact = !!(gabineteInfo !== 'Gabinete' || email || telefone)

  return (
    <section className="border-b border-theme-gray-100 bg-theme-white-50 p-section">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-9">
        <Title text="Resumo" icon={Info} />
        <div className="flex flex-col">
          <Title text="Sobre" />
          <div className="grid grid-cols-5 gap-1">
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
          <div className="flex flex-col">
            <Title text="Contato" />
            <div className="grid grid-cols-5">
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
      </div>
    </section>
  )
}

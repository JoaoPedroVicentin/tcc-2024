'use client'
import { IRouteByIdProps } from '@/interfaces/routeByIdProps.interface'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getDeputadoById } from '@/httpsRequests/deputados/getDeputadoById'
import Image from 'next/image'
import {
  Building,
  Cake,
  Envelope,
  FacebookLogo,
  GlobeHemisphereWest,
  IdentificationCard,
  Info,
  InstagramLogo,
  MapPinLine,
  Phone,
  ReadCvLogo,
  Student,
  XLogo,
  YoutubeLogo,
} from '@phosphor-icons/react'
import { LinkButton } from '@/components/link'
import Title from '@/components/title'
import InfoComponent from '@/components/info'
import { getProfissoesDeputado } from '@/httpsRequests/deputados/getProfissoesDeputado'
import { format } from 'date-fns'

export default function DeputadoById({ params: { id } }: IRouteByIdProps) {
  const { data: deputado, isLoading: isLoadingDeputado } = useQuery({
    queryKey: ['deputadoById', id],
    queryFn: () => getDeputadoById(id),
  })

  const { data: profissoes, isLoading: isLoadingProfissoes } = useQuery({
    queryKey: ['profissoesDeputadoById', id],
    queryFn: () => getProfissoesDeputado(id),
  })

  const isLoading = !!(isLoadingDeputado || isLoadingProfissoes)

  function separateSocialMediaLinks(links: string[]) {
    const redesSociais = {
      twitter: [] as string[],
      facebook: [] as string[],
      instagram: [] as string[],
      youtube: [] as string[],
    }

    links.forEach((link) => {
      if (link.includes('twitter.com')) {
        redesSociais.twitter.push(link)
      } else if (link.includes('facebook.com')) {
        redesSociais.facebook.push(link)
      } else if (link.includes('instagram.com')) {
        redesSociais.instagram.push(link)
      } else if (link.includes('youtube.com')) {
        redesSociais.youtube.push(link)
      }
    })

    return redesSociais
  }

  if (!isLoading && deputado) {
    const {
      ultimoStatus: {
        urlFoto,
        nome,
        nomeEleitoral,
        siglaPartido,
        siglaUf,
        gabinete: { andar, email, predio, sala, telefone },
      },
      redeSocial,
      dataNascimento,
      escolaridade,
      municipioNascimento,
      nomeCivil,
      urlWebsite,
      ufNascimento,
    } = deputado.data.dados

    const socialMedias = separateSocialMediaLinks(redeSocial)

    const gabineteInfo = `Prédio ${predio}, Sala ${sala}, Andar ${andar}`

    const deputyTeachers = profissoes?.data.dados
      .map((profissao) => profissao.titulo)
      .join(', ')

    return (
      <div className="flex h-full flex-col">
        <div className="flex justify-between border-b border-theme-gray-100 bg-theme-white-50 p-section">
          <div className="flex items-center gap-6">
            <Image
              src={urlFoto}
              className="h-32 w-32 rounded-full bg-cover"
              alt={nome}
              width={120}
              height={120}
            />
            <div className="flex flex-col gap-3">
              <h1>{nomeEleitoral}</h1>
              <h3>{`${siglaPartido} • ${siglaUf}`}</h3>
            </div>
          </div>
          <div className="flex items-end gap-5">
            {urlWebsite && (
              <LinkButton
                href={urlWebsite}
                leftIcon={GlobeHemisphereWest}
                text="Website"
              />
            )}
            {socialMedias.instagram[0] && (
              <LinkButton
                leftIcon={InstagramLogo}
                href={socialMedias.instagram[0]}
              />
            )}
            {socialMedias.youtube[0] && (
              <LinkButton
                leftIcon={YoutubeLogo}
                href={socialMedias.youtube[0]}
              />
            )}
            {socialMedias.facebook[0] && (
              <LinkButton
                leftIcon={FacebookLogo}
                href={socialMedias.facebook[0]}
              />
            )}
            {socialMedias.twitter[0] && (
              <LinkButton leftIcon={XLogo} href={socialMedias.twitter[0]} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-9 border-b border-theme-gray-100 bg-theme-white-50 p-section">
          <Title text="Resumo" icon={Info} />
          <div className="flex flex-col">
            <Title text="Sobre" />
            <div className="grid grid-cols-5">
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
          <div className="flex flex-col">
            <Title text="Contato" />
            <div className="grid grid-cols-5">
              <InfoComponent
                label="Gabinete"
                value={gabineteInfo}
                icon={Building}
              />
              {telefone && (
                <InfoComponent icon={Phone} label="Telefone" value={telefone} />
              )}
              {email && (
                <InfoComponent icon={Envelope} label="Email" value={email} />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

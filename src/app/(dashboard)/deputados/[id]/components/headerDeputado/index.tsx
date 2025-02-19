import { LinkButton } from '@/components/link'
import {
  FacebookLogo,
  GlobeHemisphereWest,
  InstagramLogo,
  User,
  XLogo,
  YoutubeLogo,
} from '@phosphor-icons/react'
import Image from 'next/image'
import { IDeputadoSectionProps } from '../../interface/deputadoSectionProps.interface'
import { Header } from '@/components/header'
import { WrapperSection } from '@/components/wrapperSection'

export function HeaderDeputado({ deputado }: IDeputadoSectionProps) {
  const {
    ultimoStatus: { urlFoto, nome, nomeEleitoral, siglaPartido, siglaUf },
    redeSocial,
    urlWebsite,
  } = deputado

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

  const socialMedias = separateSocialMediaLinks(redeSocial)

  return (
    <WrapperSection>
      <Header text="Deputado" icon={User} />
      <div className="flex w-full flex-wrap justify-between gap-6">
        <div className="flex items-center gap-6">
          <Image
            src={urlFoto}
            className="h-auto w-32 border-l-[6px] border-theme-green-100 bg-cover"
            alt={nome}
            width={120}
            height={120}
            priority
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
            <LinkButton leftIcon={YoutubeLogo} href={socialMedias.youtube[0]} />
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
    </WrapperSection>
  )
}

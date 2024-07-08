import Image from 'next/image'
import { IDeputadoCardProps } from './interface/deputadoCardProps.interface'
import { internalRoutes } from '@/configs/internalRoutes'
import Link from 'next/link'
import { ArrowSquareOut } from '@phosphor-icons/react'

export function DeputadoCard({ deputado }: IDeputadoCardProps) {
  const { id, urlFoto, nome, siglaPartido, siglaUf } = deputado

  return (
    <div className="flex w-full gap-4">
      <Image
        src={urlFoto}
        width={50}
        height={50}
        className="h-full w-auto rounded-md object-cover"
        alt={nome}
        priority
      />
      <div className="flex flex-1 flex-col justify-between gap-2">
        <h2 className="w-full">{nome}</h2>
        <h3 className="w-full font-semibold">{`${siglaPartido} • ${siglaUf}`}</h3>
        <Link href={internalRoutes.deputadoById(id)}>
          <ArrowSquareOut size={28} />
        </Link>
      </div>
    </div>
  )
}

import Image from 'next/image'
import { IDeputadoCardProps } from './interface/deputadoCardProps.interface'
import { internalRoutes } from '@/configs/internalRoutes'
import Link from 'next/link'
import { ArrowSquareOut } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export function DeputadoCard({ deputado, className }: IDeputadoCardProps) {
  const { id, urlFoto, nome, siglaPartido, siglaUf } = deputado

  return (
    <Link
      href={internalRoutes.deputadoById(id)}
      className={cn(
        'group flex min-w-fit flex-1 items-center justify-center gap-4 border border-gray-100 bg-white p-4 hover:bg-theme-green-100',
        className,
      )}
    >
      <Image
        src={urlFoto}
        width={80}
        height={80}
        className="h-full border-l-[6px] border-theme-green-100 object-cover group-hover:border-theme-black-50"
        alt={nome}
        priority
      />
      <div className="flex w-fit flex-1 flex-col justify-between gap-2">
        <h3 className="line-clamp-1 w-full">{nome}</h3>
        <p className="w-full font-semibold">{`${siglaPartido} • ${siglaUf}`}</p>
        <ArrowSquareOut size={20} />
      </div>
    </Link>
  )
}

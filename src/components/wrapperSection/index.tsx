import { cn } from '@/lib/utils'
import { IWrapperSectionProps } from './interface/wrapperListProps.interface'

export function WrapperSection({ children, className }: IWrapperSectionProps) {
  return (
    <section
      className={cn('border-b border-theme-gray-100 p-section', className)}
    >
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-9">
        {children}
      </div>
    </section>
  )
}

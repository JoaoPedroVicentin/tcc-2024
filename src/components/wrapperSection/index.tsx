import { cn } from '@/lib/utils'
import { IWrapperSectionProps } from './interface/wrapperListProps.interface'

export function WrapperSection({
  children,
  className,
  classNameChildren,
}: IWrapperSectionProps) {
  return (
    <section
      className={cn(
        'p-sectionMd border-b border-theme-gray-100 lg:p-section',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-screen-2xl flex-col gap-9',
          classNameChildren,
        )}
      >
        {children}
      </div>
    </section>
  )
}

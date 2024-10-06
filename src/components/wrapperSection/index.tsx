import { cn } from '@/lib/utils'
import { IWrapperSectionProps } from './interface/wrapperListProps.interface'

export function WrapperSection({
  children,
  className,
  classNameChildren,
}: IWrapperSectionProps) {
  return (
    <section
      // eslint-disable-next-line
    className={cn(
        'border-b border-theme-gray-100 p-sectionMd lg:p-section',
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

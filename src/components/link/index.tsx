import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ILinkButtonProps } from './interface/linkButtonProps.interface'
import { linkButtonVariants } from './constant/linkButtonVariants.constant'

const LinkButton = React.forwardRef<HTMLAnchorElement, ILinkButtonProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      text,
      href,
      disabled = false,
      weight = 'fill',
      ...props
    },
    ref,
  ) => {
    const paddingClass = text ? 'p-button' : 'p-2'

    const renderLink = !disabled ? (
      <Link
        href={href}
        passHref
        className={cn(
          linkButtonVariants({ variant, size, className }),
          paddingClass,
          className,
        )}
        ref={ref}
        {...props}
      >
        {LeftIcon && <LeftIcon size={20} weight={weight} />}
        {text}
        {RightIcon && <RightIcon size={20} weight={weight} />}
      </Link>
    ) : (
      <div
        className={cn(
          linkButtonVariants({ variant, size, className }),
          paddingClass,
          'cursor-not-allowed',
        )}
      >
        {LeftIcon && <LeftIcon size={20} weight={weight} />}
        {text}
        {RightIcon && <RightIcon size={20} weight={weight} />}
      </div>
    )

    return renderLink
  },
)

LinkButton.displayName = 'LinkButton'

export { LinkButton }

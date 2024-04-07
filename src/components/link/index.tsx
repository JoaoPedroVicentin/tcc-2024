import * as React from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'flex w-fit items-center justify-center gap-2 border-y-2 transition text-sm font-normal hover:drop-shadow-lg',
  {
    variants: {
      variant: {
        default:
          'hover:border-b-theme-green-100 border-theme-black-50 bg-theme-black-50 text-white hover:text-theme-green-100',
        alternative:
          'hover:border-b-theme-black-50 border-theme-green-100 bg-theme-green-100 text-black',
        ghost:
          'hover:border-b-theme-black-50 border-theme-gray-50 bg-theme-gray-50 text-black',
      },
      size: {},
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ElementType
  rightIcon?: React.ElementType
  text?: string
  href: string
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      text,
      href,
      ...props
    },
    ref,
  ) => {
    const paddingClass = text ? 'p-button' : 'p-2'

    return (
      <Link
        href={href}
        passHref
        className={cn(
          buttonVariants({ variant, size, className }),
          paddingClass,
          className,
        )}
        ref={ref}
        {...props}
      >
        {LeftIcon && <LeftIcon size={20} />}
        {text}
        {RightIcon && <RightIcon size={20} />}
      </Link>
    )
  },
)

LinkButton.displayName = 'LinkButton'

export { LinkButton }

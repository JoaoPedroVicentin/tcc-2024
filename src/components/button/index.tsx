import * as React from 'react'
import { cn } from '@/lib/utils'
import { buttonVariants } from './constant/buttonVariants.constant'
import { IButtonProps } from './interface/buttonProps.interface'

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      text,
      weight,
      ...props
    },
    ref,
  ) => {
    const paddingClass = text ? 'p-button' : 'p-2'

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          paddingClass,
        )}
        ref={ref}
        {...props}
      >
        {LeftIcon && <LeftIcon size={20} weight={weight} />}
        {text}
        {RightIcon && <RightIcon size={20} weight={weight} />}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }

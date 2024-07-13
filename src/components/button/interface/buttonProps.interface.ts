import { VariantProps } from 'class-variance-authority'
import { IconWeight } from '@phosphor-icons/react'
import { buttonVariants } from '..'

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ElementType
  rightIcon?: React.ElementType
  text?: string
  href?: string
  weight?: IconWeight
}

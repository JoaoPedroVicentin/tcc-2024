import { VariantProps } from 'class-variance-authority'
import { buttonVariants } from '../constant/buttonVariants.constant'
import { IconWeight } from '@phosphor-icons/react'

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ElementType
  rightIcon?: React.ElementType
  text?: string
  href?: string
  weight?: IconWeight
}

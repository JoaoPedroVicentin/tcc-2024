import { VariantProps } from 'class-variance-authority'
import { IconWeight } from '@phosphor-icons/react'
import { linkButtonVariants } from '../constant/linkButtonVariants.constant'

export interface ILinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkButtonVariants> {
  leftIcon?: React.ElementType
  rightIcon?: React.ElementType
  text?: string
  weight?: IconWeight
  href: string
  disabled?: boolean
}

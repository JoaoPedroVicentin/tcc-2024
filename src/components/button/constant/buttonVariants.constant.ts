import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'relative flex w-fit h-fit items-center justify-center gap-2 transition-all text-sm font-normal hover:drop-shadow-lg after:content-[""] after:absolute after:w-full after:h-0.5 after:bottom-0',
  {
    variants: {
      variant: {
        default:
          'bg-theme-black-50 text-white hover:text-theme-green-100 hover:after:bg-theme-green-100',
        alternative:
          'hover:border-b-theme-black-50 border-theme-green-100 bg-theme-green-100 text-black hover:after:bg-theme-black-50',
        ghost:
          'hover:border-b-theme-black-50 border-theme-gray-50 bg-theme-gray-50 text-black hover:after:bg-theme-black-50',
      },
      size: {},
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

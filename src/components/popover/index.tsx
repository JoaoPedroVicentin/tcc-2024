import { Button } from '@/components/ui/button'
import { Question } from '@phosphor-icons/react'
import { IPopoverProps } from './interfaces/popoverProps.interface'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export function PopoverComponent({ title, content }: IPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-fit p-2 hover:bg-theme-green-50">
          <Question size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-2">
          <div className="flex w-full items-center gap-2 border-b border-theme-green-100 pb-2 text-black">
            <Question size={20} />
            <h1 className="text-xl font-normal">{title}</h1>
          </div>
          <div className="grid gap-2">{content}</div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

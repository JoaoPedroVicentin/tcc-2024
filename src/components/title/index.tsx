import { PopoverComponent } from '../popover'
import { ITitleProps } from './interface/titleProps.interface'

export default function Title({ text, icon: Icon, info }: ITitleProps) {
  return (
    <div className="flex w-fit items-center gap-2.5 text-black">
      {Icon && (
        <div className="border-b-4 border-theme-green-100 pb-2">
          <Icon size={32} weight="fill" />
        </div>
      )}
      <h1 className="text-2xl font-normal">{text}</h1>
      {info && <PopoverComponent title={text} content={info} />}
    </div>
  )
}

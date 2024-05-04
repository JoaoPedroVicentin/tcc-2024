import { IHeaderProps } from './headerProps.interface'

export function Header({ text, icon: Icon }: IHeaderProps) {
  return (
    <header className="flex w-fit items-center gap-2.5 text-black">
      {Icon && (
        <div className="border-r-4 border-theme-green-100 pr-2">
          <Icon size={32} weight="fill" />
        </div>
      )}
      <h1>{text}</h1>
    </header>
  )
}

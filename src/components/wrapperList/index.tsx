import { IWrapperListProps } from './interface/wrapperListProps.interface'

export function WrapperList({ children }: IWrapperListProps) {
  return (
    <main className="h-full p-section">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-9">
        {children}
      </div>
    </main>
  )
}

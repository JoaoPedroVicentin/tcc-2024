import { IInfoComponentProps } from './interface/infoComponentProps.interface'

export default function InfoComponent({
  label,
  value,
  icon: Icon,
}: IInfoComponentProps) {
  return (
    <div className="flex h-fit items-start gap-2.5">
      <div className="rounded border-2 border-theme-green-100 bg-theme-green-50 p-2">
        <Icon size={20} weight="fill" />
      </div>
      <div className="flex flex-col justify-between gap-0.5">
        <label>{label}</label>
        <p>{value}</p>
      </div>
    </div>
  )
}

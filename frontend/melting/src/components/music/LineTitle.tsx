interface Props {
  titles: String[]
}
export default function LineTitle({ titles }: Props) {
  return (
    <div>
      {titles.map((title, index) => (
        <div className="text-2xl">{title}</div>
      ))}
    </div>
  )
}

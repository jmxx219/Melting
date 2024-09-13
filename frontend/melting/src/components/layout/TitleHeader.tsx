interface Props {
  titles: string[]
  comment?: string
}

export default function TitleHeader({ titles, comment }: Props) {
  return (
    <div>
      {titles.map((title, index) => (
        <div className="text-2xl font-bold" key={index}>
          {title}
        </div>
      ))}
      <div className="font-thin text-[#A5A5A5]">{comment}</div>
    </div>
  )
}

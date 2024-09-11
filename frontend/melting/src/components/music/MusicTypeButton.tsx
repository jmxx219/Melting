interface Props {
  bgColor: string
  title: string
  detail: string
  footer: string
}

export default function MusicTypeButton(props: Props) {
  const clickEvent: React.ChangeEventHandler = (event) => {
    console.log(event)
  }
  return (
    <button
      className="w-full px-3 py-5 flex items-center justify-center text-black font-bold rounded-lg transition-colors "
      style={{ backgroundColor: props.bgColor }}
      //   onClick={clickEvent}
    >
      <div className="flex w-full flex-col items-start text-white">
        <div className="text-1xl mb-3 font-semibold">멜팅 하기</div>
        <div className="mb-3 font-thin">{`원하는 곡을 커버하고 \n앨범을 제작해보세요!`}</div>
        <div className="font-thin">{`여러분의 목소리를 뽐내주세요`}</div>
      </div>
      <div>dsds</div>
    </button>
  )
}

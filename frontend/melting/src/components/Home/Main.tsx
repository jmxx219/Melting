import Greeting from './Greeting'
import Intro from './Intro'

export default function Main() {
  return (
    <div>
      <div>
        <Greeting />
      </div>
      <div>
        <Intro />
      </div>
      <div>
        명반
        <div>스테디 앨범</div>
        <div>HOT 5 앨범</div>
        <div>이달의 앨범</div>
        <div>태그별 앨범 (비회원은 못봄)</div>
      </div>
    </div>
  )
}

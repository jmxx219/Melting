import Greeting from './Greeting'
import Intro from './Intro'
import MonthlyAlbum from './MonthlyAlbum'
import SteadyAlbum from './SteadyAlbums'

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
        <div>
          <SteadyAlbum />
        </div>
        <div>HOT 5 앨범</div>
        <div>
          <MonthlyAlbum />
        </div>
        <div>태그별 앨범 (비회원은 못봄)</div>
      </div>
    </div>
  )
}

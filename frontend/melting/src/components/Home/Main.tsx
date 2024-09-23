import Greeting from './Greeting'
import HotAlbum from './HotAlbums'
import Intro from './Intro'
import MonthlyAlbum from './MonthlyAlbums'
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
      <div className="space-y-10">
        <div>
          <SteadyAlbum />
        </div>
        <div>
          <HotAlbum />
        </div>
        <div>
          <MonthlyAlbum />
        </div>
        <div>태그별 앨범 (비회원은 못봄)</div>
      </div>
    </div>
  )
}

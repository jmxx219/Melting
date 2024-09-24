import Greeting from './Greeting'
import HotAlbum from './HotAlbums'
import Intro from './Intro'
import MonthlyAlbum from './MonthlyAlbums'
import SteadyAlbum from './SteadyAlbums'
import TagAlbum from './TagAlbums'

export default function Main() {
  return (
    <div className="">
      <div className="text-left">
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
        <div>
          <TagAlbum />
        </div>
      </div>
    </div>
  )
}

import Brandner from "../../../components/Brandner"
import VideoCall from "../../../components/callandvideo/VideoCall"

function VideoCallPage() {
  return (
    <div>
      <div>
        <Brandner title="การโทรด้วยวีดีโอ"/>
      </div>
      <div className="px-10 py-5">
        <VideoCall/>
      </div>
    </div>
  )
}
export default VideoCallPage
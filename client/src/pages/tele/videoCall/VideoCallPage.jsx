import Brandner from "../../../components/Brandner.jsx"
import VideoCall from "../../../components/callandvideo/VideoCall.jsx"

function VideoCallPage() {
  return (
    <div className="font-prompt">
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
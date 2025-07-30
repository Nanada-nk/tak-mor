import Brandner from "../../../components/Brandner.jsx"
import CallAndVideo from "../../../components/callandvideo/CallAndVideo.jsx"

function CallingPage() {
  return (
    <div className="font-prompt">
      <div>
        <Brandner title="การโทรด้วยเสียง"/>
      </div>
      <div className="px-10 py-5">
        <CallAndVideo/>
      </div>
    </div>
  )
}
export default CallingPage
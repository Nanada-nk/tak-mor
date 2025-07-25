import Brandner from "../../../components/Brandner"
import CallAndVideo from "../../../components/callandvideo/CallAndVideo"

function CallingPage() {
  return (
    <div>
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
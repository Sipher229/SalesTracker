
import { useNavigate } from "react-router-dom"
import ClosedLock from "../utils/icons/ClosedLock"


function RestrictedAccess() {

  const navigate = useNavigate()
  return (
    <main className="w-full h-full flex justify-center items-center bg-fadedGrayBg">
      <div className=" bg-white shadow-md rounded-md w-96 h-64 flex flex-col justify-center items-center p-5 gap-4">
        <ClosedLock />
        <h1 className="w-full h-4 my-2 roboto-bold  text-center text-2xl">Restricted Access</h1>
        <p className="w-full h-4/6 roboto-light text-center">You do not have access to this page. If this is unexpected please contact your supervisor.</p>
        <button onClick={()=> navigate(-1)} className="text-mylightgreen-300 underline underline-offset-2 active active:no-underline roboto-medium">Back</button>
      </div>
    </main>
  )
}

export default RestrictedAccess
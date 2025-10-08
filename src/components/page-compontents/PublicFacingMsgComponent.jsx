/* eslint-disable react/prop-types */
import DeleteIconX from "../utils/icons/DeleteIconX"

function PublicFacingMsgComponent({message="", isError=false, isShowing=false, hideMessageBox}) {
  return (
    <div className={`w-5/6 h-auto flex flex-col scale-y-100 justify-center items-start rounded-md roboto-regular border-2 p-6 my-2 ${isShowing? "" : "hidden"} ${isError? "border-red-500 bg-red-200 text-red-500" : "bg-mygreen-100 border-mygreen-700 text-mygreen-750"} `}>
        <div className="w-full h-auto mb-1 flex justify-end">
          <button onClick={() => hideMessageBox()}><DeleteIconX /></button>
        </div>
        <p>{message}</p>
    </div>
  )
}

export default PublicFacingMsgComponent
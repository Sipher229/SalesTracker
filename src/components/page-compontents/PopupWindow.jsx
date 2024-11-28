/* eslint-disable react/prop-types */
import Loading from "../utils/Loading"

function PopupWindow({handleConfirmed, showing, messageTitle, messageBody, actionName, handleShowing, isLoading}) {


  return ( 
    isLoading ? <Loading /> :
    <aside className={`${!showing? 'hidden': 'z-50'} p-4 bg-white shadow-2xl w-80 h-44 rounded-md top-1/4 right-1/3 absolute flex flex-col justify-start items-start`}> 
        <h3 className="w-full h-1/4 roboto-bold ">{messageTitle}</h3>
        <p className="w-full h-3/4 roboto-medium mt-3 ">{messageBody}</p>
        <div className="w-full h-1/4 roboto-bold flex justify-end item-center gap-3">
            <button onClick={() => handleShowing(false)} className="roboto-medium rounded-md active:scale-95 bg-mygreen-100 text-white w-20 h-8" name="cancel">Cancel</button>
            <button onClick={handleConfirmed} className="roboto-medium rounded-md active:scale-95 outline-gray-200 bg-red-700 text-white w-20 h-8" name="confirmed">{actionName}</button>
        </div>
    </aside>
  )
}

export default PopupWindow
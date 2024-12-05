/* eslint-disable react/prop-types */
import Spiner from "../../utils/Spiner"


function SubmitButton({handleSubmit, isLoading=false, name='Submit'}) {
    
  return (
    <button type="submit" disabled={isLoading} className="outline-white row-start-11 disabled:opacity-35 disabled:cursor-not-allowed row-span-2 h-10 col-start-11 col-span-8 bg-mygreen-700 text-white flex justify-center items-center rounded-md active:scale-95" onClick={handleSubmit}> {isLoading ? <Spiner /> : name} </button>
  )
}

export default SubmitButton
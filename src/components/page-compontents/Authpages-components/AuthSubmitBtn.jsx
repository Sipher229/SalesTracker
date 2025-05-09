/* eslint-disable react/prop-types */
import Spiner from "../../utils/Spiner"


function AuthSubmitBtn({isLoading, handleSubmit, name='Log in'}) {
  return (
    <button type='submit' disabled={isLoading} className='text-white outline-white bg-mygreen-700 w-20 h-8 rounded-md disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 flex justify-center items-center' onClick={handleSubmit}>{isLoading? <Spiner/> : name}</button>
  )
}

export default AuthSubmitBtn
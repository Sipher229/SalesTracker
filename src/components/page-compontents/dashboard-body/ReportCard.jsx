/* eslint-disable react/prop-types */
import AuthSubmitBtn from '../Authpages-components/AuthSubmitBtn'
import { useState } from 'react'
import Api from '../../utils/API-calling-functions/Api'
import { useDispatch } from 'react-redux'
import { updateShiftDuration } from '../../../store/features/employeeSlice'

function ShiftUpdate({handleShowing}) {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const api = new Api
  const dispatch = useDispatch()
  const handleChange = (e) => {
    if(/^[0-9]$/.test(e.target.value) && value.length === 0){

      setValue(e.target.value)
    }
  }
  const handleBackSpace = (e) => {
    if (e.target.length !== 0){
      setValue('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try{

      const response = await api.editShiftDuration({shiftDuration: value})
      if(response.status === 200) {
        dispatch(updateShiftDuration(response.data.newDuration))
      } 
      setIsLoading(false)
      handleShowing(false)
    }
    catch(err){
      setIsLoading(false)
      handleShowing(false)
      console.log(err.message)
    }

  }


  return (
    <form className={` w-full  h-full flex justify-center items-center gap-16`}>
      <input
      className=" bg-white outline-mylightgreen-300 roboto-medium rounded-sm px-2 outline-offset-2 w-16 h-6 border-mygreen-200"
      value={value}
      onChange={handleChange}
      type='text'
      required
      placeholder='Eg: 8'
      onKeyDown={(e) => e.key == 'Backspace' && handleBackSpace(e)}
      />
      <AuthSubmitBtn isLoading={isLoading} handleSubmit={handleSubmit} name={'Save'}/>
      
      
    </form>
  )

}

function ReportCard({salesPerHour = 0, loginTime = 'N/A', shiftDuration = 'N/A'}) {
  const [showing, setShowing] = useState(false)
  return (
    <>
        <div className="w-full h-full bg-white box-border py-2 rounded-md shadow-xl hover:outline-offset-2 outline-mygreen-500 overflow-hidden">
            
            <div className="flex justify-between pr-3 h-auto">
                <h1 id="cardtitle" className="roboto-bold text-xl px-3 text-center">Shift Details</h1>
            </div>
            <table className=" w-full ">
                <tbody className="">
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Current Sales per hour</td>
                        <td className="w-[30rem] h-full text-left px-3 roboto-bold">{ parseFloat(salesPerHour).toFixed(2) || 'N/A'}</td>
                      </tr>
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Shift Start</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-bold">
                          <span>{loginTime?.split('T')[1]?.split('.')[0] || 'Error reload page'}</span>
                      </td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Shift Duration</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">
                      {
                      showing? <ShiftUpdate handleShowing={setShowing} />:

                      <div className="flex justify-between roboto-bold h-auto">
                        <span className="text-inherit roboto-bold text-lg">{shiftDuration} {shiftDuration > 1 ? 'hrs': 'hr'} </span>
                        <button className={`text-mygreen-500 underline active:no-underline underline-offset-2 decoration-inherit roboto-medium`} onClick={() => setShowing(true)}>Edit</button>
                      </div>
                      }
                    </td>
                    </tr>
                </tbody>
            </table>
      </div>
    </>
  )
}

export default ReportCard


//both the shift start and shift end times should be loaded the from the database
// when the app first loads do the following:
// check if the user has already logged in for the day. 
// if not logged in yet update the shift start date in the database
// else do nothing
// the shift end should be set up by default when an employee is created. however can be edited if
// needed
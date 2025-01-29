/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Api from "../utils/API-calling-functions/Api"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../utils/Loading"
import { useNavigate, useParams } from "react-router-dom"
import RestrictedAccess from "../page-compontents/RestrictedAccess"
import { setErrorTickets, updateErrorFlag } from "../../store/features/errorTicketsSlice"
import AuthSubmitBtn from "../page-compontents/Authpages-components/AuthSubmitBtn"
import errorMessages from "../utils/errorMessages"
import Spiner from "../utils/Spiner"

function ShiftUpdate({handleShowing, loginDate, id}) {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const api = new Api
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

      const response = await api.editShiftDurationByDate({shiftDuration: value, employeeId: id, loginDate})
      if (response.status === 200 ){
        handleShowing(response.data.newDuration, response.data.salesPerHour)
      }
      setIsLoading(false)
    }
    catch(err){
      setIsLoading(false)
      handleShowing()
      updateErrorFlag(true)
      setErrorTickets(err.message)
    }

  }


  return (
    
      <>
        {
          isLoading ? <Spiner /> :

          <form className={` w-full  h-full flex justify-center items-center gap-16`}>
            <input
            className=" bg-white outline-mylightgreen-300 roboto-light rounded-md px-2 outline-offset-2 w-20 h-8 border border-mygreen-300"
            value={value}
            onChange={handleChange}
            type='text'
            required
            autoFocus
            placeholder='Eg: 8'
            onKeyDown={(e) => e.key == 'Backspace' && handleBackSpace(e)}
            />
            <AuthSubmitBtn isLoading={isLoading} handleSubmit={handleSubmit} name={'Save'}/>
            
            
          </form>
        }
      </>

  )

}

function DateQryTool({isLoading, setIsLoading, updateLogs, id=-1}) {
  const [dt, setDt] = useState('')
  const dispatch = useDispatch()
  const api = new Api()
  const handleSubmit = async (e) => {
      e.preventDefault()
      setIsLoading(true)
      if (dt === '') return
      try{

          const response = await api.getLogsByIdAndDate(id, dt)
          if( response.status === 200){
            updateLogs(response.data.requestedData)
          }
          else
          {
              dispatch(setErrorTickets([errorMessages.failedFetch]))
              dispatch(updateErrorFlag(true))
          }
          setIsLoading(false)

      }
      catch(err){
          dispatch(setErrorTickets([err.message,errorMessages.failedFetch]))
          dispatch(updateErrorFlag(true))
          setIsLoading(false)
  
      }
  }

  return (
    <>
        <form className="w-80 h-full flex justify-center items-center gap-4">
            
            <input 
            className="w-44 h-9 outline-mylightgreen-300 border rounded-md border-mygreen-300 outline-offset-2 p-2 text-center roboto-medium"
            value={dt}
            onChange={(e) => setDt(e.target.value)}
            type='date'
            autoComplete="off"
            />
            
            <AuthSubmitBtn name="Query"  handleSubmit={handleSubmit} isLoading={isLoading} />
        </form>
    </>
  )
} 


function RowComponent({entryDate='N/A', rowNumber=0,  salesPerHour=0, shiftDuration=0, commission='N/A', loginTime='N/A', employeeId = -1}) {
  const [showing, setShowing] = useState(false)
  const [myShiftDuration, setmyShiftDuration] = useState(shiftDuration)
  const [mySalesPerHour, setmySalesPerHour] = useState(salesPerHour)

  const handleShowing = (newDuration=-1, sph=-1) => {
    if (newDuration < 0 || salesPerHour < 0) {
      setShowing(false)
      return
    }
    setmyShiftDuration(newDuration)
    // setmySalesPerHour(sph)
    setmySalesPerHour(sph.toFixed(2))
    setShowing(false)
  }


  return (
    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
      <td className="w-10 h-8 text-left px-3 roboto-light text-sm">{rowNumber + 1}</td>
      <td className="w-24 h-8 text-left px-3 roboto-light text-sm text-mygreen-500 decoration-inherit">{entryDate}</td>
      <td className="w-24 h-8 text-left px-3 roboto-light text-sm">{loginTime}</td>
      <td className="w-24 h-8 text-left px-3 roboto-light text-sm">
      {
        showing? <ShiftUpdate handleShowing={handleShowing} loginDate={entryDate} id={employeeId} />:

        <div className="flex justify-between roboto-bold h-auto">
          <span className="roboto-light">{myShiftDuration} {myShiftDuration > 1 ? 'hrs': 'hr'} </span>
          <button className={`text-mygreen-500 underline active:no-underline underline-offset-2 decoration-inherit roboto-medium`} onClick={() => setShowing(true)}>Edit</button>
        </div>
      }
      </td>
      <td className="w-24 h-8 text-left px-3 roboto-light text-sm">{commission || 'N/A'}</td>
      <td className="w-24 h-8 text-left px-3 roboto-light text-sm">{mySalesPerHour}</td>
                    
    </tr>
  )
}

function LogsComponent({logs, id}) {
  return (
    <>
      <div className="w-full h-full bg-white box-border  rounded-md shadow-xl hover:outline-offset-2 outline-mygreen-500 overflow-y-scroll">
            
            <table className=" w-full ">
                <tbody className="">
                  <tr className="w-full h-9 bg-fadedGrayBg">

                    <td className="w-10 h-8 text-left px-3 roboto-medium">No</td> 
                    <td className="w-24 h-8 text-left px-3 roboto-medium">Login Date</td> 
                    <td className="w-24 h-8 text-left px-3 roboto-medium">Login Time</td>
                    <td className="w-36 h-8 text-left px-3 roboto-medium">Shift Duration</td>
                    <td className="w-36 h-8 text-left px-3 roboto-medium">Commission</td>
                    <td className="w-24 h-8 text-left px-3 roboto-medium">Sales/hr</td>
                    
                  </tr>
                  {
                    logs.length === 0 ?
                    <RowComponent />
                    :
                    logs.map((log, index) => {
                      return <RowComponent key={index} id={log.id} employeeId={id} rowNumber={index} entryDate={log.login_date?.split('T')[0]} salesPerHour={log.sales_per_hour?.toFixed(2)} loginTime={log.login_time?.split('T')[1]?.split('.')[0]} commission={log.commission} shiftDuration={log.shift_duration} />
                    })
                  }
        
                </tbody>
            </table>
      </div>
    </>
  )
}

function Report() {
  const api = new Api()
  const [isLoading, setIsLoading] = useState(false)
  const [logs, setlogs] = useState([])
  const [employeeName, setemployeeName] = useState('Employee')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isLoggedIn, subscriptionIsActive} = useSelector((state) => state.employee)
  const {id} = useParams()
  const updateLogs = (logData) => {
    setlogs(logData)
  }
  useEffect(() => {
    if(!isLoggedIn) navigate('/layout/dashboard');
    
    if (!subscriptionIsActive) navigate('/layout/subscription-not-active');

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await api.getLogsById(id)
        if (response.status === 200) {
          setlogs(response.data.requestedData)
          console.log(response.data.requestedData)
          if (response.data.requestedData.length > 0) {
            const fName = response.data.requestedData[0].first_name
            const lName = response.data.requestedData[0].last_name
            fName ? setemployeeName(fName+ " " + lName) : ""
          }
        }
        setIsLoading(false)
      } catch (err) {
        dispatch(setErrorTickets([err.message]))
        dispatch(updateErrorFlag(true))
        setIsLoading(false)
      }
      
    }
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <>
      { user.role === 'manager' ?
        <main className="grid w-full h-full grid-cols-12 grid-rows-12 gap-3 bg-fadedGrayBg">
        <div className="w-full h-full mt-3 flex justify-between items-center col-start-2 col-span-10 row-start-1 row-span-1">
          <h1 className="roboto-bold text-2xl p-1 text-left">{employeeName}</h1>
          <DateQryTool id={id}  updateLogs={updateLogs} isLoading={isLoading} setIsLoading={setIsLoading}/>
        </div>
        <div className="row-start-3 row-span-9 col-start-2 col-span-10">
          
          {isLoading? 
          <Loading /> :  
          <LogsComponent logs={logs}  id={id}/>}
        </div>
        </main>
        :
        <RestrictedAccess />
      }
    </>
  )
}

export default Report
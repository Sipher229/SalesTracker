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


function RowComponent({entryDate='N/A', rowNumber=0,  salesPerHour='N/A', shiftDuration='N/A', commission='N/A', loginTime='N/A'}) {
  return (
    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
      <td className="w-10 h-8 text-left px-3 roboto-medium text-sm">{rowNumber + 1}</td>
      <td className="w-24 h-8 text-left px-3 roboto-light text-sm underline text-mygreen-500 underline-offset-2 decoration-inherit">{entryDate}</td>
      <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">{loginTime}</td>
      <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">{shiftDuration}</td>
      <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">{commission}</td>
      <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">{salesPerHour}</td>
                    
    </tr>
  )
}

function EmployeesComponent({logs}) {
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
                      return <RowComponent key={index} id={log.id} rowNumber={index} entryDate={log.login_date?.split('T')[0]} salesPerHour={log.sales_per_hour} loginTime={log.login_time?.split('T')[1]?.split('.')[0]} commission={log.commission} shiftDuration={log.shift_duration} />
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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isLoggedIn} = useSelector((state) => state.employee)
  const {id} = useParams()
  const updateLogs = (logData) => {
    setlogs(logData)
  }
  useEffect(() => {
    if(!isLoggedIn) navigate('/layout/dashboard')


    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await api.getLogsById(id)
        if (response.status === 200) {
          setlogs(response.data.requestedData)
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
          <h1 className="roboto-bold text-2xl p-1 text-left">My Team</h1>
          <DateQryTool id={id}  updateLogs={updateLogs} isLoading={isLoading} setIsLoading={setIsLoading}/>
        </div>
        <div className="row-start-3 row-span-9 col-start-2 col-span-10">
          
          {isLoading? 
          <Loading /> :  
          <EmployeesComponent logs={logs} />}
        </div>
        </main>
        :
        <RestrictedAccess />
      }
    </>
  )
}

export default Report
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Api from "../../utils/API-calling-functions/Api"
import { useDispatch, useSelector } from "react-redux"
import { initializeLogs } from "../../../store/features/dailyLogSlice"
import Loading from "../../utils/Loading"
import { setErrorTickets, updateErrorFlag } from "../../../store/features/errorTicketsSlice"
import errorMessages from "../../utils/errorMessages"
import AuthSubmitBtn from "../Authpages-components/AuthSubmitBtn"


function RowComponent({name="N/A", campaignName='N/A', salesPerHour=-1}) {
    return (
      <>
        <tr className="w-full h-9 odd:bg-white even:bg-fadedGrayBg">
  
          <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm roboto-medium text-mygreen-300">{name || 'N/A'}</td>
          <td className="w-[30rem] h-full text-left px-3 roboto-bold text-sm">{campaignName || 'N/A'}</td>
          <td className="w-[30rem] h-full text-left px-3 roboto-bold text-sm">{salesPerHour < 0 ? 'N/A' : salesPerHour?.toFixed(2) }</td>
                        
        </tr>
      </>
    )
}
  
function DateQryTool({isLoading, setIsLoading, updateLogs}) {
  const [dt, setDt] = useState('')
  const dispatch = useDispatch()
  const api = new Api()
  const handleSubmit = async (e) => {
      e.preventDefault()
      setIsLoading(true)
      if (dt === '') return
      try{

          const response = await api.getLogsByDate(dt)
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
  
function BodyComponent({employees=[]}) {
  
  return (
    <>
      <div className="w-full h-full box-border overflow-y-scroll flex flex-col justify-start items-center">
            
            <table className=" w-full">
                <tbody className="w-full">
                  <tr className="w-full h-9">

                    <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">Name</td> 
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium">Campaign</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium">Sales Per Hour</td>
                  </tr>
                  {
                      employees.length !== 0 ?
                      employees.map((employee, index) => {
                          return <RowComponent key={index} name={employee.first_name + " " + employee.last_name} campaignName={employee.campaign_name}  salesPerHour={employee.sales_per_hour}/>
                      })
                      : <RowComponent />
                  }
                </tbody>
            </table>
      </div>
    </>
  )
}
  
function WeeklyBillBoard() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const {logs} = useSelector((state) => state.logs)
  const api = new Api()
  const updateDelay = 1000 * 60 * 10
  const delay = 800
  const updateLogs= data => dispatch(initializeLogs(data))
  useEffect(() => {
    const fetchData = async () => {
      
      try{
        const response =  await api.getLogs()
        if (response.status === 200) {
          dispatch(initializeLogs(response.data.requestedData))
          
        }
        setIsLoading(false)
        
      }
      // eslint-disable-next-line no-unused-vars
      catch(error) {
        setIsLoading(false)
      }
    }
    const id = setTimeout(() => fetchData(), delay)
    const intervalId = setInterval(fetchData, updateDelay )
    return () => {
      clearTimeout(id)
      clearInterval(intervalId)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <main className="grid w-full h-[20rem] grid-cols-12 rounded-md overflow-hidden grid-rows-6 gap-3 bg-white shadow-xl">
      <div className="col-start-1 col-span-12 row-start-1 row-span-1 h-12 mt-3 flex justify-between items-center pr-3"><h1 className="roboto-bold text-xl text-left px-3 w-full">Daily Billboard</h1> <DateQryTool isLoading={isLoading} setIsLoading={setIsLoading} updateLogs={updateLogs}  /> </div> 
        <div className="col-start-1 row-start-2 col-span-12 row-span-6 flex justify-start items-start">
        {
          isLoading ?
          <div className='w-full h-full flex justify-center items-center'><Loading /></div>
          :
          <BodyComponent employees={logs} isLoading={isLoading} setIsLoading={setIsLoading} />
        }

        </div>
      </main>
    </>
  )
}

export default WeeklyBillBoard
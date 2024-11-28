/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Api from "../../utils/API-calling-functions/Api"
import { useDispatch, useSelector } from "react-redux"
import { initializeLogs } from "../../../store/features/dailyLogSlice"
import Loading from "../../utils/Loading"


function RowComponent({name="N/A", campaignName='N/A', salesPerHour=3}) {
    return (
      <>
        <tr className="w-full h-9 odd:bg-white even:bg-fadedGrayBg">
  
          <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm roboto-medium text-mygreen-300">{name || 'N/A'}</td>
          <td className="w-[30rem] h-full text-left px-3 roboto-bold text-sm">{campaignName || 'N/A'}</td>
          <td className="w-[30rem] h-full text-left px-3 roboto-bold text-sm">{salesPerHour?.toFixed(2) || 'N/A'}</td>
                        
        </tr>
      </>
    )
  }
  
  
  
  function BodyComponent({employees=[]}) {
    return (
      <>
        <div className="w-full h-full bg-white box-border overflow-y-scroll flex flex-col justify-start items-center">
              <h1 className="roboto-bold text-xl text-left px-3 w-full">Daily Billboard</h1>
              <table className=" w-full   ">
                  <tbody className="w-full">
                    <tr className="w-full h-9">
  
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">Name</td> 
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium">Campaign</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium">Sales Per Hour</td>
                    </tr>
                    {
                        employees.map((employee, index) => {
                            return <RowComponent key={index} name={employee.first_name + " " + employee.last_name} campaignName={employee.campaign_name}  salesPerHour={employee.sales_per_hour}/>
                        })
                    }
                  </tbody>
              </table>
        </div>
      </>
    )
  }
  
function WeeklyBillBoard() {
  const [isLoading, setIsLoding] = useState(true)
  const dispatch = useDispatch()
  const {logs} = useSelector((state) => state.logs)
  const api = new Api()
  const updateDelay = 1000 * 60 * 10
  const delay = 800
  useEffect(() => {
    const fetchData = async () => {
      
      try{
        const response =  await api.getLogs()
        if (response.status === 200) {
          dispatch(initializeLogs(response.data.requestedData))
          
        }
        setIsLoding(false)
        
      }
      // eslint-disable-next-line no-unused-vars
      catch(error) {
        setIsLoding(false)
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
      <main className="grid w-full h-full grid-cols-12 rounded-md overflow-hidden grid-rows-12 gap-3 bg-white shadow-xl">
      
        <div className="w-[56rem] h-[14rem] flex justify-start items-start">
        {
          isLoading ?
          <div className='w-full h-full flex justify-center items-center'><Loading /></div>
          :
          <BodyComponent employees={logs} /> || "No data to display."
        }

        </div>
      </main>
    </>
  )
}

export default WeeklyBillBoard
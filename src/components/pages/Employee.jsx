/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import Api from "../utils/API-calling-functions/Api"
import Loading from "../utils/Loading"
import BarChart from "../page-compontents/dashboard-body/BarChart"
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);


function EmployeeComponent({loginTime='N/A',firstName='N/A', lastName ='N/A', employeeNumber='N/A', employeeRole='N/A', campaign='N/A', id=-1, salesPerHour ='N/A'}){
  return (
    <>
      <div className="w-full h-full bg-white box-border py-2 rounded-md shadow-xl outline-mygreen-500 overflow-hidden">
            
            <div className="flex justify-between pr-3 h-auto">
                <h1 id="cardtitle" className="roboto-bold text-xl px-3 text-center">Employee</h1>
                <div className="w-1/4 h-auto flex justify-end items-center gap-2">
                  <Link className={`text-mygreen-500 underline underline-offset-2 decoration-inherit roboto-medium`} to={`/layout/allemployees/employee/edit/${id}`}>Edit</Link>
                  <button className={`text-mygreen-500 underline underline-offset-2 decoration-inherit roboto-medium`}>Delete</button>
                </div>

            </div>
            <table className=" w-full ">
                <tbody className="">
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Names</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium">{firstName + " " + lastName}</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Campaign</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{campaign}</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Employee Number</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{employeeNumber}</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">employee Role</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{employeeRole}</td>
                    </tr>
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm"> Sales Per Hour</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{salesPerHour}</td>
                    </tr>
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm"> Logged in at</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{loginTime}</td>
                    </tr>
                    
                </tbody>
            </table>
      </div>
    </>
  )
}





function StatsGraph({id}) {
  const [isLoading, setIsLoading] = useState(true)
  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])
  const api = new Api()

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await api.getChartDataById(id)
 
            if (response.status === 200){
              const myData = Array.from(response.data.requestedData, (log) => {
                if(log.sales_per_hour !== null){
                  return log.sales_per_hour
                }
              })   
              setData(myData)
              const myLabels= Array.from(response.data.requestedData, (log) => log.login_date.split('T')[0])
              setLabels(myLabels)
            }
            setIsLoading(false)

        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setIsLoading(false)
        }
    }
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // const handleRefresh = async () => {
  //   setIsLoading(true)
  //   try {
  //       const response = await api.getLogs()
  //       if (response.status === 200){
  //           dispatch(initializeLogs(response.data.requestedData))
  //       }
  //       setIsLoading(false)

  //   } catch (error) {
  //       setIsLoading(false)
  //   }

  // }
  return (
    <>
        <div id="statsGraph" className="w-5/6 h-96 bg-white shadow-xl rounded-md p-2">
            <h1 className="roboto-bold text-xl px-3 text-center w-full h-7">Weekly Stats</h1>
            <div className="h-80 w-full flex flex-col items-center">

              <BarChart isLoading={isLoading} logs={data} labels={labels} />
            </div>
        </div>
    </>
  )
}


function Employee() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const {isLoggedIn} = useSelector((state) => state.employee)
  const {id} = useParams()
  const [employee, setemployee] = useState(null)
  const api = new Api()
  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/layout/dashboard')
    }
    if(id && id> 0) {
      
      const fetchData = async () => {
        setIsLoading(true)
        try{
          const response = await api.getEmployeeById(id)
          if (response.status === 200) {
            setemployee(response.data.requestedData[0])
            console.log(response.data.requestedData[0])
          }
          setIsLoading(false)
        }
        // eslint-disable-next-line no-unused-vars
        catch(err) {
          setIsLoading(false)
        }
      }
      fetchData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <main className="flex flex-col justify-start items-center gap-5 w-full h-full bg-fadedGrayBg overflow-y-scroll">
        <div className="grid w-full h-[35rem] grid-cols-12 grid-rows-6">

          <div className="row-start-2 row-span-6 col-start-3 col-span-8">
            {id && !isLoading? 
            <EmployeeComponent 
            firstName={employee?.first_name}
            lastName={employee?.last_name}
            id={id} 
            campaign={employee?.campaignname}
            employeeNumber={employee?.employee_number}
            employeeRole={employee?.employee_role}
            loginTime={employee?.login_time?.split('T')[0] + " " + employee?.login_time?.split('T')[1]}
            salesPerHour={employee?.sales_per_hour}
            />
            :
            isLoading && <EmployeeComponent /> || <Loading /> }

          </div>
        </div>
        {id? <StatsGraph id={id} /> : <p>No Graph Data to be displayed</p>}
      </main>
      
    </>
  )
}

export default Employee
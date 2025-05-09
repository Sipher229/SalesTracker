/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import Api from "../utils/API-calling-functions/Api"
import Loading from "../utils/Loading"
import BarChart from "../page-compontents/dashboard-body/BarChart"
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import RestrictedAccess from "../page-compontents/RestrictedAccess"
import { initializeEmployees } from "../../store/features/employeesSlice"
import { setErrorTickets, updateErrorFlag } from "../../store/features/errorTicketsSlice"
import PopupWindow from "../page-compontents/PopupWindow"
Chart.register(CategoryScale);


function EmployeeComponent({loginTime='N/A',firstName='N/A', lastName ='N/A', employeeNumber='N/A', employeeRole='N/A', campaign='N/A', id=-1, salesPerHour ='N/A', handleShowing}){
  return (
    <>
      <div className="w-full h-full bg-white box-border py-2 rounded-md shadow-xl outline-mygreen-500 overflow-hidden">
            
            <div className="flex justify-between pr-3 h-auto">
                <h1 id="cardtitle" className="roboto-bold text-xl px-3 text-center">Employee</h1>
                <div className="w-1/4 h-auto flex justify-end items-center gap-2">
                  <Link className={`text-mygreen-500 underline underline-offset-2 decoration-inherit roboto-medium`} to={`/layout/allemployees/employee/edit/${id}`}>Edit</Link>
                  <button onClick={() => handleShowing(true)} className={`text-mygreen-500 underline active:no-underline underline-offset-2 decoration-inherit roboto-medium`}>Delete</button>
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
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">
                        <div className="flex justify-between w-full h-full items-center">
                          {loginTime}
                          <Link to={`/layout/allemployees/employee/report/${id}`} className="text-mygreen-500 underline underline-offset-2 decoration-inherit roboto-medium" >Report</Link>
                        </div>
                      </td>
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
        <div id="statsGraph" className="w-5/6 h-96 mb-5 bg-white shadow-xl rounded-md p-2">
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
  const {isLoggedIn, user, subscriptionIsActive } = useSelector((state) => state.employee)
  const [loginTime, setloginTime] = useState(null)
  const [salesPerhour, setsalesPerHour] = useState(null)
  const [showing, setShowing] = useState(false)
  const {id} = useParams()
  const [employee, setemployee] = useState(null)
  const {employees} = useSelector((state) => state.employees)
  const dispatch = useDispatch()
  const delay = 800
  const api = new Api()
  const message = {
    messageTitle: 'Are you sure?',
    messageBody: 'This action is irreversible.',
    actionName: 'Delete'
  }
  const handleDelete = async () =>{
    // delete
    try{
      const response = await api.deleteEmployee(id)
      if (response.status === 200) {
        dispatch(setErrorTickets([response.data.message]))
        dispatch(updateErrorFlag(false))
        setIsLoading(false)
        setShowing(false)
        setTimeout(() => {
          
          navigate('/layout/allemployees')
        }, delay)
      }
      else{
        dispatch(setErrorTickets(['Could Not delete employee']))
        dispatch(updateErrorFlag(true))
        setIsLoading(false)
        setShowing(false)
      }

      
    }
    catch (err) {
      dispatch(setErrorTickets([err.message]))
      dispatch(updateErrorFlag(true))
      setIsLoading(false)
      setShowing(false)
    }
  }
  useEffect(() => {
    if(employees.length === 0){
      const fetchData = async () => {
        try {
          const response = await api.getAllEmployees()
          if(response.status === 200){
            dispatch(initializeEmployees(response.data.requestedData))
          }
        } catch (error) {
          console.log(error.message)
        }
      }
      fetchData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/layout/dashboard')
    }
    
    if (!subscriptionIsActive) navigate("/layout/subscription-not-active");
    if(id && id> 0) {
      const emp = employees.find((em) => em.id == id)
      setemployee(emp)
      
      const fetchData = async () => {
        setIsLoading(true)
        try{
          const response = await api.getEmployeeById(id)
          if (response.status === 200) {
            setloginTime(response.data.requestedData[0].login_time)
            setsalesPerHour(response.data.requestedData[0].sales_per_hour)
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
  }, [employees])

  return (
    <>
      { user.role === 'manager' ?
        <>
          <PopupWindow handleConfirmed={handleDelete} handleShowing={setShowing} showing={showing} isLoading={isLoading} messageBody={message.messageBody} messageTitle={message.messageTitle} actionName={message.actionName} />
          <main className={`flex flex-col justify-start items-center gap-5 w-full h-full bg-fadedGrayBg overflow-y-scroll ${showing? 'filter brightness-75': ''}`}>
            <div className="grid w-full h-[35rem] grid-cols-12 grid-rows-6">

              <div className="row-start-2 row-span-6 col-start-3 col-span-8">
                {id && !isLoading? 
                <EmployeeComponent 
                firstName={employee?.first_name}
                lastName={employee?.last_name}
                id={id} 
                campaign={employee?.campaign_name}
                employeeNumber={employee?.employee_number}
                employeeRole={employee?.employee_role}
                loginTime={loginTime ? loginTime?.split('T')[0] + " " + loginTime?.split('T')[1].split('.')[0] : 'N/A'}
                salesPerHour={salesPerhour ? salesPerhour.toFixed(2) : 'N/A'}
                handleShowing={setShowing}
                />
                :
                isLoading && <EmployeeComponent /> || <Loading /> }

              </div>
            </div>
            {id? <StatsGraph id={id} /> : <p>No Graph Data to be displayed</p>}
          </main>
        </>
            :
        <RestrictedAccess />
        
        }
      
    </>
  )
}

export default Employee
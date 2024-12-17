
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import Api from "../utils/API-calling-functions/Api"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../utils/Loading"
import { Link, useNavigate } from "react-router-dom"
import { initializeEmployees } from "../../store/features/employeesSlice"
import RestrictedAccess from "../page-compontents/RestrictedAccess"

function RowComponent({name='N/A', rowNumber=0,  role='N/A', campaign='N/A', employeeNumber='N/A', goal='N/A', id=1}) {
  return (
    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
      <td className="w-10 h-8 text-left px-3 roboto-medium text-sm">{rowNumber + 1}</td>
      <td className="w-24 h-8 text-left px-3 roboto-light text-sm underline text-mygreen-500 underline-offset-2 decoration-inherit"> <Link to={`/layout/allemployees/employee/${id}`}>{name} </Link> </td>
      <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">{campaign}</td>
      <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">{employeeNumber}</td>
      <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">{role}</td>
      <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">{goal}</td>
                    
    </tr>
  )
}

function EmployeesComponent({employees, query}) {
  return (
    <>
      <div className="w-full h-full bg-white box-border  rounded-md shadow-xl hover:outline-offset-2 outline-mygreen-500 overflow-y-scroll">
            
            <table className=" w-full ">
                <tbody className="">
                  <tr className="w-full h-9 bg-fadedGrayBg">

                    <td className="w-10 h-8 text-left px-3 roboto-medium">No</td> 
                    <td className="w-24 h-8 text-left px-3 roboto-medium">Name</td> 
                    <td className="w-36 h-8 text-left px-3 roboto-medium">campaign</td>
                    <td className="w-36 h-8 text-left px-3 roboto-medium">Employee Number</td>
                    <td className="w-24 h-8 text-left px-3 roboto-medium">Role</td>
                    <td className="w-24 h-8 text-left px-3 roboto-medium">Goal</td>
                    
                  </tr>
                  {
                    employees.length === 0 ?
                    <RowComponent />
                    :
                    employees.filter((emp) => {
                      if(query === "") return true
                      return emp.first_name.toLowerCase().includes(query) || emp.last_name.toLowerCase().includes(query)
                    }).map((employee, index) => {
                      return <RowComponent key={index} id={employee.id} rowNumber={index} name={employee.first_name + " " + employee.last_name} campaign={employee.campaign_name} role={employee.employee_role} employeeNumber={employee.employee_number} goal={employee.goal_name} />
                    })
                  }
        
                </tbody>
            </table>
      </div>
    </>
  )
}


function MyTeam() {
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')
  const {employees} = useSelector((state) => state.employees)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user, isLoggedIn} = useSelector((state) => state.employee)
  const api = new Api()
  useEffect(() => {
    if(!isLoggedIn) navigate('/layout/dashboard')
    const fetchData = async () => {
      setIsLoading(true)
      try{
        const response = await api.getSubordinates(user.id)
        if (response.status === 200){
          dispatch(initializeEmployees(response.data.requestedData))
          
        }
        setIsLoading(false)
      }
      catch (error) {
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
          <form className="w-80 h-full flex justify-center">
            <label htmlFor="query" className="roboto-medium w-44 h-full flex items-center justify-center gap-4">
              Search:
              <input 
              id="query"
              className="w-44 h-10 px-3 outline-mylightgreen-300 border rounded-md border-mygreen-300 outline-offset-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type='text'
              autoComplete="off"
              />
            </label>
             
          </form>
        </div>
        <div className="row-start-3 row-span-9 col-start-2 col-span-10">
          
          {isLoading? 
          <Loading /> :  
          <EmployeesComponent employees={employees} query={query.toLowerCase()} />}
        </div>
        </main>
        :
        <RestrictedAccess />
      }
    </>
  )
}

export default MyTeam
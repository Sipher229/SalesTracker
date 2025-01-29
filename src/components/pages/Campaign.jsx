/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import RestrictedAccess from "../page-compontents/RestrictedAccess"
import Api from "../utils/API-calling-functions/Api"
import Loading from "../utils/Loading"
import { initializeCampaigns } from "../../store/features/campaignSlice"
import { setErrorTickets, updateErrorFlag } from "../../store/features/errorTicketsSlice"

function RowComponent({name='N/A', rowNumber=0,  role='N/A', employeeNumber='N/A', id=-1}) {
  return (
    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
      <td className="w-10 h-8 text-left px-3 roboto-medium text-sm">{rowNumber + 1}</td>
      <td className="w-24 h-8 text-left px-3 roboto-light text-sm underline text-mygreen-500 underline-offset-2 decoration-inherit"> <Link to={`/layout/allemployees/employee/${id}`}>{name} </Link> </td>
      <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">{employeeNumber}</td>
      <td className="w-24 h-8 text-left px-3 roboto-medium text-sm">{role}</td>
                    
    </tr>
  )
}

function EmployeesComponent({employees}) {
  return (
    <>
      <div className="w-full h-full bg-white box-border  rounded-md shadow-xl hover:outline-offset-2 outline-mygreen-500 overflow-y-scroll">
            
            <table className=" w-full ">
                <tbody className="">
                  <tr className="w-full h-9 bg-fadedGrayBg">

                    <td className="w-10 h-8 text-left px-3 roboto-medium">No</td> 
                    <td className="w-24 h-8 text-left px-3 roboto-medium">Name</td> 
                    <td className="w-36 h-8 text-left px-3 roboto-medium">Employee Number</td>
                    <td className="w-24 h-8 text-left px-3 roboto-medium">Role</td>
                    
                  </tr>
                  {
                    employees.length === 0 ?
                    <RowComponent />
                    :
                    employees.map((employee, index) => {
                      return <RowComponent key={index} id={employee.id} rowNumber={index} name={employee.first_name + " " + employee.last_name} role={employee.employee_role} employeeNumber={employee.employee_number}  />
                    })
                  }
        
                </tbody>
            </table>
      </div>
    </>
  )
}


function CampaignComponent({name='N/A', commission='N/A', tax='N/A', hourlySales='N/A', hourlyDecisions ='N/A', entryDate='N/A', id=-1, handleDelete}){
  return (
    <>
      <div className="w-full h-full bg-white box-border py-2 rounded-md shadow-xl outline-mygreen-500 overflow-hidden">
            
            <div className="flex justify-between pr-3 h-auto">
                <h1 id="cardtitle" className="roboto-bold text-xl px-3 text-center">Campaign</h1>
                <div className="w-1/4 h-auto flex justify-end items-center gap-2">
                  <Link className={`text-mygreen-500 underline underline-offset-2 decoration-inherit roboto-medium`} to={`/layout/allcampaigns/campaign/edit/${id}`}>Edit</Link>
                  <button onClick={() => handleDelete()} className={`text-mygreen-500 underline underline-offset-2 decoration-inherit roboto-medium`}>Delete</button>
                </div>

            </div>
            <table className=" w-full ">
                <tbody className="">
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Name</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-bold">{name}</td>
                    </tr>
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Commission</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-bold">{commission}</td>
                    </tr>
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Hourly Goal</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-bold">{hourlySales}</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">hourly Decisions</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-bold">{hourlyDecisions}</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Tax</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-bold">{tax}</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Entry Date</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-bold">{entryDate}</td>
                    </tr>
                    
                </tbody>
            </table>
      </div>
    </>
  )
}

function Campaign() {
  const {campaigns} = useSelector((state) => state.campaigns)
  const [campaign, setCampaign] = useState(null)
  const {id} = useParams()
  const {isLoggedIn, user, subscriptionIsActive} = useSelector((state) => state.employee)
  const navigate = useNavigate()
  const [employees, setemployees] = useState([])
  const [isLoading, setIsLoading] = useState([])
  const dispatch = useDispatch()
  const delay = 800
  const api = new Api()
  const handleDelete = async () =>{
    if(employees.length !== 0) {
      dispatch(setErrorTickets(['Can not delete a campaign with associated employees']))
      dispatch(updateErrorFlag(true))
      return
    }
    // delete
    try{
      const response = await api.deleteCampaign(id)
      if (response.status === 200) {
        dispatch(setErrorTickets([response.data.message]))
        dispatch(updateErrorFlag(false))
        setIsLoading(false)
        setTimeout(() => {
          
          navigate('/layout/allcampaigns')
        }, delay)
      }
      else{
        dispatch(setErrorTickets(['Could Not delete Campaign']))
        dispatch(updateErrorFlag(true))
        setIsLoading(false)
      }

      
    }
    catch (err) {
      dispatch(setErrorTickets([err.message]))
      dispatch(updateErrorFlag(true))
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (campaigns.length === 0){
      const fetchData = async () => {
        try {
          const response = await api.getCampaigns()
          if (response.status === 200){
            dispatch(initializeCampaigns(response.data.requestedData))
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
    if(!isLoggedIn) navigate('/layout/dashboard');
    
    if (!subscriptionIsActive) navigate('/layout/subscription-not-active');
    if(id && id > 0){
      const cmpn = campaigns.find((c) => c.campaign_id == id)
      setCampaign(cmpn)   
    }
    const fetchData = async () => {
      setIsLoading(true)
      try{
        const response = await api.getEmployeesPerCampaign(id)
        if (response.status === 200){
          setemployees(response.data.requestedData)
          setIsLoading(false)
        }
  
      // eslint-disable-next-line no-unused-vars
      }catch(err){
        setIsLoading(false)
      }

    }
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaigns])

  return (
    <>
      { user.role === 'manager'?
        <main className="flex flex-col w-full h-full justify-start items-center gap-3 p-6 bg-fadedGrayBg overflow-y-scroll">

        <div className="w-4/6 h-[17rem]">
         { campaign? 
         <CampaignComponent 
         name={campaign.campaign_name} 
         hourlySales={campaign.hourly_sales} 
         hourlyDecisions={campaign.hourly_decisions} 
         entryDate={campaign.entry_date.split('T')[0]} 
         tax={campaign.tax} 
         commission={campaign.commission} id={id} 
         handleDelete={handleDelete}
         />

         :
        <CampaignComponent /> }

        </div>
        <div className="w-full h-auto pl-20 mb-5">

          <h1 className="roboto-bold text-xl text-left w-full my-3">Associated Employees</h1>
          <div className="w-11/12 h-[16rem]">
            {isLoading ? <Loading /> : <EmployeesComponent employees={employees} />}

          </div>
        </div>
        </main>
        :
        <RestrictedAccess />
      }
    </>
  )
}

export default Campaign


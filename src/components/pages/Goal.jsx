/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import Api from "../utils/API-calling-functions/Api"
import Loading from "../utils/Loading"
import { setErrorTickets, updateErrorFlag } from "../../store/features/errorTicketsSlice"

function RowComponent({name='N/A', rowNumber=0, commission='N/A', tax='N/A', id=-1}) {
  return (
    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
      <td className="w-24 h-8 text-left px-3 roboto-bold">{rowNumber + 1}</td>
      <td className="w-24 h-8 text-left px-3 roboto-light text-sm underline text-mygreen-500 underline-offset-2 decoration-inherit"> <Link to={`/layout/allcampaigns/campaign/${id}`}>{name} </Link> </td>
      <td className="w-24 h-8 text-left px-3 roboto-bold">{commission}</td>
      <td className="w-24 h-8 text-left px-3 roboto-bold">{tax}</td>
                    
    </tr>
  )
}

function CampaignComponent({campaigns}) {
  return (
    <>
      <div className="w-full h-full bg-white box-border  rounded-md shadow-xl hover:outline-offset-2 outline-mygreen-500 overflow-y-scroll relative">
            
            <table className=" w-full relative">
                <thead className="relative">
                  <tr className="w-full h-9 sticky">

                    <th className="w-24 h-8 text-left px-3 roboto-medium text-sm">No</th> 
                    <th className="w-24 h-8 text-left px-3 roboto-medium text-sm">Name</th> 
                    <th className="w-24 h-8 text-left px-3 roboto-medium text-sm">Commission</th>
                    <th className="w-24 h-8 text-left px-3 roboto-medium text-sm">Tax</th>

                  </tr>

                </thead>
                <tbody className="relative">
                  
                  {
                    campaigns.length === 0 ?
                    <RowComponent />
                    :
                    campaigns.map((campaign, index) => {
                      return <RowComponent key={index} id={campaign.id} rowNumber={index} name={campaign.name} commission={campaign.commission} tax={campaign.tax} />
                    })
                  }
        
                </tbody>
            </table>
      </div>
    </>
  )
}


function GoalComponent({name = 'N/A', hourlySales = 'N/A', hourlyDecisions = 'N/A', entryDate = 'N/A', id=-1, handleDelete}) {
  
  
  return (
    <>
      <div className="w-full h-full bg-white box-border py-2 rounded-md shadow-xl outline-mygreen-500 overflow-hidden">
            
            <div className="flex justify-between pr-3 h-auto">
                <h1 id="cardtitle" className="roboto-bold text-xl px-3 text-center">Goal</h1>
                <div className="w-1/4 h-auto flex justify-end items-center gap-2">
                  <Link className={`text-mygreen-500 underline underline-offset-2 decoration-inherit active:underline-none roboto-medium`} to={`/layout/allgoals/goal/edit/${id}`}>Edit</Link>
                  <button onClick={() => handleDelete()} className={`text-mygreen-500 underline underline-offset-2 decoration-inherit roboto-medium`}>Delete</button>
                </div>
            </div>
            <table className=" w-full ">
                <tbody className="">
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Name</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium">{name}</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Sales Hourly</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{hourlySales}</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Decisions Hourly</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{hourlyDecisions} </td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Entry Date</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{entryDate}</td>
                    </tr>
                    
                </tbody>
            </table>
      </div>
    </>
  )
}

function Goal() {
  const navigate = useNavigate()
  const {id} = useParams()
  const {goals} = useSelector((state) => state.goals)
  const [goal, setGoal] = useState(null)
  const {isLoggedIn} = useSelector((state) => state.employee)
  const [campaigns, setcampaigns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const api = new Api()
  const delay = 800
  const handleDelete = async () =>{
    if(campaigns.length !== 0) {
      dispatch(setErrorTickets(['Can not delete a goal with associated campaigns']))
      dispatch(updateErrorFlag(true))
      return
    }
    // delete
    try{
      const response = await api.deleteGoal(id)
      if (response.status === 200) {
        dispatch(setErrorTickets([response.data.message]))
        dispatch(updateErrorFlag(false))
        setIsLoading(false)
        setTimeout(() => {
          
          navigate('/layout/allgoals')
        }, delay)
      }
      else{
        dispatch(setErrorTickets(['Could Not delete Goal']))
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
    if (!isLoggedIn) {
      navigate('/layout/dashboard')
    }
    if (id) {
      const gl = goals.find((goal) => goal.id == id)
      setGoal(gl)
    }
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await api.getCampaignsPerGoal(id)
        if(response.status ===200) {
          setcampaigns(response.data.requestedData)
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
  return (
    <>
      
      <main className={`flex flex-col w-full h-full justify-start items-center p-6 gap-3 bg-fadedGrayBg`}>
        <div className="w-4/6 h-[14rem]">
          {goal ? <GoalComponent handleDelete={handleDelete} name={goal.name} entryDate={goal.entry_date?.split('T')[0]} hourlyDecisions={goal.hourly_decisions} hourlySales={goal.hourly_sales} id={id} /> : <GoalComponent />}

          

        </div>
        <div className="w-full h-auto pl-20 mb-5">
          <h1 className="roboto-bold text-xl w-full text-left">Associated Campaigns</h1>
          <div className="w-11/12 h-[17rem]">
            {isLoading ? <Loading /> :<CampaignComponent campaigns={campaigns} />}
          </div>
        </div>
      </main>
    </>
  )
}

export default Goal
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Api from "../utils/API-calling-functions/Api"
import { initializeCampaigns } from "../../store/features/campaignSlice"
import Loading from "../utils/Loading"
import RestrictedAccess from "../page-compontents/RestrictedAccess"

function RowComponent({name='N/A', rowNumber=0,  hourlyGoal='N/A', commission='N/A', tax='N/A', hourlyDecisions='N/A', id=-1}) {
  return (
    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
      <td className="w-24 h-8 text-left px-3 roboto-bold">{rowNumber + 1}</td>
      <td className="w-24 h-8 text-left px-3 roboto-light text-sm underline text-mygreen-500 underline-offset-2 decoration-inherit"> <Link to={`/layout/allcampaigns/campaign/${id}`}>{name} </Link> </td>
      <td className="w-24 h-8 text-left px-3 roboto-bold">{commission}</td>
      <td className="w-24 h-8 text-left px-3 roboto-bold">{tax}</td>
      <td className="w-24 h-8 text-left px-3 roboto-bold">{hourlyGoal}</td>
      <td className="w-24 h-8 text-left px-3 roboto-bold">{hourlyDecisions}</td>
                    
    </tr>
  )
}

function CampaignComponent({campaigns, query}) {
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
                    <th className="w-24 h-8 text-left px-3 roboto-medium text-sm">Hourly Goal</th>
                    <th className="w-24 h-8 text-left px-3 roboto-medium text-sm">Hourly Decisions</th>

                  </tr>

                </thead>
                <tbody className="relative">
                  
                  {
                    campaigns.length === 0 ?
                    <RowComponent />
                    :
                    campaigns.filter((campaign) => {
                      if (query === "") return true
                      return campaign.campaign_name.toLowerCase().includes(query.toLowerCase())
                    }).map((campaign, index) => {
                      return <RowComponent key={index} id={campaign.campaign_id} rowNumber={index} name={campaign.campaign_name} commission={campaign.commission} tax={campaign.tax} hourlyDecisions={campaign.hourly_decisions} hourlyGoal={campaign.hourly_sales} />
                    })
                  }
        
                </tbody>
            </table>
      </div>
    </>
  )
}

function Campaigns() {
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')
  const {campaigns} = useSelector((state) => state.campaigns)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isLoggedIn, user} = useSelector((state) => state.employee)
  const api = new Api()
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/layout/dashboard')
    }
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await api.getCampaigns()

        if(response.status === 200){
          dispatch(initializeCampaigns(response.data.requestedData))
          
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
    { user.role === 'manager' ?
      <main className="grid w-full h-full grid-cols-12 grid-rows-12 gap-3 bg-fadedGrayBg">
        <div className="w-full h-full mt-3 flex justify-between items-center col-start-2 col-span-10 row-start-1 row-span-1">
          <h1 className="roboto-bold text-2xl p-1 text-left">All Campaigns</h1>
          <form className="w-80 h-full flex justify-center">
            <label htmlFor="query" className="roboto-medium w-44 h-full flex items-center justify-center gap-4">
              Search:
              <input 
              id="query"
              className="w-44 h-full px-3 outline-mylightgreen-300 border rounded-md border-mygreen-300 outline-offset-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type='text'
              autoComplete="off"
              />
            </label>
              
          </form>
        </div>
        <div className="row-start-3 row-span-9 col-start-2 col-span-10">
          {isLoading? <Loading /> : <CampaignComponent campaigns={campaigns} query={query} />}

        </div>
      </main>
      : 
      <RestrictedAccess />
    }
      
    </>
  )
}

export default Campaigns
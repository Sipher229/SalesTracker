/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"


function CampaignComponent({name='N/A', commission='N/A', tax='N/A', hourlySales='N/A', hourlyDecisions ='N/A', entryDate='N/A', id=-1}){
  return (
    <>
      <div className="w-full h-full bg-white box-border py-2 rounded-md shadow-xl outline-mygreen-500 overflow-hidden">
            
            <div className="flex justify-between pr-3 h-auto">
                <h1 id="cardtitle" className="roboto-bold text-xl px-3 text-center">Campaign</h1>
                <div className="w-1/4 h-auto flex justify-end items-center gap-2">
                  <Link className={`text-mygreen-500 underline underline-offset-2 decoration-inherit roboto-medium`} to={`/layout/allcampaigns/campaign/edit/${id}`}>Edit</Link>
                  <button className={`text-mygreen-500 underline underline-offset-2 decoration-inherit roboto-medium`}>Delete</button>
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
  const {isLoggedIn} = useSelector((state) => state.employee)
  const navigate = useNavigate()

  useEffect(() => {
    if(!isLoggedIn) navigate('/layout/dashboard')
    console.log(id)
    if(id && id > 0){
      const cmpn = campaigns.find((c) => c.campaign_id == id)
      setCampaign(cmpn)
      console.log(cmpn)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <main className="grid w-full h-full grid-cols-12 grid-rows-12 gap-3 bg-fadedGrayBg">

        <div className="row-start-2 row-span-6 col-start-3 col-end-11">
         { campaign? <CampaignComponent name={campaign.campaign_name} hourlySales={campaign.hourly_sales} hourlyDecisions={campaign.hourly_decisions} entryDate={campaign.entry_date.split('T')[0]} tax={campaign.tax} commission={campaign.commission} id={id} /> : <CampaignComponent /> }

        </div>
      </main>
    </>
  )
}

export default Campaign


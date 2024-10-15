/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

function RowComponent({name='Grub-upselling-12', dailyTeamGoal=355, hourlyGoal=3, commission=12, tax=13}) {
  return (
    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">

      <Link to={'/layout/allcampaigns/campaign'}><td className="w-[30rem] h-full text-left px-3 roboto-light text-sm underline text-mygreen-500 underline-offset-2 decoration-inherit">{name}</td></Link> 
      <td className="w-[30rem] h-full text-left px-3 roboto-bold">{commission}</td>
      <td className="w-[30rem] h-full text-left px-3 roboto-bold">{tax}</td>
      <td className="w-[30rem] h-full text-left px-3 roboto-bold">{dailyTeamGoal}</td>
      <td className="w-[30rem] h-full text-left px-3 roboto-bold">{hourlyGoal}</td>
                    
    </tr>
  )
}

function CampaignComponent() {
  return (
    <>
      <div className="w-full h-full bg-white box-border  rounded-md shadow-xl hover:outline-offset-2 outline-mygreen-500 overflow-hidden">
            
            <table className=" w-full ">
                <tbody className="">
                  <tr className="w-full h-9 bg-fadedGrayBg">

                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Name</td> 
                    <td className="w-[30rem] h-full text-left px-3 roboto-bold">Commission</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-bold">Tax</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-bold">Daily Team Goal</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-bold">Hourly Goal</td>
                    
                  </tr>
                  <RowComponent /> 
                  <RowComponent name="Quebec Tune up" commission={12} tax={13} dailyTeamGoal={140} hourlyGoal={1}/> 
          
                
                    
                </tbody>
            </table>
      </div>
    </>
  )
}

function Campaigns() {
  return (
    <>
      <main className="grid w-full h-full grid-cols-12 grid-rows-12 gap-3 bg-fadedGrayBg">
        <h1 className="roboto-bold text-2xl p-1 text-left col-start-2 col-span-10 row-start-1 row-span-2">All Campaigns</h1>
        <div className="row-start-2 row-end-12 col-start-2 col-span-10">
          <CampaignComponent />

        </div>
      </main>
      
    </>
  )
}

export default Campaigns
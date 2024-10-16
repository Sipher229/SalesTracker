/* eslint-disable react/prop-types */


import { Link } from "react-router-dom"
function RowComponent({name="3sAnd7s", campaign='FAES/FAE+TDR', salesHourly=3, decisionsHourly=7}) {
  return (
    <>
      <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">

        <Link to={'/layout/allgoals/goal'}><td className="w-[30rem] h-full text-left px-3 roboto-light text-sm underline text-mygreen-500 underline-offset-2 decoration-inherit">{name}</td></Link> 
        <td className="w-[30rem] h-full text-left px-3 roboto-bold text-sm">{campaign}</td>
        <td className="w-[30rem] h-full text-left px-3 roboto-bold text-sm">{salesHourly}</td>
        <td className="w-[30rem] h-full text-left px-3 roboto-bold text-sm">{decisionsHourly}</td>
                      
      </tr>
    </>
  )
}



function GoalsComponent() {
  return (
    <>
      <div className="w-full h-full bg-white box-border  rounded-md shadow-xl hover:outline-offset-2 outline-mygreen-500 overflow-hidden">
            
            <table className=" w-full ">
                <tbody className="">
                  <tr className="w-full h-9 bg-fadedGrayBg">

                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Name</td> 
                    <td className="w-[30rem] h-full text-left px-3 roboto-light">Campaign</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-light">Sales Hourly</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-light">Decisios Hourly</td>
                
                  </tr>
                  <RowComponent /> 
                  <RowComponent name="goal-sixDecisions-atmost"  decisionsHourly={6} salesHourly={3} campaign="FAES/FAE+TDR"/> 
                </tbody>
            </table>
      </div>
    </>
  )
}

function Goals() {
  return (
    <>
      <main className="grid w-full h-full grid-cols-12 grid-rows-12 gap-3 bg-fadedGrayBg">
      <h1 className="roboto-bold text-2xl p-1 text-left col-start-2 col-span-10 row-start-1 row-span-2">All Goals</h1>
        <div className="row-start-2 row-span-10 col-start-2 col-span-10">
          <GoalsComponent />

        </div>
      </main>
    </>
  )
}

export default Goals
/* eslint-disable react/prop-types */


function GoalCard({hourlySales= 'N/A', hourlyDecisions = 'N/A', campaignName = "N/A"}) {
    return (
      <>
            <div className="w-full h-full bg-white box-border py-2 rounded-md shadow-xl hover:outline-offset-2 outline-mygreen-500 overflow-hidden">
            
                <div className="flex justify-between pr-3 h-auto">
                    <h1 id="cardtitle" className="roboto-bold text-xl px-3 text-center">My Goal</h1>

                </div>
                <table className=" w-full ">
                    <tbody className="">
                        <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                        <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Sales per hour</td>
                        <td className="w-[30rem] h-full text-left px-3 roboto-bold">{hourlySales || 'N/A'}</td>
                        </tr>
                        <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                        <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Decisions per hour</td>
                        <td className="w-[30rem] h-full text-left px-3 roboto-bold">{hourlyDecisions || 'N/A'}</td>
                        </tr>
                        <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                        <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Campaign</td>
                        <td className="w-[30rem] h-full text-left px-3 roboto-bold">{ campaignName || 'N/A'}</td>
                        </tr>
                        
                    </tbody>
                </table>
          </div>
      </>
    )
  }
  
  export default GoalCard
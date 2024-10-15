

function GoalCard() {
    return (
      <>
            <div className="w-full h-full bg-white box-border py-2 rounded-md shadow-xl hover:outline-offset-2 outline-mygreen-500 overflow-hidden">
            
                <div className="flex justify-between pr-3 h-auto">
                    <h1 id="cardtitle" className="roboto-bold text-xl px-3 text-center">Today{"'"}s Goal</h1>

                </div>
                <table className=" w-full ">
                    <tbody className="">
                        <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                        <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Sales/hr</td>
                        <td className="w-[30rem] h-full text-left px-3 roboto-bold">3</td>
                        </tr>
                        <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                        <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Decisions/hr</td>
                        <td className="w-[30rem] h-full text-left px-3 roboto-bold">7</td>
                        </tr>
                        <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                        <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Daily Goal</td>
                        <td className="w-[30rem] h-full text-left px-3 roboto-bold">18</td>
                        </tr>
                        
                    </tbody>
                </table>
          </div>
      </>
    )
  }
  
  export default GoalCard
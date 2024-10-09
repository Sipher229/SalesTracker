
function GoalCard() {
    return (
      <>
          <div className="w-full h-full bg-white p-2 box-border rounded-md shadow-xl active:scale-95 hover:outline hover:outline-offset-2 hover:outline-mygreen-500 outline-mygreen-500 hover:cursor-pointer">
              <h1 id="cardtitle" className="roboto-bold text-xl px-3 text-center">Today{"'"}s Goal</h1>
              <table className=" w-full">
                <tr className="w-full h-20">
                  <td className="w-[30rem] h-full text-center roboto-light text-sm">Sales/hr</td>
                  <td className="w-[30rem] h-full text-center roboto-light text-sm">Decisions/hr</td>
                  <td className="w-[30rem] h-full text-center roboto-light text-sm">Daily Goal</td>
                </tr>
                <tr className="w-full ">
                  <td className="w-[30rem] h-full text-center roboto-bold text-2xl">3</td>
                  <td className="w-[30rem] h-full text-center roboto-bold text-2xl">7</td>
                  <td className="w-[30rem] h-full text-center roboto-bold text-2xl">18</td>
                </tr>
              </table>
          </div>
      </>
    )
  }
  
  export default GoalCard
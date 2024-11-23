/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
function GoalComponent({name = 'N/A', hourlySales = 'N/A', hourlyDecisions = 'N/A', entryDate = 'N/A', id=-1}) {
  
  return (
    <>
      <div className="w-full h-full bg-white box-border py-2 rounded-md shadow-xl outline-mygreen-500 overflow-hidden">
            
            <div className="flex justify-between pr-3 h-auto">
                <h1 id="cardtitle" className="roboto-bold text-xl px-3 text-center">Goal</h1>
                <div className="w-1/4 h-auto flex justify-end items-center gap-2">
                  <Link className={`text-mygreen-500 underline underline-offset-2 decoration-inherit active:underline-none roboto-medium`} to={`/layout/allgoals/goal/edit/${id}`}>Edit</Link>
                  <button className={`text-mygreen-500 underline underline-offset-2 decoration-inherit active:underline-none roboto-medium`}>Delete</button>
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

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/layout/dashboard')
    }
    if (id) {
      const gl = goals.find((goal) => goal.id == id)
      setGoal(gl)
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <main className="grid w-full h-full grid-cols-12 grid-rows-12 gap-3 bg-fadedGrayBg">

        <div className="row-start-2 row-span-5 col-start-3 col-end-11">
          {goal ? <GoalComponent name={goal.name} entryDate={goal.entry_date.split('T')[0]} hourlyDecisions={goal.hourly_decisions} hourlySales={goal.hourly_sales} id={id} /> : <GoalComponent />}

        </div>
      </main>
    </>
  )
}

export default Goal
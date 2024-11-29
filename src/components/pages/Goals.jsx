/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom"
import Api from "../utils/API-calling-functions/Api"
import { useEffect, useState } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {initializeGoals} from '../../store/features/goalSlice'
import Loading from "../utils/Loading"
import RestrictedAccess from "../page-compontents/RestrictedAccess"


function RowComponent({name="N/A", id=-1, rowNumber=0, salesHourly='N/A', decisionsHourly='N/A'}) {
  return (
    <>
      <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
        <td className="w-24 h-8 text-left px-3 roboto-bold text-sm">{rowNumber + 1}</td>
        <td className="w-24 h-8 text-left px-3 roboto-light text-sm underline text-mygreen-500 underline-offset-2 decoration-inherit">  <Link to={`/layout/allgoals/goal/${id}`}>{name}</Link></td>
        <td className="w-24 h-8 text-left px-3 roboto-bold text-sm">{salesHourly}</td>
        <td className="w-24 h-8 text-left px-3 roboto-bold text-sm">{decisionsHourly}</td>
                      
      </tr>
    </>
  )
}



function GoalsComponent({goals, query}) {
  return (
    <>
      <div className="w-full h-full bg-white box-border  rounded-md shadow-xl hover:outline-offset-2 outline-mygreen-500 overflow-y-scroll">
            
            <table className=" w-full ">
                <tbody className="">
                  <tr className="w-full h-9 border-b border-gray-200">

                    <td className="w-24 h-8 text-left px-3 roboto-medium">No</td> 
                    <td className="w-24 h-8 text-left px-3 roboto-medium">Name</td> 
                    <td className="w-24 h-8 text-left px-3 roboto-medium">Sales Hourly</td>
                    <td className="w-24 h-8 text-left px-3 roboto-medium">Decisions Hourly</td>
                
                  </tr>
                  {
                    goals.length === 0 ? 
                    <RowComponent />
                    :
                    goals.filter((goal)=> {
                      if (query === "") return true
                      return goal.name.toLowerCase().includes(query.toLowerCase())
                    }).map((goal, index) => {
                      return <RowComponent key={index} id={goal.id} rowNumber={index} name={goal.name}  decisionsHourly={goal.hourly_decisions} salesHourly={goal.hourly_sales} /> 
                    })
                  }
                  
                </tbody>
            </table>
      </div>
    </>
  )
}

function Goals() {
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')
  const {isLoggedIn, user} = useSelector((state) => state.employee)
  const {goals} = useSelector((state) => state.goals)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const api = new Api()

  useEffect(() => {
    if(!isLoggedIn){
      navigate('/layout/dashboard')
    }
    
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const response = await api.getGoals()

        if(response.status === 200) {
          dispatch(initializeGoals(response.data.requestedData))
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
          <h1 className="roboto-bold text-2xl p-1 text-left">All Goals</h1>
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
              placeholder="Type to search"
              />
            </label>
             
          </form>
        </div>
        <div className="row-start-3 row-span-9 col-start-2 col-span-10">
          {isLoading? <Loading />: <GoalsComponent goals={goals} query={query}/>}

        </div>
        </main>:
        <RestrictedAccess />
      }
    </>
  )
}

export default Goals
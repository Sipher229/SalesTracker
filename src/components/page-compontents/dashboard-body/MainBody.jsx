import GoalCard from "./GoalCard"
import ReportCard from "./ReportCard"
import StatsGraph from "./StatsGraph"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Api from "../../utils/API-calling-functions/Api"
import { initializeEmployee, updateIsLoggedIn } from "../../../store/features/employeeSlice"
import { useEffect } from "react"
import WeeklyBillBoard from "./WeeklyBillBoard"


function MainBody() {
    const api = new Api()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, shiftDuration, salesPerHour} = useSelector((state) => state.employee )
    
    

    useEffect( () => {
      const fetchData =  async () => {
        try{
                const response = await api.getEmployee()
                if (response.status === 200){
                    dispatch(initializeEmployee(response.data.requestedData.pop()))
                    dispatch(updateIsLoggedIn(true))
                }
                else{
                    navigate('/')
                    navigate(0)
                }
            }
            // eslint-disable-next-line no-unused-vars
            catch( error ){
                navigate('/')
                navigate(0)
            }
        }
        fetchData()
        

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

  return (
    <>
        <div className="w-full h-full flex flex-col justify-start items-start p-10  bg-fadedGrayBg gap-4 overflow-y-scroll">

            <div className="w-full xl:w-11/12 h-44 flex gap-5">
                <div className="w-1/2 h-44">
                    <GoalCard hourlyDecisions={user.hourlyDecisions} hourlySales={user.hourlySales} campaignName={user.campaignName}/>
                </div>
                <div className="w-1/2 h-44">
                    <ReportCard shiftDuration={shiftDuration} salesPerHour={salesPerHour} loginTime={user.loginTime} />
                </div>

            </div>

            <div className="w-full xl:w-11/12 h-auto mb-3">
                <WeeklyBillBoard />
            </div>
            <div className="w-full xl:w-11/12 h-72 mb-20">
                <StatsGraph />
            </div>

        </div>
    </>
  )
}

export default MainBody

// h-full grid grid-cols-12 bg-fadedGrayBg gap-3 grid-rows-12
// col-start-7 col-end-12 row-start-2 row-span-4
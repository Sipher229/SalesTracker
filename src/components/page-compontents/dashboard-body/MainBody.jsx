import GoalCard from "./GoalCard"
import ReportCard from "./ReportCard"
import StatsGraph from "./StatsGraph"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Api, { apiObject } from "../../utils/API-calling-functions/Api"
import { initializeEmployee, updateIsLoggedIn, updateSubscriptionStatus } from "../../../store/features/employeeSlice"
import { useEffect, useState } from "react"
import WeeklyBillBoard from "./WeeklyBillBoard"

// eslint-disable-next-line react/prop-types
function TrialEndsAt({trialEndsAt}){
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div 
    className={`bg-myyellow w-full shadow-md rounded-md h-12 text-mygreen-500 roboto-regular border border-gray-400 text-center`}
    >
        <p>
            Your free trial ends on {new Date(trialEndsAt).toLocaleDateString(undefined, options)}.  
            <Link to="/layout/company-profile" className="underline underline-offset-1 roboto-medium"> Click here </Link> to upgrade.
        </p>
    </div>
  )
}

function MainBody() {
    const api = new Api()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, shiftDuration, salesPerHour} = useSelector((state) => state.employee )
    const [trialing, setTrialing] = useState(false);
    const [trialEndsAt, setTrialEndsAt] = useState(null);


    useEffect( () => {
      const fetchData =  async () => {
        try{
                const response = await api.getEmployee()
                if (response.status === 200){
                    dispatch(initializeEmployee(response.data.requestedData.pop()))
                    dispatch(updateIsLoggedIn(true));
                    dispatch(updateSubscriptionStatus(response.data.subscriptionIsActive));

                    if(!response.data.subscriptionIsActive){
                        navigate("/layout/subscription-not-active");
                    }
                }
                else{
                    navigate('/login')
                    navigate(0)
                }
            }
            // eslint-disable-next-line no-unused-vars
            catch( error ){
                navigate('/login')
                navigate(0)
            }
        }
        fetchData()
        

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    useEffect(() => {
        const fetchData =  async () => {
        let companyId;
        
        try{
            apiObject.getCompanyId(user.email).then(compId => {
            companyId = compId;
            return apiObject.subscriptionStatus(compId);
            }).then( res => {
            return res.requestedData
            }).then( status => {
            console.log("status", status)
            setTrialing(status.toString() === "trialing");
            if(status.toString() === "trialing"){
                apiObject.getTrialEndsAt(companyId).then(res => {
                    console.log("trialEndsAt", res);
                    setTrialEndsAt(res);
                });

            }
            });

        }
        catch(error){
            console.error(error.message);
        }
        }
        
        const timeoutId = setTimeout(async () => {
        await fetchData();
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [user]);

  return (
    <>
        <div className="w-full h-full flex flex-col justify-start items-start p-10  bg-fadedGrayBg gap-4 overflow-y-scroll">
            { trialing && user.employeeType === "super employee" ? <TrialEndsAt trialEndsAt={trialEndsAt} /> : <></> }
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
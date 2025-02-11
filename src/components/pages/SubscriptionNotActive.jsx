import { useNavigate } from "react-router-dom"
import ClosedLock from "../utils/icons/ClosedLock"
import { useSelector } from "react-redux"
import { useEffect } from "react";

function SubscriptionNotActive() {
    const navigate = useNavigate()
    const {user, isLoggedIn} = useSelector(state => state.employee);

    useEffect(() => {
        if (!isLoggedIn) navigate("/layout/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <main className="w-full h-full flex justify-center items-center bg-fadedGrayBg">
    <div className=" bg-white shadow-md rounded-md w-96 h-64 flex flex-col justify-center items-center p-5 gap-4">
      <ClosedLock />
        <h1 className="w-full h-4 my-2 roboto-bold  text-center text-xl">Invalid Subscription Status</h1>
        {
            user.employeeType !== "super employee" ?
            <p className="w-full h-4/6 roboto-light text-center">Please contact your administrator for more details</p>
            :
            <p className="w-full h-4/6 roboto-light text-center">It seems like your subscription is not up to date. Please {"don't "} hesitate to contact us for more information.</p>
        }
        {
            user.employeeType === "super employee" &&
            <button onClick={()=> navigate("/layout/company-profile")} className="text-mylightgreen-300 underline underline-offset-2 active active:no-underline roboto-medium">Renew</button>
        }
    </div>
  </main>
  )
}

export default SubscriptionNotActive
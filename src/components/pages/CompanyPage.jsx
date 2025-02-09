/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {apiObject} from "../utils/API-calling-functions/Api";
import { setErrorTickets, updateErrorFlag } from "../../store/features/errorTicketsSlice";
import errorMessages from "../utils/errorMessages";
import Loading from "../utils/Loading";
import PopupWindow from "../page-compontents/PopupWindow.jsx";
import RestrictedAccess from "../page-compontents/RestrictedAccess.jsx";


function CompanyComponent({companyName='N/A',subscriptionStatus='N/A', nextBillingDate ='N/A', trialEndsAt='N/A', employeeCount=0, id=-1, handleShowing, popUpShowing=false}){
  const maintenanceFee = 150;
  const feePerEmplyee = 10;
  return (
    <>
      <div className="lg:w-9/12 sm:w-5/6 h-5/6 bg-white py-2 rounded-md shadow-xl overflow-hidden">
            
            <div className="flex justify-between pr-3 h-auto">
                <h1 id="cardtitle" className="roboto-bold text-xl px-3 text-center">{companyName}</h1>
            </div>
            <table className=" w-full h-auto">
                <tbody className="h-auto">
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-80 h-full text-left px-3 roboto-light text-sm">Company Name</td>
                    <td className="w-80 h-full text-left px-3 roboto-regular">{companyName}</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-80 h-full text-left px-3 roboto-light text-sm">Employee Count</td>
                    <td className="w-80 h-full text-left px-3 roboto-regular text-sm">{employeeCount ? employeeCount : "N/A"}</td>
                    </tr>
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-80 h-full text-left px-3 roboto-light text-sm">Subscription Status</td>
                    <td className="w-80 h-full text-left px-3 roboto-regular flex justify-between">
                      <span>{subscriptionStatus}</span>
                        <div className="w-1/4 h-auto flex justify-end items-center gap-2">
                          <Link className={`text-mygreen-500 underline underline-offset-2 decoration-inherit roboto-medium`} to={`/update-subscription/${id}`}>Update</Link>
                          {subscriptionStatus !== "canceled" ? <button onClick={() => handleShowing(true)} disabled={popUpShowing} className={`text-mygreen-500 underline active:no-underline underline-offset-2 decoration-inherit roboto-medium`}>Cancel</button>: ""}
                        </div>
                    </td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-80 h-full text-left px-3 roboto-light text-sm">Trial ends</td>
                      <td className="w-80 h-full text-left px-3 roboto-regular text-sm">{trialEndsAt}</td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-80 h-full text-left px-3 roboto-light text-sm"> Next Billing date</td>
                      <td className="w-80 h-full text-left px-3 roboto-regular text-sm">
                        {nextBillingDate}
                      </td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm"> Monthly Charge</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-regular text-sm">{`CAD ${(employeeCount * feePerEmplyee) + maintenanceFee}`}</td>
                    </tr>
                    
                </tbody>
            </table>
      </div>
    </>
  )
}

function CompanyPage() {
  const [isLoading, setisLoading] = useState(false);
  const [employeeCount, setemployeeCount] = useState(null);
  const [showing, setShowing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, user} = useSelector((state) => state.employee);
  const [company, setcompany] = useState(null);
  const dispatch = useDispatch();
  const message = {
    messageTitle: 'Are you sure?',
    messageBody: 'This action is irreversible.',
    actionName: 'Confirm'
  }
  const handleDelete = async () => {
    try {
      const response = await apiObject.cancelSubscription();

      if (response.status === 200){
        setSubscriptionStatus(response.data.status);
        dispatch(setErrorTickets(["Subcription canceled successfully"]));
        dispatch(updateErrorFlag(false));
      }

    } catch (error) {
      dispatch(setErrorTickets([error.message, "failed to cancel subscription"]));
      dispatch(updateErrorFlag(true));
    }
    setShowing(false);
    return
  }

  useEffect(() => {
    if (!isLoggedIn) return navigate("/layout/dashboard");
    
    const fetchData = async () => {
      setisLoading(true);
      try {
        const response = await apiObject.getCompany();
        if (response.status === 200) {
          
          setcompany(response.data.requestedData[0]);
        }
      } catch (error) {
        dispatch(setErrorTickets([errorMessages.failedFetch, error.message]));
        dispatch(updateErrorFlag(true))
      }
      setisLoading(false);
    }
    fetchData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const employeeCount = (await apiObject.getEmployeeCount()).data.employeeCount;
        setemployeeCount(employeeCount);
      } catch (error) {
        dispatch(setErrorTickets(["could not get employee count", error.message]));
        dispatch(updateErrorFlag(true))
      }
    }
    fetchEmployeeCount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
      user.employeeType === 'super employee' ?
      <>
        <PopupWindow handleConfirmed={handleDelete} handleShowing={setShowing} showing={showing} isLoading={isLoading} messageBody={message.messageBody} messageTitle={message.messageTitle} actionName={message.actionName} />
        <main className={`bg-fadedGrayBg w-screen h-screen flex flex-col justify-normal items-start p-8 ${showing? 'filter brightness-75': ''}`}>
          {
            isLoading ? <Loading /> :
            <CompanyComponent 
              companyName={company?.company_name}
              subscriptionStatus={subscriptionStatus? subscriptionStatus: company?.status}
              trialEndsAt={company?.trial_ends_at.split("T")[0]}
              nextBillingDate={company?.next_billing_date.split("T")[0]}
              employeeCount={employeeCount ? employeeCount: "N/A"}
              id={company?.company_id}
              handleShowing={setShowing}
              popUpShowing={showing}
            />
          }
        </main>
      </>
      :
      <RestrictedAccess />

  )
}

export default CompanyPage
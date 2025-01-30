import { useEffect } from "react"
import JobAidForm from "../../page-compontents/forms/JobAidForm"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import RestrictedAccess from "../../page-compontents/RestrictedAccess"



function AddJobAid() {
    const {isLoggedIn, user, subscriptionIsActive} = useSelector((state) => state.employee)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLoggedIn) navigate('/layout/dashboard');
        
        if (!subscriptionIsActive) navigate("/layout/subscription-not-active");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <>
        
        {
            user.role === 'manager'?
            <main className="grid w-full h-full grid-cols-12 grid-rows-12 gap-3 bg-fadedGrayBg">
              <h1 className="roboto-bold text-2xl p-1 text-center col-start-3 col-end-10 row-start-1 row-span-2">Create/Edit Aid</h1>
              <div className="row-start-2 row-end-12 col-start-3 col-end-10">
                <JobAidForm />

              </div>
            </main>
            :
            <RestrictedAccess />
        }
      
    </>
  )
}

export default AddJobAid
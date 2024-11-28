import { useEffect } from "react"
import JobAidForm from "../../page-compontents/forms/JobAidForm"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"



function AddJobAid() {
    const {isLoggedIn} = useSelector((state) => state.employee)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLoggedIn) navigate('/layout/dashboard')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <>
        <main className="grid w-full h-full grid-cols-12 grid-rows-12 gap-3 bg-fadedGrayBg">
        <h1 className="roboto-bold text-2xl p-1 text-center col-start-3 col-end-10 row-start-1 row-span-2">Create Aid</h1>
        <div className="row-start-2 row-end-12 col-start-3 col-end-10">
          <JobAidForm />

        </div>
        </main>
      
    </>
  )
}

export default AddJobAid
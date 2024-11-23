/* eslint-disable react/prop-types */

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function EmployeeComponent({loginTime='N/A',firstName='N/A', lastName ='N/A', employeeNumber='N/A', employeeRole='N/A', campaign='N/A', salesPerHour ='N/A', email='N/A'}){
    return (
      <>
        <div className="w-full h-full bg-white box-border py-2 rounded-md shadow-xl outline-mygreen-500 overflow-hidden">
              
              <div className="flex justify-between pr-3 h-auto">
                  <h1 id="cardtitle" className="roboto-bold text-xl px-3 text-center">Employee</h1>
              </div>
              <table className=" w-full ">
                  <tbody className="">
                      <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Names</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium">{firstName + " " + lastName}</td>
                      </tr>
                      <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                        <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Campaign</td>
                        <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{campaign}</td>
                      </tr>
                      <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                        <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Employee Number</td>
                        <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{employeeNumber}</td>
                      </tr>
                      <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">employee Role</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{employeeRole}</td>
                      </tr>
                      <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                        <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm"> Email</td>
                        <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{email}</td>
                      </tr>
                      <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                        <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm"> Sales Per Hour</td>
                        <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{salesPerHour}</td>
                      </tr>
                      <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                        <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm"> Logged in at</td>
                        <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">{loginTime}</td>
                      </tr>
                      
                  </tbody>
              </table>
        </div>
      </>
    )
  }

function MyProfile() {
    const {user, isLoggedIn, salesPerHour} = useSelector((state) => state.employee)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isLoggedIn) navigate('/layout/dashboard')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <>
      <main className="flex flex-col justify-start items-center gap-5 w-full h-full bg-fadedGrayBg overflow-y-scroll">
        <div className="grid w-full h-[25rem] grid-cols-12 grid-rows-6">

          <div className="row-start-2 row-span-6 col-start-3 col-span-8">
            
            <EmployeeComponent 
                firstName={user?.firstName}
                lastName={user?.lastName}
                campaign={user?.campaignName || 'N/A'}
                employeeNumber={user?.employeeNumber}
                employeeRole={user?.role}
                loginTime={user?.loginTime?.split('T')[0] + " " + user?.loginTime?.split('T')[1].split('.')[0]}
                salesPerHour={salesPerHour?.toFixed(2)}
                email={user?.email}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default MyProfile
import { Link } from "react-router-dom"
import { getCurrentTime } from "../../../getCurrentTime"
function ReportCard() {
  const shiftStart = getCurrentTime()
  return (
    <>
        <div className="w-full h-full bg-white box-border py-2 rounded-md shadow-xl hover:outline-offset-2 outline-mygreen-500 overflow-hidden">
            
            <div className="flex justify-between pr-3 h-auto">
                <h1 id="cardtitle" className="roboto-bold text-xl px-3 text-center">Shift Details</h1>
            </div>
            <table className=" w-full ">
                <tbody className="">
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Campain</td>
                        <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">Grub Upselling</td>
                      </tr>
                    <tr className="w-full h-9 odd:bg-fadedGrayBg even:bg-white">
                      <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Shift start</td>
                      <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">
                          <span>{shiftStart}</span>
                      </td>
                    </tr>
                    <tr className="w-full h-9  odd:bg-fadedGrayBg even:bg-white">
                    <td className="w-[30rem] h-full text-left px-3 roboto-light text-sm">Shift end</td>
                    <td className="w-[30rem] h-full text-left px-3 roboto-medium text-sm">
                      <div className="flex justify-between roboto-medium text-sm h-auto">
                        <span>5:00:00PM</span>
                        <Link className={`text-mygreen-500 underline underline-offset-2 decoration-inherit roboto-medium`}>Edit</Link>
                      </div>
                    </td>
                    </tr>
                </tbody>
            </table>
      </div>
    </>
  )
}

export default ReportCard


//both the shift start and shift end times should be loaded the from the database
// when the app first loads do the following:
// check if the user has already logged in for the day. 
// if not logged in yet update the shift start date in the database
// else do nothing
// the shift end should be set up by default when an employee is created. however can be edited if
// needed
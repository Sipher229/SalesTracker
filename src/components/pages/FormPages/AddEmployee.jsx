import { useSelector } from "react-redux"
import EmployeeForm from "../../page-compontents/forms/EmployeeForm"
import RestrictedAccess from "../../page-compontents/RestrictedAccess"


function AddEmployee() {
  const {user} = useSelector((state) => state.employee)
  return (
    <>
      { user.role === 'manager' ?
        <main className="grid w-full h-full grid-cols-12 grid-rows-12 gap-3 bg-fadedGrayBg">
        <h1 className="roboto-bold text-2xl p-1 text-center col-start-3 col-end-9 row-start-1 row-span-2">Add/Edit Employee</h1>
        <div className="row-start-2 row-span-10 col-start-3 col-end-10">
          <EmployeeForm />
        </div>
        </main>
        :
        <RestrictedAccess />
      }
    </>
  )
}

export default AddEmployee
import { useSelector } from "react-redux"
import GoalForm from "../../page-compontents/forms/GoalForm"
import RestrictedAccess from "../../page-compontents/RestrictedAccess"


function AddGoal() {
  const {user} = useSelector((state) => state.employee)
  return (
    <>
      { user.role === 'manager' ?
        <main className="grid w-full h-full grid-cols-12 grid-rows-12 gap-3 bg-fadedGrayBg">
        <h1 className="roboto-bold text-2xl p-1 text-center col-start-3 col-end-10 row-start-1 row-span-2">Add/Edit Goal</h1>
        <div className="row-start-2 row-end-12 col-start-3 col-end-10">
          <GoalForm />

        </div>
        </main>
        :
        <RestrictedAccess />
      }
    </>
  )
}

export default AddGoal
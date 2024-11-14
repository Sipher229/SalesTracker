/* eslint-disable react/prop-types */
import CampaignSelect from "./CampaignSelect"
import { useState } from "react"
import SubmitButton from "./SubmitButton"

function EmployeeForm() {
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 1500)

    }
  return (
    <>
        <form className="w-full h-full bg-white rounded-lg grid grid-cols-12 grid-rows-12 shadow-xl gap-2 p-5">
            <label className="flex flex-col row-start-1 row-span-2 col-start-2 col-span-12">
                <span className="roboto-medium">First Name:</span>
                <input 
                type="text" 
                name="firstName" 
                className="px-2 w-full h-4/5  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="first name"
                required
                />

            </label>
            <label className="flex flex-col row-start-3 row-span-2 col-start-2 col-span-12">
                <span className="roboto-medium">Last Name:</span>
                <input 
                type="text" 
                name="lastName" 
                className="px-2 w-full h-4/5  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="last name"
                required
                />
            </label>


            <CampaignSelect campaigns={['No available campaign']} />

            <label className="flex flex-col row-start-5 row-span-2 col-start-8 col-span-12">
                <span className="roboto-medium">Employee Number:</span>
                <input 
                type="text" 
                name="employeeNumber" 
                className="px-2 w-full h-4/5  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="S388"
                required
                />

            </label>
            <label className="flex flex-col row-start-7 row-span-2 col-start-2 col-span-6">
                <span className="roboto-medium">Role:</span>
                <select 
                id="campaigns" 
                className="px-2 w-full h-4/5  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="product+campaign. eg: FAESgrubUpselling"
                >
                    <option className="">Sales Associate</option>
                    <option className="">Manager</option>
                </select>

            </label>
            <label className="flex flex-col row-start-7 row-span-2 col-start-8 col-span-12">
                <span className="roboto-medium">Shift Duration:</span>
                <input 
                type="number" 
                name="username" 
                className="px-2 w-full h-4/5  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="Duration in hours. eg: 8"
                required
                />

            </label>

            <label className="flex flex-col row-start-9 row-span-2 col-start-2 col-span-6">
                <span className="roboto-medium">Email:</span>
                <input 
                type="email" 
                name="username" 
                className="px-2 w-full h-4/5  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="example@gmail.com"
                required
                />

            </label>
            <label className="flex flex-col row-start-9 row-span-2 col-start-8 col-span-12">
                <span className="roboto-medium">Password:</span>
                <input 
                type="password" 
                name="password"
                autoComplete="on"
                className="px-2 w-full h-4/5  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="percentage eg: 10"
                required
                />

            </label>

            <SubmitButton handleSubmit={handleSubmit} isLoading={isLoading} />

        </form>
    </>
  )
}
/* 
need to implement the following: 
create a button component to allow edit and save functionalities.
the button should be able to do the following:
manipulate the state of its corresponding input fied
manage its own state to display save or edit depending on the circumstances
call the relevant save function when clicked
the save functions should be passed as props to the button and declared with usecallback for
optimizaton

*/
export default EmployeeForm
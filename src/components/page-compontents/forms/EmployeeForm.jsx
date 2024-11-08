/* eslint-disable react/prop-types */

function SaveButton({handleClick, rowStart=1}) {
    return (
        <>
            <button
             onClick={handleClick}
             className={`bg-mygreen-700 text-white rounded-md col-start-10 col-end-12 row-start-${rowStart} row-span-2`} >Save</button>
        </>
    )
}

function EditButton({handleClick, rowStart=1}) {
    return (
        <>
            <button
             onClick={handleClick}
             className={`bg-mygreen-700 text-white rounded-md col-start-10 col-end-12 row-start-${rowStart} row-span-2`} >Save</button>
        </>
    )
}

function EmployeeForm() {
    const [showSave, setShowSave] = useState()
    const saveNames = () => {
        //save names to the database
        return
    }
    const saveCampaign = () => {
        //save campaign to the database
        return
    }
    const saveRoleAndEmployeeNumber = () => {
        //save to the database
        return
    }
  return (
    <>
        <form className="w-full h-full bg-white rounded-lg grid grid-cols-12 grid-rows-12 shadow-xl gap-2 p-3">
            <label className="flex flex-col row-start-1 row-span-2 col-start-2 col-end-5">
                <span className="roboto-medium">First Name:</span>
                <input 
                type="text" 
                name="firstName" 
                className="px-2 w-full h-4/5  outline-mygreen-300 border-2 border-gray-200 rounded-md"
                placeholder="first name"
                required
                />

            </label>
            <label className="flex flex-col row-start-1 row-span-2 col-start-6 col-end-9">
                <span className="roboto-medium">Last Name:</span>
                <input 
                type="text" 
                name="lastName" 
                className="px-2 w-full h-4/5  outline-mygreen-300 border-2 border-gray-200 rounded-md"
                placeholder="last name"
                required
                />

            </label>

            <SaveButton rowStart={1} handleClick={saveNames}/>

            <label className="flex flex-col row-start-3 row-span-2 col-start-2 col-end-8">
                <span className="roboto-medium">Campaign:</span>
                <select 
                id="campaigns" 
                className="px-2 w-full h-4/5  outline-mygreen-300 border-2 border-gray-200 rounded-md"
                placeholder="product+campaign. eg: FAESgrubUpselling"
                >
                    <option className="">Grub Upselling</option>
                    <option className="">FAES/ FAE+TDR</option>
                    <option className="">TUNE UP</option>
                </select>

            </label>

            <SaveButton rowStart={3} handleClick={saveCampaign}/>

            <label className="flex flex-col row-start-5 row-span-2 col-start-2 col-end-5">
                <span className="roboto-medium">Employee Number:</span>
                <input 
                type="text" 
                name="employeeNumber" 
                className="px-2 w-full h-4/5  outline-mygreen-300 border-2 border-gray-200 rounded-md"
                placeholder="S388"
                required
                />

            </label>
            <label className="flex flex-col row-start-5 row-span-2 col-start-6 col-end-9">
                <span className="roboto-medium">Role:</span>
                <select 
                id="campaigns" 
                className="px-2 w-full h-4/5  outline-mygreen-300 border-2 border-gray-200 rounded-md"
                placeholder="product+campaign. eg: FAESgrubUpselling"
                >
                    <option className="">Manager</option>
                    <option className="">Sales Associate</option>
                </select>

            </label>

            <SaveButton rowStart={1} handleClick={saveRoleAndEmployeeNumber}/>

            <label className="flex flex-col row-start-7 row-span-2 col-start-2 col-end-5">
                <span className="roboto-medium">Price:</span>
                <input 
                type="Number" 
                name="price" 
                className="px-2 w-full h-4/5  outline-mygreen-300 border-2 border-gray-200 rounded-md"
                placeholder="340.99"
                required
                />

            </label>
            <label className="flex flex-col row-start-7 row-span-2 col-start-6 col-end-10">
                <span className="roboto-medium">Discount:</span>
                <input 
                type="Number" 
                name="discount" 
                className="px-2 w-full h-4/5  outline-mygreen-300 border-2 border-gray-200 rounded-md"
                placeholder="percentage eg: 10"
                required
                />

            </label>

            <label className="flex flex-col row-start-9 row-span-2 col-start-2 col-end-7">
                <span className="roboto-medium">Date:</span>
                <input 
                type="date" 
                name="saleDate" 
                className="px-2 w-full h-4/5  outline-mygreen-300 border-2 border-gray-200 rounded-md"
                required
                />

            </label>

            <button className="row-start-11 row-span-2 h-3/5 col-start-9 col-end-12 bg-mygreen-700 text-white rounded-md active:scale-95"> Submit</button>

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


function GoalForm() {
  return (
    <>
        <form className="w-full h-full bg-white rounded-lg grid grid-cols-12 grid-rows-12 shadow-xl gap-2 p-3">
            <label className="flex flex-col row-start-1 row-span-2 col-start-2 col-end-12">
                <span className="roboto-medium">Goal Name:</span>
                <input 
                type="text" 
                name="goalName" 
                className="px-2 w-full h-4/5  outline-mygreen-300 border-2 border-gray-200 rounded-md"
                placeholder="descriptive name. eg: 3'sAnd7's"
                required
                />

            </label>
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

            <label className="flex flex-col row-start-5 row-span-2 col-start-2 col-end-6">
                <span className="roboto-medium">Sales Hourly:</span>
                <input 
                type="Number" 
                name="salesHourly" 
                className="px-2 w-full h-4/5  outline-mygreen-300 border-2 border-gray-200 rounded-md"
                placeholder="number eg: 3"
                required
                />

            </label>
            <label className="flex flex-col row-start-5 row-span-2 col-start-7 col-end-11">
                <span className="roboto-medium">Decisions Hourly:</span>
                <input 
                type="Number" 
                name="decisionsHourly" 
                className="px-2 w-full h-4/5  outline-mygreen-300 border-2 border-gray-200 rounded-md"
                placeholder="number eg: 7"
                required
                />

            </label>

            <label className="flex flex-col row-start-7 row-span-2 col-start-2 col-end-7">
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

export default GoalForm
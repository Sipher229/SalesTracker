import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setErrorTickets, updateErrorFlag } from "../../../store/features/errorTicketsSlice"
import { useNavigate, useParams } from "react-router-dom"
import SubmitButton from "./SubmitButton"
import Api from "../../utils/API-calling-functions/Api"
import errorMessages from "../../utils/errorMessages"


function GoalForm() {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const {isLoggedIn} = useSelector((state) => state.employee)
    const {goals} = useSelector((state) => state.goals)
    const navigate = useNavigate()
    const {id} = useParams()
    const delay = 900
    const [data, setData] = useState({
        name: '',
        hourlySales: '',
        hourlyDecisions: '',
    })
    const api = new Api()
    const handleChange = (e) => {
        const {value, name} = e.target
        switch (name) {
            case 'name':
                setData((prev) => {
                    return {...prev, [name]: value}
                })
                break;
            case 'hourlySales':
                setData((prev) => {
                    return {...prev, [name]: value}
                })
                break;
            case 'hourlyDecisions':
                setData((prev) => {
                    return {...prev, [name]: value}
                })
                break;
        
            default:
                break;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await api.addGoal(data)
            if (response.status === 200){
                dispatch(setErrorTickets([errorMessages.addingSuccessFul]))
                dispatch(updateErrorFlag(false))
                setData({
                    name: '',
                    hourlySales: '',
                    hourlyDecisions: '',
                })
            }
            else{
                dispatch(setErrorTickets([errorMessages.failedAddition]))
                dispatch(updateErrorFlag(true))
                
            }
            setIsLoading(false)
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            dispatch(setErrorTickets([errorMessages.failedAddition]))
            dispatch(updateErrorFlag(false))
            setIsLoading(false)
        }

    }
    const handleEdit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await api.editGoal(data, id)
            if (response.status === 200) {
                dispatch(setErrorTickets([errorMessages.editSuccessFul]))
                dispatch(updateErrorFlag(false))
                setTimeout(() => {
                    setIsLoading(false)
                    navigate('/layout/allgoals')
                }, delay)
            }
            else{
                dispatch(setErrorTickets([errorMessages.failedEdit]))
                dispatch(updateErrorFlag(true))
            }
            setIsLoading(false)

        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            dispatch(setErrorTickets([errorMessages.failedEdit]))
            dispatch(updateErrorFlag(true))
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!isLoggedIn) navigate('/layout/dashboard')

        if(id && id > 0) {
            
            const gl = goals.find((g) => g.id == id)
            setData({
                name: gl.name,
                hourlyDecisions: gl.hourly_decisions,
                hourlySales: gl.hourly_sales
            })
            console.log(gl)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <>
        <form className="w-full h-full bg-white rounded-lg grid grid-cols-12 grid-rows-12 shadow-xl gap-2 p-3">
            <label className="flex flex-col row-start-1 row-span-2 col-start-2 col-end-12">
                <span className="roboto-medium">Goal Name:</span>
                <input 
                type="text" 
                name="name"
                autoComplete="off"
                value={data.name}
                onChange={handleChange}
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="descriptive name. eg: 3'sAnd7's"
                required
                />

            </label>

            <label className="flex flex-col row-start-3 row-span-2 col-start-2 col-span-8">
                <span className="roboto-medium">Sales Hourly:</span>
                <input 
                type="number" 
                name="hourlySales" 
                autoComplete="off"
                value={data.hourlySales}
                onChange={handleChange}
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="number eg: 3"
                required
                />

            </label>
            <label className="flex flex-col row-start-5 row-span-2 col-start-2 col-span-8">
                <span className="roboto-medium">Decisions Hourly:</span>
                <input 
                type="number" 
                value={data.hourlyDecisions}
                onChange={handleChange}
                autoComplete="off"
                name="hourlyDecisions" 
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="number eg: 7"
                required
                />

            </label>

            {id? <SubmitButton handleSubmit={handleEdit} isLoading={isLoading} name={"Save"} /> :<SubmitButton handleSubmit={handleSubmit} isLoading={isLoading} />}

        </form>
    </>
  )
}

export default GoalForm
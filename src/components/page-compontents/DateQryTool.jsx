import { useState } from "react"
import AuthSubmitBtn from "./Authpages-components/AuthSubmitBtn"
import Api from "../utils/API-calling-functions/Api"
import { initializeSales } from "../../store/features/salesSlice"
import { useDispatch } from "react-redux"
import { setErrorTickets, updateErrorFlag } from "../../store/features/errorTicketsSlice"
import errorMessages from "../utils/errorMessages"


// eslint-disable-next-line react/prop-types
function DateQryTool({isLoading, setIsLoading}) {
    const [dt, setDt] = useState('')
    const dispatch = useDispatch()
    const api = new Api()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (dt === '') return
        try{

            const response = await api.getSalesByDate(dt)
            if( response.status === 200){
                dispatch(initializeSales(response.data.requestedData))

            }
            else
            {
                dispatch(setErrorTickets([errorMessages.failedFetch]))
                dispatch(updateErrorFlag(true))
            }
            setIsLoading(false)

        }
        // eslint-disable-next-line no-unused-vars
        catch(err){
            dispatch(setErrorTickets([errorMessages.failedFetch]))
            dispatch(updateErrorFlag(true))
            setIsLoading(false)
    
        }
    }

  return (
    <>
        <form className="w-80 h-full flex justify-center items-center gap-4">
            
            <input 
            className="w-44 h-9 outline-mylightgreen-300 border rounded-md border-mygreen-300 outline-offset-2 p-2 text-center roboto-medium"
            value={dt}
            onChange={(e) => setDt(e.target.value)}
            type='date'
            autoComplete="off"
            />
            
            <AuthSubmitBtn name="Query"  handleSubmit={handleSubmit} isLoading={isLoading} />
        </form>
    </>
  )
}

export default DateQryTool
import { useEffect, useState } from "react"
import SubmitButton from "./SubmitButton"
import { useNavigate, useParams } from "react-router-dom"
import Api from "../../utils/API-calling-functions/Api"
import { setErrorTickets, updateErrorFlag } from "../../../store/features/errorTicketsSlice"
import { useDispatch, useSelector } from "react-redux"
import errorMessages from "../../utils/errorMessages"


function JobAidForm() {
    const [data, setdata] = useState({
        name: '',
        url: '',
    })
    const api = new Api()
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const {id} = useParams()
    const {jobAids} = useSelector((state) => state.jobAids)
    const navigate = useNavigate()
    const delay = 800
    const handleChange = (e) => {
        const {name, value} = e.target
        setdata((prev) => {
            return {...prev, [name]:value}
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await api.addJobAid(data)
            if(response.status === 200) {
                dispatch(setErrorTickets([response.data.message]))
                dispatch(updateErrorFlag(false))
                setdata({
                    name: '',
                    url: '',
                })
            }
            else{
                dispatch(setErrorTickets([response.data.message]))
                dispatch(updateErrorFlag(true))
            }
            setIsLoading(false)
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            dispatch(setErrorTickets([errorMessages.failedAddition]))
            dispatch(updateErrorFlag(true))
            setIsLoading(false)
        }
    }
    const handleEdit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await api.editJobAid(data, id)
            if (response.status === 200) {
                dispatch(setErrorTickets([errorMessages.editSuccessFul]))
                dispatch(updateErrorFlag(false))
                setIsLoading(false)
                setTimeout(()=> {
                    navigate('/layout/alljobaids')
                }, delay)

            }
            else {
                dispatch(setErrorTickets([errorMessages.failedEdit]))
                dispatch(updateErrorFlag(true))
                setIsLoading(false)
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            dispatch(setErrorTickets([errorMessages.failedEdit]))
            dispatch(updateErrorFlag(true))
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(id && id > 0) {
            const jb = jobAids.find((j) => j.id == id)
            setdata({
                name: jb.name || '',
                url: jb.doc_url || ''
            })
        }
        return () => {

            dispatch(setErrorTickets([]))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <>
        <form className="w-full h-full bg-white rounded-lg grid grid-cols-12 grid-rows-12 shadow-xl gap-2 p-3">
            <label className="flex flex-col row-start-1 row-span-2 col-start-2 col-span-12">
                <span className="roboto-medium">Name:</span>
                <input 
                type="text" 
                name="name"
                autoComplete="off"
                value={data.name}
                onChange={handleChange}
                className="px-2 w-full h-4/5  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="descriptive name. eg: 3'sAnd7's"
                required
                />

            </label>

            <label className="flex flex-col row-start-4 row-span-2 col-start-2 col-span-12">
                <span className="roboto-medium">URL:</span>
                <input 
                type="text"
                name="url" 
                autoComplete="off"
                value={data.url}
                onChange={handleChange}
                className="px-2 w-full h-4/5  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="number eg: 3"
                required
                />

            </label>
           

            {id? <SubmitButton handleSubmit={handleEdit} isLoading={isLoading} name={"Save"} /> :<SubmitButton handleSubmit={handleSubmit} isLoading={isLoading} />}

        </form>
    </>
  )
}

export default JobAidForm
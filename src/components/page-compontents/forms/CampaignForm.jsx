
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Api from "../../utils/API-calling-functions/Api"
import { initializeGoals } from "../../../store/features/goalSlice"
import { setErrorTickets, updateErrorFlag } from "../../../store/features/errorTicketsSlice"
import SubmitButton from "./SubmitButton"
import errorMessages from "../../utils/errorMessages"


function CampaignForm() {
    const [data, setData] = useState({
        name: '',
        commission: '',
        tax: '',
        goalId: '',
        goalName: '',
        
    })
    const [isLoading, setIsLoading] = useState(false)
    const {isLoggedIn, subscriptionIsActive} = useSelector((state) => state.employee)
    const {goals} = useSelector((state) => state.goals)
    const {campaigns} = useSelector((state) => state.campaigns)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const api = new Api()
    const {id} = useParams()
    const delay = 900

    const handleChange = (e) => {
        const {name, value} = e.target
        switch (name) {
            case 'name':
                setData((prev) => {
                    return {...prev, [name]: value}
                })
                break;
            case 'commission':
                setData((prev) => {
                    return {...prev, [name]: value}
                })
                break;
            case 'tax':
                setData((prev) => {
                    return {...prev, [name]: value}
                })
                break;

            default:
                break;
        }
    }
    const handleSelect = (e) => {
        const {value} = e.target

        const goal = goals.find((gl) => gl.id == value )
        setData((prev) => {
            return {...prev, goalId: value, goalName: goal.name}
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (goals.length === 0) {
            dispatch(setErrorTickets(['You need to first create one goal before you can create a campaign']))
            dispatch(updateErrorFlag(true))
            setIsLoading(false)
            return
        }
        try {
            const response = await api.addCampaign(data)
            if (response.status === 200) {
                dispatch(setErrorTickets([errorMessages.addingSuccessFul]))
                dispatch(updateErrorFlag(false))
                setData({
                    name: '',
                    commission: '',
                    tax: '',
                    goalId: '',
                    goalName: '',
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
            dispatch(updateErrorFlag(true))
            setIsLoading(false)
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try{
            const response = await api.editCampaign(data, id)
            if( response.status === 200) {
                dispatch(setErrorTickets([errorMessages.editSuccessFul]))
                dispatch(updateErrorFlag(false))
                setTimeout(() => {
                    navigate('/layout/allcampaigns')       
                }, delay);
            }
            else{
                dispatch(setErrorTickets([errorMessages.failedEdit]))
                dispatch(updateErrorFlag(updateErrorFlag(true)))
            }
            setIsLoading(false)
        }
        // eslint-disable-next-line no-unused-vars
        catch (err) {
            dispatch(setErrorTickets([errorMessages.failedEdit]))
            dispatch(updateErrorFlag(updateErrorFlag(true)))
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(!isLoggedIn) navigate('/layout/dashboard');
        if(!subscriptionIsActive) navigate('/layout/subscription-not-active');

        const fetchData = async () => {
            try {
                const response = await api.getGoals()
                if(response.status === 200){
                    dispatch(initializeGoals(response.data.requestedData))

                }
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                dispatch(initializeGoals(['error while fetching goals']))
            }

        }
        fetchData()


        return () => dispatch(setErrorTickets([]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (id){
            const cmpn = campaigns.find((c) => c.campaign_id == id)
            
            setData({
                name: cmpn.campaign_name,
                commission: cmpn.commission,
                tax: cmpn.tax,
                goalId: cmpn.goal_id,
                goalName: cmpn.goal_name,
                id: cmpn.campaign_id,
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <>
        <form className="w-full h-full bg-white rounded-lg grid grid-cols-12 grid-rows-12 shadow-xl gap-2 p-3">
            <label className="flex flex-col row-start-1 row-span-2 col-start-2 col-end-12">
                <span className="roboto-medium">Campain Name:</span>
                <input 
                type="text" 
                name="name" 
                onChange={handleChange}
                value={data.name}
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="A desciptive name. eg: Red Zones (up selling)"
                required
                />

            </label>
            <label className="flex flex-col row-start-3 row-span-2 col-start-2 col-end-12">
                <span className="roboto-medium">Choose a goal:</span>
                <select 
                type="text" 
                name="goal" 
                onChange={handleSelect}
                value={data.goalId}
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                required
                >
                    <option value={id? data.goalId : ''}>{ id ? data.goalName : "Select a goal"}</option>
                    {
                        goals.map((goal, index) => {
                            return <option key={index} value={goal.id}> {goal.name} </option>
                        })
                    }
                </select>

            </label>

            <label className="flex flex-col row-start-5 row-span-2 col-start-2 col-span-8">
                <span className="roboto-medium">Commission:</span>
                <input 
                type="Number" 
                name="commission"
                value={data.commission}
                onChange={handleChange} 
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="percentage eg: 11"
                required
                />

            </label>
            <label className="flex flex-col row-start-7 row-span-2 col-start-2 col-span-8">
                <span className="roboto-medium">Tax:</span>
                <input 
                type="Number" 
                name="tax"
                value={data.tax}
                onChange={handleChange}
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="percentage eg: 7.5"
                required
                />

            </label>

            {id ? <SubmitButton name={'Save'} handleSubmit={handleEdit} isLoading={isLoading} />:<SubmitButton handleSubmit={handleSubmit} isLoading={isLoading} />}

        </form>
    </>
  )
}

export default CampaignForm
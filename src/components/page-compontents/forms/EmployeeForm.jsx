
import { useEffect, useRef, useState } from "react"
import SubmitButton from "./SubmitButton"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Api from "../../utils/API-calling-functions/Api"
import { initializeCampaigns } from "../../../store/features/campaignSlice"
import ShowPasswordCheckBox from "../Authpages-components/ShowPasswordCheckBox"
import toggleShowPassword from "../../utils/toggleShowpassword"
import { setErrorTickets, updateErrorFlag } from "../../../store/features/errorTicketsSlice"
import errorMessages from "../../utils/errorMessages"
import CancelFormButton from "../CancelFormButton"

function EmployeeForm() {
    const [isLoading, setIsLoading] = useState(false)
    const {isLoggedIn, subscriptionIsActive} = useSelector((state) => state.employee)
    const {campaigns} = useSelector((state) => state.campaigns)
    const {employees} = useSelector((state) => state.employees)
    const empPasswordRef = useRef(null)
    const api = new Api()
    const [checked, setChecked] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()
    const delay = 900
    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        employeeRole: '',
        employeeNumber: '',
        shiftDuration: '',
        campaign: '',
        campaignId: '',

    })

    const handleChange = (e) => {
        const {name, value} = e.target
        switch (name) {
            case 'firstName':
                setCredentials((prev) => {
                    return {...prev, [name]: value}
                })  
                break;
            case 'lastName':
                setCredentials((prev) => {
                    return {...prev, [name]: value}
                })  
                break;
            case 'employeeRole':
                setCredentials((prev) => {
                    return {...prev, [name]: value}
                })  
                break;
            case 'employeeNumber':
                setCredentials((prev) => {
                    return {...prev, [name]: value}
                })  
                break;
            case 'username':
                setCredentials((prev) => {
                    return {...prev, [name]: value}
                })  
                break;
            case 'password':
                setCredentials((prev) => {
                    return {...prev, [name]: value}
                })  
                break;
        
            default:
                break;
        }
    }

    const generateRandomPassword = () => {
        const password = Math.random().toString(36).slice(-10)
        setCredentials((prev) => {
            return {...prev, password: password}
        })
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        if(credentials.campaignId === '' || credentials.employeeRole === '') {
            dispatch(setErrorTickets(['Employee\'s role and/or campaign can not be empty']))
            dispatch(updateErrorFlag(true))
            return
        }
        setIsLoading(true)
        try{
            const response = await api.editEmployee(credentials, id)

            if (response.status === 200){
                dispatch(setErrorTickets([errorMessages.editSuccessFul]))
                dispatch(updateErrorFlag(false))
                setTimeout(() => {
                    setIsLoading(false)
                    navigate('/layout/allemployees')
                }, delay)
            }
            else{
                dispatch(setErrorTickets([errorMessages.failedEdit]))
                dispatch(updateErrorFlag(true))
            }
            setIsLoading(false)
        }
        // eslint-disable-next-line no-unused-vars
        catch (err){
            dispatch(setErrorTickets([errorMessages.failedEdit]))
            dispatch(updateErrorFlag(true))
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(credentials.campaignId === '' || credentials.employeeRole === '') {
            dispatch(setErrorTickets(['Employee\'s role and/or campaign can not be empty']))
            dispatch(updateErrorFlag(true))
            return
        }
        setIsLoading(true)
        try{
            const response = await api.addEmployee(credentials)
            if(response.status === 200){
                dispatch(setErrorTickets([errorMessages.employeeAdded]))
                dispatch(updateErrorFlag(false))
                setCredentials({
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: '',
                    employeeRole: '',
                    employeeNumber: '',
                    shiftDuration: '',
                    campaign: '',
                    campaignId: '',
            
                })
                
            }
            else{
                dispatch(setErrorTickets([errorMessages.failedAddition]))
                dispatch(updateErrorFlag(true))
            }
            setIsLoading(false)
        }
        catch (err) {
            dispatch(setErrorTickets([errorMessages.failedAddition, err.message, 'Make sure you filled all fields']))
            dispatch(updateErrorFlag(true))
            setIsLoading(false)
        }

    }

    const handleSelect = (e) => {
        const {value} = e.target
        const campaign = campaigns.find((campaign) => campaign.campaign_id == value)
        console.log(campaigns)
        console.log(value)
        setCredentials((prev) => {
            return {...prev, campaign: value, campaignId: campaign.campaign_id}
        })
    }

    const handleShowPassword = () => {
        setChecked(prev => !prev)
        if ( !checked ) {
          toggleShowPassword(empPasswordRef, 'text')
        }
        else{
      
          toggleShowPassword(empPasswordRef, 'password')
        }
    

    }
    
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/layout/dashboard')
        }
        if (!subscriptionIsActive) navigate("/layout/subscription-not-active")
        const fetchData = async () => {
            if(campaigns.length !== 0 ) return

            try{

                const response = await api.getCampaigns()

                if (response.status === 200) {
                    dispatch(initializeCampaigns(response.data.requestedData))

                }
            }
            // eslint-disable-next-line no-unused-vars
            catch (err) {
                dispatch(initializeCampaigns(['Error fetching campaigns']))
            }
        }
        fetchData()
        return () => dispatch(setErrorTickets([]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(() => {
        if (id && id > 0) {
            const emp = employees.find((em) => em.id == id)
            console.log(emp)
            setCredentials({
                firstName: emp.first_name,
                lastName: emp.last_name,
                username: emp.email,
                password:'',
                employeeRole: emp.employee_role,
                employeeNumber: emp.employee_number,
                campaign: emp.campaign_name,
                campaignId: emp.campaign_id
            })
        }
        else{
            setCredentials({
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                employeeRole: '',
                employeeNumber: '',
                shiftDuration: '',
                campaign: '',
                campaignId: '',
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <>
        <form className="w-full h-full bg-white rounded-lg grid grid-cols-12 grid-rows-12 shadow-xl gap-2 p-5">
            <label className="flex flex-col row-start-1 row-span-2 col-start-2 col-span-12">
                <span className="roboto-medium">First Name:</span>
                <input 
                type="text" 
                name="firstName" 
                value={credentials.firstName}
                onChange={handleChange}
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="first name"
                required
                />

            </label>
            <label className="flex flex-col row-start-3 row-span-2 col-start-2 col-span-12">
                <span className="roboto-medium">Last Name:</span>
                <input 
                type="text" 
                name="lastName" 
                value={credentials.lastName}
                onChange={handleChange}
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="last name"
                required
                />
            </label>


            <label className={`flex flex-col row-start-5 row-span-2 col-start-2 col-span-6`}>
                <span className="roboto-medium">Campaign:</span>
                <select 
                    id="campaign"
                    name="campaign" 
                    className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                    onChange={handleSelect}
                    >
                    <option value={id? credentials.campaignId : ''} className="">{id? credentials.campaign : "Choose a campaign"}</option>
                    {
                        campaigns.map((campaign) => {
                            return <option key={campaign.campaign_id} value={campaign.campaign_id} className="">{campaign.campaign_name}</option>
                        })
                    }
            
                </select>
                   
            </label>

            <label className="flex flex-col row-start-5 row-span-2 col-start-8 col-span-12">
                <span className="roboto-medium">Employee Number:</span>
                <input 
                type="text" 
                name="employeeNumber" 
                value={credentials.employeeNumber}
                onChange={handleChange}
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="S388"
                required
                />

            </label>
            <label className="flex flex-col row-start-7 row-span-2 col-start-2 col-span-6" htmlFor="employeeRole">
                <span className="roboto-medium">Role:</span>
                <select 
                id="employeeRole" 
                name='employeeRole'
                onChange={handleChange}
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="product+campaign. eg: FAESgrubUpselling"
                >
                    <option value={id? credentials.employeeRole: ''}>{id? credentials.employeeRole : "Choose a role"}</option>
                    <option className="" value='sales associate'>Sales Associate</option>
                    <option className="" value='manager'>Manager</option>
                </select>

            </label>

            {   
                id? "" :
                
                <label className="flex flex-col row-start-7 row-span-2 col-start-8 col-span-12">
                <span className="roboto-medium">Password:</span>
                <input 
                ref={empPasswordRef}
                type="password" 
                name="password"
                value={credentials.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder='Temporary Password'
                className="px-2 w-full h-10 bg-white  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                required
                />

                </label>

            }
            {
                id ? "": 
                <div className="row-start-9 row-span-1 col-start-8 col-span-12">
                    <ShowPasswordCheckBox handleShowPassword={handleShowPassword} checked={checked} />
                </div>
            }
            

            <label className="flex flex-col row-start-9 row-span-2 col-start-2 col-span-6">
                <span className="roboto-medium">Email:</span>
                <input 
                type="email" 
                name="username" 
                value={credentials.username}
                autoComplete="off"
                onChange={handleChange}
                className="px-2 w-full h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
                placeholder="example@gmail.com"
                required
                />

            </label>
            <div className="col-start-8 col-span-2 row-start-11">
                {id? <CancelFormButton />: ""}
            </div>
            
            {id ? "" : <button onClick={(e) => {e.preventDefault(); generateRandomPassword()}} className="bg-mygreen-700 active:scale-95 text-white rounded-md w-full h-10 outline-white row-start-11 row-span-2 col-start-9 col-span-2">Auto</button>}

            {id? <SubmitButton name={"Save"} handleSubmit={handleEdit} isLoading={isLoading} /> :<SubmitButton handleSubmit={handleSubmit} isLoading={isLoading} />}

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
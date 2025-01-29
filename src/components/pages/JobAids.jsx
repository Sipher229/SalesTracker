import { Link, useNavigate } from "react-router-dom"
import ArrowOnSquareRight from "../utils/icons/ArrowOnSquareRight"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Api from "../utils/API-calling-functions/Api"
import { setErrorTickets, updateErrorFlag } from "../../store/features/errorTicketsSlice"
import errorMessages from "../utils/errorMessages"
import Loading from "../utils/Loading"
import { initializejobAids } from "../../store/features/jobaidsSlice"
import PopupWindow from "../page-compontents/PopupWindow"


/* eslint-disable react/prop-types */
function JobAid({name ='N/A', url='#', id=-1, handleShowing, showing=false}) {

    
    
    return (
        <div className="bg-white flex flex-col justify-start items-start gap-2 rounded-md h-20 w-4/5 shadow-md p-4">
            <div className="flex justify-between w-full h-auto">
                <h1 className="w-full h-4 text-lg roboto-medium">{name}</h1>
                <div className="w-1/4 h-auto flex justify-end items-center gap-2">
                    <Link className={`text-mygreen-500 underline underline-offset-2 active:no-underline decoration-inherit roboto-medium`} to={`/layout/alljobaids/edit/${id}`}>Edit</Link>
                    <button onClick={() => handleShowing(id)} disabled={showing} className={`text-mygreen-500 underline disabled:cursor-not-allowed active:no-underline underline-offset-2 decoration-inherit roboto-medium`}>Delete</button>
                </div>
            </div>
            <a href={url} target="blank" className="text-mylightgreen-300 underline active:no-underline roboto-medium flex items-center">View <ArrowOnSquareRight /></a>
        </div>
    )
}

function JobAids() {
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const {jobAids} = useSelector((state) => state.jobAids)
    const [toBeDeleted, settoBeDeleted] = useState(-1)
    const [showing, setShowing ] = useState(false)
    const navigate = useNavigate()
    const {isLoggedIn, user, subscriptionIsActive} = useSelector((state) => state.employee)
    const api = new Api()
    const dispatch = useDispatch()
    const message = {
        messageTitle: 'Are you sure?',
        messageBody: 'This action is irreversible.',
        actionName: 'Delete'
    }
    const handleShowing = (id) => {
        setShowing(true)
        settoBeDeleted(id)
    }

    const handleDelete = async () =>{
        // delete
        if (user.role !== 'manager') {
            dispatch(setErrorTickets(['Only supervisors can delete job aids']))
            dispatch(updateErrorFlag(true))
            return
        }
        if (toBeDeleted < 0) return

        try{
          const response = await api.deleteJobAid(toBeDeleted)
          if (response.status === 200) {
            dispatch(setErrorTickets([response.data.message]))
            dispatch(updateErrorFlag(false))
            const res = await api.getJobAids()
            dispatch(initializejobAids(res.data.requestedData))
            settoBeDeleted(-1)
            
          }
          else{
            dispatch(setErrorTickets(['Could not delete aid']))
            dispatch(updateErrorFlag(true))
          }
          setShowing(false)
          setIsLoading(false)
          
        }
        // eslint-disable-next-line no-unused-vars
        catch (err) {
          dispatch(setErrorTickets(['failed to delete aid']))
          dispatch(updateErrorFlag(true))
          setIsLoading(false)
          setShowing(false)
        }
    }

    
    useEffect(()=> {
        if(!isLoggedIn) {
            navigate('/layout/dashboard')
        }
        
        if (!subscriptionIsActive) navigate('/layout/subscription-not-active');
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await api.getJobAids()
                if(response.status ===200){
                    dispatch(initializejobAids(response.data.requestedData))

                }
                setIsLoading(false)
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                dispatch(setErrorTickets([errorMessages.failedFetch]))
                dispatch(updateErrorFlag(true))
                setIsLoading(false)
            }
        }
        fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <>
        <PopupWindow handleConfirmed={handleDelete} handleShowing={setShowing} showing={showing} isLoading={isLoading} messageBody={message.messageBody} messageTitle={message.messageTitle} actionName={message.actionName}/>
        <main className={`h-full w-full flex flex-col justfy-start p-5  items-center bg-fadedGrayBg ${showing? 'filter brightness-75': ''}`}>
            <div className="flex justify-around items-start w-full h-20">
            <h1 className="roboto-bold text-2xl p-1 text-left">Job Aids</h1>
            <form className="w-80 h-full flex justify-center">
                <label htmlFor="query" className="roboto-medium w-44 h-9 flex items-center justify-center gap-4">
                Search:
                <input 
                id="query"
                className="w-44 h-full px-3 outline-mylightgreen-300 border rounded-md border-mygreen-300 outline-offset-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type='text'
                autoComplete="off"
                placeholder="Type to search"
                />
                </label>
                
            </form>
            </div>
            <div className="pt-2 gap-3 w-4/5 h-full flex flex-col justify-start items-start overflow-y-scroll pl-8">

                { isLoading ? <Loading /> :
                    jobAids.filter((aid) => {
                        if(query === "") return true
                        return aid.name.toLowerCase().includes(query.toLowerCase())
                    }).map((aid) => {
                        return <JobAid handleShowing={handleShowing} key={aid.id} name={aid.name} url={aid.doc_url} id={aid.id} showing={showing} />
                    })
                }
            </div>
        </main>
    </>
  )
}

export default JobAids
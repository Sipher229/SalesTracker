import { useState, useRef } from "react"
import LeftSubContainer from "../page-compontents/Authpages-components/LeftSubcontainer"
import errorMessages from "../utils/errorMessages"
import { HEIGHT, WIDTH } from "../utils/authFormContainerSize"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setErrorTickets, updateErrorFlag } from "../../store/features/errorTicketsSlice"
import ErrorDiplayer from "../page-compontents/ErrorDiplayer"
import AuthSubmitBtn from "../page-compontents/Authpages-components/AuthSubmitBtn"
import { updateEmail, updateOtpId } from "../../store/features/otpCredentialsSlice"
import Api from "../utils/API-calling-functions/Api"


function ConfirmEmail() {

  const api = new Api()
  const [credentials, setCredentials] = useState({
    username: '',
  })
  const [isInvalid, setIsInvalid] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const {errorTickets} = useSelector((state) => state.errorTickets)

  const dispatch = useDispatch()
 
  const  emailRef = useRef(null)

  const handleChange = (e) => {
    const {value} =  e.target

    setCredentials((prev) => {
      return {...prev, username: value}
    })
  
  }

  const emptyTickets = () => {
    dispatch(setErrorTickets([]))
  }

  const validateEmailField = () => {
    // const {value} = e.target
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;  
    if(!emailRegex.test(credentials.username)){
      setIsInvalid(true)
      dispatch(setErrorTickets([...errorTickets, errorMessages.invalidEmail]))
      dispatch(updateErrorFlag(true))
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    validateEmailField()

    try{
      const response = await api.confirmEmail(credentials)
      if (response.status === 200) {
        dispatch(updateEmail(credentials.username))
        dispatch(updateOtpId(response.data.otpId))
        navigate('/verifyotp')
        return
      }
      else {
        setIsLoading(false)
        dispatch(setErrorTickets([errorMessages.noSuchEmail]))
        dispatch(updateErrorFlag(true))
        return
      }
    }
    // eslint-disable-next-line no-unused-vars
    catch(error) {
      setIsLoading(false)
      dispatch(setErrorTickets([errorMessages.noSuchEmail]))
      dispatch(updateErrorFlag(true))
      return
    } 

  }
  return (
    <>
      <main className='h-screen w-screen bg-green-landscape-hd bg-no-repeat bg-cover flex flex-col justify-center items-center gap-4'>

        <ErrorDiplayer emptyTickets={emptyTickets} />

        <div id='loginWrapper' className={`w-[${WIDTH}rem] h-[${HEIGHT}rem] overflow-x-hidden flex scrollbar-hide`}>

          <div id='loginSection' className='flex bg-fadedGrayBg h-full min-w-full overflow-hidden rounded-md '>
            <LeftSubContainer />

            <div id='rightSubContainer' className='flex flex-col justify-center items-center py-2 pl-6 gap-3'>

              <h1 className='text-center  roboto-bold text-2xl'>Confirm your Email</h1>
              <p className="text-center roboto-light w-72"> A verification code will be sent to the email address you provide here below.</p>

              <form className='flex flex-col justify-center items-center py-2 pl-6 gap-3'>
        
                <label htmlFor='username' className='flex flex-col roboto-medium'>
                  <span className='after:content-["*"] after:text-red-500'>Email</span>
                  <input 
                  ref={emailRef} 
                  type='email' 
                  id='username' 
                  name='username'
                  className={`h-10 w-72 outline-offset-2 outline-3 ${isInvalid? 'outline outline-red-400': 'outline-mylightgreen-300'} border border-mygreen-300 rounded-md px-2`} 
                  autoComplete='on' 
                  required
                  value={credentials.username}
                  onChange={handleChange}
                  onFocus={() => setIsInvalid(false)}
                  />
                </label>

                <span>Login instead?  <span className='text-mygreen-700'><Link to={'/'} >Login</Link></span></span>

                <AuthSubmitBtn handleSubmit={handleSubmit} name="Send" isLoading={isLoading}/>

              </form>
            </div>
          </div>
          
        </div>
      </main>

    </>
  )
}

export default ConfirmEmail
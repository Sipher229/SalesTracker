import './App.css'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import errorMessages from './components/utils/errorMessages'
import toggleShowPassword from './components/utils/toggleShowpassword'
import ShowPasswordCheckBox from './components/page-compontents/Authpages-components/ShowPasswordCheckBox'
import LeftSubContainer from './components/page-compontents/Authpages-components/LeftSubcontainer'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setErrorTickets, updateErrorFlag } from './store/features/errorTicketsSlice'
import ErrorDiplayer from './components/page-compontents/ErrorDiplayer'
import { updateIsLoggedIn } from './store/features/employeeSlice'
import AuthSubmitBtn from './components/page-compontents/Authpages-components/AuthSubmitBtn'
import Api from './components/utils/API-calling-functions/Api'


function App() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    tz: tz
  })
  const api = new Api()

  const [isLoading, setIsLoading] = useState(false)
  const [checked, setChecked] = useState(false)

  const [isInvalid, setIsInvalid] = useState(false)

  const {errorTickets} = useSelector((state) => state.errorTickets)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const passwordRef = useRef(null)

  const handleChange = (e) => {
    const {name, value} =  e.target

    if( name ==  'username'){
      setCredentials((prev) => {
        return {...prev, username: value}
      })
    }
    else{
      setCredentials((prev)=> {
        return {...prev, password: value}
      })
    }
  }

  const  emailRef = useRef(null)

  const validateEmailField = () => {
    dispatch(setErrorTickets([]))
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;   
    if(!emailRegex.test(credentials.username)){
      setIsInvalid(true)
      dispatch(setErrorTickets([...errorTickets, errorMessages.invalidEmail]))
      dispatch(updateErrorFlag(true))
    }

  }

  const emptyTickets = () => {
    dispatch(setErrorTickets([]))
  }

  const handleShowPassword = () => {
    setChecked(prev => !prev)
    if ( !checked ) {
      toggleShowPassword(passwordRef, 'text')
    }
    else{
  
      toggleShowPassword(passwordRef, 'password')
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    validateEmailField()

    if (errorTickets.length !== 0) {
      return
    }
    
    try {
      const response = await api.logUserIn(credentials)
      if (response.status === 200){
        setIsLoading(false)
        dispatch(updateIsLoggedIn(true))
        
        navigate('/layout/dashboard')
        
      }
      else{
        setIsLoading(false)
        dispatch(setErrorTickets([errorMessages.failedLogin]))
        dispatch(updateErrorFlag(true))
        return
      }
      
    } catch (error) {
      setIsLoading(false)
      emptyTickets()
      dispatch(setErrorTickets([errorMessages.failedLogin, error.message]))
      dispatch(updateErrorFlag(true))
    }
    
  }
  return (
    <>
      <main className='h-screen w-screen bg-green-landscape-hd bg-no-repeat bg-cover flex flex-col justify-center items-center gap-4'>

        <ErrorDiplayer emptyTickets={emptyTickets} />

        <div id='loginWrapper' className={`w-[50rem] h-[26rem] overflow-x-hidden flex scrollbar-hide`}>

          <div id='oldUserLogin' className='flex bg-fadedGrayBg h-full min-w-full overflow-hidden rounded-md '>
            <LeftSubContainer />

            <div id='rightSubContainer' className='flex flex-col justify-center items-center py-2 pl-6 gap-3'>

              <h1 className='text-center  roboto-bold text-2xl'>Login</h1>

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

                <div>
                  <label htmlFor='password' className='flex flex-col roboto-medium'>
                  <span className='after:content-["*"] after:text-red-500'>Password</span>
                    <input
                    ref={passwordRef} 
                    type='password' 
                    id='password'
                    name= 'password' 
                    className='h-10 w-72 outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 roboto-medium rounded-md px-2' 
                    autoComplete='on' 
                    required
                    value={credentials.password}
                    onChange={handleChange}
                    />
                  </label>
                  <ShowPasswordCheckBox checked={checked} handleShowPassword={handleShowPassword} />
                </div>

                <span>Forgot password?  <span className='text-mygreen-700'><Link to={'/confirmemail'} className='hover:underline decoration-inherit underline-offset-2'>Reset</Link></span></span>

                <AuthSubmitBtn isLoading={isLoading} handleSubmit={handleSubmit} />

              </form>
            </div>
          </div>
          
        </div>
      </main>
      
    </>
  )
}
// create a function to update the error tickets if the api response indicate wrong password or email
export default App

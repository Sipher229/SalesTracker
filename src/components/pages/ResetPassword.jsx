import { useRef, useState } from 'react'
import errorMessages from '../utils/errorMessages'
import LeftSubContainer from '../page-compontents/Authpages-components/LeftSubcontainer'
import { HEIGHT, WIDTH } from '../utils/authFormContainerSize'
import ShowPasswordCheckBox from '../page-compontents/Authpages-components/ShowPasswordCheckBox'
import toggleShowPassword from '../utils/toggleShowpassword'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setErrorTickets, updateBgColor } from '../../store/features/errorTicketsSlice'
import ErrorDiplayer from '../page-compontents/ErrorDiplayer'
import AuthSubmitBtn from '../page-compontents/Authpages-components/AuthSubmitBtn'
import Api from '../utils/API-calling-functions/Api'


function ResetPassword() {
  const errorDispayBg = 'bg-red-200'
  const api = new Api()

  const [credentials, setCredentials] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [checked, setChecked] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isInvalid, setIsInvalid] = useState()

  const {errorTickets} = useSelector((state) => state.errorTickets)
  const {otpCredentials} = useSelector((state) => state.otpCredentials)

  const newPasswordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  const handleChange = (e) => {
    const {name, value} =  e.target

    if( name ==  'newPassword'){
      setCredentials((prev) => {
        return {...prev, newPassword: value}
      })
    }
    else{
      setCredentials((prev)=> {
        return {...prev, confirmPassword: value}
      })
    }
  }

  const validatePasswordField = () =>{
    // const {value} = e.target
    const symbolRegex = /[^a-zA-Z0-9\s]/
    const capitalRegex =  /[A-Z]/
    if( !symbolRegex.test(credentials.newPassword)){
      setIsInvalid(true)
      dispatch(setErrorTickets([...errorTickets, errorMessages.lacksSymbol ]))
      dispatch(updateBgColor(errorDispayBg))
    }

    if (!capitalRegex.test(credentials.newPassword)) {
      setIsInvalid(true)
      dispatch(setErrorTickets([...errorTickets, errorMessages.lacksCapLetter ]))
      dispatch(updateBgColor(errorDispayBg))
    }


    if (credentials.newPassword.length <  8){
      setIsInvalid(true)
      dispatch(setErrorTickets([...errorTickets, errorMessages.tooShort ]))
      dispatch(updateBgColor(errorDispayBg))
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    dispatch(setErrorTickets([]))
    validatePasswordField()
    if (errorTickets.length !== 0) {setIsLoading(false)}

    if (credentials.newPassword !== credentials.confirmPassword){
      dispatch(updateBgColor(errorDispayBg))
      dispatch(setErrorTickets([...errorTickets, errorMessages.passwordsNOtSame]))
      setIsLoading(false)
      return
    }
    
    try {
      const response = await api.resetPassword(
        {
          newPassword: credentials.newPassword, 
          username: otpCredentials.email, 
          otpId: otpCredentials.otpId
        }
      )
      if ( response.status === 200){
        setIsLoading(false)
        navigate('/')
  
      }
      else{
        setIsLoading(false)
        dispatch(setErrorTickets([errorMessages.internalServerError]))
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setIsLoading(false)
      dispatch(setErrorTickets([errorMessages.internalServerError]))
    }

  }


  const emptyTickets = () => {
    dispatch(setErrorTickets([]))
  }

  const handleShowPassword = () => {
    setChecked(prev => !prev)
    if ( !checked ) {
      toggleShowPassword(newPasswordRef, 'text')
      toggleShowPassword(confirmPasswordRef, 'text')
    }
    else{
  
      toggleShowPassword(newPasswordRef, 'password')
      toggleShowPassword(confirmPasswordRef, 'password')
    }

  }
  return (
    <>
      <main className='h-screen w-screen bg-green-landscape-hd bg-no-repeat bg-cover flex flex-col justify-center items-center gap-4'>
        <ErrorDiplayer emptyTickets={emptyTickets} />

        <div id='loginWrapper' className={`w-[${WIDTH}rem] h-[${HEIGHT}rem] overflow-x-hidden flex scroll-smooth scrollbar-hide`}>

          <div id='oldUserLogin' className='flex bg-fadedGrayBg h-full min-w-full overflow-hidden rounded-md '>
            <LeftSubContainer />

            <div id='rightSubContainer' className='flex flex-col justify-center items-center py-2 pl-6 gap-3'>

              <h1 className='text-center  roboto-bold text-2xl'>Reset Password</h1>

              <form className='flex flex-col justify-center items-center py-2 pl-6 gap-3'>
          
                <label htmlFor='newPassword' className='flex flex-col roboto-medium'>
                  <span className='after:content-["*"] after:text-red-500'>New Password</span>
                  <input 
                  ref={newPasswordRef} 
                  type='password' 
                  id='newPassword' 
                  autoFocus
                  name='newPassword'
                  className={`h-10 w-72 outline-offset-2 outline-3 ${isInvalid? 'outline outline-red-400': 'outline-mylightgreen-300'} border border-mygreen-300 rounded-md px-2`} 
                  autoComplete='on' 
                  required
                  value={credentials.newPassword}
                  onFocus={isInvalid && setIsInvalid(false)}
                  onChange={handleChange}
                  />
                </label>
                <div>
                  <label htmlFor='confirmPassword' className='flex flex-col roboto-medium'>
                  <span className='after:content-["*"] after:text-red-500'>Confirm Password</span>
                    <input
                    ref={confirmPasswordRef} 
                    type='password'
                    id='confirmPassword'
                    name= 'confirmPassword' 
                    className='h-10 w-72 roboto-light outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md px-2' 
                    autoComplete='on' 
                    required
                    value={credentials.confirmPassword}
                    onChange={handleChange}
                    />
                  </label>
                  <ShowPasswordCheckBox handleShowPassword={handleShowPassword} checked={checked}/>
                </div>
                <span>Login instead?  <span className='text-mygreen-700 hover:underline underline-offset-2'><Link to={'/'} >Login</Link></span></span>

                <AuthSubmitBtn handleSubmit={handleSubmit} name='Reset' isLoading={isLoading} />

              </form>
            </div>
          </div>
          
        </div>
      </main>
      
    </>
  )
}

export default ResetPassword
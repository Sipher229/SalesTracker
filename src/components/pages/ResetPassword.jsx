import { useRef, useState } from 'react'
import errorMessages from '../utils/errorMessages'
import LeftSubContainer from '../page-compontents/Authpages-components/LeftSubcontainer'
import { HEIGHT, WIDTH } from '../utils/authFormContainerSize'
import ShowPasswordCheckBox from '../page-compontents/Authpages-components/ShowPasswordCheckBox'
import toggleShowPassword from '../utils/toggleShowpassword'
import { Link } from 'react-router-dom'
import ErrorDiplayer from '../page-compontents/Authpages-components/ErrorDiplayer'


function ResetPassword() {

  const [credentials, setCredentials] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [checked, setChecked] = useState(false)

  const [errorTickets, SetErrorTickets] = useState([])

  const newPasswordRef = useRef(null)
  const  confirmPasswordRef = useRef(null)

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
      newPasswordRef.current.classList.remove('border-gray-200')
      newPasswordRef.current.classList.add('border-red-300')
      SetErrorTickets((prev) => {
        return [...prev, errorMessages.lacksSymbol ]
      })
    }

    if (!capitalRegex.test(credentials.newPassword)) {
      newPasswordRef.current.classList.remove('border-gray-200')
      newPasswordRef.current.classList.add('border-red-300')
      SetErrorTickets((prev) => {
        return [...prev, errorMessages.lacksCapLetter ]
      })
    }


    if (credentials.newPassword.length <  8){
      newPasswordRef.current.classList.remove('border-gray-200')
      newPasswordRef.current.classList.add('border-red-300')
      SetErrorTickets((prev) => {
        return [...prev, errorMessages.tooShort ]
      })
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    emptyTickets()
    validatePasswordField()
    if (errorTickets.length !== 0) return

    if (credentials.newPassword !== credentials.confirmPassword){
      SetErrorTickets(prev => [...prev, errorMessages.passwordsNOtSame])
    }

  }


  const emptyTickets = () => {
    newPasswordRef.current.classList.add('border-gray-200')
    newPasswordRef.current.classList.remove('border-red-300')
    SetErrorTickets(() => [])
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
        <ErrorDiplayer emptyTickets={emptyTickets} errorTickets={errorTickets} />

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
                  className='h-10 w-72 roboto-light outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md px-2' 
                  autoComplete='on' 
                  required
                  value={credentials.newPassword}
                  
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

                <button type='submit' className='text-white bg-mygreen-700 w-16 h-8 rounded-md' onClick={handleSubmit}>Reset</button>

              </form>
            </div>
          </div>
          
        </div>
      </main>
      
    </>
  )
}

export default ResetPassword
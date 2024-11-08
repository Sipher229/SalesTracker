import { useState, useRef } from "react"
import LeftSubContainer from "../page-compontents/Authpages-components/LeftSubcontainer"
import ErrorDiplayer from "../page-compontents/Authpages-components/ErrorDiplayer"
import errorMessages from "../utils/errorMessages"
import { HEIGHT, WIDTH } from "../utils/authFormContainerSize"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"



function ConfirmEmail() {
  const [credentials, setCredentials] = useState({
    username: '',
  })

  const navigate = useNavigate()

  const [errorTickets, SetErrorTickets] = useState([])

  const  emailRef = useRef(null)

  const handleChange = (e) => {
    const {value} =  e.target

    setCredentials((prev) => {
      return {...prev, username: value}
    })
  
  }

  const emptyTickets = () => {
    emailRef.current.classList.add('border-gray-200')
    emailRef.current.classList.remove('border-red-300')
    SetErrorTickets(() => [])
  }

  const validateEmailField = () => {
    // const {value} = e.target
    emptyTickets()
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;  
    if(!emailRegex.test(credentials.username)){
      emailRef.current.classList.add('border-red-300')
      emailRef.current.classList.remove('border-gray-200')
      SetErrorTickets((prev) => {
        return [...prev, errorMessages.invalidEmail]
      })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/verifyotp')

  }
  return (
    <>
      <main className='h-screen w-screen bg-green-landscape-hd bg-no-repeat bg-cover flex flex-col justify-center items-center gap-4'>
        <ErrorDiplayer emptyTickets={emptyTickets} errorTickets={errorTickets} />

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
                  className='h-10 w-72 outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md px-2' 
                  autoComplete='on' 
                  required
                  value={credentials.username}
                  onBlur={validateEmailField}
                  onChange={handleChange}
                  />
                </label>

                <span>Login instead?  <span className='text-mygreen-700'><Link to={'/'} >Login</Link></span></span>

                <button type='submit' className='text-white bg-mygreen-700 w-16 h-8 rounded-md' onClick={handleSubmit}>Send</button>

              </form>
            </div>
          </div>
          
        </div>
      </main>

    </>
  )
}

export default ConfirmEmail
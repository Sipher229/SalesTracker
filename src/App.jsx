import './App.css'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import errorMessages from './components/utils/errorMessages'
import DeleteIconX from './components/utils/icons/DeleteIconX'

function Logo(){

  return (
    <>
        <span className= {`bg-mygreen-700 size-36 w-40 h-16 flex flex-col justify-center items-center `}>
            <span className={`roboto-bold text-3xl text-center text-myyellow`}>Weed Man</span>
            <span className={`roboto-light text-sm text-center text-white`}>Sales Tracker</span>
        </span>
    </>
  )
}

function LeftSubContainer(){
  return (
    <>
      <div className='h-full w-1/2 grid grid-rows-12 grid-cols-6 items-center box-border'>
        <div className='col-start-2 col-span-6 row-start-2 row-span-3'>
          <Logo />
        </div>
        <ul className='list-disc row-start-4 row-span-12 col-start-3 col-span-6'>
          <li className='roboto-medium mb-4'>Track your sales and commision </li>
          <li className='roboto-medium mb-4'>Track your progress with a detailed report</li>
          <li className='roboto-medium mb-4'>Become a winner</li>
        </ul>
      </div>
    </>
  )
}



function App() {

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const [errorTickets, SetErrorTickets] = useState([])

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
    // const {value} = e.target
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;   
    if(!emailRegex.test(credentials.username)){
      SetErrorTickets((prev) => {
        return [...prev, errorMessages.invalidEmail]
      })
    }
  }

  const emptyTickets = () => {
    passwordRef.current.classList.add('border-gray-200')
    passwordRef.current.classList.remove('border-red-300')
    SetErrorTickets(() => [])
  }
  return (
    <>
      <main className='h-screen w-screen bg-green-landscape-hd bg-no-repeat bg-cover flex flex-col justify-center items-center gap-4'>
        {
          errorTickets.length === 0
          ? ''  
          :
          <div className='w-3/5 h-1/5 bg-red-200 flex flex-col justify-center items-start px-5 pt-1 rounded-md overflow-scroll scrollbar-hide'>
            <div className='flex justify-between w-full'>  
              <h1 className='text-red-700 roboto-bold'>Please correct the following errors</h1>
              <button className='text-red-700 '  onClick={emptyTickets}>
                <DeleteIconX />
              </button>
            </div>
            <ul className='list-disc text-red-700 roboto-medium pl-6'>
              {
                errorTickets.map((ticket, idx)=> {
                  return <li key={idx} className='text-sm'>{ticket}</li>
                })
              }
            </ul>
          </div>
        }

        <div id='loginWrapper' className='w-3/5 h-3/5 overflow-x-hidden flex scroll-smooth scrollbar-hide'>

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
                  className='h-10 w-72 outline-mygreen-100 border-2 border-gray-200 rounded-md px-2' 
                  autoComplete='on' 
                  required
                  value={credentials.username}
                  onBlur={validateEmailField}
                  onChange={handleChange}
                  />
                </label>

                <label htmlFor='password' className='flex flex-col roboto-medium'>
                <span className='after:content-["*"] after:text-red-500'>Password</span>
                  <input
                   ref={passwordRef} 
                   type='password' 
                   id='password'
                   name= 'password' 
                   className='h-10 w-72 outline-mygreen-100 border-2 border-gray-200 rounded-md px-2' 
                   autoComplete='on' 
                   required
                   value={credentials.password}
                   onChange={handleChange}
                   />
                </label>

                <span>Not registered yet?  <span className='text-mygreen-700'><Link to={'/register'} >Register</Link></span></span>

                <button className='text-white bg-mygreen-700 w-16 h-8 rounded-md'>Login</button>

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

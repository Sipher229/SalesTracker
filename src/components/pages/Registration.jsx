import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import errorMessages from '../utils/errorMessages'
import DeleteIconX from '../utils/icons/DeleteIconX'

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

function Registration() {
  const emailRef =  useRef(null)
  const firstNameRef =  useRef(null)
  const empNumberRef =  useRef(null)
  const confirmPRef =  useRef(null)
  const passwordRef =  useRef(null)

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    firstName: '',
    empNumber: '',
    role: '',
    confirmPassword: ''
  })

  const [errorTickets, SetErrorTickets] = useState([])

  const handleChange = (e) => {
    const {value, name} = e.target
    switch (name) {
      case 'role':
        setCredentials((prev) => {
          return {...prev, role: value}
        })
        break;
      case 'firstName':
        setCredentials((prev) => {
          return {...prev, firstName: value}
        })
        break;
      case 'empNumber':
        setCredentials((prev) => {
          return {...prev, empNumber: value}
        })
        break;
      case 'newUserEmail':
        setCredentials((prev) => {
          return {...prev, username: value}
        })
        break;
      case 'newUserPassword':
        setCredentials((prev) => {
          return {...prev, password: value}
        })
        break;
      case 'confirmPassword':
        setCredentials((prev) => {
          return {...prev, confirmPassword: value}
        })
        break;  
      default:
        break;
    }
  }

  const validatePasswordField = () =>{
    // const {value} = e.target
    const symbolRegex = /[^a-zA-Z0-9\s]/
    const capitalRegex =  /[A-Z]/
    if( !symbolRegex.test(credentials.password)){
      passwordRef.current.classList.remove('border-gray-200')
      passwordRef.current.classList.add('border-red-300')
      SetErrorTickets((prev) => {
        return [...prev, errorMessages.lacksSymbol ]
      })
    }



    if (!capitalRegex.test(credentials.password)) {
      passwordRef.current.classList.remove('border-gray-200')
      passwordRef.current.classList.add('border-red-300')
      SetErrorTickets((prev) => {
        return [...prev, errorMessages.lacksCapLetter ]
      })
    }


    if (credentials.password.length <  8){
      passwordRef.current.classList.remove('border-gray-200')
      passwordRef.current.classList.add('border-red-300')
      SetErrorTickets((prev) => {
        return [...prev, errorMessages.tooShort ]
      })
    }

  }
  const validateEmailField = () => {
    // const {value} = e.target
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;   
    if(!emailRegex.test(credentials.username)){
      emailRef.current.classList.remove('border-gray-200')
      emailRef.current.classList.add('border-red-300')
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
  const normalizeBorders = (e) => {
    const {name} = e.target
    switch (name) {
      case 'newUserEmail':
        emailRef.current.classList.remove('border-red-300')
        emailRef.current.classList.add('border-gray-200')
        break;
      case 'newUserPassword':
        passwordRef.current.classList.remove('border-red-300')
        passwordRef.current.classList.add('border-gray-200')
        break;
      case 'confirmPassword':
        confirmPRef.current.classList.remove('border-red-300')
        confirmPRef.current.classList.add('border-gray-200')
        break;
      case 'firstName':
        firstNameRef.current.classList.remove('border-red-300')
        firstNameRef.current.classList.add('border-gray-200')
        break;
    
      default:
        break;
    }
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
                  errorTickets.slice(0, 4).map((ticket, idx)=> {
                    return <li key={idx} className='text-sm'>{ticket}</li>
                  })
                }
              </ul>
            </div>
        }
        <div id="authWrapper" className='w-3/5 h-3/5 overflow-x-hidden flex scroll-smooth scrollbar-hide'>
          
          <div id='newUserStart' className='flex bg-fadedGrayBg h-full min-w-full overflow-hidden rounded-md '>
            <LeftSubContainer />
            <div id='rightSubContainer' className='flex flex-col justify-center items-start py-2 pl-6 gap-6'>

              <h1 className='text-center  roboto-bold text-2xl'>Choose your role</h1>
              
              <label htmlFor='admin' className='roboto-medium flex items-center hover:cursor-pointer'>
                <input

                type='radio' 
                id='admin' 
                name='role' 
                value='manager'
                 className='mx-4 size-4' 
                 required 
                 onChange={handleChange}/>
                Manager
              </label>

              <label htmlFor='regularEmp' className='roboto-medium flex items-center hover:cursor-pointer'>
                <input 
                type='radio' 
                id='regularEmp' 
                name='role' 
                value='Regular Employee' 
                className='mx-4 size-4' 
                required 
                onChange={handleChange}/>
                Sales Assosiate
              </label>
              <span>Login instead? <span className='text-mygreen-700'><Link to={'/'} >Login</Link></span></span>

              <a className='text-white bg-mygreen-700 w-16 h-8 rounded-md flex items-center justify-center ml-auto' href='#newUserSecond'>Next</a>
           

            </div>           
          </div>

          <div id='newUserSecond' className='flex bg-fadedGrayBg h-full min-w-full  rounded-md '>
            <LeftSubContainer />
            <div id='rightSubContainer' className='flex flex-col justify-center items-center py-2 pl-6 gap-3'>

              <h1 className='text-center  roboto-bold text-2xl'>Register</h1>

              <form className='flex flex-col justify-center items-center py-2 pl-6 gap-3'>
                <label htmlFor='firstName' className='flex flex-col roboto-medium'>
                  <span className='after:content-["*"] after:text-red-500'>First Name</span>
                  <input
                    ref={firstNameRef} 
                    type='text' 
                    id='firstName' 
                    name='firstName' 
                    className='h-10 w-72 outline-mygreen-100 border-2 border-gray-200 rounded-md px-2' 
                    autoComplete='on'
                    onChange={handleChange}
                    value={credentials.firstName}
                    onBlur={() => {
                      if (credentials.firstName === ""){
                        firstNameRef.current.classList.remove('border-gray-200')
                        firstNameRef.current.classList.add('border-red-300')
                        SetErrorTickets((prev) => {
                          return [...prev, 'First name can not be empty']
                        })
                      }
                      else{
                        errorTickets.pop()
                      }
                    }}
                    required/>
                </label>

                <label htmlFor='empNumber' className='flex flex-col roboto-medium'>
                  <span className='after:content-["*"] after:text-red-500'>Employee Number</span>
                  <input
                  ref={empNumberRef} 
                  type='text' 
                  id='empNumber' 
                  name='empNumber' 
                  className='h-10 w-72 outline-mygreen-100 border-2 border-gray-200 rounded-md px-2' 
                  autoComplete='on'
                  onChange={handleChange} 
                  />
                </label>

                <span>Login instead? <span className='text-mygreen-700'><Link to={'/'} >Login</Link></span></span>
                <div className='w-full flex justify-end items-center gap-2'>
                  <a className='text-white bg-mygreen-700 w-16 h-8 rounded-md flex items-center justify-center' href='#newUserStart'>Back</a>
                  <a className='text-white bg-mygreen-700 w-16 h-8 rounded-md flex items-center justify-center' href='#newUserThird'>Next</a>
                </div>

              </form>
            </div> 

          </div>

          <div id='newUserThird' className='flex bg-fadedGrayBg h-full min-w-full rounded-md '>
            <LeftSubContainer />
            <div id='rightSubContainer' className='flex flex-col justify-center items-center py-2 pl-6 gap-3'>

                <form className='flex flex-col justify-center items-center py-2 pl-6 gap-1'>
                  <label htmlFor='newUserEmail' className='flex flex-col roboto-medium'>
                    <span className='after:content-["*"] after:text-red-500'>Email</span>
                    <input
                    ref={emailRef}
                    type='text' 
                    id='newUserEmail' 
                    name='newUserEmail' 
                    className='h-10 w-72 outline-mygreen-100 border-2 border-gray-200 rounded-md px-2' 
                    autoComplete='on'
                    value={credentials.username}
                    onChange={handleChange}
                    onBlur={validateEmailField}
                    required/>
                  </label>
                  <label htmlFor='newUserPassword' className='flex flex-col roboto-medium'>
                    <span className='after:content-["*"] after:text-red-500'>Password</span>
                    <input
                    ref={passwordRef} 
                    type='password' 
                    id='newUserPassword' 
                    name='newUserPassword' 
                    className='h-10 w-72 outline-mygreen-100 border-2 border-gray-200 rounded-md px-2' 
                    autoComplete='on'
                    value={credentials.password}
                    onChange={handleChange} 
                    onBlur={validatePasswordField}
                    onFocus={normalizeBorders}
                    required/>
                  </label>

                  <label htmlFor='confirmPassoword' className='flex flex-col roboto-medium'>
                    <span className='after:content-["*"] after:text-red-500'>Confirm Password</span>
                    <input
                    ref={confirmPRef}
                    type='password' 
                    id='confirmPassword' 
                    name='confirmPassword' 
                    className='h-10 w-72 outline-mygreen-100 border-2 border-gray-200 rounded-md px-2' 
                    autoComplete='on'
                    value={credentials.confirmPassword}
                    onFocus={normalizeBorders}
                    onChange={handleChange}
                    onBlur={()=> {
                      if (!credentials.password === credentials.confirmPassword){
                        confirmPRef.current.classList.remove('border-gray-200')
                        confirmPRef.current.classList.add('border-red-300')
                        SetErrorTickets((prev) => {
                          return [...prev, errorMessages.passwordsNOtSame]
                        })
                      }
                    }}
                    required/>
                  </label>
                  <span>Login instead? <span className='text-mygreen-700'><Link to={'/'} >Login</Link></span></span>
                  <div className='w-full flex justify-end items-center gap-2'>
                    <a className='text-white bg-mygreen-700 w-16 h-8 rounded-md flex items-center justify-center' href='#newUserSecond'>Back</a>
                    <button className='text-white bg-mygreen-700 w-20 h-8 rounded-md flex items-center justify-center'>Register</button>
                  </div>

                </form>
              </div>
          </div>
        </div>
      </main>
    </>
  )
}

// TODO: use the validate function  to  validate the  forms before submitting
// TODO: check if it is necessary to validate the empNumber field.
// POTENTIAL SOLUTION: before submiting clear the error tickets, call the validate functions,
// if no error tickets submit else advise user (automatic).

export default Registration
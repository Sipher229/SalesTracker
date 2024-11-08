import {useState, useRef} from 'react'
import ErrorDiplayer from "../page-compontents/Authpages-components/ErrorDiplayer"
import errorMessages from "../utils/errorMessages"
import { Link } from 'react-router-dom'
import LeftSubContainer from "../page-compontents/Authpages-components/LeftSubcontainer"
import { WIDTH, HEIGHT } from "../utils/authFormContainerSize"
import { useNavigate } from 'react-router-dom'


function VerifyOtp() {

    const otpLenth = 6
    const navigate = useNavigate()
    
    const [errorTickets, SetErrorTickets] = useState([])

    const [otp, setOtp ] = useState(new Array(otpLenth).fill(""))



    const  otpRef = useRef(null)

    const handleChange = (element, index) => {
        if (/^[0-9]$/.test(element.value)) {
            const newOtp = [...otp];
            newOtp[index] = element.value;
            setOtp(newOtp);
      
            // Move to next input if not the last
            if (index < otpLenth - 1) {
              element.nextSibling.focus();
            }
        }
    
    }

    const getOtpValue = () => {
        return otp.join("")
    }

    const handleBackspace = (element, index) => {
        const newOtp = [...otp];
        if (element.value === "" && index > 0) {
            newOtp[index - 1] = "";
            setOtp(newOtp);
            element.previousSibling.focus();
        }
        else{
            newOtp[index] = "";
            setOtp(newOtp)
        }
      };

    const emptyTickets = () => {
        otpRef.current.classList.add('border-gray-200')
        otpRef.current.classList.remove('border-red-300')
        SetErrorTickets(() => [])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const userOtp = getOtpValue()
        navigate('/resetpassword')
        

    }

    return (
    <>
        <main className='h-screen w-screen bg-green-landscape-hd bg-no-repeat bg-cover flex flex-col justify-center items-center gap-4'>
        <ErrorDiplayer emptyTickets={emptyTickets} errorTickets={errorTickets} />

        <div id='loginWrapper' className={`w-[${WIDTH}rem] h-[${HEIGHT}rem] overflow-x-hidden flex scrollbar-hide`}>

          <div id='loginSection' className='flex bg-fadedGrayBg h-full min-w-full overflow-hidden rounded-md '>
            <LeftSubContainer />

            <div id='rightSubContainer' className='flex flex-col justify-center items-center py-2 pl-6 gap-3'>

              <h1 className='text-center  roboto-bold text-2xl'>verification</h1>
              <p className="text-left roboto-light w-72"> Please provide your verification code below:</p>

              <form className='flex flex-col justify-center items-center py-2 pl-6 gap-3'>
        
                <label htmlFor='username' className='flex flex-col roboto-medium'>
                  <span className='roboto-medium'>Enter the code:</span>
                  <div className='flex gap-2'>
                    {
                        otp.map((value, index) => {
                            return ( <input
                                    key={index}
                                    type="text"
                                    autoComplete="one-time-code"
                                    inputMode="numeric"
                                    maxLength="1" 
                                    className='h-12 w-12 text-center text-xl roboto-medium outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md px-2' 
                                    value={value}
                                    onKeyDown={(e) => e.key === 'Backspace' && handleBackspace(e.target, index)}
                                    onChange={(e) => handleChange(e.target, index)}
                                    />)
                        })
                    }

                  </div>
                </label>

                <button className='text-mygreen-500 roboto-medium active:underline-none underline underline-offset-2 decoration-inherit '> Resend Code </button>

                <span>Login instead?  <span className='text-mygreen-700'><Link to={'/'} >Login</Link></span></span>

                <button type='submit' className='text-white bg-mygreen-700 w-16 h-8 rounded-md' onClick={handleSubmit}>Verify</button>

              </form>
            </div>
          </div>
          
        </div>
      </main>
    </>
  )
}

export default VerifyOtp
import {useState} from 'react'
import { Link } from 'react-router-dom'
import LeftSubContainer from "../page-compontents/Authpages-components/LeftSubcontainer"
import { WIDTH, HEIGHT } from "../utils/authFormContainerSize"
import { useNavigate } from 'react-router-dom'
import ErrorDiplayer from '../page-compontents/ErrorDiplayer'
import { useDispatch, useSelector } from 'react-redux'
import { setErrorTickets, updateErrorFlag } from '../../store/features/errorTicketsSlice'
import errorMessages from '../utils/errorMessages'
import AuthSubmitBtn from '../page-compontents/Authpages-components/AuthSubmitBtn'
import { updateOtpId } from '../../store/features/otpCredentialsSlice'
import Api from '../utils/API-calling-functions/Api'



function VerifyOtp() {
    
    const api = new Api()
    const otpLenth = 6
    const [isLoading, setIsLoading] = useState()
    const navigate = useNavigate()

    const {otpCredentials} = useSelector((state) => state.otpCredentials)
    
    const dispatch = useDispatch()

    const [otp, setOtp ] = useState(new Array(otpLenth).fill(""))

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
      dispatch(setErrorTickets([]))
    }
  

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const otp = getOtpValue()

        try {
          const response = await api.verifyOtp({otp, id: otpCredentials.otpId})
          if ( response.status === 200) {
            setIsLoading(false)
            navigate('/resetpassword')
          }
          else{
            setIsLoading(false)
            dispatch(updateErrorFlag(true))
            dispatch(setErrorTickets([errorMessages.wrongOtp]))
          }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
          setIsLoading(false)
          dispatch(updateErrorFlag(true))
          dispatch(setErrorTickets([errorMessages.wrongOtp]))
        }
        
    }

    const handleResendOtp = async (e) => {
      e.preventDefault()
      setIsLoading(true)
      try {
        const response = await api.resendOtp({username: otpCredentials.email})
        if (response.status === 200){
          dispatch(updateOtpId(response.data.otp))
          setIsLoading(false)
        }
        else{
          dispatch(setErrorTickets([errorMessages.internalServerError]))
          setIsLoading(false)
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setIsLoading(false)
        dispatch(setErrorTickets([errorMessages.internalServerError]))
      }
    }
  return (
    <>
        <main className='h-screen w-screen bg-green-landscape-hd bg-no-repeat bg-cover flex flex-col justify-center items-center gap-4'>
        <ErrorDiplayer emptyTickets={emptyTickets} />

        <div id='loginWrapper' className={`max-w-[${WIDTH}rem] max-h-[${HEIGHT}rem] flex-grow flex-shrink overflow-x-hidden flex scrollbar-hide`}>

          <div id='loginSection' className='flex lg:flex-row sm:flex-col sm:overflow-y-scroll bg-fadedGrayBg sm:h-full sm:w-96 lg:w-full lg:h-full overflow-hidden rounded-md '>
            <LeftSubContainer />

            <div id='rightSubContainer' className='w-full h-auto flex flex-col justify-center items-center py-2 sm:pl-3 lg:pl-6 gap-3'>

              <h1 className='text-center  roboto-bold text-2xl'>verification</h1>
              <p className="text-left roboto-light w-72"> Please provide your verification code below:</p>

              <form className='w-full h-auto flex flex-col justify-center items-center py-2 pl-6 gap-3'>
        
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

                <button onClick={handleResendOtp} disabled={isLoading} className='text-mygreen-500 roboto-medium active:underline-none underline underline-offset-2 decoration-inherit '> Resend Code </button>

                <span>Login instead?  <span className='text-mygreen-700'><Link to={'/login'} >Login</Link></span></span>

                <AuthSubmitBtn handleSubmit={handleSubmit} isLoading={isLoading} name='Verify'/>

              </form>
            </div>
          </div>
          
        </div>
      </main>
    </>
  )
}

export default VerifyOtp
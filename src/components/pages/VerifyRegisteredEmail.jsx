import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { apiObject } from "../utils/API-calling-functions/Api"
import { setErrorTickets, updateErrorFlag } from "../../store/features/errorTicketsSlice"
import errorMessages from "../utils/errorMessages"
import { updateOtpId } from "../../store/features/otpCredentialsSlice"
import ErrorDiplayer from "../page-compontents/ErrorDiplayer"
import AuthSubmitBtn from "../page-compontents/Authpages-components/AuthSubmitBtn"
import Logo from "../page-compontents/Authpages-components/Logo"



function VerifyRegisteredEmail() {
    const otpLenth = 6
    const [isLoading, setIsLoading] = useState()
    const navigate = useNavigate()

    const {otpCredentials} = useSelector((state) => state.otpCredentials)
    const {companyId, company} = useSelector((state) => state.registrationData)
    
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
          const response = await apiObject.verifyOtpRegistrationStep({otp})
          if ( response.status === 200) {
            const subscriptionSaved = await apiObject.saveSubscriptionNoCard({companyId, companyName: company.companyName, email: company.email, planName: "Standard Plan"})
            if (subscriptionSaved.status === 200){
                setIsLoading(false)
                dispatch(updateErrorFlag(false))
                const createSessionForUser = await apiObject.loginAfterRegistration({email: company.email, tz: Intl.DateTimeFormat().resolvedOptions().timeZone})
                if (createSessionForUser.status === 200){ 
                  navigate('/layout/dashboard')
                  
                }
                else{
                  dispatch(setErrorTickets(["something went wrong. Please contact us for further details"]))
                  dispatch(updateErrorFlag(true))
                }
            }
            else {
                console.error("Subscription saving failed")
                dispatch(updateErrorFlag(true))
                dispatch(setErrorTickets(["Something went wrong. Please contact us for further details"]))
            }
            setIsLoading(false)
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
        const response = await apiObject.resendOtpRegistrationStep({username: otpCredentials.email})
        if (response.status === 200){
          dispatch(updateOtpId(response.data.otpId))
          setIsLoading(false)
        }
        else{
          dispatch(setErrorTickets([errorMessages.internalServerError]))
          dispatch(updateErrorFlag(true))
          setIsLoading(false)
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setIsLoading(false)
        dispatch(setErrorTickets([errorMessages.internalServerError]))
        dispatch(updateErrorFlag(true))
      }
    }

    useEffect(() => {
        if (companyId < 0 || company.email === ""){
            navigate("/register");
            return
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <>
        <main className='h-screen w-screen bg-fadedGrayBg bg-no-repeat bg-cover flex flex-col justify-center items-center gap-4'>
        <ErrorDiplayer emptyTickets={emptyTickets} />

        <div className={` overflow-x-hidden flex scrollbar-hide shadow-xl overflow-hidden rounded-lg`}>

          <div className='flex flex-col bg-white  overflow-hidden  p-12 items-center justify-center '>
            <Logo />

            <div id='rightSubContainer' className='w-full flex flex-col justify-center items-center  gap-3'>

              <h1 className='text-center  roboto-bold text-2xl text center my-2'>Email Verification</h1>
              <p className="text-left roboto-light"> A verification code was sent to your email.</p>

              <form className='w-full h-auto flex flex-col justify-center items-center gap-3 mx-10'>
        
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

                <AuthSubmitBtn handleSubmit={handleSubmit} isLoading={isLoading} name='Verify'/>

              </form>
            </div>
          </div>
          
        </div>
      </main>
    </>
  )
}

export default VerifyRegisteredEmail
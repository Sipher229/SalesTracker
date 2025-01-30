import { useState } from "react"
import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js"
import PublicFacingMsgComponent from "../PublicFacingMsgComponent"
import Api from "../../utils/API-calling-functions/Api"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

function PaymentForm() {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setisLoading] = useState(false)
    const {company, companyId} = useSelector((state) => state.registrationData)
    const navigate = useNavigate()
    const api = new Api()
    const style = {
        base: {
            color: '#1A5319',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    }
    const [message, setMessage] = useState({
        isError: false,
        message: "",
        showing: false,
    })
    const closeMessageBox = () => {
        setMessage({
            message: "",
            isError: false,
            showing: false
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()


        if (!stripe || !elements) return;
        setisLoading(true)
        try {
            const { error, setupIntent } = await stripe.confirmSetup({
                elements,
                redirect: 'if_required'
            });
            if (error) {
                console.error(error.message)
                setMessage({isError: true, message: "Registration failed. Please ensure all the information provided are correct.", showing: true})
            }
            else {
                const savingSubscription = await api.saveSubscription({
                    paymentMethodId: setupIntent.payment_method, 
                    companyName: company.companyName, 
                    email: company.email, 
                    companyId
                })
                if (savingSubscription.status === 200){
                    const createSessionForUser = await api.loginAfterRegistration({email: company.email, tz})
                    if(createSessionForUser.status === 200) {
                        setMessage({isError: false, message: "Registration complete. You will be redirected to the dashboard page", showing: true})
                        navigate("/layout/dashboard")
                    }
                }
                

                else {
                    setMessage({isError: true, message: "Something went wrong. Please contact us for further details", showing: true})
                }
            }

        } catch (err) {
            console.error(err.message)
            setMessage({isError: true, message: "Something went wrong.", showing: true})
            
        }
        setisLoading(false)
        return
    }
  return (
    <div className="flex flex-col w-full h-auto justify-center items-center">
        <PublicFacingMsgComponent hideMessageBox={closeMessageBox} isError={message.isError} isShowing={message.showing} message={message.message} />
        <form 
        className="flex flex-col justify-start w-5/6 h-auto bg-white rounded-md shadow-lg lg:p-5 sm:4" 
        onSubmit={handleSubmit}
        >
            <h1 className="w-full text-center text-2xl roboto-bold my-3">Subscription</h1>

            <PaymentElement options={{hidePostalCode: true, style}} />
            <div className="w-full h-auto flex justify-center my-3">

                <button type="submit" disabled={!stripe || isLoading} className="lg:w-32 sm:w-24 h-10 bg-mygreen-700 roboto-regular text-white rounded-md active:scale-95 ">
                    {isLoading ? "Processing...": "Register"}
                </button>
                
            </div>
            <small className="roboto-regular text-gray-400 w-full text-center">No commitment - Cancel anytime</small>

        </form>

    </div>
  )
}

export default PaymentForm
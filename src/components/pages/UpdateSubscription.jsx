import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import Footer from "../page-compontents/Footer/Footer"
import PublicFacingMsgComponent from "../page-compontents/PublicFacingMsgComponent"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { apiObject } from "../utils/API-calling-functions/Api"
import Loading from "../utils/Loading"
import {loadStripe} from "@stripe/stripe-js"

function PaymentForm() {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setisLoading] = useState(false)
    const navigate = useNavigate()
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
        setisLoading(true)

        if (!stripe || !elements) return;

        try {
            const { error, setupIntent } = await stripe.confirmSetup({
                elements,
                redirect: 'if_required'
            });
            if (error) {
                console.error(error.message)
                setMessage({isError: true, message: "update failed. Please ensure all the information provided are correct.", showing: true})
            }
            else {
                const savingSubscription = await apiObject.saveUpdatedSubscription({
                    paymentMethodId: setupIntent.payment_method, 
                })
                if (savingSubscription.status === 200){

                    setMessage({isError: false, message: "Subscription updated. You will be redirected to the dashboard", showing: true})
                    navigate("/layout/dashboard")
                }    

                else {
                    setMessage({isError: true, message: "Something went wrong. Please contact us for further details", showing: true})
                }
            }

        } catch (err) {
            console.error(err.message)
            setMessage({isError: true, message: "Something went wrong. Please contact us for further details", showing: true})
            
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

            <PaymentElement options={{hidePostalCode: true, style}} />
            <div className="w-full h-auto flex justify-center my-3">

                <button type="submit" disabled={!stripe || isLoading} className="lg:w-32 sm:w-24 h-10 bg-mygreen-700 roboto-regular text-white rounded-md active:scale-95 ">
                    {isLoading ? "Processing...": "Update"}
                </button>
                
            </div>
        </form>

    </div>
  )
}

function UpdateSubscription() {
    const [stripePromise, setstripePromise] = useState(null)
    const [clientSecret, setclientSecret] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try{
                const subscriptionIsActive = (await apiObject.getSubscriptionStatus(id)).data.subscriptionIsActive;

                if(subscriptionIsActive){
                    navigate("/layout/dashboard");
                    return
                }

                const response = await apiObject.getPublishableKey()

                if (response.status === 200) {
                    setstripePromise(loadStripe(response.data.publishableKey))
                }
            }catch(error) {
                console.log(error.message);
                navigate("/layout/dashboard");
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await apiObject.createResubscriptionIntent({})

                if (response.status === 200) {
                    setclientSecret(response.data.clientSecret)
                }
            }catch(error) {
                console.log(error.message)
            }
        }
        fetchData()
    }, []);
  return (
    <main className="w-screen h-screen flex flex-col overflow-x-hidden oveflow-y-scroll">
    <div className="h-auto w-full flex-grow-0 flex-shrink-0 bg-fadedGrayBg flex flex-col justify-center items-center">
        <h1 className="lg:text-4xl sm:text-2xl roboto-bold my-5">Update your subscription</h1>
    </div>
    <div className="w-full min-h-full flex justify-center items-center bg-white p-8 oveflow-y-scroll">
        {
            clientSecret && stripePromise ?                     
            <Elements stripe={stripePromise} options={{clientSecret}} >
                <PaymentForm />
            </Elements>
            :
            <Loading />
        }
    </div>
    <Footer />
</main>
  )
}

export default UpdateSubscription
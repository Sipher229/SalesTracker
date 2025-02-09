import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import Api from "../utils/API-calling-functions/Api"
import PaymentForm from "../page-compontents/forms/PaymentForm"
import PublicFacingHeader from "../page-compontents/header/PublicFacingHeader"
import Footer from "../page-compontents/Footer/Footer"
import { useSelector } from "react-redux"
import Loading from "../utils/Loading"
import { useNavigate } from "react-router-dom"



function Checkout() {
    const [stripePromise, setstripePromise] = useState(null)
    const [clientSecret, setclientSecret] = useState(null)
    const {company, companyId} = useSelector((state) => state.registrationData)
    const navigate = useNavigate()
    const api = new Api()

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.getPublishableKey()

                if (response.status === 200) {
                    setstripePromise(loadStripe(response.data.publishableKey))
                }
            }catch(error) {
                console.log(error.message)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (companyId < 0) {
            alert("It looks like you are not registered yet. You will be redirected to the registration page.");
            navigate("/register");
        }
        const fetchData = async () => {
            try{
                const response = await api.createPaymentIntent({companyId: companyId, companyName: company.companyName, email: company.email})

                if (response.status === 200) {
                    setclientSecret(response.data.clientSecret)
                }
            }catch(error) {
                console.log(error.message)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (

        <main className="w-screen h-screen overflow-x-hidden overflow-y-scroll">
            <PublicFacingHeader />
            <div className="w-full h-full flex lg:flex-row sm:flex-col overflow-x-hidden">
                <div className="lg:w-1/2 sm:w-full lg:h-full sm:h-auto flex flex-col items-center text-white bg-gradient-to-br from-mygreen-750 to-mygreen-500 ">
                    <h1 className="h-24 w-full flex justify-center items-center lg:text-4xl sm:text-2xl roboto-bold">Complete Your Registration</h1>
                    <table className="w-4/6 h-auto text-white roboto-regular p-2">
                        <thead>
                            <tr className="border-b border-white roboto-medium-italic text-2xl py-3 h-7">
                                <td>Montly Plan</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-white lg:h-12 sm:h-8" >
                               <td> 7-day free trial</td>
                               <td>$0</td>
                            </tr>
                            <tr className="border-b border-white lg:h-12 sm:h-8">
                               <td> 24/7 Support</td>
                               <td>$0</td>
                            </tr>
                            <tr className="border-b border-white lg:h-12 sm:h-8">
                               <td> Staff Training</td>
                               <td>$0</td>
                            </tr>

                            <tr className="border-b border-white lg:h-12 sm:h-8">
                               <td> Fee per registered employee after trial</td>
                               <td>$10</td>
                            </tr>
                            <tr className="border-b border-white lg:h-12 sm:h-8">
                               <td> Monthly maintenance fee after  trial</td>
                               <td>$150</td>
                            </tr>

                        </tbody>
                    </table>

                </div>
                <div className="lg:w-1/2 sm:w-full lg:h-full sm:h-auto flex justify-center items-start bg-fadedGrayBg flex-shrink-0 flex-grow-0 lg:py-6 lg:px-4 sm:p-2 overflow-y-scroll">
                    {
                        clientSecret && stripePromise ?                     
                        <Elements stripe={stripePromise} options={{clientSecret}} >
                         <PaymentForm />
                        </Elements>
                        :
                        <Loading />
                    }

                </div>
            </div>
            <Footer />
        </main>


  )
}

export default Checkout
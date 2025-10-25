import PublicFacingHeader from "../page-compontents/header/PublicFacingHeader"
import AuthSubmitBtn from "../page-compontents/Authpages-components/AuthSubmitBtn"
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import PublicFacingMsgComponent from "../page-compontents/PublicFacingMsgComponent"
import invalidateInputs from "../utils/invalidateInputs"
import normalizeInputs from "../utils/normalizeInputs"
import Api from "../utils/API-calling-functions/Api"
import useLogVisit from "../utils/custom-hooks/useLogVisit"

function Body() {
    const [isLoading, setisLoading] = useState(false)
    const emailRef = useRef(null)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        message: "",
        employeeCount: "",
        consent: false
    })
    const api = new Api()
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
    const handleCheckBox = () => {
        setData((prev) => {
            return {...prev, consent: data.checked}
        })
    }
    const emailIsValid = () => {
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;   
        if(!emailRegex.test(data.email) || data.email === ""){
          return false
        }
        return true
    
    }
    const noEmptyFields = () => {
        if(!(data.companyName === "" || data.firstName === "" || data.lastName === "" || data.email === "" || data.employeeCount === "" || data.message === ""))
        {
            return true
        }
        return false
    }
    const handleChange = (e) => {
        const {name, value} = e.target

        setData((prev) => {
            return {...prev, [name]: value}
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!noEmptyFields()){
            setMessage({
                message: "All input fields marked with an asterix need to be completed",
                isError: true,
                showing: true
            })
            return
        }
        if (!emailIsValid()) {
            setMessage({
                message: "Please provide a valid email",
                isError: true,
                showing: true
            })
            invalidateInputs(emailRef)
            return
        }
        setisLoading(true)
        try {
            const response = await api.submitInquiry(data)
            if(response.status === 200){
                setMessage({message: response.data.message, isError:false, showing:true})
                setisLoading(false)
                setData({        
                    firstName: "",
                    lastName: "",
                    companyName: "",
                    email: "",
                    message: "",
                    employeeCount: "",
                    consent: false
                })
                return
            }
        } catch (error) {
            setMessage({message: "Failed to send message", isError:true, showing:true})
            setisLoading(false)
            console.error(error.message)
            return
        }
        
    }

    return (
        <section className="w-full  h-full flex lg:flex-row sm:flex-col sm:overflow-y-scroll lg:overflow-y-hidden">
            <div className="lg:w-1/2 sm:w-full lg:h-full sm:h-auto bg-gradient-to-br from-mygreen-750 via-mygreen-500 to-mygreen-300 flex flex-col justify-start items-center gap-7 p-3">
                <div className="w-full h-auto self-start flex gap-2 mt-3 roboto-light text-white">
                    <Link to={"/"} className=" hover:underline underline-offset-2" >Home</Link>
                    <Link to={"/register"} className=" hover:underline underline-offset-2" >Registration</Link>
                    <Link to={"/contact"} className="underline underline-offset-2" >Contact</Link>

                </div>
                <h1 className="text-white sm:text-2xl lg:text-4xl roboto-bold sm:mt-2 lg:mt-8">{"We're"} Here for You, Anytime</h1>
                <p className="text-white text-center roboto-regular sm:text-sm lg:text-lg p-6">
                    Have questions or need assistance? Our support team is available 24/7 to
                    help you every step of the way. Reach out to us, and we promise 
                    to get back to you within 24 hours. Your success is our priority—{"don’t "} 
                    hesitate to connect with us today!
                </p>
            </div>
            <div className="lg:w-1/2 sm:w-full lg:h-full sm:h-auto bg-fadedGrayBg flex flex-col justify-start items-center p-5 lg:overflow-y-scroll">
                <PublicFacingMsgComponent hideMessageBox={closeMessageBox} message={message.message} isError={message.isError} isShowing={message.showing} />
                <form className="bg-white w-full lg:h-auto sm:h-auto shadow-lg rounded-md flex flex-col flex-grow-0 flex-shrink-0 justify-start items-start sm:gap-0 lg:gap-2 p-4 sm:pl-14">
                    <h1 className="w-full text-center roboto-bold text-2xl sm:mb-0 lg:mb-4">Contact Us</h1>
                    <div className="w-full h-auto flex lg:flex-row sm:flex-col sm:gap-1 lg:gap-3 flex-grow-0 flex-shrink-0">
                        
                        <label className="w-full flex flex-col roboto-medium">
                            <span className="after:content-['*'] after:text-red-500">First Name:</span>
                            <input
                            name="firstName"
                            type="text"
                            value={data.firstName}
                            required
                            autoComplete="off"
                            onChange={handleChange}
                            className="px-2 lg:min-w-64 sm:max-w-72 grow shrink h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md" />
                        </label>
                        <label className="w-full flex flex-col roboto-medium">
                            <span className="after:content-['*'] after:text-red-500">Last Name:</span>
                            <input
                                name="lastName"
                                type="text"
                                required
                                value={data.lastName}
                                autoComplete="off"
                                onChange={handleChange}
                                className="px-2 lg:min-w-64 sm:max-w-72 h-10 grow shrink  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md" />
                        </label>
                    </div>
                    <div className="w-full h-auto flex lg:flex-row sm:flex-col sm:gap-1 lg:gap-3 flex-grow-0 flex-shrink-0 ">
                        
                        <label className="w-full flex flex-col roboto-medium">
                            <span className="after:content-['*'] after:text-red-500">Company Name:</span>
                            <input
                            name="companyName"
                            type="text"
                            value={data.companyName}
                            required
                            autoComplete="off"
                            onChange={handleChange} 
                            className="px-2 lg:min-w-64 sm:max-w-72 grow shrink h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md" />
                        </label>
                        <label className="w-full flex flex-col roboto-medium">
                            <span className="after:content-['*'] after:text-red-500">Email:</span>
                            <input 
                                ref={emailRef}
                                name="email"
                                type="email"
                                value={data.email}
                                autoComplete="off"
                                onChange={handleChange}
                                onFocus={(e) => e.target.value !== "" && normalizeInputs(emailRef)}
                                required 
                                className="px-2 lg:min-w-64 sm:max-w-72 h-10 grow shrink  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md" />
                        </label>
                    </div>
                    <label className="w-full flex flex-col roboto-medium">
                            <span className="after:content-['*'] after:text-red-500">Employee Count:</span>
                            <select
                            name="employeeCount"
                            value={data.employeeCount}
                            onChange={handleChange}
                            className="px-2 lg:min-w-64 sm:max-w-72 h-10 grow shrink  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md">
                                <option>Choose a range</option>
                                <option>0-20</option>
                                <option>21-50</option>
                                <option>51-100</option>
                                <option>101-500</option>
                                <option>501-1000</option>
                                <option>1000+</option>
                            </select>
            
                    </label>
                    <div className="w-full h-32 flex flex-col gap-3">
                        <label className="w-full flex flex-col roboto-medium">
                            <span className="after:content-['*'] after:text-red-500">How can we assist?:</span>
                            <textarea 
                            name="message"
                            value={data.message}
                            required
                            onChange={handleChange}
                            className="roboto-regular px-2 w-full h-28 resize-none grow shrink outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md" />
                        </label>
                    </div>
                    <label htmlFor='consent' className='flex gap-2 items-center mt-2'> 
                        <input type='checkbox' className='w-4 h-4 hover:cursor-pointer' id="consent" checked={data.consent} onChange={handleCheckBox}/>
                        <small className='roboto-regular'>I consent to receiving marketing emails from SalesVerse</small>
                    </label>

                    <div className="w-full h-10 flex justify-center items-center mt-2">
                        <AuthSubmitBtn name="Submit" handleSubmit={handleSubmit} isLoading={isLoading} />
                    </div>
                </form>
            </div>
        </section>
    )
}

function ContactUs() {
    useLogVisit(window.location.href);
  return (
    <main className="w-screen h-screen flex flex-col overflow-y-hidden overflow-x-hidden">
        <PublicFacingHeader />
        <Body />
    </main>
  )
}

export default ContactUs
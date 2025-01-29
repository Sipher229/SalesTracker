import PublicFacingHeader from "../page-compontents/header/PublicFacingHeader"
import AuthSubmitBtn from "../page-compontents/Authpages-components/AuthSubmitBtn"
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updateCompanyData, updateCompanyId } from "../../store/features/registrationDataSlice"
import Api from "../utils/API-calling-functions/Api"
import PublicFacingMsgComponent from "../page-compontents/PublicFacingMsgComponent"
import ShowPasswordCheckBox from "../page-compontents/Authpages-components/ShowPasswordCheckBox"
import toggleShowPassword from "../utils/toggleShowpassword"
import invalidateInputs from "../utils/invalidateInputs"

function Body() {
    const [isLoading, setisLoading] = useState(false)
    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch()
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const emailRef = useRef(null)
    const navigate = useNavigate()
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
    const emailIsValid = () => {
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;   
        if(!emailRegex.test(data.email) || data.email === ""){
          return false
        }
        return true
    
    }
    const noEmptyFields = () => {
        if(!(data.companyName === "" || data.firstName === "" || data.lastName === "" || data.email === "" || data.employeeCount === "" || data.password === "" || data.confirmPassword === ""))
        {
            return true
        }
        return false
    }
    const passwordIsValid = () => {
        const containsCap = /[A-Z]/
        const containsSmallLetter = /[a-z]/
        const conatinsDigit = /[0-9]/
        const containsSymbol = /[^A-Za-z0-9]/

        if (!containsCap.test(data.password) || !containsSmallLetter.test(data.password) || !conatinsDigit.test(data.password) || !containsSymbol.test(data.password) || !data.password.length >= 8)
        {
            return false
        }
        return true
    }
    const passwordsMatch = () => {
        if (data.password !== data.confirmPassword) return false

        return true
    }
    const api = new Api()
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        employeeCount: "",
        confirmPassword: "",
        password: "",
        email: "",

    })
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

        if (!passwordIsValid()){
            setMessage({
                message: "The password should contain at least one capital letter, \
                one small letter, and one symbol (eg: $, !), and it should contain \
                at least 8 characters",
                isError: true,
                showing: true
            })
            invalidateInputs(passwordRef)
            return
        }
        if (!passwordsMatch()){
            setMessage({
                message: "The passwords should match",
                isError: true,
                showing: true
            })
            invalidateInputs(passwordRef)
            invalidateInputs(confirmPasswordRef)
            return
        }

        setisLoading(true)
        setMessage({message: "", showing: false, isError:false})
        dispatch(updateCompanyData({email:data.email, companyName:data.companyName, employeeCount: data.employeeCount}))
        try {
            const response = await api.registerCompany(data)

            if(response.status === 200) {
                dispatch(updateCompanyId(response.data.companyId))

                if (response.data.companyExists && response.data.employeeExists) {
                    setMessage({isError: true, message: "The company already exists. You will be redirected to the subscription page", showing:true})
                    navigate("/subscription")
                    return
                }
                setisLoading(false)

                navigate("/subscription")

            }
        } catch (error) {
            console.error(error.message)
            setMessage(() => {
                return {isError: true, message: "Something went wrong. Please make sure to complete all required fields", showing:true}
            })
        }
        setisLoading(false)
        
        return
    }
    const handleShowPassword = () => {
        setChecked(!checked)
        if (passwordRef.current.type === "text") {

            toggleShowPassword(passwordRef, "password")
            toggleShowPassword(confirmPasswordRef, 'password')
        }
        else {
            toggleShowPassword(passwordRef, "text")
            toggleShowPassword(confirmPasswordRef, 'text')
        }
    }
    return (
        <section className="w-full  h-full flex lg:flex-row sm:flex-col overflow-x-hidden">
            <div className="lg:w-1/2 sm:w-full lg:h-full sm:h-auto bg-gradient-to-br from-mygreen-750 via-mygreen-500 to-mygreen-300 flex flex-col justify-start items-center sm:gap-2 lg:gap-7 p-3">
                <span className="w-full h-auto self-start flex gap-2 mt-3 roboto-light text-white">
                    <Link to={"/"} className=" hover:underline underline-offset-2" >Home</Link>
                    <Link to={"/register"} className=" underline underline-offset-2" >Registration</Link>
                    <Link to={"/contact"} className=" hover:underline underline-offset-2" >Contact</Link>

                </span>
                <h1 className="text-white sm:text-2xl lg:text-4xl roboto-bold sm:mt-2 lg:mt-8">Welcome to SalesVerse</h1>
                <p className="text-white text-center roboto-regular sm:text-sm lg:text-lg p-6">
                    Thank you for joining us! SalesVerse is a powerful workforce management
                    system designed to simplify the management of your sales teams.
                    With SalesVerse, you can easily classify teams by campaigns,  
                    set specific goals tailored to those campaigns, and monitor progress 
                    effortlessly. Supervisors gain real-time insights into team performance, 
                    while individual team members can track their sales and commissions—empowering 
                    everyone to succeed. <br /> <br />
                    <span className="roboto-bold sm:text-base lg:text-xl">{"We're"} excited to have you on board!</span>


                </p>
            </div>
            <div className="lg:w-1/2 sm:w-full lg:h-full sm:h-auto bg-fadedGrayBg flex flex-col justify-start items-center p-5 overflow-y-scroll">
                <PublicFacingMsgComponent hideMessageBox={closeMessageBox} message={message.message} isError={message.isError} isShowing={message.showing} />
                <form className="bg-white w-full lg:h-auto sm:h-auto shadow-lg rounded-md flex-grow-0 flex-shrink-0 flex flex-col justify-start lg:items-start sm:items-center sm:gap-2 lg:gap-4 p-4 sm:pl-14">
                    <h1 className="w-full text-center roboto-bold text-2xl sm:mb-2 lg:mb-4">Register</h1>
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
                            className="px-2 lg:w-64 sm:w-72 grow shrink h-10 outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md" />
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
                                className="px-2 lg:w-64 sm:w-72 h-10 grow shrink  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md" />
                        </label>
                    </div>
                    <div className="w-full h-auto flex lg:flex-row sm:flex-col sm:gap-1 lg:gap-3 flex-grow-0 flex-shrink-0">
                        
                        <label className="w-full flex flex-col roboto-medium">
                            <span className="after:content-['*'] after:text-red-500">Company Name:</span>
                            <input 
                            name="companyName"
                            type="text"
                            value={data.companyName}
                            required
                            autoComplete="off"
                            onChange={handleChange}
                            className="px-2 lg:w-64 sm:w-72 grow shrink h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md" />
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
                                required 
                                className="px-2 lg:w-64 sm:w-72 h-10 grow shrink  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md" />
                        </label>
                    </div>
                    <label className="w-full flex flex-col roboto-medium">
                            <span className="after:content-['*'] after:text-red-500">Employee Count:</span>
                            <select 
                                name="employeeCount"
                                onChange={handleChange}
                                className="px-2 w-64 h-10 grow shrink  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md">
                                <option>Choose a range</option>
                                <option>0-20</option>
                                <option>21-50</option>
                                <option>51-100</option>
                                <option>101-500</option>
                                <option>501-1000</option>
                                <option>1000+</option>
                            </select>
            
                    </label>

                    <div className="w-full h-auto flex lg:flex-row sm:flex-col sm:gap-1 lg:gap-3 flex-grow-0 flex-shrink-0">
                        
                        <label className="w-full flex flex-col roboto-medium">
                            <span className="after:content-['*'] after:text-red-500">Password:</span>
                            <input 
                                ref={passwordRef}
                                name="password"
                                type="password"
                                value={data.password}
                                autoComplete="off"
                                onChange={handleChange}
                                required 
                                className="px-2 lg:w-64 sm:w-72 grow shrink h-10  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md" />
                        </label>
                        <label className="w-full flex flex-col roboto-medium">
                            <span className="after:content-['*'] after:text-red-500">Confirm Password:</span>
                            <input
                                ref={confirmPasswordRef}
                                name="confirmPassword"
                                type="password"
                                value={data.confirmPassword}
                                autoComplete="off"
                                onChange={handleChange}
                                required  
                            className="px-2 lg:w-64 sm:w-72 h-10 grow shrink  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md" />
                        </label>
                    </div>
                    <ShowPasswordCheckBox handleShowPassword={handleShowPassword} checked={checked} />
                    <div className="w-full h-auto flex justify-center items-center mt-5">
                        <AuthSubmitBtn name="Next" handleSubmit={handleSubmit} isLoading={isLoading} />

                    </div>
                </form>
            </div>
        </section>
    )
}
function Registration() {
  return (
    <main className="w-screen h-screen flex flex-col overflow-y-hidden overflow-x-hidden">
        <PublicFacingHeader />
        <Body />
    </main>
  )
}

export default Registration
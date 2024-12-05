/* eslint-disable react/prop-types */
import { useState } from "react"
import Logo from "./Logo.jsx"
import ChevronUp from "../../utils/icons/ChevronUp.jsx"
import ChevronDown from "../../utils/icons/ChevronDown.jsx"
import ErrorDiplayer from "../ErrorDiplayer.jsx"
import { useSelector, useDispatch } from "react-redux"
import { setErrorTickets, updateErrorFlag } from "../../../store/features/errorTicketsSlice.js"
import { useNavigate } from "react-router-dom"
import errorMessages from "../../utils/errorMessages.jsx"
import { updateIsLoggedIn } from "../../../store/features/employeeSlice.js"
import Api from "../../utils/API-calling-functions/Api.js"
import './Header.css'
import MenuIcon from "../../utils/icons/MenuIcon.jsx"
import CloseMenu from "../../utils/icons/CloseMenu.jsx"

function UserProfile({name='User\'s full name'}){
  const [showing, setShowing] = useState(false)
  const api = new Api()


  const navigate = useNavigate()
  const dispacth = useDispatch()
  const handleLogOut = async () => {
    try{
      const response = await api.logUserOut()
      if( response.status === 200 ) {
        dispacth(updateIsLoggedIn(false))
        navigate('/')
        navigate(0)
      }
      else{
        dispacth(setErrorTickets([errorMessages.internalServerError]))
        dispacth(updateErrorFlag(true))
        
      }
    }
    // eslint-disable-next-line no-unused-vars
    catch(error) {
      dispacth(setErrorTickets([errorMessages.internalServerError]))
      dispacth(updateErrorFlag(true))
    }
  }

  return (
    <>
      <button
      onFocus={() => setShowing(true)}
      onBlur={() => setShowing(false)}
      className="min-w-52 h-12 rounded-xl flex justify-center items-center gap-4 outline-white  ">
        <span className="text-white roboto-medium">Hello, {name}</span>
        {  showing? <ChevronUp /> : <ChevronDown />}
        <ul className={`w-28 h-16 bg-white absolute ${showing? '' : 'hidden'} active:bg-white right-5 top-12 shadow-xl rounded-sm overflow-hidden logout-popup-animation`}>
          <li className="hover:bg-gray-200 roboto-medium h-1/2 w-full text-left pl-2 " onClick={handleLogOut}>Log Out</li>
          <li className="hover:bg-gray-200 roboto-medium h-1/2 w-full text-left pl-2 border-t" onClick={() => navigate('/layout/myprofile')}>View Profile</li>
        </ul>
      </button>
    </>
  )
}

function Header({menuIsOpen=false, handleMenuIsOpen}) {
  const {errorTickets} = useSelector((state) => state.errorTickets)
  const {user} = useSelector((state) => state.employee)
  const dispacth = useDispatch()


  const emptyTickets = () => {
    dispacth(setErrorTickets([]))
  }
  return (
    <header className="w-screen h-16 bg-gradient-to-tr from-mygreen-750 via-mygreen-500 to-mygreen-300">
      <ErrorDiplayer errorTickets={errorTickets} emptyTickets={emptyTickets} positionForHeader={true} />
      <nav className="w-full h-full flex justify-between items-center pl-7 pr-2">
        <button onClick={()=> handleMenuIsOpen()} className="w-auto lg:hover:cursor-default h-auto flex justify-start items-center gap-3">
          {!menuIsOpen ? <CloseMenu /> : <MenuIcon /> }
          <Logo />

        </button>
        <UserProfile name={user.firstName}/>
      </nav>
    </header>
  )
}

export default Header

//TODO: create header, add background (complete)
//TODO: create  profile and logo  component (partially complete)

// TODO: add an error pop up component
// the state of the particular component would be managed globally. The state would feature to
// two properties (showPopUp and message). Whenever needed these two would be updated to show the popup with a particular message
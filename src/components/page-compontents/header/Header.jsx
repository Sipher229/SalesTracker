/* eslint-disable react/prop-types */
import { useState } from "react"
import Logo from "./Logo.jsx"
import ChevronUp from "../../utils/icons/ChevronUp.jsx"
import ChevronDown from "../../utils/icons/ChevronDown.jsx"

function UserProfile({name='User\'s full name', picture}){
  const [showing, setShowing] = useState(false)
  return (
    <>
      <button
      onClick={() => setShowing((prev)=> !prev)}
      onBlur={() => setShowing((prev)=> !prev)}
      className="min-w-52 h-12 rounded-xl flex justify-center items-center gap-10">
        <span className="text-white roboto-medium">{name}</span>
        {  showing? <ChevronUp /> : <ChevronDown />}
        <ul className={`w-24 h-16 bg-white absolute ${showing? '' : 'hidden'} right-5 top-12 shadow-lg rounded-md overflow-hidden`}>
          <li className="hover:bg-gray-200 roboto-medium h-1/2 w-full text-left pl-2 ">Log Out</li>
          <li className="hover:bg-gray-200 roboto-medium h-1/2 w-full text-left pl-2 border-t">View Profile</li>
        </ul>
      </button>
    </>
  )
}

function Header() {
  return (
    <header className="w-screen h-16 bg-gradient-to-tr from-mygreen-750 via-mygreen-500 to-mygreen-300">
      <nav className="w-full h-full flex justify-between items-center px-7">
        <Logo />
        <UserProfile />
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
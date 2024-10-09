/* eslint-disable react/prop-types */
import { useState } from "react"
import Logo from "./Logo.jsx"

function UserProfile({name='Full Name', picture}){
  const [showing, setShowing] = useState(false)
  return (
    <>
      <button
      onClick={() => setShowing((prev)=> !prev)}
      onBlur={() => setShowing((prev)=> !prev)}
      className="w-52 h-12 border rounded-xl flex justify-center items-center gap-2">
        <span className="text-white roboto-light">{name}</span>
        <img alt="profile picture" src="" />
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

//TODO: create header, add background
//TODO: create  profile and logo  component